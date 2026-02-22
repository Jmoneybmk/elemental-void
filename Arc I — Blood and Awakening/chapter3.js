// ============================================================
// ARC 1 · CHAPTER 3 — "The Blackwood Road"
// Travel from Elmridge south toward Master Orin's sanctuary.
// Zones: Open Road → Broken Fang Camp → Blackwood → Beast/Hermit
// 7 possible battles. Most players hit 5-6.
// Dark tone escalation: body horror, aftermath, psychological.
// ============================================================

EV.registerChapter(1, 3, {

  // ═══════════════════════════════════════════════════════════
  // ZONE 1 — THE OPEN ROAD
  // ═══════════════════════════════════════════════════════════

  the_road_south: {
    location: 'South Road — Elmridge Border',
    scene: 'road',
    moodLabel: 'Departure',
    text: `The road is dirt and silence.

Elmridge disappears behind you within the first hour — swallowed by a rise in the terrain, then gone. Like it was never there. Like everything that happened was a fever dream you're walking away from.

It wasn't. The bruises confirm that. Mara's letter in your pack confirms it. Garrick's pendant against your chest, still warm from the forge.

The farmland stretches south — golden fields gone to seed, stone walls crumbling where no one maintains them. Neutral territory. The gap between powers where nothing is protected and everything is prey.

[void]You walk. One foot after the other. The oldest technology in the world.[/void]

By midday, the fields give way to scrubland. The road narrows. And the smell hits you.

Smoke. Old smoke. And something underneath it that your body recognizes before your mind does.`,
    choices: [
      { text: 'Follow the smoke. Know what happened.', next: 'burned_farmstead' },
      { text: 'Avoid it. Stay on the road. Don\'t look.', next: 'road_avoidance' },
    ]
  },

  burned_farmstead: {
    location: 'South Road — Burned Homestead',
    scene: 'fire',
    moodLabel: 'Aftermath',
    text: `The farmstead is a skeleton. Four walls, no roof. Timber beams black and collapsed inward like broken ribs.

The door was barred from the outside. You can see the char marks where someone wedged a beam across it before the fire started.

[blood]Inside: shapes. You don't look closely. You don't need to. The smell tells you everything — copper and ash and the sweet sickness underneath that means burned flesh and hair.[/blood]

Outside the ruin: boot prints. Dozens. Heavy treads, military spacing gone sloppy. And scratched into the remaining doorframe — a circle with a fang through it.

Broken Fang.

A child's shoe sits in the ash by the threshold. Small. Leather. One shoe. You look for the other and don't find it.

[void]This is what happens to places without walls. Without elementalists. Without anyone to fight back.

This is what Elmridge would have been.[/void]`,
    effects: { corruption: 2, resolve: 1, setFlag: { saw_farmstead: true } },
    choices: [
      { text: 'Search for survivors. Someone might have escaped.', next: 'farmstead_search' },
      { text: 'Bury what you can. They deserve that much.', next: 'farmstead_bury' },
      { text: 'Move on. You can\'t help the dead.', next: 'road_continues' },
    ]
  },

  road_avoidance: {
    location: 'South Road — Detour',
    scene: 'road',
    moodLabel: 'Denial',
    text: `You circle wide. The smoke hangs in the air for a quarter mile — a grey pall that tastes of things you refuse to name.

You don't look. Looking won't help. Knowing won't help. You have a destination and the dead don't care about witnesses.

[void]But your body knows. The smell gets into your clothes, your hair. You'll carry it for days.[/void]

The road continues south. The scrubland thickens toward treeline. Whatever happened back there, it happened recently. Which means whoever did it is still close.`,
    effects: { setFlag: { avoided_farmstead: true } },
    choices: [
      { text: 'Stay alert. Watch for tracks.', next: 'road_continues' },
    ]
  },

  farmstead_search: {
    location: 'South Road — Burned Homestead',
    scene: 'dark',
    moodLabel: 'Searching',
    text: `You check the outbuildings. A collapsed barn — empty. A root cellar with the door torn off — ransacked, grain scattered, preserves smashed.

Behind the cellar, in a drainage ditch choked with weeds: marks. Small hands, dragging through mud. Someone crawled out the back while the fire took the front.

The trail leads east into scrubland and disappears. Whoever crawled out — child-sized, based on the handprints — made it at least a hundred meters before the trail goes cold.

[void]Alive or dead, you can't know. But they got out. That's something. In a world like this, that's something.[/void]

Among the wreckage, you find a ceramic flask, miraculously intact. The liquid inside smells like the mana tincture Mara gave you — herbal, sharp, faintly luminous.`,
    effects: { resolve: 1, item: { name: 'Salvaged Tincture', icon: '🧴' }, setFlag: { searched_farmstead: true } },
    choices: [
      { text: 'Continue south. Carefully.', next: 'road_continues' },
    ]
  },

  farmstead_bury: {
    location: 'South Road — Burned Homestead',
    scene: 'dark',
    moodLabel: 'Respect',
    text: `You don't have a shovel. You use your hands and a flat stone, scraping earth over what remains. It takes an hour. Your fingers bleed. The work is grotesque and necessary.

You don't count. You don't look at faces. You move ash and bone and soil and you do the only thing left to do for people who deserved better.

[void]When it's done, you stand over the shallow grave. No prayer — you don't know this world's gods, if it has any. Just silence. And the resolution that the people who did this are on the road ahead of you.[/void]

Your hands are black to the wrists. The blood from your torn fingernails mixes with the ash.`,
    effects: { resolve: 2, corruption: -1, strength: 1, setFlag: { buried_dead: true } },
    choices: [
      { text: 'Continue south. With purpose.', next: 'road_continues' },
    ]
  },

  road_continues: {
    location: 'South Road — Approaching Treeline',
    scene: 'road',
    moodLabel: 'Closing In',
    text: `The road dips into a shallow valley before the tree line begins. Blackwood Forest — you can see it from here. A wall of dark timber, canopy so thick the interior is twilight even at noon.

Between you and the forest: movement.

Three figures on the road ahead. Leather armor, weapons visible. They haven't seen you yet — they're focused south, walking the same direction, checking their surroundings with the paranoid alertness of people who know they're hunted.

[blood]Broken Fang scouts. Stragglers from the Elmridge raid, or a rearguard for the main group.[/blood]

They're between you and the Blackwood. Going around means hours of cross-country travel through exposed scrubland.`,
    choices: [
      { text: 'Ambush them. They don\'t know you\'re here.', next: 'scout_ambush' },
      { text: 'Follow at a distance. See where they lead.', next: 'follow_scouts' },
      { text: 'Use {ELEMENT} to create a distraction, then slip past.', condition: { flag: 'first_element_used' }, next: 'distract_scouts' },
    ]
  },

  scout_ambush: {
    location: 'South Road — Ambush Point',
    scene: 'battle',
    moodLabel: 'Ambush',
    text: `You close the distance using the scrubland for cover. Fifty meters. Thirty. Twenty.

[blood]They never see you coming.[/blood]

The first one turns at the sound of your footstep and his expression says everything — recognition, fear, the sudden understanding that the person Elmridge sent running is now between them and safety.`,
    effects: { setFlag: { ambushed_scouts: true } },
    choices: [ { text: '[ Fight ]', next: 'scout_battle_start' } ],
  },

  scout_battle_start: {
    location: 'South Road',
    scene: 'battle',
    moodLabel: 'COMBAT',
    text: `Three Broken Fang scouts. They scramble for weapons.`,
    effects: { setFlag: { scout_battle_triggered: true } },
    choices: [],
  },

  follow_scouts: {
    location: 'South Road — Trailing',
    scene: 'road',
    moodLabel: 'Patience',
    text: `You drop back. Two hundred meters. Close enough to track, far enough that their periodic glances back don't catch you.

They walk for an hour. Sloppy discipline — they argue, stop twice, one relieves himself against a tree without posting a lookout. Amateurs. Dangerous amateurs, but amateurs.

At the treeline, they turn east along the forest's edge. Not entering — skirting. They're heading for something. A camp.

[void]You follow. Through the scrubland, belly-low when the terrain demands it. Your clothes are filthy, your knees raw, but you see where they go.[/void]

A ravine, two hundred meters into the scrub. Hidden from the road. Tents. Firelight. People.

The Broken Fang camp. Bigger than you expected.`,
    effects: { agility: 1, setFlag: { followed_scouts: true, found_camp_early: true } },
    choices: [
      { text: 'Scout the camp from the ridge.', next: 'camp_scout' },
    ]
  },

  distract_scouts: {
    location: 'South Road — Bypass',
    scene: 'fire',
    moodLabel: 'Misdirection',
    text: `You push {ELEMENT} west — a burst of energy, noise, displaced air. The scouts spin toward it, weapons drawn, and you move east through the scrub while their backs are turned.

[element]{ELEMENT_SYMBOL} The distraction holds for thirty seconds. Enough time to cross the danger zone and reach the tree line.[/element]

You're past them. But their presence confirms what you suspected — the Broken Fang are between you and the Blackwood. Probably camped nearby, licking their wounds from Elmridge.

From the treeline, you spot their camp. A ravine in the scrubland, hidden from the road. Tents and firelight.`,
    effects: { mana: -15, setFlag: { bypassed_scouts: true, found_camp_early: true } },
    choices: [
      { text: 'Scout the camp.', next: 'camp_scout' },
      { text: 'Skip the camp. Push into the Blackwood.', next: 'skip_camp' },
    ]
  },

  scout_battle_win: {
    location: 'South Road',
    scene: 'road',
    moodLabel: 'Silence',
    text: `Three down. The road is quiet again.

[blood]You stand over them breathing hard. One is still alive — gasping, crawling. He won't make it. The wound is wrong.[/blood]

His eyes find yours.

*"More... ahead. Camp. Twenty, maybe..."*

He stops talking. Stops everything.

[void]You take what's useful — a waterskin, a short sword in decent condition, a pouch of dried meat. Pragmatism. Not looting. That's what you tell yourself.[/void]

Ahead: the Blackwood treeline. And somewhere before it, twenty more just like these three.`,
    effects: { kill: 3, corruption: 1, item: { name: 'Bandit Short Sword', icon: '⚔' }, setFlag: { scouts_dead: true } },
    choices: [
      { text: 'Find their camp before they find you.', next: 'camp_scout' },
      { text: 'Avoid the camp. Push straight into the Blackwood.', next: 'skip_camp' },
    ]
  },

  scout_battle_lose: {
    location: 'South Road',
    scene: 'road',
    moodLabel: 'Wounded',
    text: `You drop. A blade catches your arm and the pain whites everything out.

When vision returns, they're standing over you. One raises his weapon for the kill —

[void]Then stops. Looks south. A horn. Distant, urgent. Their camp, calling them back.[/void]

They leave you bleeding in the dirt. Not worth finishing when their own people are signaling danger.

You lie there for a full minute before the pain downshifts enough to move.`,
    effects: { hp: -20 },
    choices: [
      { text: 'Bandage yourself. Keep moving south.', next: 'camp_scout' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // ZONE 2 — THE BROKEN FANG CAMP
  // ═══════════════════════════════════════════════════════════

  camp_scout: {
    location: 'Scrubland Ravine — Overlook',
    scene: 'checkpoint',
    moodLabel: 'Reconnaissance',
    text: `From the ridge: the Broken Fang camp spreads across the ravine floor. Bigger than a raiding party — this is a staging ground.

Twenty fighters. Maybe twenty-five. Tents, cook fires, weapon racks. Stolen goods piled near the center — grain sacks, livestock pens, things taken from farmsteads like the one you passed.

[blood]Near the largest tent: a wooden post driven into the ground. Ropes hanging from it, stained dark. A whipping post. Or worse.[/blood]

And there — by the fire, sharpening those twin axes with long, patient strokes — the scarred man. Their leader. The one who stood at Elmridge's gate and offered a minute of mercy before the charge.

He survived.

Three approaches:

The camp has perimeter patrols — pairs of scouts circling the ridge every fifteen minutes. Picking them off would thin the numbers before any assault.

Or you go straight in. One elementalist against twenty-five. The math is insane. But the math was insane at Elmridge too.

Or you go around. Skip the camp entirely. They're not in your path if you cut through the Blackwood.`,
    effects: { setFlag: { scouted_camp: true } },
    choices: [
      { text: 'Pick off the patrols. Thin them out.', next: 'stealth_approach' },
      { text: 'Charge the camp. Hit them before they organize.', next: 'camp_assault_direct' },
      { text: 'Skip it. They\'re not your problem.', next: 'skip_camp' },
    ]
  },

  skip_camp: {
    location: 'Blackwood Forest — Western Edge',
    scene: 'dark',
    moodLabel: 'Avoidance',
    text: `You circle wide. An hour of careful movement through scrubland, staying low, keeping the camp's firelight to your east.

The Blackwood swallows you. Dark, immediate, total. Canopy so dense the sky disappears within twenty steps.

[void]Behind you, the Broken Fang camp continues burning. Twenty-five killers with stolen goods and a whipping post and absolutely no one coming to stop them.

Not your problem. You have a destination. You have Mara's letter. You have one element and a road south.

Not your problem.[/void]

You keep walking. The forest doesn't care about your guilt.`,
    effects: { corruption: 2, setFlag: { skipped_camp: true } },
    choices: [ { text: 'Push deeper into the Blackwood.', next: 'blackwood_entrance' } ],
  },

  // ── STEALTH PATH ──────────────────────────────────────────

  stealth_approach: {
    location: 'Scrubland Ravine — Perimeter',
    scene: 'dark',
    moodLabel: 'Hunting',
    text: `You circle to the camp's eastern edge and wait. The patrol pattern is sloppy — two scouts, walking the ridge, fifteen-minute loops. They talk too loud and don't watch their flanks.

The first pair approaches. You're behind a rock outcrop, five meters from their path.

[void]The choice is mechanical. Clinical. You've killed before — in Elmridge, forty-eight hours ago. But that was defense. This is ambush. This is choosing violence before violence chooses you.

There's a difference. You feel it in your chest. You do it anyway.[/void]`,
    choices: [
      { text: 'Take them. Quickly, quietly.', next: 'patrol_ambush_1' },
      { text: 'Let this patrol pass. Wait for a better opening.', next: 'patrol_wait' },
    ]
  },

  patrol_ambush_1: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'dark',
    moodLabel: 'COMBAT',
    text: `You move on the trailing scout first.`,
    effects: { setFlag: { patrol_ambush_1_triggered: true } },
    choices: [],
  },

  patrol_ambush_1_win: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'dark',
    moodLabel: 'Clean',
    text: `[blood]Two down. No alarm. You drag the bodies behind the outcrop and wait.[/blood]

Your hands are steady. That bothers you more than the shaking would.

Fifteen minutes pass. The next patrol doesn't notice the missing pair — or doesn't care. They walk the same route, same pace, same blind spots.

The camp below continues oblivious. Firelight, conversation, the scrape of axes being sharpened.`,
    effects: { kill: 2, corruption: 1, agility: 1 },
    choices: [
      { text: 'Hit the next patrol too.', next: 'patrol_ambush_2_setup' },
      { text: 'Enough stealth. Move on the camp now.', next: 'camp_assault_thinned' },
    ]
  },

  patrol_ambush_1_lose: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'battle',
    moodLabel: 'Blown',
    text: `The second scout gets a shout off before you can stop him.

[blood]A horn answers from the camp. Voices. Running feet. Your stealth approach just became a straight fight.[/blood]`,
    effects: { hp: -10 },
    choices: [ { text: 'They know you\'re here. Fight through.', next: 'camp_assault_alerted' } ],
  },

  patrol_wait: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'dark',
    moodLabel: 'Patience',
    text: `The patrol passes. Their conversation carries — complaints about rations, about the "disaster at Elmridge," about the scarred leader's temper.

*"...says we're moving south tomorrow. Into the Blackwood. Says there's a mark on the road worth hitting."*

*"Scar's gone crazy. We lost half our fighters at that village. Now he wants to push further south?"*

[void]They're talking about you. Or someone like you. A traveler on the south road — worth hitting.[/void]

The next patrol is smaller. One scout, walking alone, distracted.`,
    effects: { setFlag: { overheard_bandits: true } },
    choices: [
      { text: 'Take the lone scout.', next: 'patrol_ambush_1' },
      { text: 'Skip the patrols. Hit the camp directly.', next: 'camp_assault_direct' },
    ]
  },

  patrol_ambush_2_setup: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'dark',
    moodLabel: 'Hunting',
    text: `The next pair comes. Same route. Same blindness.

But this time one of them pauses. Looks at the ground where you dragged the bodies. Scuff marks in the dirt.

He starts to turn —`,
    choices: [ { text: '[ Strike now ]', next: 'patrol_ambush_2' } ],
  },

  patrol_ambush_2: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'dark',
    moodLabel: 'COMBAT',
    text: `No time for subtlety. He saw the marks.`,
    effects: { setFlag: { patrol_ambush_2_triggered: true } },
    choices: [],
  },

  patrol_ambush_2_win: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'dark',
    moodLabel: 'Thinned',
    text: `Four down total. The camp is missing a third of its perimeter security and doesn't know it yet.

[void]You're breathing harder now. Not fatigue — something else. The efficiency of it. How quickly you've adapted to killing. A week ago you were — what? Whatever you were before Eldara. Now you're crouched over bodies, counting remaining enemies like inventory.[/void]

The camp below: maybe twenty fighters left, minus the four you've dropped. The scarred leader is still at his fire, still sharpening those axes.

Your advantage won't last. Sooner or later, someone notices the missing patrols.`,
    effects: { kill: 2, corruption: 1 },
    choices: [
      { text: 'Move on the camp while you have surprise.', next: 'camp_assault_thinned' },
    ]
  },

  patrol_ambush_2_lose: {
    location: 'Scrubland Ravine — East Ridge',
    scene: 'battle',
    moodLabel: 'Alarm',
    text: `He gets the horn to his lips before you can close the distance. One blast — short, sharp, unmistakable.

The camp erupts below. You're committed now.`,
    effects: { hp: -10 },
    choices: [ { text: 'No choice. Full assault.', next: 'camp_assault_alerted' } ],
  },

  // ── CAMP ASSAULT VARIANTS ─────────────────────────────────

  camp_assault_thinned: {
    location: 'Broken Fang Camp — Ravine',
    scene: 'battle',
    moodLabel: 'Surprise Attack',
    text: `You come down the ridge fast. {ELEMENT_SYMBOL} {ELEMENT} blazing in your hands — not for damage, for *terror*. An elementalist descending from the dark, glowing, after their patrols vanished without a sound.

[blood]The first three freeze. Deer in headlights. You hit them before the freeze breaks.[/blood]

The camp scrambles — but they're fewer now, disorganized, rattled by the silent loss of their perimeter. Tents overturn. Someone kicks a cook fire and sends embers spraying.

The scarred leader stands. Those axes come up. His eyes find you through the chaos.

*"YOU."*

He remembers Elmridge.`,
    effects: { setFlag: { camp_assaulted: true, camp_thinned: true } },
    choices: [ { text: '[ Fight the camp ]', next: 'camp_battle_start' } ],
  },

  camp_assault_direct: {
    location: 'Broken Fang Camp — Ravine',
    scene: 'battle',
    moodLabel: 'Head-On',
    text: `No subtlety. No stealth. You walk down the ridge toward twenty-five armed killers with one element and the kind of decision-making that history books either call "heroic" or "suicidal."

[element]{ELEMENT_SYMBOL} {ELEMENT} manifests at full strength. You pour mana into it — everything you have — and the night lights up.[/element]

The camp sees you. The reaction is chaos — weapons grabbed, fires abandoned, someone screaming "MAGE" like a fire alarm.

[blood]Good. Let them be afraid. Fear is a multiplier, and you need every advantage.[/blood]

The scarred leader is already moving. Axes up. Face twisted. He doesn't look afraid. He looks hungry.`,
    effects: { mana: -20, corruption: 3, setFlag: { camp_assaulted: true, direct_assault: true } },
    choices: [ { text: '[ Fight the camp ]', next: 'camp_battle_start' } ],
  },

  camp_assault_alerted: {
    location: 'Broken Fang Camp — Ravine',
    scene: 'battle',
    moodLabel: 'Alerted',
    text: `They know you're coming. The alarm horn still echoes off the ravine walls and every fighter in the camp is armed and facing your direction.

This is the worst possible scenario. An alert camp, full strength minus whatever patrols you dropped, facing a single attacker.

[void]You go anyway. Because the alternative is running, and if you run now the Broken Fang stays intact. They raid another farmstead. They bar another door.[/void]`,
    effects: { setFlag: { camp_assaulted: true, camp_alerted: true } },
    choices: [ { text: '[ Fight through ]', next: 'camp_battle_start' } ],
  },

  camp_battle_start: {
    location: 'Broken Fang Camp',
    scene: 'battle',
    moodLabel: 'COMBAT',
    text: `Steel, screams, and chaos. The camp fights back.`,
    effects: { setFlag: { camp_battle_triggered: true } },
    choices: [],
  },

  camp_battle_win: {
    location: 'Broken Fang Camp',
    scene: 'battle',
    moodLabel: 'Broken',
    text: `[blood]Bodies. Smoke. The smell of blood hot in the cold air.[/blood]

The camp fighters are down or fled — scattered into the scrubland like insects when you lift a rock. The tents burn. The stolen goods sit untouched amid the wreckage.

But the scarred leader isn't among the fallen. He pulled back during the fight, let his people absorb the damage, and now stands at the ravine's southern edge.

Those axes. That scarred face. Waiting.

*"I remember you, mage. Elmridge. You killed my people."*

He rolls his shoulders. Steps forward.

*"My turn."*`,
    effects: { kill: 4 },
    choices: [ { text: '[ Face him ]', next: 'scar_boss_fight' } ],
  },

  camp_battle_lose: {
    location: 'Broken Fang Camp',
    scene: 'battle',
    moodLabel: 'Overwhelmed',
    text: `Too many. You cut down three, four, and the fifth puts you on the ground with a shield bash that rattles your skull.

[blood]Hands grab you. Drag you. The world tilts.[/blood]

They throw you at the feet of the scarred leader. He looks down, axes resting on his shoulders.

*"The mage from Elmridge."* He grins. It's worse than his anger. *"Brave. Stupid, but brave."*

He raises an axe.

*"Get up. I want you standing for this."*

[void]Somehow, you do.[/void]`,
    effects: { hp: -15 },
    choices: [ { text: '[ Fight him ]', next: 'scar_boss_fight' } ],
  },

  // ── SCAR BOSS FIGHT ───────────────────────────────────────

  scar_boss_fight: {
    location: 'Broken Fang Camp — The Pit',
    scene: 'battle',
    moodLabel: 'BOSS: SCAR',
    text: `The scarred man attacks.`,
    effects: { setFlag: { scar_fight_triggered: true } },
    choices: [],
  },

  scar_boss_win: {
    location: 'Broken Fang Camp — The Pit',
    scene: 'fire',
    moodLabel: 'Finished',
    text: `[blood]He falls. Not cleanly — nothing about this man is clean. He goes to one knee, then the other, axes dropping, blood from a dozen wounds.[/blood]

He looks up. The scar on his face is bisected by a new wound — yours.

*"Should've... brought more men... to Elmridge."*

He falls forward. Doesn't get up.

[void]You stand in the ruins of the Broken Fang camp. Tents burning. Weapons scattered. The whipping post standing like a monument to everything these people were.

You cut the ropes off it. Not for any practical reason. Just because someone should.[/void]

Among the stolen goods: supplies meant for villages south of here. Dried food, medical supplies, a sturdy travel cloak lined with fur.

The Broken Fang is finished. Whatever stragglers fled into the scrubland won't reform. Not without their leader. Not after this.

The Blackwood waits south. You've burned daylight and mana, but the road is clear.`,
    effects: { kill: 1, resolve: 2, strength: 1, corruption: 1,
      item: { name: 'Travel Cloak', icon: '🧥' },
      setFlag: { scar_defeated: true, broken_fang_destroyed: true }
    },
    choices: [
      { text: 'Rest among the camp ruins.', next: 'camp_rest' },
      { text: 'Push on to the Blackwood.', next: 'blackwood_entrance' },
    ]
  },

  camp_rest: {
    location: 'Broken Fang Camp — Ruins',
    scene: 'checkpoint',
    moodLabel: 'Recovery',
    text: `You sit among the ruins. Eat from the stolen supplies — dried meat, hard bread, a skin of water. Not good. But fuel.

[void]Your body demands rest. Bruises darken. Cuts sting. Mana channels ache from overuse. You give yourself thirty minutes.[/void]

The camp's cook fire still has embers. Warmth seeps into battered muscles. Your breathing slows. Element steadies.

Not healed. But functional.`,
    effects: { hp: 30, mana: 25 },
    choices: [ { text: 'Enter the Blackwood.', next: 'blackwood_entrance' } ],
  },

  scar_boss_lose: {
    location: 'Broken Fang Camp — The Pit',
    scene: 'dark',
    moodLabel: 'Down',
    text: `An axe handle catches you across the temple. The world detonates into white noise and you're on the ground, vision swimming.

Scar stands over you. Raises the axe.

Then stops. Cocks his head. Listens.

[void]From the south — the Blackwood — something howls. Not animal. Not human. A sound that vibrates in the chest and makes the fire gutter.[/void]

Scar's face changes. Fear — genuine, primal fear. He backs away from you, eyes on the tree line.

*"Forget the mage. WE'RE MOVING. NOW."*

The camp scatters. Scar and his remaining fighters flee east, abandoning everything — tents, stolen goods, you.

[blood]Whatever made that sound scared a man who bars doors and lights fires with people inside.[/blood]

You lie in the dirt until your vision clears. Then you stand, take what you need from the abandoned camp, and walk south.

Toward whatever made that sound.`,
    effects: { hp: -20, item: { name: 'Travel Cloak', icon: '🧥' },
      setFlag: { scar_fled: true, heard_blackwood_howl: true }
    },
    choices: [
      { text: 'Rest first. Bandage wounds.', next: 'camp_rest' },
      { text: 'Enter the Blackwood.', next: 'blackwood_entrance' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // ZONE 3 — THE BLACKWOOD FOREST
  // ═══════════════════════════════════════════════════════════

  blackwood_entrance: {
    location: 'Blackwood Forest — Threshold',
    scene: 'dark',
    moodLabel: 'The Dark',
    text: `The Blackwood doesn't start. It *arrives*. One step you're in scrubland with sky overhead. The next step the canopy closes like a mouth and the light dies.

Not dark like nighttime. Dark like the inside of something alive.

The trees here are wrong. Trunks black as pitch, bark that weeps sap thick as tar. The sap moves — not dripping, *crawling* — downward along the bark in patterns that almost form shapes before dissolving.

The ground is soft. Spongy. Your footsteps make no sound and leave no prints, the surface rebounding like flesh.

[void]No birdsong. No insects. The only sound is your breathing and, somewhere distant, the creak of wood under pressure — trees growing, or bending, or reaching.[/void]

The path exists but barely. A depression in the forest floor that might be a trail or might be a drainage channel. It leads south.

Something watches. You can't see it. You can't hear it. But the back of your neck knows.`,
    effects: { setFlag: { entered_blackwood: true } },
    choices: [
      { text: 'Follow the path. Stay focused.', next: 'blackwood_deep' },
      { text: 'Use {ELEMENT} for light. See what\'s watching.', condition: { flag: 'element_revealed' }, next: 'blackwood_illuminate' },
      { text: 'Move off-path. Harder to follow, harder to ambush.', next: 'blackwood_offpath' },
    ]
  },

  blackwood_illuminate: {
    location: 'Blackwood Forest — Interior',
    scene: 'fire',
    moodLabel: 'Revealed',
    text: `[element]{ELEMENT_SYMBOL} {ELEMENT} flares in your palm. Light pushes back the darkness — ten meters, twenty — and you see.[/element]

The trees lean inward. Not toward sunlight. Toward *you*. Toward the elemental energy. Branches angle down like fingers, bark splitting in formations that look uncomfortably like mouths frozen mid-word.

In the branches above: cocoons. Silk-white, person-sized, hanging motionless. Dozens of them. Old — the silk grey and fraying, whatever was inside long gone.

[blood]One cocoon is newer. The silk still has color. Something inside twitches — once — then stops.[/blood]

The trees *groan*. Not wind. Reaction. Your element bothers them.

You kill the light. Some things are worse when you can see them.`,
    effects: { mana: -10, resolve: 1, corruption: 1, setFlag: { saw_cocoons: true } },
    choices: [
      { text: 'Keep moving. Don\'t stop until you\'re through.', next: 'blackwood_deep' },
    ]
  },

  blackwood_offpath: {
    location: 'Blackwood Forest — Off-Trail',
    scene: 'dark',
    moodLabel: 'Lost',
    text: `Off the path, the forest thickens immediately. Trees so close their trunks touch. The tar-sap gets on your clothes, your hands. Warm. Slightly sticky. It smells like copper and rotting sweetness.

You push through for twenty minutes before realizing the trees are denser ahead than behind. The forest is channeling you. Herding.

[void]Back on the path. The Blackwood has opinions about where you walk. Arguing with a forest is a fight you can't win.[/void]`,
    effects: { hp: -5, agility: 1, setFlag: { tried_offpath: true } },
    choices: [
      { text: 'Accept the path. Keep moving south.', next: 'blackwood_deep' },
    ]
  },

  blackwood_deep: {
    location: 'Blackwood Forest — Deep Interior',
    scene: 'dark',
    moodLabel: 'Deeper',
    text: `Hours in the Blackwood. Time stops meaning what it should — you can't see the sun, can't judge by shadow, can't tell if it's been two hours or six.

The path winds. Descends. The trees change — older, larger, their root systems exposed like veins across the forest floor. You step over them carefully, aware that the roots pulse faintly. Circulation. The forest has a heartbeat.

Then you hear it.

Crying.

Small. Thin. A child — somewhere ahead, off the path, muffled by distance and dark wood.

[void]Your every instinct says wrong. The Blackwood is wrong, the crying is wrong, everything about this is designed to make you walk toward it.

But it sounds real. It sounds like a child alone in a place nothing should be alone.[/void]`,
    choices: [
      { text: 'Investigate the crying. Carefully.', next: 'shiva_approach' },
      { text: 'Ignore it. It\'s a trap. Keep moving.', next: 'shiva_bypass' },
      { text: 'Call out. "Is someone there?"', next: 'shiva_callout' },
    ]
  },

  shiva_bypass: {
    location: 'Blackwood Forest — Deep Interior',
    scene: 'dark',
    moodLabel: 'Refusal',
    text: `You walk past. The crying follows you for a hundred meters — tracking parallel, always the same distance — then stops.

[void]Silence. Then, very softly, a giggle. Not childlike. Wrong pitch, wrong cadence, like something mimicking laughter from a description it read.[/void]

The feeling of being watched intensifies, then fades. Whatever it was, you refused the invitation.

Good instinct. Or cowardice. In the Blackwood, they might be the same thing.`,
    effects: { resolve: 1, setFlag: { bypassed_shiva: true } },
    choices: [ { text: 'Continue south.', next: 'hollow_corruption_signs' } ],
  },

  shiva_callout: {
    location: 'Blackwood Forest — Deep Interior',
    scene: 'dark',
    moodLabel: 'Invitation',
    text: `Your voice carries wrong in the Blackwood. Flat, muffled, swallowed by the trees.

The crying stops immediately. Silence.

Then a small face peers from behind a tree trunk. A girl. Maybe eight years old. Dark hair, pale skin, eyes wide and wet with tears. Barefoot. Wearing a dress too clean for this forest.

*"Are you... are you real?"*

Her voice is small. Trembling. Perfect.

[void]Too perfect.[/void]`,
    choices: [
      { text: '"Yes. Are you lost?"', next: 'shiva_encounter' },
      { text: 'Something\'s wrong. Step back.', next: 'shiva_approach_cautious' },
    ]
  },

  shiva_approach: {
    location: 'Blackwood Forest — Clearing',
    scene: 'dark',
    moodLabel: 'The Child',
    text: `You follow the sound. Thirty meters off-path, through roots and black trunks, into a small clearing where the canopy thins enough to let grey light through.

She's sitting on a fallen log. A girl. Small — eight, maybe nine. Dark hair hanging in her face. Bare feet, clean white dress. Crying into her hands.

She looks up. Eyes red, face streaked. The relief in her expression is immediate and total.

*"Please — I'm lost. I've been here so long. Please help me."*

[void]The dress is too clean. The clearing is too convenient. The crying stopped the instant you were visible, not the instant you were audible.

Everything about this is wrong.

But she looks like a child. And you are not yet the kind of person who walks away from a child crying in the dark.[/void]`,
    choices: [
      { text: '"It\'s okay. I\'m here. What\'s your name?"', next: 'shiva_encounter' },
      { text: 'Approach but stay alert. Something\'s off.', next: 'shiva_approach_cautious' },
    ]
  },

  shiva_approach_cautious: {
    location: 'Blackwood Forest — Clearing',
    scene: 'dark',
    moodLabel: 'Caution',
    text: `You approach but keep three meters distance. Hand near your weapon. Element ready.

She watches you with those red-rimmed eyes. Then tilts her head. Slowly. Further than a neck should comfortably allow.

*"You're careful. That's... unusual."*

Her voice changes. Still a child's voice, but the trembling is gone. Replaced by something older. Curious. Amused.

*"Most people come closer. Most people want to help."*

She smiles. It's a good smile. Practiced.

[void]*"Will you talk to me? Just for a while? It's been so long since someone talked to me."*[/void]`,
    effects: { setFlag: { shiva_cautious: true } },
    choices: [
      { text: '"What are you?"', next: 'shiva_encounter' },
      { text: 'Leave. Now. Don\'t look back.', next: 'shiva_leave_attempt_1' },
    ]
  },

  // ── SHIVA'S TRANCE — ESCALATING QUESTIONS ─────────────────

  shiva_encounter: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'The Trance',
    text: `The clearing changes. Subtly — the light softens, the trees recede, the forest's hostility dims to something almost peaceful. You feel your guard lowering. Muscles unclenching. A warmth in your chest like the first sip of Mara's tea.

[void]She's doing this. You know she's doing this. Knowing doesn't help.[/void]

The girl sits cross-legged on the log, feet swinging. Normal. Harmless. Except for the eyes, which are older than the face by centuries.

*"Let's play a game. I ask questions, you answer. Simple?"*

Her first question is easy:

*"What is your name?"*`,
    effects: { setFlag: { shiva_trance_entered: true, shiva_questions: 0 } },
    choices: [
      { text: 'Tell her your name.', next: 'shiva_q1_answer' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_1' },
    ]
  },

  shiva_q1_answer: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'Question 1',
    text: `You tell her. It feels natural. Why wouldn't you tell a lost child your name?

She repeats it. Tastes it. Her lips move around the syllables like she's eating something.

*"Nice name. Real name. I can tell."*

The warmth intensifies. You're comfortable. More comfortable than you've been since arriving in Eldara. Isn't that strange? Isn't that—

*"Second question."*

Her eyes are brighter now. The tears are completely gone. When did that happen?

*"What did you leave behind when you came here?"*

[void]The question hits somewhere deep. Not memory — deeper. A place that stores the things you don't look at.[/void]`,
    effects: { mana: -5, setFlag: { shiva_q1: true } },
    choices: [
      { text: 'Answer honestly. It pours out before you can stop it.', next: 'shiva_q2_answer' },
      { text: '"I don\'t remember." Lie to her.', next: 'shiva_q2_lie' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_2' },
    ]
  },

  shiva_q2_answer: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'Question 2',
    text: `Words come out. You describe — what? A world. A life. Specifics you didn't know you remembered. The way light looked through a window. The sound of a door closing. A voice calling your name in a place that doesn't exist anymore.

She listens. Absorbs. Her skin is smoother than before. Her posture straighter. She's not sitting on the log anymore — she's floating an inch above it, but your brain keeps editing that detail out.

[blood]Your head aches. Mana draining, but not through your element. Through your *words*.[/blood]

*"Beautiful. So much. Third question."*

She leans forward. Her hair moves in a wind that doesn't exist.

*"What are you most afraid will happen if you never get home?"*`,
    effects: { mana: -10, hp: -5 },
    choices: [
      { text: 'Answer. You can\'t seem to stop.', next: 'shiva_q3_answer' },
      { text: 'Refuse. Clamp your jaw shut.', next: 'shiva_q3_refuse' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_3' },
    ]
  },

  shiva_q2_lie: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'Liar',
    text: `*"You don't remember,"* she repeats. Then giggles.

[blood]Pain. Sharp, behind your eyes, like a needle made of cold. The lie costs you — she's in your head and lies are friction in the connection.[/blood]

*"Lying is interesting. It means you still have walls. I like walls."*

She tilts her head again. Too far. The vertebrae in her neck click audibly.

*"Third question, then. Since you won't give me that one."*

*"Who in this world would miss you if you disappeared right now?"*`,
    effects: { hp: -10, mana: -5, corruption: 1 },
    choices: [
      { text: 'Answer. Give her something real.', next: 'shiva_q3_answer' },
      { text: 'Refuse again.', next: 'shiva_q3_refuse' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_3' },
    ]
  },

  shiva_q3_answer: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'Question 3',
    text: `You answer. The words taste like blood in your mouth. She drinks them — not metaphorically. You can see it now, the faint luminous trail from your lips to hers, like breath in cold air but inverted. She inhales your words.

[void]She's taller. Or you're smaller. The log is gone — she sits on nothing, feet dangling in air, and her hair is moving in spirals and her eyes—

Her eyes are entirely black. No whites. No iris. Black mirrors reflecting something that isn't the Blackwood.[/void]

*"Delicious. So much fear. So much want."*

*"Fourth question."* Her voice is deeper. Two voices layered. Child and something else.

*"If you could trade your way home for the life of someone in this world — Mara, the blacksmith, anyone — would you?"*

[blood]The question is a blade. Answer yes and you're a monster. Answer no and she'll know you're lying. There is no correct response, only authentic ones.[/blood]`,
    effects: { mana: -15, hp: -8, corruption: 2 },
    choices: [
      { text: '"Yes." The truth, whatever it costs.', next: 'shiva_q4_answer_yes' },
      { text: '"No." And mean it.', next: 'shiva_q4_answer_no' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_4' },
    ]
  },

  shiva_q3_refuse: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'Resistance',
    text: `You clamp down. Jaw locked. Teeth grinding. The compulsion to speak is physical — pressure in your throat, your diaphragm contracting involuntarily.

[blood]She frowns. The clearing's warmth drops ten degrees. Her skin ripples — for half a second, you see something under the child's face. Angles. Joints. Too many of both.[/blood]

*"Stubborn. The stubborn ones last longer but taste better."*

She sighs. Recomposes. The child's face smooths back into place.

*"Fine. We skip to four. A harder one."*

*"Do you think you deserve to survive this world?"*`,
    effects: { hp: -8, resolve: 1 },
    choices: [
      { text: 'Answer. You\'re getting tired of resisting.', next: 'shiva_q4_answer_yes' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_4' },
    ]
  },

  shiva_q4_answer_yes: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'Question 4',
    text: `You answer. Something tears inside you — not physical. Spiritual. Mana bleeds from you like heat from an open wound.

[void]She's standing now. Taller than a child should be. Her shadow stretches behind her in a direction that doesn't match the light. It has too many limbs.[/void]

*"One more. One more and I'm full."*

She reaches out. Her hand is a child's hand. The fingers are too long by one joint each. You didn't notice before.

*"Last question, {PLAYER_NAME}."*

*"When you die in this world — and you will die in this world — what will your last thought be?"*

[blood]The clearing is freezing. The trees are gone. It's just you and her and the dark and a question that has teeth.[/blood]`,
    effects: { mana: -15, hp: -10, corruption: 2 },
    choices: [
      { text: 'Answer. Finish it.', next: 'shiva_q5_final' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_5' },
    ]
  },

  shiva_q4_answer_no: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'Question 4',
    text: `*"No,"* she repeats. The word hangs in the air between you — solid, visible, a dark shape that pulses.

*"Interesting. You believe that. How rare."*

Her smile widens. Past the boundaries of a child's face. Too many teeth.

*"Last question, then. Since you're so honest."*

*"When you die in this world — and you will die in this world — what will your last thought be?"*`,
    effects: { mana: -10, hp: -5 },
    choices: [
      { text: 'Answer. End this.', next: 'shiva_q5_final' },
      { text: '[Leave the clearing]', next: 'shiva_leave_attempt_5' },
    ]
  },

  shiva_q5_final: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'The Fifth',
    text: `You answer. The last word leaves your mouth and takes something with it — color, warmth, the feeling of being a person rather than a container.

[blood]She inhales. Long, slow, shuddering with pleasure. Her form flickers — child, then something else, then child again. The something else has no face. Just a mouth. Wide. Smiling. Full.[/blood]

*"Oh. Oh, that was lovely. You taste like two worlds at once. Like a door left open."*

She steps back. The clearing's false warmth collapses. Cold rushes in. You stagger, vision tunneling, mana critically low.

She's a child again. Small. Innocent. Except for the smile, which belongs on something that has eaten well and knows it.

*"Thank you, traveler. I've had my fill. You may go."*

She turns. Walks into the tree line. Between one trunk and the next, she's gone. Not behind a tree — *gone*. Like she was never there.

[void]The clearing is empty. The log is rotten — years old, not the smooth seat you saw. The warmth was a lie. The comfort was a lie. Only the damage was real.[/void]

You stand in the Blackwood, lighter than before. Something taken from you that you can't name but will feel the absence of for days.`,
    effects: { mana: -20, hp: -10, corruption: 3, resolve: 1,
      setFlag: { shiva_complete: true, shiva_all_questions: true }
    },
    choices: [ { text: 'Keep moving. Don\'t think about it.', next: 'hollow_corruption_signs' } ],
  },

  // ── SHIVA LEAVE ATTEMPTS (escalating difficulty) ──────────

  shiva_leave_attempt_1: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'dark',
    moodLabel: 'Escape',
    text: `You turn to leave. Your legs respond normally — the trance hasn't set yet.

[void]The girl watches you go. No protest. No pursuit. Just a small voice behind you:[/void]

*"Most people stay longer. You're smart. Or afraid. Same thing, sometimes."*

The clearing releases you. The Blackwood closes around you again — hostile, dark, but at least honestly so.

Whatever she was, you didn't give her what she wanted.`,
    effects: { resolve: 2, setFlag: { shiva_escaped: true, shiva_escaped_early: true } },
    choices: [ { text: 'Continue south.', next: 'hollow_corruption_signs' } ],
  },

  shiva_leave_attempt_2: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'dark',
    moodLabel: 'Resistance',
    text: `You try to turn. Your body resists — legs heavy, like walking through water. The trance has weight.

[void]Push. Through the resistance. One step, then another. Each one harder than the last. The clearing doesn't want to let you go.[/void]

The girl's voice follows you, sing-song: *"Running already? But we were having such a nice talk..."*

You break free. The tree line snaps closed behind you. Ten meters from the clearing the compulsion drops like a severed chain.

Your head pounds. She took something — a sip, not a meal. But you're out.`,
    effects: { hp: -5, mana: -10, resolve: 2, setFlag: { shiva_escaped: true } },
    choices: [ { text: 'Don\'t stop. Keep moving.', next: 'hollow_corruption_signs' } ],
  },

  shiva_leave_attempt_3: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'serpent',
    moodLabel: 'Struggling',
    text: `Your legs weigh a thousand pounds. The clearing has you — warm, soft, insistent. Leaving feels like climbing a wall with greased hands.

[blood]Push. PUSH. Your element flares involuntarily — {ELEMENT_SYMBOL} — and the girl flinches. The trance cracks.[/blood]

You stagger through the gap. Three steps, five, ten — the trees close behind you and the warmth dies and reality comes back sharp and cold and real.

She got two questions. Two answers. The mana loss is significant and something behind your eyes aches like a bruise in the brain.

But you're out.`,
    effects: { hp: -10, mana: -15, resolve: 2, setFlag: { shiva_escaped: true } },
    choices: [ { text: 'Keep going. Don\'t look back.', next: 'hollow_corruption_signs' } ],
  },

  shiva_leave_attempt_4: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'Breaking Free',
    text: `Everything screams don't leave. Your body, the clearing, the air itself — stay, rest, answer, it's so easy, just answer one more—

[element]You slam {ELEMENT} into the ground. Not at her — at the clearing itself. The trance. The illusion. {ELEMENT_SYMBOL} erupts and reality CRACKS—[/element]

The child's face splits. For one heartbeat you see what's underneath — not a face, a geometry. Angles folded in on themselves, a mouth that goes back further than a head should allow, eyes that are holes into somewhere that is not the Blackwood or Eldara or anywhere.

Then you're running. Through the trees, crashing through undergrowth, branches tearing at your face. The clearing vanishes behind you and the Blackwood is just a forest again, hostile but natural.

[blood]You vomit. The mana drain and the adrenaline crash hit simultaneously. On your hands and knees in black soil, retching, you feel the absence of what she took.

Three questions. Three answers. Enough to leave marks.[/blood]`,
    effects: { hp: -15, mana: -25, corruption: 2, resolve: 2, setFlag: { shiva_escaped: true, saw_shiva_true_form: true } },
    choices: [ { text: 'Recover. Keep moving.', next: 'hollow_corruption_signs' } ],
  },

  shiva_leave_attempt_5: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'Tearing Free',
    text: `You try. You try with everything left. {ELEMENT} blazes, muscles strain, willpower you didn't know you had pushes against the trance—

[blood]And it holds. Four questions deep, the connection is ironclad. Your body won't obey.[/blood]

She giggles.

*"Too deep now. Just one more. Then I'll let you go. Promise."*

The promise feels real. She will let you go. After she takes one more answer.

[void]You don't have a choice. The last question comes.[/void]`,
    effects: { hp: -5, mana: -10 },
    choices: [ { text: 'Answer. You can\'t stop it.', next: 'shiva_q5_final' } ],
  },

  // ── SHIVA COMBAT (if player attacks her) ──────────────────

  shiva_attack: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'COMBAT: SHIVA',
    text: `You lash out. {ELEMENT} blazes toward the child —`,
    effects: { setFlag: { shiva_attack_triggered: true } },
    choices: [],
  },

  shiva_attack_result: {
    location: 'Blackwood Forest — Shiva\'s Clearing',
    scene: 'hollow',
    moodLabel: 'Mistake',
    text: `[blood]Your element passes through her. Not deflected — *through*. Like hitting smoke. She doesn't move, doesn't flinch. The attack exits through her back and dissipates against the trees.[/blood]

She looks at you. The child's face is gone. What's underneath has too many angles and a smile that wraps around to the back of its head.

*"That was rude."*

Pain. Not physical — existential. Something inside you is gripped and *twisted*. Your vision inverts. Colors bleed. The world screams in a frequency below sound.

Then it stops. She's a child again. Smiling.

*"I was going to let you go after five. Now I take a little extra."*

[void]The clearing dumps you. One moment you're inside, the next you're face-down in the Blackwood twenty meters from the clearing's edge, retching, barely conscious.[/void]

She's gone. The clearing is gone. The log is rotting. The damage is very, very real.`,
    effects: { hp: -30, mana: -30, corruption: 5, setFlag: { shiva_complete: true, attacked_shiva: true } },
    choices: [ { text: 'Survive. Keep moving.', next: 'hollow_corruption_signs' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // ZONE 3.5 — HOLLOW CORRUPTION & TRANSITION
  // ═══════════════════════════════════════════════════════════

  hollow_corruption_signs: {
    location: 'Blackwood Forest — Southern Interior',
    scene: 'dark',
    moodLabel: 'Wrongness',
    text: `The further south you walk, the more the Blackwood shows its scars.

A deer. Standing between two trees. Alive, breathing, eyes tracking you. It has seven legs. The extra ones grow from its spine, twitching independently, finding no ground to push against. It doesn't seem to notice. It watches you pass with the patience of something that has forgotten how to run.

[void]Hollow corruption. The thing from the Whispering Woods — the interdimensional predator that followed you through the Veil. Its influence is here. Not the creature itself, but its *residue*. Things it touched and left changed.[/void]

A bird, flying in a tight circle overhead. The same circle. Endlessly. It has been flying that circle for so long its feathers are worn through on one side.

A tree split down the middle, both halves still growing, the heartwood exposed and pulsing with a light that isn't bioluminescence. It's something colder. Something that illuminates by removing darkness rather than adding light.

[blood]You're not safe here. But you knew that. The Blackwood has been telling you since the moment you entered.[/blood]`,
    effects: { corruption: 1 },
    choices: [
      { text: 'Push through. The southern edge can\'t be far.', next: 'beast_encounter' },
      { text: 'Rest. You need to recover before going further.', next: 'blackwood_camp' },
    ]
  },

  blackwood_camp: {
    location: 'Blackwood Forest — Hollow Tree',
    scene: 'dark',
    moodLabel: 'Night',
    text: `You find a hollow tree — real hollow, not Hollow-corruption. The interior is dry, wide enough to sit, sheltered from whatever passes in the night.

You don't sleep. You *rest*. Eyes open, element coiled, listening to the Blackwood breathe around you.

[void]Dreams come anyway. Half-conscious fragments — faces you don't know calling a name that might be yours. A room you've never been in, familiar as your own hand. The sound of a door closing that means something terrible you can't remember.[/void]

You jerk awake. Dawn — or what passes for dawn in the Blackwood. Grey light, thick as fog, seeping through the canopy.

Something is different. A sound, ahead and south. Not crying this time. Not the Hollow's wrongness.

An animal. In pain.`,
    effects: { hp: 30, mana: 30 },
    choices: [ { text: 'Investigate.', next: 'beast_encounter' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // ZONE 4 — THE WOUNDED BEAST
  // ═══════════════════════════════════════════════════════════

  beast_encounter: {
    location: 'Blackwood Forest — Southern Clearing',
    scene: 'dark',
    moodLabel: 'The Wounded',
    text: `The clearing is natural — not Shiva's construct, not Hollow corruption. Just a gap in the canopy where a massive tree fell years ago, letting light through.

In the clearing: a beast. Canine-shaped but wrong-scaled — the size of a large horse, with fur that shimmers between grey and silver. Six legs, the front pair longer than the back four, ending in broad paws with retractable claws. Its head is leonine, broad-jawed, with two sets of eyes — one pair normal, one pair above them that glow with a faint blue light.

It's trapped. Leg caught in something — not a natural snare. Metal. Gleaming black metal with runes etched into its surface. A hunter's trap, elemental-grade.

[blood]The beast is bleeding. The trap's teeth have cut deep, and the runes are *burning* — preventing it from using whatever elemental ability it possesses. Every few seconds it whimpers and pulls, and the metal bites deeper.[/blood]

It sees you. The normal eyes show fear. The glowing eyes show something else — evaluation. Intelligence beyond animal.`,
    effects: { setFlag: { found_beast: true } },
    choices: [
      { text: 'Help it. Try to open the trap.', next: 'beast_help_physical' },
      { text: 'Use {ELEMENT} on the trap. Disrupt the runes.', condition: { flag: 'element_revealed' }, next: 'beast_help_element' },
      { text: 'Give it water. It\'s been here a while.', condition: { element: 'water' }, hint: '[ Water element ]', next: 'beast_help_water' },
      { text: 'Soothe it with light. Calm its panic.', condition: { element: 'light' }, hint: '[ Light element ]', next: 'beast_help_light' },
      { text: 'Leave it. You can\'t help everything.', next: 'beast_leave' },
    ]
  },

  beast_help_physical: {
    location: 'Blackwood Forest — Southern Clearing',
    scene: 'dark',
    moodLabel: 'Effort',
    text: `You approach slowly. Hands visible. The beast tenses — a growl that vibrates in your ribcage — but doesn't lunge.

The trap is vicious. Spring-loaded jaws, rune-etched, designed for something exactly this size. Not bandit work — too sophisticated. Someone hunts elemental beasts with professional equipment.

You find the release mechanism. It takes both hands and every ounce of strength to pry the jaws apart. The beast screams — a sound that doesn't belong to anything with lungs — and yanks free.

[blood]Blood. Lots of it. The leg is mangled but not severed. The beast collapses, panting, those four eyes fixed on you.[/blood]

It doesn't attack. It doesn't run. It watches you with an intelligence that makes the hair on your arms stand up.

Then it lowers its massive head. Gently, impossibly gently, it presses its nose against your hand.

Gratitude. From something wild and powerful and in pain. Trust given because you earned it.`,
    effects: { strength: 1, hp: -5, setFlag: { helped_beast: true, beast_trusts: true } },
    choices: [
      { text: 'Bandage the wound with strips from your cloak.', next: 'beast_aftermath' },
    ]
  },

  beast_help_element: {
    location: 'Blackwood Forest — Southern Clearing',
    scene: 'fire',
    moodLabel: 'Disruption',
    text: `The runes on the trap are elemental suppressors — you can feel them working, creating a null field that prevents the beast from channeling. Your element should disrupt the frequency.

[element]{ELEMENT_SYMBOL} You push {ELEMENT} into the trap. Not to destroy it — to overload the runes. Your energy floods the suppression field, creating feedback. The runes flare, spark, and crack.[/element]

The trap's jaws spring open. The beast lurches free, trailing blood.

The moment the runes fail, the beast's own power surges back. The glowing eyes flare blue-bright. The air around it shimmers — an elemental field, strong and unfamiliar.

It turns to you. Those four eyes study you with something beyond animal comprehension.

Then it bows. Head down, massive frame lowering. A gesture that means the same thing in any world.`,
    effects: { mana: -15, resolve: 1, setFlag: { helped_beast: true, beast_trusts: true, beast_elemental_freed: true } },
    choices: [ { text: 'Tend to its wound.', next: 'beast_aftermath' } ],
  },

  beast_help_water: {
    location: 'Blackwood Forest — Southern Clearing',
    scene: 'serpent',
    moodLabel: 'Healing',
    text: `You kneel near the beast. It growls, low and threatening, but you're already reaching for Water.

[element]🌊 Water manifests between your palms — not much, but clean, cool, pure. You pour it gently over the beast's trapped leg, washing away blood, cooling the rune-burns.[/element]

The beast goes still. The growling stops. Those four eyes widen — the glowing pair brightest — and it makes a sound you haven't heard before. Not a whimper. A *trill*. Recognition. Gratitude.

Your water soothes the inflamed flesh around the trap, loosens the mechanism enough for you to pry it open with your hands. The beast pulls free.

[void]It doesn't run. It lies beside you, letting you pour more water over the wound. An elemental beast, submitting to an Outsider's healing. The trust is absolute and immediate.[/void]`,
    effects: { mana: -20, resolve: 2, setFlag: { helped_beast: true, beast_trusts: true, beast_water_healed: true } },
    choices: [ { text: 'Stay with it while it recovers.', next: 'beast_aftermath' } ],
  },

  beast_help_light: {
    location: 'Blackwood Forest — Southern Clearing',
    scene: 'serpent',
    moodLabel: 'Calming',
    text: `You raise your hands. Light — gentle, warm, not blinding. A candle's worth, not a lance.

[element]☀ The beast's panic quiets immediately. Light element radiates calm — you feel it yourself, a warmth that unknots muscles and slows heartbeats. The beast's thrashing stops. Its breathing evens.[/element]

In the calm, you approach. Open the trap with steady hands. The beast slides free, blood flowing but manageable.

It looks at you through four eyes — the glowing pair pulse in rhythm with your Light element, resonating. Matching frequency.

[void]You've connected with it on an elemental level. Light to light. Something recognized something.[/void]`,
    effects: { mana: -15, resolve: 2, setFlag: { helped_beast: true, beast_trusts: true, beast_light_calmed: true } },
    choices: [ { text: 'Tend to its injuries.', next: 'beast_aftermath' } ],
  },

  beast_leave: {
    location: 'Blackwood Forest — Southern Path',
    scene: 'dark',
    moodLabel: 'Cold',
    text: `You walk past. The beast watches you go — four eyes tracking, two glowing, two wet.

[void]It makes a sound behind you. Not aggressive. Plaintive. The sound of something that expected help and didn't get it.[/void]

The sound follows you for a hundred meters before the Blackwood swallows it.

You keep walking. Not everything is your fight. Not everything is your responsibility.

The justification tastes thin.`,
    effects: { corruption: 3, setFlag: { left_beast: true } },
    choices: [ { text: 'Continue south toward the mountain foothills.', next: 'blackwood_southern_edge' } ],
  },

  beast_aftermath: {
    location: 'Blackwood Forest — Southern Clearing',
    scene: 'dark',
    moodLabel: 'Companion?',
    text: `The beast recovers faster than anything its size should. Within an hour, it's standing — favoring the injured leg, but mobile. Its elemental field hums, accelerating its own healing.

It follows you. Not like a pet — like a companion who has decided independently where it's going, and that place happens to be wherever you are.

[element]Through your element, you feel its signature — complex, layered, unlike any single-element channel. This creature doesn't use elements. It *is* one. An elemental beast, the kind Mara mentioned. Living magic.[/element]

It makes no sound. Moves like smoke through the trees. The Blackwood parts for it — trees leaning away, undergrowth flattening. This forest respects it.

[void]Or fears it. Hard to tell the difference in the Blackwood.[/void]

It nudges your hand with its massive head. The six legs carry it without a limp now. Whatever healing process it uses, it's efficient.

You have a travel companion. Whether you wanted one or not.`,
    effects: { resolve: 1, setFlag: { beast_companion: true } },
    choices: [
      { text: 'Continue south with the beast.', next: 'blackwood_southern_edge' },
      { text: 'Explore deeper. Something about this clearing...', condition: { and: [{ flag: 'explored_village' }, { or: [{ flag: 'talked_garrick' }, { flag: 'tactical_mind' }] }] }, hint: '[ Hidden path — your training pays off ]', next: 'hidden_trail' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // ZONE 4B — HIDDEN HERMIT PATH
  // ═══════════════════════════════════════════════════════════

  hidden_trail: {
    location: 'Blackwood Forest — Hidden Trail',
    scene: 'dark',
    moodLabel: 'Discovery',
    text: `Something about the clearing's layout catches your eye. The fallen tree that created this gap — it didn't fall naturally. The break is clean, deliberate. And beneath the moss covering the trunk: axe marks. Old, but unmistakable.

Someone felled this tree to create this clearing. Intentionally.

You circle the stump and find it — a trail. Not a game path or a drainage channel. A maintained trail, brushed clean of debris, with stones placed at intervals to mark turns.

[void]Someone lives deep in the Blackwood. Someone who clears trails and fells trees and maintains paths that no one is meant to find.[/void]

The beast sniffs the trail and chuffs. Not alarm — recognition. It's been here before.

It walks ahead of you, leading.`,
    effects: { setFlag: { found_hermit_trail: true } },
    choices: [
      { text: 'Follow the beast. Follow the trail.', next: 'hermit_approach' },
      { text: 'Too risky. Return to the main path.', next: 'blackwood_southern_edge' },
    ]
  },

  hermit_approach: {
    location: 'Blackwood Forest — Deep Interior',
    scene: 'fire',
    moodLabel: 'Firelight',
    text: `The trail descends into a ravine. The trees here are different — alive, properly alive, without the Blackwood's tar-sap corruption. Someone has *healed* this section of forest.

At the ravine's bottom: a structure. Not a house — a hybrid of stone and living wood, grown as much as built. Moss roof, walls of interlocked roots reinforced with rough-cut stone. Smoke rises from a chimney that's actually a hollowed tree trunk.

A fire burns outside. Real fire — orange, natural, warm. The first real warmth since the Blackwood.

Sitting beside the fire: a man. Old but not frail. Bald head, dark skin weathered like saddle leather. A beard that reaches his chest, streaked iron-grey. He wears robes that might have been Academy-quality decades ago, now patched and re-patched into something that's more repair than original.

The beast trots toward him and receives an absent-minded scratch behind one ear. Familiar.

He looks at you. Eyes like hot coals — literally. An amber glow behind dark irises.

[element]*"Took you long enough. The trees told me you were coming six hours ago."*[/element]

He gestures to a seat beside the fire. A rough log, worn smooth by years of use.

*"Sit. Eat. Then we'll see what the serpent gave you."*`,
    effects: { setFlag: { met_hermit: true } },
    choices: [
      { text: '"Who are you?"', next: 'hermit_introduction' },
      { text: '"The trees told you?"', next: 'hermit_explanation' },
      { text: 'Sit. Eat. He doesn\'t seem dangerous.', next: 'hermit_trust' },
    ]
  },

  hermit_introduction: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'The Exile',
    text: `*"Brennan. Once of the Veridian Academy. Professor of Applied Elemental Theory. Specialist in Primary Resonance and Combination Dynamics."*

He stirs the fire with a stick. Actual flames respond — crawling up the wood, dancing between his fingers.

*"That was thirty years ago. Before I decided that academic politics were more toxic than the Blackwood. So I left. Came here. Grew a house. Made friends with the local wildlife."*

He nods at the beast, who has curled up near the fire like a very large, very strange dog.

[void]*"I know what you are. Outsider. The serpent's mark is on you — I can see it, even if you can't. And I know where you're going. South. Orin's sanctuary."*[/void]

*"I'm not going to stop you. But I might be able to help you. If you're willing to work for it."*`,
    effects: { setFlag: { hermit_introduced: true } },
    choices: [
      { text: '"Help me how?"', next: 'hermit_offer' },
      { text: '"You know Master Orin?"', next: 'hermit_knows_orin' },
    ]
  },

  hermit_explanation: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Nature Speaker',
    text: `*"Thirty years in a forest, you learn its language. Or it learns yours. Either way, the Blackwood talks. Most of what it says is complaints — too dry, too wet, something eating its roots. But occasionally it reports visitors."*

He looks at you with those ember-eyes.

*"It told me about the bandits three days before they set up camp. Told me about the girl — Shiva, the forest calls her. Told me about you, specifically, because you have a resonance the trees haven't felt in twenty years."*

[element]*"Outsider. From beyond the Veil. With the serpent's mark. The last one I felt was Elias."*[/element]

His expression darkens. Old grief.

*"I failed him. Couldn't reach him before Aldarion did. I won't make the same mistake twice."*`,
    effects: { setFlag: { hermit_introduced: true, hermit_knew_elias: true } },
    choices: [
      { text: '"What are you offering?"', next: 'hermit_offer' },
    ]
  },

  hermit_trust: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Rest',
    text: `You sit. He hands you a bowl — stew, hot, real food. The first since Elmridge that isn't dried meat or trail rations. It tastes like civilization.

He eats in silence. The fire crackles. The beast snores.

[void]For five minutes, nothing tries to kill you. In the Blackwood, that qualifies as paradise.[/void]

When the bowls are empty, he speaks.

*"I'm Brennan. Ex-Academy. Fire specialist. I live here because the alternative is teaching rich children how to light candles in Veridia."*

He looks at your hands.

*"You're carrying one element and heading into territory that requires at least two. I can fix that. If you're willing."*`,
    effects: { hp: 30, mana: 20, setFlag: { hermit_introduced: true } },
    choices: [ { text: '"What do you mean, fix it?"', next: 'hermit_offer' } ],
  },

  hermit_knows_orin: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Connections',
    text: `*"Know him? I trained him."*

He laughs at your expression.

*"Not entirely. I was one of several instructors at the Academy when young Orin Thorne was a student. Before the schism with his brother. Before everything went wrong."*

He pokes the fire.

*"Orin is the best elementalist alive. Maybe the best who ever lived. But he's also a man carrying thirty years of guilt and a prophecy he can't let go of. Be careful with him."*

[void]*"He'll want to make you into something. A weapon, a savior, a vindication. What he won't ask is what YOU want to become."*[/void]

*"But that's a problem for later. Right now, your problem is that you have one element and the road ahead is going to ask for more."*`,
    effects: { resolve: 1, setFlag: { knows_hermit_orin_connection: true } },
    choices: [ { text: '"Can you teach me?"', next: 'hermit_offer' } ],
  },

  hermit_offer: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'The Offer',
    text: `Brennan stands. The fire responds — rising with him, flames leaning toward his body like iron filings toward a magnet.

*"I can teach you Fire. Not mastery — that takes years. But enough to light a spark. Enough to have a second option when {ELEMENT} isn't enough."*

[element]He raises his hand. A flame appears — not wild, not explosive. Controlled. A tongue of fire that dances between his fingers like a living thing. Beautiful and precise.

*"Fire is passion and transformation. It's the easiest element to awaken in someone who already has one primary — the resonance patterns are closest to the surface."*[/element]

He closes his fist. The flame dies.

*"But I don't give knowledge for free. I need to know you can handle it. Fire in untrained hands kills. I've seen it."*

*"So we spar. You survive five rounds against me, you've proven you have the discipline. I'll teach you."*

[blood]*"I should warn you: I am very, very good at this."*[/blood]`,
    choices: [
      { text: '"Let\'s go."', next: 'hermit_trial_start' },
      { text: '"Five rounds? What are the rules?"', next: 'hermit_rules' },
    ]
  },

  hermit_rules: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Terms',
    text: `*"Rules: I attack. You survive. No killing — I'm testing, not murdering. Your element is allowed. Running is allowed. Cleverness is encouraged."*

He cracks his neck.

*"I'll hold back. Mostly. But I need to see how you handle pressure, how you adapt, whether you panic or think. Fire doesn't care about strength. Fire cares about control."*

*"Five exchanges. You stay standing through five, you pass."*

[void]He doesn't look like he's going to hold back very much.[/void]`,
    choices: [ { text: '"I\'m ready."', next: 'hermit_trial_start' } ],
  },

  hermit_trial_start: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'TRIAL: BRENNAN',
    text: `The old man moves.`,
    effects: { setFlag: { hermit_trial_triggered: true } },
    choices: [],
  },

  hermit_trial_survive: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Worthy',
    text: `[blood]Five rounds. You survive. Barely — burned, battered, gasping — but standing.[/blood]

Brennan extinguishes his flames. Studies you with those ember-eyes.

*"You don't fight like a warrior. You fight like a physicist — analyzing, adapting, looking for patterns. The serpent chose an interesting one."*

He sits. The combat intensity drops like a switch was flipped.

*"I said I'd teach you Fire. Sit down. Close your eyes."*

You sit. He places his hand on your chest — the warmth is extraordinary. Not burning. Awakening.

[element]🔥 Fire ignites somewhere inside you. Not your primary — adjacent to it. A second resonance, fainter but real. Heat and transformation and the knowledge that things can change, must change, will change.

*"Feel that? That's the seed. I can't grow it for you — only you can do that. But it's there now. You have two."*[/element]

You open your eyes. Between your hands, alongside {ELEMENT}: a flicker of orange. Small. Uncertain. Yours.`,
    effects: { resolve: 2, strength: 1, learnElement: 'fire', setFlag: { hermit_trial_passed: true, learned_fire_early: true } },
    choices: [ { text: 'Thank him. Continue south.', next: 'hermit_farewell' } ],
  },

  hermit_trial_fail: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Not Yet',
    text: `You go down. Round three. His fire catches your guard and the heat drops you like a puppet with cut strings.

[void]When you come to, you're beside his campfire. Bandaged. Fed. The beast is lying next to you like a furry radiator.[/void]

Brennan shakes his head.

*"Not yet. Your instincts are good but your mana control breaks under pressure. You panic and dump energy instead of managing it."*

He hands you a small pouch — herbs, pungent and warm.

*"Brew this when you make camp. It'll help your mana channels recover faster. Go to Orin. Train properly. Come back when you can survive five rounds."*

Not unkind. Just honest. Like Mara. Like the Blackwood. This world doesn't lie.`,
    effects: { hp: 30, mana: 30, item: { name: 'Fire Herb Pouch', icon: '🌿' }, setFlag: { hermit_trial_failed: true } },
    choices: [ { text: 'Accept his judgment. Continue south.', next: 'hermit_farewell' } ],
  },

  hermit_farewell: {
    location: 'Blackwood Forest — Hermit\'s Hollow',
    scene: 'fire',
    moodLabel: 'Parting',
    text: `Brennan walks you to the edge of his territory. The Blackwood is different here — healthier, the trees standing straight, the tar-sap absent.

*"The southern edge is two hours. Follow the stream — it leads to the foothills. From there, Orin's sanctuary is another half day's climb."*

He grips your shoulder. Strong for an old man.

*"Tell Orin that Brennan says hello. And that he still owes me a bottle of mountain wine from a bet thirty years ago."*

A smile. Brief, warm, gone.

*"And {PLAYER_NAME} — be careful who you trust in that sanctuary. Orin collects broken things. Not all of them heal cleanly."*

He turns back toward his hollow. The beast follows you instead — looking back once at Brennan, then forward, decision made.

The Blackwood thins. Light ahead. The smell of clean air.`,
    effects: { setFlag: { hermit_farewell: true } },
    choices: [ { text: 'Follow the stream south.', next: 'blackwood_southern_edge' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // ZONE 4C — BLACKWOOD STALKER (if beast helped)
  // ═══════════════════════════════════════════════════════════

  blackwood_southern_edge: {
    location: 'Blackwood Forest — Southern Edge',
    scene: 'dark',
    moodLabel: 'Almost Through',
    text: `The canopy thins. Real light — grey, overcast, but genuine sky-light — filters through. The southern edge of the Blackwood is close.

Then the beast stops. All six legs lock rigid. The fur along its spine stands straight up. Those four eyes fix on something behind you, above you, in the canopy.

[blood]A sound. The crack of a branch under weight. Something heavy, moving through the upper canopy, tracking you. Following.[/blood]

The beast growls. Deep, subsonic, a warning that makes your bones vibrate.

From the canopy: two eyes. Not the beast's four — two. Burning amber. Set in a face of black chitin and exposed muscle, jaw hanging open further than any hinge should allow.

[void]Blackwood Stalker. The apex predator of this forest. And the thing that set the trap your companion was caught in.[/void]

It drops.`,
    choices: [ { text: '[ Fight ]', next: 'stalker_battle_start' } ],
  },

  stalker_battle_start: {
    location: 'Blackwood Forest — Southern Edge',
    scene: 'battle',
    moodLabel: 'COMBAT: STALKER',
    text: `The Blackwood Stalker hits the ground like a falling tree. Twenty meters, closing fast.`,
    effects: { setFlag: { stalker_battle_triggered: true } },
    choices: [],
  },

  stalker_battle_win: {
    location: 'Blackwood Forest — Southern Edge',
    scene: 'dark',
    moodLabel: 'Predator Down',
    text: `[blood]The Stalker screams — a sound like tearing metal — and collapses. Its chitin armor cracked, its amber eyes dimming. The forest shakes with the impact.[/blood]

It thrashes once, twice, then goes still. The Blackwood seems to exhale — tension draining from the canopy like a held breath released.

Your beast-companion circles the corpse. Cautious, even now. Then it plants one massive paw on the Stalker's head and makes a sound — a bark, a roar, a declaration. Territorial. Final.

[void]It's claiming the territory. The beast you freed from a trap just killed the thing that set it. There's a poetry to that.[/void]

From the Stalker's broken carapace: a shard of black chitin, hard as steel, sharp as glass. A natural blade.`,
    effects: { kill: 1, resolve: 2, strength: 1,
      item: { name: 'Stalker Fang', icon: '🦷' },
      setFlag: { stalker_defeated: true }
    },
    choices: [ { text: 'Leave the Blackwood. Finally.', next: 'chapter_end_foothills' } ],
  },

  stalker_battle_lose: {
    location: 'Blackwood Forest — Southern Edge',
    scene: 'dark',
    moodLabel: 'Saved',
    text: `The Stalker is too fast. A claw catches you across the chest — not deep, but the impact sends you rolling. Your element flickers out. Mana empty. Done.

It advances. Jaw opening. Those amber eyes focused—

[blood]The beast hits it from the side like a freight train. Six legs driving, jaws locked on the Stalker's neck, pure animal fury amplified by elemental power. The two creatures tangle in a hurricane of claws and chitin and blood.[/blood]

It's over in thirty seconds. The beast stands over the Stalker's broken form, bleeding from a dozen wounds, panting. But alive. Victor.

It limps to you. Noses your chest. A whimper. Not its pain — concern for yours.

[void]It saved your life. Not because you commanded it. Because it chose to.[/void]`,
    effects: { hp: -15, resolve: 2, setFlag: { beast_saved_player: true } },
    choices: [ { text: 'Leave the Blackwood together.', next: 'chapter_end_foothills' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // CHAPTER END — FOOTHILLS & SANCTUARY APPROACH
  // ═══════════════════════════════════════════════════════════

  chapter_end_foothills: {
    location: 'Southern Foothills — Blackwood Edge',
    scene: 'mountain',
    moodLabel: 'Free',
    text: `The Blackwood ends like a wall. One step: dark, suffocating, hostile. Next step: open sky, mountain air, the smell of pine and cold stone.

You stand at the forest's edge and breathe. Real breath. Air that doesn't taste of tar and copper. The sun — actual sun — sits low in a sky scattered with clouds. Two moons are already visible, pale crescents against fading blue.

Mountains rise ahead. Snow-capped peaks, forests of proper green, streams catching light.

[void]Behind you: the Blackwood. A darkness you walked through and came out the other side. Changed. Harder. Missing something Shiva took and carrying something Brennan gave.[/void]`,
    effects: { hp: 20, mana: 20, resolve: 1, setFlag: { blackwood_survived: true } },
    choices: [
      { text: 'Make camp here. Recover before the climb.', next: 'foothills_camp' },
      { text: 'Start climbing. You can rest later.', next: 'mountain_stream' },
    ]
  },

  foothills_camp: {
    location: 'Southern Foothills — Camp',
    scene: 'mountain',
    moodLabel: 'Rest',
    text: `You make camp at the tree line. Real firewood — dry pine, not the Blackwood's tar-soaked timber. It burns clean and hot.

The beast curls beside the fire. Six legs tucked beneath, massive head on its paws, those four eyes watching you with quiet loyalty.

[void]You eat. Whatever's left in your pack, supplemented by a stream nearby. Cold water, clear as glass.

Sleep comes fast. No Hollow dreams. No Shiva whispers. Just darkness and rest.[/void]

Morning. You're stiff but whole. Stronger than yesterday.`,
    effects: { hp: 999, mana: 999 },
    choices: [ { text: 'Begin the climb.', next: 'mountain_stream' } ],
  },

  mountain_stream: {
    location: 'Mountain Trail — Stream Crossing',
    scene: 'mountain',
    moodLabel: 'Ascent',
    text: `The trail climbs steadily. Following a stream that chatters over polished stone, cutting through switchbacks and pine groves. The air thins. Temperature drops.

The beast navigates the terrain better than you — six legs on mountain rock is a considerable advantage.

[element]You feel it before you see it — elemental density increasing with every hundred meters of elevation. The air hums. Your element responds, easier to reach, more responsive. Like standing near the resonators in Elmridge, but stronger.[/element]

A convergence point. The kind of place where elemental energy pools naturally. No wonder Orin built his sanctuary here.

Two hours of climbing. Your legs burn. Your lungs protest the thin air.

Then: a plateau. A view.`,
    choices: [ { text: 'Look.', next: 'sanctuary_view' } ],
  },

  sanctuary_view: {
    location: 'Mountain Trail — Overlook',
    scene: 'mountain',
    moodLabel: 'The Destination',
    text: `Below and ahead: a valley. Hidden between peaks, invisible from any approach except this trail.

Green — impossibly green for this altitude. Trees with silver bark. A lake that reflects the sky like a mirror. Structures built into the mountainside, seamlessly integrated with the rock. Smoke from chimneys. Movement — people, training, living.

[element]The elemental field is overwhelming. Every element you know — and several you don't — pulsing through the valley like a heartbeat. This isn't a village. It's a nexus. A place where the barriers between physical and elemental reality thin almost to nothing.[/element]

Orin's sanctuary. The place Mara's letter is addressed to. The place where answers might live.

[void]The beast beside you lifts its head. Makes a sound — not a bark or a howl, but a *note*. Musical. Resonant. Like it's singing to the valley.

From somewhere below, something sings back.[/void]

You descend toward the sanctuary. Whatever comes next — training, politics, truth, danger — it starts here.`,
    effects: { setFlag: { chapter_3_complete: true, reached_sanctuary_approach: true } },
    choices: [ { text: '[ Continue to Chapter 4 ]', next: 'arc1/chapter4/mountain_approach' } ],
  },

});

// ── POST-LOAD: Battle auto-starts for Chapter 3 ──
(function() {
  var origRender = EV.renderScene;
  EV.renderScene = function(sceneObj) {
    var key = null;
    var chData = EV.CHAPTERS[EV.state.currentArc + '-' + EV.state.currentChapter];
    if (chData) {
      for (var k in chData) { if (chData[k] === sceneObj) { key = k; break; } }
    }

    // Battle 1: Scout patrol
    if (key === 'scout_battle_start' && !EV.state.flags._ch3_scout_fought) {
      EV.state.flags._ch3_scout_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Broken Fang Scouts',
            hp: 45, atk: 7, atkVar: 4, defense: 2,
            intro: 'Three scouts scramble for their weapons.',
            missChance: function(s) { return s.agility >= 15 ? 0.25 : 0.1; },
          },
          onWin: function() { EV.navigateTo('scout_battle_win'); },
          onLose: function() { EV.navigateTo('scout_battle_lose'); },
          canFlee: true,
        });
      }, 500);
      return;
    }

    // Battle 2: Patrol ambush 1 (stealth path)
    if (key === 'patrol_ambush_1' && !EV.state.flags._ch3_patrol1_fought) {
      EV.state.flags._ch3_patrol1_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Broken Fang Patrol',
            hp: 40, atk: 8, atkVar: 3, defense: 2,
            intro: 'Two scouts. Close range. No room for error.',
          },
          onWin: function() { EV.navigateTo('patrol_ambush_1_win'); },
          onLose: function() { EV.navigateTo('patrol_ambush_1_lose'); },
          canFlee: false,
        });
      }, 500);
      return;
    }

    // Battle 2b: Patrol ambush 2 (stealth path continued)
    if (key === 'patrol_ambush_2' && !EV.state.flags._ch3_patrol2_fought) {
      EV.state.flags._ch3_patrol2_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Broken Fang Patrol',
            hp: 50, atk: 9, atkVar: 4, defense: 3,
            intro: 'He spotted the blood. No more stealth.',
            abilityChance: 0.25,
            ability: function() {
              return { msg: 'One blows a horn — reinforcements incoming!', damage: 5 };
            },
          },
          onWin: function() { EV.navigateTo('patrol_ambush_2_win'); },
          onLose: function() { EV.navigateTo('patrol_ambush_2_lose'); },
          canFlee: false,
        });
      }, 500);
      return;
    }

    // Battle 3: Camp assault
    if (key === 'camp_battle_start' && !EV.state.flags._ch3_camp_fought) {
      EV.state.flags._ch3_camp_fought = true;
      var thinned = EV.state.flags.camp_thinned;
      var alerted = EV.state.flags.camp_alerted;
      var hp = alerted ? 100 : (thinned ? 65 : 85);
      var atk = alerted ? 12 : (thinned ? 8 : 10);
      var def = alerted ? 5 : (thinned ? 2 : 4);
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Broken Fang Warriors',
            hp: hp, atk: atk, atkVar: 5, defense: def,
            intro: thinned ? 'The camp is in chaos. Fewer than expected.' : (alerted ? 'They were ready. Full force.' : 'The camp scrambles to meet your charge.'),
            abilityChance: 0.2,
            ability: function() {
              var msgs = [
                { msg: 'A bandit archer fires from the tents!', damage: 10 },
                { msg: 'Two rush you from the flank!', damage: 14 },
                { msg: 'A thrown torch nearly blinds you!', damage: 8 },
              ];
              return msgs[Math.floor(Math.random() * msgs.length)];
            },
          },
          onWin: function() { EV.navigateTo('camp_battle_win'); },
          onLose: function() { EV.navigateTo('camp_battle_lose'); },
          canFlee: true,
        });
      }, 500);
      return;
    }

    // Battle 4: Scar boss fight
    if (key === 'scar_boss_fight' && !EV.state.flags._ch3_scar_fought) {
      EV.state.flags._ch3_scar_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Scar — Broken Fang Leader',
            hp: 120, atk: 14, atkVar: 6, defense: 6,
            intro: 'Twin axes. Scarred face. He remembers Elmridge.',
            missChance: function(s) { return s.agility >= 18 ? 0.3 : 0.1; },
            abilityChance: 0.35,
            ability: function(state) {
              var msgs = [
                { msg: 'Scar\'s axe bites deep — blood flows freely.', damage: 20 },
                { msg: 'A spinning double-strike — both axes connect!', damage: 22 },
                { msg: 'He headbutts you. Stars explode.', damage: 15 },
              ];
              var r = msgs[Math.floor(Math.random() * msgs.length)];
              // Bleed: extra damage
              state.stats.hp -= 3;
              return r;
            },
          },
          onWin: function() { EV.navigateTo('scar_boss_win'); },
          onLose: function() { EV.navigateTo('scar_boss_lose'); },
          canFlee: false,
        });
      }, 500);
      return;
    }

    // Battle 5: Shiva (if player attacks — invincible)
    if (key === 'shiva_attack' && !EV.state.flags._ch3_shiva_fought) {
      EV.state.flags._ch3_shiva_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Shiva',
            hp: 9999, atk: 25, atkVar: 10, defense: 99,
            resistsAll: true,
            intro: 'She tilts her head. The child\'s face splits open.',
            abilityChance: 0.5,
            ability: function(state) {
              state.stats.corruption += 2;
              var msgs = [
                { msg: 'Reality inverts. Your vision turns inside out.', damage: 30 },
                { msg: 'She whispers your true name. Something tears.', damage: 25 },
                { msg: 'Her laughter echoes from inside your skull.', damage: 20 },
              ];
              return msgs[Math.floor(Math.random() * msgs.length)];
            },
          },
          onWin: function() { EV.navigateTo('shiva_attack_result'); },
          onLose: function() { EV.navigateTo('shiva_attack_result'); },
          canFlee: true,
        });
      }, 500);
      return;
    }

    // Battle 6: Blackwood Stalker
    if (key === 'stalker_battle_start' && !EV.state.flags._ch3_stalker_fought) {
      EV.state.flags._ch3_stalker_fought = true;
      var hasBeast = EV.state.flags.beast_companion;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Blackwood Stalker',
            hp: hasBeast ? 100 : 140, atk: 16, atkVar: 8, defense: 8,
            intro: 'Chitin and muscle. Amber eyes. It drops from the canopy.',
            resists: ['shadow'],
            weakTo: ['fire', 'light'],
            missChance: function(s) { return s.agility >= 16 ? 0.2 : 0.05; },
            abilityChance: 0.3,
            ability: function() {
              var msgs = [
                { msg: 'The Stalker lunges — jaws like a bear trap!', damage: 22 },
                { msg: 'A claw rakes across your guard — chitin vs flesh.', damage: 18 },
                { msg: 'It screams — a sonic attack that rattles your bones.', damage: 15 },
              ];
              return msgs[Math.floor(Math.random() * msgs.length)];
            },
          },
          onWin: function() { EV.navigateTo('stalker_battle_win'); },
          onLose: function() { EV.navigateTo('stalker_battle_lose'); },
          canFlee: true,
        });
      }, 500);
      return;
    }

    // Battle 7: Hermit trial (survive = win at low HP)
    if (key === 'hermit_trial_start' && !EV.state.flags._ch3_hermit_fought) {
      EV.state.flags._ch3_hermit_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Brennan — The Hermit',
            hp: 200, atk: 10, atkVar: 4, defense: 12,
            intro: 'Fire erupts around his fists. He smiles.',
            resists: ['fire'],
            abilityChance: 0.4,
            ability: function(state, bs) {
              bs.turn = (bs.turn || 0) + 1;
              if (bs.turn >= 5) {
                // After 5 rounds, hermit stops
                return { msg: 'Brennan raises a hand. "Enough. You\'ve passed."', damage: 0 };
              }
              var msgs = [
                { msg: '🔥 A whip of fire cracks across your guard!', damage: 12 },
                { msg: '🔥 Brennan feints low, strikes high — heat sears your shoulder.', damage: 14 },
                { msg: '🔥 The ground beneath you erupts in flame!', damage: 16 },
              ];
              return msgs[Math.floor(Math.random() * msgs.length)];
            },
          },
          onWin: function() { EV.navigateTo('hermit_trial_survive'); },
          onLose: function() { EV.navigateTo('hermit_trial_fail'); },
          canFlee: false,
        });
      }, 500);
      return;
    }

    origRender.call(EV, sceneObj);
  };
})();
