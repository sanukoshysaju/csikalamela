---
title: "CSI Elanthoor District Youth Kalamela"
subtitle: "Technical Implementation Guide | Mobile-Responsive Edition v8"
author: "Project technical documentation"
date: "12 November 2026"
---

> **Document status:** As-built description of the project contained in `CSI_Elanthoor_Kalamela_Mobile_Responsive_v8.zip`. This describes the current implementation, not an intended future architecture. The sample JSON later in this document is illustrative; it is not competition data.

## 1. Executive summary

The **CSI Elanthoor District Youth Kalamela** project is a static, mobile-first results website. Visitors view a public Home page, church Scoreboard, separate Pastorate and Outstation leaderboards, individual recognitions, and a detailed results matrix. An organiser uses a **local-only editor** to register participants, enter first-, second-, and third-place competition results, and export a JSON file. Publishing requires replacing `data/results.json` in the GitHub repository and redeploying GitHub Pages.

The application intentionally has **no database server, server API, or backend authentication**. All calculation and rendering occur in the browser with vanilla JavaScript. During editing, data is held in `localStorage`; on the public site, it is fetched from a versioned JSON document.

| Property | Current implementation |
|:---|:---|
| Front end | HTML5, CSS3, vanilla JavaScript (no framework or build step) |
| Hosting target | GitHub Pages static hosting |
| Public data | `data/results.json`, schema version **5** |
| Local draft | Browser `localStorage`, key `elanthoor_kalamela_editor_clean_v7` |
| Master data | **21 churches** (10 main pastorates, 11 outstations); **34 events** |
| Event tags | `stage`, `writing`, `group` |
| Public refresh | Fetch on initial load; recheck approximately every **60 seconds** |
| Editing access | Local browser at `localhost`, `127.0.0.1`, `[::1]`, or `file:`; demonstration PIN |

## 2. Architecture and data flow

The website is a small single-page application. `index.html` declares all four top-level page sections; `showPage()` switches visibility without changing URLs. `script.js` owns master data, application state, validation, calculations, forms, and rendering. `style.css` provides the responsive layout.

```text
LOCAL ORGANISER / EDITOR                  PUBLIC GITHUB PAGES

Open site at localhost                    Visitor opens static website
          |                                          |
Unlock local editor (demo PIN)            Fetch data/results.json
          |                                          |
Register people + record winners          Validate JSON schema v5
          |                                          |
Validate + save localStorage draft        Render scores / rankings / awards
          |                                          |
Download results.json                     Check JSON again every 60 seconds
          |
Replace data/results.json in repository
          |
Commit + push -> GitHub Pages deployment ---------> Public update
```

**Important boundary:** Saving a local draft does **not** publish anything. The public site reads the committed JSON file, not the organiser's laptop or local storage. The 60-second poll checks for changes *after* a new GitHub Pages deployment; it is not a real-time database subscription.

### Runtime state

At startup, the JavaScript maintains `data` (the active document), `publishedData` (the downloaded public document), and editor/UI state such as `adminUnlocked` and the active admin tab. `initialise()` attaches handlers, renders an initial empty view, fetches the JSON, then chooses either the local draft (on local editor origins) or the published JSON (on public origins).

## 3. Repository and file responsibilities

```text
project-root/
├── index.html             Single-page markup, navigation, views and forms
├── style.css              Theme, layouts, responsive rules and mobile cards
├── script.js              Masters, validation, state, UI and score engine
├── data/
│   └── results.json       Published competition data (schemaVersion: 5)
├── assets/
│   └── favicon.svg        Browser-tab icon
├── .nojekyll              Prevents Jekyll processing on GitHub Pages
└── README.md              Operator setup and deployment notes
```

`index.html` references `style.css?v=8` and `script.js?v=8` to help invalidate outdated browser assets when a new release is deployed. It references the supplied diocesan image URL for the header and hero logo; text fallbacks remain visible if the external image cannot load. No package manager, bundler, or compilation step is required.

## 4. Fixed master data

### 4.1 Churches and organisational hierarchy

`CHURCH_ENTRIES` defines stable church IDs `p01` through `p21`. `CHURCH_FAMILIES` maps each pastorate family to one main church and one or more outstations. `PASTORATES` derives properties for display and scoring:

| Field | Meaning |
|:---|:---|
| `id` | Stable church key (for example, `p01`) |
| `name` | Full church name shown to users |
| `category` | `pastorate` or `outstation` |
| `parentPastorate` | Family label, such as `ELANTHOOR` |
| `mainId` | Main church ID for the family |

There are 10 main pastorate churches and 11 outstations. **Rankings do not aggregate outstation points into their parent main church.** Each of the 21 churches earns points independently, and the Leaderboard ranks the two categories separately. Preserve these IDs when correcting names: results and registered people reference them.

