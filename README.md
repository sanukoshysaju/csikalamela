# CSI Elanthoor District Youth Kalamela — event tags and revised award rules (v5)

A static GitHub Pages site with **21 fixed churches** (10 main pastorates and 11 outstations), **34 fixed competition events**, participant registration, event placements, category-specific leaderboards, a results matrix, and JSON export. The website retains the official logo URL, public design, church IDs `p01`–`p21`, and event IDs `e01`–`e34` from the preceding version.

## What changed in this version

### Master events: `tag`

Every object inside `MASTER_EVENTS` in `script.js` has a `tag` field with one of exactly three values:

- `stage` — an individual stage performance;
- `writing` — an individual writing / non-stage competition;
- `group` — a team competition.

**The tag determines whether the result form asks for a single participant or group members.** For `stage` and `writing` events, the participant picker is a single dropdown. For `group` events, use the multiple-member picker. The app derives the event's `type` from `tag`, so to fix a classification edit its `tag` only in `MASTER_EVENTS`, without changing the stable event `id`.

**The labels are a provisional best-effort classification, not a verified official schedule.** Of the current events, 22 are tagged `stage`, 9 tagged `writing`, and 3 tagged `group`. The nine provisional writing tags are `e17`–`e19` and `e25`–`e30`; review especially `e25`–`e30` because the source event names may describe stage performances. Some Solo Instrument names still say `[Set A]` / `[Set B]`; check those against the official programme.

### Total competitors / teams — entered once per event

When you choose an event in **Admin → Record 1st / 2nd / 3rd Place Winners**, fill in **Total number of participants competing in this event** (`stage` / `writing`) or **Total number of teams competing in this event** (`group`). This is the total number of entrants in the whole event, **not** the number who received a placing. The value is stored as `eventCounts[eventId]` in `data/results.json` and is shown again when you edit the event. This field is required to save new entries and must be a positive whole number at least as large as the number of populated placing entries.

### Church / outstation totals

For all events, including groups and individual events with only 1 or 2 competitors, **each placing's entered points are counted in full for the winning church**. Group points are counted **only once for the church** and are not divided among its group members. Leading Pastorates and Leading Outstations are still two independent rankings; outstation points are not added to the parent main church.

### Kala Thilakam (Female) & Kala Prathibha (Male)

These awards are calculated independently by gender:

1. Sum each person's **individual** event points, but **only** from individual (`stage` or `writing`) events where **at least 3 people in total** competed. Individual event points from events with 1–2 total entrants (or with unknown counts in legacy data) are **excluded only from award scoring**. They still count for the church and remain visible in the participant's full individual score.
2. Find the person or people with the **highest eligible individual total** within each gender. A person with zero eligible individual points cannot win an award from group results alone.
3. **Only if eligible individual totals tie**, use group-event participation as a tie-break: **1st place = +5**, **2nd = +3**, **3rd = +1** per participating member. Sum those bonuses across group events. These bonuses are **not** normal personal points and never change the main church total.
4. The highest group tie-break bonus wins among people tied on eligible individual points. If they still tie, the website displays joint leaders rather than inventing another tie-break rule.

Example: Anu and Beena both have 10 eligible individual points. Anu performed in a 2nd-place group (+3) and Beena in a 1st-place group (+5). **Beena** leads. Chitra earned 50 points in a writing event that only had two competitors; those 50 points count for the church but **not** towards Chitra's Kala Thilakam score.

On the public church scoreboard, the participant table now shows **Individual points** (all individual events), **Award-eligible points** (only events with ≥3 entrants), and **Group tie-break bonus** (not added to regular individual score).

## JSON format (schemaVersion 5)

```json
{
  "schemaVersion": 5,
  "updatedAt": null,
  "participants": [
    { "id": "member-a", "pastorateId": "p01", "name": "Anu Thomas", "gender": "Female" },
    { "id": "member-b", "pastorateId": "p01", "name": "Arun George", "gender": "Male" }
  ],
  "eventCounts": {
    "e11": 6,
    "e15": 4
  },
  "results": {
    "e11": {
      "1": { "pastorateId": "p01", "participantId": "member-a", "points": 10 }
    },
    "e15": {
      "1": { "pastorateId": "p01", "participantIds": ["member-a", "member-b"], "points": 15 }
    }
  }
}
```

This example records **6 entrants** in an individual event and **4 competing teams** in a group event. Both placings give the church their full point values. The group members get a +5 tie-break bonus **only when resolving tied eligible individual scores**.

## Preserve your real results

This ZIP contains an **empty starter `data/results.json`**. If your existing version 4 (or older) site contains real results, **keep that results file** instead of replacing it with the empty one. The new site automatically migrates schema v4 to v5, retaining registered participants, results, pastorates and points. Old data has **no `eventCounts`**, so you must open each recorded event in the local editor and fill in the real total competitors/teams before its individual results become eligible for awards. Previously recorded group member IDs are retained. Group placements without participant lists cannot give tie-break bonuses until their members are assigned.

When working with a prior local editor draft, this version also looks for draft keys from versions 4 and 3. **Export a new version 5 `results.json`** after reviewing all event counts and group memberships.

## Local editing and GitHub Pages publishing

1. Unzip into your VS Code project (or start with this new folder). Ensure the project contains `index.html`, `style.css`, `script.js`, `assets/favicon.svg`, `.nojekyll`, and `data/results.json`.
2. Open `index.html` via **Open with Live Server**. Go to **Admin**, unlock with the **local-only demo PIN `local-demo`**.
3. Register participants under the correct church/outstation with full name and gender. A participant is selected from that church's list when entering a winner.
4. Select a master event; enter the **number of competitors/teams** for the entire event; select churches, individual winners or group members, and points for the announced 1st/2nd/3rd placements. Click **Save / Update Event Results**.
5. Verify the Scoreboard, Leading Pastorates, Leading Outstations and Kala Thilakam/Kala Prathibha cards.
6. Click **Download results.json**. Replace the repository's `data/results.json` with the downloaded file, commit and push. GitHub Pages serves the updated results after deployment; public visitors can refresh (and the app also polls the published JSON periodically).

**Security:** The local demo PIN is not real authentication. The public GitHub Pages site is read-only. GitHub repository write permissions determine who can publish edits. Do not publish admin secrets or API tokens in frontend code. Published JSON exposes participants' names and genders; seek consent and follow relevant privacy practices, especially for minors.

## Testing

This revision passed syntax and scoring tests (small-event exclusion, group-only participation exclusion, award tie-break, ties unresolved after bonus, church points, valid event counts, v4 migration). Its new fields and winner form were also checked in a browser DOM interaction test with a simulated local editor; run the website with VS Code Live Server on your own laptop before the real event.
