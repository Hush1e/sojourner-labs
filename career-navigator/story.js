/* ================================================================
   STORY FILE: "The Longest Saturday"
   A Choose Your Own Adventure that scores the six Holland (RIASEC)
   interest types used by the U.S. Department of Labor's O*NET:
     R Realistic (hands on, tools, outdoors)   I Investigative (science, puzzles)
     A Artistic (create, design)               S Social (help, teach, care)
     E Enterprising (lead, persuade, take charge)  C Conventional (organize, systems, details)
   Each choice: label, icon, points (p), outcome text (out), next scene id.
   Special scene ids: "mentor" (meet a professional matched to the
   player's current leader) and "end" (results).
   {name} in any text is replaced with the player's first name.
   ================================================================ */

window.RIASEC = {
  R: { name: "Realistic", nick: "The Doer", color: "#3f8f4f", desc: "You like working with your hands, tools, animals, or the outdoors, and seeing real results.", url: "https://www.onetonline.org/find/descriptor/browse/1.B.1.a" },
  I: { name: "Investigative", nick: "The Thinker", color: "#2f78c4", desc: "You like solving problems, figuring out how things work, and using science and facts.", url: "https://www.onetonline.org/find/descriptor/browse/1.B.1.b" },
  A: { name: "Artistic", nick: "The Creator", color: "#c4602f", desc: "You like creating, designing, and expressing ideas in your own way.", url: "https://www.onetonline.org/find/descriptor/browse/1.B.1.c" },
  S: { name: "Social", nick: "The Helper", color: "#c43f7a", desc: "You like helping, teaching, caring for, and working with people.", url: "https://www.onetonline.org/find/descriptor/browse/1.B.1.d" },
  E: { name: "Enterprising", nick: "The Leader", color: "#d4a017", desc: "You like taking charge, leading teams, making decisions, and convincing others.", url: "https://www.onetonline.org/find/descriptor/browse/1.B.1.e" },
  C: { name: "Conventional", nick: "The Organizer", color: "#5b3fa8", desc: "You like order, systems, details, and making sure things are done right.", url: "https://www.onetonline.org/find/descriptor/browse/1.B.1.f" },
};

