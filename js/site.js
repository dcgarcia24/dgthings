(() => {
  'use strict';
  const P = window.PROJECTS || [];
  const C = window.CONTACT || {};
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bySlug = s => P.findIndex(p => p.slug === s);
  const hasVideo = p => p.videos && p.videos.length > 0;
  // ?mute=1 in the address bar starts every video muted (handy for testing)
  const MUTE = new URLSearchParams(location.search).has('mute');
  const main = $('#main');

  /* ---------- build the project shots ---------- */
  $('#shots').innerHTML = P.map((p, i) => `
    <section class="shot" id="s-${i}" data-i="${i}" aria-label="${esc(p.client + ' — ' + p.title)}">
      <div class="bg"><img data-src="img/${p.image}.jpg" data-srcset="img/${p.image}-sm.jpg 900w, img/${p.image}.jpg 2000w" sizes="100vw" alt=""></div>
      <div class="copy">
        <div>
          <div class="kicker">${pad(i + 1)} — ${esc(p.client)}</div>
          <h2>${esc(p.title)}</h2>
          <div class="meta"><span>${esc(p.type)}</span><span>${p.year || ''}</span>${p.videos.length > 1 ? `<span>${p.videos.length} films</span>` : ''}</div>
        </div>
        <div class="actions">
          ${hasVideo(p)
            ? `<button class="btn play" type="button" data-play="${p.slug}">Play</button>`
            : `<button class="btn" type="button" disabled>Video coming soon</button>`}
        </div>
      </div>
    </section>`).join('');

  $('#rail').innerHTML = P.map((p, i) =>
    `<a href="#s-${i}" data-i="${i}" aria-label="${esc(p.client + ' — ' + p.title)}"><span>${pad(i + 1)} ${esc(p.client)}</span></a>`).join('');

  /* ---------- index overlay ---------- */
  const types = ['All', ...new Set(P.map(p => p.type))];
  $('#filters').innerHTML = types.map((t, i) => `<button type="button" class="${i ? '' : 'on'}" data-t="${esc(t)}" aria-pressed="${!i}">${esc(t)}</button>`).join('');
  $('#grid').innerHTML = P.map((p, i) => `
    <button class="tile" type="button" data-go="${i}" data-type="${esc(p.type)}">
      <div class="th" data-n="${pad(i + 1)}"><img src="img/${p.image}-sm.jpg" alt="" loading="lazy"></div>
      <div class="k">${esc(p.client)} · ${p.year || ''}</div>
      <div class="t">${esc(p.title)}</div>
    </button>`).join('');
  $('#indexCount').textContent = `${P.length} projects`;
  $('#filters').addEventListener('click', e => {
    const t = e.target.dataset.t; if (!t) return;
    $$('#filters button').forEach(b => { b.classList.toggle('on', b.dataset.t === t); b.setAttribute('aria-pressed', b.dataset.t === t); });
    $$('.tile').forEach(el => el.classList.toggle('hide', t !== 'All' && el.dataset.type !== t));
  });

  /* ---------- about slate ---------- */
  const clients = [...new Set(P.map(p => p.client))].filter(c => c !== 'Short Film');
  $('#slate').innerHTML = [
    ['Role', 'Director of Photography'], ['Based', 'Los Angeles, CA'],
    ['Work', [...new Set(P.map(p => p.type))].join(' · ')], ['Clients', clients.join(' · ')]
  ].map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('');
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- load images just before they're needed ---------- */
  const loadImg = img => {
    if (!img.dataset.src) return;
    img.onload = () => img.classList.add('ready');
    if (img.dataset.srcset) { img.srcset = img.dataset.srcset; delete img.dataset.srcset; }
    img.src = img.dataset.src; delete img.dataset.src;
  };
  /* ---------- which shot is on screen (read straight from the scroll position) ---------- */
  const shots = $$('.shot');
  let current = -1;
  const setCurrent = idx => {
    // keep this shot and its neighbours' photos loaded
    shots.slice(Math.max(0, idx - 1), idx + 3).forEach(s => s.querySelectorAll('img[data-src]').forEach(loadImg));
    if (idx === current) return;
    current = idx;
    const el = shots[idx];
    el.classList.add('in');
    const i = el.dataset.i;
    const n = i != null ? +i + 1 : (idx === 0 ? 0 : P.length);
    $('#ctr').textContent = `${pad(n)} / ${pad(P.length)}`;
    $('#prog').style.width = (idx / (shots.length - 1) * 100) + '%';
    $$('.rail a').forEach(a => a.classList.toggle('on', a.dataset.i === i));
    $('#brand').classList.toggle('show', idx > 0);
  };
  const measure = () => {
    const mid = main.scrollTop + main.clientHeight / 2;
    let idx = 0;
    shots.forEach((s, k) => { if (s.offsetTop <= mid) idx = k; });
    setCurrent(idx);
  };
  let raf = 0;
  main.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; measure(); }); }, { passive: true });
  window.addEventListener('resize', measure);
  measure();
  const goShot = n => { n = Math.max(0, Math.min(shots.length - 1, n)); shots[n].scrollIntoView({ behavior: 'smooth' }); };

  /* ---------- running timecode ---------- */
  const t0 = performance.now();
  const tick = () => {
    const f = Math.floor((performance.now() - t0) / 1000 * 24), s = Math.floor(f / 24);
    $('#tc').textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 24)}`;
  };
  setInterval(tick, 42);

  /* ---------- dialogs: focus handling ---------- */
  let lastFocus = null;
  const trap = (box, e) => {
    const f = [...box.querySelectorAll('button:not([disabled]),a[href],iframe')].filter(x => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  };

  /* ---------- index open / close ---------- */
  const openIndex = () => { lastFocus = document.activeElement; $('#index').classList.add('open'); $('[data-close-index]').focus(); };
  const closeIndex = () => { $('#index').classList.remove('open'); lastFocus && lastFocus.focus(); };
  $('#openIndex').addEventListener('click', openIndex);
  $('[data-close-index]').addEventListener('click', closeIndex);
  $('#grid').addEventListener('click', e => {
    const t = e.target.closest('[data-go]'); if (!t) return;
    $('#index').classList.remove('open');
    goShot(+t.dataset.go + 1);
  });

  /* ---------- video player ---------- */
  let lbIndex = -1, lbVideo = 0;
  const vimeoSrc = v => {
    const q = new URLSearchParams({ autoplay: 1, title: 0, byline: 0, portrait: 0, color: 'd4ff3a', dnt: 1 });
    if (v.hash) q.set('h', v.hash);
    if (MUTE) q.set('muted', 1);
    return `https://player.vimeo.com/video/${v.id}?${q}`;
  };
  const renderVideo = () => {
    const p = P[lbIndex];
    if (hasVideo(p)) {
      $('#lbFrame').innerHTML = `<iframe src="${vimeoSrc(p.videos[lbVideo])}" title="${esc(p.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      $('#lbFrame').innerHTML = `<div class="lb-empty"><img src="img/${p.image}.jpg" alt=""><span>Video coming soon</span></div>`;
    }
    $$('#lbTabs button').forEach((b, i) => b.classList.toggle('on', i === lbVideo));
  };
  const openVideo = (i, vi = 0, push = true) => {
    if (i < 0 || i >= P.length) return;
    if (!$('#lb').classList.contains('open')) lastFocus = document.activeElement;
    lbIndex = i; lbVideo = vi;
    const p = P[i];
    $('#lbTitle').textContent = p.title;
    $('#lbSub').textContent = [p.client, p.type, p.year, p.credit].filter(Boolean).join(' · ');
    $('#lbTabs').innerHTML = p.videos.length > 1
      ? p.videos.map((v, k) => `<button type="button" data-v="${k}">${esc(v.label || 'Film ' + (k + 1))}</button>`).join('') : '';
    renderVideo();
    $('#lb').classList.add('open');
    $('#index').classList.remove('open');
    $('[data-close-lb]').focus();
    if (push) history.replaceState(null, '', '#watch/' + p.slug);
  };
  const closeVideo = () => {
    $('#lb').classList.remove('open');
    $('#lbFrame').innerHTML = '';
    history.replaceState(null, '', location.pathname + location.search);
    lastFocus && lastFocus.focus();
  };
  const step = d => {
    let n = lbIndex;
    for (let k = 0; k < P.length; k++) { n = (n + d + P.length) % P.length; if (hasVideo(P[n])) break; }
    openVideo(n);
  };
  $('#lbTabs').addEventListener('click', e => { const v = e.target.dataset.v; if (v != null) { lbVideo = +v; renderVideo(); } });
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  $('[data-close-lb]').addEventListener('click', closeVideo);
  $('#lb').addEventListener('click', e => { if (e.target.id === 'lb') closeVideo(); });

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-play]'); if (!b) return;
    openVideo(bySlug(b.dataset.play));
  });

  /* ---------- share + copy ---------- */
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1800); };
  const copy = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch { prompt('Copy this:', text); }
  };
  $('#lbShare').addEventListener('click', () => copy(location.origin + location.pathname + '#watch/' + P[lbIndex].slug, 'Link copied'));
  $('#copyEmail').addEventListener('click', () => copy(C.email || 'dg@kombinemedia.com', 'Email copied'));

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', e => {
    const lbOpen = $('#lb').classList.contains('open'), ixOpen = $('#index').classList.contains('open');
    if (e.key === 'Escape') { if (lbOpen) closeVideo(); else if (ixOpen) closeIndex(); return; }
    if (e.key === 'Tab') { if (lbOpen) trap($('#lb'), e); else if (ixOpen) trap($('#index'), e); return; }
    if (lbOpen) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); return; }
    if (ixOpen || e.metaKey || e.ctrlKey || e.altKey) return;
    if (['ArrowDown', 'PageDown', 'j'].includes(e.key)) { e.preventDefault(); goShot(current + 1); }
    if (['ArrowUp', 'PageUp', 'k'].includes(e.key)) { e.preventDefault(); goShot(current - 1); }
    if (e.key === 'Home') { e.preventDefault(); goShot(0); }
    if (e.key === 'End') { e.preventDefault(); goShot(shots.length - 1); }
    if (e.key === 'i') openIndex();
  });

  /* ---------- share links: #watch/slug opens that video ---------- */
  const route = () => {
    const m = location.hash.match(/^#watch\/([\w-]+)/);
    if (m) { const i = bySlug(m[1]); if (i >= 0) { shots[i + 1].scrollIntoView(); openVideo(i, 0, false); } }
  };
  window.addEventListener('hashchange', route);
  route();
})();
