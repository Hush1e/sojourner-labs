/* ================================================================
   HOCKING COLLEGE CAREER NAVIGATOR: CONTENT FILE
   Everything students see comes from this file.

   TO ADD A PROGRAM:
     1. Copy one entry in PROGRAMS and change the details.
        Give it a unique id and a list of interest tags.
     2. Make sure at least one choice in SCENES gives one of those tags
        (or add a new choice or scene that does).
   Tags in use: outdoors, animals, nature, science, protect, action,
   helping, health, people, create, food, hands, tech, puzzles, building
   ================================================================ */

window.PROGRAMS = [
 { id: "wildlife", name: "Wildlife Resources Management", icon: "🦌", color: "#3f8f4f",
   tags: ["outdoors", "animals", "nature", "science"],
   pitch: "Spend your class time in the field, tracking animals, studying habitats, and learning how to keep wildlife populations healthy.",
   doing: ["Track and identify Ohio wildlife in the field", "Survey habitats, streams, and forests", "Learn to use GPS, mapping tools, and trail cameras", "Work outdoors on Hocking's woods and lands"],
   careers: [
     { title: "Wildlife Technician", what: "Collects field data on animals and habitats for state agencies and research teams." },
     { title: "Park or Refuge Technician", what: "Cares for natural areas, trails, and wildlife at state and national parks." },
     { title: "Fish Hatchery Technician", what: "Raises and releases fish to keep lakes and rivers stocked." },
     { title: "Environmental Field Technician", what: "Tests soil, water, and habitats for consulting and conservation groups." } ] },

 { id: "nursing", name: "Nursing", icon: "🩺", color: "#2f78c4",
   tags: ["helping", "health", "people", "science"],
   pitch: "Learn to care for patients in labs and real clinical settings, and prepare for one of the most in demand careers in Ohio.",
   doing: ["Practice skills in a simulation lab", "Learn anatomy, medications, and patient care", "Complete clinical rotations with real patients", "Prepare for the nursing licensure exam"],
   careers: [
     { title: "Registered Nurse (RN)", what: "Cares for patients in hospitals, clinics, schools, and homes." },
     { title: "Licensed Practical Nurse (LPN)", what: "Provides hands on patient care under the direction of an RN or doctor." },
     { title: "Emergency Room Nurse", what: "Treats patients in fast paced emergencies, with more training." },
     { title: "School Nurse", what: "Keeps students healthy and handles medical needs at school." } ] },

 { id: "police", name: "Criminal Justice and Ohio Peace Officer Training", icon: "🛡️", color: "#334a7d",
   tags: ["protect", "action", "people", "outdoors"],
   pitch: "Train to protect your community through hands on scenarios, investigations, and Ohio peace officer academy training.",
   doing: ["Run realistic training scenarios", "Learn criminal law and investigations", "Practice defensive tactics and communication", "Train toward Ohio peace officer certification"],
   careers: [
     { title: "Police Officer", what: "Protects the community, responds to calls, and helps people in need." },
     { title: "Sheriff's Deputy", what: "Serves a county through patrol, courts, and jail operations." },
     { title: "Natural Resources Officer", what: "Enforces laws in parks, lakes, and forests, often outdoors." },
     { title: "Corrections Officer", what: "Keeps jails and prisons safe and supports rehabilitation." } ] },

 { id: "culinary", name: "Culinary Arts", icon: "🍳", color: "#c4602f",
   tags: ["create", "food", "hands", "people"],
   pitch: "Cook in professional kitchens, learn techniques from chefs, and turn creativity into a career.",
   doing: ["Cook in professional teaching kitchens", "Learn knife skills, baking, and world cuisines", "Plan menus and run real food service", "Learn food safety and kitchen leadership"],
   careers: [
     { title: "Line Cook", what: "Prepares dishes during busy service in restaurants and hotels." },
     { title: "Sous Chef or Chef", what: "Leads the kitchen, creates menus, and trains the team." },
     { title: "Pastry Cook or Baker", what: "Creates breads, desserts, and baked goods." },
     { title: "Catering or Food Service Manager", what: "Runs events, cafeterias, and food businesses." } ] },

 { id: "cyber", name: "Cybersecurity and Network Systems", icon: "💻", color: "#5b3fa8",
   tags: ["tech", "puzzles", "protect", "building"],
   pitch: "Build networks, defend computers from hackers, and solve digital puzzles in hands on labs.",
   doing: ["Build and configure real networks", "Defend systems in hands on security labs", "Learn Linux, Windows, and the cloud", "Prepare for industry certifications"],
   careers: [
     { title: "Help Desk Technician", what: "Solves computer problems and supports people at work." },
     { title: "Network Technician", what: "Sets up and maintains the networks businesses run on." },
     { title: "Cybersecurity Analyst", what: "Watches for attacks and protects company data." },
     { title: "Systems Administrator", what: "Keeps servers, accounts, and cloud systems running." } ] },
];

