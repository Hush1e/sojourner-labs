/* ================================================================
   SUBJECT AREAS ("fields") — the second layer of matching.
   RIASEC says HOW a student likes to work. Fields say WHAT they are
   drawn to (tech, health, animals...). Two students can both be
   "Investigative + Conventional" and one loves computers while the
   other loves medicine; fields tell them apart.
   Every choice adds field points (f). Every program lists its fields.
   To add a program: add its id and fields to PROGRAM_FIELDS below.
   ================================================================ */
window.FIELDS = {
  tech:     { name: "Tech and Computers", icon: "💻" },
  health:   { name: "Health and Medicine", icon: "🩺" },
  outdoors: { name: "Outdoors and Nature", icon: "🌲" },
  animals:  { name: "Animals", icon: "🐾" },
  food:     { name: "Food", icon: "🍳" },
  art:      { name: "Art and Design", icon: "🎨" },
  media:    { name: "Film, Music, and Media", icon: "🎬" },
  helping:  { name: "Helping and Teaching People", icon: "🤝" },
  safety:   { name: "Public Safety", icon: "🚨" },
  build:    { name: "Building, Machines, and Vehicles", icon: "🔧" },
  business: { name: "Business and Leadership", icon: "📈" },
  sports:   { name: "Sports", icon: "🏆" },
};

window.PROGRAM_FIELDS = {
  wildlife: ["outdoors", "animals"], nursing: ["health", "helping"], police: ["safety"], culinary: ["food"],
  cyber: ["tech", "safety"], "dental-hygiene": ["health"], efda: ["health"], "health-informatics": ["health", "tech"],
  "medical-assistant": ["health", "helping"], "social-work": ["helping"], transfer: [], "custom-degree": [],
  canine: ["animals"], "emt-paramedic": ["health", "safety"], "environmental-science": ["outdoors"], farrier: ["animals", "build"],
  "fire-ems": ["safety", "health"], fish: ["outdoors", "animals"], forest: ["outdoors"], nrle: ["outdoors", "safety"],
  parks: ["outdoors", "helping", "animals"], accounting: ["business"], manufacturing: ["build"], welding: ["build", "art"],
  automotive: ["build"], business: ["business"], cdl: ["build"], carpentry: ["build"], baking: ["food", "art"],
  "early-childhood": ["helping"], fashion: ["art", "business"], film: ["media", "art"], "heavy-equipment": ["build", "outdoors"],
  hospitality: ["business", "food"], hvac: ["build"], music: ["media"], sports: ["sports", "business"], water: ["outdoors", "build"],
};

