# Vision

Updated 2026-11-02

## What Mortimeter is

A character companion for Old School RuneScape. One HTML file is the whole app; a Tauri shell wraps it for Windows and, one day, Android. It reads a character from the hiscores and WiseOldMan, from the RuneLite Character Export plugin's files on the same PC, and from the OSRS Wiki, and turns that into pages that each answer one question: what did I do, what can I do next, what is it worth, what am I close to.

The name: Mortimer, Josh's favourite Slayer master, plus "meter", because the app measures your account. Pronounced mor-tih-mee-ter. Tagline "for Old School RuneScape". It was OSRS Buddy from August to October 2026; that name was one letter from RSBuddy/OSBuddy, a third-party client that ended badly with Jagex, so it went.

## Who it's for

Josh first (LiquidTwonuh, in game "Twonuh", combat 107, 109 quests done, a mid-game main). He builds it for himself and uses it daily. Second, Krystal, his fiancée, a brand-new player, who has her own edition (Krystal Klear). Third, anyone who downloads it from GitHub. Josh checked in October: nobody else uses it yet. That is fine; it is built as if they will.

The newer player is the test for whether a page is too much. Josh likes dense screens. Everyone else who has seen the Map found it overwhelming. So density is allowed, but it must be layered: the big picture first, detail on demand.

## The philosophy

- **The game is the content.** The app doesn't invent lore or jokes. It shows real requirements, real rewards, real XP, with the game's own icons for colour. When the wiki says it, the app quotes it and credits it.
- **Honest numbers.** Days played are filled from stats even when nobody logged them. The heatmap doesn't flatter. Ready means ready: every prerequisite, every level, the combat level too.
- **Layered, not sprawling.** Josh's phrase: "hide the info in a way, layer it". One main element per page, the rest in popups, tabs, folds and sheets. Scrolling is a smell.
- **Everything links.** If a requirement is shown anywhere, it opens where you'd act on it: a quest chip opens that quest on Map with its path lit, a level row opens that skill's grind.
- **The user owns the ticks.** The app can't know what you own or what you count as done. Those are the user's to tick, and the app never wipes them. "Run setup again" cannot drop data; anything that could needs two confirmations.
- **Local only.** Your data lives in your own storage. No accounts, no cloud. Sync between devices is a Wi-Fi handoff with a QR code, planned, not built.
- **No nagging.** Incentives are allowed (streaks, fireworks on a level, an app level of its own one day). Nags are not. Nothing pops up to scold.
- **Plain words.** Copy describes what a thing does. Warmth is allowed when Josh writes it (his lines in Krystal Klear stay verbatim). Manufactured quirk from an AI is not.
- **Ours, not Jagex's.** Mortimer the character is drawn by us (a skull in a crested teal helm, purple cape, a meter motif). No Jagex models, renders or audio, ever.

## Where it's going

The near horizon is the Map redesign (tree first, popup per quest), an Upgrades page (account upgrades by skill ladder, linked to Map and Grind), and a calmer first sight for new players. Further out: Wise Old Claude (Bud with a bring-your-own API key), an Android build, Wi-Fi sync, a self-updater, Mortimeter as a skill (the app has a level), rune-styled themes. Selling it is blocked by the wiki's non-commercial licence, so it stays free; a tip jar is the fallback.
