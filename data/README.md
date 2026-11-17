# Data

Files our own tools gather. `quest-steps.json` is every quest's steps from the wiki's quick guides (CC BY-NC-SA 3.0, oldschool.runescape.wiki), filled in by `tools/quest-steps.js`, which the hourly quest-steps routine runs. `gear.json` is the wiki's three gear progression guides (Melee, Ranged, Magic) and its Skilling equipment page, with each item's ids and picture, gathered by `tools/gear.js` by hand; the same data is written inline into the page between its GEAR_DATA markers.