(function () {
  const S = window.SCENES;

  /* Field points for existing choices, matched by the start of the choice label. */
  const TAG = [
    ["Grab my boots", { outdoors: 2 }], ["Head to Aunt Rosa", { food: 2, business: 1 }], ["Knock on Mr. Patel", { tech: 3 }], ["Volunteer at the fair", { safety: 1, health: 1 }],
    ["Study the tracks", { animals: 2 }], ["Take photos and log", { outdoors: 1, media: 1 }], ["Keep Jordan calm", { safety: 1, helping: 1 }], ["Sketch the tracks", { art: 2 }],
    ["Check his ankle", { health: 2 }], ["Take charge and organize", { safety: 1 }], ["Climb higher", { outdoors: 1, tech: 1 }],
    ["At the stove", { food: 2 }], ["Running the front", { business: 2, food: 1 }], ["Organizing orders", { business: 2 }],
    ["Stay calm, help the mom", { health: 2 }], ["Check the recipe", { food: 1, health: 1 }], ["Keep the kitchen running", { food: 2 }],
    ["Stop him. Real companies", { tech: 2, safety: 1 }], ["Investigate what's really", { tech: 2 }], ["Back up his family photos", { tech: 2 }], ["Cheer him up", { food: 1, helping: 1 }],
    ["Help him change his passwords", { tech: 2 }], ["Trace where the fake link", { tech: 2 }], ["Teach him how to spot", { tech: 2, helping: 1 }], ["Design a funny scam", { art: 2, tech: 1 }],
    ["The first aid tent", { health: 2 }], ["The livestock barn", { animals: 2 }], ["The lost child", { safety: 1, helping: 1 }], ["The 4H baking", { food: 2 }],
    ["Ask the deputy", { safety: 2 }], ["Start tying down", { build: 1 }], ["Check that every volunteer", { business: 1 }], ["Make big signs", { art: 2 }],
    ["Read the full alert and check", { outdoors: 1 }], ["Get everyone moving", { safety: 1 }], ["Stay with the hurt hiker", { health: 1 }],
    ["Read the full alert and figure", { tech: 1 }], ["Tell everyone where to go", { safety: 1 }], ["Grab supplies", { safety: 1 }], ["Text family members", { helping: 1 }],
    ["Go with a ranger", { outdoors: 2, safety: 1 }], ["Watch the creek", { outdoors: 2 }], ["Help the rangers coordinate", { safety: 1 }],
    ["Help a police officer", { safety: 2 }], ["Get a backup generator", { build: 2 }], ["Check on elderly", { helping: 2 }], ["Set up a phone charging", { tech: 2, build: 1 }],
    ["Help a crew clear the tree", { build: 1, outdoors: 1 }], ["Help a scientist test", { outdoors: 2 }], ["Help set up cots", { helping: 2 }], ["Help the shelter cook", { food: 2 }], ["Run the shelter check in", { business: 1 }],
    ["Lead the outdoor cleanup", { outdoors: 2 }], ["Lead the medical", { health: 2 }], ["Lead the food team", { food: 2 }], ["Lead the communications and tech", { tech: 3 }], ["Help quietly behind", { business: 1 }],
  ];
  Object.values(S).forEach(sc => (sc.choices || []).forEach(c => { const t = TAG.find(([k]) => c.label.startsWith(k)); if (t && !c.f) c.f = t[1]; }));

  /* Chapter 5: camps now cover every subject area, not just five. */
  S.offer.text = ["Before you can process all that, the shelter director hands you a flyer. \"Hocking College runs free summer camps for high schoolers. Pick ONE. Spots fill up fast.\""];
  S.offer.choices = [
    { label: "Cyber camp: hack a practice network and catch the hackers", icon: "💻", p: { I: 2, C: 1 }, f: { tech: 3 }, out: "A real capture the flag competition with prizes? You're signed up before you finish reading.", next: "evening" },
    { label: "Healthcare camp: the simulation lab with a mannequin that breathes and talks", icon: "🩺", p: { S: 2, I: 1 }, f: { health: 3 }, out: "You picture yourself saving the mannequin's life in front of everyone. Bring it on.", next: "evening" },
    { label: "Wilderness camp: tracking, fishing, and field research", icon: "🦌", p: { R: 2, I: 1 }, f: { outdoors: 2, animals: 1 }, out: "You picture yourself waist deep in a creek with a net, and you grin.", next: "evening" },
    { label: "Canine and animal camp: train dogs and work with horses", icon: "🐕", p: { R: 2, S: 1 }, f: { animals: 3 }, out: "A week of puppies and horses. Honestly the easiest decision of your life.", next: "evening" },
    { label: "First responder camp: fire, EMS, and police scenarios", icon: "🚒", p: { R: 1, E: 2 }, f: { safety: 3 }, out: "Running real training drills in real gear sounds like exactly your speed.", next: "evening" },
    { label: "Culinary camp: cook in a professional kitchen", icon: "👩‍🍳", p: { A: 2, R: 1 }, f: { food: 3 }, out: "You're already planning what you'd make on the final day.", next: "evening" },
    { label: "Build camp: welding, engines, and heavy equipment", icon: "🔧", p: { R: 3 }, f: { build: 3 }, out: "Driving an excavator at sixteen? That's going straight on your story.", next: "evening" },
    { label: "Creative camp: shoot a short film, record a song, or design clothes", icon: "🎬", p: { A: 3 }, f: { media: 2, art: 1 }, out: "You already have three ideas, and one of them is honestly genius.", next: "evening" },
  ];

  /* New scene before the ending: scrolling your phone. Narrows down the subject area. */
  S.night.choices.forEach(c => { if (c.next === "end") c.next = "feed"; });
  S.feed = { ch: "Chapter 8 · 2:14 AM", bg: "stars", art: "📱🔦😴",
    text: ["You can't sleep. You're lying on a cot in the gym, scrolling your phone on 4% battery.",
           "Your feed has been weird all day, like it knows you. Four videos in a row, and you can only watch one before your phone dies. Which one do you stop scrolling for?"],
    choices: [
      { label: "\"How a 19 year old stopped a ransomware attack on a hospital\"", icon: "🛡️", p: { I: 2 }, f: { tech: 3 }, out: "You watch it twice. You didn't know defending networks could be a job, let alone one that companies are desperate to fill.", next: "feed2" },
      { label: "\"ER nurse POV: 12 hours in 60 seconds\"", icon: "🏥", p: { S: 2 }, f: { health: 3 }, out: "The nurse makes it look chaotic and calm at the same time. You want to be that person.", next: "feed2" },
      { label: "\"Wildlife officer finds a bear cub in a backyard\"", icon: "🐻", p: { R: 2 }, f: { animals: 2, outdoors: 1 }, out: "The cub is fine. The officer is so calm. You read every comment.", next: "feed2" },
      { label: "\"I built a custom truck from a junkyard frame\"", icon: "🛻", p: { R: 2 }, f: { build: 3 }, out: "Sparks, grinders, a huge reveal at the end. You want to make something like that.", next: "feed2" },
      { label: "\"Behind the scenes of a music video shoot\"", icon: "🎥", p: { A: 2 }, f: { media: 3 }, out: "The lighting, the camera moves, the sound mix. You notice everything now.", next: "feed2" },
      { label: "\"Dog trainer fixes the worst behaved dog in Ohio\"", icon: "🐶", p: { S: 1, R: 1 }, f: { animals: 3 }, out: "By the end, the dog sits on command and you're cheering at 2 AM.", next: "feed2" },
    ] };
  S.feed2 = { bg: "stars", art: "🔋📱💤",
    text: ["1% battery. One last thing pops up: your school counselor posted a poll in the class group chat.",
           "\"Seniors and juniors: if you could skip one class a week to learn a real job skill instead, which one?\""],
    choices: [
      { label: "Coding and cybersecurity", icon: "⌨️", p: { I: 1, C: 1 }, f: { tech: 3 }, out: "", next: "end" },
      { label: "First aid and medical skills", icon: "🩹", p: { S: 1, I: 1 }, f: { health: 3 }, out: "", next: "end" },
      { label: "Survival and outdoor skills", icon: "🏕️", p: { R: 2 }, f: { outdoors: 3 }, out: "", next: "end" },
      { label: "Fixing cars, building, and welding", icon: "🔩", p: { R: 2 }, f: { build: 3 }, out: "", next: "end" },
      { label: "Cooking and baking", icon: "🧁", p: { A: 1, R: 1 }, f: { food: 3 }, out: "", next: "end" },
      { label: "Starting a business or side hustle", icon: "💸", p: { E: 2 }, f: { business: 3 }, out: "", next: "end" },
      { label: "Working with kids or counseling people", icon: "🧸", p: { S: 2 }, f: { helping: 3 }, out: "", next: "end" },
      { label: "Coaching or running a sports team", icon: "🏀", p: { E: 2 }, f: { sports: 3 }, out: "", next: "end" },
      { label: "Making videos, music, or art", icon: "🎨", p: { A: 2 }, f: { media: 2, art: 1 }, out: "", next: "end" },
    ] };


  /* Extra choices so every subject area shows up early in the story. */
  S.after.choices.push(
    { label: "Film the cleanup and post it for the town's news page", icon: "📹", p: { A: 2, E: 1 }, f: { media: 3 }, out: "Your video gets 4,000 views by dinner. The mayor shares it.", next: "mentor" },
    { label: "Start a fundraiser to help families rebuild", icon: "💵", p: { E: 3 }, f: { business: 3 }, out: "You set a goal of $500. By tonight it's at $1,340.", next: "mentor" },
    { label: "Run a pickup basketball game so the kids at the shelter can burn off energy", icon: "🏀", p: { S: 1, E: 2 }, f: { sports: 3, helping: 1 }, out: "Twelve kids, one ball, zero complaints. A parent asks if you coach.", next: "mentor" });
  S.evening.choices.push(
    { label: "Run the shelter's livestream so families can see updates", icon: "🎙️", p: { A: 2, C: 1 }, f: { media: 3 }, out: "You set up a phone on a tripod and a lantern for lighting. It actually looks good.", next: "night" },
    { label: "Teach the little kids a game so their parents can rest", icon: "🧸", p: { S: 3 }, f: { helping: 3 }, out: "Twenty minutes later you have a fan club of six year olds.", next: "night" });
  S.fair.choices.push({ label: "The fair's main stage, where the sound system just died", icon: "🎤", p: { R: 1, A: 2 }, f: { media: 3 }, out: "You find a loose cable, fix it, and the band thanks you on the mic.", next: "booth" });

  /* Badges unlock as a subject area builds up. */
  window.BADGES = {
    tech: "🛡️ Firewall Defender", health: "🩺 First Responder of the Day", outdoors: "🌲 Trail Boss", animals: "🐾 Animal Whisperer",
    food: "🔥 Kitchen Legend", art: "🎨 Creative Genius", media: "🎬 Director's Cut", helping: "🤝 Community Hero",
    safety: "🚨 Calm in the Chaos", build: "🔧 Master Builder", business: "📈 Future CEO", sports: "🏆 MVP",
  };
})();
