/* ================================================================
   MUSIC AND ATMOSPHERE
   Background music is generated live in the browser (no audio files),
   so it changes with the story: a bright morning groove, a tense
   pulse in the tech scenes, a dark storm theme, a chill night theme,
   a driving beat for challenges, and a celebration at the results.
   Ambient layers: birds in the woods, rain in the storm, crickets at night.
   Visual layers: drifting clouds, lightning flashes, fireflies.
   Music has its own 🎵 toggle. The 🔊 button mutes everything.
   ================================================================ */
window.MUSIC = (function () {
  let ctx, master, musicBus, ambBus, on = true, mood = null, timer = null, step = 0, nextT = 0, amb = null, ambTimer = null;
  try { on = localStorage.getItem('hcnMusic') !== '0'; } catch (e) {}
  const N = n => 440 * Math.pow(2, (n - 69) / 12); // MIDI to Hz
  const init = () => {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return false; }
    master = ctx.createGain(); master.gain.value = .55; master.connect(ctx.destination);
    const rev = ctx.createConvolver(), len = ctx.sampleRate * 2.2, b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
    rev.buffer = b; const wet = ctx.createGain(); wet.gain.value = .35; rev.connect(wet).connect(master);
    musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master); musicBus.connect(rev);
    ambBus = ctx.createGain(); ambBus.gain.value = .5; ambBus.connect(master);
    return true;
  };
  const silent = () => !ctx || (window.SFX && SFX.muted);
  /* ---- instruments ---- */
  const note = (f, t, d, type, v, cut = 2400, dest = musicBus) => { const o = ctx.createOscillator(), g = ctx.createGain(), fl = ctx.createBiquadFilter();
    o.type = type; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.value = cut;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + Math.min(.04, d / 4)); g.gain.exponentialRampToValueAtTime(.0008, t + d);
    o.connect(fl).connect(g).connect(dest); o.start(t); o.stop(t + d + .05); };
  const pad = (fs, t, d, v = .05, cut = 1400) => fs.forEach(f => { [-6, 6].forEach(det => { const o = ctx.createOscillator(), g = ctx.createGain(), fl = ctx.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det; fl.type = 'lowpass'; fl.frequency.value = cut;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + d * .3); g.gain.linearRampToValueAtTime(0, t + d);
    o.connect(fl).connect(g).connect(musicBus); o.start(t); o.stop(t + d + .05); }); });
  const kick = (t, v = .5) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + .15);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + .25); o.connect(g).connect(musicBus); o.start(t); o.stop(t + .3); };
  const hat = (t, v = .06, d = .04) => { const s = ctx.createBufferSource(), b = ctx.createBuffer(1, ctx.sampleRate * d, ctx.sampleRate), x = b.getChannelData(0);
    for (let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1; const f = ctx.createBiquadFilter(), g = ctx.createGain(); f.type = 'highpass'; f.frequency.value = 7000;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); s.buffer = b; s.connect(f).connect(g).connect(musicBus); s.start(t); };
  const snare = t => { hat(t, .12, .14); note(190, t, .1, 'triangle', .08, 1200); };
  /* ---- songs: chords as MIDI root lists, 16 steps per bar ---- */
  const SONGS = {
    morning: { bpm: 96, chords: [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 67]], play(s, t, c, b) {
      if (s % 16 === 0) pad(c.map(N), t, b * 16, .028);
      if (s % 2 === 0) note(N(c[(s / 2) % 4] + 12 + (s % 8 === 6 ? 7 : 0)), t, .35, 'triangle', .07, 3000);
      if (s % 8 === 0) note(N(c[0] - 24), t, b * 6, 'sine', .14, 600);
      if (s % 4 === 0) kick(t, .22); if (s % 4 === 2) hat(t, .04); } },
    focus: { bpm: 112, chords: [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 55, 59]], play(s, t, c, b) {
      if (s % 16 === 0) pad(c.map(N), t, b * 16, .025, 900);
      note(N([c[0], c[1], c[2], c[1]][s % 4] + 12), t, .12, 'square', .03, 1800);
      if (s % 2 === 0) note(N(c[0] - 24), t, .18, 'sawtooth', .06, 400);
      if (s % 4 === 0) kick(t, .3); if (s % 2 === 1) hat(t, .03); } },
    storm: { bpm: 84, chords: [[50, 53, 57], [46, 50, 53], [48, 52, 55], [45, 49, 52]], play(s, t, c, b) {
      if (s % 16 === 0) { pad(c.map(N), t, b * 16, .045, 700); note(N(c[0] - 24), t, b * 16, 'sawtooth', .07, 220); }
      if ([0, 3, 6, 10, 12].includes(s % 16)) kick(t, .42);
      if (s % 8 === 4) snare(t);
      if (s % 16 === 14) note(N(c[2] + 12), t, .9, 'sawtooth', .035, 1400); } },
    calm: { bpm: 80, chords: [[53, 57, 60, 64], [55, 59, 62, 65], [52, 55, 59, 62], [57, 60, 64, 67]], play(s, t, c, b) {
      if (s % 16 === 0) pad(c.map(N), t, b * 16, .03, 1100);
      if (s % 3 === 0) note(N(c[s % 4] + 12), t, .9, 'sine', .06, 2000);
      if (s % 8 === 0) note(N(c[0] - 24), t, b * 7, 'sine', .12, 500); } },
    night: { bpm: 70, chords: [[51, 55, 58, 62], [48, 51, 55, 58], [44, 48, 51, 55], [46, 50, 53, 58]], play(s, t, c, b) {
      if (s % 16 === 0) pad(c.map(N), t, b * 16, .035, 900);
      if ([0, 3, 7, 10, 14].includes(s % 16)) note(N(c[(s * 3) % 4] + 24), t, 1.4, 'sine', .045, 2600);
      if (s % 16 === 0) note(N(c[0] - 12), t, b * 15, 'sine', .1, 400);
      if (s % 8 === 4) hat(t, .02, .08); } },
    challenge: { bpm: 132, chords: [[57, 60, 64], [57, 60, 64], [53, 57, 60], [55, 59, 62]], play(s, t, c, b) {
      note(N(c[0] - 24 + (s % 4 === 3 ? 12 : 0)), t, .1, 'sawtooth', .07, 700);
      if (s % 4 === 0) kick(t, .4); if (s % 8 === 4) snare(t); hat(t, .025);
      if (s % 16 === 0) pad(c.map(N), t, b * 16, .02, 1600);
      if ([0, 6, 12].includes(s % 16)) note(N(c[2] + 12), t, .15, 'square', .035, 2400); } },
    triumph: { bpm: 118, chords: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]], play(s, t, c, b) {
      if (s % 16 === 0) pad(c.map(N).concat(N(c[0] + 12)), t, b * 16, .03, 2200);
      const mel = [0, 2, 1, 2, 0, 1, 2, 1]; if (s % 2 === 0) note(N(c[mel[(s / 2) % 8]] + 12), t, .3, 'triangle', .075, 3500);
      if (s % 4 === 0) { kick(t, .38); note(N(c[0] - 24), t, .4, 'sawtooth', .06, 500); }
      if (s % 8 === 4) snare(t); if (s % 2 === 1) hat(t, .04); } },
  };
  const tick = () => {
    if (!mood || !ctx) return; const S = SONGS[mood], b = 60 / S.bpm / 4;
    while (nextT < ctx.currentTime + .2) { const c = S.chords[Math.floor(step / 16) % S.chords.length]; if (!silent()) S.play(step % 16, nextT, c, b); step++; nextT += b; }
  };
  /* ---- ambience ---- */
  let rainSrc = null;
  const stopAmb = () => { clearInterval(ambTimer); ambTimer = null; if (rainSrc) { try { rainSrc.stop(); } catch (e) {} rainSrc = null; } };
  const startAmb = kind => { stopAmb(); amb = kind; if (!kind || !ctx) return;
    if (kind === 'rain') { const len = ctx.sampleRate * 3, b = ctx.createBuffer(1, len, ctx.sampleRate), x = b.getChannelData(0); for (let i = 0; i < len; i++) x[i] = Math.random() * 2 - 1;
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = b; s.loop = true; f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = .4; g.gain.value = .22;
      s.connect(f).connect(g).connect(ambBus); s.start(); rainSrc = s; }
    ambTimer = setInterval(() => { if (silent()) return; const t = ctx.currentTime;
      if (kind === 'birds' && Math.random() < .35) { const f = 2200 + Math.random() * 1800; for (let i = 0; i < 2 + Math.random() * 3; i++) { const o = ctx.createOscillator(), g = ctx.createGain(), s = t + i * .11;
          o.frequency.setValueAtTime(f, s); o.frequency.exponentialRampToValueAtTime(f * (1.3 + Math.random() * .4), s + .07); g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(.025, s + .02); g.gain.exponentialRampToValueAtTime(.001, s + .09);
          o.connect(g).connect(ambBus); o.start(s); o.stop(s + .1); } }
      if (kind === 'crickets' && Math.random() < .6) { for (let i = 0; i < 6; i++) { const o = ctx.createOscillator(), g = ctx.createGain(), s = t + i * .045;
          o.frequency.value = 4600; g.gain.setValueAtTime(.012, s); g.gain.exponentialRampToValueAtTime(.001, s + .03); o.connect(g).connect(ambBus); o.start(s); o.stop(s + .035); } }
      if (kind === 'rain' && Math.random() < .12) { flash(); window.SFX && SFX.play('thunder'); }
    }, 700); };
  const fade = (v, d = 1.2) => { if (!ctx) return; const g = musicBus.gain, t = ctx.currentTime; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(v, t + d); };
  /* ---- visual atmosphere ---- */
  function flash() { const f = document.getElementById('flash'); if (!f) return; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
    document.body.classList.remove('shake'); void document.body.offsetWidth; document.body.classList.add('shake'); }
  const VIS = {
    sunrise: '<div class="cloud" style="top:8%;animation-duration:70s"></div><div class="cloud" style="top:20%;animation-duration:95s;animation-delay:-40s;transform:scale(.7)"></div><div class="sun"></div>',
    forest: '<div class="cloud" style="top:6%;animation-duration:80s"></div>' + Array.from({ length: 8 }, (_, i) => `<div class="leaf" style="left:${i * 13}%;animation-delay:${i * 1.7}s;animation-duration:${9 + i % 4}s">🍃</div>`).join(''),
    fair: '<div class="cloud" style="top:10%;animation-duration:60s"></div>' + Array.from({ length: 6 }, (_, i) => `<div class="balloon" style="left:${8 + i * 16}%;animation-delay:${i * 2.3}s">🎈</div>`).join(''),
    storm: '<div class="cloud dark" style="top:2%;animation-duration:25s"></div><div class="cloud dark" style="top:12%;animation-duration:32s;animation-delay:-12s"></div>',
    stars: Array.from({ length: 14 }, (_, i) => `<div class="fly" style="left:${(i * 37) % 95}%;top:${50 + (i * 23) % 40}%;animation-delay:${i * .6}s"></div>`).join(''),
    night: Array.from({ length: 8 }, (_, i) => `<div class="fly" style="left:${(i * 41) % 95}%;top:${40 + (i * 29) % 40}%;animation-delay:${i * .8}s"></div>`).join(''),
    tech: Array.from({ length: 16 }, (_, i) => `<div class="bit" style="left:${i * 6.3}%;animation-delay:${(i * .37) % 3}s;animation-duration:${3 + i % 4}s">${i % 2 ? '1' : '0'}</div>`).join(''),
  };
  const MOOD = { sunrise: 'morning', forest: 'morning', fair: 'morning', kitchen: 'morning', tech: 'focus', storm: 'storm', dusk: 'calm', night: 'night', stars: 'night', results: 'triumph' };
  const AMB = { forest: 'birds', sunrise: 'birds', storm: 'rain', stars: 'crickets', night: 'crickets' };
  const api = {
    get on() { return on; },
    set(m) { if (m === mood) return; mood = m; step = 0; if (!on || !init()) return; nextT = ctx.currentTime + .1; fade(0, .3); setTimeout(() => fade(.9, 1.5), 350);
      if (!timer) timer = setInterval(tick, 50); },
    scene(bg) { const v = document.getElementById('atmos'); if (v) v.innerHTML = VIS[bg] || '';
      if (on && init()) startAmb(AMB[bg]); api.set(MOOD[bg] || 'calm'); if (bg === 'storm') setTimeout(flash, 900); },
    toggle() { on = !on; try { localStorage.setItem('hcnMusic', on ? '1' : '0'); } catch (e) {}
      if (!on) { fade(0, .5); stopAmb(); } else if (init()) { const m = mood; mood = null; api.set(m || 'morning'); startAmb(amb); } return on; },
    flash,
  };
  return api;
})();

