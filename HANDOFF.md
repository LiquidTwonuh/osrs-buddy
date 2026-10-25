# Working from the laptop

The whole project travels as this repo plus one small zip of memory. Nothing on the desktop PC is needed while you're away, and coming home is one pull.

## Set up the laptop once
1. Get the repo onto the laptop, either way:
   - **The zip** (`mortimeter-repo.zip`, sent in the chat): unzip it so the folder lands at `C:\Projects\mortimeter`. It carries the full git history. Coming home is then a copy back, or a push from the laptop to the mirror below.
   - **The private mirror** (two-way, better for a long trip): on the desktop, before leaving, run these two in a terminal in `C:\Projects\mortimeter` (Claude's session isn't allowed to create repos or push on your behalf):
     ```
     gh repo create LiquidTwonuh/mortimeter-work --private --source . --remote work --push
     ```
     then on the laptop:
     ```
     git clone https://github.com/LiquidTwonuh/mortimeter-work.git C:\Projects\mortimeter
     ```
2. Unzip `mortimeter-memory.zip` (sent in the chat) so that it lands at
   `C:\Users\<you>\.claude\projects\C--Projects-mortimeter\memory\`.
   That folder is what a Claude session reads at the start; `CLAUDE.md` and `BOARD.md` in the repo carry the rest.
3. Open Claude Code on the folder `C:\Projects\mortimeter`. First message: "read CLAUDE.md and BOARD.md, then carry on from the Board".
4. For the app itself: install `Mortimeter Beta` from the latest installer (in the chat), then in the Beta, Settings → Your other devices → Page file → Follow, and pick `C:\Projects\mortimeter\OSRS-Buddy-dev.html`. From then on the Beta shows the dev page on Reload, same as at home.
5. Page work needs only Node (for the syntax checks and the quest-steps script). Building installers needs the Rust toolchain and the Tauri CLI; skip that on the laptop unless you want it.

## Day to day
- Claude commits locally as it goes and pushes to `mortimeter-work` when a batch is done, so the desktop can pull it later.
- The public `osrs-buddy` repo stays untouched until you say ship.
- The hourly routines live on the desktop PC's Claude; they just pause while it's off.

## Coming home
In `C:\Projects\mortimeter` on the desktop:
```
git pull work main
```
Then press Reload in the Beta. Done. Delete `mortimeter-work` on GitHub afterwards if you want, or keep it as a private mirror.
