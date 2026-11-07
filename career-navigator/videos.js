/* Official career videos from CareerOneStop (U.S. Department of Labor), public domain.
   Key = program id, value = [O*NET code without punctuation, career shown in the video].
   To add one, find the career at careeronestop.org/Videos and copy its videocode. */
window.VIDEOS = {
  wildlife:["33303100","Fish and Game Wardens"], nursing:["29114100","Registered Nurses"], police:["33305100","Police and Sheriff's Patrol Officers"],
  culinary:["35101100","Chefs and Head Cooks"], cyber:["15121200","Information Security Analysts"], "dental-hygiene":["29129200","Dental Hygienists"],
  efda:["31909100","Dental Assistants"], "health-informatics":["29207200","Medical Records Specialists"], "medical-assistant":["31909200","Medical Assistants"],
  "social-work":["21109300","Social and Human Service Assistants"], canine:["39201100","Animal Trainers"], "emt-paramedic":["29204300","Paramedics"],
  "environmental-science":["19404200","Environmental Science Technicians"], "fire-ems":["33201100","Firefighters"], fish:["19407100","Forest and Conservation Technicians"],
  forest:["19407100","Forest and Conservation Technicians"], nrle:["19103100","Conservation Scientists and Park Rangers"], parks:["19103100","Park Naturalists"],
  accounting:["43303100","Bookkeeping, Accounting, and Auditing Clerks"], manufacturing:["49904100","Industrial Machinery Mechanics"], welding:["51412100","Welders"],
  automotive:["49302300","Automotive Service Technicians"], business:["11102100","General and Operations Managers"], cdl:["53303200","Truck Drivers"],
  carpentry:["47203100","Carpenters"], baking:["51301100","Bakers"], "early-childhood":["25201100","Preschool Teachers"], fashion:["27102200","Fashion Designers"],
  film:["27403100","Camera Operators"], "heavy-equipment":["47207300","Operating Engineers and Equipment Operators"], hospitality:["11908100","Lodging Managers"],
  hvac:["49902100","HVAC Mechanics and Installers"], music:["27401400","Sound Engineering Technicians"], sports:["27202200","Coaches and Scouts"],
  water:["51803100","Water and Wastewater Treatment Operators"]
};
window.videoUrl = c => "https://www.careeronestop.org/Videos/CareerOneStop-Videos.aspx?videocode=" + c;
