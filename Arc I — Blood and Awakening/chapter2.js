// ============================================================
// ARC 1 · CHAPTER 2 — "The Whispering Woods"
// Player arrives at Elmridge, meets Elder Mara, integrates.
// Branches from Chapter 1:
//   mara_meeting        — standard arrival (most paths)
//   mara_meeting_wounded — near-death arrival (hollow boss lose)
// Key flags from Ch1: hollow_defeated, hollow_survived,
//   serpent_met, element_revealed, first_element_used,
//   confronted_hollow, studied_hollow, resisted_serpent
// ============================================================

EV.registerChapter(1, 2, {

  // ═══════════════════════════════════════════════════════════
  // OPENING — MEETING MARA
  // ═══════════════════════════════════════════════════════════

  mara_meeting: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Shelter',
    text: `The cottage smells of woodsmoke and something sharper — herbs you can't name, dried in bundles along ceiling beams. A single room divided by hanging fabric. Shelves of jars, books, objects that hum faintly when you look away.

The woman — Mara, she said at the gate — sets a cup in front of you. Dark liquid, steam curling. She doesn't ask if you want it.

*"Drink. Then talk."*

You drink. It tastes like nothing on Earth. Floral, with a bite that clears your sinuses and quiets the shaking in your hands.

She sits across from you and waits. Not impatiently. Like someone who has done this before.

[void]Her eyes move from your hands to your clothes to the blood on your collar. She's reading you the way a doctor reads symptoms.[/void]

*"So. Another one through the Veil."*

Not a question.`,
    choices: [
      { text: '"Another one?" Others have come through?', next: 'mara_others' },
      { text: 'Say nothing. Let her talk first.', next: 'mara_reads_you' },
      { text: '"How do you know what I am?"', next: 'mara_how_know' },
      { text: '"I need to know where I am. Everything."', next: 'mara_explain_world' },
      { text: '"I fought something in the forest. A creature called the Hollow."', condition: { flag: 'hollow_branded' }, next: 'mara_hollow_branded' },
    ]
  },

  mara_hollow_branded: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Concern',
    text: `Mara's hands stop moving. The cup she was reaching for stays on the table.

*"Show me."*

You turn. Her fingers trace the cold burn on your spine — the mark the Hollow left when you retreated. She inhales sharply.

*"You went into its territory. Fought through its shadows. And then—"* she reads the mark like a text *"—you turned back. It branded you for the insult."*

Her voice is different now. Not the calm elder dispensing tea. Something harder. Worried.

*"This mark won't fade on its own. The Hollow has claimed you as... unfinished business. It will be harder to ignore you now."*

[blood]She applies a poultice to the brand. The cold recedes slightly. Not healed — managed.[/blood]

*"You're either very brave or very foolish. I've met both kinds of Outsider. The brave ones live longer."*`,
    effects: { hp: 15, setFlag: { mara_saw_brand: true } },
    choices: [
      { text: '"Tell me about the other Outsiders."', next: 'mara_others' },
      { text: '"Can you remove the mark?"', next: 'mara_hollow_warning' },
    ]
  },

  mara_meeting_wounded: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Barely Alive',
    text: `You wake in stages. First: warmth. Then: the smell of herbs, sharp and green. Then: pain, in layers, every part of you reporting damage.

A bed. Real. Blankets heavy with something that numbs. A fire — not orange, [element]blue-white, burning without wood. Cold Fire, your new knowledge supplies. Ice element refinement.[/element]

You've been here before — except you haven't. This is somewhere new. Somewhere safe. For now.

A woman enters. Silver-haired, sixty or older. Hard-boned face, kind eyes that miss nothing. She checks your bandages with practiced hands.

*"Two days. You've been unconscious two days. Whatever did that to you—"* She pauses, studying the wounds. *"This isn't natural damage. Something was trying to unmake you."*

[void]The Hollow. It almost succeeded.[/void]

*"I'm Mara. Elder of Elmridge. And you are an Outsider, which means we have a great deal to discuss."*

[blood]She presses more poultice to your chest. Warmth floods through you. Mara's hands glow faintly — Light element, dim but steady. She's healing you with elemental energy, and it's costing her.[/blood]

*"Don't try to move yet. Whatever you fought, it nearly killed you. You need time."*`,
    effects: { hp: 40, mana: 20 },
    choices: [
      { text: '"How did you know?"', next: 'mara_how_know' },
      { text: '"The thing that did this — the Hollow — is it still out there?"', next: 'mara_hollow_warning' },
      { text: 'Try to sit up. Show her you\'re not helpless.', next: 'mara_reads_you' },
    ]
  },

  mara_others: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'History',
    text: `Mara's expression shifts. Not sadness, exactly. Recognition.

*"Three in my lifetime. The first when I was a girl — a woman who appeared in the northern mountains, screaming in a language no one spoke. The Crimson Guard took her within a week. We never learned what happened."*

She refills your cup without asking.

*"The second, twenty years ago. A man. Scholar, I think. He made it as far as Veridia before—"* She stops. *"The details are not mine to share. But he is why Aldarion's Crimson Guard now patrols the neutral territories."*

[void]*"You are the third. And unlike the others, you arrived with an element already awakened. That changes things considerably."*[/void]`,
    effects: { setFlag: { knows_other_outsiders: true } },
    choices: [
      { text: '"Changes things how?"', next: 'mara_explain_element' },
      { text: '"The Crimson Guard — who are they?"', next: 'mara_crimson_guard' },
      { text: '"What happened to the second one? I need to know."', next: 'mara_second_outsider' },
    ]
  },

  mara_how_know: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Scrutiny',
    text: `*"Your clothes. Your skin — too smooth, no calluses from work or training. The way you look at fire like it confuses you. And—"* She gestures at your hands. *"Your elemental signature. It's wrong."*

"Wrong?"

*"Not wrong. Different. Native channelers develop their signatures over years, shaped by training and environment. Yours appeared fully formed but unrefined. Like a muscle that's never been used but was always there."*

She leans forward.

[void]*"I was apprentice to a woman who studied dimensional theory. The Veil between worlds, the signatures of those who cross it. I know what an Outsider looks like, {PLAYER_NAME}. I've been waiting for the next one for twenty years."*[/void]`,
    choices: [
      { text: '"Waiting? Why?"', next: 'mara_explain_element' },
      { text: '"What do you want from me?"', next: 'mara_what_want' },
      { text: 'Tell her about the serpent and your element.', next: 'mara_tell_serpent' },
    ]
  },

  mara_reads_you: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Measured',
    text: `You say nothing. Good instinct.

Mara studies you for a full thirty seconds. Then nods, something like approval in the gesture.

*"Careful. That's rare in Outsiders. Most arrive panicking, demanding, breaking things. You listen."*

She pours herself tea.

*"Here is what I know: you crossed the Veil — the barrier between your world and Eldara. The crossing damaged you but didn't kill you, which is unusual. You survived the Whispering Woods, which means either you're very lucky or very capable."*

A pause.

[void]*"And you carry an awakened element. Which means the Guardian found you worthy. That makes you the most dangerous and most valuable person within a hundred miles."*[/void]`,
    choices: [
      { text: '"Dangerous to whom?"', next: 'mara_crimson_guard' },
      { text: '"Valuable to whom?"', next: 'mara_explain_element' },
      { text: '"Tell me about Eldara. Everything."', next: 'mara_explain_world' },
    ]
  },

  mara_hollow_warning: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Threat Assessment',
    text: `Mara's expression darkens.

*"The Hollow. Yes, I felt its presence when you arrived — a wrongness in the elemental field, like a wound in the air. It's an interdimensional predator. They follow Outsiders through the Veil. Parasites of the crossing."*

She moves to the window, looking toward the forest.

*"It won't enter the village. Too many living signatures, too much ambient elemental energy. Hollows feed on isolation, on the space between things. A settlement this size is poison to it."*

[blood]*"But it will wait. At the tree line. In the spaces between. It is very, very patient."*[/blood]

*"You hurt it, though."* She turns back, something new in her expression. Respect, maybe. *"Whatever you did in those woods, it's diminished. Not gone. But weaker than any Hollow I've sensed before."*`,
    effects: { setFlag: { mara_knows_hollow: true } },
    choices: [
      { text: '"How do I kill it permanently?"', next: 'mara_kill_hollow' },
      { text: '"How long before it recovers?"', next: 'mara_hollow_timeline' },
      { text: 'Move on. Ask about Eldara.', next: 'mara_explain_world' },
    ]
  },

  mara_kill_hollow: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'No Easy Answers',
    text: `*"You don't. Not with a single primary element. Hollows exist between dimensions — to truly destroy one, you'd need to collapse the space it occupies. That requires secondary elements at minimum. Possibly tertiary."*

She sees your expression.

*"You don't know those terms yet. Primary elements — Fire, Water, Earth, Wind, Light, Shadow — are foundations. Combining two primaries creates a secondary. Ice, Metal, Electricity, Nature. And beyond those, tertiary elements built from primaries and secondaries together."*

[void]*"You have one primary. The Hollow has survived encounters with people who had four. Patience, {PLAYER_NAME}. Not cowardice. Strategy."*[/void]`,
    effects: { resolve: 1 },
    choices: [
      { text: '"Then teach me. Start now."', next: 'mara_training_offer' },
      { text: '"Tell me more about the element system."', next: 'mara_explain_element' },
      { text: '"What else should I know about this world?"', next: 'mara_explain_world' },
    ]
  },

  mara_hollow_timeline: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'The Clock',
    text: `*"Days. Weeks at most. Hollows regenerate by feeding on ambient void energy — the same nothing between dimensions that birthed them. The Whispering Woods has unusually thin barriers, which is why the Guardian serpent patrols there."*

She taps the table.

[blood]*"When it recovers, it will be smarter. They learn from every encounter. Whatever tactics worked before won't work twice."*[/blood]

*"Your best option is distance. Put enough ground between you and it, and its connection weakens. Enough distance, it might lose your trail entirely."*

*"Or—"* A careful pause. *"You get strong enough that it decides you're not worth the effort. That's happened. Once. In recorded history."*`,
    effects: { setFlag: { knows_hollow_timeline: true } },
    choices: [
      { text: '"How do I get stronger fast?"', next: 'mara_training_offer' },
      { text: '"Where would I go? What\'s beyond this village?"', next: 'mara_explain_world' },
    ]
  },

  mara_second_outsider: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'The Dead',
    text: `Mara is quiet for a long time.

*"His name was Elias. A scholar from your world — or a world like yours. He arrived twenty years ago near Reflection Lake. The Guardian there gave him Wind element."*

She turns her cup slowly.

*"He was brilliant. Mastered Wind in weeks, began working on secondary elements within months. Veridia's Academy took him in. For a time, it seemed like he would thrive."*

[void]*"Then Aldarion learned of him. King Aldric sent the Crimson Guard. The official report says Elias died attempting to escape custody."*[/void]

Her voice hardens.

*"The unofficial truth is that Commander Darius Thorne — head of the Guard — ordered his execution. Elias knew too much about dimensional travel. Aldarion considered that knowledge a threat to their power."*

*"His brother Orin — Master Orin — left Aldarion in protest. He's been in exile since."*`,
    effects: { corruption: 1, setFlag: { knows_elias: true, knows_orin_thorne: true } },
    choices: [
      { text: '"So if Aldarion finds me, I\'m dead."', next: 'mara_crimson_guard' },
      { text: '"Who is Master Orin? Could he help me?"', next: 'mara_orin_mention' },
      { text: '"What did Elias know about getting home?"', next: 'mara_way_home' },
    ]
  },

  mara_orin_mention: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'A Thread',
    text: `*"Orin Thorne. Former Knight-Commander of Aldarion. One of the strongest elementalists alive — possibly the strongest. He resigned his commission when his brother ordered Elias's death."*

She retrieves something from a shelf — a folded letter, sealed with blue wax.

*"He lives in the mountains south of Veridia. Takes students occasionally. He's spent twenty years searching for another Outsider."*

[void]*"Whether that's because he wants to help or because he wants to vindicate his principles — I couldn't say. But he's the only person I know who might understand what you are."*[/void]

She sets the letter on the table between you.

*"When you're ready to leave Elmridge — and you will need to leave, eventually — this letter will get you an audience with him. But not yet. You need training first, or the road will kill you before the Crimson Guard gets the chance."*`,
    effects: { setFlag: { knows_orin_thorne: true, mara_letter_mentioned: true } },
    choices: [
      { text: '"Train me. I\'ll learn whatever you can teach."', next: 'mara_training_offer' },
      { text: '"How long do I have before Aldarion learns I\'m here?"', next: 'mara_crimson_guard' },
    ]
  },

  mara_way_home: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Hope — Thin',
    text: `Mara hesitates.

*"Elias theorized that dimensional travel required what he called 'Cosmic resonance' — an element so advanced it exists beyond the tertiary tier. A Master element. The kind of power that hasn't been wielded in centuries."*

*"He believed an Outsider who mastered enough elements could eventually create a bridge back to their origin world."*

[void]*"He died before proving it. But his notes still exist — fragments, scattered across Eldara. The Academy has some. Master Orin has others."*[/void]

She watches your face carefully.

*"I tell you this not to give you hope, but to give you direction. A person with direction survives longer than a person with panic."*`,
    effects: { resolve: 1, setFlag: { knows_cosmic_theory: true } },
    choices: [
      { text: '"Then I need to master elements. Where do I start?"', next: 'mara_training_offer' },
      { text: '"Who is Master Orin?"', condition: { noFlag: 'knows_orin_thorne' }, next: 'mara_orin_mention' },
      { text: '"Tell me about the Crimson Guard."', next: 'mara_crimson_guard' },
    ]
  },

  mara_what_want: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Honest',
    text: `Good question. Mara doesn't flinch from it.

*"Short-term: I want you alive. Dead Outsiders help no one, and the last one's death set this region back twenty years."*

*"Medium-term: I want you trained well enough to survive the road to Veridia. The Academy there can offer what I can't — structure, resources, protection."*

[void]*"Long-term?"* She pauses. *"There's a prophecy. Old. Vague. It speaks of an Outsider who will either save Eldara or destroy it. I've spent my life hoping for the former. I'd like to improve those odds."*[/void]

*"But those are my wants. What matters now is what you need."*`,
    effects: { setFlag: { knows_prophecy_exists: true } },
    choices: [
      { text: '"I need to get home."', next: 'mara_way_home' },
      { text: '"I need to get stronger. Teach me."', next: 'mara_training_offer' },
      { text: '"I need to understand this world first."', next: 'mara_explain_world' },
    ]
  },

  mara_crimson_guard: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Enemies',
    text: `*"The Crimson Guard serves King Aldric of Aldarion — the kingdom to the north. They are elite soldiers, most with at least one awakened element. Their commander, Darius Thorne, views Outsiders as existential threats."*

She marks positions on a map spread across the table. Red dots, a line of them, north to east.

*"Elmridge sits in neutral territory — under the Treaty of Dual Oversight, neither Aldarion nor Veridia can arrest people here without joint authorization. That protects you. For now."*

[blood]*"But the Guard has scouts in these woods. If they learn an Outsider survived the crossing, they'll come. The treaty won't stop a man like Darius Thorne. It will only slow him."*[/blood]

*"You have time. Days, perhaps a week or two. Use them."*`,
    effects: { setFlag: { knows_crimson_guard: true } },
    choices: [
      { text: '"Then train me. Every hour counts."', next: 'mara_training_offer' },
      { text: '"What about Veridia? You said they\'re more tolerant."', next: 'mara_explain_world' },
    ]
  },

  mara_explain_element: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Knowledge',
    text: `Mara opens a book — hand-bound, pages thick as card. Diagrams of interlocking circles, each labeled.

*"Six primary elements: Fire, Water, Earth, Wind, Light, Shadow. Every person in Eldara has the potential to awaken one. Most never do — it takes training, or crisis, or a Guardian's touch."*

She taps your chest.

*"You have {ELEMENT}. Awakened, active, but raw. Like a blade with no edge."*

[element]*"The unusual thing—"* She turns a page. A hexagonal diagram. *"—is that the Guardian saw potential for all six in you. That hasn't happened in recorded history. It's what the prophecy describes."*[/element]

*"But potential isn't power. You'll need to master {ELEMENT} before attempting a second primary. And mastery means control, efficiency, creativity — not just force."*`,
    choices: [
      { text: '"Start teaching me now."', next: 'mara_training_offer' },
      { text: '"What about the Crimson Guard?"', condition: { noFlag: 'knows_crimson_guard' }, next: 'mara_crimson_guard' },
      { text: '"Tell me about the rest of Eldara."', next: 'mara_explain_world' },
    ]
  },

  mara_explain_world: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Cartography',
    text: `Mara spreads a map across the table. Leather-backed, hand-drawn, detailed.

*"Eldara. Two major powers, one neutral zone, and a great deal of dangerous territory between."*

She marks as she speaks:

*"North: the Kingdom of Aldarion. Militaristic. Hostile to Outsiders. Home of the Crimson Guard."*

*"South: the Federation of Veridia. More tolerant. Home to the Academy of Elements — the only formal institution for elemental training. They've granted asylum to Outsiders before."*

*"Between them: neutral territories like Elmridge. Protected by treaty but practically lawless. Bandits, creatures, and worse."*

[void]*"Your goal, eventually, should be Veridia. The Academy can offer what I cannot. But the road south is long, and not all of it is friendly."*[/void]`,
    effects: { setFlag: { knows_world_map: true } },
    choices: [
      { text: '"How do I survive the road? Teach me."', next: 'mara_training_offer' },
      { text: '"What threats are between here and Veridia?"', next: 'mara_road_dangers' },
      { text: '"How long would the journey take?"', next: 'mara_road_dangers' },
    ]
  },

  mara_tell_serpent: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Trust',
    text: `You tell her. The serpent. The knowledge transfer. The six elements, the tiers, the potential it showed you.

Mara listens without interrupting. When you finish, she's very still.

*"A Guardian. The Whispering Woods Guardian."* Her voice is different now. Reverent, almost. *"They haven't made contact with a human in decades. The last person they spoke to was—"*

She stops herself.

[element]*"You were given the full schema. Primary, secondary, tertiary, master. And it showed you potential for all six primaries."*[/element]

*"Do you understand how significant that is? Most elementalists spend their entire lives mastering one. Two is exceptional. Three is legendary. Six is—"*

*"Unprecedented."*

She stands. Begins pulling books from shelves.

*"We start training immediately."*`,
    effects: { resolve: 1, setFlag: { told_mara_serpent: true } },
    choices: [ { text: '"I\'m ready."', next: 'mara_training_offer' } ],
  },

  mara_road_dangers: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Obstacles',
    text: `*"Between Elmridge and Veridia: two weeks on foot. Through the Blackwood — elemental beasts, territorial creatures. Past the border checkpoints — Aldarion's reach extends further than they admit. Across the Ashfield, where the last war left residual elemental contamination."*

She ticks them off like a list she's memorized.

*"And that's assuming you avoid the Broken Fang bandits. Deserters and opportunists who prey on travelers in the neutral zone. They've raided three villages this season."*

[blood]*"With one primary element and no combat training? You'd last a day. Maybe two."*[/blood]

*"Which is why you're not leaving yet."*`,
    effects: { setFlag: { knows_road_dangers: true } },
    choices: [
      { text: '"Then make me ready. Train me."', next: 'mara_training_offer' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // TRAINING ACCEPTANCE — TRANSITION TO VILLAGE LIFE
  // ═══════════════════════════════════════════════════════════

  mara_training_offer: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'The Deal',
    text: `Mara nods. Decision made.

*"I can teach you control. Refinement. How to use {ELEMENT} without burning through your mana in thirty seconds. I can teach you to read elemental fields, to sense threats before they reach you."*

She raises a finger.

*"But I'm one woman in a small village. My knowledge of {ELEMENT} is—"* She tilts her hand. *"Adequate. Not expert. For true mastery, you'll need the Academy. For now, I'll give you enough to survive."*

*"There's a blacksmith, Garrick. Good man. He'll give you a room. The village will accept you — I'll see to that. In return—"*

[void]*"—you help. Chop wood. Carry water. Mend fences. Elmridge is short-handed and you have two working arms. Fair?"*[/void]`,
    choices: [
      { text: '"Fair. When do we start?"', next: 'first_night_setup' },
      { text: '"I\'ll work. But I need to train every spare hour."', next: 'first_night_driven' },
    ]
  },

  first_night_setup: {
    location: 'Elmridge — Garrick\'s House',
    scene: 'village',
    moodLabel: 'Respite',
    text: `Garrick is a bear of a man. Arms like forge hammers. A smile that doesn't match the calluses.

*"So you're Mara's new project."* He shows you a small room above the smithy. Straw bed, wool blanket, a window facing east toward the forest. *"Not much, but the roof doesn't leak. Usually."*

He leaves you with bread, dried meat, and a wooden cup of something that tastes like warm cider.

[void]You sit on the bed. First time sitting without fear since you arrived in Eldara. The Hollow is out there — diminished, distant, but out there. The Crimson Guard exists. The road ahead is long and lethal.[/void]

But tonight, you have walls. Food. A plan.

Through the window: the Whispering Woods. Two moons rising. Stars in wrong patterns.

You sleep. For the first time in Eldara, you sleep.`,
    effects: { hp: 999, mana: 999, setFlag: { met_garrick: true, village_accepted: true } },
    choices: [ { text: '[ Morning ]', next: 'first_morning' } ],
  },

  first_night_driven: {
    location: 'Elmridge — Garrick\'s House',
    scene: 'village',
    moodLabel: 'Driven',
    text: `Mara raises an eyebrow. Then smiles — thin, approving.

*"Good. That urgency will serve you."*

Garrick, the blacksmith, gives you a room above the smithy. Small. Functional. He doesn't ask questions beyond your name.

*"Work starts at dawn. Smithy can always use another pair of hands."*

You don't sleep immediately. Instead, you sit on the straw bed and reach for {ELEMENT}. Carefully. A flicker, held for ten seconds. Fifteen.

[element]{ELEMENT_SYMBOL} Control. Not force. Hold it like a candle flame in wind. The serpent's knowledge guides you — theory, not technique. The technique, you're building from scratch.[/element]

Twenty seconds. Then mana fatigue hits and you let go.

Progress. Tiny. But real.

Through the window: two moons. Wrong stars. The forest where everything changed.

You sleep with {ELEMENT} still warm behind your ribs.`,
    effects: { hp: 999, mana: 999, resolve: 1, setFlag: { met_garrick: true, village_accepted: true, night_trained: true } },
    choices: [ { text: '[ Morning ]', next: 'first_morning' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // FIRST MORNING — VILLAGE EXPLORATION
  // ═══════════════════════════════════════════════════════════

  first_morning: {
    location: 'Elmridge — Village Square',
    scene: 'village',
    moodLabel: 'New Day',
    text: `Dawn in Elmridge. The village wakes around you — farmers heading to fields, a baker's chimney pouring sweet smoke, children chasing a dog between market stalls.

Thirty buildings. Wood and stone. Crystalline formations on rooftops that catch morning light and split it into colors.

Garrick put you to work at first light — hauling water from the well, splitting firewood. Physical labor. Your body protests but the work is grounding.

By mid-morning, you've earned a break and the village's cautious curiosity. People nod. A few whisper. One child stares openly at your strange clothes before being tugged away by a parent.

[void]You have a few hours before Mara expects you for your first lesson.[/void]`,
    choices: [
      { text: 'Explore the village. Know your surroundings.', next: 'explore_village' },
      { text: 'Talk to Garrick. Learn what he knows.', next: 'talk_garrick' },
      { text: 'Find somewhere quiet. Practice {ELEMENT} alone.', next: 'solo_practice' },
      { text: 'Go directly to Mara. Start training early.', next: 'early_training' },
    ]
  },

  explore_village: {
    location: 'Elmridge — Market Lane',
    scene: 'village',
    moodLabel: 'Reconnaissance',
    text: `You walk the village with a tactician's eye. Exits, resources, defensive positions.

Elmridge is small but not poor. The market has basics — grain, meat, leather, tools. A healer's stall sells tinctures in glass vials. The crystalline formations you noticed are *elemental resonators* — passive devices that strengthen the ambient elemental field. They're why the Hollow can't enter.

[element]Through {ELEMENT}, you can feel the resonators working. A hum at the edge of perception, like standing near a generator. The village is wrapped in a thin layer of elemental energy — not a shield, but enough to make predatory things uncomfortable.[/element]

South gate leads to farmland and the road toward Veridia. North gate leads to forest and, eventually, Aldarion.

East: the Whispering Woods. Your point of arrival. The tree line is visible from the square.

Something catches your eye — scratch marks on the south gate's timber. Deep. Recent. Not animal.`,
    effects: { agility: 1, setFlag: { explored_village: true, noticed_scratch_marks: true } },
    choices: [
      { text: 'Examine the scratch marks closer.', next: 'examine_scratches' },
      { text: 'Ask a villager about them.', next: 'ask_about_scratches' },
      { text: 'Note it and head to Mara for training.', next: 'mara_first_lesson' },
    ]
  },

  examine_scratches: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'Evidence',
    text: `Three gouges, deep into oak. Made with something harder than wood — metal, probably. A blade dragged sideways, not cutting but *marking*.

Below the gouges: a symbol. Crude, carved hastily. A circle with a fang through it.

[blood]A calling card. Someone came here, marked the gate, and left. Recently — the exposed wood hasn't weathered.[/blood]

You memorize the symbol. Circle. Fang. The Broken Fang bandits Mara mentioned.

A farmer notices you studying the gate and approaches nervously.

*"Found those last week. Elder Mara says it's scouting marks. Bandits sizing us up."* He glances toward the forest. *"They hit a village two days east last month. Took everything."*`,
    effects: { resolve: 1, setFlag: { found_bandit_mark: true } },
    choices: [
      { text: '"How many bandits? What do they use?"', next: 'farmer_bandit_info' },
      { text: 'Head to Mara for training.', next: 'mara_first_lesson' },
      { text: 'Visit Garrick at the smithy.', next: 'talk_garrick' },
    ]
  },

  ask_about_scratches: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'Village Talk',
    text: `An older woman, sun-weathered, sees you looking.

*"Broken Fang. Bandits out of the neutral zone — deserters from both armies, plus opportunists. They mark villages before raiding. Lets the scouts know what's worth taking."*

She spits.

*"Came through here three months ago. Took livestock, seed grain, two young men who haven't been seen since. Mara drove them off with her elements, but she's one woman. If they come in force—"*

[blood]She doesn't finish the sentence. She doesn't need to.[/blood]`,
    effects: { setFlag: { found_bandit_mark: true, knows_bandit_history: true } },
    choices: [
      { text: 'Head to Mara. Training is more urgent than ever.', next: 'mara_first_lesson' },
      { text: 'Talk to Garrick first.', next: 'talk_garrick' },
    ]
  },

  farmer_bandit_info: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'Intel',
    text: `*"Thirty, maybe forty. Mix of swords, bows. A few have elements — weak ones, hedge training, nothing like a real mage. But they don't need to be strong. They just need numbers."*

He looks at you, something between hope and despair.

*"Are you — I heard you came from the Woods. That you have an element. Is that true?"*

[void]Word travels fast in a small village.[/void]`,
    choices: [
      { text: '"I have an element. But I\'m barely trained."', next: 'farmer_honest' },
      { text: 'Say nothing about your abilities.', next: 'farmer_deflect' },
    ]
  },

  farmer_honest: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'Honest',
    text: `The farmer nods. Not disappointed — realistic.

*"One element's more than anyone else here has. Mara's the only channeler in Elmridge, and she's—"* He catches himself. *"She's not young. That's all I'll say."*

He grips your arm briefly.

*"Train hard, friend. Whatever happens, train hard."*

[void]He walks back toward his field. You're left at the south gate, looking at bandit marks and thinking about thirty armed raiders against one village with no walls.[/void]`,
    effects: { setFlag: { villagers_know_element: true } },
    choices: [
      { text: 'Go to Mara. Start training.', next: 'mara_first_lesson' },
      { text: 'Visit Garrick at the smithy first.', next: 'talk_garrick' },
    ]
  },

  farmer_deflect: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'Guarded',
    text: `*"I'm just a traveler. Mara's helping me get back on my feet."*

He nods slowly. Not convinced, but not pushing.

*"Well. If you can swing an axe, that's something. Garrick might have spare tools."*

[void]You leave it there. Information about your abilities is currency, and you don't know the exchange rate yet.[/void]`,
    choices: [
      { text: 'Go to Mara. Training time.', next: 'mara_first_lesson' },
      { text: 'Stop by Garrick\'s smithy.', next: 'talk_garrick' },
    ]
  },

  talk_garrick: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'village',
    moodLabel: 'The Blacksmith',
    text: `The smithy is hot, loud, and honest. Garrick works iron with the rhythm of someone who's done it for decades. He talks while he hammers.

*"Village has been here eighty years. Founded by settlers who wanted nothing to do with Aldarion or Veridia. Neutral ground. We pay taxes to both, pledge loyalty to neither."*

He quenches a blade and examines it.

*"Lately that neutrality's getting harder to hold. Aldarion pushes further south every year. Crimson Guard 'patrols' that look a lot like occupation. And the bandits fill every gap the proper armies leave."*

[void]*"Mara holds it together. But she's one person, and she's tired. Don't tell her I said that."*[/void]

He pauses his work, looks at you directly.

*"Whatever you are, whatever brought you here — if you're staying, even for a while, this village could use you. That's not a demand. Just a fact."*`,
    effects: { strength: 1, setFlag: { talked_garrick: true } },
    choices: [
      { text: '"I\'ll help however I can while I\'m here."', next: 'garrick_grateful' },
      { text: '"I can\'t stay long. But I\'ll do what I can."', next: 'garrick_understands' },
      { text: 'Ask about the bandit marks on the south gate.', condition: { flag: 'noticed_scratch_marks' }, next: 'garrick_bandits' },
      { text: 'Show him the Mana Crystal you found.', condition: { item: 'Mana Crystal' }, next: 'garrick_crystal_blade' },
    ]
  },

  garrick_grateful: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'village',
    moodLabel: 'Allies',
    text: `Garrick grins. Genuine. It transforms his face from weathered to warm.

*"Good enough for me."*

He reaches under his workbench and produces a short blade — crude but sharp. Utility knife, not a weapon, but the weight of it feels better than empty hands.

*"For the work. And whatever else comes."*`,
    effects: { item: { name: 'Garrick\'s Knife', icon: '🔪' }, setFlag: { garrick_ally: true } },
    choices: [ { text: 'Head to Mara for training.', next: 'mara_first_lesson' } ],
  },

  garrick_understands: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'village',
    moodLabel: 'Understood',
    text: `He nods. No offense taken.

*"People pass through. That's the nature of a neutral village. Just—"* He hammers a point flat. *"—don't leave us worse than you found us. That's all I ask."*

Fair.

He hands you a utility knife from the bench.

*"For the work. Splitting wood's easier with a blade."*`,
    effects: { item: { name: 'Garrick\'s Knife', icon: '🔪' } },
    choices: [ { text: 'Head to Mara for training.', next: 'mara_first_lesson' } ],
  },

  garrick_bandits: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'village',
    moodLabel: 'Grim',
    text: `Garrick's hammer stops. His face goes flat.

*"Broken Fang. They marked us three months ago, raided light — livestock, supplies. Testing."*

He sets the hammer down.

*"They'll come back. Always do. Bigger, meaner. The marks mean they liked what they saw — small village, no garrison, one elderly elementalist. Easy pickings."*

[blood]*"I've been making weapons instead of tools for two weeks. Spearheads, mostly. It won't be enough."*[/blood]

He looks at you with an expression you recognize. A man measuring what he has against what he needs and finding the gap enormous.`,
    effects: { setFlag: { garrick_bandits_warned: true } },
    choices: [ { text: 'Resolve to help. Head to Mara for training.', next: 'mara_first_lesson' } ],
  },

  garrick_crystal_blade: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'fire',
    moodLabel: 'Fascination',
    text: `You pull the Mana Crystal from your pack. The blue light catches Garrick mid-swing. His hammer freezes in the air.

*"Where did you—"* He sets the hammer down, comes closer. His eyes reflect the crystal's pulse. *"That's a Mana Crystal. Haven't seen one since my apprenticeship in Veridia."*

He takes it gently, holds it to the forge-light. The crystal refracts the firelight into blue-white sparks.

*"These form at elemental convergence points. Old ones, deep ones. Worth a fortune at the Academy. But—"*

He looks at his forge. At his tools. Back at the crystal.

[element]*"I could set this into a blade. The crystal would channel ambient mana into the edge — makes the weapon resonate with elemental energy. Hits harder. And for someone like you, it would amplify your connection."*[/element]

*"It would take a few hours. But I haven't had materials this good in twenty years. Say the word and I'll make you something worth carrying."*`,
    effects: { setFlag: { garrick_saw_crystal: true } },
    choices: [
      { text: '"Do it. Make the blade."', next: 'garrick_forges_blade' },
      { text: '"Keep the crystal safe. I might need it later."', next: 'garrick_keeps_crystal' },
    ]
  },

  garrick_forges_blade: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'fire',
    moodLabel: 'Crafting',
    text: `Garrick works for three hours straight. You watch — and learn. The forge reaches temperatures that make the air shimmer. He folds the steel around the crystal, not encasing it but *integrating* it. The crystal's light pulses through the metal like veins.

[element]The finished blade is beautiful. Short sword length — longer than the utility knife, lighter than a broadsword. The steel has a blue-silver sheen. The crystal sits at the crossguard, pulsing in rhythm with your heartbeat.

When you grip the hilt, {ELEMENT} surges. Not your doing — the blade is drawing ambient mana and feeding it to you. Your connection to {ELEMENT} sharpens. Clearer. Stronger.[/element]

*"Crystal Edge,"* Garrick says, admiring his own work. *"Been a long time since I made something I was proud of."*`,
    effects: {
      strength: 3, magic: 3, removeItem: 'Mana Crystal',
      item: { name: 'Crystal Edge', icon: '🗡' },
      setFlag: { has_crystal_blade: true }
    },
    choices: [ { text: 'Head to Mara for training.', next: 'mara_first_lesson' } ],
  },

  garrick_keeps_crystal: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'village',
    moodLabel: 'Reserved',
    text: `Garrick nods. Disappointed but respectful.

*"Smart. Crystal like that has uses beyond weapons. Mara might know some."*

He hands you the utility knife instead.

*"For now, take this. And if you change your mind about the blade — I'll be here."*`,
    effects: { item: { name: 'Garrick\'s Knife', icon: '🔪' } },
    choices: [ { text: 'Head to Mara for training.', next: 'mara_first_lesson' } ],
  },

  // ── VILLAGE TASKS ──────────────────────────────────────────

  village_tasks: {
    location: 'Elmridge — Village Square',
    scene: 'village',
    moodLabel: 'Afternoon',
    text: `After Mara's lesson, the afternoon stretches ahead. The village has noticed you — and a village that notices an elementalist puts them to work.

Several tasks need doing. Each one useful. Each one earns trust and teaches something.`,
    choices: [
      { text: 'Help Garrick at the forge. Heavy work, hot metal.', next: 'task_forge' },
      { text: 'Assist the healer. Mix tinctures and tend the sick.', next: 'task_healer' },
      { text: 'Help repair the south wall. Lift, carry, build.', next: 'task_wall' },
      { text: 'Scout the perimeter with the watchman. Eyes and speed.', next: 'task_scout' },
    ]
  },

  task_forge: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'fire',
    moodLabel: 'Iron Work',
    text: `Three hours at the forge. Pumping bellows, holding stock while Garrick hammers, carrying finished spearheads to the quench bucket.

The heat is brutal. Your arms ache. But there's a rhythm to smithing that quiets the mind — strike, turn, strike, quench. Repetition as meditation.

[void]Garrick doesn't talk much while he works. But at the end, he nods.

*"You've got a laborer's hands now. Stronger than they look."*[/void]

He slips you a small jar — weapon oil, for the blade he gave you.`,
    effects: { strength: 2, item: { name: 'Weapon Oil', icon: '🫙' }, setFlag: { task_forge_done: true } },
    choices: [
      { text: 'Good work. Return to the square.', next: 'village_tasks_done' },
    ]
  },

  task_healer: {
    location: 'Elmridge — Healer\'s Stall',
    scene: 'village',
    moodLabel: 'Medicine',
    text: `The village healer is a quiet woman named Daya. She teaches you to grind herbs, mix tinctures, identify the plants that heal from the ones that harm.

*"Clarity Root for focus. Ironbloom for strength recovery. And this—"* she holds up a dried flower, deep purple *"—Veilpetal. Reduces elemental burnout. Mara uses it after heavy channeling."*

[element]You learn to prepare a basic Health Salve — herb paste mixed with rendered fat and a drop of elemental water. It glows faintly. It works.[/element]

*"Keep that. You'll need it more than my other patients."*`,
    effects: { magic: 2, item: { name: 'Health Salve', icon: '🩹' }, setFlag: { task_healer_done: true } },
    choices: [
      { text: 'Thank Daya. Return to the square.', next: 'village_tasks_done' },
    ]
  },

  task_wall: {
    location: 'Elmridge — South Wall',
    scene: 'village',
    moodLabel: 'Building',
    text: `The south wall is more hope than defense — timber stakes with gaps wide enough to walk through. You spend three hours hauling stone from the river, filling gaps, reinforcing the base.

Physical labor. Honest. Your back screams but the wall looks better when you're done.

[void]The other workers — farmers, a carpenter, two teenagers — work alongside you. By the end, they're talking to you. Not about the Hollow or elements or being an Outsider. About the weather. About the harvest. Normal things.

You've earned a place, however temporary.[/void]`,
    effects: { strength: 2, resolve: 1, setFlag: { task_wall_done: true, wall_reinforced: true } },
    choices: [
      { text: 'Wipe the sweat. Head back.', next: 'village_tasks_done' },
    ]
  },

  task_scout: {
    location: 'Elmridge — Perimeter',
    scene: 'road',
    moodLabel: 'Patrol',
    text: `The village watchman, a lean man named Haral, takes you on his perimeter route. Two hours of walking, watching, reading sign.

*"Look for broken branches at head height — means riders. Footprints in pairs — organized patrol. Singles scattered — animals or lost travelers."*

He teaches you how the land looks when it's been scouted, how to spot where someone stood watching the village from cover.

[blood]*"Here. See?"* He points to a flattened patch of grass on a low ridge. *"Someone lay here recently. Watching the south gate. Hours, based on the compression."*

The Broken Fang. Closer than anyone thought.[/blood]`,
    effects: { agility: 2, setFlag: { task_scout_done: true, bandit_scouts_spotted: true } },
    choices: [
      { text: 'Report to Mara. This is urgent.', next: 'village_tasks_done' },
    ]
  },

  village_tasks_done: {
    location: 'Elmridge — Village Square',
    scene: 'village',
    moodLabel: 'Evening',
    text: `The day's work is done. You're tired in a good way — muscles used, skills learned, trust earned.

The village settles into evening routines. Cook fires. Conversation. Children being called inside.

[void]For a moment, it feels like a place you could belong. Then you remember the bandit marks, Mara's warnings, and the fact that something from beyond reality is hunting you.[/void]

Tomorrow brings more training. And whatever comes after.`,
    effects: { hp: 20, mana: 15 },
    choices: [
      { text: '[ Continue to evening training ]', next: 'afternoon_training' },
    ]
  },

  solo_practice: {
    location: 'Elmridge — Eastern Orchard',
    scene: 'dark',
    moodLabel: 'Solitude',
    text: `You find an orchard behind the village — gnarled trees with fruit you don't recognize. Empty this time of morning. Quiet.

Hands out. Reach for {ELEMENT}.

[element]{ELEMENT_SYMBOL} It comes faster than in the woods. Whether it's safety, rest, or the elemental resonators boosting the ambient field — you manifest in seconds instead of minutes.[/element]

Hold it. Shape it. Not just a burst, but sustained output. The serpent's knowledge tells you the theory; your body figures out the practice.

Thirty seconds. Forty. A minute.

[void]The mana cost is real — a pressure behind your eyes, like cognitive fatigue. But you're learning the exchange rate. Energy in, effect out. Physics by another name.[/void]

When you stop, you're breathing hard but steady. Measurably better than yesterday.`,
    effects: { mana: -20, resolve: 1, setFlag: { solo_practiced: true } },
    choices: [ { text: 'Head to Mara. Combine practice with instruction.', next: 'mara_first_lesson' } ],
  },

  early_training: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Eager',
    text: `You arrive at Mara's cottage before she expects you. She opens the door, sees you, and makes a sound that might be a laugh.

*"Eager. That's either admirable or reckless."* She steps aside. *"Come in. We'll start early."*

[void]She doesn't seem displeased.[/void]`,
    choices: [ { text: 'Begin the lesson.', next: 'mara_first_lesson' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // MARA'S FIRST LESSON
  // ═══════════════════════════════════════════════════════════

  mara_first_lesson: {
    location: 'Elmridge — Mara\'s Garden',
    scene: 'village',
    moodLabel: 'First Lesson',
    text: `Behind Mara's cottage: a garden of impossible plants. Silver-barked trees, flowers that glow faintly, herbs that lean toward you when you walk past.

*"Lesson one: control is not suppression."*

She holds out her palm. A ball of blue-white light forms — Light element, pure and stable. It doesn't flicker. It doesn't waver.

*"Most beginners treat their element like a weapon. Push hard, push fast. That's how you drain your mana in ten seconds and collapse."*

She lets the light dim to a pinpoint. Then expand to fill her hand. Then dim again. Perfect control.

*"Your element is a part of you. Not a tool. Not a weapon. An extension. Learn to breathe with it."*

She gestures to the open space.

*"Show me what you have."*`,
    choices: [
      { text: 'Manifest {ELEMENT}. Carefully. Control over force.', next: 'lesson_control' },
      { text: 'Manifest {ELEMENT}. Push hard. Show her what you can do.', next: 'lesson_force' },
    ]
  },

  lesson_control: {
    location: 'Elmridge — Mara\'s Garden',
    scene: 'fire',
    moodLabel: 'Discipline',
    text: `You close your eyes. Reach for the resonance. Not a grab — a request.

[element]{ELEMENT_SYMBOL} {ELEMENT} manifests between your palms. Small. Steady. You hold it like Mara held her light — not clenching, not forcing. Breathing with it.[/element]

Thirty seconds. Forty. The mana drain is there but manageable. You adjust — less output, same stability. Efficiency.

Mara watches without expression. Then:

*"Good. Better than good. You're not just channeling — you're optimizing. Most native elementalists take months to learn that instinct."*

A pause.

*"The Guardian chose well."*

She begins walking you through exercises: shrink the manifestation, expand it, move it from hand to hand. Each one builds a different aspect of control.

By the end of the hour, your mana is low but your understanding is sharper.`,
    effects: { mana: -30, resolve: 2, magic: 1, setFlag: { lesson_control_path: true, first_lesson_complete: true } },
    choices: [
      { text: 'Mara dismisses you for the afternoon. Help around the village.', next: 'village_tasks' },
    ]
  },

  lesson_force: {
    location: 'Elmridge — Mara\'s Garden',
    scene: 'fire',
    moodLabel: 'Raw Power',
    text: `You push. Hard.

[element]{ELEMENT_SYMBOL} {ELEMENT} erupts — bigger than intended, brighter, louder. A burst that scorches grass and sends Mara's herb pots rattling.[/element]

Impressive. For about three seconds. Then your mana bottoms out and you stagger, vision tunneling.

Mara catches your arm before you fall.

*"And that is lesson one."*

She's not angry. Almost amused.

*"Power without control is a tantrum, not a weapon. You just burned through a third of your mana reserves to accomplish what could be done with a tenth."*

[void]She's right. You know she's right. The serpent's knowledge told you the same thing — you just didn't listen.[/void]

She spends the next hour on control exercises. Smaller manifestations. Sustained output. Breathing with the element rather than against it.

Humbling. But effective.`,
    effects: { mana: -40, strength: 1, magic: 1, setFlag: { lesson_force_path: true, first_lesson_complete: true } },
    choices: [
      { text: 'Mara sends you away to recover. Help around the village.', next: 'village_tasks' },
    ]
  },

  afternoon_training: {
    location: 'Elmridge — Mara\'s Garden',
    scene: 'village',
    moodLabel: 'Progress',
    text: `Hours pass. Mara is a relentless teacher — patient but exacting. Every exercise has purpose. Every correction is precise.

By late afternoon, you can:

**Manifest** {ELEMENT} in under two seconds.

**Sustain** it for over a minute at low output.

**Shape** it — basic forms, directional control, variable intensity.

Not combat-ready. But functional. Yesterday you could barely flicker. Today you can hold a steady flame — metaphorically speaking.

*"Enough for today. Mana fatigue is cumulative — push past it and you risk damage to your channels."*

She hands you a small jar of paste.

*"Mana restoration tincture. One dose. Use it only if you must — the ingredients are not easily replaced."*

[element]Through the garden's ambient energy, you feel something new: the faintest awareness of the other five elements. Not accessible. But present. Like hearing a radio station you can't quite tune.[/element]`,
    effects: { hp: 10, resolve: 1, item: { name: 'Mana Tincture', icon: '🧪' }, setFlag: { afternoon_trained: true } },
    choices: [
      { text: 'Return to Garrick\'s for the evening.', next: 'evening_village' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // EVENING — CALM BEFORE THE STORM
  // ═══════════════════════════════════════════════════════════

  evening_village: {
    location: 'Elmridge — Village Square',
    scene: 'village',
    moodLabel: 'Dusk',
    text: `Evening light turns Elmridge golden. The resonators on rooftops glow brighter as sun fades — ambient defense systems running through the night.

Villagers gather in the square for the evening meal — a communal thing, stew from a shared pot, bread broken and passed. They make space for you without being asked.

Children point. Adults nod. A few offer cautious conversation. The baker's wife asks about your "homeland." You deflect with vague answers about traveling far.

[void]For an hour, it almost feels normal. Like you belong somewhere in this world. Like the forest and the Hollow and the wrong stars are problems for tomorrow.[/void]

Then Garrick sits beside you. His expression is wrong.

*"Mara needs to see you. Now. The south scouts came back."*`,
    effects: { hp: 20, mana: 20 },
    choices: [ { text: 'Go immediately.', next: 'scout_report' } ],
  },

  scout_report: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Bad News',
    text: `Mara stands at her map table. Two young men — village scouts — sit with exhaustion written into every line.

*"Report."* Mara's voice is iron.

The taller scout speaks: *"Broken Fang camp. Three leagues south. Fifty warriors, maybe more. Supply wagons. They're not raiding — they're staging."*

*"For what?"*

*"Us."* The scout swallows. *"They had a map. Elmridge circled in charcoal. Notes on the gate, the resonators, the number of buildings. This isn't a raid. It's an invasion."*

[blood]Silence. The kind that fills a room when everyone reaches the same conclusion simultaneously.[/blood]

Mara turns to you.

*"They'll come at dawn. Fifty armed soldiers against thirty families with farming tools."*

Her eyes are steady. Old. Tired. Unbroken.

*"I need to know what you're willing to do, {PLAYER_NAME}."*`,
    effects: { setFlag: { bandit_warning: true } },
    choices: [
      { text: '"I\'ll fight. Tell me the plan."', next: 'commit_to_fight' },
      { text: '"Can we evacuate? Get people out before dawn?"', next: 'consider_evacuation' },
      { text: '"Fifty against us — what are our actual options?"', next: 'tactical_assessment' },
    ]
  },

  commit_to_fight: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'War Council',
    text: `Mara nods. No surprise — she was hoping you'd say that.

*"Then here's what we have: one trained elementalist — me. One barely trained elementalist — you. Twenty villagers willing to fight, armed with spears Garrick's been making. The resonators can be overcharged to create a temporary barrier, but it'll burn them out."*

She draws on the map.

*"The south approach is our weakness — open farmland, flat ground. They'll come that way. If we can bottleneck them at the south gate, your element and mine can hold the gap while the villagers defend the flanks."*

[void]*"It's not a good plan. It's the only plan."*[/void]`,
    effects: { resolve: 2, setFlag: { chose_to_fight: true } },
    choices: [
      { text: '"What about traps? We have hours."', next: 'prepare_defenses' },
      { text: '"I need to know your element. What can you do?"', next: 'mara_reveals_power' },
    ]
  },

  consider_evacuation: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Hard Math',
    text: `Mara considers it. Genuinely.

*"North, into the forest? Thirty families with children and elderly, in the dark, with the Hollow's territory between here and safety."*

She shakes her head.

*"The Whispering Woods would kill more than the bandits. And if we scatter into the farmland, they'll hunt us individually. Easier prey, not harder."*

[blood]*"Sometimes there's no good option. Only the least bad one."*[/blood]

*"We fight. Not because we want to. Because every alternative is worse."*`,
    effects: { resolve: 1 },
    choices: [
      { text: '"Then we make our stand here. What\'s the plan?"', next: 'commit_to_fight' },
      { text: '"What do we have to work with?"', next: 'tactical_assessment' },
    ]
  },

  tactical_assessment: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Odds',
    text: `You break it down. Old habits — whether from your previous life or just the way your brain works.

**Them:** Fifty armed combatants. Mix of melee and ranged. A few weak elementalists. Supply wagons suggest they plan to stay — loot everything, not just raid.

**Us:** Two elementalists (one experienced, one with twelve hours of training). Twenty fighters with spears and farming tools. Thirty buildings with stone foundations. Elemental resonators on most roofs. One narrow south gate. Hours of darkness to prepare.

[void]The math is terrible. But math has variables. Change enough variables, and outcomes shift.[/void]

The south gate is the key. If they can't spread out, numbers matter less. If the resonators can be weaponized, even temporarily—

Your mind is already working. This is, in a strange way, what you were made for. Not magic. *Problem-solving under impossible constraints.*`,
    effects: { resolve: 2, setFlag: { tactical_mind: true } },
    choices: [
      { text: '"I have ideas. Let me see the defenses."', next: 'prepare_defenses' },
      { text: '"What can you do, Mara? I need to know our full arsenal."', next: 'mara_reveals_power' },
    ]
  },

  mara_reveals_power: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Arsenal',
    text: `Mara holds out both hands.

Light element blazes in her left — warm, gold, intense. In her right: a colder light, blue-white, that makes the air crackle.

*"Light is my primary. Strong. I can blind, burn, shield. But—"* She closes the blue-white hand. *"I once commanded a secondary. Crystal — Light and Earth combined. I can't sustain it anymore. Age and overuse."*

[element]Two elements. Even diminished, that puts her leagues above anything you've seen.[/element]

*"I can hold the south gate for ten, maybe fifteen minutes at full power. After that, I'm spent. Whatever happens after those fifteen minutes is on you and the villagers."*

She looks at you without flinching.

*"Can you fight for fifteen minutes, {PLAYER_NAME}? With one element and one day of training?"*`,
    effects: { setFlag: { knows_mara_power: true } },
    choices: [
      { text: '"I\'ll have to. Let\'s prepare."', next: 'prepare_defenses' },
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // PREPARATION — THE NIGHT BEFORE
  // ═══════════════════════════════════════════════════════════

  prepare_defenses: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'Preparation',
    text: `The village mobilizes in the dark. Quiet, efficient, terrified.

Garrick distributes spears — crude but sharp. Women and older children carry water buckets, ready to douse fires. The young and elderly are moved to the stone-foundation buildings in the village center.

You have hours. Mara assigns tasks:

[void]The resonators can be overcharged — a burst of elemental energy that creates a temporary barrier. It'll buy minutes and destroy the resonators permanently.

The south gate can be reinforced with logs and stone. It won't stop fifty people, but it'll slow them.

And you — you're the wild card.[/void]`,
    choices: [
      { text: 'Reinforce the gate with your element.', condition: { or: [{ element: 'earth' }, { element: 'fire' }, { element: 'water' }] }, next: 'element_fortify' },
      { text: 'Set traps on the southern approach.', next: 'set_traps' },
      { text: 'Train with Garrick — learn to fight with a weapon.', next: 'combat_training' },
      { text: 'Meditate. Conserve mana. You\'ll need everything tomorrow.', next: 'conserve_mana' },
    ]
  },

  element_fortify: {
    location: 'Elmridge — South Gate',
    scene: 'fire',
    moodLabel: 'Fortification',
    text: `You press your hands to the gate and push {ELEMENT} into the structure. Not raw force — the lesson from Mara. Sustained, controlled, purposeful.

[element]{ELEMENT_SYMBOL} The gate responds. Wood and stone absorb your element. The structure tightens, strengthens, bonds reforming at a molecular level you can't see but can feel.[/element]

Garrick watches, openmouthed.

*"Did you just — is the gate stronger now?"*

It is. Not impenetrable. But a battering ram that would have taken ten hits will now take thirty.

The mana cost is significant. But worth it.

*"You're full of surprises, Outsider."* Garrick actually laughs. *"Keep that up and we might survive this."*`,
    effects: { mana: -25, resolve: 1, setFlag: { fortified_gate: true } },
    choices: [ { text: 'Rest before dawn.', next: 'pre_battle_rest' } ],
  },

  set_traps: {
    location: 'Elmridge — Southern Farmland',
    scene: 'dark',
    moodLabel: 'Preparation',
    text: `You and three villagers work in the dark. Trenches across the south road — shallow, covered with branches. Not deep enough to injure, but enough to break a charge. Sharpened stakes at the treeline. Trip ropes across the most likely approach routes.

[void]Nothing elegant. Nothing magical. Just physics — momentum, balance, surprise. The tools of someone who understands how bodies move and how environments can be made hostile.[/void]

Garrick contributes caltrops — iron scraps bent into spikes. Scattered in the tall grass.

By the time you finish, the southern approach has gone from open farmland to an obstacle course. It won't stop a determined force. But it'll slow them, break their formation, buy seconds that could become minutes.`,
    effects: { agility: 1, setFlag: { set_traps: true } },
    choices: [ { text: 'Rest before dawn.', next: 'pre_battle_rest' } ],
  },

  combat_training: {
    location: 'Elmridge — Garrick\'s Smithy',
    scene: 'village',
    moodLabel: 'Steel Lessons',
    text: `Garrick doesn't teach you swordsmanship. There isn't time.

*"Forget the blade. You have an element. Use it."* He holds up a practice dummy stuffed with straw. *"What I can teach you is positioning. Where to stand, when to move, how to not get flanked."*

Two hours of drills. Footwork. Spacing. How to use a chokepoint. When to retreat and when to hold.

[void]He's good. Not an elementalist, but a fighter who's survived real violence. His lessons are practical, brutal, and exactly what you need.[/void]

*"One more thing."* He hands you a leather bracer. *"Wear this on your off-hand. Block with it. Your element goes through the dominant hand — always protect the other one."*`,
    effects: { strength: 1, agility: 1, item: { name: 'Leather Bracer', icon: '🛡' }, setFlag: { combat_trained: true } },
    choices: [ { text: 'Rest before dawn.', next: 'pre_battle_rest' } ],
  },

  conserve_mana: {
    location: 'Elmridge — Garrick\'s Room',
    scene: 'dark',
    moodLabel: 'Stillness',
    text: `You sit in darkness. Not sleeping — conserving. Every flicker of {ELEMENT} you don't spend now is a flicker you can spend when it matters.

The meditation isn't peaceful. Your mind runs scenarios. Fifty attackers, two elementalists, twenty farmers with spears. The variables are bad.

But your mana pool is full. Your element responds faster now — practice and rest compounding. And somewhere in the math of this impossible situation, there's an answer.

[element]You feel {ELEMENT} settle inside you like a loaded spring. Ready. Waiting. Full.[/element]

Tomorrow, you use everything.`,
    effects: { mana: 999, resolve: 2, setFlag: { conserved_mana: true } },
    choices: [ { text: 'Dawn.', next: 'pre_battle_rest' } ],
  },

  pre_battle_rest: {
    location: 'Elmridge — South Gate',
    scene: 'village',
    moodLabel: 'The Edge',
    text: `The last hour before dawn.

Villagers at their positions. Garrick with a spear in each hand. The scouts on rooftops with bows. Mara at the south gate, Light element flickering in her palms — warming up, testing, ready.

You stand beside her. One day in Elmridge. Twelve hours of training. One element.

[void]It's not enough. You know it's not enough. But it's what you have.[/void]

The eastern sky lightens. Two moons set. Stars fade.

From the south road: dust. Movement. The dull clank of weapons being readied.

Mara's jaw tightens.

*"Here they come."*`,
    effects: { setFlag: { battle_eve_complete: true } },
    choices: [ { text: '[ The Broken Fang Attack ]', next: 'bandit_assault' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // THE BATTLE OF ELMRIDGE
  // ═══════════════════════════════════════════════════════════

  bandit_assault: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'BATTLE: BROKEN FANG',
    text: `They come out of the morning mist like a tide. Fifty, maybe more. Leather armor, crude weapons, a few with stolen military gear. At the front: a large man with a scarred face and twin axes. Their leader.

He stops at speaking range.

*"People of Elmridge! Open your gates, surrender your stores, and you live. Resist, and we burn everything. You have one minute."*

[blood]Mara doesn't give him the minute.[/blood]

Light erupts from her palms — a blinding lance that turns the road white. Two front-rank bandits go down screaming, clutching their eyes. The rest scatter. Reform. Draw weapons.

*"They have a mage!"* someone shouts. And then they charge.

[void]The south gate holds. For now.[/void]`,
    effects: { setFlag: { battle_started: true } },
    choices: [ { text: '[ Defend the gate ]', next: 'battle_phase_1' } ],
  },

  battle_phase_1: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'Hold the Line',
    text: `The first wave hits the gate like a battering ram. Wood cracks. Spears thrust through gaps. Garrick roars and drives them back.

Mara is a lighthouse of destruction — Light element cuts through armor, blinds attackers, creates barriers of solid radiance. She's magnificent. And burning through power fast.

Your turn.

[element]You raise your hands. {ELEMENT_SYMBOL} {ELEMENT} responds — the spring uncoils.[/element]

Three bandits breach the gate's left side.`,
    choices: [ { text: '[ Fight ]', next: 'bandit_battle_start' } ],
  },

  bandit_battle_start: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'COMBAT',
    text: `Steel and desperation. Three Broken Fang warriors through the breach.`,
    effects: { setFlag: { bandit_battle_started: true } },
    choices: [],
  },

  bandit_battle_win: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'Holding',
    text: `[blood]They fall. Your element, Garrick's spear, the villagers' desperate courage — enough. Barely enough.[/blood]

But more pour through. The gate is cracking. Mara's light is dimming — ten minutes in, and her power is flagging.

*"{PLAYER_NAME}!"* she shouts. *"The resonators! Overcharge them NOW!"*

The crystalline devices on the nearest rooftops. If you push your element into them, they'll discharge everything at once — a pulse that should scatter the attack.

But it'll destroy them. And drain most of your remaining mana.`,
    effects: { strength: 1 },
    choices: [
      { text: 'Overcharge the resonators. Do it.', next: 'resonator_overcharge' },
      { text: 'Keep fighting. Save the resonators for the next wave.', next: 'fight_without_resonators' },
    ]
  },

  bandit_battle_lose: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'Falling',
    text: `You go down. A blade catches your side — not deep, but the pain is a white flash that disrupts your concentration. {ELEMENT} gutters out.

[blood]Garrick drags you behind a water trough. Your side is bleeding. The gate is failing.[/blood]

Mara's scream: *"The resonators! Someone, NOW!"*

She looks at you. Desperate. You have just enough mana. Maybe.`,
    effects: { hp: -15 },
    choices: [
      { text: 'Force yourself up. Overcharge the resonators.', next: 'resonator_overcharge' },
      { text: 'You can\'t. Let Mara handle it.', next: 'mara_resonator_sacrifice' },
    ]
  },

  resonator_overcharge: {
    location: 'Elmridge — Village Center',
    scene: 'fire',
    moodLabel: 'Release',
    text: `You reach. Not for your element alone — for the resonators. The crystalline structures on every rooftop, humming with stored energy, connected by the ambient field like nodes in a circuit.

[element]{ELEMENT_SYMBOL} You push {ELEMENT} into the nearest one. It drinks your energy, glows, *screams* — and the cascade begins. One resonator fires the next. A chain reaction.[/element]

**LIGHT.**

A dome of pure elemental force expands from Elmridge's center. Not lethal — but the pressure wave is like standing in a hurricane. Bandits are hurled off their feet. Weapons fly. The charge breaks.

[void]The resonators shatter. Every one. Crystal becomes dust. The village's permanent defenses — gone in a single pulse.[/void]

But so is the attack. Scattered, stunned, bleeding from ears and noses, the Broken Fang stumble away from the walls. Their leader screams orders no one follows.

Mara's voice, ragged: *"The flanks. Don't let them regroup."*`,
    effects: { mana: -50, setFlag: { resonators_destroyed: true, overcharged_resonators: true } },
    choices: [ { text: 'Rally the villagers. Push them back.', next: 'bandit_rout' } ],
  },

  fight_without_resonators: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'Blood Price',
    text: `You keep fighting. Element and blade and desperate violence.

Three more fall. Four. But they keep coming, and Mara's light is failing, and the gate is splinters now.

[blood]The line is breaking. Mara staggers. Garrick bleeds from a cut on his arm but keeps swinging. Both of them need you. You can only be in one place.[/blood]

Mara's voice cracks: *"I can overcharge the resonators — but I need cover!"*

Garrick shouts from the gate: *"They're flanking right! If someone doesn't hold that gap—"*

[void]Choose. One needs magic cover, the other needs a body in the gap. You can't do both.[/void]`,
    effects: { strength: 1 },
    choices: [
      { text: 'Backup Mara. Cover her while she overcharges.', next: 'backup_mara' },
      { text: 'Backup Garrick. Hold the gap.', next: 'backup_garrick' },
    ]
  },

  backup_mara: {
    location: 'Elmridge — Village Center',
    scene: 'fire',
    moodLabel: 'The Cost',
    text: `You sprint to Mara. Shield her with {ELEMENT} while she reaches for the resonators.

[element]{ELEMENT_SYMBOL} You pour everything into a barrier — not perfect, not strong, but enough to buy her ten seconds.[/element]

The cascade fires. Weaker than if you'd done it, but enough. Bandits scatter.

Then you hear it.

A sound that doesn't belong in a battle — a wet, final sound. Metal into flesh.

[blood]Garrick. At the gate gap. Alone. A bandit's spear through his chest.

He falls slowly. Not dramatically — just a man's legs giving out. He hits the ground on his side, reaches toward his hammer out of habit, and stops reaching.[/blood]

Mara sees. The sound she makes isn't a scream. It's worse.

[void]Garrick is dead. The gap you left him to hold was the gap that killed him. Nobody says it. Nobody has to. You chose Mara. The consequence was Garrick.[/void]

The resonator pulse did its work. The bandits are scattered. But the victory has a price written on the ground in front of the gate.`,
    effects: { corruption: 4, resolve: -1, setFlag: { garrick_dead: true, resonators_destroyed: true, mara_overcharged: true } },
    choices: [ { text: '...', next: 'bandit_rout' } ],
  },

  backup_garrick: {
    location: 'Elmridge — South Gate',
    scene: 'battle',
    moodLabel: 'The Gap',
    text: `You fill the gap beside Garrick. Shoulder to shoulder. Two people in a hole meant for five.

*"About time!"* Garrick roars, swinging his hammer into the nearest attacker.

You fight. Hard. {ELEMENT} blazes and Garrick hammers and the gap holds.

[blood]Behind you — Mara overcharges the resonators alone. One elderly woman, channeling everything she has into a cascade meant for two elementalists.

The pulse fires. Bandits scatter. The gate holds.

Mara does not.[/blood]

She collapses. Not unconscious — worse. Her eyes are open but *empty*. The mana channels in her body have burned out. Overcharged beyond recovery.

[void]*Mana Burnout.* You've heard the term — the serpent's knowledge included it. When an elementalist pushes past their limits, the channels that carry elemental energy scar shut. Permanently.

Mara will never channel again. Her Light element is gone. Not depleted — destroyed.[/void]

Garrick reaches her first. The sound he makes when he realizes what happened is something you'll carry forever.`,
    effects: { corruption: 2, resolve: 1, setFlag: { mara_burnout: true, resonators_destroyed: true } },
    choices: [ { text: 'The battle isn\'t over.', next: 'bandit_rout' } ],
  },

  mara_resonator_sacrifice: {
    location: 'Elmridge — South Gate',
    scene: 'fire',
    moodLabel: 'Sacrifice',
    text: `Mara sees you can't move. Without hesitation, she channels everything she has left into the nearest resonator.

The cascade is weaker — one old woman's power instead of two elementalists — but it's enough. The pulse drives the attackers back. The gate holds for one more minute.

[blood]Mara drops. Eyes closed. Breathing, but barely. She gave everything.[/blood]

Garrick pulls you both behind the gate remnants. His face is ash-white.

*"She's alive. Barely. We need to finish this."*`,
    effects: { corruption: 3, setFlag: { mara_collapsed: true } },
    choices: [ { text: 'Stand up. Finish it.', next: 'bandit_rout' } ],
  },

  bandit_rout: {
    location: 'Elmridge — Southern Field',
    scene: 'village',
    moodLabel: 'Breaking Point',
    text: `The Broken Fang are scattered but not beaten. Their leader — the scarred man with twin axes — rallies fifteen, maybe twenty, at the road's edge. Preparing to charge again.

Then the villagers do something you didn't expect.

They charge first.

Twenty farmers with spears, screaming, pouring through the shattered gate. Not trained. Not skilled. Just *done* — done with raids, done with fear, done with being prey.

The bandits, already staggered by the resonator pulse, break. Not all at once — their leader holds for ten seconds, swinging those axes, before a spear takes him in the thigh and he goes down.

[void]After that, it's over. The Broken Fang run south. They leave their dead, their supplies, their map with Elmridge circled in charcoal. They leave behind the first real victory this village has had in years.[/void]

Morning sun hits the village. You're standing in the gate, bloody, exhausted, mana-empty.

Alive.`,
    effects: { resolve: 2, strength: 1, kill: 3, setFlag: { battle_won: true } },
    choices: [ { text: '[ Aftermath ]', next: 'battle_aftermath' } ],
  },

  // ═══════════════════════════════════════════════════════════
  // AFTERMATH & CHAPTER END
  // ═══════════════════════════════════════════════════════════

  battle_aftermath: {
    location: 'Elmridge — Village Square',
    scene: 'village',
    moodLabel: 'What Remains',
    text: `The Broken Fang are gone. The morning air is thick with smoke and the copper smell of blood.

Villagers move through the aftermath in silence. Tending wounds. Counting losses. Staring at the broken gate and the bodies beyond it.

A girl, maybe ten, brings you water without being asked. Her hands shake but her eyes are steady.

[void]You defended them. With one element and barely two days of training and the kind of desperate improvisation that keeps people alive when nothing else will.

It wasn't enough. It was barely enough. But it was enough.[/void]`,
    effects: { hp: 10, mana: 10 },
    choices: [ { text: 'Find Mara.', condition: { noFlag: 'garrick_dead' }, next: 'mara_aftermath' },
              { text: 'Find Mara.', condition: { flag: 'garrick_dead' }, next: 'mara_aftermath_garrick_dead' },
    ]
  },

  mara_aftermath_garrick_dead: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Grief',
    text: `Mara is at the cottage, sitting beside the table, hands flat on the wood. She doesn't look up when you enter.

Garrick's hammer sits on the table. Someone brought it from the gate.

*"He held the gap."* Her voice is flat. Empty. *"Alone. Because you were covering me."*

[void]She doesn't blame you. That's somehow worse. She states a fact, the way you'd note a change in weather.[/void]

*"The resonators are destroyed. Garrick is dead. Elmridge is defenseless."*

She finally looks at you. Red-eyed but steady.

*"You need to go to Master Orin. Not for training — for help. Elmridge cannot survive another month without elemental defenses, and I cannot rebuild them alone."*

She presses a sealed letter into your hands.

*"Find Orin. Tell him what happened. He'll know what to do."*`,
    effects: { setFlag: { has_mara_letter: true, departure_reason_garrick: true } },
    choices: [
      { text: '"I\'m sorry about Garrick."', next: 'mara_grief_response' },
      { text: '"I\'ll find Orin. I\'ll bring help."', next: 'departure_healing' },
    ]
  },

  mara_grief_response: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Weight',
    text: `*"Don't apologize. You chose to save me. Garrick chose to hold the gap. We all made choices."*

A long silence.

*"He was the best man in this village. Twenty years of holding things together with iron and stubbornness. And now—"*

She stops. Breathes. Continues.

*"Now I hold things together alone. Which means I need you to bring help. Quickly."*`,
    effects: { resolve: 1 },
    choices: [ { text: '"I\'ll go. Today."', next: 'departure_healing' } ],
  },

  mara_aftermath: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'Consequences',
    text: `She's on her bed, conscious now, pale as bone. The blue-white Cold Fire in her hearth is dim — barely a candle.

*"The resonators."* First words. Not a question.

"Gone."

She closes her eyes. Opens them.

*"Then we've bought time by spending our future. The resonators kept larger threats away — beasts, opportunists, the Hollow. Without them, Elmridge is exposed."*

[void]A pause. Heavy with everything unsaid.[/void]

*"You fought well, {PLAYER_NAME}. Better than anyone had a right to expect. But this village cannot survive another attack without those resonators. And I cannot replace them."*

She reaches under her pillow. Pulls out the sealed letter.

*"You need to leave Elmridge. South, to Veridia. Find Master Orin in the mountains beyond. He can train you properly — give you what I can't."*

*"And more importantly—"* She presses the letter into your hands. *"—he can send help back. If anyone can restore what we've lost, it's him."*`,
    effects: { setFlag: { has_mara_letter: true } },
    choices: [
      { text: '"I\'ll go. And I\'ll bring help back."', next: 'departure_healing' },
      { text: '"I can\'t leave you undefended."', next: 'mara_insists' },
    ]
  },

  mara_insists: {
    location: 'Elmridge — Elder Mara\'s Cottage',
    scene: 'village',
    moodLabel: 'The Push',
    text: `*"You staying is what leaves us undefended."*

It lands hard. She sees it and softens — slightly.

*"The Crimson Guard will hear about this battle. An elementalist defending a neutral village? They'll investigate. And if they find an Outsider—"*

[blood]*"It won't be bandits next time. It'll be soldiers. Professional ones. With orders to take you alive or not at all."*[/blood]

*"The best way to protect Elmridge is to draw danger away from it. Go south. Find Orin. Get strong. And when you're strong enough — come back."*

Her hand squeezes yours. Briefly. Strong for a woman who emptied herself an hour ago.

*"This is not goodbye. This is 'go and return.' There's a difference."*`,
    effects: { resolve: 1 },
    choices: [ { text: '"I\'ll come back. I promise."', next: 'departure_healing' } ],
  },

  departure_healing: {
    location: 'Elmridge — Healer\'s Stall',
    scene: 'village',
    moodLabel: 'Recovery',
    text: `Before you leave, the village healer — Daya — insists on treating your wounds. An hour of bandaging, poultice, and a bitter draught that floods your body with warmth.

[element]The tincture she uses is stronger than the ones she taught you to make. Professional grade. It accelerates healing — not magic, but close. Bruises fade to yellow. Cuts close. The deep ache in your muscles softens.[/element]

*"You're not fully healed. But you're functional. The road south is hard — you'll need everything you have."*

She presses a small jar into your hands. *"Health Salve. For when it gets bad. And it will get bad."*

Mara watches from the cottage doorway. She nods. Ready.`,
    effects: { hp: 999, mana: 999, item: { name: 'Health Salve', icon: '🩹' }, setFlag: { healed_before_departure: true } },
    choices: [ { text: 'Say your goodbyes. Leave Elmridge.', next: 'chapter_2_end' } ],
  },

  chapter_2_end: {
    location: 'Elmridge — South Gate',
    scene: 'road',
    moodLabel: 'The Road Opens',
    text: `Dawn of the second day. The broken gate stands open. South: the road to Veridia, through forest and field and whatever Eldara puts in your path.

Mara's letter in your pack. Healed, rested, armed with what this village could give you.

[void]The village watches you go. Thirty families who fought beside you. Children who brought you water. A baker who shared bread with a stranger.

Elmridge shrinks behind you. The forest ahead is vast and indifferent.

You walk.[/void]`,
    effects: {
      setFlag: { left_elmridge: true, chapter_2_complete: true }
    },
    choices: [ { text: '[ Continue to Chapter 3 ]', next: 'arc1/chapter3/the_road_south' } ],
  },

});

