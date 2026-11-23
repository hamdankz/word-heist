# Word Heist v5.2

Real-time browser word-search combat for 2–8 players. Node 20+, Express and Socket.IO.

## Run / deploy

`npm install`, `npm test`, `npm start`. Open http://localhost:3000. On Render create a Node Web Service from your GitHub repository, build `npm install`, start `npm start`, health check `/health`. Use a single server instance; rooms are in memory. GitHub Pages alone cannot host the backend.

## Rules

Ten target words of 4–10 letters per 10×10 puzzle; first valid claim wins, coloured letters can overlap other words. No puzzle timer or round limit. When all words are claimed or all living players vote to skip, outstanding rewards resolve, then the next puzzle starts after a four-second solution reveal. A claim cancels that player's skip vote. Rewards default to recovery after 20 seconds: restore missing HP, then convert remaining power to shields. Global consecutive claims multiply attack power (1,2,4,8,...), persist across boards and reset only by another claimant. There is no round multiplier or sudden death. Attack power is fixed at claim time; streak power is capped at 2^20 for safe arithmetic. Each player has a stable unique colour; overlapping claims show stripes of each owner colour. Attack and recovery share the same power: word length minus three, multiplied by the streak multiplier. Healing caps at full HP; excess healing becomes shields up to the shield cap. Shields and health carry over. Starting health is 30 + 5 per additional player above two. Shields capped at starting health. No friendly fire. Host selects solo, balanced random teams (size differs by at most one), or custom teams (host assigns players). Last surviving player/team wins. Final leaderboard ranks by survival, then elimination order, damage and words. Disconnection grace period 60 seconds; then forfeit. No accounts or external API.

## Testing / limitations

Syntax checks and existing puzzle generation tests run locally. Live multiplayer, mobile interaction and balancing need deployment playtesting. There is no persistent database; server restart loses matches. Players who never attack can still play indefinitely. The live interface uses a viewport-sized board, compact player cards, one-tap attacks and collapsible activity on mobile. Custom teams can be uneven. Only trusted server validates intended words; accidental dictionary words are not targets.

## Vocabulary and guide

The bundled word list has been replaced with a smaller, hand-selected family-oriented list of 774 recognisable words (4–10 letters). This is intentionally smaller than the previous unreviewed 5,000-word list. New boards balance word lengths, avoid overlapping target words, and verify that every target has exactly one matching path. The guide is at /guide.html.

## Rematches
The host can play again after a match ends with at least two connected players. Match health, shields, streaks and match statistics reset; the same room and colours remain. Random teams reshuffle; custom teams retain assignments. Lobby leaderboard ranks by cumulative earned power, then wins, actual HP damage, words and name. Departed players retain their scores until room deletion. Explicit last-player departure deletes the room; disconnected players have a 60-second grace period. Server restarts clear all scores.
