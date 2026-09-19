/* ==========================================================================
   MartyStudy – Cloudflare Pages Function
   Vydává KRÁTKODOBÝ (efemérní) token pro OpenAI Realtime API.
   Permanentní OPENAI_API_KEY je pouze zde (Cloudflare Secret) – NIKDY ve frontendu.

   Bindings / proměnné v nastavení Pages projektu:
     - OPENAI_API_KEY  (Secret, povinné)
     - LUMI_KV         (KV Namespace, volitelné – kvůli limitům)
     - DAILY_LIMIT     (proměnná, volitelné, výchozí 40)  – max sessions na IP a den
     - MINUTE_LIMIT    (proměnná, volitelné, výchozí 5)   – max sessions na IP za minutu
   ========================================================================== */

// Model a hlas – tady se dají snadno změnit
const MODEL = "gpt-realtime";
const VOICE = "marin";
const TOKEN_TTL_SECONDS = 120; // platnost efemérního tokenu

// Systémový prompt Lumiho (na serveru → dítě ho nemůže obejít, klíč tu není)
const LUMI_INSTRUCTIONS = `
Jsi Lumi – přátelský robotický kamarád a výukový průvodce.
Vždy předpokládej, že mluvíš s dítětem přibližně osmiletým. Mluvíš primárně česky a češtinu vyslovuj správně.

STYL:
- Mluv velmi přirozeně, mile, klidně a energicky, jednoduchými slovy.
- Odpovědi jsou KRÁTKÉ, obvykle 2–5 vět. Žádné dlouhé přednášky.
- Když použiješ odborné slovo, hned ho jednoduše vysvětli a dej příklad, kterému dítě rozumí.

UČITEL:
- U školních úkolů neříkej hned výsledek. Naváděj dítě otázkami, ať na to přijde samo.
- Chval snahu, ne jen správnou odpověď. Nikdy dítě nezesměšňuj.
- Při chybě řekni něco jako: „Skoro! Zkusíme ještě poslední krok.“

BEZPEČNOST DÍTĚTE:
- Vše musí být vhodné pro osmileté dítě.
- Otázky ohledně sexu, drog, násilí, zbraní, sebevraždy, sebepoškozování nebo nebezpečných pokusů:
  odpověz bezpečně, stručně a věkově přiměřeně, nedávej nebezpečné postupy.
- Pokud dítě naznačí skutečné nebezpečí nebo problém, doporuč mu to říct rodiči nebo důvěryhodnému dospělému.

SOUKROMÍ:
- Nevyžaduj celé jméno, adresu, telefon, heslo, školu, přesnou polohu ani platební údaje.
- Když je dítě začne říkat, jemně upozorni: „Takové osobní informace si raději nech pro sebe a rodiče.“

PAMĚŤ:
- V rámci aktuálního povídání si pamatuj předchozí otázky (např. když se dítě ptá „a jak dlouho bych tam letěl?“, ví se, že jde o Mars).
`.trim();

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.OPENAI_API_KEY) {
      return json({ error: "Server zatím není nastavený (chybí OPENAI_API_KEY)." }, 500);
    }

    // --- ochrana proti zneužití (rate limiting) ---
    const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const limitMsg = await checkRateLimit(env, ip);
    if (limitMsg) return json({ error: limitMsg }, 429);

    // --- vytvoření efemérního tokenu u OpenAI ---
    const payload = {
      session: {
        type: "realtime",
        model: MODEL,
        instructions: LUMI_INSTRUCTIONS,
        audio: {
          output: { voice: VOICE },
          input: {
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 650,
              create_response: true,
              interrupt_response: true
            }
          }
        }
      },
      expires_after: { anchor: "created_at", seconds: TOKEN_TTL_SECONDS }
    };

    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 10000); // timeout 10 s
    let resp;
    try {
      resp = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
    } finally {
      clearTimeout(to);
    }

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return json({ error: "OpenAI odmítlo požadavek.", detail: data?.error || data }, 502);
    }

    // efemérní token může přijít jako data.value nebo data.client_secret.value
    const token = data.value || data.client_secret?.value || null;
    if (!token) return json({ error: "Nepodařilo se získat token.", detail: data }, 502);

    return json({
      token,
      model: MODEL,
      voice: VOICE,
      expires_at: data.expires_at || null
    });
  } catch (e) {
    return json({ error: "Chyba serveru.", detail: String(e) }, 500);
  }
}

// Jednoduchý limiter přes KV (na IP): denní i minutový strop.
async function checkRateLimit(env, ip) {
  if (!env.LUMI_KV) return null; // bez KV se limit přeskočí (doporučeno KV nastavit)
  const dailyLimit = parseInt(env.DAILY_LIMIT || "40", 10);
  const minuteLimit = parseInt(env.MINUTE_LIMIT || "5", 10);

  const day = new Date().toISOString().slice(0, 10);
  const dayKey = `d:${day}:${ip}`;
  const minKey = `m:${Math.floor(Date.now() / 60000)}:${ip}`;

  const [dRaw, mRaw] = await Promise.all([env.LUMI_KV.get(dayKey), env.LUMI_KV.get(minKey)]);
  const dCount = parseInt(dRaw || "0", 10);
  const mCount = parseInt(mRaw || "0", 10);

  if (dCount >= dailyLimit) return "Dnešní limit povídání s Lumim je vyčerpaný. Zkus to zase zítra. 🌙";
  if (mCount >= minuteLimit) return "Chviličku počkej a zkus to znovu. ⏳";

  await Promise.all([
    env.LUMI_KV.put(dayKey, String(dCount + 1), { expirationTtl: 172800 }), // 2 dny
    env.LUMI_KV.put(minKey, String(mCount + 1), { expirationTtl: 120 })
  ]);
  return null;
}
