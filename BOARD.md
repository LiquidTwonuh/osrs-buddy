# OSRS Buddy board

Shared between Josh and Claude. Edit it in the Beta (Board in the sidebar) or from the chat. Same file, both see it. Tick a box in the app and it ticks here.

## Now
- [ ] Coffer redesign: strip for the answers, podium for the top three, ledger bars for the rest. First pass is in, needs Josh's eyes in the Beta
- [ ] New app icons: Josh is generating candidates elsewhere (Wise Old Man, Mortimer). Claude converts, then one installer per edition (stable, Beta, Krystal Klear)

## Next
- [ ] Map cleanup: too much on screen at once. Keep every bit of info, calm the layout
- [ ] Quest steps from the wiki, shown when you click a quest on the Map. Clean, accurate, licence-safe. Likely a scheduled task (routine) that scrapes and checks, then Claude wires it in
- [ ] Coffer: tune the stage thresholds once a few people have seen "Auto"
- [ ] Android layout polish, touch dragging untested

## Small fixes spotted
- [x] Coffer: the answer chips are a wall on the phone. On a phone each answer is now one row that opens that question
- [x] Coffer: General Graardor showed "Needs Dad". "Must have defeated X" no longer reads as a quest

## Ideas
- Wise Old Bud gets smarter from a wiki scrape
- Mortimer flavoured Slayer page
- RuneLite plugin of our own that posts straight to the app's local server
- Coffer: highlight methods by a chosen skill

## Parked
- Lumped XP day splitter (WOM lands several days' XP on one day). Parked until the day popup is reworked
- Selling the app: blocked by the wiki's non-commercial licence. Free with a tip jar is the fallback
- Roadmap redo and priorities redesign: after Map

## Routines (scheduled tasks)
- Wiki watch, daily at 9: checks the wiki's money making guides for new, gone or sharply changed methods and notes them under "Wiki watch" at the bottom of this file. First routine, mostly to see how they behave
- Next candidate: quest steps from the wiki for the Map

## How we work
- Dev page is `OSRS-Buddy-dev.html`. The Beta follows it: edit, press Reload in the Beta
- Stable only changes when Josh says ship
- Krystal Klear is private and never goes in this repo
