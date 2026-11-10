# CSI Elanthoor District Youth Kalamela – Admin Tabs (v6)

This is an update to the **v5 fixed-event, gender-aware, award-rule** website. The current site's public design, event master list (34 entries), church IDs (`p01`–`p21`), special award calculations, and **schemaVersion 5 `data/results.json`** remain unchanged.

## UI improvements

The local Admin workspace now has six tabs: **Churches, Events, Participants, Enter Winners, Recorded Results, Publish**. Keyboard left/right arrows also navigate these tabs. The Churches tab has searchable, redesigned pastorate family cards with main-church/outstation labels, points, and registration counts. The Events tab supports searching and stage/writing/group filtering.

## Corrected 1st / 2nd / 3rd winner pickers

Each place's church selector refreshes only its **own** participant dropdown. The pickers include every registered person for that church; for gender-restricted events, ineligible choices remain visible but disabled so the dropdown does not seem mysteriously empty. Each place also displays the number of eligible registered participants. Group events still use multiple-member checkboxes.

## Demo members for testing

Open the site locally using VS Code **Live Server** at `http://localhost:5500` (or the configured port), then unlock **Admin** using the **local demo PIN `local-demo`**. Open **Participants**, and click **Load sample participants**. This adds **84 clearly named DEMO participants** (four per church across all 21 churches: two males and two females). Clicking it repeatedly does not duplicate the records. `Remove unused demo participants` deletes only demo members who are not referenced in saved event results. To delete demo members who have scored, first clear/edit those results.

**Do not publish demo participants as actual results.** Demo data are only added after clicking the button. They remain in the local browser draft until exported; review before uploading `data/results.json` to GitHub.

## Scoring rules unchanged

- Full points for every placement go to its selected church once, whether individual or group.
- Eligible individual award points require **at least 3 total competitors** in that event.
- Group points are NOT distributed to members. If eligible individual points tie, group-place bonuses of +5 (1st), +3 (2nd), and +1 (3rd) break ties.
- Kala Thilakam and Kala Prathibha are ranked separately by gender.
- Leading Pastorates and Leading Outstations remain separate.

## Publishing / migration

1. Extract this ZIP. Preserve your **existing `data/results.json`** if it contains real data.
2. Serve `index.html` with VS Code Live Server; open Admin and enter results.
3. In **Publish**, click **Download results.json** and replace only `data/results.json` in your GitHub Pages repository.
4. Commit and push; deployed public pages read the same JSON, but hide the local editing controls.

The local draft key remains `elanthoor_kalamela_editor_draft_v5`, so an existing v5 draft in the same browser/site origin remains available. A GitHub Pages site does not provide real admin login. Local demo PIN is not security; GitHub repository permissions govern publication.

## Quick test

1. Click **Participants > Load sample participants**. Check the church selector and ensure four DEMO names are visible per church.
2. Open **Enter Winners**, choose a non-gender-specific individual event (e.g. Pencil Drawing), then choose different churches for first, second and third place. All three participant dropdowns should show four matching names, independently.
3. Choose a gender-specific competition. All names display, but options of the wrong gender are disabled with an explanation.
4. Enter sample positions and verify **Recorded Results**, public **Scoreboard**, and **Leaderboard**.
5. Export JSON, reload the page and re-import to check persistence. Remove test data before going live.
