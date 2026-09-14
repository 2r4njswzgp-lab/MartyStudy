/* ==========================================================================
   MartyStudy – obsah aplikace (data)
   Všechno je v jednom souboru, aby to fungovalo i offline bez sítě.
   ========================================================================== */

/* Typy témat:
   'vyjm'  – vyjmenovaná slova (kartička: slovo + zvýrazněné y/ý, kvíz y/i)
   'vocab' – slovíčka (angličtina: en + cs + emoji + věta + překlad věty)
   'times' – násobilka (generovaný kvíz, factor = číslo)
   'arith' – sčítání a odčítání (generovaný kvíz)
   'soon'  – téma se připravuje (Brzy doplníme)

   U anglických slovíček:
   en       – anglické slovo
   cs       – český překlad
   sentence – anglická věta (čtení + poslech + cvičení „doplň slovo")
   scs      – český překlad věty (aby dítě větě rozumělo)
*/

const DATA = {
  subjects: [
    {
      id: "cj",
      name: "Český jazyk",
      short: "Čeština",
      color: "#b026ff",
      color2: "#e15bff",
      icon: "📚",
      topics: [
        {
          id: "vyjm-b", name: "Vyjmenovaná slova po B", icon: "🅱️", type: "vyjm",
          cards: [
            { word: "být", hl: "ý", emoji: "🧍", note: "Znamená existovat.", sentence: "Chci být zdravý." },
            { word: "bydlit", hl: "y", emoji: "🏠", note: "Někde žít, mít domov.", sentence: "Budeme bydlit u lesa." },
            { word: "obyvatel", hl: "y", emoji: "🧑", note: "Člověk, který někde bydlí.", sentence: "Je to obyvatel našeho města." },
            { word: "byt", hl: "y", emoji: "🏢", note: "Místo, kde bydlíme v domě.", sentence: "Máme nový byt." },
            { word: "příbytek", hl: "y", emoji: "🏡", note: "Místo, kde někdo bydlí.", sentence: "Ježek má příbytek v listí." },
            { word: "nábytek", hl: "y", emoji: "🪑", note: "Stůl, židle, skříň.", sentence: "Koupili jsme nový nábytek." },
            { word: "dobytek", hl: "y", emoji: "🐄", note: "Domácí zvířata na statku.", sentence: "Sedlák pase dobytek." },
            { word: "obyčej", hl: "y", emoji: "🎭", note: "Starý zvyk, tradice.", sentence: "Je to starý vánoční obyčej." },
            { word: "bystrý", hl: "y", emoji: "🦊", note: "Chytrý a rychlý.", sentence: "Lišák je bystrý." },
            { word: "bylina", hl: "y", emoji: "🌿", note: "Zelená léčivá rostlina.", sentence: "Máta je voňavá bylina." },
            { word: "kobyla", hl: "y", emoji: "🐴", note: "Koňská samice.", sentence: "Kobyla má malé hříbě." },
            { word: "býk", hl: "ý", emoji: "🐂", note: "Silné zvíře, samec krávy.", sentence: "Na louce stojí velký býk." },
            { word: "babyka", hl: "y", emoji: "🍁", note: "Druh javoru (strom).", sentence: "Babyka roste u cesty." }
          ]
        },
        {
          id: "vyjm-l", name: "Vyjmenovaná slova po L", icon: "🇱", type: "vyjm",
          cards: [
            { word: "slyšet", hl: "y", emoji: "👂", note: "Vnímat zvuky ušima.", sentence: "Je slyšet ptáčky." },
            { word: "mlýn", hl: "ý", emoji: "🌀", note: "Mele obilí na mouku.", sentence: "U řeky stojí starý mlýn." },
            { word: "blýskat se", hl: "ý", emoji: "⚡", note: "Svítit jako blesk.", sentence: "Na nebi se blýská." },
            { word: "polykat", hl: "y", emoji: "😋", note: "Nechat jídlo sklouznout do krku.", sentence: "Nesmíš polykat sousta rychle." },
            { word: "plynout", hl: "y", emoji: "🌊", note: "Pomalu téci.", sentence: "Řeka klidně plyne." },
            { word: "plýtvat", hl: "ý", emoji: "💸", note: "Zbytečně utrácet.", sentence: "Nesmíme plýtvat vodou." },
            { word: "vzlykat", hl: "y", emoji: "😢", note: "Plakat s popotahováním.", sentence: "Nemusíš vzlykat, pomůžu ti." },
            { word: "lysý", hl: "y", emoji: "👨‍🦲", note: "Bez vlasů, holohlavý.", sentence: "Dědeček je trochu lysý." },
            { word: "lýtko", hl: "ý", emoji: "🦵", note: "Zadní část nohy pod kolenem.", sentence: "Po běhu mě bolí lýtko." },
            { word: "lýko", hl: "ý", emoji: "🪵", note: "Vrstva pod kůrou stromu.", sentence: "Lýko drží strom pohromadě." },
            { word: "lyže", hl: "y", emoji: "⛷️", note: "Jezdíme na nich po sněhu.", sentence: "V zimě jezdím na lyže." },
            { word: "pelyněk", hl: "y", emoji: "🌱", note: "Hořká bylinka.", sentence: "Pelyněk hořce voní." },
            { word: "plyš", hl: "y", emoji: "🧸", note: "Měkká látka na hračky.", sentence: "Mám medvídka z plyše." }
          ]
        },
        {
          id: "vyjm-m", name: "Vyjmenovaná slova po M", icon: "🇲", type: "vyjm",
          cards: [
            { word: "my", hl: "y", emoji: "👥", note: "Já a ostatní dohromady.", sentence: "My jsme kamarádi." },
            { word: "mýt", hl: "ý", emoji: "🧼", note: "Čistit vodou a mýdlem.", sentence: "Musíš si mýt ruce." },
            { word: "myslit", hl: "y", emoji: "🤔", note: "Přemýšlet hlavou.", sentence: "Musíš myslit na úkol." },
            { word: "mýlit se", hl: "ý", emoji: "❌", note: "Udělat chybu, splést se.", sentence: "Každý se může mýlit." },
            { word: "hmyz", hl: "y", emoji: "🐜", note: "Brouci, mravenci, mouchy.", sentence: "Na louce žije hmyz." },
            { word: "myš", hl: "y", emoji: "🐭", note: "Malý hlodavec.", sentence: "Myš schovala sýr." },
            { word: "hlemýžď", hl: "ý", emoji: "🐌", note: "Šnek s ulitou.", sentence: "Hlemýžď leze pomalu." },
            { word: "mýtit", hl: "ý", emoji: "🪓", note: "Kácet les.", sentence: "Nesmíme mýtit lesy." },
            { word: "zamykat", hl: "y", emoji: "🔒", note: "Zavírat na klíč.", sentence: "Nezapomeň zamykat dveře." },
            { word: "smýkat", hl: "ý", emoji: "🛷", note: "Táhnout něco po zemi.", sentence: "Nesmýkej tašku po zemi." },
            { word: "dmýchat", hl: "ý", emoji: "🔥", note: "Foukat do ohně.", sentence: "Kovář dmýchá do výhně." },
            { word: "chmýří", hl: "ý", emoji: "🪶", note: "Jemné chloupky nebo peří.", sentence: "Kuřátko má měkké chmýří." },
            { word: "nachomýtnout se", hl: "ý", emoji: "👀", note: "Náhodou se objevit.", sentence: "Nachomýtl se k nám kamarád." },
            { word: "Litomyšl", hl: "y", emoji: "🏰", note: "Město se zámkem.", sentence: "Byli jsme na zámku v Litomyšli." }
          ]
        },
        {
          id: "vyjm-p", name: "Vyjmenovaná slova po P", icon: "🇵", type: "vyjm",
          cards: [
            { word: "pýcha", hl: "ý", emoji: "😤", note: "Když je někdo namyšlený.", sentence: "Pýcha není hezká." },
            { word: "pytel", hl: "y", emoji: "🛍️", note: "Velký sáček na věci.", sentence: "Pytel je plný brambor." },
            { word: "pysk", hl: "y", emoji: "👄", note: "Ret u zvířete.", sentence: "Kůň má měkké pysky." },
            { word: "netopýr", hl: "ý", emoji: "🦇", note: "Létá v noci, spí přes den.", sentence: "Netopýr visí hlavou dolů." },
            { word: "slepýš", hl: "ý", emoji: "🦎", note: "Beznohá ještěrka, ne had.", sentence: "Slepýš se schoval v trávě." },
            { word: "pyl", hl: "y", emoji: "🌼", note: "Žlutý prášek z květů.", sentence: "Včely sbírají pyl." },
            { word: "kopyto", hl: "y", emoji: "🐴", note: "Tvrdá noha koně.", sentence: "Kůň má na noze kopyto." },
            { word: "klopýtat", hl: "ý", emoji: "🤸", note: "Zakopávat při chůzi.", sentence: "Ve tmě začal klopýtat." },
            { word: "třpytit se", hl: "y", emoji: "✨", note: "Krásně se lesknout.", sentence: "Hvězdy se třpytí na nebi." },
            { word: "zpytovat", hl: "y", emoji: "🧐", note: "Zkoumat, přemýšlet.", sentence: "Musíš zpytovat svědomí." },
            { word: "pykat", hl: "y", emoji: "⛓️", note: "Nést trest za chybu.", sentence: "Za lež musel pykat." },
            { word: "pýr", hl: "ý", emoji: "🌾", note: "Plevel s dlouhými kořeny.", sentence: "Na poli roste pýr." },
            { word: "pýřit se", hl: "ý", emoji: "😳", note: "Červenat se studem.", sentence: "Začala se pýřit." },
            { word: "čepýřit se", hl: "ý", emoji: "🐓", note: "Načechrávat si peří.", sentence: "Kohout se čepýří." }
          ]
        },
        {
          id: "vyjm-s", name: "Vyjmenovaná slova po S", icon: "🇸", type: "vyjm",
          cards: [
            { word: "syn", hl: "y", emoji: "👦", note: "Chlapec svých rodičů.", sentence: "Je to syn paní učitelky." },
            { word: "sytý", hl: "y", emoji: "😋", note: "Když už nemám hlad.", sentence: "Po obědě jsem sytý." },
            { word: "sýr", hl: "ý", emoji: "🧀", note: "Jídlo z mléka.", sentence: "Mám rád tavený sýr." },
            { word: "syrový", hl: "y", emoji: "🥩", note: "Tepelně neupravený.", sentence: "Syrové maso se nejí." },
            { word: "sychravý", hl: "y", emoji: "🌫️", note: "Chladný a vlhký.", sentence: "Venku je sychravý den." },
            { word: "usychat", hl: "y", emoji: "🥀", note: "Pomalu vadnout.", sentence: "Kytka bez vody usychá." },
            { word: "sýkora", hl: "ý", emoji: "🐦", note: "Malý zpěvný ptáček.", sentence: "Sýkora sedí na krmítku." },
            { word: "sysel", hl: "y", emoji: "🐿️", note: "Hlodavec žijící v norách.", sentence: "Sysel se schoval do nory." },
            { word: "syčet", hl: "y", emoji: "🐍", note: "Dělat zvuk jako had.", sentence: "Had začal syčet." },
            { word: "sypat", hl: "y", emoji: "🧂", note: "Nechat něco padat.", sentence: "Nesyp drobky na zem." }
          ]
        },
        {
          id: "vyjm-v", name: "Vyjmenovaná slova po V", icon: "🇻", type: "vyjm",
          cards: [
            { word: "vy", hl: "y", emoji: "🫵", note: "Já mluvím k víc lidem.", sentence: "Vy jste šikovní." },
            { word: "vysoký", hl: "y", emoji: "⛰️", note: "Sahá hodně nahoru.", sentence: "Strom je moc vysoký." },
            { word: "výt", hl: "ý", emoji: "🐺", note: "Vydávat táhlý zvuk jako vlk.", sentence: "V noci je slyšet vlka výt." },
            { word: "výskat", hl: "ý", emoji: "🙌", note: "Radostně křičet.", sentence: "Děti výskají radostí." },
            { word: "zvykat", hl: "y", emoji: "🔁", note: "Pomalu si na něco navykat.", sentence: "Musíš si zvykat na školu." },
            { word: "žvýkat", hl: "ý", emoji: "🍬", note: "Kousat jídlo v puse.", sentence: "Nesmíš žvýkat s otevřenou pusou." },
            { word: "vydra", hl: "y", emoji: "🦦", note: "Zvíře, které plave v řece.", sentence: "Vydra loví ryby." },
            { word: "výr", hl: "ý", emoji: "🦉", note: "Velká sova.", sentence: "Výr houká v noci." },
            { word: "vyžle", hl: "y", emoji: "🐕", note: "Hubené štíhlé zvíře.", sentence: "Ten pejsek je hotové vyžle." },
            { word: "povyk", hl: "y", emoji: "📣", note: "Velký hluk a křik.", sentence: "Ve třídě byl velký povyk." },
            { word: "výheň", hl: "ý", emoji: "🔥", note: "Ohniště u kováře.", sentence: "Kovář rozpálil výheň." },
            { word: "výlet", hl: "ý", emoji: "🎒", note: "Slova s předponou vy-/vý- píšeme tvrdě.", sentence: "Jedeme na výlet." }
          ]
        },
        {
          id: "vyjm-z", name: "Vyjmenovaná slova po Z", icon: "🇿", type: "vyjm",
          cards: [
            { word: "brzy", hl: "y", emoji: "⏰", note: "Za krátkou dobu.", sentence: "Přijď zpátky brzy." },
            { word: "jazyk", hl: "y", emoji: "👅", note: "Sval v puse, i řeč.", sentence: "Učím se anglický jazyk." },
            { word: "nazývat se", hl: "ý", emoji: "🗣️", note: "Mít nějaké jméno.", sentence: "Ta hra se nazývá honička." },
            { word: "Ruzyně", hl: "y", emoji: "✈️", note: "Místo, kde je letiště.", sentence: "Letadlo přistálo v Ruzyni." }
          ]
        },
        {
          id: "zs", name: "Ž nebo Š – jak to poznat", icon: "📘", type: "zs",
          intro: "Písmena Ž a Š jsou si podobná, ale patří do jiných slov. Při porovnávání (nízký → nižší) si vždy řekni celé slovo nahlas. 🧠",
          bank: ["vyšší", "nižší", "bližší", "dražší", "tišší", "těžší", "lehčí", "menší", "delší", "užší"],
          base: [
            ["nízký", "nižší"], ["vysoký", "vyšší"], ["blízký", "bližší"], ["drahý", "dražší"], ["tichý", "tišší"],
            ["těžký", "těžší"], ["dlouhý", "delší"], ["úzký", "užší"], ["malý", "menší"], ["lehký", "lehčí"]
          ],
          sent: [
            ["Žirafa je ___ než pes.", "vyšší"],
            ["Malá židle je ___ než stůl.", "nižší"],
            ["Plný batoh je ___ než prázdný.", "těžší"],
            ["Pírko je ___ než kámen.", "lehčí"],
            ["Šeptání je ___ než křik.", "tišší"],
            ["Nové kolo je ___ než staré.", "dražší"],
            ["Myš je ___ než kočka.", "menší"],
            ["Tato cesta je ___ než ta druhá.", "delší"],
            ["Tento chodník je ___ než silnice.", "užší"],
            ["Tento obchod je ___ než ten na druhém konci města.", "bližší"]
          ],
          cards: [
            { word: "žába", hl: "ž", emoji: "🐸", note: "Skáče u vody.", sentence: "Žába skáče do rybníka." },
            { word: "židle", hl: "ž", emoji: "🪑", note: "Sedíme na ní.", sentence: "Sedni si na židli." },
            { word: "žlutý", hl: "ž", emoji: "🟡", note: "Barva jako slunce.", sentence: "Banán je žlutý." },
            { word: "žirafa", hl: "ž", emoji: "🦒", note: "Zvíře s dlouhým krkem.", sentence: "Žirafa je vysoká." },
            { word: "škola", hl: "š", emoji: "🏫", note: "Chodíme se sem učit.", sentence: "Ráno jdu do školy." },
            { word: "šála", hl: "š", emoji: "🧣", note: "Nosíme ji na krku v zimě.", sentence: "Vezmi si teplou šálu." },
            { word: "švestka", hl: "š", emoji: "🫐", note: "Modré sladké ovoce.", sentence: "Snědl jsem švestku." },
            { word: "šípek", hl: "š", emoji: "🌹", note: "Červený plod šípkové růže.", sentence: "Z šípků vaříme čaj." },
            { word: "nižší", hl: "ž", emoji: "📏", note: "nízký → nižší", sentence: "Židle je nižší než stůl." },
            { word: "vyšší", hl: "š", emoji: "📐", note: "vysoký → vyšší", sentence: "Žirafa je vyšší než pes." },
            { word: "bližší", hl: "ž", emoji: "📍", note: "blízký → bližší", sentence: "Náš dům je škole bližší." },
            { word: "dražší", hl: "ž", emoji: "💰", note: "drahý → dražší", sentence: "Nové kolo je dražší." },
            { word: "tišší", hl: "š", emoji: "🤫", note: "tichý → tišší", sentence: "Šepot je tišší než křik." },
            { word: "těžší", hl: "ž", emoji: "🏋️", note: "těžký → těžší", sentence: "Plný batoh je těžší." }
          ]
        },
        {
          id: "tvrde-mekke", name: "Tvrdé a měkké souhlásky", icon: "🔤", type: "hardsoft",
          intro: "Po tvrdých souhláskách (H, CH, K, R, D, T, N) píšeme Y/Ý. Po měkkých (Ž, Š, Č, Ř, C, J, Ď, Ť, Ň) píšeme I/Í. Pozor na výjimky – vyjmenovaná slova. 🧠",
          cards: [
            { word: "hyena", hl: "y", emoji: "🐺", note: "Po tvrdém H píšeme Y.", sentence: "Hyena se hlasitě směje." },
            { word: "chyba", hl: "y", emoji: "❌", note: "Po tvrdém CH píšeme Y.", sentence: "Udělal jsem chybu." },
            { word: "kytka", hl: "y", emoji: "🌷", note: "Po tvrdém K píšeme Y.", sentence: "Dostala jsem kytku." },
            { word: "ryba", hl: "y", emoji: "🐟", note: "Po tvrdém R píšeme Y.", sentence: "Ryba plave ve vodě." },
            { word: "dýně", hl: "ý", emoji: "🎃", note: "Po tvrdém D píšeme Ý.", sentence: "Z dýně je dobrá polévka." },
            { word: "tygr", hl: "y", emoji: "🐯", note: "Po tvrdém T píšeme Y.", sentence: "Tygr má pruhy." },
            { word: "nýt", hl: "ý", emoji: "🔩", note: "Po tvrdém N píšeme Ý.", sentence: "Nýt drží plech." },
            { word: "žito", hl: "i", emoji: "🌾", note: "Po měkkém Ž píšeme I.", sentence: "Na poli roste žito." },
            { word: "šiška", hl: "i", emoji: "🌲", note: "Po měkkém Š píšeme I.", sentence: "Pod smrkem leží šiška." },
            { word: "čistý", hl: "i", emoji: "✨", note: "Po měkkém Č píšeme I.", sentence: "Mám čistý stůl." },
            { word: "řízek", hl: "í", emoji: "🍖", note: "Po měkkém Ř píšeme Í.", sentence: "K obědu je řízek." },
            { word: "cihla", hl: "i", emoji: "🧱", note: "Po měkkém C píšeme I.", sentence: "Zeď je z cihel." },
            { word: "jiskra", hl: "i", emoji: "⚡", note: "Po měkkém J píšeme I.", sentence: "Z ohně létají jiskry." },
            { word: "dítě", hl: "í", emoji: "👶", note: "Slabika DÍ je měkká – píšeme Í.", sentence: "Dítě si hraje." },
            { word: "ticho", hl: "i", emoji: "🤫", note: "Slabika TI je měkká – píšeme I.", sentence: "V knihovně je ticho." },
            { word: "nikdo", hl: "i", emoji: "🚫", note: "Slabika NI je měkká – píšeme I.", sentence: "Nikdo tu není." }
          ]
        },
        { id: "druhy-slov",  name: "Druhy slov",              icon: "🧩", type: "soon", cards: [] },
        { id: "podst-jmena", name: "Podstatná jména",         icon: "🏷️", type: "soon", cards: [] },
        { id: "slovesa-cj",  name: "Slovesa",                 icon: "🏃", type: "soon", cards: [] },
        { id: "pady",        name: "Pády",                    icon: "7️⃣", type: "soon", cards: [] },
        { id: "abeceda",     name: "Abeceda",                 icon: "🔡", type: "soon", cards: [] }
      ]
    },

    {
      id: "ma",
      name: "Matematika",
      short: "Matika",
      color: "#00e5ff",
      color2: "#57f0ff",
      icon: "🔢",
      topics: [
        { id: "nasobilka-grp", name: "Násobilka", icon: "✖️", type: "group" },
        { id: "nas-2",  name: "Násobilka 2",  icon: "2️⃣", type: "times", group: "nasobilka-grp", factor: 2 },
        { id: "nas-3",  name: "Násobilka 3",  icon: "3️⃣", type: "times", group: "nasobilka-grp", factor: 3 },
        { id: "nas-4",  name: "Násobilka 4",  icon: "4️⃣", type: "times", group: "nasobilka-grp", factor: 4 },
        { id: "nas-5",  name: "Násobilka 5",  icon: "5️⃣", type: "times", group: "nasobilka-grp", factor: 5 },
        { id: "nas-6",  name: "Násobilka 6",  icon: "6️⃣", type: "times", group: "nasobilka-grp", factor: 6 },
        { id: "nas-7",  name: "Násobilka 7",  icon: "7️⃣", type: "times", group: "nasobilka-grp", factor: 7 },
        { id: "nas-8",  name: "Násobilka 8",  icon: "8️⃣", type: "times", group: "nasobilka-grp", factor: 8 },
        { id: "nas-9",  name: "Násobilka 9",  icon: "9️⃣", type: "times", group: "nasobilka-grp", factor: 9 },
        { id: "nas-10", name: "Násobilka 10", icon: "🔟", type: "times", group: "nasobilka-grp", factor: 10 },
        { id: "deleni-grp", name: "Dělení", icon: "➗", type: "group" },
        { id: "del-2", name: "Dělení 2", icon: "2️⃣", type: "divide", group: "deleni-grp", factor: 2 },
        { id: "del-3", name: "Dělení 3", icon: "3️⃣", type: "divide", group: "deleni-grp", factor: 3 },
        { id: "del-4", name: "Dělení 4", icon: "4️⃣", type: "divide", group: "deleni-grp", factor: 4 },
        { id: "del-5", name: "Dělení 5", icon: "5️⃣", type: "divide", group: "deleni-grp", factor: 5 },
        { id: "del-6", name: "Dělení 6", icon: "6️⃣", type: "divide", group: "deleni-grp", factor: 6 },
        { id: "del-7", name: "Dělení 7", icon: "7️⃣", type: "divide", group: "deleni-grp", factor: 7 },
        { id: "del-8", name: "Dělení 8", icon: "8️⃣", type: "divide", group: "deleni-grp", factor: 8 },
        { id: "del-9", name: "Dělení 9", icon: "9️⃣", type: "divide", group: "deleni-grp", factor: 9 },
        { id: "del-10", name: "Dělení 10", icon: "🔟", type: "divide", group: "deleni-grp", factor: 10 },
        { id: "scitani-grp", name: "Sčítání a odčítání", icon: "➕", type: "group" },
        {
          id: "scit-1", name: "1. úroveň – velmi lehké", icon: "🟢", type: "calc", group: "scitani-grp",
          examples: [
            { q: "1 + 2", a: 3 },
            { q: "2 + 3", a: 5 },
            { q: "4 + 2", a: 6 },
            { q: "5 + 3", a: 8 },
            { q: "6 + 2", a: 8 },
            { q: "3 + 4", a: 7 },
            { q: "7 + 2", a: 9 },
            { q: "5 + 5", a: 10 },
            { q: "4 - 2", a: 2 },
            { q: "6 - 3", a: 3 },
            { q: "8 - 4", a: 4 },
            { q: "9 - 2", a: 7 },
            { q: "7 - 5", a: 2 },
            { q: "10 - 3", a: 7 },
            { q: "3 + 6", a: 9 },
            { q: "2 + 7", a: 9 },
            { q: "10 - 5", a: 5 },
            { q: "8 - 2", a: 6 },
            { q: "4 + 5", a: 9 },
            { q: "9 - 6", a: 3 }
          ]
        },
        {
          id: "scit-2", name: "2. úroveň – lehké", icon: "🟢", type: "calc", group: "scitani-grp",
          examples: [
            { q: "10 + 5", a: 15 },
            { q: "12 + 4", a: 16 },
            { q: "11 + 8", a: 19 },
            { q: "15 + 5", a: 20 },
            { q: "14 + 3", a: 17 },
            { q: "18 - 5", a: 13 },
            { q: "20 - 7", a: 13 },
            { q: "17 - 4", a: 13 },
            { q: "16 - 6", a: 10 },
            { q: "19 - 8", a: 11 },
            { q: "13 + 6", a: 19 },
            { q: "12 + 7", a: 19 },
            { q: "20 - 9", a: 11 },
            { q: "15 - 7", a: 8 },
            { q: "18 - 9", a: 9 },
            { q: "9 + 8", a: 17 },
            { q: "7 + 9", a: 16 },
            { q: "6 + 8", a: 14 },
            { q: "14 - 8", a: 6 },
            { q: "13 - 5", a: 8 }
          ]
        },
        {
          id: "scit-3", name: "3. úroveň – střední", icon: "🟡", type: "calc", group: "scitani-grp",
          examples: [
            { q: "25 + 10", a: 35 },
            { q: "32 + 6", a: 38 },
            { q: "41 + 8", a: 49 },
            { q: "27 + 12", a: 39 },
            { q: "36 + 13", a: 49 },
            { q: "48 - 10", a: 38 },
            { q: "45 - 12", a: 33 },
            { q: "39 - 14", a: 25 },
            { q: "50 - 17", a: 33 },
            { q: "42 - 19", a: 23 },
            { q: "18 + 15", a: 33 },
            { q: "24 + 17", a: 41 },
            { q: "29 + 16", a: 45 },
            { q: "35 + 14", a: 49 },
            { q: "28 + 22", a: 50 },
            { q: "44 - 18", a: 26 },
            { q: "37 - 19", a: 18 },
            { q: "50 - 26", a: 24 },
            { q: "46 - 27", a: 19 },
            { q: "40 - 23", a: 17 }
          ]
        },
        {
          id: "scit-4", name: "4. úroveň – těžší", icon: "🟠", type: "calc", group: "scitani-grp",
          examples: [
            { q: "45 + 28", a: 73 },
            { q: "37 + 46", a: 83 },
            { q: "29 + 54", a: 83 },
            { q: "68 + 21", a: 89 },
            { q: "47 + 36", a: 83 },
            { q: "92 - 38", a: 54 },
            { q: "85 - 47", a: 38 },
            { q: "73 - 29", a: 44 },
            { q: "100 - 46", a: 54 },
            { q: "91 - 37", a: 54 },
            { q: "54 + 27", a: 81 },
            { q: "39 + 48", a: 87 },
            { q: "62 + 29", a: 91 },
            { q: "43 + 38", a: 81 },
            { q: "56 + 34", a: 90 },
            { q: "84 - 39", a: 45 },
            { q: "76 - 28", a: 48 },
            { q: "93 - 45", a: 48 },
            { q: "81 - 36", a: 45 },
            { q: "70 - 27", a: 43 }
          ]
        },
        {
          id: "scit-5", name: "5. úroveň – kombinace", icon: "🔴", type: "calc", group: "scitani-grp",
          examples: [
            { q: "5 + 4 - 2", a: 7 },
            { q: "8 + 5 - 3", a: 10 },
            { q: "7 - 2 + 6", a: 11 },
            { q: "10 + 5 - 7", a: 8 },
            { q: "12 - 4 + 7", a: 15 },
            { q: "15 + 6 - 8", a: 13 },
            { q: "20 - 7 + 5", a: 18 },
            { q: "14 + 9 - 6", a: 17 },
            { q: "18 - 5 + 11", a: 24 },
            { q: "25 + 8 - 10", a: 23 },
            { q: "5 + 4 - 2 + 7", a: 14 },
            { q: "10 + 8 - 5 + 4", a: 17 },
            { q: "15 - 6 + 8 - 3", a: 14 },
            { q: "20 + 5 - 9 + 7", a: 23 },
            { q: "12 + 9 - 4 + 6", a: 23 },
            { q: "30 - 8 + 5 - 7", a: 20 },
            { q: "25 + 10 - 12 + 8", a: 31 },
            { q: "40 - 15 + 7 - 9", a: 23 },
            { q: "32 + 14 - 8 + 11", a: 49 },
            { q: "50 - 18 + 12 - 9", a: 35 }
          ]
        },
        { id: "pisemne",  name: "Písemné počítání",  icon: "✍️", type: "soon", cards: [] },
        {
          id: "jed-delky", name: "Jednotky délky", icon: "📏", type: "units",
          intro: "Délku měříme v jednotkách. Pamatuj: 1 cm = 10 mm, 1 dm = 10 cm, 1 m = 100 cm, 1 km = 1000 m. 📏",
          cards: [
            { word: "milimetr – mm", emoji: "📏", note: "Nejmenší běžná jednotka. 1 cm = 10 mm.", sentence: "Mince je silná asi 2 mm." },
            { word: "centimetr – cm", emoji: "📐", note: "1 cm = 10 mm.", sentence: "Guma měří asi 4 cm." },
            { word: "decimetr – dm", emoji: "📏", note: "1 dm = 10 cm.", sentence: "Sešit je široký asi 2 dm." },
            { word: "metr – m", emoji: "📐", note: "Základní jednotka. 1 m = 100 cm.", sentence: "Dveře jsou vysoké asi 2 m." },
            { word: "kilometr – km", emoji: "🛣️", note: "Největší běžná jednotka. 1 km = 1000 m.", sentence: "Do školy jdu asi 1 km." },
            { word: "1 cm = 10 mm", emoji: "🔟", note: "Centimetr má deset milimetrů.", sentence: "10 mm = 1 cm." },
            { word: "1 m = 100 cm", emoji: "💯", note: "Metr má sto centimetrů.", sentence: "100 cm = 1 m." },
            { word: "1 km = 1000 m", emoji: "🏁", note: "Kilometr má tisíc metrů.", sentence: "1000 m = 1 km." }
          ]
        },
        { id: "jed-casu", name: "Jednotky času",     icon: "🕐", type: "soon", cards: [] },
        { id: "geometrie",name: "Geometrické tvary", icon: "🔺", type: "soon", cards: [] },
        { id: "slovni",   name: "Slovní úlohy",      icon: "📖", type: "soon", cards: [] }
      ]
    },

    {
      id: "aj",
      name: "Angličtina",
      short: "Angličtina",
      color: "#39ff14",
      color2: "#7bff5a",
      icon: "🌍",
      topics: [
        {
          id: "cisla", name: "Čísla", icon: "🔢", type: "vocab",
          cards: [
            { en: "one", cs: "jedna", emoji: "1️⃣", sentence: "I have one dog.", scs: "Mám jednoho psa." },
            { en: "two", cs: "dva", emoji: "2️⃣", sentence: "I see two cats.", scs: "Vidím dvě kočky." },
            { en: "three", cs: "tři", emoji: "3️⃣", sentence: "There are three balls.", scs: "Jsou tam tři míče." },
            { en: "four", cs: "čtyři", emoji: "4️⃣", sentence: "I have four apples.", scs: "Mám čtyři jablka." },
            { en: "five", cs: "pět", emoji: "5️⃣", sentence: "I have five fingers.", scs: "Mám pět prstů." },
            { en: "six", cs: "šest", emoji: "6️⃣", sentence: "There are six eggs.", scs: "Je tam šest vajec." },
            { en: "seven", cs: "sedm", emoji: "7️⃣", sentence: "A week has seven days.", scs: "Týden má sedm dní." },
            { en: "eight", cs: "osm", emoji: "8️⃣", sentence: "A spider has eight legs.", scs: "Pavouk má osm nohou." },
            { en: "nine", cs: "devět", emoji: "9️⃣", sentence: "I can see nine stars.", scs: "Vidím devět hvězd." },
            { en: "ten", cs: "deset", emoji: "🔟", sentence: "I have ten toes.", scs: "Mám deset prstů u nohou." }
          ]
        },
        {
          id: "barvy", name: "Barvy", icon: "🎨", type: "vocab",
          cards: [
            { en: "red", cs: "červená", emoji: "🔴", sentence: "The apple is red.", scs: "Jablko je červené." },
            { en: "blue", cs: "modrá", emoji: "🔵", sentence: "The sky is blue.", scs: "Obloha je modrá." },
            { en: "green", cs: "zelená", emoji: "🟢", sentence: "The grass is green.", scs: "Tráva je zelená." },
            { en: "yellow", cs: "žlutá", emoji: "🟡", sentence: "The sun is yellow.", scs: "Slunce je žluté." },
            { en: "orange", cs: "oranžová", emoji: "🟠", sentence: "The ball is orange.", scs: "Míč je oranžový." },
            { en: "purple", cs: "fialová", emoji: "🟣", sentence: "The grapes are purple.", scs: "Hrozny jsou fialové." },
            { en: "black", cs: "černá", emoji: "⚫", sentence: "The cat is black.", scs: "Kočka je černá." },
            { en: "white", cs: "bílá", emoji: "⚪", sentence: "The snow is white.", scs: "Sníh je bílý." },
            { en: "brown", cs: "hnědá", emoji: "🟤", sentence: "The bear is brown.", scs: "Medvěd je hnědý." },
            { en: "pink", cs: "růžová", emoji: "🌸", sentence: "The flower is pink.", scs: "Květina je růžová." }
          ]
        },
        {
          id: "zvirata", name: "Zvířata", icon: "🐾", type: "vocab",
          cards: [
            { en: "dog", cs: "pes", emoji: "🐶", sentence: "The dog is happy.", scs: "Pes je šťastný." },
            { en: "cat", cs: "kočka", emoji: "🐱", sentence: "The cat sleeps.", scs: "Kočka spí." },
            { en: "cow", cs: "kráva", emoji: "🐮", sentence: "The cow eats grass.", scs: "Kráva žere trávu." },
            { en: "horse", cs: "kůň", emoji: "🐴", sentence: "The horse runs fast.", scs: "Kůň běží rychle." },
            { en: "pig", cs: "prase", emoji: "🐷", sentence: "The pig is pink.", scs: "Prase je růžové." },
            { en: "sheep", cs: "ovce", emoji: "🐑", sentence: "The sheep is white.", scs: "Ovce je bílá." },
            { en: "duck", cs: "kachna", emoji: "🦆", sentence: "The duck swims.", scs: "Kachna plave." },
            { en: "fish", cs: "ryba", emoji: "🐟", sentence: "The fish is small.", scs: "Ryba je malá." },
            { en: "bird", cs: "pták", emoji: "🐦", sentence: "The bird can fly.", scs: "Pták umí létat." },
            { en: "frog", cs: "žába", emoji: "🐸", sentence: "The frog jumps.", scs: "Žába skáče." }
          ]
        },
        {
          id: "rodina", name: "Rodina", icon: "👨‍👩‍👧", type: "vocab",
          cards: [
            { en: "mother", cs: "máma", emoji: "👩", sentence: "My mother is kind.", scs: "Moje máma je hodná." },
            { en: "father", cs: "táta", emoji: "👨", sentence: "My father is tall.", scs: "Můj táta je vysoký." },
            { en: "sister", cs: "sestra", emoji: "👧", sentence: "I have a sister.", scs: "Mám sestru." },
            { en: "brother", cs: "bratr", emoji: "👦", sentence: "My brother plays.", scs: "Můj bratr si hraje." },
            { en: "baby", cs: "miminko", emoji: "👶", sentence: "The baby sleeps.", scs: "Miminko spí." },
            { en: "grandma", cs: "babička", emoji: "👵", sentence: "My grandma bakes.", scs: "Moje babička peče." },
            { en: "grandpa", cs: "dědeček", emoji: "👴", sentence: "My grandpa reads.", scs: "Můj dědeček čte." },
            { en: "family", cs: "rodina", emoji: "👨‍👩‍👧‍👦", sentence: "I love my family.", scs: "Mám rád svoji rodinu." }
          ]
        },
        {
          id: "skola", name: "Škola", icon: "🏫", type: "vocab",
          cards: [
            { en: "school", cs: "škola", emoji: "🏫", sentence: "I go to school.", scs: "Chodím do školy." },
            { en: "book", cs: "kniha", emoji: "📖", sentence: "I read a book.", scs: "Čtu knihu." },
            { en: "pen", cs: "pero", emoji: "🖊️", sentence: "This is my pen.", scs: "Tohle je moje pero." },
            { en: "pencil", cs: "tužka", emoji: "✏️", sentence: "I write with a pencil.", scs: "Píšu tužkou." },
            { en: "bag", cs: "taška", emoji: "🎒", sentence: "My bag is heavy.", scs: "Moje taška je těžká." },
            { en: "teacher", cs: "učitel", emoji: "🧑‍🏫", sentence: "The teacher is nice.", scs: "Učitel je milý." },
            { en: "desk", cs: "lavice", emoji: "🪑", sentence: "I sit at my desk.", scs: "Sedím v lavici." },
            { en: "ruler", cs: "pravítko", emoji: "📏", sentence: "I use a ruler.", scs: "Používám pravítko." }
          ]
        },
        {
          id: "dny", name: "Dny v týdnu", icon: "📅", type: "vocab",
          cards: [
            { en: "Monday", cs: "pondělí", emoji: "1️⃣", sentence: "School starts on Monday.", scs: "Škola začíná v pondělí." },
            { en: "Tuesday", cs: "úterý", emoji: "2️⃣", sentence: "We swim on Tuesday.", scs: "V úterý plaveme." },
            { en: "Wednesday", cs: "středa", emoji: "3️⃣", sentence: "Art is on Wednesday.", scs: "Výtvarka je ve středu." },
            { en: "Thursday", cs: "čtvrtek", emoji: "4️⃣", sentence: "We play on Thursday.", scs: "Ve čtvrtek si hrajeme." },
            { en: "Friday", cs: "pátek", emoji: "5️⃣", sentence: "Friday is fun.", scs: "Pátek je zábava." },
            { en: "Saturday", cs: "sobota", emoji: "🎉", sentence: "We rest on Saturday.", scs: "V sobotu odpočíváme." },
            { en: "Sunday", cs: "neděle", emoji: "☀️", sentence: "Sunday is calm.", scs: "Neděle je klidná." }
          ]
        },
        {
          id: "mesice", name: "Měsíce", icon: "🗓️", type: "vocab",
          cards: [
            { en: "January", cs: "leden", emoji: "❄️", sentence: "January is cold.", scs: "Leden je studený." },
            { en: "February", cs: "únor", emoji: "⛄", sentence: "February is short.", scs: "Únor je krátký." },
            { en: "March", cs: "březen", emoji: "🌱", sentence: "March brings spring.", scs: "Březen přináší jaro." },
            { en: "April", cs: "duben", emoji: "🌧️", sentence: "April is rainy.", scs: "Duben je deštivý." },
            { en: "May", cs: "květen", emoji: "🌷", sentence: "May has flowers.", scs: "Květen má květiny." },
            { en: "June", cs: "červen", emoji: "☀️", sentence: "June is warm.", scs: "Červen je teplý." },
            { en: "July", cs: "červenec", emoji: "🏖️", sentence: "July is hot.", scs: "Červenec je horký." },
            { en: "August", cs: "srpen", emoji: "🌻", sentence: "August is sunny.", scs: "Srpen je slunečný." },
            { en: "September", cs: "září", emoji: "🍂", sentence: "September starts school.", scs: "V září začíná škola." },
            { en: "October", cs: "říjen", emoji: "🎃", sentence: "October has leaves.", scs: "Říjen má listí." },
            { en: "November", cs: "listopad", emoji: "🌫️", sentence: "November is foggy.", scs: "Listopad je mlhavý." },
            { en: "December", cs: "prosinec", emoji: "🎄", sentence: "December has snow.", scs: "V prosinci je sníh." }
          ]
        },
        {
          id: "telo", name: "Tělo", icon: "🧍", type: "vocab",
          cards: [
            { en: "head", cs: "hlava", emoji: "🗣️", sentence: "Touch your head.", scs: "Dotkni se hlavy." },
            { en: "hand", cs: "ruka", emoji: "✋", sentence: "Raise your hand.", scs: "Zvedni ruku." },
            { en: "leg", cs: "noha", emoji: "🦵", sentence: "My leg is strong.", scs: "Moje noha je silná." },
            { en: "eye", cs: "oko", emoji: "👁️", sentence: "Close your eye.", scs: "Zavři oko." },
            { en: "ear", cs: "ucho", emoji: "👂", sentence: "This is my ear.", scs: "Tohle je moje ucho." },
            { en: "nose", cs: "nos", emoji: "👃", sentence: "I smell with my nose.", scs: "Čichám nosem." },
            { en: "mouth", cs: "pusa", emoji: "👄", sentence: "Open your mouth.", scs: "Otevři pusu." },
            { en: "hair", cs: "vlasy", emoji: "💇", sentence: "My hair is long.", scs: "Moje vlasy jsou dlouhé." }
          ]
        },
        {
          id: "jidlo", name: "Jídlo", icon: "🍎", type: "vocab",
          cards: [
            { en: "apple", cs: "jablko", emoji: "🍎", sentence: "I eat an apple.", scs: "Jím jablko." },
            { en: "bread", cs: "chléb", emoji: "🍞", sentence: "I like bread.", scs: "Mám rád chléb." },
            { en: "milk", cs: "mléko", emoji: "🥛", sentence: "I drink milk.", scs: "Piju mléko." },
            { en: "cheese", cs: "sýr", emoji: "🧀", sentence: "The cheese is yellow.", scs: "Sýr je žlutý." },
            { en: "egg", cs: "vejce", emoji: "🥚", sentence: "I have one egg.", scs: "Mám jedno vejce." },
            { en: "banana", cs: "banán", emoji: "🍌", sentence: "The banana is yellow.", scs: "Banán je žlutý." },
            { en: "water", cs: "voda", emoji: "💧", sentence: "Water is good.", scs: "Voda je dobrá." },
            { en: "cake", cs: "dort", emoji: "🍰", sentence: "The cake is sweet.", scs: "Dort je sladký." }
          ]
        },
        {
          id: "obleceni", name: "Oblečení", icon: "👕", type: "vocab",
          cards: [
            { en: "shirt", cs: "tričko", emoji: "👕", sentence: "My shirt is blue.", scs: "Moje tričko je modré." },
            { en: "trousers", cs: "kalhoty", emoji: "👖", sentence: "I wear trousers.", scs: "Nosím kalhoty." },
            { en: "shoes", cs: "boty", emoji: "👟", sentence: "My shoes are new.", scs: "Moje boty jsou nové." },
            { en: "hat", cs: "čepice", emoji: "🧢", sentence: "I have a hat.", scs: "Mám čepici." },
            { en: "jacket", cs: "bunda", emoji: "🧥", sentence: "The jacket is warm.", scs: "Bunda je teplá." },
            { en: "dress", cs: "šaty", emoji: "👗", sentence: "Her dress is red.", scs: "Její šaty jsou červené." },
            { en: "socks", cs: "ponožky", emoji: "🧦", sentence: "My socks are white.", scs: "Moje ponožky jsou bílé." },
            { en: "gloves", cs: "rukavice", emoji: "🧤", sentence: "I wear gloves.", scs: "Nosím rukavice." }
          ]
        },
        {
          id: "pocasi", name: "Počasí", icon: "🌦️", type: "vocab",
          cards: [
            { en: "sun", cs: "slunce", emoji: "☀️", sentence: "The sun is hot.", scs: "Slunce je horké." },
            { en: "rain", cs: "déšť", emoji: "🌧️", sentence: "I like the rain.", scs: "Mám rád déšť." },
            { en: "snow", cs: "sníh", emoji: "❄️", sentence: "The snow is white.", scs: "Sníh je bílý." },
            { en: "wind", cs: "vítr", emoji: "💨", sentence: "The wind is cold.", scs: "Vítr je studený." },
            { en: "cloud", cs: "mrak", emoji: "☁️", sentence: "One cloud in the sky.", scs: "Jeden mrak na obloze." },
            { en: "storm", cs: "bouřka", emoji: "⛈️", sentence: "The storm is loud.", scs: "Bouřka je hlučná." },
            { en: "rainbow", cs: "duha", emoji: "🌈", sentence: "I see a rainbow.", scs: "Vidím duhu." },
            { en: "hot", cs: "horko", emoji: "🥵", sentence: "It is hot today.", scs: "Dnes je horko." }
          ]
        },
        {
          id: "slovesa-aj", name: "Základní slovesa", icon: "🏃", type: "vocab",
          cards: [
            { en: "go", cs: "jít", emoji: "🚶", sentence: "Let us go home.", scs: "Pojďme domů." },
            { en: "run", cs: "běžet", emoji: "🏃", sentence: "I can run fast.", scs: "Umím běžet rychle." },
            { en: "eat", cs: "jíst", emoji: "🍽️", sentence: "I eat lunch.", scs: "Jím oběd." },
            { en: "drink", cs: "pít", emoji: "🥤", sentence: "I drink water.", scs: "Piju vodu." },
            { en: "sleep", cs: "spát", emoji: "😴", sentence: "I sleep at night.", scs: "Spím v noci." },
            { en: "play", cs: "hrát si", emoji: "⚽", sentence: "I play football.", scs: "Hraju fotbal." },
            { en: "read", cs: "číst", emoji: "📖", sentence: "I read a book.", scs: "Čtu knihu." },
            { en: "write", cs: "psát", emoji: "✍️", sentence: "I write my name.", scs: "Píšu své jméno." },
            { en: "sing", cs: "zpívat", emoji: "🎤", sentence: "I sing a song.", scs: "Zpívám písničku." },
            { en: "jump", cs: "skákat", emoji: "🤸", sentence: "I jump high.", scs: "Skáču vysoko." }
          ]
        },
        { id: "vety", name: "Anglické věty", icon: "📝", type: "group" },
        {
          id: "vety-pozdravy", name: "Pozdravy a fráze", icon: "👋", type: "phrases", group: "vety",
          cards: [
            { en: "Hello!", cs: "Ahoj!", emoji: "👋", phrase: true },
            { en: "Good morning.", cs: "Dobré ráno.", emoji: "🌅", phrase: true },
            { en: "Good afternoon.", cs: "Dobré odpoledne.", emoji: "☀️", phrase: true },
            { en: "Good evening.", cs: "Dobrý večer.", emoji: "🌆", phrase: true },
            { en: "Goodbye.", cs: "Na shledanou.", emoji: "👋", phrase: true },
            { en: "See you.", cs: "Uvidíme se.", emoji: "🙌", phrase: true },
            { en: "Thank you.", cs: "Děkuji.", emoji: "🙏", phrase: true },
            { en: "Please.", cs: "Prosím.", emoji: "🙂", phrase: true },
            { en: "You are welcome.", cs: "Není zač.", emoji: "😊", phrase: true },
            { en: "I am sorry.", cs: "Promiň.", emoji: "😔", phrase: true }
          ]
        },
        {
          id: "vety-omne", name: "O mně", icon: "🙋", type: "phrases", group: "vety",
          cards: [
            { en: "What is your name?", cs: "Jak se jmenuješ?", emoji: "❓", phrase: true },
            { en: "My name is Tom.", cs: "Jmenuji se Tom.", emoji: "🧒", phrase: true },
            { en: "How are you?", cs: "Jak se máš?", emoji: "🤔", phrase: true },
            { en: "I am fine.", cs: "Mám se dobře.", emoji: "🙂", phrase: true },
            { en: "I am happy.", cs: "Jsem šťastný.", emoji: "😄", phrase: true },
            { en: "I am sad.", cs: "Jsem smutný.", emoji: "😢", phrase: true },
            { en: "I am tired.", cs: "Jsem unavený.", emoji: "😴", phrase: true },
            { en: "I am hungry.", cs: "Mám hlad.", emoji: "🍽️", phrase: true },
            { en: "I am thirsty.", cs: "Mám žízeň.", emoji: "🥤", phrase: true },
            { en: "I am eight years old.", cs: "Je mi osm let.", emoji: "8️⃣", phrase: true }
          ]
        },
        {
          id: "vety-rodina", name: "Rodina", icon: "👨‍👩‍👧", type: "phrases", group: "vety",
          cards: [
            { en: "This is my mum.", cs: "Toto je moje maminka.", emoji: "👩", phrase: true },
            { en: "This is my dad.", cs: "Toto je můj tatínek.", emoji: "👨", phrase: true },
            { en: "I have a brother.", cs: "Mám bratra.", emoji: "👦", phrase: true },
            { en: "I have a sister.", cs: "Mám sestru.", emoji: "👧", phrase: true },
            { en: "I love my family.", cs: "Mám rád svou rodinu.", emoji: "❤️", phrase: true },
            { en: "My mum is nice.", cs: "Moje maminka je hodná.", emoji: "😊", phrase: true },
            { en: "My dad is tall.", cs: "Můj tatínek je vysoký.", emoji: "📏", phrase: true },
            { en: "My brother is funny.", cs: "Můj bratr je legrační.", emoji: "😂", phrase: true },
            { en: "My sister is small.", cs: "Moje sestra je malá.", emoji: "🧒", phrase: true },
            { en: "We are a family.", cs: "Jsme rodina.", emoji: "👨‍👩‍👧‍👦", phrase: true }
          ]
        },
        {
          id: "vety-zvirata", name: "Zvířata", icon: "🐾", type: "phrases", group: "vety",
          cards: [
            { en: "I have a dog.", cs: "Mám psa.", emoji: "🐶", phrase: true },
            { en: "I have a cat.", cs: "Mám kočku.", emoji: "🐱", phrase: true },
            { en: "The dog is big.", cs: "Pes je velký.", emoji: "🐕", phrase: true },
            { en: "The cat is small.", cs: "Kočka je malá.", emoji: "🐈", phrase: true },
            { en: "The bird can fly.", cs: "Pták umí létat.", emoji: "🐦", phrase: true },
            { en: "The fish can swim.", cs: "Ryba umí plavat.", emoji: "🐟", phrase: true },
            { en: "The rabbit is white.", cs: "Králík je bílý.", emoji: "🐰", phrase: true },
            { en: "The horse is brown.", cs: "Kůň je hnědý.", emoji: "🐴", phrase: true },
            { en: "The mouse is grey.", cs: "Myš je šedá.", emoji: "🐭", phrase: true },
            { en: "I like animals.", cs: "Mám rád zvířata.", emoji: "🐾", phrase: true }
          ]
        },
        {
          id: "vety-skola", name: "Škola", icon: "🏫", type: "phrases", group: "vety",
          cards: [
            { en: "This is my school.", cs: "Toto je moje škola.", emoji: "🏫", phrase: true },
            { en: "I am at school.", cs: "Jsem ve škole.", emoji: "🎒", phrase: true },
            { en: "This is my classroom.", cs: "Toto je moje třída.", emoji: "🪑", phrase: true },
            { en: "I have a book.", cs: "Mám knihu.", emoji: "📖", phrase: true },
            { en: "I have a pencil.", cs: "Mám tužku.", emoji: "✏️", phrase: true },
            { en: "Open your book.", cs: "Otevři si knihu.", emoji: "📖", phrase: true },
            { en: "Close your book.", cs: "Zavři si knihu.", emoji: "📕", phrase: true },
            { en: "Sit down, please.", cs: "Sedni si, prosím.", emoji: "🪑", phrase: true },
            { en: "Stand up, please.", cs: "Postav se, prosím.", emoji: "🧍", phrase: true },
            { en: "Listen to me.", cs: "Poslouchej mě.", emoji: "👂", phrase: true }
          ]
        },
        {
          id: "vety-barvy", name: "Barvy a věci", icon: "🎨", type: "phrases", group: "vety",
          cards: [
            { en: "The book is blue.", cs: "Kniha je modrá.", emoji: "📘", phrase: true },
            { en: "The pencil is yellow.", cs: "Tužka je žlutá.", emoji: "✏️", phrase: true },
            { en: "My bag is red.", cs: "Moje taška je červená.", emoji: "🎒", phrase: true },
            { en: "The table is brown.", cs: "Stůl je hnědý.", emoji: "🟫", phrase: true },
            { en: "The chair is green.", cs: "Židle je zelená.", emoji: "🪑", phrase: true },
            { en: "I like blue.", cs: "Mám rád modrou.", emoji: "🔵", phrase: true },
            { en: "My favourite colour is red.", cs: "Moje oblíbená barva je červená.", emoji: "🔴", phrase: true },
            { en: "The sun is yellow.", cs: "Slunce je žluté.", emoji: "☀️", phrase: true },
            { en: "The grass is green.", cs: "Tráva je zelená.", emoji: "🌱", phrase: true },
            { en: "The snow is white.", cs: "Sníh je bílý.", emoji: "❄️", phrase: true }
          ]
        },
        {
          id: "vety-jidlo", name: "Jídlo a pití", icon: "🍎", type: "phrases", group: "vety",
          cards: [
            { en: "I like apples.", cs: "Mám rád jablka.", emoji: "🍎", phrase: true },
            { en: "I like bananas.", cs: "Mám rád banány.", emoji: "🍌", phrase: true },
            { en: "I like milk.", cs: "Mám rád mléko.", emoji: "🥛", phrase: true },
            { en: "I like water.", cs: "Mám rád vodu.", emoji: "💧", phrase: true },
            { en: "I like bread.", cs: "Mám rád chleba.", emoji: "🍞", phrase: true },
            { en: "I like cheese.", cs: "Mám rád sýr.", emoji: "🧀", phrase: true },
            { en: "I do not like onions.", cs: "Nemám rád cibuli.", emoji: "🧅", phrase: true },
            { en: "The apple is red.", cs: "Jablko je červené.", emoji: "🍎", phrase: true },
            { en: "The banana is yellow.", cs: "Banán je žlutý.", emoji: "🍌", phrase: true },
            { en: "I eat breakfast.", cs: "Snídám.", emoji: "🍳", phrase: true }
          ]
        },
        {
          id: "vety-umim", name: "Co umím", icon: "💪", type: "phrases", group: "vety",
          cards: [
            { en: "I can run.", cs: "Umím běhat.", emoji: "🏃", phrase: true },
            { en: "I can jump.", cs: "Umím skákat.", emoji: "🤸", phrase: true },
            { en: "I can swim.", cs: "Umím plavat.", emoji: "🏊", phrase: true },
            { en: "I can sing.", cs: "Umím zpívat.", emoji: "🎤", phrase: true },
            { en: "I can dance.", cs: "Umím tancovat.", emoji: "💃", phrase: true },
            { en: "I can read.", cs: "Umím číst.", emoji: "📖", phrase: true },
            { en: "I can write.", cs: "Umím psát.", emoji: "✍️", phrase: true },
            { en: "I can draw.", cs: "Umím kreslit.", emoji: "🎨", phrase: true },
            { en: "I can ride a bike.", cs: "Umím jezdit na kole.", emoji: "🚲", phrase: true },
            { en: "I can play football.", cs: "Umím hrát fotbal.", emoji: "⚽", phrase: true }
          ]
        },
        {
          id: "vety-pocasi", name: "Počasí a dny", icon: "🌦️", type: "phrases", group: "vety",
          cards: [
            { en: "It is sunny.", cs: "Je slunečno.", emoji: "☀️", phrase: true },
            { en: "It is raining.", cs: "Prší.", emoji: "🌧️", phrase: true },
            { en: "It is snowing.", cs: "Sněží.", emoji: "❄️", phrase: true },
            { en: "It is cold.", cs: "Je zima.", emoji: "🥶", phrase: true },
            { en: "It is hot.", cs: "Je horko.", emoji: "🥵", phrase: true },
            { en: "The sky is blue.", cs: "Obloha je modrá.", emoji: "🌤️", phrase: true },
            { en: "I like summer.", cs: "Mám rád léto.", emoji: "🏖️", phrase: true },
            { en: "I like winter.", cs: "Mám rád zimu.", emoji: "⛄", phrase: true },
            { en: "Today is Monday.", cs: "Dnes je pondělí.", emoji: "📅", phrase: true },
            { en: "Tomorrow is Tuesday.", cs: "Zítra je úterý.", emoji: "🗓️", phrase: true }
          ]
        },
        {
          id: "vety-kde", name: "Kde co je", icon: "📍", type: "phrases", group: "vety",
          cards: [
            { en: "Where are you?", cs: "Kde jsi?", emoji: "❓", phrase: true },
            { en: "I am at home.", cs: "Jsem doma.", emoji: "🏠", phrase: true },
            { en: "Where is my book?", cs: "Kde je moje kniha?", emoji: "📖", phrase: true },
            { en: "The book is on the table.", cs: "Kniha je na stole.", emoji: "📚", phrase: true },
            { en: "The cat is under the chair.", cs: "Kočka je pod židlí.", emoji: "🐱", phrase: true },
            { en: "The ball is in the box.", cs: "Míč je v krabici.", emoji: "📦", phrase: true },
            { en: "Come here, please.", cs: "Pojď sem, prosím.", emoji: "👉", phrase: true },
            { en: "Let us play.", cs: "Pojďme si hrát.", emoji: "🎲", phrase: true },
            { en: "I like English.", cs: "Mám rád angličtinu.", emoji: "🇬🇧", phrase: true },
            { en: "English is fun!", cs: "Angličtina je zábava!", emoji: "🎉", phrase: true }
          ]
        }
      ]
    },
    {
      id: "ve",
      name: "Vesmír",
      short: "Vesmír",
      color: "#ff9800",
      color2: "#ffb74d",
      icon: "🚀",
      topics: [
        {
          id: "ve-slunecni", name: "Sluneční soustava", icon: "☀️", type: "facts",
          intro: "Sluneční soustava je náš vesmírný domov. Uprostřed je Slunce a kolem něj obíhá 8 planet. ☀️",
          cards: [
            { word: "Slunce", emoji: "☀️", note: "Obrovská hvězda uprostřed. Dává nám světlo a teplo.", sentence: "Do Slunce by se vešlo přes milion Zemí!", fact: true },
            { word: "Planeta", emoji: "🪐", note: "Velké těleso, které obíhá kolem Slunce.", sentence: "Planet je v naší soustavě osm.", fact: true },
            { word: "Oběžná dráha", emoji: "🔄", note: "Cesta, po které planeta obíhá kolem Slunce.", sentence: "Země oběhne Slunce jednou za rok.", fact: true },
            { word: "Asteroid", emoji: "🪨", note: "Menší kamenné těleso ve vesmíru.", sentence: "Mezi Marsem a Jupiterem je pás asteroidů.", fact: true },
            { word: "Kometa", emoji: "☄️", note: "Ledová koule s dlouhým ohonem.", sentence: "Ohon komety vždy míří od Slunce.", fact: true },
            { word: "Gravitace", emoji: "🧲", note: "Síla, která přitahuje tělesa k sobě.", sentence: "Díky gravitaci planety neuletí od Slunce.", fact: true },
            { word: "Vesmír", emoji: "🌌", note: "Nekonečný prostor plný hvězd.", sentence: "Ve vesmíru není vzduch, je tam ticho.", fact: true }
          ]
        },
        {
          id: "ve-planety", name: "Planety", icon: "🪐", type: "facts",
          intro: "Kolem Slunce obíhá 8 planet. Tady jsou v pořadí od Slunce. 🪐",
          cards: [
            { word: "Merkur", emoji: "🌑", note: "Nejmenší planeta a Slunci nejblíž.", sentence: "Ve dne je tam horko, v noci mráz.", fact: true },
            { word: "Venuše", emoji: "🟡", note: "Nejteplejší planeta, zahalená v mracích.", sentence: "Na obloze svítí jako Jitřenka.", fact: true },
            { word: "Země", emoji: "🌍", note: "Naše planeta – jediná, kde žijeme.", sentence: "Má vodu, vzduch i život.", fact: true },
            { word: "Mars", emoji: "🔴", note: "Rudá planeta plná prachu.", sentence: "Rudou barvu má díky rezavému písku.", fact: true },
            { word: "Jupiter", emoji: "🟠", note: "Největší planeta, plynný obr.", sentence: "Má obří bouři – Velkou rudou skvrnu.", fact: true },
            { word: "Saturn", emoji: "🪐", note: "Planeta s krásnými prstenci.", sentence: "Prstence jsou z ledu a kamení.", fact: true },
            { word: "Uran", emoji: "🔵", note: "Ledová planeta, otáčí se skoro naležato.", sentence: "Má nazelenale modrou barvu.", fact: true },
            { word: "Neptun", emoji: "🟣", note: "Nejvzdálenější planeta, tmavě modrá.", sentence: "Fouká tam nejsilnější vítr ze všech planet.", fact: true }
          ]
        },
        {
          id: "ve-hvezdy", name: "Hvězdy", icon: "⭐", type: "facts",
          intro: "Hvězdy jsou obrovské svítící koule horkého plynu, hodně daleko od nás. ⭐",
          cards: [
            { word: "Hvězda", emoji: "⭐", note: "Svítící koule horkého plynu.", sentence: "Naše nejbližší hvězda je Slunce.", fact: true },
            { word: "Souhvězdí", emoji: "✨", note: "Skupina hvězd, která tvoří obrazec.", sentence: "Známé souhvězdí je Velký vůz.", fact: true },
            { word: "Polárka", emoji: "🌟", note: "Hvězda, která ukazuje na sever.", sentence: "Podle ní se orientovali námořníci.", fact: true },
            { word: "Galaxie", emoji: "🌌", note: "Obrovská skupina miliard hvězd.", sentence: "Naše galaxie se jmenuje Mléčná dráha.", fact: true },
            { word: "Padající hvězda", emoji: "💫", note: "Světelná čára na noční obloze.", sentence: "Je to kamínek, který shoří v ovzduší.", fact: true },
            { word: "Světelný rok", emoji: "📏", note: "Vzdálenost, kterou světlo urazí za rok.", sentence: "Hvězdy jsou tak daleko, že je měříme světelnými roky.", fact: true }
          ]
        },
        {
          id: "ve-mesic", name: "Měsíc", icon: "🌙", type: "facts",
          intro: "Měsíc je náš nejbližší vesmírný soused. Obíhá kolem Země. 🌙",
          cards: [
            { word: "Měsíc", emoji: "🌕", note: "Kamenné těleso, které obíhá Zemi.", sentence: "Měsíc nesvítí sám – odráží světlo Slunce.", fact: true },
            { word: "Krátery", emoji: "🕳️", note: "Důlky po dopadech kamenů.", sentence: "Na Měsíci je jich obrovské množství.", fact: true },
            { word: "Úplněk", emoji: "🌕", note: "Když vidíme celý kulatý Měsíc.", sentence: "Za úplňku je Měsíc nejjasnější.", fact: true },
            { word: "Nov", emoji: "🌑", note: "Když Měsíc skoro není vidět.", sentence: "Při novu je Měsíc temný.", fact: true },
            { word: "Fáze Měsíce", emoji: "🌗", note: "Měsíc mění tvar od srpku po úplněk.", sentence: "Fáze se vystřídají asi za měsíc.", fact: true },
            { word: "Přistání na Měsíci", emoji: "👨‍🚀", note: "Lidé přistáli na Měsíci v roce 1969.", sentence: "První člověk na Měsíci byl Neil Armstrong.", fact: true }
          ]
        },
        {
          id: "ve-rakety", name: "Rakety a lodě", icon: "🚀", type: "facts",
          intro: "Do vesmíru se dostaneme jen raketou. Podívej, co k tomu potřebujeme. 🚀",
          cards: [
            { word: "Raketa", emoji: "🚀", note: "Stroj, který dokáže odletět do vesmíru.", sentence: "Musí letět hodně rychle, aby unikla ze Země.", fact: true },
            { word: "Kosmonaut", emoji: "👨‍🚀", note: "Člověk, který létá do vesmíru.", sentence: "První kosmonaut byl Jurij Gagarin.", fact: true },
            { word: "Skafandr", emoji: "🥽", note: "Speciální oblek pro vesmír.", sentence: "Dává kosmonautovi vzduch k dýchání.", fact: true },
            { word: "Družice", emoji: "📡", note: "Přístroj, který obíhá kolem Země.", sentence: "Pomáhá s počasím, telefonem i navigací.", fact: true },
            { word: "Vesmírná stanice", emoji: "🛰️", note: "Velká loď, kde kosmonauti bydlí a pracují.", sentence: "Stanice ISS obletí Zemi za 90 minut.", fact: true },
            { word: "Vozítko (rover)", emoji: "🤖", note: "Robot, který jezdí po jiné planetě.", sentence: "Rovery zkoumají povrch Marsu.", fact: true }
          ]
        }
      ]
    }
  ]
};

/* Pomocné funkce pro hledání */
DATA.findSubject = (sid) => DATA.subjects.find((s) => s.id === sid);
DATA.findTopic = (sid, tid) => {
  const s = DATA.findSubject(sid);
  return s ? s.topics.find((t) => t.id === tid) : null;
};
