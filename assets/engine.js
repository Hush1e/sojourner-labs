// Sojourner Labs mission engine. Each mission page defines window.MISSION, then loads this file.
(function(){
const M = window.MISSION, C = window.SJL || {};
const $ = s => document.querySelector(s);
const org = new URLSearchParams(location.search).get('org') || '';
let i = -1, score = 0, misses = 0, t0 = 0, timer, who = '', co = '', pending = false, roomSolved = false, started = false;

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
  $('#stage').innerHTML = `<div class="card story"><h2>Briefing</h2>${M.story.map(p=>`<p>${esc(p)}</p>`).join('')}
   <p><label for="who">Display name for your completion certificate (optional)</label><input id="who" class="field" maxlength="80" autocomplete="off" placeholder="Explorer — a nickname is fine"></p>
   <p><label for="co">Organization (optional)</label><input id="co" class="field" maxlength="120" autocomplete="off" value="${esc(org)}"></p><p class="sub">Fictional scenario. No account or countdown. Your entries stay in this page unless you choose to send a record. A certificate records completion of this activity, not a professional credential.</p>
   <button class="btn" id="go">Start the mission</button><div class="msg no" id="m" role="status"></div></div>`;
  $('#go').onclick = () => { if(started) return; started=true; $('#go').disabled=true;
    who = $('#who').value.trim() || 'Explorer'; co = $('#co').value.trim(); t0 = Date.now(); timer = setInterval(tick, 1000); next(); };
}
function tick(){ const s = Math.floor((Date.now()-t0)/1000); $('#tm').textContent = Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }

function next(){
  i++; if (i >= M.rooms.length) return finish();
  const R = M.rooms[i]; misses = 0; pending = false; roomSolved = false; $('#rn').textContent = i+1;
  let body = R.type === 'hotspot' ? `<div class="scene">${R.scene}</div>`
    : `<div class="grid">${R.options.map(o=>`<button type="button" class="card choice" data-v="${esc(o.v)}"><b>${esc(o.label)}</b><span>${esc(o.body)}</span></button>`).join('')}</div>`;
  $('#stage').innerHTML = `<div class="room on"><h2 tabindex="-1">Room ${i+1}: ${esc(R.title)}</h2>
    ${R.context ? `<p class="sub">${esc(R.context)}</p>` : ''}<p class="task">${esc(R.prompt)}</p>${body}
    <div class="msg" id="m" role="status" aria-live="polite"></div><div id="why"></div></div>`;
  $('#stage').querySelectorAll('.hot').forEach(el=>{const button=document.createElement('button');button.type='button';button.className=el.className;button.dataset.v=el.dataset.v;button.textContent=el.textContent;el.replaceWith(button);});
  $('#stage').querySelectorAll('.hot,.choice').forEach(el => el.onclick = () => pick(el));
  $('#stage h2').focus({preventScroll:true}); window.scrollTo(0,0);
}
async function pick(el){
  const R = M.rooms[i], m = $('#m');
  if (pending || roomSolved || el.classList.contains('locked')) return; pending = true;
  $('#stage').querySelectorAll('.picked').forEach(e=>e.classList.remove('picked')); el.classList.add('picked');
  let correct; try { correct = await sha(el.dataset.v) === R.hash; } catch { pending=false; m.textContent='This browser could not check the answer. Use a current browser on the HTTPS game address.'; return; }
  if (correct){ roomSolved = true;
    const pts = Math.max(40, 100 - misses*20); score += pts; $('#sc').textContent = score;
    $('#pg'+i).classList.add('done');
    $('#stage').querySelectorAll('.hot,.choice').forEach(e=>{e.classList.add('locked');e.disabled=true;});
    m.className='msg ok'; m.textContent = 'Unlocked. +' + pts + ' points.';
    $('#why').innerHTML = `<div class="card lesson"><h3>Why it matters</h3><p>${esc(R.lesson)}</p><button class="btn" id="nx">${i+1<M.rooms.length?'Next room':'Finish mission'}</button></div>`;
    $('#nx').onclick = () => { if(!roomSolved) return; roomSolved=false; next(); };
  } else { pending=false; misses++; m.className='msg no'; m.textContent = R.hints[Math.min(misses-1, R.hints.length-1)]; }
}

function check36(s){ let n=0; for (const ch of s) n = (n*31 + ch.charCodeAt(0)) % 36; return n.toString(36).toUpperCase(); }
function finish(){
  clearInterval(timer);
  const d = new Date(), ymd = d.toISOString().slice(0,10).replace(/-/g,'');
  const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
  const base = `SJL-${ymd}-${M.code}-${rnd}`, code = base + check36(base);
  const name = who, max = M.rooms.length*100;
  const rec = {name, company: co, mission: M.title, score: score+'/'+max, time: $('#tm').textContent, code, date: d.toISOString()};
  $('#app').innerHTML = `<div class="card noprint"><h1 tabindex="-1">Mission complete</h1><p>Score ${score} of ${max} in ${rec.time}.</p>
     <p>This certificate records completion of a fictional practice activity. It is not a professional certification or proof of job readiness.</p><p id="sent" class="sub"></p><p><button class="btn" onclick="print()">Print or save certificate</button> <a class="btn ghost" href="../missions.html${org?"?org="+encodeURIComponent(org):""}">More missions</a> <button class="btn ghost" id="replay">Play again</button> <a href="https://hush1e.github.io/projects.html">Portfolio</a></p></div>`;
  $('#cert').innerHTML = `<p>SOJOURNER LABS</p><h2>Certificate of Completion</h2><p>This certifies that</p><h2>${esc(name)}</h2>
     ${co?`<p>of ${esc(co)}</p>`:''}<p>completed <b>${esc(M.title)}</b>, a mission in ${esc(M.topic.toLowerCase())}.</p>
     <p>${d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})} · Score ${score}/${max}</p>
     <p class="code">Certificate code ${code}<br>Verify at hush1e.github.io/sojourner-labs/verify.html</p>`;
  $('#cert').style.display = 'block';
  $('#replay').onclick=()=>location.reload();
  $('#app h1').focus({preventScroll:true}); window.scrollTo(0,0);
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
