/* ================================================================
   STATE OF OHIO: Top Jobs status and statewide opportunities.
   CRITICAL: programs whose main careers fall in clusters the state has
   named as Ohio "Critical Jobs" (first responders, nurses, early
   childhood, construction, mental and behavioral health).
   Every program links to TopJobs.Ohio.gov to check In-Demand status.
   OPPS: statewide scholarships, grants, internships, apprenticeships.
   Amounts and rules change each year; students should confirm with
   Hocking's financial aid office. Checked November 2026.
   ================================================================ */
window.OHIO = (function () {
  const TOP = "https://topjobs.ohio.gov/wps/portal/gov/indemand/top-jobs-list/ohios-top-jobs-list";
  const CRIT = {
    nursing: "Nurses", 
    police: "First responders", "fire-ems": "First responders", "emt-paramedic": "First responders",
    "early-childhood": "Early childhood education", "social-work": "Mental and behavioral health",
    carpentry: "Construction", "heavy-equipment": "Construction", hvac: "Construction",
  };
  const O = (icon, title, what, url, kind) => ({ icon, title, what, url, kind });
  const CCP = O("🎒", "College Credit Plus", "Take Hocking College classes while you're still in high school (grades 7 to 12) and earn college credit, usually at no cost to you.", "https://highered.ohio.gov/initiatives/access-success/ccp", "For high schoolers");
  const OWRG = O("💵", "Ohio Work Ready Grant", "Up to $3,000 a year for students with financial need in community college programs that lead to Ohio In-Demand or Critical jobs. File the FAFSA, then ask Hocking financial aid if your program qualifies.", "https://highered.ohio.gov/educators/financial-aid/sgs/owrg/work-ready", "Grant");
  const PREAPP = O("🛠️", "ApprenticeOhio pre-apprenticeship", "Apprenticeship programs for ages 16 to 20 let high school students work part time, get real experience, and count it toward graduation.", "https://apprentice.ohio.gov/pre-apprenticeship/", "Apprenticeship");
  const APP = O("🏗️", "ApprenticeOhio registered apprenticeship", "Earn a paycheck while you train, with classroom learning, a mentor, and a nationally recognized credential.", "https://apprentice.ohio.gov", "Apprenticeship");
  const COF = O("🎓", "Choose Ohio First Scholarship", "State scholarship for STEM and health care students at participating colleges. Ask Hocking financial aid whether your program is included.", "https://highered.ohio.gov/cof", "Scholarship");
  const HSTI = O("💻", "High School Tech Internship", "Paid tech internships for Ohio high school students. The state pays back employers for part of your wages, so more businesses hire teens for IT and cyber roles.", "https://workforce.ohio.gov/initiatives/initiatives/hstechinternshipprogram", "Paid internship");
  const OCRI = O("🚩", "Ohio Cyber Range Institute", "A statewide cyber training range that runs a yearly statewide Capture the Flag, summer camps, and after school cyber clubs for K to 12 students.", "https://www.uc.edu/news/articles/2026/02/n21390938.html", "Competition");
  const RES = O("🛡️", "Ohio Cyber Reserve", "A civilian volunteer cyber force under the Ohio National Guard that helps local governments defend against attacks and supports student workforce development.", "https://www.uc.edu/news/articles/2022/07/n21101830.html", "Career pathway");
  const NEALP = O("🩺", "Nurse Education Assistance Loan Program", "Up to $3,000 for RN students. Work as a nurse in Ohio after graduation and the loan can be forgiven, 20 percent per year up to 100 percent.", "https://highered.ohio.gov/nealp", "Forgivable loan");
  const TEACH = O("🧸", "TEACH Early Childhood Ohio", "Scholarships covering tuition and books for people working in child care who are earning an early childhood associate degree.", "https://occrra.org/workforce-development/", "Scholarship");
  const STC = O("📜", "Short Term Certificate Grant", "Helps pay for short certificates that lead to in-demand jobs, for students with financial need.", "https://highered.ohio.gov", "Grant");
  const TRUCK = O("🚛", "Commercial Truck Driver Student Aid Program", "A state program that has helped students pay for CDL training at approved schools.", "https://highered.ohio.gov", "Grant");
  const EXTRA = {
    cyber: [HSTI, OCRI, RES, COF], "health-informatics": [COF, HSTI], manufacturing: [COF, APP], "environmental-science": [COF],
    nursing: [NEALP, COF], "dental-hygiene": [COF], efda: [COF], "medical-assistant": [COF], "emt-paramedic": [COF],
    "early-childhood": [TEACH], cdl: [TRUCK, STC], welding: [APP, STC], carpentry: [APP], hvac: [APP], "heavy-equipment": [APP],
    automotive: [APP], farrier: [APP], fish: [COF], wildlife: [COF], forest: [COF],
  };
  return {
    TOP,
    crit: id => CRIT[id] || null,
    opps: id => [...(EXTRA[id] || []), CCP, OWRG, PREAPP].filter((o, i, a) => a.indexOf(o) === i),
  };
})();
