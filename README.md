# Word Heist v3

Real-time browser word-search combat for 2–8 players. Node 20+, Express and Socket.IO.

## Run / deploy

`npm install`, `npm test`, `npm start`. Open http://localhost:3000. On Render create a Node Web Service from your GitHub repository, build `npm install`, start `npm start`, health check `/health`. Use a single server instance; rooms are in memory. GitHub Pages alone cannot host the backend.

## Rules

Ten target words per 10×10 puzzle; first valid claim wins, grey letters can overlap other words. No puzzle timer or round limit. When all words are claimed or all living players vote to skip, outstanding rewards resolve, then the next puzzle starts after a four-second solution reveal. A claim cancels that player's skip vote. Rewards default to one shield after 20 seconds. Global consecutive claims multiply attack power (1,2,3,...), reset by another claimant or a new puzzle. Shield and healing rewards always worth one. Shields and health carry over. Starting health is 30 + 5 per additional player above two. Shields capped at starting health. No friendly fire. Host selects solo, balanced random teams (size differs by at most one), or custom teams (host assigns players). Last surviving player/team wins. Final leaderboard ranks by survival, then elimination order, damage and words. Disconnection grace period 60 seconds; then forfeit. No accounts or external API.

## Testing / limitations

Syntax checks and existing puzzle generation tests run locally. Live multiplayer, mobile interaction and balancing need deployment playtesting. There is no persistent database; server restart loses matches. Defence-heavy matches may last indefinitely. Custom teams can be uneven. Only trusted server validates intended words; accidental dictionary words are not targets.
