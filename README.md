# MartyStudy 🤖📚

**Uč se chytře. Pamatuj si víc.**

Zábavná, hravá a vizuální webová aplikace (PWA) pro učení pro žáka **3. třídy základní školy**. Funguje na mobilu, tabletu i počítači, jde ji nainstalovat na plochu a učit se i **bez internetu**. Nevyžaduje registraci ani přihlášení, žádná data se nikam neodesílají — vše se ukládá jen lokálně v zařízení (`localStorage`).

## 🌐 Živá aplikace

👉 **https://2r4njswzgp-lab.github.io/MartyStudy/**

Na mobilu si ji přes „Přidat na plochu" uložíš jako aplikaci.

## ✨ Co umí

- **Předměty a témata:** Český jazyk, Matematika, Angličtina
- **Obrázkové kartičky** s emoji, vysvětlením, příkladovou větou a poslechem (u angličtiny i český překlad věty)
- **Procvičování** — pestré kvízy: doplň i/y, doplň Ž/Š, vyber překlad, poslechni a vyber obrázek, doplň slovo do věty, převody jednotek, násobilka a další
- **Kamarád Lumi** 🤖 — interaktivní pomocník, který dítě přivítá hlasem, přirozeně se hýbe a chválí ho („Skvělá práce!")
- **Oblíbené**, ukazatel průběhu a jednoduchá **sekce pro rodiče**
- Přátelské hlášky, pochvaly a jednoduché animace

### Obsah (výběr)
- **Čeština:** vyjmenovaná slova po B, L, M, P, S, V, Z; sekce „Ž nebo Š"
- **Matematika:** násobilka 2–10, sčítání a odčítání, jednotky délky
- **Angličtina:** čísla, barvy, zvířata, rodina, škola, dny, měsíce, tělo, jídlo, oblečení, počasí, slovesa

## 🛠️ Technologie

Čistá webová aplikace bez frameworků — HTML, CSS a vanilla JavaScript.

- PWA: `manifest.json` + service worker (`sw.js`) pro offline režim a instalaci
- Ukládání dat: `localStorage` (lokálně v zařízení)
- Hlas: Web Speech API (text-to-speech), pokud je v prohlížeči dostupný
- Bez reklam, bez sledování, bez databáze

## ▶️ Spuštění lokálně

Kvůli service workeru je potřeba appku otevřít přes HTTP server (ne přes `file://`):

```bash
python3 -m http.server 8137
```

Pak otevři `http://localhost:8137`.

## 📁 Struktura

```
index.html          – kostra + spodní navigace
manifest.json       – PWA manifest
sw.js               – service worker (offline)
css/styles.css      – neonový vzhled, animace
js/data.js          – veškerý obsah (předměty, témata, kartičky)
js/app.js           – logika (router, kvízy, oblíbené, Lumi)
icons/              – ikony aplikace
img/lumi.png        – maskot Lumi
```

## 🔒 Soukromí

Aplikace je určená dětem. Nesbírá žádné osobní údaje, nevyžaduje účet a nepoužívá žádné sledovací nástroje. Průběh učení a oblíbené položky zůstávají pouze v prohlížeči daného zařízení.
