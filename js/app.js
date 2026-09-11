/* ==========================================================================
   MartyStudy – logika aplikace (vanilla JS SPA)
   ========================================================================== */

(function () {
  "use strict";

  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");

  /* ----------------------------------------------------------------------
     Ukládání dat (localStorage) – vše lokálně v zařízení
     ---------------------------------------------------------------------- */
  const KEY = "martystudy_v1";
  const defaultStore = {
    favTopics: [],   // "sid/tid"
    favCards: [],    // "sid/tid/id"
    progress: {},    // "sid/tid": { best, attempts, name }
    recent: [],      // [{sid,tid}]
    last: null,      // {sid,tid}
    stats: { answered: 0, correct: 0 }
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...defaultStore };
      return Object.assign({ ...defaultStore }, JSON.parse(raw));
    } catch (e) {
      return { ...defaultStore };
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
  }
  let store = load();

  /* ----------------------------------------------------------------------
     Pomocné funkce
     ---------------------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const rand = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rand(arr.length)];

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => (toastEl.hidden = true), 300);
    }, 1600);
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      toast("Poslech tu bohužel nejde 😕");
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ----------------------------------------------------------------------
     Lumi – kamarád na učení (hlas v češtině, uvítání, pochvala)
     ---------------------------------------------------------------------- */
  const LUMI_IMG = "img/lumi.png";
  const INTRO_VIDEO = "video.mp4";
  const LUMI_GREETING = "Ahoj Marťo, já jsem Lumi, těším se, co všechno se spolu naučíme.";
  let csVoice = null;

  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    try {
      const vs = speechSynthesis.getVoices();
      csVoice = vs.find((v) => /^cs|-CZ|czech/i.test(v.lang) || /czech|česk/i.test(v.name)) || null;
    } catch (e) {}
  }
  if ("speechSynthesis" in window) {
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }

  // Lumi udělá gesto (mávnutí, skok, roztočení, oslava)
  function lumiGesture(fig, cls) {
    if (!fig) return;
    ["wave", "jump", "cheer", "spin", "nod", "look", "shift", "hop"].forEach((c) => fig.classList.remove(c));
    void fig.offsetWidth; // restart animace
    fig.classList.add(cls);
    clearTimeout(fig._g);
    fig._g = setTimeout(() => fig.classList.remove(cls), 1400);
  }

  // Lumi mluví česky
  function lumiSay(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "cs-CZ";
      if (csVoice) u.voice = csVoice;
      u.rate = 0.98;
      u.pitch = 1.15;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  // Uvítání při otevření aplikace (jednou za spuštění)
  let greeted = false;
  let lumiHeroTimer = null;
  function greetLumi() {
    if (greeted) return;
    greeted = true;
    const ov = document.createElement("div");
    ov.className = "lumi-overlay video-intro";
    ov.innerHTML = `<div class="intro-video-wrap">
        <video id="introVid" src="${INTRO_VIDEO}" playsinline preload="auto"></video>
        <button class="btn" id="introPlay">▶️ Přehrát</button>
        <button class="intro-skip" id="introSkip">Přeskočit ✕</button>
      </div>`;
    document.body.appendChild(ov);

    const vid = $("#introVid");
    const playBtn = $("#introPlay");
    let closed = false;
    const close = () => {
      if (closed) return; closed = true;
      try { vid.pause(); } catch (e) {}
      ov.remove();
    };

    $("#introSkip").addEventListener("click", close);
    playBtn.addEventListener("click", () => { vid.play(); });
    vid.addEventListener("playing", () => { playBtn.hidden = true; });
    vid.addEventListener("ended", close);
    vid.addEventListener("error", close); // kdyby se video nenačetlo, nezablokuje appku
    // pokus o automatické spuštění; když prohlížeč blokuje, zůstane tlačítko Přehrát
    const p = vid.play();
    if (p && p.catch) p.catch(() => { playBtn.hidden = false; });
  }

  // Pochvala „Skvělá práce!" – hlas + bublina v rohu
  function lumiPraise(text) {
    const msg = text || "Skvělá práce!";
    lumiSay(msg);
    let pop = $("#lumiPop");
    if (!pop) {
      pop = document.createElement("div");
      pop.id = "lumiPop";
      pop.className = "lumi-pop";
      pop.innerHTML = `<div class="say"></div><span class="l-alive"><img src="${LUMI_IMG}" class="l-fig" alt="Lumi" /></span>`;
      document.body.appendChild(pop);
    }
    pop.querySelector(".say").textContent = msg;
    pop.classList.add("show");
    lumiGesture(pop.querySelector("img"), "cheer");
    clearTimeout(lumiPraise._t);
    lumiPraise._t = setTimeout(() => pop.classList.remove("show"), 2400);
  }

  const cardId = (card) => card.en || card.word;
  const topicKey = (sid, tid) => sid + "/" + tid;
  const cardKey = (sid, tid, card) => sid + "/" + tid + "/" + cardId(card);

  /* ----------------------------------------------------------------------
     Oblíbené / průběh
     ---------------------------------------------------------------------- */
  function isFavTopic(sid, tid) { return store.favTopics.includes(topicKey(sid, tid)); }
  function toggleFavTopic(sid, tid) {
    const k = topicKey(sid, tid);
    const i = store.favTopics.indexOf(k);
    if (i >= 0) { store.favTopics.splice(i, 1); toast("Odebráno z oblíbených"); }
    else { store.favTopics.push(k); toast("Přidáno do oblíbených ⭐"); }
    save();
  }
  function isFavCard(sid, tid, card) { return store.favCards.includes(cardKey(sid, tid, card)); }
  function toggleFavCard(sid, tid, card) {
    const k = cardKey(sid, tid, card);
    const i = store.favCards.indexOf(k);
    if (i >= 0) { store.favCards.splice(i, 1); toast("Odebráno z oblíbených"); }
    else { store.favCards.push(k); toast("Přidáno do oblíbených ⭐"); }
    save();
  }
  function pushRecent(sid, tid) {
    store.recent = store.recent.filter((r) => !(r.sid === sid && r.tid === tid));
    store.recent.unshift({ sid, tid });
    store.recent = store.recent.slice(0, 6);
    store.last = { sid, tid };
    save();
  }
  function recordResult(sid, tid, name, percent) {
    const k = topicKey(sid, tid);
    const cur = store.progress[k] || { best: 0, attempts: 0, name };
    cur.attempts += 1;
    cur.best = Math.max(cur.best, percent);
    cur.name = name;
    store.progress[k] = cur;
    save();
  }

  const practiceableTopics = () => {
    let n = 0;
    DATA.subjects.forEach((s) => s.topics.forEach((t) => { if (t.type !== "soon") n++; }));
    return n;
  };
  const practicedCount = () => Object.keys(store.progress).length;

  /* ----------------------------------------------------------------------
     Router (hash)
     ---------------------------------------------------------------------- */
  function go(path) { location.hash = path; }

  function router() {
    const hash = location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);
    const view = parts[0] || "home";

    window.scrollTo(0, 0);

    switch (view) {
      case "home": renderHome(); setNav("home"); break;
      case "subjects": renderSubjects(); setNav("subjects"); break;
      case "subject": renderSubject(parts[1]); setNav("subjects"); break;
      case "topic": renderTopic(parts[1], parts[2]); setNav("subjects"); break;
      case "quiz": renderQuiz(parts[1], parts[2]); setNav("practice"); break;
      case "practice": renderPractice(); setNav("practice"); break;
      case "favorites": renderFavorites(); setNav("favorites"); break;
      case "settings": renderSettings(); setNav("home"); break;
      default: renderHome(); setNav("home");
    }
  }

  function setNav(active) {
    $$(".navbtn").forEach((b) => b.classList.toggle("active", b.dataset.nav === active));
  }

  /* ----------------------------------------------------------------------
     Obrazovka: DOMŮ
     ---------------------------------------------------------------------- */
  function renderHome() {
    const done = practicedCount();
    const total = practiceableTopics();
    const pct = total ? Math.round((done / total) * 100) : 0;

    let html = `
      <header style="text-align:center;margin-top:8px">
        <div class="title-xl">MartyStudy</div>
        <div class="subtitle">Uč se chytře. Pamatuj si víc.</div>
      </header>

      <div class="lumi-hero">
        <span class="l-alive"><img src="${LUMI_IMG}" id="lumiHero" class="l-fig" alt="Lumi" /></span>
        <div class="hello">Ahoj! Jsem <b style="color:var(--blue)">Lumi</b>, tvůj kamarád na učení. Klikni na mě a pojďme na to! 👋</div>
      </div>

      ${installBannerHTML()}

      <div class="progress-wrap">
        <div class="progress-top">
          <div>
            <div style="font-weight:900;font-size:16px">Procvičená témata</div>
            <div style="color:var(--muted);font-weight:800;font-size:13px">Zvládl jsi ${done} z ${total} témat</div>
          </div>
          <div class="big">${pct}%</div>
        </div>
        <div class="bar"><span style="width:${pct}%"></span></div>
      </div>

      <button class="btn purple" id="continueBtn" style="margin-top:14px">▶️ Pokračovat v učení</button>

      <div class="section-h"><span class="dot" style="color:var(--purple)"></span>Předměty</div>
      <div class="tiles">${DATA.subjects.map(subjectTileHTML).join("")}</div>
    `;

    // Oblíbená témata
    const favT = store.favTopics.map(parseTopicKey).filter(Boolean);
    if (favT.length) {
      html += `<div class="section-h"><span class="dot" style="color:var(--orange)"></span>Oblíbená témata</div>
        <div class="topic-list">${favT.slice(0, 4).map(favTopicRowHTML).join("")}</div>`;
    }

    html += `<div class="settings-link"><button id="settingsBtn">⚙️ Pro rodiče / nastavení</button></div>`;

    app.innerHTML = html;

    $("#continueBtn").addEventListener("click", () => {
      const t = store.last || firstTopic();
      go(`/topic/${t.sid}/${t.tid}`);
    });
    $("#settingsBtn").addEventListener("click", () => go("/settings"));
    bindTiles();
    bindTopicRows();
    bindInstall();
    const hero = $("#lumiHero");
    if (hero) {
      const cheers = [
        "Ahoj Marťo! Pojďme se učit, bude to zábava!",
        "Jde ti to skvěle, jsem na tebe pyšný!",
        "Tak co se dnes spolu naučíme?",
        "Jsem rád, že jsme kamarádi!",
        "Hurá do učení!"
      ];
      hero.addEventListener("click", () => {
        lumiGesture(hero, pick(["jump", "spin", "wave", "hop"]));
        lumiSay(pick(cheers));
      });
      lumiLife(hero);
    }
  }

  // „Život" Lumiho – neustále dělá drobné přirozené pohyby (rozhlíží se, přikyvuje, přešlapuje, občas zamává)
  function lumiLife(fig) {
    clearTimeout(lumiHeroTimer);
    const acts = ["look", "look", "nod", "shift", "shift", "look", "wave", "hop", "nod", "shift"];
    const step = () => {
      if (!document.body.contains(fig)) return;
      if (!document.querySelector(".lumi-overlay")) lumiGesture(fig, pick(acts));
      lumiHeroTimer = setTimeout(step, 2000 + Math.random() * 2600);
    };
    lumiHeroTimer = setTimeout(step, 1200);
  }

  function firstTopic() {
    const s = DATA.subjects[0];
    return { sid: s.id, tid: s.topics[0].id };
  }

  function subjectTileHTML(s) {
    const nTopics = s.topics.length;
    return `<button class="tile" data-subject="${s.id}" style="--accent:${s.color}">
      <span class="emoji">${s.icon}</span>
      <span class="t-txt">
        <span class="t-name">${s.name}</span>
        <span class="t-sub">${nTopics} témat</span>
      </span>
      <span class="t-arrow">›</span>
    </button>`;
  }

  function parseTopicKey(k) {
    const [sid, tid] = k.split("/");
    const t = DATA.findTopic(sid, tid);
    return t ? { sid, tid, t, s: DATA.findSubject(sid) } : null;
  }
  function favTopicRowHTML(o) {
    return `<button class="topic" data-topic="${o.sid}/${o.tid}" style="--accent:${o.s.color}">
      <span class="ic">${o.t.icon}</span>
      <span class="nm">${o.t.name}</span>
      <span class="meta"><span style="color:${o.s.color};font-size:20px">›</span></span>
    </button>`;
  }

  /* ----------------------------------------------------------------------
     Obrazovka: PŘEDMĚTY
     ---------------------------------------------------------------------- */
  function renderSubjects() {
    app.innerHTML = `
      <div class="topbar"><h2>Předměty</h2></div>
      <p style="color:var(--muted);font-weight:700;margin:2px 0 8px">Vyber si, co se chceš učit.</p>
      <div class="tiles">${DATA.subjects.map(subjectTileHTML).join("")}</div>
    `;
    bindTiles();
  }

  function bindTiles() {
    $$(".tile[data-subject]").forEach((b) =>
      b.addEventListener("click", () => go(`/subject/${b.dataset.subject}`))
    );
  }

  /* ----------------------------------------------------------------------
     Obrazovka: JEDEN PŘEDMĚT (seznam témat)
     ---------------------------------------------------------------------- */
  function renderSubject(sid) {
    const s = DATA.findSubject(sid);
    if (!s) return go("/subjects");

    const rows = s.topics.map((t) => {
      const prog = store.progress[topicKey(sid, t.id)];
      const meta =
        t.type === "soon"
          ? `<span class="badge-soon">Brzy</span>`
          : prog
          ? `<span class="progress-pill">${prog.best}%</span>`
          : "";
      return `<button class="topic" data-topic="${sid}/${t.id}" style="--accent:${s.color}">
        <span class="ic">${t.icon}</span>
        <span class="nm">${t.name}</span>
        <span class="meta">${meta}<span style="color:${s.color};font-size:20px">›</span></span>
      </button>`;
    });

    app.innerHTML = `
      <div class="topbar">
        <button class="backbtn" id="back">‹</button>
        <h2 style="color:${s.color}">${s.icon} ${s.name}</h2>
      </div>
      <div class="topic-list">${rows.join("")}</div>
    `;
    $("#back").addEventListener("click", () => go("/subjects"));
    bindTopicRows();
  }

  function bindTopicRows() {
    $$(".topic[data-topic]").forEach((b) =>
      b.addEventListener("click", () => {
        const [sid, tid] = b.dataset.topic.split("/");
        go(`/topic/${sid}/${tid}`);
      })
    );
  }

  /* ----------------------------------------------------------------------
     Obrazovka: TÉMA (kartičky)
     ---------------------------------------------------------------------- */
  function renderTopic(sid, tid) {
    const s = DATA.findSubject(sid);
    const t = DATA.findTopic(sid, tid);
    if (!s || !t) return go("/subjects");

    pushRecent(sid, tid);

    const backTo = `/subject/${sid}`;

    if (t.type === "soon") {
      app.innerHTML = topbar(s, t, backTo) + `
        <div class="empty">
          <div class="e-emoji">🚧</div>
          <div class="e-title">Brzy doplníme!</div>
          <p>Na tomhle tématu ještě pracujeme.<br>Zkus zatím jiné téma. 😉</p>
          <div class="btn-row"><button class="btn secondary" id="backBtn">‹ Zpět na témata</button></div>
        </div>`;
      $("#back").addEventListener("click", () => go(backTo));
      $("#backBtn").addEventListener("click", () => go(backTo));
      bindFavTopic(sid, tid);
      return;
    }

    const cards = topicCards(t);

    let html = topbar(s, t, backTo);
    if (t.intro) {
      html += `<div class="progress-wrap" style="margin-bottom:14px">
          <div style="font-weight:900;margin-bottom:4px">${t.icon} Zapamatuj si</div>
          <div style="color:var(--muted);font-weight:700;font-size:14px;line-height:1.4">${t.intro}</div>
        </div>`;
    }
    html += `<div class="counter">${cards.length} kartiček k učení</div>`;
    html += `<div class="flashwrap">${cards.map((c, i) => flashHTML(s, t, c, i, cards.length)).join("")}</div>`;
    html += `<div class="btn-row">
        <button class="btn" id="quizBtn" style="--accent:${s.color}">🎯 Procvičit</button>
      </div>`;

    app.innerHTML = html;
    $("#back").addEventListener("click", () => go(backTo));
    $("#quizBtn").addEventListener("click", () => go(`/quiz/${sid}/${tid}`));
    bindFavTopic(sid, tid);
    bindFlashActions(sid, tid, cards);
  }

  function topbar(s, t, backTo) {
    const fav = isFavTopic(s.id, t.id);
    return `<div class="topbar">
        <button class="backbtn" id="back">‹</button>
        <h2 style="color:${s.color};flex:1">${t.icon} ${t.name}</h2>
        <button class="backbtn" id="favTopicBtn" title="Oblíbené" style="${fav ? "color:var(--orange)" : ""}">${fav ? "★" : "☆"}</button>
      </div>`;
  }

  function bindFavTopic(sid, tid) {
    const btn = $("#favTopicBtn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      toggleFavTopic(sid, tid);
      const fav = isFavTopic(sid, tid);
      btn.textContent = fav ? "★" : "☆";
      btn.style.color = fav ? "var(--orange)" : "";
      btn.classList.add("pop");
      setTimeout(() => btn.classList.remove("pop"), 300);
    });
  }

  // Vytvoří pole kartiček i pro generovaná témata (násobilka, sčítání)
  function topicCards(t) {
    if (t.type === "times") {
      return Array.from({ length: 10 }, (_, i) => {
        const b = i + 1;
        return {
          math: true,
          word: `${t.factor} × ${b} = ${t.factor * b}`,
          emoji: "✖️",
          note: `${t.factor} krát ${b}`,
          sentence: `${t.factor} × ${b} = ${t.factor * b}`
        };
      });
    }
    if (t.type === "arith") {
      const ex = [
        { a: 5, b: 3, op: "+" }, { a: 8, b: 2, op: "-" }, { a: 7, b: 6, op: "+" },
        { a: 12, b: 5, op: "-" }, { a: 9, b: 9, op: "+" }, { a: 15, b: 7, op: "-" }
      ];
      return ex.map((e) => {
        const r = e.op === "+" ? e.a + e.b : e.a - e.b;
        return {
          math: true, word: `${e.a} ${e.op} ${e.b} = ${r}`, emoji: "🧮",
          note: e.op === "+" ? "sčítání" : "odčítání", sentence: `${e.a} ${e.op} ${e.b} = ${r}`
        };
      });
    }
    return t.cards || [];
  }

  function flashHTML(s, t, c, i, total) {
    const fav = isFavCard(s.id, t.id, c);
    const favCls = fav ? "iconbtn fav-on" : "iconbtn";
    const favLabel = fav ? "★ Oblíbené" : "☆ Oblíbené";

    let body = "";
    if (c.en) {
      // Anglické slovíčko
      body = `
        <div class="big-emoji">${c.emoji}</div>
        <div class="en">${c.en}</div>
        <div class="cs-under">${c.cs}</div>
        <div class="sentence">„${c.sentence}“</div>
        <div class="sentence-cs">${c.scs || ""}</div>`;
    } else if (c.math) {
      // Matematika
      body = `
        <div class="big-emoji">${c.emoji}</div>
        <div class="word">${c.word}</div>
        <div class="note">${c.note}</div>`;
    } else {
      // Vyjmenované slovo – zvýrazni y/ý
      body = `
        <div class="big-emoji">${c.emoji}</div>
        <div class="word">${highlightWord(c.word, c.hl)}</div>
        <div class="note">${c.note}</div>
        <div class="sentence">„${c.sentence}“</div>`;
    }

    const speakBtn = c.en
      ? `<button class="iconbtn speak" data-speak="${c.en}">🔊 Slovo</button>
         <button class="iconbtn speak" data-speak="${c.sentence}">🗣️ Věta</button>`
      : "";

    return `<div class="flash" style="--accent:${s.color}" data-card="${i}">
        ${body}
        <div class="card-actions">
          ${speakBtn}
          <button class="${favCls}" data-fav="${i}">${favLabel}</button>
        </div>
      </div>`;
  }

  function highlightWord(word, hl) {
    if (!hl) return word;
    const idx = word.indexOf(hl);
    if (idx < 0) return word;
    return (
      word.slice(0, idx) +
      `<span class="hl">${hl}</span>` +
      word.slice(idx + hl.length)
    );
  }

  function bindFlashActions(sid, tid, cards) {
    $$("[data-speak]").forEach((b) =>
      b.addEventListener("click", () => {
        speak(b.dataset.speak);
        b.classList.add("pop");
        setTimeout(() => b.classList.remove("pop"), 300);
      })
    );
    $$("[data-fav]").forEach((b) =>
      b.addEventListener("click", () => {
        const c = cards[+b.dataset.fav];
        toggleFavCard(sid, tid, c);
        const fav = isFavCard(sid, tid, c);
        b.className = fav ? "iconbtn fav-on" : "iconbtn";
        b.textContent = fav ? "★ Oblíbené" : "☆ Oblíbené";
        b.classList.add("pop");
        setTimeout(() => b.classList.remove("pop"), 300);
      })
    );
  }

  /* ----------------------------------------------------------------------
     KVÍZ – generování otázek
     ---------------------------------------------------------------------- */
  function buildQuestions(s, t) {
    if (t.type === "times") return buildTimes(t.factor);
    if (t.type === "arith") return buildArith();
    if (t.type === "vocab") return buildVocab(t.cards);
    if (t.type === "vyjm") return buildVyjm(t.cards);
    if (t.type === "zs") return buildZS(t);
    if (t.type === "units") return buildUnits();
    return [];
  }

  // Kvíz „Jednotky délky" – převody, výběr jednotky, porovnání
  function buildUnits() {
    const pool = [];
    const rels = [
      { big: "cm", small: "mm", k: 10 },
      { big: "dm", small: "cm", k: 10 },
      { big: "m", small: "dm", k: 10 },
      { big: "m", small: "cm", k: 100 },
      { big: "km", small: "m", k: 1000 }
    ];

    const convOptions = (v, k) => {
      const set = new Set([v]);
      [Math.round(v / 10), v * 10, v + k, v - k, v + Math.max(1, Math.round(k / 10))]
        .forEach((x) => { if (x > 0 && x !== v) set.add(x); });
      let arr = shuffle(Array.from(set)).slice(0, 4);
      if (!arr.includes(v)) arr[3] = v;
      return shuffle(arr);
    };
    const smallOptions = (n) => {
      const s = new Set([n]);
      while (s.size < 4) { const d = n + (rand(2) ? 1 : -1) * (1 + rand(4)); if (d >= 1) s.add(d); }
      return shuffle(Array.from(s));
    };

    // Převody
    rels.forEach((r) => {
      const n = 1 + rand(r.k >= 1000 ? 5 : 9);
      const v = n * r.k;
      pool.push({
        emoji: "🔁",
        prompt: `Převeď: <b>${n} ${r.big}</b> = ? ${r.small}`,
        options: convOptions(v, r.k).map((x) => ({ label: `${x} ${r.small}`, correct: x === v })),
        twoCol: true,
        explain: `${n} ${r.big} = ${v} ${r.small}  (1 ${r.big} = ${r.k} ${r.small})`
      });
      pool.push({
        emoji: "🔁",
        prompt: `Převeď: <b>${v} ${r.small}</b> = ? ${r.big}`,
        options: smallOptions(n).map((x) => ({ label: `${x} ${r.big}`, correct: x === n })),
        twoCol: true,
        explain: `${v} ${r.small} = ${n} ${r.big}  (${r.k} ${r.small} = 1 ${r.big})`
      });
    });

    // Vyber vhodnou jednotku
    const whatUnit = [
      ["tloušťku mince", "mm"], ["délku tužky", "cm"], ["šířku sešitu", "cm"],
      ["výšku dveří", "m"], ["délku bazénu", "m"], ["vzdálenost mezi městy", "km"],
      ["délku hřiště", "m"], ["délku housenky", "cm"]
    ];
    const allUnits = ["mm", "cm", "m", "km"];
    shuffle(whatUnit).slice(0, 4).forEach(([thing, u]) => {
      const others = shuffle(allUnits.filter((x) => x !== u)).slice(0, 3);
      pool.push({
        emoji: "📏",
        prompt: `Jakou jednotkou nejlépe změříš ${thing}?`,
        options: shuffle([u, ...others]).map((x) => ({ label: x, correct: x === u })),
        twoCol: true,
        explain: `${thing.charAt(0).toUpperCase() + thing.slice(1)} nejlépe změříš v ${u}.`
      });
    });

    // Co je delší
    const mm = { mm: 1, cm: 10, dm: 100, m: 1000, km: 1000000 };
    const pairs = [
      [[1, "m"], [90, "cm"]], [[1, "km"], [900, "m"]], [[5, "cm"], [40, "mm"]],
      [[2, "m"], [150, "cm"]], [[3, "dm"], [25, "cm"]], [[1, "m"], [9, "dm"]]
    ];
    shuffle(pairs).slice(0, 3).forEach(([a, b]) => {
      const am = a[0] * mm[a[1]], bm = b[0] * mm[b[1]];
      pool.push({
        emoji: "📐",
        prompt: `Co je delší?`,
        options: shuffle([
          { label: `${a[0]} ${a[1]}`, correct: am > bm },
          { label: `${b[0]} ${b[1]}`, correct: bm > am }
        ]),
        twoCol: true,
        explain: am > bm ? `${a[0]} ${a[1]} je delší než ${b[0]} ${b[1]}.` : `${b[0]} ${b[1]} je delší než ${a[0]} ${a[1]}.`
      });
    });

    return shuffle(pool).slice(0, 10);
  }

  // Kvíz „Ž nebo Š" – míchá 4 typy cvičení
  function buildZS(t) {
    const cards = t.cards || [];
    const bank = t.bank || [];
    const qs = [];

    // Cv. 1 – doplň Ž/Š (z kartiček)
    cards.forEach((c) => {
      const blanked = c.word.replace(c.hl, `<span class="q-blank">__</span>`);
      qs.push({
        _t: "fill", emoji: c.emoji,
        prompt: `Doplň Ž nebo Š:<br><span class="q-sentence">${blanked}</span>`,
        options: shuffle([
          { label: "Ž", correct: c.hl === "ž" },
          { label: "Š", correct: c.hl === "š" }
        ]),
        twoCol: true,
        explain: `Správně je „${c.word}“.`
      });
    });

    // Cv. 2 – vyber správné slovo (správně vs prohozené ž/š)
    cards.forEach((c) => {
      const other = c.hl === "ž" ? "š" : "ž";
      const wrong = c.word.replace(c.hl, other);
      qs.push({
        _t: "choose", emoji: c.emoji,
        prompt: `Vyber správné slovo:`,
        options: shuffle([
          { label: c.word, correct: true },
          { label: wrong, correct: false }
        ]),
        twoCol: true,
        explain: `Správně je „${c.word}“.`
      });
    });

    // Cv. 4 – utvoř 2. stupeň (báze → přídavné jméno)
    (t.base || []).forEach(([base, comp]) => {
      const others = shuffle(bank.filter((w) => w !== comp)).slice(0, 3);
      qs.push({
        _t: "base", emoji: "✏️",
        prompt: `Jak zní 2. stupeň?<br><span class="q-sentence">${base} → ?</span>`,
        options: shuffle([comp, ...others]).map((w) => ({ label: w, correct: w === comp })),
        twoCol: true,
        explain: `${base} → ${comp}`
      });
    });

    // Cv. 3 – doplň správné slovo do věty
    (t.sent || []).forEach(([text, ans]) => {
      const others = shuffle(bank.filter((w) => w !== ans)).slice(0, 3);
      const blanked = text.replace("___", `<span class="q-blank">_____</span>`);
      qs.push({
        _t: "sent", emoji: "📝",
        prompt: `Doplň slovo:<br><span class="q-sentence">${blanked}</span>`,
        options: shuffle([ans, ...others]).map((w) => ({ label: w, correct: w === ans })),
        twoCol: true,
        explain: text.replace("___", ans)
      });
    });

    // pestrá desítka – od každého typu něco
    const by = (tp, n) => shuffle(qs.filter((q) => q._t === tp)).slice(0, n);
    return shuffle([...by("fill", 3), ...by("choose", 2), ...by("base", 2), ...by("sent", 3)]).slice(0, 10);
  }

  function buildTimes(factor) {
    return shuffle(Array.from({ length: 10 }, (_, i) => i + 1)).map((b) => {
      const res = factor * b;
      const opts = numericOptions(res);
      return {
        emoji: "✖️",
        prompt: `${factor} × ${b} = ?`,
        options: opts.map((n) => ({ label: n, correct: n === res })),
        twoCol: true,
        explain: `${factor} × ${b} = ${res}`
      };
    });
  }

  function buildArith() {
    const qs = [];
    for (let i = 0; i < 10; i++) {
      const op = Math.random() < 0.5 ? "+" : "-";
      let a, b, res;
      if (op === "+") { a = 2 + rand(15); b = 1 + rand(10); res = a + b; }
      else { a = 6 + rand(14); b = 1 + rand(a - 1); res = a - b; }
      const opts = numericOptions(res);
      qs.push({
        emoji: op === "+" ? "➕" : "➖",
        prompt: `${a} ${op} ${b} = ?`,
        options: opts.map((n) => ({ label: n, correct: n === res })),
        twoCol: true,
        explain: `${a} ${op} ${b} = ${res}`
      });
    }
    return qs;
  }

  function numericOptions(res) {
    const set = new Set([res]);
    while (set.size < 4) {
      let d = res + (rand(2) ? 1 : -1) * (1 + rand(6));
      if (d < 0) d = res + 1 + rand(6);
      set.add(d);
    }
    return shuffle(Array.from(set));
  }

  function buildVocab(cards) {
    const pool = cards.slice();
    return shuffle(pool).slice(0, Math.min(10, pool.length)).map((card, i) => {
      const others = shuffle(pool.filter((c) => c.en !== card.en)).slice(0, 3);
      const mod = i % 3;
      if (mod === 0) {
        // Vyber správný překlad
        const opts = shuffle([card, ...others]).map((c) => ({ label: c.cs, correct: c.en === card.en }));
        return {
          emoji: card.emoji,
          prompt: `Co znamená <b style="color:var(--blue)">${card.en}</b>?`,
          audio: card.en,
          options: opts,
          twoCol: true,
          explain: `${card.en} = ${card.cs}`
        };
      } else if (mod === 1) {
        // Poslechni a vyber obrázek
        const opts = shuffle([card, ...others]).map((c) => ({ emoji: c.emoji, label: "", correct: c.en === card.en }));
        return {
          emoji: "🔊",
          prompt: `Poslechni si slovo a vyber správný obrázek.`,
          audio: card.en,
          autoSpeak: true,
          options: opts,
          twoCol: true,
          explain: `${card.en} = ${card.cs}`
        };
      } else {
        // Doplň chybějící slovo do věty
        const opts = shuffle([card, ...others]).map((c) => ({ label: c.en, correct: c.en === card.en }));
        return {
          emoji: "📝",
          prompt: `Doplň chybějící slovo:<br><span class="q-sentence">${blankSentence(card.sentence, card.en)}</span><br><span class="q-hint">${card.scs}</span>`,
          audio: card.sentence,
          speakLabel: "🗣️ Přehrát větu",
          options: opts,
          twoCol: true,
          explain: `${card.sentence} — ${card.scs}`
        };
      }
    });
  }

  // Nahradí cílové slovo ve větě prázdným místem (celé slovo, bez ohledu na velikost písmen)
  function blankSentence(sentence, word) {
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("\\b" + esc + "\\b", "i");
    return sentence.replace(re, '<span class="q-blank">_____</span>');
  }

  function buildVyjm(cards) {
    const pool = cards.slice();
    return shuffle(pool).slice(0, Math.min(10, pool.length)).map((card, i) => {
      const long = card.hl === "ý";
      if (i % 2 === 0 || pool.length < 4) {
        // Doplň i/y
        const correct = card.hl;                       // 'y' nebo 'ý'
        const wrong = long ? "í" : "i";
        const blanked = card.word.replace(card.hl, `<span class="q-blank">__</span>`);
        const opts = shuffle([
          { label: correct, correct: true },
          { label: wrong, correct: false }
        ]);
        return {
          emoji: card.emoji,
          prompt: `Doplň správně: ${blanked}`,
          options: opts,
          twoCol: true,
          explain: `Správně je „${card.word}“. Je to vyjmenované slovo, píšeme tvrdé ${correct}.`
        };
      } else {
        // Vyber slovo k obrázku
        const others = shuffle(pool.filter((c) => c.word !== card.word)).slice(0, 3);
        const opts = shuffle([card, ...others]).map((c) => ({ label: c.word, correct: c.word === card.word }));
        return {
          emoji: card.emoji,
          prompt: `Které slovo patří k obrázku?`,
          options: opts,
          twoCol: false,
          explain: `Je to „${card.word}“. ${card.note}`
        };
      }
    });
  }

  /* ----------------------------------------------------------------------
     KVÍZ – vykreslení a průběh
     ---------------------------------------------------------------------- */
  let quizState = null;

  function renderQuiz(sid, tid) {
    const s = DATA.findSubject(sid);
    const t = DATA.findTopic(sid, tid);
    if (!s || !t || t.type === "soon") return go(`/subject/${sid}`);

    pushRecent(sid, tid);
    const questions = buildQuestions(s, t);
    if (!questions.length) return go(`/topic/${sid}/${tid}`);

    quizState = { s, t, sid, tid, questions, idx: 0, correct: 0, wrong: 0, answered: false };
    drawQuestion();
  }

  function drawQuestion() {
    const q = quizState;
    const s = q.s;
    const question = q.questions[q.idx];
    const num = q.idx + 1;
    const totalQ = q.questions.length;
    const pct = Math.round((q.idx / totalQ) * 100);

    const speakBtn = question.audio
      ? `<button class="iconbtn speak" id="qSpeak" style="margin-top:12px">${question.speakLabel || "🔊 Přehrát slovo"}</button>`
      : "";

    app.innerHTML = `
      <div class="quiz-head">
        <button class="backbtn" id="qExit">✕</button>
        <div class="quiz-progress bar"><span style="width:${pct}%"></span></div>
        <div style="font-weight:900;color:${s.color}">${num}/${totalQ}</div>
      </div>

      <div class="quiz-q" style="--accent:${s.color}">
        <div class="q-emoji">${question.emoji}</div>
        <div class="q-text">${question.prompt}</div>
        ${speakBtn}
      </div>

      <div class="options ${question.twoCol ? "two" : ""}" id="options">
        ${question.options
          .map((o, i) =>
            `<button class="opt" data-opt="${i}">${o.emoji ? `<span class="opt-emoji">${o.emoji}</span>` : ""}${o.label}</button>`
          )
          .join("")}
      </div>

      <div id="fbSlot"></div>
    `;

    q.answered = false;

    $("#qExit").addEventListener("click", () => go(`/topic/${q.sid}/${q.tid}`));
    if ($("#qSpeak")) $("#qSpeak").addEventListener("click", () => speak(question.audio));
    if (question.autoSpeak) setTimeout(() => speak(question.audio), 350);

    $$("#options .opt").forEach((btn) =>
      btn.addEventListener("click", () => answer(+btn.dataset.opt))
    );
  }

  function answer(optIdx) {
    const q = quizState;
    if (q.answered) return;
    q.answered = true;

    const question = q.questions[q.idx];
    const chosen = question.options[optIdx];
    const isCorrect = !!chosen.correct;

    store.stats.answered += 1;
    if (isCorrect) { store.stats.correct += 1; q.correct += 1; }
    else { q.wrong += 1; }
    save();

    // Zvýrazni odpovědi
    $$("#options .opt").forEach((btn, i) => {
      const o = question.options[i];
      if (o.correct) btn.classList.add("correct");
      else if (i === optIdx) btn.classList.add("wrong");
      else btn.classList.add("dim");
      btn.style.pointerEvents = "none";
    });

    const last = q.idx === q.questions.length - 1;
    const fb = $("#fbSlot");
    fb.innerHTML = `
      <div class="feedback ${isCorrect ? "good" : "bad"}">
        ${isCorrect ? "🎉 Skvěle! Tohle máš správně." : "🙂 Skoro! Zkus se podívat ještě jednou."}
        <span class="expl">${question.explain}</span>
      </div>
      <div class="btn-row">
        <button class="btn" id="nextBtn" style="--accent:${q.s.color}">${last ? "🏁 Výsledek" : "Další otázka ›"}</button>
      </div>`;

    if (isCorrect) { sparkle(); lumiPraise("Skvělá práce!"); }
    else if (q.wrong === 2) { lumiPraise("Marťo, snaž se víc!"); }

    $("#nextBtn").addEventListener("click", () => {
      if (last) finishQuiz();
      else { q.idx += 1; drawQuestion(); window.scrollTo(0, 0); }
    });
    $("#fbSlot").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function finishQuiz() {
    const q = quizState;
    const total = q.questions.length;
    const pct = Math.round((q.correct / total) * 100);
    recordResult(q.sid, q.tid, q.t.name, pct);

    let medal, msg;
    if (pct >= 90) { medal = "🏆"; msg = "Skvělá práce!"; }
    else if (pct >= 70) { medal = "🥇"; msg = "Docela to ušlo!"; }
    else if (pct >= 50) { medal = "🥈"; msg = "Pojďme zopakovat cvičení, ať jsi lepší!"; }
    else if (pct >= 30) { medal = "🌱"; msg = "Musíme se učit!"; }
    else { medal = "💪"; msg = "Musíme se to naučit!"; }

    app.innerHTML = `
      <div class="result">
        <div class="medal">${medal}</div>
        <div class="score">${q.correct} / ${total}</div>
        <div class="percent">${pct}% úspěšnost</div>
        <div class="msg">${msg}</div>
        <p style="color:var(--muted);font-weight:700">Dnes jsi zvládl ${q.correct} z ${total} otázek.</p>
        <div class="btn-row">
          <button class="btn purple" id="againBtn">🔁 Zkusit znovu</button>
          <button class="btn secondary" id="learnBtn">📖 Zpět na učivo</button>
        </div>
      </div>`;

    if (pct >= 70) bigConfetti();
    lumiPraise(msg);

    // restart voláme přímo – hash zůstává stejný, takže go() by nic neudělalo
    $("#againBtn").addEventListener("click", () => renderQuiz(q.sid, q.tid));
    $("#learnBtn").addEventListener("click", () => go(`/topic/${q.sid}/${q.tid}`));
  }

  /* ----------------------------------------------------------------------
     Obrazovka: PROCVIČOVÁNÍ (výběr tématu ke kvízu)
     ---------------------------------------------------------------------- */
  function renderPractice() {
    let html = `<div class="topbar"><h2>🎯 Procvičování</h2></div>
      <p style="color:var(--muted);font-weight:700;margin:2px 0 10px">Vyber téma a otestuj se v kvízu.</p>`;

    DATA.subjects.forEach((s) => {
      const rows = s.topics
        .filter((t) => t.type !== "soon")
        .map((t) => {
          const prog = store.progress[topicKey(s.id, t.id)];
          const meta = prog ? `<span class="progress-pill">nejlíp ${prog.best}%</span>` : "";
          return `<button class="topic" data-quiz="${s.id}/${t.id}" style="--accent:${s.color}">
            <span class="ic">${t.icon}</span>
            <span class="nm">${t.name}</span>
            <span class="meta">${meta}<span style="color:${s.color};font-size:20px">🎯</span></span>
          </button>`;
        })
        .join("");
      html += `<div class="section-h"><span class="dot" style="color:${s.color}"></span>${s.name}</div>
        <div class="topic-list">${rows}</div>`;
    });

    app.innerHTML = html;
    $$(".topic[data-quiz]").forEach((b) =>
      b.addEventListener("click", () => {
        const [sid, tid] = b.dataset.quiz.split("/");
        go(`/quiz/${sid}/${tid}`);
      })
    );
  }

  /* ----------------------------------------------------------------------
     Obrazovka: OBLÍBENÉ
     ---------------------------------------------------------------------- */
  function renderFavorites() {
    let html = `<div class="topbar"><h2>⭐ Oblíbené</h2></div>`;

    // Naposledy otevřené
    if (store.recent.length) {
      const recent = store.recent.map(parseTopicKey).filter(Boolean).slice(0, 3);
      html += `<div class="section-h"><span class="dot" style="color:var(--blue)"></span>Naposledy otevřené</div>`;
      html += recent
        .map(
          (o) => `<div class="recent" data-topic="${o.sid}/${o.tid}">
            <span class="r-ic">${o.t.icon}</span>
            <div><div style="font-weight:900">${o.t.name}</div>
            <div style="color:var(--muted);font-size:13px;font-weight:700">${o.s.name}</div></div>
            <span class="r-arrow">›</span>
          </div>`
        )
        .join("");
    }

    // Oblíbená témata
    const favT = store.favTopics.map(parseTopicKey).filter(Boolean);
    html += `<div class="section-h"><span class="dot" style="color:var(--orange)"></span>Oblíbená témata</div>`;
    html += favT.length
      ? `<div class="topic-list">${favT.map(favTopicRowHTML).join("")}</div>`
      : emptyMini("Zatím žádná oblíbená témata. Klikni na ☆ u tématu.");

    // Oblíbená slovíčka / kartičky
    const favC = store.favCards.map(parseCardKey).filter(Boolean);
    html += `<div class="section-h"><span class="dot" style="color:var(--green)"></span>Oblíbená slovíčka</div>`;
    html += favC.length
      ? `<div class="flashwrap">${favC.map((o) => favCardHTML(o)).join("")}</div>`
      : emptyMini("Zatím žádná oblíbená slovíčka. Klikni na ☆ Oblíbené u kartičky.");

    if (!favT.length && !favC.length && !store.recent.length) {
      html = `<div class="topbar"><h2>⭐ Oblíbené</h2></div>
        <div class="empty">
          <div class="e-emoji">⭐</div>
          <div class="e-title">Zatím je tu prázdno</div>
          <p>Označ si oblíbená témata a slovíčka hvězdičkou<br>a najdeš je rychle tady.</p>
        </div>`;
    }

    app.innerHTML = html;

    $$(".recent[data-topic]").forEach((b) =>
      b.addEventListener("click", () => {
        const [sid, tid] = b.dataset.topic.split("/");
        go(`/topic/${sid}/${tid}`);
      })
    );
    bindTopicRows();
    // poslech u oblíbených slovíček
    $$("[data-speak]").forEach((b) => b.addEventListener("click", () => speak(b.dataset.speak)));
    // odebrání oblíbené kartičky
    $$("[data-unfav]").forEach((b) =>
      b.addEventListener("click", () => {
        const k = b.dataset.unfav;
        store.favCards = store.favCards.filter((x) => x !== k);
        save();
        renderFavorites();
      })
    );
  }

  function parseCardKey(k) {
    const [sid, tid, id] = k.split("/");
    const t = DATA.findTopic(sid, tid);
    if (!t || !t.cards) return null;
    const card = t.cards.find((c) => cardId(c) === id);
    return card ? { sid, tid, card, s: DATA.findSubject(sid), key: k } : null;
  }

  function favCardHTML(o) {
    const c = o.card;
    const body = c.en
      ? `<div class="big-emoji">${c.emoji}</div><div class="en">${c.en}</div><div class="cs-under">${c.cs}</div>`
      : `<div class="big-emoji">${c.emoji}</div><div class="word">${highlightWord(c.word, c.hl)}</div><div class="note">${c.note}</div>`;
    const speakBtn = c.en ? `<button class="iconbtn speak" data-speak="${c.en}">🔊 Poslech</button>` : "";
    return `<div class="flash" style="--accent:${o.s.color}">
      ${body}
      <div class="card-actions">
        ${speakBtn}
        <button class="iconbtn fav-on" data-unfav="${o.key}">★ Odebrat</button>
      </div>
    </div>`;
  }

  function emptyMini(text) {
    return `<div class="line-item" style="justify-content:center;color:var(--muted);text-align:center">${text}</div>`;
  }

  /* ----------------------------------------------------------------------
     Obrazovka: NASTAVENÍ / PRO RODIČE
     ---------------------------------------------------------------------- */
  function renderSettings() {
    const answered = store.stats.answered;
    const correct = store.stats.correct;
    const acc = answered ? Math.round((correct / answered) * 100) : 0;
    const progEntries = Object.entries(store.progress);

    let list = progEntries.length
      ? progEntries
          .map(
            ([k, p]) =>
              `<div class="line-item"><span>${p.name}</span><span class="v">${p.best}% · ${p.attempts}×</span></div>`
          )
          .join("")
      : emptyMini("Dítě zatím neprocvičovalo žádné téma.");

    app.innerHTML = `
      <div class="topbar">
        <button class="backbtn" id="back">‹</button>
        <h2>⚙️ Pro rodiče</h2>
      </div>
      <p style="color:var(--muted);font-weight:700;margin:2px 0 6px">Přehled procvičování. Data jsou uložená jen v tomto zařízení.</p>

      <div class="stat-grid">
        <div class="stat"><div class="num">${practicedCount()}</div><div class="lab">procvičených témat</div></div>
        <div class="stat"><div class="num">${answered}</div><div class="lab">zodpovězených otázek</div></div>
        <div class="stat"><div class="num">${correct}</div><div class="lab">správných odpovědí</div></div>
        <div class="stat"><div class="num">${acc}%</div><div class="lab">celková úspěšnost</div></div>
      </div>

      <div class="section-h"><span class="dot" style="color:var(--blue)"></span>Procvičovaná témata</div>
      <div class="list-lines">${list}</div>

      <div class="section-h"><span class="dot" style="color:var(--orange)"></span>Správa dat</div>
      <p style="color:var(--muted);font-weight:700;font-size:13px;margin-top:0">
        Aplikace nevyžaduje přihlášení ani nesbírá osobní údaje. Vlastní učivo půjde přidávat v příští verzi.
      </p>
      <div class="btn-row">
        <button class="btn danger" id="clearBtn">🗑️ Vymazat všechna data</button>
      </div>
    `;

    $("#back").addEventListener("click", () => go("/home"));
    $("#clearBtn").addEventListener("click", () => {
      if (confirm("Opravdu vymazat všechna uložená data (průběh i oblíbené)? Tuto akci nelze vrátit zpět.")) {
        store = { ...defaultStore, stats: { answered: 0, correct: 0 } };
        try { localStorage.removeItem(KEY); } catch (e) {}
        toast("Data byla vymazána");
        go("/home");
      }
    });
  }

  /* ----------------------------------------------------------------------
     Efekty: jiskřičky a konfety
     ---------------------------------------------------------------------- */
  function sparkle() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#39ff14", "#00e5ff", "#b026ff", "#ff9800"];
    for (let i = 0; i < 12; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = 40 + rand(20) + "%";
      c.style.top = "35%";
      c.style.background = pick(colors);
      c.style.animation = `fall ${0.8 + Math.random()}s ease-in forwards`;
      c.style.transform = `translateX(${rand(120) - 60}px)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 1800);
    }
  }
  function bigConfetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#39ff14", "#00e5ff", "#b026ff", "#ff9800", "#ff4fd8"];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = rand(100) + "%";
      c.style.background = pick(colors);
      c.style.animationDelay = Math.random() * 0.5 + "s";
      c.style.animation = `fall ${1.2 + Math.random() * 1.2}s ease-in forwards`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2600);
    }
  }

  /* ----------------------------------------------------------------------
     Instalace PWA
     ---------------------------------------------------------------------- */
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (location.hash.replace(/^#\/?/, "").split("/")[0] === "home" || !location.hash) {
      const banner = $(".install-banner");
      if (banner) banner.hidden = false;
    }
  });

  function installBannerHTML() {
    // Zobrazíme jen když je instalace dostupná (jinak skryto)
    return `<div class="install-banner" ${deferredPrompt ? "" : "hidden"} id="installBanner">
      <span style="font-size:28px">📲</span>
      <div class="ib-txt">Nainstaluj si MartyStudy na plochu!
        <small>Rychlý start a učení i bez internetu.</small>
      </div>
      <button class="btn small" id="installBtn" style="width:auto">Přidat</button>
    </div>`;
  }
  function bindInstall() {
    const btn = $("#installBtn");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      if (!deferredPrompt) {
        toast("V menu prohlížeče zvol „Přidat na plochu“ 📲");
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") toast("Aplikace se instaluje 🎉");
      deferredPrompt = null;
      const banner = $("#installBanner");
      if (banner) banner.hidden = true;
    });
  }

  /* ----------------------------------------------------------------------
     Spodní navigace
     ---------------------------------------------------------------------- */
  $$(".navbtn").forEach((b) =>
    b.addEventListener("click", () => go("/" + b.dataset.nav))
  );

  /* ----------------------------------------------------------------------
     Start
     ---------------------------------------------------------------------- */
  window.addEventListener("hashchange", router);
  if (!location.hash) location.hash = "#/home";
  router();

  // Lumi pozdraví hned po otevření aplikace
  greetLumi();

  // Service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
