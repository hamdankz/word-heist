# Word Heist
A browser-based multiplayer word-search survival game for 2–8 people. No accounts or API keys needed.

## Run locally
Install Node.js 20 or newer, then run `npm install` and `npm start`. Open http://localhost:3000. Join using a second browser or private window (each player needs a separate browser storage session). Run `npm test` for the puzzle and combat unit tests.

## Publish on GitHub and Render
1. Create an empty GitHub repository and upload the contents of this directory (not the outer folder). Commit the files. Do not upload node_modules.
2. On https://render.com create a **Web Service**, connect the repository, and select Node as the runtime. Build command: `npm install`. Start command: `npm start`. Health check path: `/health`. Alternatively use the included render.yaml with a Render Blueprint.
3. Deploy, open the public URL and share it with friends. Test a complete match from separate browsers/devices before inviting a wider audience.

This needs a persistent Node server supporting WebSockets. GitHub Pages alone cannot run it. A single service instance is required; rooms are stored in process memory and disappear if the server restarts or sleeps. Hosting costs and free-tier limits depend on the provider. Use HTTPS in production.

## Rules (v2)
- Shared 10×10 grid, 10 target words, 45 seconds per round. First valid claim wins globally. Claimed word cells turn grey for everyone; overlapping cells remain selectable. Only generated target words count.
- Each claim requires an immediate choice: attack a living opponent for 1 HP, gain a persistent one-hit shield, or heal 1 HP (up to starting HP). While choosing, that player cannot claim another word. Others continue playing. Decisions resolve immediately and are public in the battle log.
- Starting HP: 10, 13, 15, 18, 20, 23, 25 for 2–8 players. Health and shields persist. At timeout, unused claims become shields. Eliminated players spectate. All words claimed and rewards spent ends the round early. Last survivor wins; after ten rounds highest HP wins, ties shared.
- Server serializes claims and validates paths and outcomes. No external API required. Single server instance, in-memory lobbies, casual MVP; test live multiplayer and balance before public release. Original unit tests cover puzzle generation and legacy combat only.
