# CSI Elanthoor District Youth Kalamela — Mobile-First Edition (v8)

Updated from **Clean Final-Testing Edition (v7)**. The data format, competition rules, church master list, Admin functionality, and storage key are unchanged. This release focuses on phone usability.

## Phone-first design

- **Persistent bottom navigation** on phones (Home / Scoreboard / Leaderboard / Admin), with generous touch targets and iPhone safe-area padding.
- **Home**: responsive branding, hero, primary actions, church statistics, three information cards and Youth Movement heritage section.
- **Scoreboard**: full-width church selector; compact church total; winning results and participant scores displayed as vertically stacked **mobile cards** with descriptive column labels.
- **Leaderboard**: pastorate and outstation summaries, one-column winner podiums, mobile-friendly ranking cards, and Kala Thilakam / Kala Prathibha awards.
- **Results Matrix**: deliberately remains a horizontally swipeable, scrollable grid, with sticky first column and headings. Swiping is necessary to browse 34 event columns.
- **Admin**: all six tabs fit in a 2-column grid on phones; church directory, event list, registration forms, group-member picker, winner-entry forms, recorded-result editing and JSON publication controls resize for small screens.
- **Tablet widths**: three-column Admin tabs and properly contained matrix viewport.
- Long church/participant names wrap correctly. Inputs use 16px fonts on phones to avoid iOS Safari zooming during editing.

## Installation / publishing

1. Extract this ZIP into your GitHub Pages project. Replace `index.html`, `style.css` and `script.js` with the new versions.
2. **Important: KEEP your existing `data/results.json` if it already contains your real competition results.** The JSON supplied in this ZIP is the clean empty starter, not a copy of any real data.
3. Test locally using VS Code **Live Server** at `http://localhost:5500/` (or your chosen local port).
4. Local result editing uses **Admin → PIN `local-demo`**. This PIN only guards against accidental edits; it is not secure server-side authentication.
5. Export JSON using **Admin → Publish → Download results.json**, replace the repository `data/results.json`, commit and push to GitHub Pages to update the public results.
6. The public GitHub Pages site remains **read-only**. Actual result management is local, and the public site reads `data/results.json`.

**Current local drafts are preserved**: the browser draft key remains `elanthoor_kalamela_editor_clean_v7`. Updating CSS/HTML/JS does not clear existing local entries. The provided empty `results.json` will clear published results if committed, so do not replace your real data unless that is intended.

## Unchanged competition rules

- 21 fixed churches (10 main pastorate churches + 11 outstations); 34 fixed events with stage/writing/group tags.
- Full placing points are added once to the winning church.
- Only individual-event points with at least three competitors count toward Kala Thilakam and Kala Prathibha.
- Group points stay with the church. Group members receive **tie-break bonuses only**, 1st +5, 2nd +3, 3rd +1, when eligible individual points are equal.
- Data schema: `schemaVersion: 5`.

## Verification performed

- JavaScript syntax checked using Node.js.
- Browser-rendered layouts checked at 320, 375, 390, 430, 768 and 1024 CSS pixels across Home, Scoreboard, Leaderboard and all six Admin tabs: no page-level horizontal overflow in the 60 audited views.
- Local editing flow tested at 375px: register participants, choose separate churches for 1st/2nd places, save winners, check scoreboard and export `results.json`.
- Tests use a simulated browser document because navigation to local URLs is restricted in this test environment. Check the final deployed GitHub Pages site on an actual Android/iPhone device before the event.

The linked Youth Movement image still depends on the official external URL. A built-in CSI fallback is shown if that image cannot be loaded.
