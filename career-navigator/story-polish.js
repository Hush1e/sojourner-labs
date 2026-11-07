/* ================================================================
   POLISH LAYER: shorter scene text and mini challenges.
   Loads after story.js and story-fields.js.
   Text: one short idea per line. Edit here to change what students read.
   Minis: a quick hands on challenge on each starting path.
     items: [label, isCorrect]. pick: how many to choose (default 1).
   ================================================================ */
(function () {
  const S = window.SCENES;
  const T = {
    start: ["📱 7:02 AM. Saturday. Four texts.", "Jordan: \"Hiking Old Man's Cave?? Leaving in 20.\"\nAunt Rosa: \"Restaurant is SHORT staffed. Help??\"\nMr. Patel: \"My computer is acting very strange.\"\nCounty fair: \"Safety tent needs volunteers!\"", "Pick one, {name}."],
    trail: ["Jordan stops and points at the mud.", "Fresh deer tracks. And next to them, claw prints. Something was following."],
    ridge: ["\"Help!\" An older hiker slipped on wet rock. His ankle is swelling. One bar of signal."],
    restaurant: ["Hot, loud, and the head cook is out sick. Lunch rush in one hour.", "\"Where do you want to be?\" Aunt Rosa asks."],
    rush: ["Noon. Twenty tickets at once.", "A mom waves you over. Her son's lips are swelling. Nuts in the dessert?"],
    patel: ["🚨 \"VIRUS DETECTED. Call Microsoft now!\"", "The screen beeps. Mr. Patel already has his phone out. \"Should I call?\""],
    clue: ["Yesterday's email: \"Your bank account is locked. Click here.\" He clicked. He typed his password."],
    fair: ["Funnel cakes. Tractor pulls. A barn full of goats.", "Your radio crackles: \"Need help in two places!\""],
    booth: ["The deputy nods at you. \"You're good under pressure.\"", "Then the wind shifts. The tent snaps. Everyone looks up."],
    alert_woods: ["📳 EVERY phone screams. SEVERE THUNDERSTORM. FLASH FLOODING. SEEK SHELTER.", "30 seconds. First move?"],
    alert_town: ["📳 EVERY phone shrieks. SEVERE THUNDERSTORM. DAMAGING WINDS. SEEK SHELTER.", "Everyone freezes. 30 seconds. First move?"],
    storm_woods: ["The sky turns green. Thunder you feel in your chest.", "The creek is rising, and a family with little kids is still below."],
    storm_town: ["3:17 PM. Trees snap. The whole town goes dark.", "No traffic lights. No power. Everyone's looking for someone to step up."],
    after: ["5:00 PM. The rain stops. A huge tree blocks the road. The gym is now a shelter.", "One hour of daylight. Where do you go, {name}?"],
    offer: ["The shelter director hands you a flyer.", "\"Free Hocking College summer camps. Pick ONE.\""],
    evening: ["Lanterns in the gym. The whole town is here.", "\"Tomorrow is cleanup. I need team leaders.\" She looks at you."],
    night: ["Outside, no power means a sky full of stars.", "Jordan: \"Crazy day. What part felt most like you?\""],
    feed: ["2:14 AM. Can't sleep. 4% battery.", "Your feed knows you today. One video before it dies. Which one?"],
    feed2: ["1%. Your counselor posts a poll in the class group chat:", "\"Skip one class a week to learn a real job skill. Which one?\""],
  };
  Object.entries(T).forEach(([k, v]) => { if (S[k]) S[k].text = v; });

  /* ---------- MINI CHALLENGES ---------- */
  const mini = (id, after, m) => { S[id] = Object.assign({ mini: true, next: after }, m); };

  mini("g_tracks", "ridge", { bg: "forest", art: "🔍🐾", title: "Track Detective", timer: 20,
    prompt: "Which prints belong to the animal following the deer? Look for four toes and claw marks.",
    items: [["🦌 Split hoof, two points", 0], ["🐕 Four toes with claw marks", 1], ["🦃 Three long toes", 0], ["🐻 Huge wide pad", 0]],
    win: "Coyote! Rangers track them in the Hocking Hills.", lose: "Close! Four toes plus claw marks means a coyote.",
    p: { I: 1, R: 1 }, f: { animals: 1, outdoors: 1 } });
  S.trail.choices.forEach(c => c.next = "g_tracks");

  mini("g_phish", "clue", { bg: "tech", art: "🎣📧", title: "Spot the Scam", timer: 20, pick: 2,
    prompt: "Two things on this screen prove it's a scam. Find both.",
    visual: `<div style="max-width:460px;margin:14px auto 0;background:#fff;color:#111;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);font-family:system-ui;text-align:left">
      <div style="background:#e8e8e8;padding:6px 10px;font-size:13px;display:flex;justify-content:space-between"><span>🔒 micros0ft-help.biz/alert</span><span>🔋 10:42 AM</span></div>
      <div style="background:#c0392b;color:#fff;padding:14px;font-weight:800;font-size:20px">⚠️ VIRUS DETECTED!</div>
      <div style="padding:14px;font-size:16px">Your computer is infected with 5 viruses. Your files will be deleted in <b>4:59</b>.<br><br><b style="font-size:20px">📞 Call Microsoft Support NOW: 1-888-555-0142</b></div></div>`,
    items: [["📞 \"Call this number now!\"", 1], ["🕐 The clock in the corner", 0], ["🔗 Web address: micros0ft-help.biz", 1], ["🔋 Battery icon", 0]],
    win: "Busted. Real companies never pop up asking you to call, and that address uses a zero instead of an O.", lose: "Sneaky, right? The phone number pop up and the fake web address are the giveaways.",
    p: { I: 1, C: 1 }, f: { tech: 2 } });
  S.patel.choices.forEach(c => c.next = "g_phish");

  mini("g_triage", "booth", { bg: "fair", art: "⛑️🚑", title: "Triage Call", timer: 15,
    prompt: "Three people need help at once. Who do you help FIRST?",
    items: [["🤕 Kid with a scraped knee, crying loudly", 0], ["😵 Teen who fainted and isn't answering", 1], ["🐝 Adult with a bee sting, no swelling", 0]],
    win: "Right call. Someone who isn't responding comes first. Loud and crying means they're breathing.", lose: "Tricky! The quiet one who won't answer is the emergency. Crying means breathing.",
    p: { S: 1, I: 1 }, f: { health: 1, safety: 1 } });
  S.fair.choices.forEach(c => c.next = "g_triage");

  mini("g_allergen", "alert_town", { bg: "kitchen", art: "🥜🔎", title: "Allergen Check", timer: 20,
    prompt: "Here's the dessert recipe. Tap the ingredient that could cause the reaction.",
    visual: `<div style="max-width:420px;margin:14px auto 0;background:#fffaf0;color:#3b2a1a;border-radius:10px;padding:16px 20px;box-shadow:0 10px 30px rgba(0,0,0,.5);text-align:left;font-family:Georgia,serif">
      <div style="font-size:22px;font-weight:700;border-bottom:2px dashed #c9a66b;padding-bottom:6px">🍰 Rosa's Brownie Sundae</div>
      <div style="margin-top:8px;line-height:1.7">• chocolate chips<br>• butter<br>• praline crunch topping<br>• fresh strawberries</div></div>`,
    items: [["🍫 Chocolate chips", 0], ["🥛 Butter", 0], ["🌰 Praline crunch topping", 1], ["🍓 Strawberries", 0]],
    win: "Praline is made with nuts. You just helped the paramedics.", lose: "It was the praline. It's made with pecans or almonds. Chefs label it on every menu.",
    p: { I: 1, C: 1 }, f: { food: 1, health: 1 } });
  S.rush.choices.forEach(c => c.next = "g_allergen");
})();
