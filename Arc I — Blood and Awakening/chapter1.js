// ============================================================
// ARC 1 · CHAPTER 1 — "The Void Opens"
// ALL text uses {ELEMENT} etc for dynamic replacement.
// ALL paths one-way. No loops. No exploits.
// Shadow minions increase near The Hollow.
// Optional Hollow boss fight.
// ============================================================

EV.registerChapter(1, 1, {

  arrival: {
    location: 'Nowhere',
    scene: 'void',
    moodLabel: 'The Crossing',
    text: `You don't remember dying.

That's the part that stays with you longest — not the sensation of the world unraveling, not the sound your body made against nothing, not the smell of ozone and burning air. What stays is the absence of pain where pain should have been.

One moment you were *somewhere*. The next, you are here.

[blood]Here is a mistake.[/blood]

You hit the earth the way something dropped from a great height hits — all at once, no grace. Wet soil and dead leaves receive you. The impact drives the breath from your lungs and replaces it with mud and the copper taste of blood. You've bitten clean through your lower lip.

The forest is silent in the way that means something has decided to be quiet about you. Eyes that aren't eyes. Attention that has no name.

The sky is wrong. Two moons hang where one should be. The stars are arranged in patterns that make your skull ache.

You are nowhere you have ever been. You are alone.

And then you're not.

A sound. Not natural. A low, wet dragging, like something heavy pulled across a surface that isn't quite solid. It comes from everywhere and nowhere.

[void]Something crossed over with you. Or something was waiting for things that cross over.[/void]`,
    choices: [
      { text: "Don't move. Don't breathe. Listen.", next: 'arrival_listen' },
      { text: 'Get up. Now. Whatever that sound is, face it standing.', next: 'arrival_stand' },
      { text: 'Assess yourself first. Injuries, surroundings, exits.', next: 'arrival_assess' },
      { text: 'Crawl. Low and quiet. Find cover before it finds you.', next: 'arrival_crawl' },
    ]
  },

  arrival_listen: {
    location: 'Whispering Woods — The Landing',
    scene: 'dark',
    moodLabel: 'Patience',
    text: `You go still.

Your hands shake. Your heartbeat is a fist against your ribs. You breathe through your nose and press your face against the soil and *listen*.

The dragging continues. Closer. Something scraping bark, a wet noise like meat being turned, and underneath a vibration below human hearing that makes your teeth ache.

Then: silence. Not natural. The *absence* of sound, like someone pulled every vibration from the air.

You count to thirty. At twenty-two, something drips onto the back of your neck. Warm. Thick. Not rain.

[blood]You don't look up. Every survival instinct screams: do not look up.[/blood]

The dripping stops. The sound moves east. Slow, like it's disappointed.

You wait a full minute. When you roll over, there's a dark viscous smear on the leaves. It smells like copper and ammonia. Where it sits, the plant matter is browning. Necrotic.

[void]Whatever this came from kills what it touches. Not acid. The leaves are forgetting how to be alive.[/void]

The canopy shows nothing. Whatever was there is gone. For now.`,
    effects: { agility: 1, setFlag: { listen_path: true } },
    choices: [
      { text: 'Examine the residue closely. Know your enemy.', next: 'examine_residue' },
      { text: 'Move. Opposite direction. West. Now.', next: 'flee_west' },
      { text: 'Grab a weapon first — branch, stone, anything.', next: 'grab_weapon' },
    ]
  },

  arrival_stand: {
    location: 'Whispering Woods — The Landing',
    scene: 'hollow',
    moodLabel: 'Defiance',
    text: `You push yourself upright before your body decides if that's wise.

Everything hurts. Your left knee. Your palms. Your mouth tastes like a butcher's floor.

You stand anyway.

The dragging stops. It noticed. You feel the shift — a pressure, a wrongness in the air.

You face the sound. Hands up. Not trained — instinct refusing to be taken from behind.

Ten seconds. Nothing.

Then a shape detaches from the tree line. Not animal. Not person. Between — tall, too tall, proportioned wrong. Its silhouette jitters like a corrupted video feed. Where its face should be: smooth, pale surface catching moonlight at the wrong angle.

[blood]No eyes. It doesn't need them. You can feel it reading you the way you'd read a menu.[/blood]

It tilts its head. Forty-five degrees past what a neck should allow.

Then it opens what you'll call a mouth — and the sound that comes out is your name. {PLAYER_NAME}. Assembled from fragments: car horns, breaking glass, a child laughing, bone snapping.

[void]It takes a step toward you.[/void]`,
    effects: { strength: 1, setFlag: { stand_path: true } },
    choices: [
      { text: 'Run. You are not equipped for this.', next: 'flee_west' },
      { text: 'Scream back at it. Predator logic.', next: 'confront_hollow' },
      { text: 'Back away slowly. No sudden movements.', next: 'back_away_hollow' },
      { text: 'Grab something — rock, branch — hold your ground.', next: 'grab_weapon_stand' },
    ]
  },

  arrival_assess: {
    location: 'Whispering Woods — The Landing',
    scene: 'dark',
    moodLabel: 'Inventory',
    text: `First things first.

Fingers: working. Arms: bruised, cracked rib left side. Legs: functional. Head: intact.

Your clothes are wrong for here. Pockets have whatever you had when the world ended. Not much.

The forest is wrong. Moss in spirals. Bioluminescent bark. Insects with too many legs.

You are not on Earth. Three seconds to process. That's all you can afford.

Then you hear it. Not forest sounds — those stopped. A low scraping from behind, and a smell: copper, ammonia, decay. The kind that bypasses your brain and goes straight to the part that remembers being prey.

Thirty meters back, between two trees, something stands. Too elongated, joints in wrong places. Pale smooth surface where a face should be. It shifts like a struggling signal.

[void]It's been watching since you landed. You are certain of this the way you are certain of gravity.[/void]

It extends one limb and presses it against a tree. The bark splits. Not from force — from *wrongness*. The wood turns black and flakes like ash.

It's patient. It has time. You don't.`,
    effects: { resolve: 1, setFlag: { assess_path: true } },
    choices: [
      { text: 'Move. Now. Quiet and fast.', next: 'flee_west' },
      { text: 'You need a weapon. Grab a branch, stone, anything.', next: 'grab_weapon' },
      { text: 'Study it. Three more seconds of data could save your life.', next: 'study_hollow' },
    ]
  },

  arrival_crawl: {
    location: 'Whispering Woods — The Landing',
    scene: 'dark',
    moodLabel: 'Low Profile',
    text: `You don't stand. Standing means being seen.

Belly down, elbows and knees. The mud soaks through. Roots scrape your ribs.

The dragging is to your right. Fifteen meters. The smell: copper, ammonia, sweet rot like fruit in a sealed room.

You crawl left. The moss dimly lights your path. You follow the brightest patches — instinct says whatever grows toward light might be growing *away* from that thing.

[void]Behind you, the sound pauses. It noticed the change in air displacement. It's listening for you the same way you listened for it.[/void]

You freeze. Count to ten. The sound resumes — farther. East while you moved west. Gap widening.

You find a root hollow — barely large enough for a body. You slide in. The roots close around you. Moss pulses warm against your skin.

You breathe. Hidden. For now.

But something out there just learned it has something to hunt.`,
    effects: { agility: 2, setFlag: { crawl_path: true } },
    choices: [
      { text: 'Wait until the sound is gone, then move west.', next: 'flee_west' },
      { text: 'While hidden, examine your surroundings. What resources are nearby?', next: 'hollow_recon' },
    ]
  },

  examine_residue: {
    location: 'Whispering Woods — The Landing',
    scene: 'dark',
    moodLabel: 'Reconnaissance',
    text: `You crouch beside the stain.

Dark, almost black, but tilted to catch moonlight it shows deep purple with iridescent threads. Warm. Consistency between blood and mucus. Where it touches leaves, the plant matter browns. Necrotic.

[void]Not acid. Cellular coherence dissolving on contact. This thing doesn't destroy — it *unmakes*.[/void]

Three facts: it drips (it was directly above you). It kills on contact. And it *chose* not to touch you when it could have. It's not just hunting. It's *playing*.

West: faintest glow between trees. Concentrated moss. Water or a clearing.`,
    effects: { resolve: 1, setFlag: { knows_hollow_contact: true } },
    choices: [
      { text: 'Head west toward the glow. Move fast.', next: 'flee_west' },
    ]
  },

  study_hollow: {
    location: 'Whispering Woods — The Landing',
    scene: 'hollow',
    moodLabel: 'Analysis',
    text: `Three seconds. You give yourself three.

Limbs 1.4x human proportion. Additional joint directions. The face-surface isn't skin — chitin or ceramic. Featureless, reflective.

No breathing. No chest movement. It shifts at 2-3 Hz — a standing wave that can't resolve.

[void]The bark death is spreading. Millimeters per second. Perfect circle. This thing doesn't just kill by touch. It establishes a *radius*.[/void]

Most importantly: it hasn't charged. It could. It's faster — you feel that in its proportions. But it's waiting.

Studying you the same way you're studying it.

Three seconds up. It steps closer.`,
    effects: { resolve: 2, setFlag: { studied_hollow: true } },
    choices: [
      { text: 'You have what you need. Run. West.', next: 'flee_west' },
      { text: 'Grab something to defend yourself. Then run.', next: 'grab_weapon' },
    ]
  },

  confront_hollow: {
    location: 'Whispering Woods — The Landing',
    scene: 'battle',
    moodLabel: 'Madness or Courage',
    text: `You scream.

Not words. Sound — raw, furious. You plant your feet and direct every decibel at the thing.

For one frozen second, it stops. Surprised.

[blood]Then it shows you what surprise looks like on something without a face.[/blood]

The surface splits vertically. Behind: concentric rings of black glassy teeth, all pointed inward. Phosphorescent blue glow inside. A sound like maximum-volume radio static.

It lunges. Segmented motion, strobe-light fast.

A wave of pressure and wrongness hits your chest. Throws you into a tree. Lungs empty. Stars. Blood.

You're on the ground. Three meters away. Approaching.

[void]Then the forest intervenes.[/void]

The earth *ripples*. Moss flares white-hot. Roots burst upward forming a wall of wood and stone.

Something else is here. Bigger. Older.

The creature hisses — steam from hell — and retreats.

Behind you, something vast settles into stillness.`,
    effects: { hp: -20, corruption: 3, setFlag: { confronted_hollow: true } },
    choices: [
      { text: 'Face whatever just saved you.', next: 'serpent_encounter' },
    ]
  },

  back_away_hollow: {
    location: 'Whispering Woods',
    scene: 'hollow',
    moodLabel: 'Calculated Retreat',
    text: `Backward. Slow. Controlled. Heel first, weight transfer, no noise.

The creature tracks with insect precision. Five meters. Ten. Fifteen.

At fifteen, a slope — ground dropping into a gully.

It raises one hand. Too many fingers — the number changes every blink. It presses the tips together. A whisper through a broken speaker.

[void]It's not hunting you. It's *herding* you.[/void]

The gully isn't escape. It's the killbox. Every "choice" since you stood has been on its terms.

One second to change the equation.`,
    effects: { resolve: 1 },
    choices: [
      { text: 'Dive sideways off the path. Break the pattern.', next: 'flee_west' },
      { text: 'Into the gully — fast, on your terms. Use the terrain.', next: 'gully_escape' },
      { text: 'Drop flat. Play dead.', next: 'play_dead' },
    ]
  },

  grab_weapon: {
    location: 'Whispering Woods — The Landing',
    scene: 'dark',
    moodLabel: 'Armed',
    text: `You grab a fallen branch — thick as your wrist. The spiral moss *pulses* under your grip.

Not ideal. Better than nothing.

The creature watches with a face that doesn't have eyes.

[blood]It laughs. Old tape rewinding, distorting. Structured noise. It finds you funny.[/blood]

Step forward. Step back. Another. Another.

You turn and run. Lizard brain override: *not here, not now, not like this*.`,
    effects: { item: { name: 'Gnarled Branch', icon: '\u{1FAB5}' } },
    choices: [
      { text: 'West. Into the deeper forest. Away.', next: 'flee_west' },
    ]
  },

  grab_weapon_stand: {
    location: 'Whispering Woods — The Landing',
    scene: 'hollow',
    moodLabel: 'Desperation',
    text: `Without breaking eye contact — or whatever this is — your hand finds a rock. Heavy. Sharp-edged.

The creature watches you pick it up. Amused, if faceless things feel amusement.

Step. Three meters. The air tastes like metal and static. Your teeth vibrate.

Two meters.

The ground shudders. Moss flares. From deep in the earth, something *pushes back* — territory, not yours. The creature stops. Tilts. Hisses. Retreats.

Behind you: a serpent the size of a city bus, coiled around stone, watching with eyes that contain too many colors.

You didn't find the clearing. The clearing found you.`,
    effects: { strength: 1, item: { name: 'Sharp Rock', icon: '\u{1FAA8}' } },
    choices: [
      { text: 'Face the serpent.', next: 'serpent_encounter' },
    ]
  },

  hollow_recon: {
    location: 'Whispering Woods — Root Hollow',
    scene: 'dark',
    moodLabel: 'Scavenging',
    text: `From the hollow, you scan without moving.

The root system belongs to something ancient — thirty meters tall, trunk wider than two arm spans. Moss thicker here, pulsing.

Three meters left: mushrooms glowing faint blue-white. Smell of clean water and mineral. Edible? Wrong world, wrong rules.

Five meters ahead: stronger glow. Through undergrowth, a clearing — open ground, concentrated moss. Something large inside. Dark scaled coils.

[void]The dragging has moved far enough east to be inaudible. The absence is almost worse. It means the thing is either gone or *very still*.[/void]`,
    choices: [
      { text: 'Head toward the clearing. Whatever\'s in there kept that thing away.', next: 'clearing_approach_quiet' },
      { text: 'West. Avoid everything. Put distance between you and your landing site.', next: 'flee_west' },
    ]
  },

  play_dead: {
    location: 'Whispering Woods',
    scene: 'hollow',
    moodLabel: 'Last Resort',
    text: `You drop flat. Every muscle limp.

A corpse. A thing that already lost.

Its attention is a spotlight — hot, precise, *invasive*. Reading you. Testing.

Ten seconds. Twenty. Lungs burning. Shallowest possible breaths.

[void]It approaches. Footsteps — deliberate. The soil vibrates differently, as if the ground doesn't want to hold its weight.[/void]

It stops beside you. The wrongness radiates like furnace heat.

Something touches the back of your shirt. Not skin — fabric. Testing.

[blood]The fabric blackens. Decay spreading through material, stopping a millimeter from skin. It touched your shirt and your shirt is dying.[/blood]

Then: the earth rumbles. Subsonic. The creature screeches — half hiss, half static — and the presence vanishes.

You wait. Count to sixty. Raise your head.

Gone. The moss blazes a path toward a clearing that wasn't visible before. Something in that clearing drove it away.

The back of your shirt has a handprint-shaped hole. Edges still warm.`,
    effects: { agility: 1, corruption: 1, setFlag: { played_dead: true } },
    choices: [
      { text: 'Follow the moss-lit path to the clearing.', next: 'clearing_approach_quiet' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // FLIGHT & SHADOW ENCOUNTERS
  // ═══════════════════════════════════════════════════════════

  flee_west: {
    location: 'Whispering Woods — Deep Interior',
    scene: 'dark',
    moodLabel: 'Flight',
    text: `You run.

Not well — damaged body, root-covered ground, just enough moslight to avoid the worst obstacles. Behind you: gliding, not running. Every shoulder-check shows nothing, which is worse.

Three minutes of crashing through undergrowth.

Something detaches from the shadows ahead. Small. Fast. A crouched shape made of smoke and static, roughly dog-sized. It launches from a low branch.

[blood]Not the creature. Something *from* it — a fragment, a scout. The Hollow's shadow.[/blood]`,
    effects: { setFlag: { first_shadow_encounter: true } },
    choices: [
      { text: 'Duck and keep running.', next: 'dodge_shadow_1' },
      { text: 'Swing at it with your weapon.', condition: { or: [{ item: 'Gnarled Branch' }, { item: 'Sharp Rock' }] }, next: 'fight_shadow_1_weapon' },
      { text: 'Brace and take the hit. It\'s small — absorb it.', next: 'tank_shadow_1' },
    ]
  },

  dodge_shadow_1: {
    location: 'Whispering Woods — Deep Interior',
    scene: 'dark',
    moodLabel: 'Evasion',
    text: `You throw yourself sideways. The shadow passes through where your head was, trailing cold and ozone. It hits a tree and *dissolves* — wisps of dark dissipating.

Weak individually. But where there's one—

Two more from the left. Moving low. Flanking.

You keep running. One catches your ankle — intense cold, ice water. Numb. Stumble, recover, keep moving.

The forest changes. Larger trees. Thicker, brighter moss. Electric air.

The shadows fall back. Whatever's ahead, they won't follow.

A clearing opens. Natural. Circular. At its center: a serpent, coiled around stone, waiting.`,
    effects: { hp: -5, agility: 1 },
    choices: [
      { text: 'Approach the serpent.', next: 'serpent_encounter' },
      { text: 'Stay at the edge. Catch your breath.', next: 'clearing_edge' },
    ]
  },

  fight_shadow_1_weapon: {
    location: 'Whispering Woods — Deep Interior',
    scene: 'battle',
    moodLabel: 'First Fight',
    text: `Your weapon connects and the shadow *shatters*. Cold washes over your hand. Dead.

[blood]But the impact draws attention. Two more shapes coalesce from the darkness. Larger.[/blood]

They circle. You plant your feet.`,
    effects: { setFlag: { fought_first_shadow: true } },
    choices: [
      { text: '[ Fight: 2 Hollow Shadows ]', next: 'shadow_battle_1' },
    ]
  },

  shadow_battle_1: {
    location: 'Whispering Woods',
    scene: 'battle',
    moodLabel: 'Combat',
    text: `The shadows circle.`,
    effects: { setFlag: { shadow_battle_1_started: true } },
    choices: [ { text: '[ Continue after battle ]', next: 'post_shadow_battle_1' } ],
  },

  tank_shadow_1: {
    location: 'Whispering Woods — Deep Interior',
    scene: 'dark',
    moodLabel: 'Endurance',
    text: `You brace.

The shadow hits your chest like a fist of frozen static. Cold drives through your sternum. For two seconds you can't breathe — the air is *wrong*, too cold, your body rejecting it.

[blood]You grab the thing. Hands close on something between smoke and ice. It writhes. Screams — feedback through a broken amp. Then fragments, dissolving between your fingers.[/blood]

Killing it cost you. Chest aches. Fingers numb and tinged blue. But moving.

Two more ahead. You barrel through at a sprint — one catches your shoulder — and the forest opens into a clearing.

Serpent. Enormous. Waiting.`,
    effects: { hp: -15, strength: 1 },
    choices: [
      { text: 'Approach the serpent.', next: 'serpent_encounter' },
    ]
  },

  gully_escape: {
    location: 'Whispering Woods — Gully',
    scene: 'dark',
    moodLabel: 'Terrain',
    text: `Into the gully on your terms — diving forward, rolling with slope. Thorns tear clothes and skin. Three meters deep, ice-cold stream at the bottom.

Above, the creature appears at the lip. Faceless. It *leans* past where gravity should apply and extends one arm. Fingers elongate, stretching, reaching.

[blood]Close enough to smell. Copper, ammonia, sweet rot.[/blood]

Hands and knees in freezing water, something reaching from above. The stream carries you west. The gully opens.

A shadow-shape drops from the wall ahead — small, fast, blocking the path.`,
    effects: { hp: -8 },
    choices: [
      { text: 'Smash through it.', next: 'smash_gully_shadow' },
      { text: 'Splash water at it — shadow might be disrupted by water.', next: 'water_gully_shadow' },
    ]
  },

  smash_gully_shadow: {
    location: 'Whispering Woods — Gully',
    scene: 'dark',
    moodLabel: 'Momentum',
    text: `You charge through like a linebacker through tissue paper.

Cold — full body, arctic water. Vision greys for a second. But momentum carries you through and it fragments.

The gully opens into a clearing. Bright. Moss dense and pulsing. Serpent coiled around stone.

Behind you, the creature stops at the clearing's edge. Hisses. Retreats.`,
    effects: { hp: -10, strength: 1 },
    choices: [ { text: 'Face the serpent.', next: 'serpent_encounter' } ],
  },

  water_gully_shadow: {
    location: 'Whispering Woods — Gully',
    scene: 'dark',
    moodLabel: 'Improvisation',
    text: `You scoop water and throw it.

The shadow *flinches*. Water passes through it and where it does, the shape loses coherence — flickering, destabilizing. It doesn't die but moves aside.

[element]Water disrupts them. Not enough to destroy, but enough to create an opening.[/element]

You rush past into a clearing — moss blazing, serpent waiting, the Hollow's presence stopping at the border.`,
    effects: { resolve: 1, setFlag: { shadow_water_weakness: true } },
    choices: [ { text: 'Approach the serpent.', next: 'serpent_encounter' } ],
  },

  clearing_approach_quiet: {
    location: "Serpent's Clearing — Edge",
    scene: 'serpent',
    moodLabel: 'The Threshold',
    text: `You approach slowly. The moss blazes brighter as you cross an invisible threshold. The air is different. Cleaner. Heavier. Charged.

The thing hunting you does not cross this line. It stands at the border and *seethes*.

Inside: the serpent. Scales like hammered obsidian. Head broader than your torso. Eyes containing depth — looking down a well that goes somewhere that isn't.

It was waiting for you.`,
    choices: [
      { text: 'Approach the serpent.', next: 'serpent_encounter' },
      { text: 'Stay at the edge. Catch your breath.', next: 'clearing_edge' },
    ]
  },

  clearing_edge: {
    location: "Serpent's Clearing — Edge",
    scene: 'serpent',
    moodLabel: 'Threshold',
    text: `You stay at the edge.

The serpent watches with absolute patience. The most dangerous thing here — larger, older, more *present*. The air hums.

[void]It's waiting. Not for you to approach — for you to be ready.[/void]

The faceless thing circles outside. Patient. Tireless. You cannot stay here forever.

The serpent is the only thing offering something other than violence.`,
    choices: [ { text: 'Approach the serpent.', next: 'serpent_encounter' } ],
  },

  post_shadow_battle_1: {
    location: 'Whispering Woods',
    scene: 'dark',
    moodLabel: 'Aftermath',
    text: `The shadows dissolve. Hands numb, breath ragged. But standing.

The forest ahead brightens — thicker moss, heavier air. The shadows won't follow.

The trees part. The clearing opens. The serpent waits.`,
    choices: [ { text: 'Approach the serpent.', next: 'serpent_encounter' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // THE SERPENT — ELEMENT REVEAL
  // ═══════════════════════════════════════════════════════════

  serpent_encounter: {
    location: "Serpent's Clearing",
    scene: 'serpent',
    moodLabel: 'The Guardian',
    text: `You approach.

Larger than anything alive has a right to be. Each scale the size of your palm, splitting moslight into impossible colors. Its head broader than your torso. The eyes — you can't look directly. They contain *depth*.

It regards you. No aggression. No warmth. Curiosity and appraisal.

You stop three meters away.

[void]Then it speaks. Not in words. In knowing.[/void]

Information arrives like a pressure wave. You stagger. Nose bleeds. Vision fractures into six layers —

Heat. Flow. Weight. Movement. Radiance. Absence.

[element]Six primary elements. Fire, Water, Earth, Wind, Light, Shadow. The fundamental forces, as real as gravity. You can feel all of them — not use them — but feel them.[/element]

One is louder than the rest. One resonates at a frequency matching something inside you. The serpent's attention narrows.`,
    effects: { setFlag: { serpent_met: true } },
    choices: [
      { text: 'Let it happen. Let the serpent show you what you are.', next: 'element_reveal' },
      { text: 'Push back. Understand before you accept.', next: 'element_reveal_resist' },
    ]
  },

  element_reveal: {
    location: "Serpent's Clearing",
    scene: 'serpent',
    moodLabel: 'Awakening',
    text: `You let go.

The six lenses collapse into one — *yours* — and the world snaps into focus with a clarity that physically hurts.

[element]{ELEMENT_SYMBOL} {ELEMENT}. Your element. The resonance that was waiting for a world where it meant something. It settles like a key turning in a lock. Not new. It was always there. This world gave it a name.[/element]

The serpent isn't finished. More knowledge, structured, layered. A hierarchy:

**Primary elements** — the six foundations. What you have now. One of six.

**Secondary elements** — from mastering *two* primaries. Ice requires Water and Wind. Metal requires Earth and Fire. Eight combinations, each demanding understanding of both.

**Tertiary elements** — built atop primaries *and* secondaries. Space. Gravity. Time.

**Master elements** — theoretical. Legendary. Cosmic. Soul. Void. Creation. Continuum. The serpent shows you these the way a cartographer shows the edge of a map.

[void]In you — specifically you — the potential for all six primaries exists. Not ability. Potential. The architecture is there. Something that hasn't happened in a very long time. Not encouragement. Warning.[/void]

One element. Knowledge of what's possible. The rest, you earn.`,
    effects: { setFlag: { element_revealed: true, tier_knowledge: true } },
    choices: [ { text: 'Accept. Stand up.', next: 'post_reveal' } ],
  },

  element_reveal_resist: {
    location: "Serpent's Clearing",
    scene: 'serpent',
    moodLabel: 'Resistance',
    text: `You push back. Not with force — with *intent*. The stubborn refusal to accept without understanding.

The serpent pauses. Interest, not annoyance. A teacher encountering a student who demands understanding first.

It adjusts. Knowledge comes slower. Each element presented individually: Fire's heat. Water's adaptability. Earth's permanence. Wind's freedom. Light's clarity. Shadow's concealment.

And one *answers*. Not the serpent's choice. Yours.

[element]{ELEMENT_SYMBOL} {ELEMENT}. Your element awakens with recognition — meeting someone you've always known in a place you've never been. The world reorganizes around it.[/element]

The tier system unfolds. Primary foundation. Secondary combinations. Tertiary built on those. Master elements — theoretical, legendary.

[void]And you — potential for all six primaries. Not ability. Potential. The serpent has seen this once before. That person is dead now. Not encouragement. Warning.[/void]

You're kneeling in moss and moonlight, bleeding from the nose. You understand more than five minutes ago.

Not enough. But a start.`,
    effects: { resolve: 2, setFlag: { element_revealed: true, tier_knowledge: true, resisted_serpent: true } },
    choices: [ { text: 'Stand up. Work to do.', next: 'post_reveal' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // CLEARING — PREPARATION
  // ═══════════════════════════════════════════════════════════

  post_reveal: {
    location: "Serpent's Clearing",
    scene: 'serpent',
    moodLabel: 'First Steps',
    text: `You stand. Through {ELEMENT}, the forest has layers. Moss *flows* with elemental energy. Trees anchored by Earth element in bedrock. Wind carries readable information.

The serpent uncoils. Beneath it: a hexagonal symbol in stone, glowing six colors. The same on your palm.

Its head swings toward the tree line.

[void]The Hollow. Not native. Something from between worlds, feeding on Outsiders. Its shadows are extensions — scouts, distractions. The real thing is worse.[/void]

The serpent's final message: *This clearing protects you tonight. By morning, leave. The Hollow learns. Adapts. My territory will not stop it forever.*

It slides into the earth. Gone.

One element. A map of what's possible. A monster outside that knows your name. Dawn is hours away.`,
    effects: { setFlag: { in_clearing: true } },
    choices: [
      { text: 'Try to use {ELEMENT}. Understand it before dawn.', next: 'first_element_practice' },
      { text: 'Rest. Use the safety while it lasts.', next: 'rest_in_clearing' },
      { text: 'Study the hexagonal symbol. Knowledge is survival.', next: 'study_symbol' },
      { text: "Scout the clearing's perimeter. Know every exit.", next: 'scout_perimeter' },
    ]
  },

  first_element_practice: {
    location: "Serpent's Clearing",
    scene: 'fire',
    moodLabel: 'First Light',
    text: `Palm out. Reach for it.

{ELEMENT}. Inside you — between chest and head. A direction that didn't exist an hour ago. Reach like a word on the tip of your tongue.

Thirty seconds of nothing. Then—

[element]{ELEMENT_SYMBOL} It manifests. Small. Uncertain. Flickering. But real. Yours.[/element]

Twenty seconds before concentration breaks. You're breathing hard — fatigue behind your eyes. Mana. Finite. You just spent some.

Again. Twelve seconds. Again. Nine. Diminishing returns.

[void]Three times, reality bent to your will. In this world, that's a start.[/void]

The Hollow's attention sharpens every time you manifest. It's *learning* you.`,
    effects: { mana: -15, setFlag: { first_element_used: true } },
    choices: [
      { text: 'Rest. Save mana for when you need it.', next: 'dawn_approaches' },
      { text: 'Study the stone before dawn.', condition: { notVisited: 'study_symbol' }, next: 'study_symbol' },
      { text: 'Scout the perimeter.', condition: { notVisited: 'scout_perimeter' }, next: 'scout_perimeter' },
    ]
  },

  rest_in_clearing: {
    location: "Serpent's Clearing",
    scene: 'dark',
    moodLabel: 'Fragile Peace',
    text: `You lie down. The moss is warm. Bioluminescence matches your heartbeat, then slows it.

Not sleep. Something adjacent. Recovering.

Your body heals — not fast, but faster than it should. Rib settles. Cuts close. Lip stops bleeding. The serpent's territory working.

[void]The Hollow makes a new sound — low, sustained, vibrating in your chest. Testing the boundary. Probing.[/void]

It will find a way in eventually. But not tonight.`,
    effects: { hp: 20, mana: 10 },
    choices: [
      { text: 'When the sky lightens, prepare to move.', next: 'dawn_approaches' },
      { text: 'Try your element before dawn.', condition: { notVisited: 'first_element_practice' }, next: 'first_element_practice' },
      { text: 'Study the stone symbol.', condition: { notVisited: 'study_symbol' }, next: 'study_symbol' },
    ]
  },

  study_symbol: {
    location: "Serpent's Clearing — Stone Formation",
    scene: 'serpent',
    moodLabel: 'The Codex',
    text: `Six primary points. Between them: connecting lines, intersections, secondary nodes. Eight secondary, six tertiary, and at center five symbols that shift when you look directly.

[element]The tier system in stone. Primary, secondary, tertiary, master — complete architecture, like a circuit diagram.[/element]

You trace lines. Where you touch, stone warms. {ELEMENT_SYMBOL} The node for {ELEMENT} brightens.

Lines connect to secondary combinations. You can see the paths. Can't walk them — need the second primary — but can see where they go.

[void]Knowledge. Not power. Not yet. But in a world where power follows understanding, knowledge is the seed.[/void]`,
    effects: { resolve: 2, setFlag: { studied_codex_stone: true } },
    choices: [
      { text: 'Rest before dawn.', condition: { notVisited: 'rest_in_clearing' }, next: 'rest_in_clearing' },
      { text: 'Try your element.', condition: { notVisited: 'first_element_practice' }, next: 'first_element_practice' },
      { text: 'Dawn is coming. Prepare to move.', next: 'dawn_approaches' },
    ]
  },

  scout_perimeter: {
    location: "Serpent's Clearing — Perimeter",
    scene: 'dark',
    moodLabel: 'Reconnaissance',
    text: `Three exits. East: lower ground, distant smoke. North: higher ground, mountains. South: deeper woods.

West — where you came — is where the Hollow waits. A dead spot in the elemental field.

East: thinner tree line. Slope toward water and settlement. Smoke.

North: older, larger trees. Elevation. Metallic resonance — deep elemental power in stone.

South: choked with undergrowth and shadow. Things too small to be the Hollow — its fragments. Patrolling.

[void]The boundary is weakening. A shimmer pulsing irregularly. Heartbeat running out.[/void]`,
    effects: { agility: 1, setFlag: { scouted_perimeter: true } },
    choices: [
      { text: 'Rest before dawn.', condition: { notVisited: 'rest_in_clearing' }, next: 'rest_in_clearing' },
      { text: 'Practice your element.', condition: { notVisited: 'first_element_practice' }, next: 'first_element_practice' },
      { text: 'Dawn is close. Decide your path.', next: 'dawn_approaches' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // DAWN — PATH CHOICE & OPTIONAL BOSS
  // ═══════════════════════════════════════════════════════════

  dawn_approaches: {
    location: "Serpent's Clearing",
    scene: 'dark',
    moodLabel: 'The Clock',
    text: `The sky changes. Stars fade, moons separate, grey-blue light replaces dark.

The protection weakens. Boundary thinning. Moss dimming.

East: smoke. Settlement. People.

North: mountains. Higher ground. Defensible but exposed.

South: deeper forest. The Hollow's shadows patrol. More than before. Going south means going *toward* the source.

[void]The Hollow is semi-territorial. Distance weakens its grip. Enough distance, it might let go. Might.[/void]`,
    choices: [
      { text: 'East. Toward the smoke. Find people.', next: 'path_east_shadows' },
      { text: 'North. Mountains. Height and distance.', next: 'path_north_shadows' },
      { text: 'South. Toward the Hollow. End this now.', hint: '[ Warning: This path leads to a fight you may not survive. ]', next: 'path_south_hollow' },
      { text: 'Use {ELEMENT} to create a diversion, then move east.', condition: { flag: 'first_element_used' }, next: 'diversion_escape' },
      { text: 'Use {ELEMENT} to mask your presence.', condition: { and: [{ element: 'shadow' }, { flag: 'first_element_used' }] }, hint: '[ Shadow element: concealment ]', next: 'shadow_stealth_escape' },
      { text: 'Use {ELEMENT} to reinforce the clearing boundary temporarily.', condition: { and: [{ element: 'earth' }, { flag: 'first_element_used' }] }, hint: '[ Earth element: fortification ]', next: 'earth_barrier_escape' },
    ]
  },

  shadow_stealth_escape: {
    location: 'Whispering Woods — Eastern Passage',
    scene: 'dark',
    moodLabel: 'Concealment',
    text: `You reach for Shadow — not light-bending, not true invisibility. But the serpent's knowledge includes the concept of *resonance masking*. You push your elemental signature inward, dampening it, making yourself a dead spot in the field.

It works. Partially. The Hollow's attention slides off you like water off glass. Its shadows patrol past without reacting.

You walk — don't run, running generates noise and elemental disturbance — east through the forest with the composure of someone who isn't being hunted.

[element]{ELEMENT_SYMBOL} Shadow wraps around you like a second skin. It's exhausting. Like holding your breath while swimming. But it works.[/element]

Twenty minutes later, the forest thins. The road. Smoke. Village.

The Hollow never detected your departure. By the time it realizes, you're out of range.`,
    effects: { mana: -30, resolve: 2 },
    choices: [ { text: 'Approach the village.', next: 'chapter_end_east' } ],
  },

  earth_barrier_escape: {
    location: "Serpent's Clearing",
    scene: 'fire',
    moodLabel: 'Fortification',
    text: `You press your hands to the ground and push Earth energy into the clearing's boundary. Not much — you don't have much — but enough to reinforce what the serpent left behind.

The boundary solidifies. For an hour, maybe two. Enough time.

[element]{ELEMENT_SYMBOL} The ground responds to you. Not eagerly — you're new at this — but it responds. The stone under the moss thickens. Roots interweave. A wall the Hollow will have to work to break.[/element]

You run east while the barrier holds. The shadows can't penetrate it. By the time the Hollow breaks through, you're a kilometer away.

The forest thins. Road. Smoke. Village.`,
    effects: { mana: -25, resolve: 1 },
    choices: [ { text: 'Approach the village.', next: 'chapter_end_east' } ],
  },

  path_east_shadows: {
    location: 'Whispering Woods — Eastern Passage',
    scene: 'dark',
    moodLabel: 'Running the Gauntlet',
    text: `You sprint east. The boundary gives way and you're in the open. The Hollow senses you — a pressure against your back.

Two shadows intercept. Small, fast, lunging from undergrowth.

[blood]Trying to slow you. Buy time for the real thing to close the gap.[/blood]`,
    choices: [
      { text: 'Use {ELEMENT} to blast through.', condition: { and: [{ flag: 'element_revealed' }, { stat: 'mana', min: 15 }] }, hint: '[ Costs mana ]', next: 'blast_shadows_east' },
      { text: 'Dodge and weave. Don\'t stop.', next: 'dodge_shadows_east' },
      { text: 'Smash through with brute force.', condition: { stat: 'strength', min: 15 }, next: 'smash_shadows_east' },
    ]
  },

  blast_shadows_east: {
    location: 'Whispering Woods — Eastern Passage',
    scene: 'fire',
    moodLabel: 'Unleashed',
    text: `You raise your hand and *push*.

{ELEMENT_SYMBOL} {ELEMENT} erupts — raw, uncontrolled, *effective*. Both shadows fragment. The energy cost hits like a migraine.

But the path is clear. Forest thins. Road appears. Smoke ahead.

[void]Behind you, the Hollow fades with distance. Not gone — diminished. A radio signal losing strength.[/void]`,
    effects: { mana: -20 },
    choices: [ { text: 'Reach the village.', next: 'chapter_end_east' } ],
  },

  dodge_shadows_east: {
    location: 'Whispering Woods — Eastern Passage',
    scene: 'dark',
    moodLabel: 'Evasion',
    text: `Zigzag. Shadows are fast but predictable — straight-line lunges. You know the pattern.

One frosts your ear. The other catches your hip — numbing cold — but you keep moving.

Forest thins. Dirt road. Woodsmoke.

[void]The Hollow's grip weakens. Outside comfortable range. Not free — leash with slack.[/void]`,
    effects: { hp: -5, agility: 1 },
    choices: [ { text: 'Reach the village.', next: 'chapter_end_east' } ],
  },

  smash_shadows_east: {
    location: 'Whispering Woods — Eastern Passage',
    scene: 'battle',
    moodLabel: 'Force',
    text: `You lower your shoulder and *hit*. First shadow breaks on contact. Second catches your arm — brutal cold — but you grab it and crush it. Feedback scream. Dead.

Hands blue-white and numb. Path clear.`,
    effects: { hp: -8 },
    choices: [ { text: 'Push through to the village.', next: 'chapter_end_east' } ],
  },

  path_north_shadows: {
    location: 'Whispering Woods — Northern Rise',
    scene: 'mountain',
    moodLabel: 'Ascent',
    text: `North. Uphill. Lungs burn, ribs protest.

One shadow intercepts on the slope — smaller, weaker this far from center.

You sidestep easily. It dissolves against rock, unable to maintain coherence in thin, element-rich air.

[element]Elevation helps. Elemental density weakens the Hollow's projections.[/element]

Forest becomes scrubland. Ridge of exposed granite. A view.`,
    choices: [ { text: 'Take in the view.', next: 'chapter_end_north' } ],
  },

  path_south_hollow: {
    location: 'Whispering Woods — Southern Depths',
    scene: 'hollow',
    moodLabel: 'Into the Dark',
    text: `You go south. Every instinct screams against it.

Air colder. Moss dims. Shadows multiply — three, five, too many. They don't attack. Escorting.

[blood]Trees here are dead. Standing, petrified, bark turned to black glass. The Hollow's territory. Reality gave up and let it have what it wants.[/blood]

The shadows herd you toward a dead clearing — black soil, petrified trees, an absence at center.

The Hollow stands there. In its territory, it's *solid* — tall, terribly proportioned, that smooth face turned toward you with absolute calm.

The shadows form a ring. You're inside. With it.

[void]It speaks your name. {PLAYER_NAME}. Not fragments this time — fluid, natural, stolen from your own throat.[/void]

It opens its arms. An invitation.

The optional part was five minutes ago.`,
    effects: { setFlag: { entered_hollow_territory: true } },
    choices: [ { text: '[ Fight The Hollow ]', next: 'hollow_boss_fight' } ],
  },

  hollow_boss_fight: {
    location: "The Hollow's Domain",
    scene: 'hollow',
    moodLabel: 'BOSS: THE HOLLOW',
    text: `[blood]The air dies. Sound stops. You and it and dead ground between.[/blood]

It walks toward you. Measured. Something that has already won, going through formalities.

Prepare yourself.`,
    effects: { setFlag: { hollow_boss_started: true } },
    choices: [ { text: '[ Begin combat ]', next: 'hollow_boss_result' } ],
  },

  hollow_boss_result: {
    location: "The Hollow's Domain",
    scene: 'hollow',
    moodLabel: 'BOSS: THE HOLLOW',
    text: `Preparing for combat...`,
    choices: [],
  },

  hollow_boss_win: {
    location: "The Hollow's Domain",
    scene: 'dark',
    moodLabel: 'Impossible',
    text: `[blood]It falls.[/blood]

Not dramatically. The Hollow simply stops. Its form loses coherence — jitter accelerates, fragments, and the thing disperses into cold static settling like ash.

Every shadow dissolves simultaneously.

[void]You're standing in a dead clearing, bleeding everywhere, and the thing that was going to kill you is dust.[/void]

The pressure — that constant wrongness since you arrived — is gone.

You breathe. First time in Eldara without something watching.

The forest path east leads to smoke and settlement. You walk. One foot in front of the other. Alive. Armed with {ELEMENT} and the knowledge that you are harder to kill than anyone expected.`,
    effects: { resolve: 3, strength: 2, setFlag: { hollow_defeated: true, hollow_boss_complete: true } },
    choices: [ { text: '[ Continue to Chapter 2 ]', next: 'arc1/chapter2/mara_meeting' } ],
  },

  hollow_boss_lose: {
    location: "The Hollow's Domain",
    scene: 'void',
    moodLabel: 'Darkness',
    text: `You go down.

The cold takes you in pieces. The Hollow unravels you layer by layer — not destruction, *dissolution*.

Vision greys. Body stops reporting. You're aware of ground, absence of sky, and the Hollow standing over you.

[void]Then: warmth. From the ground. From the east. A source so massive the Hollow freezes mid-reach.[/void]

The serpent. Not present — but its power surges through the earth. Dead ground *cracks*, green light erupts. The Hollow shrieks and recoils.

The ground opens beneath you. Not a fall — a controlled descent. Down through root and soil and bedrock.

You surface a kilometer east, vomiting dirt and blood. The road is ten meters away.

[blood]The Hollow's presence is gone. Not destroyed — redirected. The serpent bought you time. Maybe a lot. Maybe not enough.[/blood]

You crawl toward the road.`,
    effects: { hp: -999, corruption: 5, setFlag: { hollow_boss_complete: true, hollow_survived: true } },
    choices: [ { text: 'Crawl toward the village.', next: 'chapter_end_east_wounded' } ],
  },

  diversion_escape: {
    location: "Serpent's Clearing — Edge",
    scene: 'fire',
    moodLabel: 'Misdirection',
    text: `You push remaining mana west — toward the Hollow. Not an attack. A *signal*. A flare of {ELEMENT_SYMBOL} {ELEMENT}, bright and loud, opposite from where you'll go.

The Hollow's attention snaps to the flare. The pressure redirects west.

You run east. By the time it realizes, you've gained a hundred meters. The shadows it sends are thin, weak. You outrun them.

Forest thins. Road appears.`,
    effects: { mana: -25, agility: 1, resolve: 1 },
    choices: [ { text: 'Push through to the village.', next: 'chapter_end_east' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // CHAPTER ENDINGS
  // ═══════════════════════════════════════════════════════════

  chapter_end_east: {
    location: 'Whispering Woods — Eastern Edge',
    scene: 'village',
    moodLabel: 'The World Begins',
    text: `The forest ends at a worn dirt road. A village — thirty buildings, wood and stone. Smoke from chimneys. Crystalline structures on rooftops catching early light.

Elmridge.

A woman at the gate. Sixty, maybe older. Hard-working build. Elemental symbols on her coat. Eyes like deep water.

She takes in your blood, your shredded clothes, the terror underneath, and says:

*"Another one. And younger than the last."*

*"Come inside. Before whatever brought you here follows you in."*

[void]She knows. She's seen Outsiders before.

You follow her in. Behind you, at the far tree line — the Hollow stands at maximum range.

It will wait. It is very, very good at waiting.[/void]`,
    choices: [ { text: '[ Continue to Chapter 2 ]', next: 'arc1/chapter2/mara_meeting' } ],
  },

  chapter_end_east_wounded: {
    location: 'Elmridge — Village Gate',
    scene: 'village',
    moodLabel: 'Barely Alive',
    text: `You reach the road on hands and knees. Blood and dirt. Everything hurts past pain into something numb.

The village. Thirty meters.

A woman runs toward you. Strong hands haul you upright.

*"Don't you dare die on my doorstep."*

[void]You don't die. Not today.

When you wake, it'll be in a bed smelling of herbs and woodsmoke. The woman will be waiting with questions you aren't ready to answer.

The Hollow is gone. For now.[/void]`,
    effects: { hp: 1 },
    choices: [ { text: '[ Continue to Chapter 2 ]', next: 'arc1/chapter2/mara_meeting_wounded' } ],
  },

  chapter_end_north: {
    location: 'Whispering Woods — Northern Ridge',
    scene: 'mountain',
    moodLabel: 'Higher Ground',
    text: `Eldara. Forests to every horizon. Rivers silver in dawn. Mountains north. Structures south. Below: a village with rising smoke.

[element]The Hollow's presence is faint. Diminished by distance and elevation. Distance erodes it. Doesn't destroy it.[/element]

You descend toward Elmridge.

At the gate, a woman waits.

*"Another one. Come inside. Quickly."*

[void]Behind you, beyond the ridge, the Hollow watches. Patient. Learning.

The gate closes. It won't be enough. But it's a start.[/void]`,
    effects: { agility: 1 },
    choices: [ { text: '[ Continue to Chapter 2 ]', next: 'arc1/chapter2/mara_meeting' } ],
  },

});

// ── POST-LOAD: Element assignment & battle auto-start ──
(function() {
  var origRender = EV.renderScene;
  EV.renderScene = function(sceneObj) {
    // Find scene key from chapter data (state.currentScene not yet updated)
    var key = null;
    var chData = EV.CHAPTERS[EV.state.currentArc + '-' + EV.state.currentChapter];
    if (chData) {
      for (var k in chData) { if (chData[k] === sceneObj) { key = k; break; } }
    }

    // Shadow battle auto-start
    if (key === 'shadow_battle_1' && !EV.state.flags._shadow1_fought) {
      EV.state.flags._shadow1_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: { name: 'Hollow Shadows', hp: 30, atk: 6, atkVar: 4, defense: 1, intro: 'Two shapes of cold static lunge from the dark.' },
          onWin: function() { EV.navigateTo('post_shadow_battle_1'); },
          onLose: function() { EV.state.stats.hp = 5; EV.showNotification('You barely survive...', 'warning'); EV.navigateTo('post_shadow_battle_1'); },
          canFlee: true,
        });
      }, 500);
      return;
    }

    // Hollow boss auto-start
    if (key === 'hollow_boss_result' && !EV.state.flags._hollow_boss_fought) {
      EV.state.flags._hollow_boss_fought = true;
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'The Hollow',
            hp: 200, atk: 18, atkVar: 8, defense: 15,
            resistsAll: true,
            weakTo: ['light'],
            intro: 'The air dies. Sound stops. It walks toward you.',
            missChance: function(stats) { return stats.agility >= 20 ? 0.5 : 0.15; },
            abilityChance: 0.3,
            ability: function(state) {
              var msgs = [
                { msg: 'The Hollow reaches — its touch unravels the air.', damage: 25 },
                { msg: 'It whispers your name. Reality shudders.', damage: 20 },
                { msg: 'A wave of dissolution. Cells forget their purpose.', damage: 30 },
              ];
              return msgs[Math.floor(Math.random() * msgs.length)];
            },
          },
          onWin: function() { EV.navigateTo('hollow_boss_win'); },
          onLose: function() { EV.navigateTo('hollow_boss_lose'); },
          canFlee: false,
        });
      }, 500);
      return;
    }

    origRender.call(EV, sceneObj);
  };
})();