/* SCENES: each scene has a picture (emoji scene), a story line, and choices.
   Each choice adds interest tags and points to the next scene. next: "end" shows results. */
window.SCENES = {
 start: { bg: "sunrise", art: "🌅🏠🌳", text: "It's Saturday morning and you have the whole day free. Where do you want to be?",
   choices: [
     { label: "Outside, the farther from walls the better", icon: "🌲", tags: ["outdoors"], next: "outside" },
     { label: "Inside, working on something I care about", icon: "🛋️", tags: [], next: "inside" } ] },

 outside: { bg: "forest", art: "🌲🦉🌲🌊🌲", text: "You head down a trail into the woods. Up ahead, the path splits.",
   choices: [
     { label: "Follow fresh deer tracks toward the creek", icon: "🦌", tags: ["animals", "nature"], next: "creek" },
     { label: "Check on a group of hikers who look lost", icon: "🧭", tags: ["protect", "people"], next: "hikers" } ] },

 creek: { bg: "creek", art: "🐟🌊🐸🌿", text: "At the creek, you spot fish, frogs, and something strange: the water looks cloudy.",
   choices: [
     { label: "Count the animals and figure out what lives here", icon: "📋", tags: ["animals", "science"], next: "end" },
     { label: "Find out what's polluting the water and how to fix it", icon: "🔬", tags: ["science", "nature"], next: "end" },
     { label: "Report it to a ranger and make sure nobody dumps here again", icon: "🚨", tags: ["protect", "outdoors"], next: "end" } ] },

 hikers: { bg: "trail", art: "🥾🧭⛰️", text: "One hiker twisted an ankle, and the group is arguing about which way to go.",
   choices: [
     { label: "Wrap the ankle and keep them calm", icon: "🩹", tags: ["helping", "health"], next: "end" },
     { label: "Take charge and lead everyone back safely", icon: "🛡️", tags: ["protect", "action"], next: "end" },
     { label: "Pull up a map app and find the fastest route", icon: "📱", tags: ["tech", "puzzles"], next: "end" } ] },

 inside: { bg: "home", art: "🏠🎮🍪📚", text: "You're staying in. What's pulling you in today?",
   choices: [
     { label: "The kitchen. I want to make something", icon: "🍳", tags: ["create", "food"], next: "kitchen" },
     { label: "My computer or a game I'm trying to beat", icon: "🎮", tags: ["tech", "puzzles"], next: "computer" },
     { label: "Hanging out and helping my family and friends", icon: "🤝", tags: ["people", "helping"], next: "people" } ] },

 kitchen: { bg: "kitchen", art: "🍳🥕🧁🔥", text: "Your family is coming over in two hours and the fridge is half empty.",
   choices: [
     { label: "Invent a new recipe from what's there", icon: "✨", tags: ["create", "food"], next: "end" },
     { label: "Organize everyone into a cooking team", icon: "👨‍🍳", tags: ["people", "hands"], next: "end" },
     { label: "Make sure it's safe for Grandma's diet", icon: "❤️", tags: ["health", "helping"], next: "end" } ] },

 computer: { bg: "tech", art: "💻🔐🧩⚡", text: "Your computer suddenly shows a pop up: \"Your files are locked!\"",
   choices: [
     { label: "Figure out how the attack works and stop it", icon: "🔐", tags: ["tech", "protect"], next: "end" },
     { label: "Rebuild the computer and set up the Wi Fi better", icon: "🔧", tags: ["building", "tech"], next: "end" },
     { label: "Track down who did it", icon: "🕵️", tags: ["puzzles", "protect"], next: "end" } ] },

 people: { bg: "home", art: "👨‍👩‍👧‍👦🏡💬", text: "Your little cousin falls off a bike in the driveway and everyone looks at you.",
   choices: [
     { label: "Check the scrape and clean it up", icon: "🩹", tags: ["health", "helping"], next: "end" },
     { label: "Stay calm, take charge, and keep everyone safe", icon: "🛡️", tags: ["protect", "action"], next: "end" },
     { label: "Cheer them up with their favorite snack", icon: "🍪", tags: ["food", "create"], next: "end" } ] },
};