### 4.2 Events

`MASTER_EVENTS` contains **34 fixed events**, IDs `e01` through `e34`. Each event has an ID, name, broad category, tag and optional `awardGender` (`Boy`, `Girl`, or `null`). The `tag` is authoritative: `group` means a group result; `stage` and `writing` are both individual result types. The UI allows searching/filtering master events but does **not** add or delete them.

Some original competition names use provisional `[Set A]` / `[Set B]` labels. These must be checked against the official schedule. Editing names and tags in `MASTER_EVENTS` should preserve event IDs for published-result compatibility; changing the meaning of an existing ID after scores exist requires careful review.

## 5. Published data format (JSON schema v5)

The application uses a single `data/results.json` document. The canonical empty shape is:

```json
{
  "schemaVersion": 5,
  "updatedAt": null,
  "showIndividualAwards": true,
  "participants": [],
  "eventCounts": {},
  "results": {}
}
```

### 5.1 Data entities

| Structure | Fields and relationship |
|:---|:---|
| `participants[]` | `{ id, pastorateId, name, gender }`. Gender is `Male` or `Female` for new entries; migration may preserve `Unspecified`. |
| `eventCounts` | `{ eventId: count }`, total entrants for an individual event or total teams for a group event, including non-winners. |
| `results` | `{ eventId: { "1": placement, "2": placement, "3": placement } }`; incomplete podiums are permitted. |
| Individual placement | `{ pastorateId, participantId, points }` |
| Group placement | `{ pastorateId, participantIds: [ ... ], points }` |
| `updatedAt` | ISO 8601 timestamp written on local save/export. |
| `showIndividualAwards` | Boolean that controls whether Kala Thilakam / Kala Prathibha recognitions appear on the public leaderboard. Missing values in older files default to `true`. |

**Illustrative record only:**

```json
{
  "schemaVersion": 5,
  "updatedAt": "2026-11-12T12:00:00.000Z",
  "participants": [
    { "id": "member-example-1", "pastorateId": "p01",
      "name": "Example Person A", "gender": "Female" },
    { "id": "member-example-2", "pastorateId": "p01",
      "name": "Example Person B", "gender": "Male" }
  ],
  "eventCounts": { "e11": 5, "e15": 3 },
  "results": {
    "e11": {
      "1": { "pastorateId": "p01",
        "participantId": "member-example-1", "points": 10 }
    },
    "e15": {
      "1": { "pastorateId": "p01",
        "participantIds": ["member-example-1", "member-example-2"],
        "points": 15 }
    }
  }
}
```

Here `e11` is Classical Music (individual) and `e15` is Group Song. This example has no actual Kalamela results.

### 5.2 Validation and migration

`validateDocument()` checks schema, known church and event IDs, unique participant IDs, legitimate genders, church membership, numeric non-negative points (at most two decimal places), place keys `1`/`2`/`3`, and counts. It disallows the same person winning two places in one event and requires at least two listed members for newly entered groups. Previously migrated group results can temporarily have an empty member list until reconciled.

Migration paths exist for older schemas **v2, v3 and v4**. A v4 record without `eventCounts` is upgraded to v5 with counts absent; its individual results are **not special-award eligible** until organisers enter competitor counts. Legacy records may need gender or group-membership correction.

## 6. Local Admin workflow

The Admin view contains **six tabs**, each implemented as a panel selected by `activateAdminTab()`:

| Tab | Purpose |
|:---|:---|
| Churches | Search and inspect the fixed 21-church directory and family relationships. |
| Events | Search/filter the fixed event list; inspect event tags and recorded entry counts. |
| Participants | Register, bulk-add, edit and delete people by church and gender. |
| Enter Winners | Select an event, record total entrants/teams, and enter 1st/2nd/3rd placements. |
| Recorded Results | Search all events, edit existing placements or clear an event's results. |
| Publish | Export/import JSON, discard a local draft, or perform a confirmed complete reset. |

**Registration:** `saveParticipant()` assigns a stable generated ID. `bulkAddParticipants()` accepts one line per member, using `Full name, Male` or `Full name, Female`. Editing a person's name or gender preserves their ID. Moving a participant to another church is blocked if they already have recorded results; deleting a participant requires that they not be referenced by results.

**Winner entry:** `showEventForm()` creates independent first-, second- and third-place rows. Each row selects a church, its registered eligible participant (individual) or several registered members (group), and a numeric points value. Changing the church for one place calls `renderWinnerSelection(place)` for **that place only**, so the other winner selectors are unaffected. A gender-specific event disables ineligible options and explains the selection state.

