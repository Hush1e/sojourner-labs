// Sojourner Labs mission engine. Each mission page defines window.MISSION, then loads this file.
(function(){
const M = window.MISSION, C = window.SJL || {};
const $ = s => document.querySelector(s);
const org = new URLSearchParams(location.search).get('org') || '';
let i = -1, score = 0, misses = 0, t0 = 0, timer, who = '', co = '';

async function sha(s){ s = String(s).trim().toLowerCase(); if (s.includes('@')) s = s.slice(s.indexOf('@')+1);
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join(''); }
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

document.title = M.title + ' | Sojourner Labs Mission';
$('#app').innerHTML = `
 <p class="eyebrow">${esc(M.topic)} · about ${M.minutes} minutes · ${M.rooms.length} rooms</p>
 <h1>${esc(M.title)}</h1>
 <div class="hud"><span>Room <b id="rn">0</b>/${M.rooms.length}</span><span>Score <b id="sc">0</b></span><span>Time <b id="tm">0:00</b></span></div>
 <div class="progress">${M.rooms.map((_,k)=>`<div id="pg${k}"></div>`).join('')}</div>
 <div id="stage"></div>`;

function intro(){
  $('#stage').innerHTML = `<div class="card story"><h3>Briefing</h3>${M.story.map(p=>`<p>${esc(p)}</p>`).join('')}
   <p><input id="who" class="field" placeholder="Your full name (for your certificate)"></p>
   <p><input id="co" class="field" placeholder="Company name" value="${esc(org)}"></p>
   <button class="btn" id="go">Start the mission</button><div class="msg no" id="m"></div></div>`;
  $('#go').onclick = () => { if(!$('#who').value.trim()){ $('#m').textContent='Please enter your name.'; return; }
    who = $('#who').value.trim(); co = $('#co').value.trim(); t0 = Date.now(); timer = setInterval(tick, 1000); next(); };
}
function tick(){ const s = Math.floor((Date.now()-t0)/1000); $('#tm').textContent = Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }

function next(){
  i++; if (i >= M.rooms.length) return finish();
  const R = M.rooms[i]; misses = 0; $('#rn').textContent = i+1;
  let body = R.type === 'hotspot' ? `<div class="scene">${R.scene}</div>`
    : `<div class="grid">${R.options.map(o=>`<div class="card choice" data-v="${esc(o.v)}"><b>${esc(o.label)}</b><p>${esc(o.body)}</p></div>`).join('')}</div>`;
  $('#stage').innerHTML = `<div class="room on"><h2>Room ${i+1}: ${esc(R.title)}</h2>
    ${R.context ? `<p class="sub">${esc(R.context)}</p>` : ''}<p class="task">${esc(R.prompt)}</p>${body}
    <div class="msg" id="m"></div><div id="why"></div></div>`;
  $('#stage').querySelectorAll('.hot,.choice').forEach(el => el.onclick = () => pick(el));
}
async function pick(el){
  const R = M.rooms[i], m = $('#m');
  if (el.classList.contains('locked')) return;
  $('#stage').querySelectorAll('.picked').forEach(e=>e.classList.remove('picked')); el.classList.add('picked');
  if (await sha(el.dataset.v) === R.hash){
    const pts = Math.max(40, 100 - misses*20); score += pts; $('#sc').textContent = score;
    $('#pg'+i).classList.add('done');
    $('#stage').querySelectorAll('.hot,.choice').forEach(e=>e.classList.add('locked'));
    m.className='msg ok'; m.textContent = 'Unlocked. +' + pts + ' points.';
    $('#why').innerHTML = `<div class="card lesson"><h3>Why it matters</h3><p>${esc(R.lesson)}</p><button class="btn" id="nx">${i+1<M.rooms.length?'Next room':'Finish mission'}</button></div>`;
    $('#nx').onclick = next;
  } else { misses++; m.className='msg no'; m.textContent = R.hints[Math.min(misses-1, R.hints.length-1)]; }
}

function check36(s){ let n=0; for (const ch of s) n = (n*31 + ch.charCodeAt(0)) % 36; return n.toString(36).toUpperCase(); }
function finish(){
  clearInterval(timer);
  const d = new Date(), ymd = d.toISOString().slice(0,10).replace(/-/g,'');
  const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
  const base = `SJL-${ymd}-${M.code}-${rnd}`, code = base + check36(base);
  const name = who, max = M.rooms.length*100;
  const rec = {name, company: co, mission: M.title, score: score+'/'+max, time: $('#tm').textContent, code, date: d.toISOString()};
  $('#app').innerHTML = `<div class="card noprint"><h2>Mission complete</h2><p>Score ${score} of ${max} in ${rec.time}.</p>
     <p id="sent" class="sub"></p><p><button class="btn" onclick="print()">Print or save certificate</button> <a class="btn ghost" href="../missions.html">More missions</a></p></div>`;
  $('#cert').innerHTML = `<p>SOJOURNER LABS</p><h2>Certificate of Completion</h2><p>This certifies that</p><h2>${esc(name)}</h2>
     ${co?`<p>of ${esc(co)}</p>`:''}<p>completed <b>${esc(M.title)}</b>, a mission in ${esc(M.topic.toLowerCase())}.</p>
     <p>${d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})} · Score ${score}/${max}</p>
     <p class="code">Certificate code ${code}<br>Verify at hush1e.github.io/sojourner-labs/verify.html</p>`;
  $('#cert').style.display = 'block';
  const sent = $('#sent');
  if (C.formEndpoint){
    fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(rec)})
      .then(r=>{ sent.textContent = r.ok ? 'Your completion was recorded for your employer.' : 'Could not record automatically. Print your certificate for your records.'; })
      .catch(()=>{ sent.textContent = 'Could not record automatically. Print your certificate for your records.'; });
  } else {
    sent.innerHTML = `Send your completion record: <a href="mailto:${C.email}?subject=${encodeURIComponent('Training completed: '+M.title)}&body=${encodeURIComponent(Object.entries(rec).map(([k,v])=>k+': '+v).join('\n'))}">email it</a>.`;
  }
}
intro();
})();
