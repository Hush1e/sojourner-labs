// Sojourner Labs mission engine. Each mission page defines window.MISSION, then loads this file.
(function(){
const M = window.MISSION, C = window.SJL || {};
const W = (window.WORKPLACES || {})[M.code];
const $ = s => document.querySelector(s);
const org = new URLSearchParams(location.search).get('org') || '';
let i = -1, score = 0, misses = 0, t0 = 0, timer, who = '', co = '', pending = false, roomSolved = false, started = false;

async function sha(s){ s = String(s).trim().toLowerCase(); if (s.includes('@')) s = s.slice(s.indexOf('@')+1);
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join(''); }
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const trail=[];
function illustration(){
 const paths={inbox:'M90 95h220v140H90z M90 95l110 85 110-85 M90 235l75-78 M310 235l-75-78',call:'M165 85v140 M180 65v180 M195 105v100 M210 45v220 M225 85v140 M240 115v80',ai:'M200 65l100 60v100l-100 50-100-50V125z M200 65v210 M100 125l200 100 M300 125L100 225',access:'M130 145h140v130H130z M155 145v-35a45 45 0 0 1 90 0v35 M200 185v45',incident:'M80 95h90v60H80z M230 95h90v60h-90z M155 235h90v50h-90z M125 155v40h150v-40 M200 195v40'};
 return `<svg class="workplace-art" viewBox="0 0 400 320" aria-hidden="true"><defs><pattern id="grid-art" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="currentColor" opacity=".12"/></pattern></defs><rect width="400" height="320" fill="url(#grid-art)"/><circle cx="200" cy="160" r="132" fill="none" stroke="currentColor" opacity=".2"/><path d="${paths[W?.theme]||paths.inbox}" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><circle cx="325" cy="60" r="8" fill="currentColor"/><text x="24" y="305" fill="currentColor" font-family="monospace" font-size="11">SJL / SIMULATED WORKSPACE / ${esc(M.code)}</text></svg>`;
}
function caseFile(k){const a=W.steps[k];return `<aside class="case-file"><div class="case-top"><span class="signal-dot"></span> CASE FILE ${String(k+1).padStart(2,'0')}<span>${esc(a.clock)}</span></div><div class="colleague"><span class="avatar" aria-hidden="true">${esc(a.person.split(' ').map(s=>s[0]).slice(0,2).join(''))}</span><div><b>${esc(a.person)}</b><small>${esc(W.company)}</small></div></div><p class="dispatch">${esc(a.brief)}</p><div class="evidence"><span class="eyebrow">${esc(a.kind)}</span><h3>${esc(a.title)}</h3><p class="evidence-meta">${esc(a.meta)}</p><p>${esc(a.note)}</p><span class="evidence-stamp">FICTIONAL TRAINING ARTIFACT</span></div><p class="case-foot">Inspect the context → choose an action → review the consequence.</p></aside>`;}
document.body.dataset.workplace=W?.theme||'inbox';

document.title = M.title + ' | Sojourner Labs Mission';
$('#app').innerHTML = `
 ${W?`<div class="workspace-banner"><span>EXPERIENCE LAB / ${esc(W.company)}</span><a href="https://hush1e.github.io/projects.html#workplace-missions">Portfolio ↗</a></div>`:''}
 <p class="eyebrow">${esc(M.topic)} · about ${M.minutes} minutes · ${M.rooms.length} rooms</p>
 <h1>${esc(M.title)}</h1>
 <div class="hud"><span>Room <b id="rn">0</b>/${M.rooms.length}</span><span>Score <b id="sc">0</b></span><span>Time <b id="tm">0:00</b></span></div>
 <div class="progress">${M.rooms.map((_,k)=>`<div id="pg${k}"></div>`).join('')}</div>
 <div id="stage"></div>`;

function intro(){
  $('#stage').innerHTML = `${W?`<div class="briefing-hero"><div><p class="eyebrow">YOUR ROLE / ${esc(W.role)}</p><h2>${esc(W.tagline)}</h2><p>${esc(W.shift)}</p><span class="briefing-chip">Investigate · Decide · Reflect</span></div>${illustration()}</div>`:''}<div class="briefing-layout"><div class="card story"><h2>Your shift starts here.</h2>${M.story.map(p=>`<p>${esc(p)}</p>`).join('')}
   <p><label for="who">Display name for your completion certificate (optional)</label><input id="who" class="field" maxlength="80" autocomplete="off" placeholder="Explorer — a nickname is fine"></p>
   <p><label for="co">Organization (optional)</label><input id="co" class="field" maxlength="120" autocomplete="off" value="${esc(org)}"></p><p class="sub">Fictional scenario. No account or countdown. Your entries stay in this page unless you choose to send a record. A certificate records completion of this activity, not a professional credential.</p>
   <button class="btn" id="go">Start the mission</button><div class="msg no" id="m" role="status"></div></div>${W?`<aside class="mission-route"><p class="eyebrow">THE DECISIONS AHEAD</p><ol>${W.steps.map((a,k)=>`<li><span>${String(k+1).padStart(2,'0')}</span><div><b>${esc(a.task)}</b><small>${esc(a.person)}</small></div></li>`).join('')}</ol><p>All people, organizations, and artifacts in these scenarios are fictional. No real accounts or systems are accessed.</p></aside>`:''}</div>`;
  $('#go').onclick = () => { if(started) return; started=true; $('#go').disabled=true;
    who = $('#who').value.trim() || 'Explorer'; co = $('#co').value.trim(); t0 = Date.now(); timer = setInterval(tick, 1000); next(); };
}
function tick(){ const s = Math.floor((Date.now()-t0)/1000); $('#tm').textContent = Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }

function next(){
  i++; if (i >= M.rooms.length) return finish();
  const R = M.rooms[i]; misses = 0; pending = false; roomSolved = false; $('#rn').textContent = i+1;
  let body = R.type === 'hotspot' ? `<div class="scene">${R.scene}</div>`
    : `<div class="grid">${R.options.map(o=>`<button type="button" class="card choice" data-v="${esc(o.v)}"><b>${esc(o.label)}</b><span>${esc(o.body)}</span></button>`).join('')}</div>`;
  $('#stage').innerHTML = `${W?`<ol class="shift-track" aria-label="Mission progress">${W.steps.map((a,k)=>`<li ${k===i?'aria-current="step"':''} class="${k<i?'complete':''}"><span>${k<i?'✓':String(k+1).padStart(2,'0')}</span>${esc(a.task)}</li>`).join('')}</ol>`:''}<div class="workbench">${W?caseFile(i):''}<div class="room on decision-panel"><p class="eyebrow">DECISION ${i+1} / ${M.rooms.length}</p><h2 tabindex="-1">Room ${i+1}: ${esc(R.title)}</h2>
    ${R.context ? `<p class="sub">${esc(R.context)}</p>` : ''}<p class="task">${esc(R.prompt)}</p>${body}
    <div class="support-row"><button type="button" class="btn ghost" id="hint">Consult a hint</button><span>No countdown. Take time to inspect the evidence.</span></div><div class="msg" id="m" role="status" aria-live="polite"></div><div id="why"></div></div></div>`;
  let hintIndex=0;$('#hint').onclick=()=>{ $('#m').className='msg hint';$('#m').textContent=R.hints[Math.min(hintIndex++,R.hints.length-1)]; };
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
    trail.push({title:R.title,choice:el.textContent.trim(),lesson:R.lesson,outcome:W?.steps[i].outcome||'Decision completed.'});
    $('#hint').disabled=true;
    $('#why').innerHTML = `<div class="card lesson"><p class="eyebrow">SIMULATED CONSEQUENCE</p><h3>${esc(W?.steps[i].outcome||'Decision completed.')}</h3><p>${esc(R.lesson)}</p><button class="btn" id="nx">${i+1<M.rooms.length?'Next room':'Finish mission'}</button></div>`;
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
     <p>This certificate records completion of a fictional practice activity. It is not a professional certification or proof of job readiness.</p><p id="sent" class="sub"></p><p><button class="btn" onclick="print()">Print or save certificate</button> <a class="btn ghost" href="../missions.html${org?"?org="+encodeURIComponent(org):""}">More missions</a> <button class="btn ghost" id="replay">Play again</button> <a href="https://hush1e.github.io/projects.html">Portfolio</a></p></div><section class="debrief noprint"><p class="eyebrow">YOUR SHIFT / DECISION RECORD</p><h2>Bring the reasoning back to work.</h2><p>Review the evidence and decisions you practiced. What would your organization’s approved procedure require at each step?</p>${trail.map((a,k)=>`<details><summary><span>${String(k+1).padStart(2,'0')}</span> ${esc(a.title)} — ${esc(a.outcome)}</summary><p><b>Your selected action:</b> ${esc(a.choice)}</p><p>${esc(a.lesson)}</p></details>`).join('')}<div class="reflection"><h3>Prepare a handoff</h3><p>Describe what you observed, the action you took, what remains uncertain, and who should own the next step. Use this record to support a discussion with an instructor or team lead.</p></div></section>`;
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