**Result integrity:** The form requires a positive integer total number of entrants (or teams), allows unannounced places to remain blank, and requires a single registered person for an individual result or at least two members for a group result. Duplicate use of one person in multiple places of the same event is rejected. Saving replaces that event's current podium entries after validation. Clearing an event removes both its placements and its competitor count.

## 7. Score calculation and award rules

### 7.1 Church totals and category leaderboards

For each church, `getPastorateTotal(churchId)` adds the recorded points for **every placement awarded to that church**. A group placement contributes its points **once**, not once per group member.

```text
Church total = sum(points of all placements for that church)

Main-pastorate leaderboard = rank main churches by church total
Outstation leaderboard     = rank outstations by church total
```

`leaderboardPositions()` sorts descending by points (name breaks sort ties); equal positive totals share the same rank. Churches with zero points display a dash rather than a numeric position. The public podium cards show up to three positive-scoring entries per category.

### 7.2 Individual points and eligibility

`participantScores()` tracks:

- `individual`: all personal points awarded for individual events;
- `eligibleIndividual`: personal points from individual events with **at least three competing entrants**;
- `excludedIndividual`: personal points from individual events with two or fewer entrants, or no known valid count;
- `groupBonus`: tie-break bonus from group placements, **not** ordinary personal points.

All individual result points still count toward the *church total*, even where the event has only one or two competitors. The three-entrant threshold affects **only Kala Thilakam / Kala Prathibha eligibility**.

### 7.3 Kala Thilakam and Kala Prathibha

`renderAwards()` separately considers registered **Female** candidates for Kala Thilakam and **Male** candidates for Kala Prathibha. A person needs `eligibleIndividual > 0` to qualify. The highest eligible individual total wins; **only if eligible individual totals tie** are group-result bonuses considered.

| Group placing | Tie-break bonus per listed group member |
|:---|---:|
| First | +5 |
| Second | +3 |
| Third | +1 |

The actual group event points are **never divided** or added to members' individual totals. Group bonuses do not, by themselves, qualify someone for an award. If candidates remain tied on both eligible individual points and group bonus, the UI shows joint leaders.

**Example:** Two female participants each have 12 eligible individual points. Person A participated in a first-place group (+5), and Person B in a second-place group (+3). Person A leads Kala Thilakam by tie-break. If Person B had 13 eligible individual points instead, Person B would lead regardless of group bonuses.

## 8. Public views and mobile implementation

**Home:** Hero, church/event/result statistics, navigation cards, Youth Movement heritage content, and external diocesan logo with fallback. The status bar indicates whether data is published, a local draft, or failed to load.

**Scoreboard:** Church selector, category/parent relationship, its total score, winning results (including group membership), personal points, award-eligible points, group tie-break totals, and an expandable all-church matrix. The matrix has 21 church rows and columns for 34 events, category, parent, and total; CSV download is available.

**Leaderboard:** Separate top-three podiums and full ranking tables for the 10 main churches and 11 outstations, plus the two individual distinction cards.

**Mobile-first CSS:** At phone widths, the primary navigation becomes a persistent bottom bar with safe-area padding. Ordinary results tables use semantic HTML tables but are visually transformed into labelled vertical cards. The very wide results matrix intentionally remains swipeable with sticky headings / church column. Responsive tabs, appropriately sized form controls, wrapping long names and reduced-motion support improve usability across phones and tablets. `MutationObserver` and `annotateMobileTables()` add field labels to dynamically rendered table cells.

## 9. Local storage, publication and refresh

**Local editing.** `IS_LOCAL_EDITOR` checks the browser hostname/protocol. After the local PIN is accepted, `saveDraft()` validates the document and saves it to `localStorage` under `elanthoor_kalamela_editor_clean_v7`. The draft survives page reloads in the same browser and origin. It is not synchronised across devices or browsers.

**Export.** `exportJson()` validates and downloads `results.json` with an updated timestamp. `importJson()` can replace the local draft with a selected JSON file, subject to confirmation and validation. `resetDraft()` discards changes and reloads the currently published JSON. The separate `Clear all participants & results` action requires typing `CLEAR` and resets the local data, without changing the fixed masters or automatically changing the public site.

**Publication.** Replace the repository's `data/results.json` with the exported file, commit and push. GitHub Pages must finish deploying before the update is public. Public visitors fetch `data/results.json?fresh=<timestamp>` with `cache: "no-store"` at load and approximately every 60 seconds thereafter. The query string helps avoid stale JSON; deployment/CDN delays may still apply.

**Suggested operator sequence:** Register people → record results → inspect scoreboard and awards → export JSON → check the file and keep a backup → commit and push → verify public site on a phone. Avoid simultaneous organisers editing independent local drafts: there is no conflict resolution or shared write store.

