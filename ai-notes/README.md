# AI notes for Mortimeter

This folder is the project's memory for any AI that isn't the Claude session that built it: ChatGPT, a fresh Claude, anything else Josh wants to bring in. It says what Mortimeter is, how it looks, how it's built, what has been decided, what is open, and what changed when. A routine keeps it current (see the bottom), so it can be trusted as of each file's "Updated" line.

## How to use it

**To brief ChatGPT (or any model) in one paste:** open `ALL.md`. It is every numbered file joined in order, plain markdown. Paste it as the first message, then ask the question. For art and theme work also hand over `design/theme-kit/` (the screenshots and `brief.md`); that kit is written for exactly that.

**To read one topic:** the numbered files, in reading order.

| file | what it holds |
|---|---|
| `01-vision.md` | what the app is, who it's for, the philosophy behind it |
| `02-design.md` | artistic direction: palette, type, the look, the copy rules, the icon and Mortimer |
| `03-pages.md` | the current state of every page and edition, what is in dev and what is stable |
| `04-decisions.md` | things decided, with dates and the reason, so they don't get reopened |
| `05-ideas.md` | open ideas, parked ideas, and the decisions Josh still owes |
| `06-changelog.md` | what changed, by day, in plain words |
| `07-workflow.md` | how the work happens: files, rules, routines, what an AI may and may not do |

**To send something back:** put it in `INBOX.md`. That file is the mailbox from other AIs to the Claude session. Paste a ChatGPT reply, a design idea, a theme block, a critique, anything. Date it and say where it came from. Claude reads the inbox when Josh points at it, and the routine lists what is waiting there in its summary. Once something from the inbox has been acted on, it moves out of the inbox and into the Board or the changelog.

## The rules every AI should know before touching anything

- The app is called **Mortimeter**, never "OSRS Buddy" (the old name; file names still carry it for update reasons).
- Plain words. No em dashes. Few emojis. Describe what things do; no jokes written for the user.
- Colour only through the theme tokens. The look is sleek and theme-aware, never loud.
- Never Jagex art or audio. Mortimer art is ours. Wiki text is CC BY-NC-SA: reading it in the app is fine, selling the app is not.
- Nothing ships to GitHub until Josh says ship. Krystal Klear (the private edition) never appears in the public repo.
- Big UI rethinks get a mockup first (`design/mockups/`), two directions, Josh picks.

## How it stays current

The Claude session refreshes this folder as part of the day's work (a nightly routine did it until 2026-11-13 and is paused). It reads the git history since the last changelog entry, `BOARD.md`, `CLAUDE.md` and the Claude memory folder, updates the numbered files, rebuilds `ALL.md` with `node tools/ai-notes-bundle.js`, and reports what is waiting in `INBOX.md`. The Claude session also updates these files by hand when something big is decided. The "Updated" line at the top of each file says when it was last touched.
