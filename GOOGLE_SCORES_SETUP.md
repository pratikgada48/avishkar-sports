# Google Sheets score setup

1. Rename the Sheet to **Avishkar Pickleball Season 2 – Live Scores** and use the first-row headings exactly as shown in [pickleball-season-2-live-scores-template.csv](public/pickleball-season-2-live-scores-template.csv): `Match`, `Team 1`, `Team 1 Score`, `Team 2`, `Team 2 Score`, `Status`, `Last Updated`.
2. [pickleball-season-2-teams.csv](public/pickleball-season-2-teams.csv) contains the current SuperScore team data; optionally import it as a separate **Teams** tab for the score editors' reference.
3. Add the official fixture pairings and scores. Keep the first-row headings unchanged.
4. In Google Sheets, select **File → Share → Publish to web**, choose the **Live Scores** tab, select **Comma-separated values (.csv)**, and publish it. Alternatively, set **General access** to **Anyone with the link → Viewer**.
5. The provided Sheet ID is already connected in `src/data/googleScores.js`; no deployment is needed for every future score update. The website keeps only the current and immediately previous browser-cached update for comparison, hiding older updates.

After that one-time setup, changes made by score editors in Google Sheets appear on the website automatically within 30 seconds.

SuperScore team reference: SHRUSTI SMASHERS, KISMAT KICKSTARTERS, SMASH MATES, ROSWALT RISERS, SOBO DINK STARS, VI KINGS RANGOLI, AVISHKAR PICKLEBALL TEAM, CAR TOUCH PLUS, KALPALABDHI BULLS, DIVYA SECURITY SYSTEM.
