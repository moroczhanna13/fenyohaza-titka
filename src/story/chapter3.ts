import type { Chapter, Condition } from './types'

const numbersSolved: Condition = { type: 'puzzleSolved', puzzle: 'ch3-numbers' }
const timelineSolved: Condition = { type: 'puzzleSolved', puzzle: 'ch3-timeline' }
const groupVisited: Condition = { type: 'pageVisited', page: 'ch3-group' }

/** 3. fejezet – Hamis alibik */
export const chapter3: Chapter = {
  id: 'ch3',
  number: 3,
  title: 'Hamis alibik',

  intro: [
    'Gedeon telefonjában három névtelen szám beszélgetése van. Mindhármat nyáron kereste meg, és mindhárom rövid úton lerázta.',
    'A jegyzeteiben három szó áll egymás alatt: elnök, titkár, mindenes. Mellettük semmi.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch3-unknown',
      contact: 'Ismeretlen szám',
      thread: 'ch1-unknown',
      steps: [
        {
          type: 'message',
          from: 'contact',
          text: 'Gedeon egyszer azt írta, hogy „a régi vezetőség hallgat”. Nem tudom, kikre gondolt.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Szerintem tudom. A telefonjában három névtelen szám van, nyáron mindhármat megkereste.',
              replies: [{ type: 'message', from: 'contact', text: 'Kik azok?' }],
            },
            {
              text: 'Majd kiderítem.',
              replies: [{ type: 'message', from: 'contact', text: 'Óvatosan. Gedeon is ezt mondta.' }],
            },
          ],
        },
        { type: 'wait', until: numbersSolved },
        {
          type: 'message',
          from: 'player',
          text: 'Tóth Ervin, Pásztor László és Mészáros Béla. Az elnök, a mindenes és a titkár.',
        },
        { type: 'message', from: 'contact', text: 'Mindhármat ismerem. Ebben a városban mindenki ismer mindenkit.' },
        { type: 'message', from: 'contact', text: 'Engem ne említsen nekik.' },
        {
          type: 'wait',
          until: {
            type: 'all',
            conditions: [
              { type: 'conversationFinished', conversation: 'ch3-toth' },
              { type: 'conversationFinished', conversation: 'ch3-pasztor' },
              { type: 'conversationFinished', conversation: 'ch3-meszaros' },
              groupVisited,
            ],
          },
        },
        {
          type: 'message',
          from: 'player',
          text: 'Találtam egy képet a tűz éjszakájáról, 23:05-kor készült. A klubház mellett egy piros autó áll.',
          photo: 'ch3-photo-festival',
        },
        { type: 'message', from: 'contact', text: 'Kié?' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch3-car-owner' } },
        {
          type: 'message',
          from: 'player',
          text: 'Mészáros Béláé. Aki azt mondta, 23 órától éjfélig végig a színpad mögött volt.',
        },
        { type: 'message', from: 'contact', text: 'Mészáros bácsi…' },
        { type: 'wait', until: timelineSolved },
        { type: 'wait', until: { type: 'conversationFinished', conversation: 'ch3-meszaros-2' } },
        {
          type: 'message',
          from: 'player',
          text: 'Mészáros ott volt, saját kulcsa volt a klubházhoz. Pár perccel a tűz előtt valaki az irodában a könyvelési dossziékat pakolta.',
        },
        { type: 'message', from: 'contact', text: '…' },
        { type: 'message', from: 'contact', text: 'A könyvek.' },
        { type: 'message', from: 'contact', text: 'Lehet, hogy tudok segíteni. De nem ma.' },
      ],
    },
    {
      id: 'ch3-toth',
      contact: 'Tóth Ervin',
      thread: 'ch1-num-toth',
      availableAfter: numbersSolved,
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'Polgármester úr, Berényi Gedeon rokona vagyok. Ő már nem tud kérdezni, ezért én kérdezek.',
              replies: [
                { type: 'message', from: 'contact', text: 'Részvétem. De a válaszom ugyanaz, mint neki: lezárt ügy.' },
              ],
            },
            {
              text: 'Polgármester úr, a 2001-es tűzről kérdeznék.',
              replies: [{ type: 'message', from: 'contact', text: 'Már a nagybátyjának is megmondtam: lezárt ügy.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Kérem, ne keressen többet.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Az újságnak azt mondta, 23:40-kor riasztotta a tűzoltókat. A tűzoltónapló szerint 23:10-kor jött a bejelentés.',
              replies: [{ type: 'message', from: 'contact', text: 'Ki adta magának azt a naplót?' }],
            },
            {
              text: 'Ha nem beszél velem, a tűzoltónaplót a Fenyőházi Hírek szerkesztőségének is elküldöm.',
              replies: [{ type: 'message', from: 'contact', text: 'Ez fenyegetés?' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Jövőre választás lesz. Gondolom, ezt maga is tudja.' },
        { type: 'message', from: 'contact', text: '…' },
        {
          type: 'message',
          from: 'contact',
          text: 'Rendben. Nem a klubháznál voltam, és nem én riasztottam senkit.',
        },
        {
          type: 'message',
          from: 'contact',
          text: '23 órától fél tizenkettőig a fesztiválsátorban ültem az üzemeltetőkkel. Tárgyaltunk. Az üzemeltetők tanúsíthatják – ha megtalálja őket.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Miről tárgyaltak?',
              replies: [{ type: 'message', from: 'contact', text: 'Az a mi dolgunk volt.' }],
            },
            {
              text: 'Miért mondott az újságnak 23:40-et?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Hogy senki ne kérdezze, hol ült a klubelnök, amíg égett a klubja.',
                },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Felgyújtani nem gyújtottam fel semmit. Az a klub az enyém volt, nem az ellenségem.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Feketén fizettek?',
              replies: [{ type: 'message', from: 'contact', text: 'Ezt nem mondtam. És ha bárhol leírja, letagadom.' }],
            },
            {
              text: 'Köszönöm.',
              replies: [{ type: 'message', from: 'contact', text: 'Ne köszönje. Nem magáért mondtam.' }],
            },
          ],
        },
      ],
    },
    {
      id: 'ch3-pasztor',
      contact: 'Pásztor László',
      thread: 'ch1-num-pasztor',
      availableAfter: numbersSolved,
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'Pásztor úr, Gedeon rokona vagyok. Ő mit kérdezett magától?',
              replies: [
                { type: 'message', from: 'contact', text: 'Ugyanazt, amit most maga fog. És ugyanazt is fogom mondani.' },
              ],
            },
            {
              text: 'Maga volt a vitorlásklub mindenese 2001-ben, igaz?',
              replies: [{ type: 'message', from: 'contact', text: 'Igaz. Régen volt.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'A tűzijáték után hazamentem. Éjfélkor a feleségem keltett, hogy ég a klub.',
        },
        { type: 'message', from: 'contact', text: 'Ezt mondtam a rendőrségnek is. Nincs mit hozzátenni.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Senki nem látta magát aznap este a klub körül?',
              replies: [{ type: 'message', from: 'contact', text: 'Ezren voltak a sétányon. Mindenki látott mindenkit.' }],
            },
            {
              text: 'Rendben. Köszönöm.',
              replies: [{ type: 'message', from: 'contact', text: 'Sört azért jöjjön inni.' }],
            },
          ],
        },
      ],
    },
    {
      id: 'ch3-pasztor-2',
      contact: 'Pásztor László',
      thread: 'ch1-num-pasztor',
      availableAfter: {
        type: 'all',
        conditions: [{ type: 'conversationFinished', conversation: 'ch3-pasztor' }, groupVisited],
      },
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'A régi fesztiválos csoportban azt írják, aznap este a stégnél üvöltözött Pállal.',
              replies: [{ type: 'message', from: 'contact', text: 'Kiss Jolán. Ki más.' }],
            },
            {
              text: 'Látták magát Pállal veszekedni a stégnél. Miért hallgatta el?',
              replies: [
                { type: 'message', from: 'contact', text: 'Mert egy órával később Pál meghalt. Maga mit tett volna?' },
              ],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Jó. Összevesztünk. Háromnegyed tizenegykor, a stégnél.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Két hónapja nem kaptam fizetést. Pál azt mondta, nincs pénz a kasszában. Pedig a fesztivál előtt megjött az előleg, tudtam.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Ezért haragudott rá?',
              replies: [{ type: 'message', from: 'contact', text: 'Haragudtam. De nem gyújtottam rá a házat.' }],
            },
            {
              text: 'Mit mondott Pál?',
              replies: [{ type: 'message', from: 'contact', text: 'Azt, hogy nem ő a hibás. Elsőre nem hittem neki.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Azt mondta, valaki lop a kasszából, és most már tudja, ki. A fesztivál után rendet tesz.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Ha lett volna eszem, megkérdezem, kire gondol. Ehelyett elküldtem a fenébe, és hazamentem.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Ezt leírhatja, ha akarja. De ha bárkinek azt mondja, hogy én gyújtottam fel, a bíróságon találkozunk.',
        },
      ],
    },
    {
      id: 'ch3-meszaros',
      contact: 'Mészáros Béla',
      thread: 'ch1-num-meszaros',
      availableAfter: numbersSolved,
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'Mészáros úr, Gedeon rokona vagyok. Csak pár kérdést tennék fel.',
              replies: [{ type: 'message', from: 'contact', text: 'Ő is ezzel kezdte.' }],
            },
            {
              text: 'Maga volt a klubtitkár 2001-ben, igaz?',
              replies: [{ type: 'message', from: 'contact', text: 'Igen. És?' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Ha a tűzről van szó: egész este a színpadnál voltam. A tűzijátékot én fogtam össze.',
        },
        {
          type: 'message',
          from: 'contact',
          text: '23 órától éjfélig végig a színpad mögött voltam. Ezt a rendőrségnek is elmondtam.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Látott valamit a klub felől?',
              replies: [
                { type: 'message', from: 'contact', text: 'Onnan a klubot nem lehet látni. A színpad háttal áll neki.' },
              ],
            },
            {
              text: 'Köszönöm, egyelőre ennyi.',
              replies: [{ type: 'message', from: 'contact', text: 'Remélem, tényleg ennyi.' }],
            },
          ],
        },
      ],
    },
    {
      id: 'ch3-meszaros-2',
      contact: 'Mészáros Béla',
      thread: 'ch1-num-meszaros',
      availableAfter: timelineSolved,
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'A 23:05-ös fesztiválfotón az autója a klubháznál áll. Nem a színpadnál volt.',
              replies: [{ type: 'message', from: 'contact', text: '…' }],
            },
            {
              text: 'Mit keresett 23:05-kor a klubnál? Van egy fotó az autójáról.',
              replies: [{ type: 'message', from: 'contact', text: 'Honnan van magának az a kép?' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Jó. Igen. Ott voltam.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Volt egy saját kulcsom a klubházhoz. Évekkel korábban csináltattam, senki nem tudott róla, Pál sem.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Tűzijáték után mindig bementem egy üveggel. Csendben, egyedül, amíg a többiek a színpadnál mulattak. Aznap is ezért mentem.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Az irodában égett a villany. Az ablakon át láttam, hogy valaki a polcról pakolja le a könyvelési dossziékat.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Ki volt az?',
              replies: [
                { type: 'message', from: 'contact', text: 'Nem láttam az arcát. Háttal állt, csak a kezét meg a dossziékat láttam.' },
              ],
            },
            {
              text: 'Miért nem ment be?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Minek mentem volna? Az iroda a könyvelőé meg Pálé volt. Azt hittem, valamelyikük rendezkedik.',
                },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Nem akartam, hogy meglássanak. Részeg voltam, és a zsebemben volt a kulcs, amiről senki nem tudott.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Visszafordultam. Pár perc múlva, a sétányról visszanézve már füst jött a raktár felől.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Miért nem mondta el ezt a rendőrségnek?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Mert akkor el kellett volna mondanom, mit kerestem ott éjjel, részegen, a saját kulcsommal. És hogy elsétáltam.',
                },
              ],
            },
            {
              text: 'Köszönöm, hogy elmondta.',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Huszonöt éve várom, hogy valaki megkérdezze. És huszonöt éve rettegek tőle.',
                },
              ],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Ha valaki tudja, mi volt azokban a könyvekben, az nem én vagyok.' },
      ],
    },
  ],

  photos: [
    {
      id: 'ch3-photo-festival',
      src: 'images/ch3/festival-night.svg',
      alt: 'Éjszakai fesztiválfotó, a sarokban narancssárga dátumbélyegző: ’01 7 21 23:05. Előtérben a tömeg sziluettje, balra a kivilágított színpad, az égen tűzijáték. Jobbra, a háttérben a vitorlásklub, az irodaablakban ég a villany. A klubház mellett egy piros autó parkol, a rendszáma nagyítva olvasható: GBM-418.',
      caption: 'Mentve a Fenyőházi Szomszédok „Régi fenyőházi fesztiválok” csoportjából',
      info: { takenAt: '2001-07-21T23:05' },
    },
  ],

  pages: [
    {
      kind: 'vehicleRegistry',
      id: 'ch3-registry',
      url: 'regirendszam.hu',
      title: 'Régi Rendszám – járműelőzmény-kereső',
      intro: 'Régi forgalmi engedélyekből összegyűjtött, önkéntesek által karbantartott adatbázis. Írd be a rendszámot!',
      bookmarked: true,
      records: [
        { plate: 'GBM-418', vehicle: 'Opel Astra F', color: 'piros', holder: 'Mészáros Béla, Fenyőháza', period: '1996–2006' },
        { plate: 'GBM-481', vehicle: 'Suzuki Swift', color: 'fehér', holder: 'Kovács Andrea, Balatonvég', period: '2000–2009' },
        { plate: 'GMB-418', vehicle: 'Lada Samara', color: 'kék', holder: 'Horváth Imre, Fenyőháza', period: '1993–2002' },
        { plate: 'FTE-212', vehicle: 'Volkswagen Golf', color: 'ezüst', holder: 'Tóth Ervin, Fenyőháza', period: '1999–2008' },
        { plate: 'HKZ-907', vehicle: 'Škoda Felicia', color: 'zöld', holder: 'Vidor Ilona, Fenyőháza', period: '1998–2004' },
      ],
    },
    {
      kind: 'socialHome',
      id: 'ch3-szomszedok',
      url: 'szomszedok.hu',
      title: 'Fenyőházi Szomszédok',
      intro: 'Fenyőháza és környéke közösségi oldala. Keress embereket, csoportokat és helyi vállalkozásokat!',
      bookmarked: true,
    },
    {
      kind: 'social',
      id: 'ch3-group',
      url: 'szomszedok.hu/regi-fesztivalok',
      title: 'Fenyőházi Szomszédok – Régi fenyőházi fesztiválok',
      profileType: 'group',
      name: 'Régi fenyőházi fesztiválok',
      about: 'Nyilvános csoport · 412 tag',
      details: ['Fotók és emlékek a régi Tavi Fesztiválokról. Kérjük, egymással tisztelettel!'],
      posts: [
        {
          author: 'Bencze Margit',
          time: '2026. július 21.',
          text: 'Ma huszonöt éve volt a régi klub utolsó fesztiválja. A fiam régi gépén találtam ezt a képet, aznap este készült, pár perccel tizenegy után. Ki emlékszik még?',
          image: {
            src: 'images/ch3/festival-night.svg',
            alt: 'Éjszakai fesztiválfotó 2001. július 21-ről, 23:05-ös dátumbélyegzővel: tömeg, kivilágított színpad, tűzijáték, a háttérben a vitorlásklub egy piros autóval.',
          },
          likes: 64,
          comments: [
            {
              author: 'Kiss Jolán',
              text: 'Hogy felejthetném el. Aznap este a Laci úgy üvöltözött szegény Pállal lent a stégnél, hogy a zenekart is túlkiabálta. Egy órára rá meg égett az egész klub.',
            },
            { author: 'Horváth Imre', text: 'Jolán, ezt nem kéne itt.' },
            { author: 'Kiss Jolán', text: 'Miért ne? Igaz.' },
            { author: 'Nagy Ferenc', text: 'A tűzijáték abban az évben volt a legszebb. Utána már semmi nem volt ugyanolyan.' },
            { author: 'Bencze Margit', text: 'Nyugodjon békében, Pál.' },
          ],
        },
        {
          author: 'Horváth Imre',
          time: '2025. augusztus 2.',
          text: 'A 2003-as fesztivál, az első az új sétányon. A régi klub helyén akkor már csak a kerítés állt.',
          likes: 23,
        },
        {
          author: 'Nagy Ferenc',
          time: '2024. július 20.',
          text: 'Megvan még valakinek a 2001-es fesztiválplakát?',
          likes: 9,
          comments: [{ author: 'Bencze Margit', text: 'A könyvtár hirdetőtábláján ott lóg ma is.' }],
        },
      ],
    },
    {
      kind: 'social',
      id: 'ch3-pub',
      url: 'szomszedok.hu/pasztor-sorozo',
      title: 'Fenyőházi Szomszédok – Pásztor Söröző',
      profileType: 'business',
      name: 'Pásztor Söröző',
      about: 'Söröző és kerthelyiség a sétány sarkán · 2003 óta',
      details: ['Fenyőháza, Kikötő sétány 12.', 'Nyitva: hétfőtől vasárnapig 14:00–24:00', 'Asztalfoglalás: +36 20 518 3364'],
      posts: [
        {
          author: 'Pásztor Söröző',
          time: '2026. szeptember 26.',
          text: 'Szombaton élő zene a kerthelyiségben! Csapolt sör, házi pogácsa. Laci vár mindenkit.',
          likes: 31,
        },
        {
          author: 'Pásztor Söröző',
          time: '2025. május 3.',
          text: 'Huszonkét éve nyitottunk! Aki még emlékszik: a régi vitorlásklub mindenese voltam, mielőtt sört kezdtem csapolni. A klubos törzsvendégeknek ma az első kör a házé. – Laci',
          likes: 88,
          comments: [
            { author: 'Mészáros Béla', text: 'Egészségedre, Laci.' },
            { author: 'Nagy Ferenc', text: 'Ott leszünk!' },
          ],
        },
      ],
    },
  ],

  puzzles: [
    {
      id: 'ch3-numbers',
      kind: 'match',
      title: 'Kié a három szám?',
      prompt: 'Gedeon telefonjában három névtelen szám van. Párosítsd őket a gazdájukkal.',
      left: [
        { id: 'ch3-n-412', text: '+36 30 412 7781' },
        { id: 'ch3-n-518', text: '+36 20 518 3364' },
        { id: 'ch3-n-266', text: '+36 30 266 0915' },
      ],
      right: [
        { id: 'ch3-p-toth', text: 'Tóth Ervin' },
        { id: 'ch3-p-meszaros', text: 'Mészáros Béla' },
        { id: 'ch3-p-pasztor', text: 'Pásztor László' },
        { id: 'ch3-p-ilona', text: 'Vidor Ilona' },
      ],
      answerHash: '0ecd9a3e1642dc36af46f611ba3b51311df94b692682998b682eb322421db159',
      conclusion:
        'Az elnök Tóth Ervin, a mindenes Pásztor László, a titkár Mészáros Béla. Gedeon nyáron mindhármukat megkereste, egyik sem beszélt vele.',
      hints: [
        'Mindhárom szám nyilvánosan is szerepel valahol: egy levélben, egy közösségi oldalon és egy régi újságcikkben.',
        'Nézd meg a polgármester hírlevelének aláírását, a Pásztor Söröző oldalát a Szomszédokon és a Fenyőházi Hírek 2001-es fesztivál-előzetesét.',
        'A 412-es szám Tóth Erviné, az 518-as Pásztor Lászlóé, a 266-os Mészáros Béláé (2001-ben 06-30/266-0915 alakban írták).',
      ],
    },
    {
      id: 'ch3-car-owner',
      kind: 'text',
      title: 'Kié az autó?',
      prompt: 'Ki volt a klubház mellett parkoló autó üzembentartója?',
      answerHash: '694e8aadf4658d2c071c50bf8a0f2e0dce8ca8c7710c60b1e8e71f8d10677285',
      hints: [
        'Nagyítsd ki a képet a Galériában: az autó rendszáma olvasható.',
        'A Böngésző könyvjelzői között van egy jármű-előzmény kereső, régi rendszámokra is lehet keresni.',
        'A rendszám GBM-418. Keresd meg a Régi Rendszám oldalon, és írd be az üzembentartó nevét.',
      ],
    },
    {
      id: 'ch3-timeline',
      kind: 'timeline',
      title: 'Hamis alibik',
      prompt: 'Rakd időrendbe, ki mit mondott a tűz éjszakájáról, és jelöld meg azt a vallomást, amelyik nem fér bele.',
      availableAfter: { type: 'puzzleSolved', puzzle: 'ch3-car-owner' },
      statements: [
        { id: 'ch3-t-toth', text: 'Tóth Ervin: „23 órától fél tizenkettőig a fesztiválsátorban voltam az üzemeltetőkkel.”' },
        { id: 'ch3-t-meszaros', text: 'Mészáros Béla: „23 órától éjfélig végig a színpad mögött voltam.”' },
        {
          id: 'ch3-t-ilona',
          text: 'Vidor Ilona könyvelő (Fenyőházi Hírek): „Fél tizenegykor zártam be az irodát, akkor még minden rendben volt.”',
        },
        {
          id: 'ch3-t-pasztor',
          text: 'Pásztor László: „Háromnegyed tizenegykor összevesztem Pállal a stégnél, aztán hazamentem.”',
        },
      ],
      answerHash: 'abb907f4d8b070b9fc9e1391ebe8f9408b098d9d8056e61f0128f6ceb3a2fdf7',
      conclusion:
        'Mészáros Béla nem volt végig a színpadnál: 23:05-kor az autója a klubháznál állt, ahol az irodában égett a villany.',
      hints: [
        'Rakd sorba a vallomásokat aszerint, hogy ki mikor kezdte, amit állít.',
        'Az egyik vallomásnak ellentmond egy fénykép.',
        'A 23:05-ös fotón Mészáros Béla autója a klubnál áll, ő ezt nem mondta. A többiek sorrendje: Vidor Ilona, Pásztor László, Tóth Ervin.',
      ],
    },
  ],

  evidence: [
    {
      id: 'ch3-toth-alibi',
      title: 'Tóth Ervin vallomása',
      description:
        '23 órától fél tizenkettőig a fesztiválsátorban tárgyalt az üzemeltetőkkel, ők tanúsíthatják. Hogy miről, nem mondja meg. Ezért mondott az újságnak 23:40-et.',
      source: { type: 'conversation', conversation: 'ch3-toth' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-toth' },
    },
    {
      id: 'ch3-pasztor-alibi',
      title: 'Pásztor László vallomása',
      description:
        '22:45-kor összeveszett Kerekes Pállal a stégnél a ki nem fizetett bére miatt, aztán hazament; a rendőrségnek ezt elhallgatta. Pál azt mondta neki: valaki lop a kasszából, most már tudja, ki, és a fesztivál után rendet tesz.',
      source: { type: 'conversation', conversation: 'ch3-pasztor-2' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-pasztor-2' },
    },
    {
      id: 'ch3-meszaros-claim',
      title: 'Mészáros Béla állítása',
      description: 'Azt mondja, 23 órától éjfélig végig a színpad mögött volt, ahonnan a klubot nem lehet látni.',
      source: { type: 'conversation', conversation: 'ch3-meszaros' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-meszaros' },
    },
    {
      id: 'ch3-car',
      title: 'Autó a klubháznál',
      description: 'A tűz éjszakáján 23:05-kor Mészáros Béla piros Opelje a klubház mellett parkolt. Az irodában égett a villany.',
      source: { type: 'photo', photo: 'ch3-photo-festival' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch3-car-owner' },
    },
    {
      id: 'ch3-meszaros-key',
      title: 'Mészáros titkos kulcsa',
      description:
        'Mészárosnak engedély nélkül csináltatott kulcsa volt a klubházhoz. 23 óra körül látta, hogy az irodában valaki a könyvelési dossziékat pakolja; a könyvelőre vagy Pálra gondolt, és visszafordult. Pár perccel később füst jött a raktár felől.',
      source: { type: 'conversation', conversation: 'ch3-meszaros-2' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-meszaros-2' },
    },
  ],

  notes: [
    {
      id: 'ch3-note-three',
      date: 'aug. 30.',
      text: 'Elnök – titkár – mindenes.\nMindhármat megkerestem. Egyik sem beszél.',
    },
    {
      id: 'ch3-note-witnesses',
      date: 'szept. 2.',
      text: 'Aznap este ezren voltak a sétányon. Valaki biztosan látott valamit.\nA régiek ma is mesélnek – Szomszédok?',
    },
  ],

  characters: [
    { id: 'pasztor', name: 'Pásztor László', roleThen: 'a vitorlásklub mindenese', roleNow: 'a Pásztor Söröző gazdája', knownWhen: numbersSolved },
    { id: 'meszaros', name: 'Mészáros Béla', roleThen: 'a vitorlásklub titkára', roleNow: 'nyugdíjas', knownWhen: numbersSolved },
  ],

  characterFacts: [
    { id: 'ch3-f-toth-phone', character: 'toth', text: 'Mobilszáma: +36 30 412 7781.', knownWhen: numbersSolved },
    {
      id: 'ch3-f-toth-tent',
      character: 'toth',
      text: '23 órától fél tizenkettőig a fesztiválsátorban tárgyalt az üzemeltetőkkel. Hogy miről, nem mondja meg.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch3-toth' },
    },
    { id: 'ch3-f-pasztor-phone', character: 'pasztor', text: 'Mobilszáma: +36 20 518 3364.', knownWhen: numbersSolved },
    {
      id: 'ch3-f-pasztor-police',
      character: 'pasztor',
      text: 'A rendőrségnek azt mondta, a tűzijáték után hazament.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch3-pasztor' },
    },
    {
      id: 'ch3-f-pasztor-fight',
      character: 'pasztor',
      text: '22:45-kor összeveszett Pállal a stégnél a ki nem fizetett bére miatt, aztán hazament. Ezt a rendőrségnek elhallgatta.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch3-pasztor-2' },
    },
    { id: 'ch3-f-meszaros-phone', character: 'meszaros', text: 'Mobilszáma: +36 30 266 0915 (2001-ben is ez volt).', knownWhen: numbersSolved },
    {
      id: 'ch3-f-meszaros-claim',
      character: 'meszaros',
      text: 'Azt állította, 23 órától éjfélig végig a színpad mögött volt.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch3-meszaros' },
    },
    {
      id: 'ch3-f-meszaros-car',
      character: 'meszaros',
      text: 'A 23:05-ös fesztiválfotón a piros Opelje (GBM-418) a klubháznál áll.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch3-car-owner' },
    },
    {
      id: 'ch3-f-meszaros-key',
      character: 'meszaros',
      text: 'Titkos kulcsa volt a klubházhoz. 23 óra körül látta, hogy valaki az irodában a dossziékat pakolja, de visszafordult.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch3-meszaros-2' },
    },
    {
      id: 'ch3-f-pal-thief',
      character: 'pal',
      text: 'A tűz estéjén azt mondta Pásztornak: valaki lop a kasszából, most már tudja, ki, és a fesztivál után rendet tesz.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch3-pasztor-2' },
    },
  ],

  outro: [
    'Tóth Ervin a sátorban tárgyalt, Pásztor László összeveszett Pállal és hazament, Mészáros Béla a saját kulcsával ott járt – és visszafordult.',
    'Valaki pár perccel a tűz előtt a könyvelési dossziékat pakolta az irodában. Kerekes Pál pedig azon az estén azt mondta: valaki lop, és most már tudja, ki.',
    'Ha a tűz a könyvek miatt volt, a könyveknél kell folytatni.',
  ],

  completedWhen: {
    type: 'all',
    conditions: [
      { type: 'conversationFinished', conversation: 'ch3-meszaros-2' },
      { type: 'conversationFinished', conversation: 'ch3-pasztor-2' },
      { type: 'conversationFinished', conversation: 'ch3-unknown' },
    ],
  },
}