(function () {
  /* atmosphere layers */
  document.body.insertAdjacentHTML('afterbegin', '<div id="atmos"></div><div id="flash"></div>');
  const css = document.createElement('style');
  css.textContent = `#atmos{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
  #flash{position:fixed;inset:0;pointer-events:none;z-index:40;background:#fff;opacity:0}#flash.go{animation:fl .7s ease-out}
  @keyframes fl{0%{opacity:0}8%{opacity:.85}16%{opacity:.1}24%{opacity:.6}100%{opacity:0}}
  body.shake #app{animation:shk .45s}@keyframes shk{20%{transform:translate(-6px,2px)}40%{transform:translate(5px,-3px)}60%{transform:translate(-4px,1px)}80%{transform:translate(3px,0)}}
  .cloud{position:absolute;left:-260px;width:240px;height:70px;background:rgba(255,255,255,.55);border-radius:60px;filter:blur(2px);animation:drift linear infinite}
  .cloud:before,.cloud:after{content:"";position:absolute;background:inherit;border-radius:50%}.cloud:before{width:110px;height:110px;top:-55px;left:40px}.cloud:after{width:80px;height:80px;top:-35px;left:120px}
  .cloud.dark{background:rgba(40,48,60,.75)}@keyframes drift{to{transform:translateX(calc(100vw + 520px))}}
  .sun{position:absolute;right:10%;top:12%;width:110px;height:110px;border-radius:50%;background:radial-gradient(#fff6c8,#ffcf5a 60%,transparent 70%);animation:rise 6s ease-out both,glow 4s ease-in-out infinite alternate}
  @keyframes rise{from{transform:translateY(160px);opacity:0}}@keyframes glow{to{filter:brightness(1.15) drop-shadow(0 0 30px #ffd36b)}}
  .leaf,.balloon,.bit{position:absolute;top:-40px;font-size:24px;animation:fall linear infinite;opacity:.8}.balloon{top:auto;bottom:-60px;font-size:34px;animation:up 14s linear infinite}
  .bit{color:#38e1c6;font:700 18px ui-monospace,monospace;opacity:.35}
  @keyframes fall{to{transform:translate(60px,110vh) rotate(540deg)}}@keyframes up{to{transform:translate(-40px,-120vh)}}
  .fly{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff59a;box-shadow:0 0 12px 4px rgba(255,240,120,.7);animation:blink 3.5s ease-in-out infinite,wander 9s ease-in-out infinite alternate}
  @keyframes blink{0%,100%{opacity:0}50%{opacity:1}}@keyframes wander{to{transform:translate(40px,-30px)}}
  #app,header{position:relative;z-index:2}
  @media (prefers-reduced-motion:reduce){#atmos,#flash{display:none}body.shake #app{animation:none}}`;
  document.head.appendChild(css);
  /* music button next to the mute button */
  const mute = document.getElementById('mute'); if (mute) { const b = document.createElement('button'); b.id = 'mus'; b.title = 'Music on or off'; b.style.cssText = mute.style.cssText.replace('margin-left:auto;', '');
    const set = () => { b.textContent = '🎵'; b.style.opacity = MUSIC.on ? 1 : .45; }; set(); b.onclick = () => { MUSIC.toggle(); set(); };
    const grp = document.createElement('div'); grp.style.cssText = 'margin-left:auto;display:flex;gap:8px;margin-right:12px'; mute.before(grp); mute.style.margin = '0'; b.style.margin = '0'; grp.append(mute, b); }
  /* hook scenery so every scene sets its music and atmosphere */
  const orig = window.scenery; window.scenery = function (bg) { orig(bg); MUSIC.scene(bg); };
  /* challenges get the driving beat */
  const om = window.miniScene; if (om) window.miniScene = function (id) { om(id); MUSIC.set('challenge'); };
  /* browsers need one click before sound can start */
  document.addEventListener('click', () => { if (MUSIC.on) { const bg = (document.body.className.match(/bg-(\w+)/) || [])[1]; MUSIC.scene(bg || 'sunrise'); } }, { once: true, capture: true });
})();
