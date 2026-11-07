/* ================================================================
   EXTRAS: sound effects, mini challenges, share card, class codes.
   Loaded after the main engine in index.html.
   ================================================================ */
/* ---------- SOUND (made in the browser, no audio files) ---------- */
window.SFX = (function () {
  let ctx = null, muted = false;
  try { muted = localStorage.getItem('hcnMute') === '1'; } catch (e) {}
  const ac = () => { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (ctx && ctx.state === 'suspended') ctx.resume(); return ctx; };
  const tone = (f, d, type = 'sine', v = .15, when = 0, slide) => { const c = ac(); if (!c || muted) return; const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + when;
    o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + .02); };
  const noise = (d, v = .3, lp = 400) => { const c = ac(); if (!c || muted) return; const b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), x = b.getChannelData(0);
    for (let i = 0; i < x.length; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / x.length, 2);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'lowpass'; f.frequency.value = lp; g.gain.value = v; s.buffer = b; s.connect(f).connect(g).connect(c.destination); s.start(); };
  const P = {
    click: () => tone(660, .06, 'triangle', .08),
    buzz: () => { tone(180, .12, 'square', .05); tone(180, .12, 'square', .05, .18); },
    badge: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .25, 'triangle', .12, i * .09)),
    win: () => { tone(784, .15, 'triangle', .12); tone(1175, .3, 'triangle', .12, .12); },
    lose: () => tone(330, .35, 'sawtooth', .06, 0, 200),
    alarm: () => [0, .3, .6].forEach(t => tone(880, .22, 'square', .06, t, 660)),
    thunder: () => noise(2.2, .5, 300),
    tick: () => tone(1200, .03, 'square', .03),
    fanfare: () => [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, .35, 'triangle', .13, i * .12)),
  };
  return { play: n => { try { P[n] && P[n](); } catch (e) {} }, get muted() { return muted; },
    toggle() { muted = !muted; try { localStorage.setItem('hcnMute', muted ? '1' : '0'); } catch (e) {} if (!muted) ac(); return muted; } };
})();
(function () {
  const h = document.querySelector('header');
  const b = document.createElement('button'); b.id = 'mute'; b.title = 'Sound on or off';
  b.style.cssText = 'margin-left:auto;margin-right:12px;background:rgba(0,0,0,.35);border:2px solid rgba(255,255,255,.35);color:#fff;border-radius:999px;padding:6px 12px;font-size:18px;cursor:pointer';
  const set = () => b.textContent = SFX.muted ? '🔇' : '🔊'; set(); b.onclick = () => { SFX.toggle(); set(); SFX.play('click'); };
  h.insertBefore(b, document.getElementById('hud'));
  document.addEventListener('click', e => { if (e.target.closest('.choice,.btn,.mitem')) SFX.play('click'); }, true);
})();
const SCENE_SFX = { start: 'buzz', alert_woods: 'alarm', alert_town: 'alarm', storm_woods: 'thunder', storm_town: 'thunder', feed: 'buzz', feed2: 'buzz' };

/* ---------- MINI CHALLENGES ---------- */
let wins = 0, played = 0;
function miniScene(id) {
  const M = SCENES[id], need = M.pick || 1; let picked = [], done = false, left = M.timer || 20;
  scenery(M.bg); window.scrollTo({ top: 0, behavior: 'smooth' });
  app.innerHTML = `<div class="chap">⚡ Quick Challenge · ${M.title}</div><div class="art">${art(M.art)}</div>
   <div class="story"><p>${M.prompt}</p>${need > 1 ? `<p class="small" style="font-weight:700">Pick ${need}.</p>` : ''}</div>${M.visual || ''}
   <div class="tbar"><i id="tb"></i></div><div class="choices" id="ch">${M.items.map((it, i) => `<button class="choice mitem" data-i="${i}"><span class="i">${it[0].split(' ')[0]}</span>${it[0].split(' ').slice(1).join(' ')}</button>`).join('')}</div><div id="oc"></div>`;
  const tb = $('#tb'), total = left;
  const finish = timeout => { if (done) return; done = true; clearInterval(tm); played++;
    const ok = !timeout && picked.length === need && picked.every(i => M.items[i][1]);
    if (ok) wins++; SFX.play(ok ? 'win' : 'lose');
    app.querySelectorAll('.mitem').forEach(b => { const c = M.items[b.dataset.i][1]; b.disabled = true; b.classList.add(c ? 'right' : 'wrong'); });
    Object.entries(M.p || {}).forEach(([k, v]) => score[k] += v);
    let nb = ''; Object.entries(M.f || {}).forEach(([k, v]) => { fscore[k] = (fscore[k] || 0) + v; if (fscore[k] >= 4 && !badges.includes(k)) { badges.push(k); nb = BADGES[k]; } });
    if (ok && !badges.includes('_ace') && wins >= 1) { /* first win */ }
    hud(); steps++;
    $('#oc').innerHTML = `<div class="outcome"><b style="font-size:20px">${ok ? '✅ Nailed it!' : timeout ? '⏰ Time\'s up!' : '❌ Not quite'}</b><p>${ok ? M.win : M.lose}</p>
     <div class="pts">⭐ Challenge ${ok ? 'won' : 'played'}</div>${nb ? `<div class="badge">🏅 Badge unlocked: <b>${nb}</b></div>` : ''}<p style="margin:14px 0 0"><button class="btn" id="nx">Continue ➜</button></p></div>`;
    if (nb) setTimeout(() => SFX.play('badge'), 400);
    $('#oc').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); $('#nx').onclick = () => scene(M.next); };
  const tm = setInterval(() => { left -= .1; tb.style.width = Math.max(0, left / total * 100) + '%'; if (left <= 5 && Math.abs(left - Math.round(left)) < .05) SFX.play('tick'); if (left <= 0) finish(true); }, 100);
  app.querySelectorAll('.mitem').forEach(b => b.onclick = () => { if (done) return; const i = +b.dataset.i;
    if (picked.includes(i)) { picked = picked.filter(x => x !== i); b.classList.remove('sel'); return; }
    picked.push(i); b.classList.add('sel'); if (picked.length === need) setTimeout(() => finish(false), 250); });
}