window.SCENES = {
 /* ---------- CHAPTER 1: MORNING ---------- */
 start: { ch: "Chapter 1 · Morning", bg: "sunrise", art: "🌅📱🏡",
  text: ["Your phone buzzes at 7:02 AM. It's Saturday, there's no school, and four messages are waiting.",
         "Your cousin Jordan: \"Hiking Old Man's Cave today?? Leaving in 20.\" Your Aunt Rosa: \"Restaurant is SHORT staffed. Help?? I'll feed you.\" Your neighbor Mr. Patel: \"My computer is acting very strange. Are you awake?\" And the county fair: \"Volunteers still needed at the safety tent!\"",
         "You can only pick one. Where does your Saturday begin, {name}?"],
  choices: [
   { label: "Grab my boots and go hiking with Jordan", icon: "🥾", p: { R: 2 }, out: "You throw granola bars in a backpack and you're out the door in eight minutes flat.", next: "trail" },
   { label: "Head to Aunt Rosa's restaurant in Nelsonville", icon: "🍳", p: { A: 1, E: 1 }, out: "Aunt Rosa hugs you at the back door and hands you an apron before you can say hello.", next: "restaurant" },
   { label: "Knock on Mr. Patel's door to check his computer", icon: "💻", p: { I: 1, C: 1 }, out: "Mr. Patel looks relieved. \"It started making noises,\" he whispers, like the computer can hear him.", next: "patel" },
   { label: "Volunteer at the fair's safety tent", icon: "⛑️", p: { S: 2 }, out: "A volunteer coordinator gives you a bright vest and a radio. You feel official.", next: "fair" } ] },

 /* ---------- CHAPTER 2: FOUR STARTING PATHS ---------- */
 trail: { ch: "Chapter 2 · The Trail", bg: "forest", art: "🌲🦌🌲🪨🌲",
  text: ["The trail is quiet except for birds. Jordan stops suddenly and points at the mud.",
         "Fresh tracks. Hoofprints, split in two, pressed deep. Next to them are smaller prints with claw marks. Something was following the deer.",
         "Jordan whispers, \"What do we do?\""],
  choices: [
   { label: "Study the tracks and figure out what animal it was", icon: "🔍", p: { I: 2, R: 1 }, out: "You measure the prints with a stick and compare them to a guide on your phone. Coyote. You feel like a detective of the woods.", next: "ridge" },
   { label: "Take photos and log the location for the park", icon: "📸", p: { C: 2, R: 1 }, out: "You save the GPS spot and the time. Later, a park worker thanks you because they track coyotes in this area.", next: "ridge" },
   { label: "Keep Jordan calm and move the group on safely", icon: "🛡️", p: { E: 1, S: 1 }, out: "You stay calm, talk Jordan through it, and you both keep hiking. Jordan looks at you like you're the guide now.", next: "ridge" },
   { label: "Sketch the tracks and the forest in my notebook", icon: "✏️", p: { A: 2, R: 1 }, out: "Your sketch is so good that Jordan asks for a copy. Later, a park worker asks to use it on a trail sign.", next: "ridge" } ] },

 ridge: { bg: "forest", art: "⛰️🦅🥾",
  text: ["At the top of the ridge, you hear someone call for help. An older hiker slipped on wet rock and is sitting on the trail, holding his ankle.",
         "His wife is panicking. Cell service has only one bar."],
  choices: [
   { label: "Check his ankle and wrap it with a jacket", icon: "🩹", p: { S: 2, R: 1 }, out: "You remember first aid from a health class. The swelling is bad, but your wrap holds. He says, \"You've done this before?\" You haven't.", next: "alert_woods" },
   { label: "Take charge and organize a plan to get him down", icon: "📣", p: { E: 2 }, out: "You assign jobs: Jordan carries the packs, you and the wife support his arms. The plan works.", next: "alert_woods" },
   { label: "Climb higher to get signal and call the rangers", icon: "📡", p: { R: 1, I: 1 }, out: "You find two bars near a big oak and give dispatch your exact trail marker. Help is on the way.", next: "alert_woods" } ] },

 restaurant: { ch: "Chapter 2 · The Kitchen", bg: "kitchen", art: "🍳🔥🥕🧄",
  text: ["The kitchen is hot, loud, and smells amazing. Aunt Rosa's head cook is out sick, and the lunch rush starts in an hour.",
         "\"I need you somewhere,\" she says. \"Where do you want to be?\""],
  choices: [
   { label: "At the stove, making the soup of the day", icon: "🍲", p: { A: 2, R: 1 }, out: "You taste, adjust, and taste again. A little smoked paprika. Aunt Rosa tries it and raises her eyebrows. \"Ooh. Keep going.\"", next: "rush" },
   { label: "Running the front and greeting guests", icon: "🙋", p: { S: 1, E: 1 }, out: "You learn every table's name by noon. A regular tells Rosa, \"Hire this one.\"", next: "rush" },
   { label: "Organizing orders and the supply list", icon: "📋", p: { C: 2 }, out: "You find that the kitchen orders too much lettuce every week and it goes to waste. Rosa writes that down.", next: "rush" } ] },

 rush: { bg: "kitchen", art: "🧾🧾🧾⏱️",
  text: ["Noon. Twenty tickets at once. Then a customer waves you over. Her son's lips are swelling. She thinks there were nuts in the dessert."],
  choices: [
   { label: "Stay calm, help the mom, and call 911", icon: "🚑", p: { S: 2, E: 1 }, out: "The mom has an EpiPen in her purse. You help her find it and stay with them until help arrives. The boy is okay.", next: "alert_town" },
   { label: "Check the recipe and find exactly what was in it", icon: "🔬", p: { I: 2, C: 1 }, out: "You find almond flour in the crust. You tell the paramedics exactly what he ate, which helps them.", next: "alert_town" },
   { label: "Keep the kitchen running so other guests are fed", icon: "🍳", p: { R: 1, E: 1 }, out: "While others help the boy, you keep forty lunches moving. Somebody has to, and you did.", next: "alert_town" } ] },

 patel: { ch: "Chapter 2 · The Strange Computer", bg: "tech", art: "💻⚠️🔒",
  text: ["Mr. Patel's screen shows a red warning: \"VIRUS DETECTED. Call Microsoft Support now at this number!\" The computer beeps every few seconds.",
         "\"Should I call them?\" he asks, already holding his phone."],
  choices: [
   { label: "Stop him. Real companies don't do that", icon: "✋", p: { E: 1, S: 1 }, out: "You explain it's a scam to get his credit card. He puts the phone down. \"My friend lost $900 to one of these,\" he says quietly.", next: "clue" },
   { label: "Investigate what's really causing the pop up", icon: "🔍", p: { I: 2 }, out: "You find it's a fake web page, not a real virus. Closing the browser makes the beeping stop. Mr. Patel applauds.", next: "clue" },
   { label: "Back up his family photos before anything else", icon: "💾", p: { C: 2, R: 1 }, out: "You copy 3,000 photos to a flash drive. Mr. Patel tears up a little. \"Those are my grandkids.\"", next: "clue" },
   { label: "Cheer him up by making him lunch while it scans", icon: "🥪", p: { A: 1, S: 1, R: 1 }, out: "You turn leftover chicken and naan into the best wrap he's had all week. \"You should cook for a living,\" he says.", next: "clue" } ] },

 clue: { bg: "tech", art: "🕵️📧🔗",
  text: ["You notice an email in his inbox from yesterday: \"Your bank account is locked. Click here.\" He clicked it. Then he typed his password."],
  choices: [
   { label: "Help him change his passwords and turn on two step login", icon: "🔐", p: { C: 2, R: 1 }, out: "You go account by account. It takes an hour, but now every account is locked down.", next: "alert_town" },
   { label: "Trace where the fake link really goes", icon: "🧩", p: { I: 2 }, out: "The link goes to a website made to look like his bank, registered just three days ago. You report it.", next: "alert_town" },
   { label: "Teach him how to spot fake emails next time", icon: "🧑‍🏫", p: { S: 2 }, out: "You show him three tricks: check the sender, hover over links, and never trust panic. He writes them on a sticky note.", next: "alert_town" },
   { label: "Design a funny scam alert poster for his senior center", icon: "🎨", p: { A: 2, S: 1 }, out: "You make a poster of a cartoon fish taking bait that says \"Don't Get Phished.\" The senior center prints 50 copies.", next: "alert_town" } ] },

 fair: { ch: "Chapter 2 · The County Fair", bg: "fair", art: "🎡🌽🐄🎪",
  text: ["The fair is packed: funnel cakes, tractor pulls, and a barn full of 4H animals. Your radio crackles: \"We need help in two places.\""],
  choices: [
   { label: "The first aid tent, where a kid feels faint from the heat", icon: "❤️‍🩹", p: { S: 2, I: 1 }, out: "You get her into the shade with water and a cool towel. The nurse on duty shows you how to check her pulse.", next: "booth" },
   { label: "The livestock barn, where a goat got loose", icon: "🐐", p: { R: 2 }, out: "It takes ten minutes, two hay bales, and one very undignified dive, but you catch the goat. The crowd cheers.", next: "booth" },
   { label: "The lost child station, where a parent is panicking", icon: "📣", p: { E: 1, S: 1 }, out: "You get a description and radio every volunteer. Five minutes later, a deputy walks up holding the boy's hand.", next: "booth" },
   { label: "The 4H baking tent, where they need a pie contest judge", icon: "🥧", p: { A: 2, E: 1 }, out: "You taste eleven pies, take notes like a pro, and explain exactly why the cherry crumble wins. The bakers love your feedback.", next: "booth" } ] },

 booth: { bg: "fair", art: "👮🎪🚒",
  text: ["The deputy who found the boy hangs around the tent. \"You're good under pressure,\" she says. Then the wind shifts and the tent flaps hard. Everyone looks at the sky."],
  choices: [
   { label: "Ask the deputy how she knows when to clear a crowd", icon: "🛡️", p: { E: 1, I: 1 }, out: "\"Training and weather alerts,\" she says. \"And trusting your gut.\" She shows you the radar on her phone. It's bad.", next: "alert_town" },
   { label: "Start tying down the tent and the equipment", icon: "🪢", p: { R: 2 }, out: "You and two volunteers lash everything to the posts. The tent holds when others don't.", next: "alert_town" },
   { label: "Check that every volunteer has a radio and knows the plan", icon: "📋", p: { C: 2, E: 1 }, out: "You make a quick checklist. Three volunteers didn't know where to go. Now they do.", next: "alert_town" },
   { label: "Make big signs so everyone can find the storm shelter", icon: "🖍️", p: { A: 2, C: 1 }, out: "Your bright arrows are the first thing people see when the rain starts. Nobody gets lost.", next: "alert_town" } ] },

 /* ---------- CHAPTER 3 OPENER: THE ALERT ---------- */
 alert_woods: { ch: "Chapter 3 · The Warning", bg: "dusk", art: "📱⚠️🌩️",
  text: ["Every phone on the mountain starts screaming at once. EMERGENCY ALERT: Severe thunderstorm warning. Flash flooding possible. Seek shelter now.",
         "The hiker's wife grabs your arm. Jordan looks at the sky. Thirty seconds to decide your first move."],
  choices: [
   { label: "Read the full alert and check the radar timing", icon: "📡", p: { I: 2, C: 1 }, out: "The worst of it hits in 22 minutes. That number shapes everything you do next.", next: "storm_woods" },
   { label: "Get everyone moving toward the stone shelter", icon: "🏃", p: { E: 2, R: 1 }, out: "You point, you count, you move. No one argues with someone who has a plan.", next: "storm_woods" },
   { label: "Stay with the hurt hiker and keep him calm", icon: "🤝", p: { S: 2 }, out: "You crouch next to him. \"We've got you,\" you say, and he stops shaking.", next: "storm_woods" } ] },

 alert_town: { ch: "Chapter 3 · The Warning", bg: "dusk", art: "📱⚠️🌩️",
  text: ["Every phone in the room shrieks at once. EMERGENCY ALERT: Severe thunderstorm warning for Hocking and Athens counties. Damaging winds. Seek shelter now.",
         "People freeze and look at each other. Thirty seconds to decide your first move."],
  choices: [
   { label: "Read the full alert and figure out when it hits", icon: "📡", p: { I: 2, C: 1 }, out: "Winds over 60 miles per hour in about 20 minutes. Now you know how much time you have.", next: "storm_town" },
   { label: "Tell everyone where to go and get them moving", icon: "📣", p: { E: 2 }, out: "Your voice is louder than you expected. People listen and head for the interior rooms.", next: "storm_town" },
   { label: "Grab supplies: flashlights, water, first aid kit", icon: "🔦", p: { R: 2, C: 1 }, out: "You fill a box in two minutes flat. Later, every item in it gets used.", next: "storm_town" },
   { label: "Text family members to make sure they're safe", icon: "💬", p: { S: 2 }, out: "Grandma replies with a thumbs up. Two neighbors you texted say they hadn't seen the alert at all.", next: "storm_town" } ] },

 /* ---------- CHAPTER 3: THE STORM ---------- */
 storm_woods: { ch: "Chapter 3 · The Storm", bg: "storm", art: "⛈️🌲⚡🌊",
  text: ["The sky turns green gray. Thunder cracks so close you feel it in your chest. Rain comes sideways.",
         "Rangers arrive to help the hurt hiker, but the creek below is rising fast, and a family with small kids is still on the lower trail."],
  choices: [
   { label: "Go with a ranger to guide the family to high ground", icon: "🧭", p: { R: 2, S: 1 }, out: "You know this trail now. You lead the way while the ranger carries the youngest kid. Everyone makes it to the shelter.", next: "after" },
   { label: "Watch the creek and radio how fast it's rising", icon: "📏", p: { I: 2, C: 1 }, out: "You mark the water level on a tree every five minutes. The rangers use your numbers to close the lower trail in time.", next: "after" },
   { label: "Help the rangers coordinate everyone at the shelter", icon: "📣", p: { E: 2 }, out: "You count heads, match kids with parents, and keep a list. A ranger says, \"You should apply here someday.\"", next: "after" } ] },

 storm_town: { ch: "Chapter 3 · The Storm", bg: "storm", art: "⛈️🏙️⚡🚦",
  text: ["The storm hits Nelsonville hard. Trees snap, and at 3:17 PM, the power goes out across the whole town.",
         "Traffic lights are dark. Phones are lighting up with messages. Everyone around you is looking for someone to do something."],
  choices: [
   { label: "Help a police officer direct traffic at the dead light", icon: "🚦", p: { E: 1, R: 1 }, out: "You hold a flashlight and wave cars through on the officer's signal. Not one crash. The officer gives you a nod.", next: "after" },
   { label: "Get a backup generator running for the restaurant freezers", icon: "🔧", p: { R: 2, I: 1 }, out: "You read the manual by flashlight, check the fuel, and pull the cord. It roars to life. $4,000 of food is saved.", next: "after" },
   { label: "Check on elderly neighbors who live alone", icon: "🏠", p: { S: 2 }, out: "You knock on six doors. Mrs. Dunlap's oxygen machine needs power. You help her family get her to the shelter.", next: "after" },
   { label: "Set up a phone charging station from car batteries", icon: "🔋", p: { I: 1, C: 1, R: 1 }, out: "With a power inverter and some cables, you keep twelve phones alive so families can reach each other.", next: "after" } ] },

 /* ---------- CHAPTER 4: AFTERMATH ---------- */
 after: { ch: "Chapter 4 · After the Storm", bg: "dusk", art: "🌳🚧🌊🏚️",
  text: ["The rain stops around 5:00 PM. The county is a mess. A giant tree blocks the main road, the creek has flooded a field, and the high school gym has opened as an emergency shelter.",
         "Everyone is pitching in. You have one hour of daylight left. Where are you needed most, {name}?"],
  choices: [
   { label: "Help a crew clear the tree with tools and a tractor", icon: "🪓", p: { R: 3 }, out: "Chainsaws roar and you haul branches until your arms burn. When the road opens, the whole crew cheers.", next: "mentor" },
   { label: "Help a scientist test the flooded creek for pollution", icon: "🧪", p: { I: 3 }, out: "You collect water samples in labeled jars. She finds fuel from a flooded shed and warns farmers downstream.", next: "mentor" },
   { label: "Help set up cots and comfort families at the shelter", icon: "🛏️", p: { S: 3 }, out: "A little girl won't stop crying until you make her a blanket fort. She falls asleep holding your sleeve.", next: "mentor" },
   { label: "Help the shelter cook dinner for 150 people", icon: "🥘", p: { A: 2, R: 1 }, out: "With donated groceries and a little creativity, you help turn rice, beans, and chicken into something people line up for twice.", next: "mentor" },
   { label: "Run the shelter check in table and track supplies", icon: "🗂️", p: { C: 3 }, out: "You build a spreadsheet of who's here, what they need, and what's running low. The shelter director calls it a lifesaver.", next: "mentor" } ] },

 /* ---------- CHAPTER 5: MENTOR (dynamic) ---------- */
 mentor: { ch: "Chapter 5 · An Unexpected Conversation", bg: "night", type: "mentor",
  choices: [
   { label: "Ask what a normal day is like", icon: "🗓️", p: { I: 1 }, out: "", next: "offer", show: "day" },
   { label: "Ask how much the job pays and if it's hard to get", icon: "💵", p: { E: 1 }, out: "", next: "offer", show: "pay" },
   { label: "Ask how they got started", icon: "🎓", p: { S: 1 }, out: "", next: "offer", show: "start" } ] },

 /* ---------- CHAPTER 5B: THE OFFER ---------- */
 offer: { ch: "Chapter 5 · The Offer", bg: "night", art: "📝✨🏫",
  text: ["Before you can process all that, the shelter director hands you a flyer. \"Hocking College is running free summer camps for high schoolers this year. You'd be great at any of these. Which one would you sign up for?\""],
  choices: [
   { label: "Wilderness and wildlife camp: tracking, fishing, and field research", icon: "🦌", p: { R: 2, I: 1 }, out: "You picture yourself waist deep in a creek with a net, and you grin.", next: "evening" },
   { label: "Healthcare camp: practice in the nursing simulation lab", icon: "🩺", p: { S: 2, I: 1 }, out: "The flyer says you'll practice on a mannequin that breathes and talks. That's wild.", next: "evening" },
   { label: "Public safety camp: police scenarios and the training range", icon: "🛡️", p: { E: 2, R: 1 }, out: "Running real training scenarios sounds like exactly your speed.", next: "evening" },
   { label: "Culinary camp: cook in a professional kitchen", icon: "👩‍🍳", p: { A: 2, R: 1 }, out: "You're already planning what you'd make on the final day.", next: "evening" },
   { label: "Cyber camp: build networks and stop pretend hackers", icon: "💻", p: { I: 2, C: 1 }, out: "A hacking competition? You're in before you finish reading.", next: "evening" } ] },

 /* ---------- CHAPTER 6: EVENING ---------- */
 evening: { ch: "Chapter 6 · Night at the Shelter", bg: "night", art: "🌙🏫🕯️",
  text: ["The power is still out, but the gym glows with lanterns. Jordan, Aunt Rosa, Mr. Patel, and the deputy are all here. It feels like the whole town is in one room.",
         "The shelter director stands on a chair. \"Tomorrow we start cleanup. I need volunteers to lead four teams.\" She looks right at you."],
  choices: [
   { label: "Lead the outdoor cleanup team", icon: "🌲", p: { R: 2, E: 1 }, out: "You sign up first. Jordan signs up right behind you.", next: "night" },
   { label: "Lead the medical and care team", icon: "🩺", p: { S: 2, E: 1 }, out: "A nurse volunteering at the shelter offers to show you the ropes. You agree immediately.", next: "night" },
   { label: "Lead the food team for tomorrow's meals", icon: "🍳", p: { A: 2, E: 1 }, out: "Aunt Rosa grins. \"I knew it,\" she says. \"You've got the cooking bug.\"", next: "night" },
   { label: "Lead the communications and tech team", icon: "📡", p: { I: 1, C: 1, E: 1 }, out: "Mr. Patel volunteers his laptop and a ham radio from his garage. You're in business.", next: "night" },
   { label: "Help quietly behind the scenes, organizing everything", icon: "📋", p: { C: 2, S: 1 }, out: "The director smiles. \"Every team needs someone who keeps it all together.\"", next: "night" } ] },

 /* ---------- CHAPTER 7: REFLECTION ---------- */
 night: { ch: "Chapter 7 · Under the Stars", bg: "stars", art: "✨🌌🔥",
  text: ["Late that night you step outside. With the power out, you can see more stars than you've ever seen. Jordan sits down next to you.",
         "\"Crazy day,\" Jordan says. \"What part of it felt the most like you?\""],
  choices: [
   { label: "Being outside and using my hands", icon: "🙌", p: { R: 2 }, out: "", next: "end" },
   { label: "Figuring things out and solving the problem", icon: "🧠", p: { I: 2 }, out: "", next: "end" },
   { label: "Making something creative that people loved", icon: "🎨", p: { A: 2 }, out: "", next: "end" },
   { label: "Helping people who needed it", icon: "🤝", p: { S: 2 }, out: "", next: "end" },
   { label: "Taking charge when nobody else would", icon: "⭐", p: { E: 2 }, out: "", next: "end" },
   { label: "Keeping everything organized and running right", icon: "🗂️", p: { C: 2 }, out: "", next: "end" } ] },
};