// ── POST-LOAD: Battle auto-start for bandit fight ──
(function() {
  var origRender = EV.renderScene;
  EV.renderScene = function(sceneObj) {
    var key = null;
    var chData = EV.CHAPTERS[EV.state.currentArc + '-' + EV.state.currentChapter];
    if (chData) {
      for (var k in chData) { if (chData[k] === sceneObj) { key = k; break; } }
    }

    // Bandit breach battle — easier if traps were set
    if (key === 'bandit_battle_start' && !EV.state.flags._bandit_battle_fought) {
      EV.state.flags._bandit_battle_fought = true;
      var trapped = EV.state.flags.set_traps;
      var fortified = EV.state.flags.fortified_gate;
      var hp = trapped ? 40 : 60;
      var atk = trapped ? 6 : 8;
      var def = fortified ? 2 : 3;
      var intro = trapped
        ? 'The traps thin their charge — only two raiders make it through!'
        : 'Three raiders crash through the breach, blades drawn.';
      origRender.call(EV, sceneObj);
      setTimeout(function() {
        EV.startBattle({
          enemy: {
            name: 'Broken Fang Raiders',
            hp: hp, atk: atk, atkVar: 5, defense: def,
            intro: intro,
            abilityChance: trapped ? 0.1 : 0.2,
            ability: function(state) {
              var msgs = [
                { msg: 'A raider flanks you — slash across the ribs!', damage: 12 },
                { msg: 'Two attack simultaneously — coordinated strike!', damage: 15 },
                { msg: 'A thrown axe clips your shoulder!', damage: 10 },
              ];
              return msgs[Math.floor(Math.random() * msgs.length)];
            },
          },
          onWin: function() { EV.navigateTo('bandit_battle_win'); },
          onLose: function() { EV.navigateTo('bandit_battle_lose'); },
          canFlee: false,
        });
      }, 500);
      return;
    }

    origRender.call(EV, sceneObj);
  };
})();