/* ---------- CLASS CODES ---------- */
let klass = '';
const CODE_FIELDS = Object.keys(window.FIELDS || {});
function resultCode(R, code) { // e.g. HAWKS7-IRC-cyber-tech
  const tf = Object.keys(fscore).sort((a, b) => fscore[b] - fscore[a])[0] || 'none';
  return [klass || 'NOCLASS', code.join(''), R[0].p.id, tf].join('~');
}

/* ---------- SHARE CARD ---------- */
function shareCard(R, code) {
  const top = R[0].p, W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, W, H); grd.addColorStop(0, top.color); grd.addColorStop(1, '#0d1b2a'); g.fillStyle = grd; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 60; i++) { g.fillStyle = 'rgba(255,255,255,' + (i % 5 ? .05 : .12) + ')'; g.beginPath(); g.arc((i * 173) % W, (i * 97) % 500, i % 3 ? 3 : 6, 0, 7); g.fill(); }
  g.textAlign = 'center'; g.fillStyle = '#f2c14e'; g.font = '800 34px system-ui,sans-serif'; g.fillText('HOCKING COLLEGE CAREER NAVIGATOR', W / 2, 90);
  g.fillStyle = '#fff'; g.font = '700 46px system-ui,sans-serif'; g.fillText((name ? name + "'s" : 'My') + ' Career Interest Code', W / 2, 180);
  code.forEach((k, i) => { const x = W / 2 - 330 + i * 230; g.fillStyle = RIASEC[k].color; roundRect(g, x, 220, 200, 200, 32); g.fill(); g.fillStyle = '#fff'; g.font = '900 140px system-ui,sans-serif'; g.fillText(k, x + 100, 372); });
  g.font = '700 38px system-ui,sans-serif'; g.fillText(code.map(k => RIASEC[k].nick).join(' · '), W / 2, 480);
  g.fillStyle = 'rgba(255,255,255,.95)'; roundRect(g, 80, 530, W - 160, 380, 36); g.fill();
  g.fillStyle = '#556'; g.font = '700 32px system-ui,sans-serif'; g.fillText('MY TOP MATCH', W / 2, 590);
  g.font = '110px system-ui,sans-serif'; g.fillText(top.icon, W / 2, 705);
  g.fillStyle = '#1b2430'; wrap(g, top.name, W / 2, 815, W - 240, 52, '800 48px system-ui,sans-serif');
  g.fillStyle = top.color; g.font = '800 34px system-ui,sans-serif'; g.fillText(R[0].pct + '% match', W / 2, 890);
  g.fillStyle = '#fff'; g.font = '700 36px system-ui,sans-serif'; g.fillText('Badges earned', W / 2, 990);
  g.font = '600 40px system-ui,sans-serif'; badges.slice(0, 3).forEach((b, i) => g.fillText(BADGES[b], W / 2, 1050 + i * 56));
  g.fillStyle = 'rgba(255,255,255,.75)'; g.font = '600 30px system-ui,sans-serif';
  g.fillText(`⭐ ${wins} of ${played} challenges won`, W / 2, 1240); g.fillText('What\'s YOUR code? Play The Longest Saturday', W / 2, 1290);
  return c;
}
function roundRect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function wrap(g, t, x, y, mw, lh, font) { g.font = font; const w = t.split(' '); let line = '', lines = []; w.forEach(x2 => { const tt = line + x2 + ' '; if (g.measureText(tt).width > mw && line) { lines.push(line); line = x2 + ' '; } else line = tt; }); lines.push(line);
  if (lines.length > 1) { g.font = font.replace(/\d+px/, '40px'); } lines.slice(0, 2).forEach((l, i) => g.fillText(l.trim(), x, y - (lines.length > 1 ? 24 : 0) + i * (lines.length > 1 ? 46 : 0))); }
function shareBlock(R, code) {
  const c = shareCard(R, code), url = c.toDataURL('image/png');
  return { html: `<div class="card" style="text-align:center"><h2 style="margin-top:0">📸 Your result card</h2><p>Compare with your friends. What did they get?</p>
    <img src="${url}" alt="My career result card" style="width:100%;max-width:340px;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.25)"><p>
    <button class="btn" id="shr">📲 Share</button> <a class="btn ghost" style="color:#1b2430;border-color:#c9ced6" download="my-career-code.png" href="${url}">⬇️ Download</a></p>
    ${klass ? `<p class="small">Class code: <b>${klass}</b>. Your teacher's code for you: <code id="rc">${resultCode(R, code)}</code> <button class="btn ghost" id="cpy" style="color:#1b2430;border-color:#c9ced6;padding:4px 10px;font-size:13px">Copy</button></p>` : ''}</div>`,
    wire() { const s = document.getElementById('shr'); if (s) s.onclick = async () => { try { const blob = await (await fetch(url)).blob(), f = new File([blob], 'my-career-code.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) await navigator.share({ files: [f], title: 'My career code' }); else { const a = document.createElement('a'); a.href = url; a.download = 'my-career-code.png'; a.click(); } } catch (e) {} };
      const cp = document.getElementById('cpy'); if (cp) cp.onclick = () => { try { navigator.clipboard.writeText(document.getElementById('rc').textContent); cp.textContent = 'Copied!'; } catch (e) {} }; } };
}
