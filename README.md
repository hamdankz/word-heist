# Word Heist
A browser-based multiplayer word-search survival game for 2–8 people. No accounts or API keys needed.

## Run locally
Install Node.js 20 or newer, then run `npm install` and `npm start`. Open http://localhost:3000. Join using a second browser or private window (each player needs a separate browser storage session). Run `npm test` for the puzzle and combat unit tests.

## Publish on GitHub and Render
1. Create an empty GitHub repository and upload the contents of this directory (not the outer folder). Commit the files. Do not upload node_modules.
2. On https://render.com create a **Web Service**, connect the repository, and select Node as the runtime. Build command: `npm install`. Start command: `npm start`. Health check path: `/health`. Alternatively use the included render.yaml with a Render Blueprint.
3. Deploy, open the public URL and share it with friends. Test a complete match from separate browsers/devices before inviting a wider audience.

This needs a persistent Node server supporting WebSockets. GitHub Pages alone cannot run it. A single service instance is required; rooms are stored in process memory and disappear if the server restarts or sleeps. Hosting costs and free-tier limits depend on the provider. Use HTTPS in production.

## Rules
- 10×10 grid, 10 target words, 45 seconds per puzzle. Words may run in any of eight directions. Only generated target words count; accidental words do not. Each distinct target counts once per player.
- Starting health: ceil(10 × (1 + 0.25 × (starting players − 2))). For 2 through 8 players: 10, 13, 15, 18, 20, 23, 25 HP respectively. Health persists between rounds.
- 20 seconds to allocate all earned points: one point attacks one opponent for one HP or blocks one incoming damage. No healing in this release. Unsubmitted plans default to shielding. Attacks are simultaneous, including attacks from players eliminated in that reveal.
- Last survivor wins; after ten rounds highest health wins (ties shared). All eliminated means draw. Eliminated players spectate. Reveal lasts eight seconds.
- Private lobby code and invite link. Reconnect using the same browser session. Leaving forfeits at round resolution. Voice negotiation can happen outside the game.

## Architecture and limitations
Express serves the client; Socket.IO synchronises lobby and round state. The server validates all word paths, allocations and deadlines. Puzzle generation is local using a built-in English vocabulary. Solutions and opponent plans are withheld until reveal. This is a casual MVP, not a hardened ranked service: dictionary is small, automated solvers are possible, there is no persistence, authentication, moderation or distributed scaling. Test balance and deployment before public release. Dependencies must be installed on a network-connected machine; commit the generated package-lock.json after installation for reproducible builds.
