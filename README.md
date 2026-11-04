# CSI Elanthoor District Youth Kalamela — public UI refresh

Static, GitHub Pages-ready website with a refreshed mobile-first public interface and the same fixed competition/result model as the previous project.

## What changed

- Header + home banner redesigned with the CSI Madhya Kerala Diocesan Youth Movement image referenced from the [official Youth Movement page](https://csimadhyakeraladiocese.org/organisations/youth-movement/).
- The image **is loaded remotely** from the official website (URL embedded in `index.html`), **not bundled** in the ZIP. A readable CSI fallback is provided if the image is blocked or unavailable. To make it self-contained, obtain permission to download the logo into `assets/` and replace the two `src` attributes in `index.html` with its local path.
- Home now shows live statistics: 21 pastorates, 34 competitions, events with results, recorded placements.
- Revised responsive Scoreboard: pastorate selector and results summary; full pastorate × event matrix is in a collapsible section (with CSV download).
- Revised Leaderboard: top 3 pastorate cards and full ranking table.
- Revised awards cards, with the **provisional** gender-based awards warning preserved.
- A new movement-history section uses the official diocesan page for context. According to that site, the Youth Movement's predecessor annual youth gatherings were begun in 1916, and its current name was adopted in 1978. The text about the event itself is an editorial description of this Kalamela, not a quote from the diocesan site.
- The Admin Panel, stored draft, JSON export/import, `data/results.json` schema, pastorates and fixed 34 events are unchanged.

## Deployment

1. Put `index.html`, `style.css`, `script.js`, `assets/`, `data/`, and `.nojekyll` at the root of your GitHub repository.
2. Enable Pages: repository **Settings → Pages → Deploy from a branch → main / root**.
3. After entering local event winners in the Admin Panel with **Live Server** on `http://localhost:5500/` (the local demo PIN is `local-demo`), click **Download results.json**.
4. Replace `data/results.json` with the downloaded file, commit/push. Published visitors see the updated results after Pages deploys; the public site is read-only.
5. Local browser draft data does not sync automatically. Make backups of exported JSON during the event.

## Notes

- The project has **21 fixed pastorates** and **34 fixed events** in `script.js`.
- Original fixed event names from the previous build are preserved, including eight unclear Solo Instrument names labelled `[Set A]` and `[Set B]`; verify event titles against the official event schedule before publishing results.
- Group-event points count once toward their pastorate total, never automatically toward every member.
- Kala Thilakam/Kala Prathibha values remain **provisional** because only explicitly gender-labelled individual events can be classified without additional participant gender details.
- Admin access is a **local editing convenience PIN**, not secure authentication. Do not add private credentials or GitHub tokens to public JavaScript.

## Source credits

- [CSI Madhya Kerala Diocesan Youth Movement](https://csimadhyakeraladiocese.org/organisations/youth-movement/) — organisation history and externally linked Youth Movement image.
- Church pastorates and the previously established Kalamela event data — supplied by the project organiser.