## 10. Security, privacy and reliability boundaries

This is a static-site solution, not a secured multi-user administration system. The `local-demo` PIN is embedded in client JavaScript, and localhost/file-origin checks only determine whether editing controls are displayed. **Neither constitutes secure authentication or authorisation.** Security of public publication relies on who can commit to the GitHub repository. Do not store secret credentials in these files.

Published JSON contains participants' **names, church affiliations and gender**, plus competition performance. Confirm event-organiser permissions and participant consent before making those details publicly available, particularly for minors. Git history can preserve earlier files even after later updates; consider this when correcting private information.

Other operational limitations: drafts depend on browser local storage and can be lost through browser cleanup; a broken or missing JSON file prevents public results from loading; the external logo depends on the diocesan host; changing event IDs/church IDs can orphan old records; the public results are refreshed by polling rather than push updates. Maintain versioned JSON backups and review exports before committing.

## 11. Testing and maintenance checklist

The Version 8 release notes report JavaScript syntax checks, responsive testing at **320, 375, 390, 430, 768 and 1024 CSS pixels**, and a 375px simulated-browser flow for participant registration, separate 1st/2nd-place church selectors, score display and JSON export. These are tests of the supplied build; **a deployed GitHub Pages site and physical phones should still be checked**.

Before the Kalamela, test the following:

1. Every church is selectable and classified as the correct main pastorate or outstation.
2. A participant registered under one church appears in that church's winner selector for all three positions.
3. Gender-specific events prevent selecting the wrong gender.
4. A group result requires at least two registered members but credits the church points only once.
5. Two-entrant individual events increase church points but do not increase eligible award points.
6. Group bonuses resolve only a genuine tie in eligible individual points; unresolved ties display all leaders.
7. Result edits, clears, JSON exports and JSON imports preserve valid references and counts.
8. At least one real Android and iPhone can load Home, Scoreboard, Leaderboard and matrix; the matrix scrolls independently.
9. A committed JSON change appears on the public site after GitHub Pages deploys; allow up to the next polling cycle for an already-open tab.
10. Save a backup export after each verified publishing round.

### Common troubleshooting

| Symptom | Likely cause / first check |
|:---|:---|
| Public site still shows old points | Was `data/results.json` committed and Pages deployed? Reload or wait for the ~60-second poll. |
| Local changes disappear on another laptop | Drafts are browser-local; export/import JSON to transfer. |
| 2nd-place picker empty | Confirm the selected church has registered members, that the church dropdown changed, and any gender restriction. |
| Award leader not appearing | Participant must have Male/Female gender, eligible individual points, and a known event count of at least 3. |
| Group result saved but bonus missing | Ensure the group's participant IDs are assigned; legacy entries may have empty member lists. |
| Local site cannot load JSON | Serve with VS Code Live Server rather than opening `file://` directly; confirm `data/results.json` exists and is valid. |

## 12. Key function map for developers

| Location (`script.js`) | Responsibility |
|:---|:---|
| `CHURCH_ENTRIES`, `CHURCH_FAMILIES`, `PASTORATES` | Fixed church directory and hierarchy |
| `MASTER_EVENTS` | Fixed events, categories, tags and gender constraints |
| `validateDocument`, `migrateVersion2/3` | Validation and compatibility with older JSON |
| `initialise`, `fetchPublished`, `saveDraft` | Startup, public JSON loading, and local persistence |
| `showPage`, `activateAdminTab` | Top-level and Admin navigation |
| `saveParticipant`, `bulkAddParticipants` | Participant registration and edit lifecycle |
| `showEventForm`, `renderWinnerSelection`, `saveResultsForEvent` | Winner form generation and validated save |
| `getPastorateTotal`, `participantScores` | Church totals and personal scoring components |
| `leaderboardPositions`, `renderAwards` | Category rankings and individual recognitions |
| `renderScoreboard`, `renderMatrix`, `downloadMatrixCsv` | Public reporting and CSV export |
| `exportJson`, `importJson`, `resetDraft` | Publishing and data recovery |
| `annotateMobileTables`, `initialiseResponsiveTables` | Labelled mobile table-card presentation |

## 13. Future enhancements (not implemented)

Possible later improvements are server-side authenticated administration, a shared database with automatic publication, edit history/audit logs, event-result approval and rollback, backup automation, and first-class reporting for each competition. These are **recommendations**, not features present in Version 8. For now, the explicit JSON-review-and-commit process remains the publication control point.

---

**Source inspected:** `CSI_Elanthoor_Kalamela_Mobile_Responsive_v8.zip` (`index.html`, `style.css`, `script.js`, `data/results.json`, `README.md`, `assets/favicon.svg`). Technical descriptions and rule definitions were checked against the files in that archive.
