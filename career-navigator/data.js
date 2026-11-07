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

   DATA NOTES: National pay = BLS median annual pay, May 2024.
   Growth = BLS projected change 2024 to 2034. Regional figures come from
   BLS wage estimates for the Southern Ohio nonmetropolitan area (the
   BLS region that includes Hocking County) and note their survey year.
   Review numbers once a year when BLS publishes new data (each spring).
   ================================================================ */

const BLS = "https://www.bls.gov/ooh/";
const near = q => `https://www.indeed.com/jobs?q=${encodeURIComponent(q)}&l=Nelsonville%2C+OH&radius=50`;

window.PROGRAMS = [
 { id: "wildlife", riasec: { R: 3, I: 1 },
   mentor: { name: "Ranger Dana Holt", role: "a wildlife technician with the state", hi: "Dana has mud up to her knees and a radio on her belt. \"Saw you out there today. You've got good instincts for the field.\"", start: "\"I did two years at Hocking in Wildlife Resources Management. We were in the woods almost every day. My first job was a seasonal tech position, and it turned full time.\"" },
   future: "In ten years you are a wildlife officer in Southeast Ohio. You start most mornings at sunrise, you know every creek in your county, and kids at school programs ask to see your trail camera photos.",
   img: "", /* optional: paste a Hocking photo URL for this program */ name: "Wildlife Resources Management", icon: "🦌", color: "#3f8f4f",
   url: "https://www.hocking.edu/wildlife-resources-management",
   tags: ["outdoors", "animals", "nature", "science"],
   pitch: "Spend class time in the field tracking animals, studying habitats, and learning how to keep wildlife healthy.",
   about: "A hands on associate degree built around field skills. Students learn wildlife management, ecology, botany, and plant identification, plus practical skills such as map reading, watercraft operation, and natural resources equipment. Graduates can go straight to work or transfer toward a bachelor's degree in wildlife.",
   length: "Associate of Applied Science, four semesters",
   doing: ["Track and identify Ohio wildlife, fish, and plants", "Survey habitats, streams, and forests", "Operate boats, GPS, and field equipment", "Work outdoors on Hocking's woods and lands"],
   day: [
     { t: "5:30 AM", txt: "Meet your crew at the truck with coffee and waders. Sunrise is the best time to count birds." },
     { t: "7:00 AM", txt: "Walk a survey route and record every deer, turkey, and songbird you see or hear." },
     { t: "10:00 AM", txt: "Check trail cameras and swap memory cards. One caught a bobcat overnight." },
     { t: "1:00 PM", txt: "Electrofish a stream section with a team to count and measure fish, then release them." },
     { t: "3:30 PM", txt: "Enter data, map your sightings, and clean gear for tomorrow." } ],
   certs: ["Field skills: watercraft operation, map and compass, equipment operation", "Transfer pathways toward wildlife biology bachelor's degrees", "Ask the program which current certifications are included"],
   careers: [
     { title: "Wildlife Technician or County Wildlife Officer", what: "Collects field data and works with landowners and wildlife agencies.", pay: 54310, growth: "-3%", src: BLS + "life-physical-and-social-science/conservation-scientists.htm", note: "BLS forest and conservation technicians" },
     { title: "Park Naturalist", what: "Leads programs and cares for natural areas at parks and nature centers.", pay: 67950, growth: "+3%", src: BLS + "life-physical-and-social-science/conservation-scientists.htm", note: "BLS conservation scientists" },
     { title: "Wildlife Biologist (with a bachelor's)", what: "Studies animal populations and plans conservation.", pay: 72860, growth: "+2%", src: BLS + "life-physical-and-social-science/zoologists-and-wildlife-biologists.htm", note: "BLS zoologists and wildlife biologists" } ],
   demand: { level: 2, label: "Competitive", why: "Jobs grow slowly nationally and many people want them, so field experience matters. Hocking's hands on training is a real advantage." },
   region: { stat: "Conservation scientists in Southern Ohio earned a median of $27.30 an hour (about $56,800 a year).", year: "BLS, May 2022" },
   jobs: near("wildlife technician"),
   news: [
     { date: "Apr 2026", title: "Ohio Wildlife Council approved the 2026 to 2027 hunting and trapping seasons for deer, turkey, small game, and furbearers.", src: "Toledo Legal News", url: "https://www.toledolegalnews.com/news/ohio-wildlife-council-approves-2026-27-hunting-seasons/article_ca8f77aa-483a-44a7-91e4-ffe0d50723db.html" },
     { date: "2025", title: "Ohio expanded its reintroduction of endangered lake sturgeon into the Cuyahoga, Sandusky, and Scioto rivers.", src: "Richland Source / ODNR", url: "https://www.richlandsource.com/tag/division-of-wildlife/page/2/" } ] },

 { id: "nursing", riasec: { S: 3, I: 2, C: 1 },
   mentor: { name: "Nurse Marcus Reed", role: "an emergency room nurse", hi: "Marcus is restocking a first aid kit. \"I watched you today. You stayed calm when people were scared. That's half of nursing.\"", start: "\"I started with Hocking's nursing program, passed my NCLEX, and got hired at the hospital where I did clinicals. Now I'm working on my bachelor's online.\"" },
   future: "In ten years you are a registered nurse. Patients remember your name, new nurses ask you for advice, and you are thinking about becoming a nurse practitioner.",
   img: "", /* optional: paste a Hocking photo URL for this program */ name: "Registered Nursing", icon: "🩺", color: "#2f78c4",
   url: "https://www.hocking.edu/registered-nursing",
   tags: ["helping", "health", "people", "science"],
   pitch: "Learn to care for patients in labs and real clinical settings, in one of the most needed careers in Ohio.",
   about: "A five semester associate degree with one pre clinical semester and four semesters of theory and clinical training in hospitals and long term care facilities. Graduates are eligible to take the national licensing exam to become a Registered Nurse. Hocking also offers Practical Nursing and an LPN to RN path.",
   length: "Associate of Applied Science, five semesters",
   doing: ["Practice skills in a simulation lab", "Learn anatomy, medications, and patient care", "Complete clinical rotations with real patients", "Prepare for the NCLEX licensing exam"],
   day: [
     { t: "6:45 AM", txt: "Get report from the night nurse on your four patients." },
     { t: "8:00 AM", txt: "Pass medications and check vital signs. One patient's heart rate is high, so you alert the doctor." },
     { t: "11:00 AM", txt: "Teach a new diabetic patient how to check blood sugar before going home." },
     { t: "2:00 PM", txt: "Admit a patient from the emergency room and build their care plan." },
     { t: "7:00 PM", txt: "Chart everything, hand off to the night shift, and head home knowing you helped." } ],
   certs: ["Eligible to sit for the NCLEX-RN licensing exam", "CPR and Basic Life Support training during clinicals", "Pathways: Practical Nursing diploma and LPN to RN"],
   careers: [
     { title: "Registered Nurse", what: "Cares for patients in hospitals, clinics, schools, and homes.", pay: 93600, growth: "+5%", src: BLS + "healthcare/registered-nurses.htm", note: "BLS registered nurses" },
     { title: "Licensed Practical Nurse", what: "Gives hands on care under an RN or doctor.", pay: 62340, growth: "+3%", src: BLS + "healthcare/licensed-practical-and-licensed-vocational-nurses.htm", note: "BLS LPNs" },
     { title: "ER, School, or Home Health Nurse", what: "Specialty paths you can grow into with experience.", pay: 93600, growth: "+5%", src: BLS + "healthcare/registered-nurses.htm", note: "BLS registered nurses" } ],
   demand: { level: 5, label: "Very high", why: "Registered nurse ranks at or near the top of Ohio's in demand jobs in every region, including Southeast Ohio. Ohio was short more than 2,400 RNs in 2025." },
   region: { stat: "About 4,210 RNs work in Southern Ohio, earning an average of $73,680 a year.", year: "BLS, May 2022" },
   jobs: near("registered nurse"),
   news: [
     { date: "Jun 2026", title: "Ohio was short more than 2,400 registered nurses in 2025, and nursing schools across the state are growing enrollment to keep up.", src: "University of Cincinnati News", url: "https://www.uc.edu/news/articles/2026/06/n21413889.html" },
     { date: "Sep 2026", title: "Kent State's nursing program reached its highest enrollment in a decade amid the national nursing shortage.", src: "News 5 Cleveland", url: "https://www.news5cleveland.com/news/local-news/oh-portage/amid-nationwide-nursing-staffing-shortage-kent-state-nursing-program-hits-highest-enrollment-in-a-decade" } ] },

 { id: "police", riasec: { E: 3, R: 1, S: 2 },
   mentor: { name: "Deputy Alyssa Ortiz", role: "a sheriff's deputy", hi: "The deputy from earlier sits down with two cups of hot chocolate. \"You were good out there today. Ever think about law enforcement?\"", start: "\"I did criminal justice at Hocking and took the Ohio Peace Officer academy my last semester. I graduated with my degree and my certification at the same time.\"" },
   future: "In ten years you are a deputy and a community leader. You coach youth basketball, train new officers, and people in town wave when your cruiser goes by.",
   img: "", /* optional: paste a Hocking photo URL for this program */ name: "Criminal Justice and Ohio Peace Officer Training", icon: "🛡️", color: "#334a7d",
   url: "https://www.hocking.edu/criminal-justice",
   tags: ["protect", "action", "people", "outdoors"],
   pitch: "Train to protect your community through hands on scenarios, investigations, and the Ohio Peace Officer academy.",
   about: "An associate degree in criminal justice, also offered fully online, with the option to complete the Ohio Peace Officer Basic Academy in the last semester. Students can graduate with both the degree and Ohio peace officer certification. Hocking is also the Southeast Ohio regional training site for the Ohio Peace Officer Training Academy.",
   length: "Associate degree, four semesters (academy option in semester four)",
   doing: ["Run realistic training scenarios", "Learn criminal law and investigations", "Train on the firing range and in cruisers", "Earn Ohio peace officer certification"],
   day: [
     { t: "6:00 AM", txt: "Roll call. Your sergeant shares last night's calls and today's priorities." },
     { t: "8:30 AM", txt: "Patrol a school zone and wave to kids walking in." },
     { t: "11:00 AM", txt: "Respond to a car crash, direct traffic, and help the drivers file reports." },
     { t: "2:00 PM", txt: "Follow up on a stolen bike case and find it at a pawn shop." },
     { t: "5:00 PM", txt: "Write reports and coach a new officer on community policing." } ],
   certs: ["Ohio Peace Officer Basic certification (after passing the state exam)", "Firearms, driving, and defensive tactics training in the academy", "Transfer partnership toward a bachelor's in criminal justice"],
   careers: [
     { title: "Police Officer or Sheriff's Deputy", what: "Protects the community and responds to calls.", pay: 77270, growth: "+3%", src: BLS + "protective-service/police-and-detectives.htm", note: "BLS police and detectives" },
     { title: "Wildlife Officer or Game Warden", what: "Enforces laws in parks, lakes, and forests.", pay: 68180, growth: "-6%", src: BLS + "protective-service/police-and-detectives.htm", note: "BLS fish and game wardens" },
     { title: "Corrections Officer", what: "Keeps jails and prisons safe and supports rehabilitation.", pay: 57950, growth: "Decline", src: BLS + "protective-service/correctional-officers.htm", note: "BLS correctional officers and bailiffs" } ],
   demand: { level: 4, label: "High", why: "National growth is steady, but Ohio departments are actively recruiting and many are struggling to fill officer jobs. The state runs an Office of Law Enforcement Recruitment to help." },
   region: { stat: "Police and sheriff's patrol officers in Southern Ohio earned a median of about $54,360 a year.", year: "BLS, May 2022" },
   jobs: near("police officer"),
   news: [
     { date: "2026", title: "Columbus fell short of the mayor's police hiring goal, and the city says it still needs more officers as it grows.", src: "WSYX ABC 6", url: "https://abc6onyourside.com/news/local/columbus-ohio-misses-mayor-andrew-ginther-hope-police-recruiting-efforts-continue-attract-officers" },
     { date: "Mar 2026", title: "The Ohio State Highway Patrol launched a text based recruiter tool for people interested in becoming troopers.", src: "WKTN", url: "https://wktn.com/?p=124097" } ] },

 { id: "culinary", riasec: { A: 3, E: 2, R: 2, S: 1 },
   mentor: { name: "Chef Tony Vega", role: "a chef who owns a restaurant in Athens", hi: "Chef Tony tries the shelter dinner and finds you. \"Who made this? Seriously, this is good.\"", start: "\"Hocking's culinary program. I cooked for real guests at Rhapsody, earned my ServSafe, and worked my way up from line cook to chef to owner.\"" },
   future: "In ten years you run your own kitchen. Your menu changes with the seasons, local farmers know you by name, and there is a line out the door on Friday nights.",
   img: "", /* optional: paste a Hocking photo URL for this program */ name: "Culinary Arts", icon: "🍳", color: "#c4602f",
   url: "https://www.hocking.edu/culinary-arts-degree",
   tags: ["create", "food", "hands", "people"],
   pitch: "Cook in professional kitchens, learn from chefs, and turn creativity into a career.",
   about: "An associate degree taught at Hocking's McClenaghan Center for Hospitality Training. Students cook and serve guests at Rhapsody, the college owned restaurant in Nelsonville's public square, and can join culinary study abroad trips. Related programs include Baking and Hospitality and Events Management.",
   length: "Associate of Applied Business, four semesters",
   doing: ["Cook in professional teaching kitchens", "Serve real guests at Rhapsody restaurant", "Learn knife skills, baking, and world cuisines", "Plan menus and lead a kitchen team"],
   day: [
     { t: "9:00 AM", txt: "Receive the produce delivery and check that everything is fresh." },
     { t: "10:30 AM", txt: "Prep your station: dice onions, make sauces, and portion proteins." },
     { t: "12:00 PM", txt: "Lunch rush. Tickets fly in and you plate 60 dishes in 90 minutes." },
     { t: "3:00 PM", txt: "Test a new seasonal dessert with the chef for next week's menu." },
     { t: "5:00 PM", txt: "Dinner service, then clean down the kitchen and celebrate a great night." } ],
   certs: ["ServSafe Food Protection Manager", "Hospitality Supervision", "Certified Culinarian (American Culinary Federation)"],
   careers: [
     { title: "Chef or Head Cook", what: "Leads the kitchen, creates menus, and trains the team.", pay: 60990, growth: "+7%", src: BLS + "food-preparation-and-serving/chefs-and-head-cooks.htm", note: "BLS chefs and head cooks" },
     { title: "Food Service Manager", what: "Runs restaurants, cafeterias, and catering businesses.", pay: 65310, growth: "Steady", src: BLS + "management/food-service-managers.htm", note: "BLS OEWS food service managers" },
     { title: "Restaurant Cook", what: "Prepares dishes during busy service. A common first job.", pay: 36830, growth: "+15%", src: BLS + "food-preparation-and-serving/cooks.htm", note: "BLS OEWS restaurant cooks" },
     { title: "Baker or Pastry Cook", what: "Creates breads, desserts, and baked goods.", pay: 36650, growth: "+6%", src: BLS + "production/bakers.htm", note: "BLS bakers" } ],
   demand: { level: 4, label: "High", why: "Chef jobs are growing much faster than average, and restaurants expect to add more than 100,000 jobs in 2026. Pay rises quickly as you move into leadership." },
   region: { stat: "Chefs and head cooks in Southern Ohio earned a median of about $50,740 a year.", year: "BLS, May 2024" },
   jobs: near("cook chef"),
   news: [
     { date: "Feb 2026", title: "The National Restaurant Association projects $1.55 trillion in sales and 15.8 million restaurant jobs in 2026, though open positions remain hard to fill.", src: "National Restaurant Association", url: "https://restaurant.org/research-and-media/research/research-reports/state-of-the-industry/" },
     { date: "May 2026", title: "The restaurant industry is investing in manager development and new credentials to grow its leadership pipeline.", src: "National Restaurant Association", url: "https://restaurant.org/research-and-media/media/press-releases/national-restaurant-association-celebrates-250-years-shaping-americas-workforce-leaders/" } ] },

 { id: "cyber", riasec: { I: 3, C: 2, R: 1 },
   mentor: { name: "Priya Shah", role: "a cybersecurity analyst for a hospital system", hi: "Priya is fixing the shelter Wi Fi on her laptop. \"Mr. Patel told me what you did for him. You stopped a real scam today.\"", start: "\"I did the Cybersecurity and Network Systems program at Hocking and earned my CompTIA certifications. My first job was help desk. Two years later I was on the security team.\"" },
   future: "In ten years you are a cybersecurity analyst. You protect thousands of people's data, you hunt hackers for a living, and you can work from almost anywhere.",
   img: "", /* optional: paste a Hocking photo URL for this program */ name: "Cybersecurity and Network Systems", icon: "💻", color: "#5b3fa8",
   url: "https://www.hocking.edu/cyber-security-and-network-systems",
   tags: ["tech", "puzzles", "protect", "building"],
   pitch: "Build networks, defend computers from hackers, and solve digital puzzles in hands on labs.",
   about: "An associate degree that combines a strong networking foundation with security, Linux, Windows, cloud, and Python skills. Students learn through hands on labs and real projects with industry partners such as Cisco Networking Academy and AWS Academy. Graduates can transfer to bachelor's programs, including fully online options.",
   length: "Associate of Applied Science, four semesters",
   doing: ["Build and configure real networks", "Defend systems in hands on security labs", "Learn Linux, Windows, cloud, and Python", "Prepare for industry certifications"],
   day: [
     { t: "8:00 AM", txt: "Check the security dashboard. Overnight, someone tried 4,000 passwords on one account." },
     { t: "9:30 AM", txt: "Block the attacker's address and reset the account with the user." },
     { t: "11:00 AM", txt: "Install a new network switch for the accounting office." },
     { t: "1:30 PM", txt: "Run a phishing test for staff and train the people who clicked." },
     { t: "4:00 PM", txt: "Write a short report for your manager and plan tomorrow's server updates." } ],
   certs: ["CompTIA A+", "CompTIA Network+", "CompTIA Security+", "CompTIA CySA+", "Python Institute PCEP"],
   careers: [
     { title: "Cybersecurity Analyst", what: "Watches for attacks and protects company data.", pay: 124910, growth: "+29%", src: BLS + "computer-and-information-technology/information-security-analysts.htm", note: "BLS information security analysts" },
     { title: "Network or Systems Administrator", what: "Keeps networks, servers, and cloud systems running.", pay: 96800, growth: "Steady", src: BLS + "computer-and-information-technology/network-and-computer-systems-administrators.htm", note: "BLS network and computer systems administrators" },
     { title: "Network Support Specialist", what: "Troubleshoots and maintains business networks.", pay: 73340, growth: "-3%", src: BLS + "computer-and-information-technology/computer-support-specialists.htm", note: "BLS computer support specialists" },
     { title: "Help Desk Technician", what: "Solves computer problems for people at work. A common first job.", pay: 60340, growth: "-3%", src: BLS + "computer-and-information-technology/computer-support-specialists.htm", note: "BLS computer support specialists" } ],
   demand: { level: 4, label: "High for security skills", why: "Security analyst jobs are projected to grow 29 percent, one of the fastest rates of any job. Basic help desk work is shrinking, so security and networking skills are what employers want." },
   region: { stat: "In Southern Ohio, security analysts earned a median of $55.55 an hour and network support specialists $33.54 an hour.", year: "BLS, May 2023" },
   jobs: near("cybersecurity OR network technician"),
   news: [
     { date: "Apr 2026", title: "A SANS Institute workforce report found the biggest problem is a shortage of specific skills, not just a shortage of people.", src: "CXO Insight ME", url: "https://www.cxoinsightme.com/?p=41588" },
     { date: "2024 to 2034", title: "BLS projects information security analyst jobs will grow 29 percent, much faster than average.", src: "U.S. Bureau of Labor Statistics", url: BLS + "computer-and-information-technology/information-security-analysts.htm" } ] },
];

