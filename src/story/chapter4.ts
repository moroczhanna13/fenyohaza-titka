import type { Chapter } from './types'

/** 4. fejezet – A könyvelés */
export const chapter4: Chapter = {
  id: 'ch4',
  number: 4,
  title: 'A könyvelés',

  intro: [
    'Kerekes Pál a halála estéjén azt mondta: valaki lop a kasszából, és most már tudja, ki. A könyvek elégtek a tűzben.',
    'Legalábbis mindenki ezt hitte.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch4-unknown',
      contact: 'Ismeretlen szám',
      thread: 'ch1-unknown',
      steps: [
        { type: 'message', from: 'contact', text: 'Mondtam, hogy talán tudok segíteni.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Pál minden hónap végén lefénymásolta a kasszakönyvet, és hazavitte. Nem bízott senkiben.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Tavaly, amikor anyám meghalt, a padlásán találtam meg a másolatokat egy cipősdobozban. Gedeon napokig ült felettük.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Átküldtem a legutolsót, 2001 júniusából. Én nem értek a könyveléshez. Gedeon értett.',
        },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch4-ledger' } },
        {
          type: 'message',
          from: 'player',
          text: 'A június 27-i sor nem stimmel. 450 000 forint jött be, az egyenleg mégis csak 150 000-rel nőtt. A sort V. I. szignálta.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'V. I. – Vidor Ilona, a klub akkori könyvelője. Ma ő a patikus.',
              replies: [{ type: 'message', from: 'contact', text: 'Tudom, ki ő. Mindenki tudja.' }],
            },
            {
              text: 'Ez a könyvelő szignója. Vidor Ilonáé.',
              replies: [{ type: 'message', from: 'contact', text: 'Ilona…' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'player',
          text: 'A margón Pál kézírása: „Már a harmadik év. Összesen kb. 4,5 millió? Közgyűlés után feljelentés!”',
        },
        { type: 'message', from: 'contact', text: 'Négy és fél millió. Akkoriban egy házat lehetett venni belőle Fenyőházán.' },
        { type: 'message', from: 'contact', text: 'Akkor Pál nem csak gyanakodott. Tudta.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Ilona ma is itt él, a Fő téren van a patikája. Gedeon is oda járt, nem volt másik.',
        },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch4-dose' } },
        {
          type: 'message',
          from: 'player',
          text: 'Gedeon receptjén 5 mg-os vérnyomáscsökkentő állt. A patikában szeptember 13-án mégis 10 mg-osat kapott – lefotózta a dobozt.',
        },
        { type: 'message', from: 'contact', text: '…' },
        { type: 'message', from: 'contact', text: 'Kétszeres adag. Másnap leesett a lépcsőn.' },
        { type: 'message', from: 'contact', text: 'Ki adta ki neki?' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch4-pharmacy-password' } },
        {
          type: 'message',
          from: 'player',
          text: 'Bejutottam a patika belső rendszerébe. Szeptember 13-án Gedeon a felírt 5 mg helyett 10 mg-ot kapott, orvosi jóváhagyás nélkül. Kiadta: V. I.',
        },
        { type: 'message', from: 'contact', text: '…' },
        { type: 'message', from: 'contact', text: 'Huszonöt év után ugyanaz a két betű.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch4-identity' } },
        { type: 'message', from: 'player', text: 'Tudom, ki maga. Kerekes Réka, Pál lánya.' },
        { type: 'message', from: 'contact', text: '…' },
        { type: 'message', from: 'contact', text: 'Gedeon az első héten rájött. Maga tovább bírta.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Holnap mindent elmondok. Azt is, amit Gedeonnak sem mondtam el.',
        },
      ],
    },
  ],

  photos: [],

  pages: [
    {
      kind: 'static',
      id: 'ch4-pharmacy-public',
      url: 'fenyopatika.hu',
      title: 'Fenyő Patika',
      intro: 'Gyógyszertár Fenyőháza szívében, 2004 óta.',
      blocks: [
        { type: 'text', text: 'Fenyőháza, Fő tér 3. · Nyitva: hétköznap 8–18 óráig, szombaton 8–12 óráig' },
        { type: 'heading', text: 'Hírek' },
        { type: 'text', text: 'Októbertől ismét kapható az influenza elleni védőoltás. Kérje gyógyszerészünk tanácsát!' },
        { type: 'text', text: 'Új gyógyteakeverékeink a pult mellett kóstolhatók.' },
        { type: 'heading', text: 'Munkatársaink' },
        { type: 'text', text: 'Vidor Ilona – vezető gyógyszerész, tulajdonos · Kovács Zsófia – gyógyszerész · Németh Péter – gyakornok' },
        { type: 'link', text: 'Munkatársi belépés', url: 'fenyopatika.hu/belso' },
      ],
    },
    {
      kind: 'social',
      id: 'ch4-social-ilona',
      url: 'szomszedok.hu/vidor.ilona',
      title: 'Fenyőházi Szomszédok – Vidor Ilona',
      profileType: 'person',
      name: 'Vidor Ilona',
      about: 'Patikus. Kutyás, teás, könyves.',
      details: ['Fenyőháza', 'Fenyő Patika – fenyopatika.hu'],
      posts: [
        {
          author: 'Vidor Ilona',
          time: '2024. március 1.',
          text: 'Húsz éve, 2004. március 1-jén nyitottuk meg a Fenyő Patikát – saját erőből, hitel nélkül. Köszönöm minden kedves vásárlónak, hogy azóta is minket választ!',
          likes: 112,
          comments: [
            { author: 'Kovács Zsófia', text: 'Isten éltesse a patikát és a főnököt!' },
            { author: 'Nagy Ferenc', text: 'Saját erőből, le a kalappal.' },
          ],
        },
        {
          author: 'Vidor Ilona',
          time: '2023. augusztus 6.',
          text: 'Bodri ma tizenkét éves. Még mindig ő a főnök a pult mögött.',
          likes: 87,
          comments: [{ author: 'Bencze Margit', text: 'Boldog születésnapot, Bodri!' }],
        },
        {
          author: 'Vidor Ilona',
          time: '2023. július 22.',
          text: 'Idén sem megyek ki a fesztiválra. Valahogy nem megy.',
          likes: 5,
          comments: [{ author: 'Horváth Imre', text: 'Megértjük, Ilona.' }],
        },
        {
          author: 'Vidor Ilona',
          time: '2022. május 14.',
          text: 'Megérkeztek az új gyógyteakeverékeink. Kóstolják meg!',
          likes: 19,
        },
      ],
    },
    {
      kind: 'login',
      id: 'ch4-pharmacy',
      url: 'fenyopatika.hu/belso',
      title: 'Fenyő Patika – belső rendszer',
      intro: 'Csak munkatársaknak.',
      users: [
        { name: 'Kovács Zsófia', passwordHint: 'A jelszó-emlékeztetőt a rendszergazda kapja meg e-mailben.' },
        { name: 'Németh Péter (gyakornok)', passwordHint: 'A jelszó-emlékeztetőt a rendszergazda kapja meg e-mailben.' },
        { name: 'Vidor Ilona', passwordHint: 'Jelszó-emlékeztető (a felhasználó adta meg): „a kutyám + a legfontosabb évszám”' },
      ],
      user: 'Vidor Ilona',
      puzzle: 'ch4-pharmacy-password',
      blocks: [
        { type: 'heading', text: 'Kiadási napló – Berényi Gedeon, vérnyomáscsökkentő tabletta' },
        {
          type: 'table',
          headers: ['Dátum', 'Recepten', 'Kiadva', 'Kiadta'],
          rows: [
            ['2026.03.02.', '5 mg', '5 mg', 'K. Zs.'],
            ['2026.06.10.', '5 mg', '5 mg', 'K. Zs.'],
            ['2026.09.13.', '5 mg', '10 mg', 'V. I.'],
          ],
        },
        {
          type: 'text',
          text: 'Megjegyzés a 2026.09.13-i tételhez: „Hatáserősség-csere a beteg kérésére.” Orvosi jóváhagyás: nincs.',
        },
        { type: 'heading', text: 'Belső üzenet – 2026.09.12., V. I. → K. Zs.' },
        { type: 'text', text: '„Berényi úr receptjét holnap én adom ki, ne foglalkozz vele.”' },
      ],
    },
  ],

  puzzles: [
    {
      id: 'ch4-ledger',
      kind: 'ledger',
      title: 'A kasszakönyv',
      prompt: 'Melyik sorban nem stimmel az egyenleg?',
      caption: 'Kerekes Pál fénymásolata – Fenyőházi Vitorlásklub, kasszakönyv, 2001. június',
      note: 'A margón, Pál kézírásával: „Már a harmadik év. Összesen kb. 4,5 millió? Közgyűlés után feljelentés!”',
      rows: [
        { id: 'ch4-r-open', date: 'VI. 1.', text: 'Nyitó egyenleg', balance: 1240000, signed: 'K. P.' },
        { id: 'ch4-r-dues', date: 'VI. 5.', text: 'Tagdíjak (június)', income: 86000, balance: 1326000, signed: 'K. P.' },
        { id: 'ch4-r-sail', date: 'VI. 9.', text: 'Vitorlajavítás', expense: 54000, balance: 1272000, signed: 'K. P.' },
        { id: 'ch4-r-print', date: 'VI. 14.', text: 'Fesztiválplakátok, nyomda', expense: 38500, balance: 1233500, signed: 'V. I.' },
        { id: 'ch4-r-rent', date: 'VI. 20.', text: 'Hajóbérlés bevétele', income: 120000, balance: 1353500, signed: 'K. P.' },
        {
          id: 'ch4-r-advance',
          date: 'VI. 27.',
          text: 'Fesztivál-előleg az üzemeltetőktől',
          income: 450000,
          balance: 1503500,
          signed: 'V. I.',
        },
        { id: 'ch4-r-power', date: 'VI. 29.', text: 'Áramszámla', expense: 22400, balance: 1481100, signed: 'V. I.' },
        { id: 'ch4-r-close', date: 'VI. 30.', text: 'Záró egyenleg', balance: 1481100, signed: 'V. I.' },
      ],
      answerHash: '365ed79fd5a2407479626e94480b87642f75288d150fa243a1c54615810920a7',
      conclusion:
        'A június 27-i sorban 450 000 Ft bevétel után az egyenleg csak 150 000 Ft-tal nőtt. 300 000 Ft eltűnt. A sort V. I., Vidor Ilona szignálta – és Pál szerint ez már a harmadik éve tartott.',
      hints: [
        'Minden sorban: egyenleg = előző egyenleg + bevétel − kiadás.',
        'Számold végig a sorokat fentről lefelé, és figyeld, hol nem jön ki a következő egyenleg.',
        'A június 27-i sor: 1 353 500 + 450 000 nem 1 503 500.',
      ],
    },
    {
      id: 'ch4-dose',
      kind: 'connect',
      title: 'Mi nem stimmel Gedeon gyógyszerével?',
      prompt: 'Melyik két állítás nem lehet egyszerre igaz, ha a patika azt adta ki, amit az orvos felírt?',
      availableAfter: { type: 'puzzleSolved', puzzle: 'ch4-ledger' },
      statements: [
        { id: 'ch4-s-sms', text: 'Fenyő Patika, szept. 12.: megérkezett Gedeon új vérnyomás-gyógyszere.' },
        { id: 'ch4-s-erecept', text: 'E-recept, szept. 10.: Amlodipin 5 mg, naponta 1 tabletta.' },
        { id: 'ch4-s-note', text: 'Gedeon jegyzete, szept. 13.: az új doboz más színű, mint eddig.' },
        { id: 'ch4-s-box', text: 'Gedeon fotója, szept. 13.: a patikai címkés dobozon Amlodipin 10 mg áll.' },
        { id: 'ch4-s-stairs', text: 'Gedeon szeptember közepén leesett a lépcsőn.' },
      ],
      answerHash: 'd659dd7b2e90848affe831a11237e4b40fa9e5c6ef30c27611bcbdb1ffb0bac1',
      conclusion:
        'Gedeon orvosa 5 mg-ot írt fel, a patikában mégis 10 mg-os dobozt kapott: kétszeres adagot. Ki adta ki neki?',
      hints: [
        'Gedeon gyógyszeréről több helyen is van adat: a leveleiben, a Galériában és a jegyzeteiben.',
        'Hasonlítsd össze, mennyit írt fel az orvos, és mennyi áll a dobozon.',
        'Kösd össze az e-receptet (5 mg) Gedeon szeptember 13-i fotójával (10 mg).',
      ],
    },
    {
      id: 'ch4-pharmacy-password',
      kind: 'text',
      title: 'A patika jelszava',
      prompt: 'Jelszó',
      whereToSolve: 'A jelszót a patika belső felületén kell beírni (Böngésző). A patika címe ott van a Fenyő Patika üzenetében.',
      answerHash: '3aae5cfbd52907de94fddd9f9ee4a4c7f8be35acd3cff808727ac6f56ff48ff5',
      hints: [
        'A patika üzenetének végén ott a weboldal címe: fenyopatika.hu. Az oldal alján van a munkatársi belépés.',
        'Válaszd ki Vidor Ilonát, és nézd meg az „Elfelejtett jelszó?” alatti emlékeztetőt. Ilona profilját a Szomszédok keresőjével találod meg.',
        'A kutyája Bodri, a patika 2004-ben nyílt. A jelszó: bodri2004.',
      ],
    },
    {
      id: 'ch4-identity',
      kind: 'text',
      title: 'Ki az ismeretlen üzenő?',
      prompt: 'Írd be a teljes nevét.',
      answerHash: 'e55092cc9881a1dd51925a97eeb283df603632e0da2598380ca022aa7356316e',
      hints: [
        'Kinél lehettek Kerekes Pál otthoni másolatai huszonöt évig?',
        'Az üzenő anyja tavaly halt meg. Nézd meg Pál gyászjelentését a Fenyőházi Hírek archívumában, a tűz utáni napokban.',
        'A gyászjelentés szerint Pált a felesége és a lánya, Réka gyászolta. Az üzenő: Kerekes Réka.',
      ],
    },
  ],

  evidence: [
    {
      id: 'ch4-ledger-row',
      title: 'A hamisított sor',
      description:
        'Pál kasszakönyv-másolatában a június 27-i sorból 300 000 Ft hiányzik. A sort V. I., Vidor Ilona könyvelő szignálta – három héttel a tűz előtt. Pál margójegyzete szerint a lopás már harmadik éve tartott, összesen kb. 4,5 millió Ft, és a közgyűlés után feljelentést akart tenni.',
      source: { type: 'puzzle', puzzle: 'ch4-ledger' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch4-ledger' },
    },
    {
      id: 'ch4-double-dose',
      title: 'Kétszeres adag',
      description:
        'Gedeon háziorvosa 5 mg-os vérnyomáscsökkentőt írt fel, a Fenyő Patikában szeptember 13-án mégis 10 mg-os dobozt kapott. Másnap leesett a lépcsőn.',
      source: { type: 'puzzle', puzzle: 'ch4-dose' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch4-dose' },
    },
    {
      id: 'ch4-pharmacy-log',
      title: 'A patika kiadási naplója',
      description:
        'Gedeon szeptember 13-án a felírt 5 mg helyett 10 mg-os vérnyomáscsökkentőt kapott, orvosi jóváhagyás nélkül. Kiadta: V. I. Előző nap Ilona szólt a kollégájának, hogy Gedeon receptjét ő adja ki.',
      source: { type: 'puzzle', puzzle: 'ch4-pharmacy-password' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch4-pharmacy-password' },
    },
    {
      id: 'ch4-reka-identity',
      title: 'Az ismeretlen üzenő',
      description:
        'Kerekes Réka, Kerekes Pál lánya. Ő írt Gedeonnak márciusban, és nála voltak az apja kasszakönyv-másolatai.',
      source: { type: 'puzzle', puzzle: 'ch4-identity' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch4-identity' },
    },
  ],

  notes: [
    {
      id: 'ch4-note-copies',
      date: 'ápr. 2.',
      text: 'Pál másolatai: minden hónap egy lap.\nSoronként végigszámolni – valahol nem jön ki.',
    },
  ],

  characterFacts: [
    {
      id: 'ch4-f-pal-copies',
      character: 'pal',
      text: 'Minden hónap végén lefénymásolta a kasszakönyvet és hazavitte. Margójegyzete szerint a lopás harmadik éve tartott (kb. 4,5 millió Ft), és feljelentést akart tenni.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch4-ledger' },
    },
    {
      id: 'ch4-f-ilona-row',
      character: 'ilona',
      text: 'A kasszakönyv hamis, június 27-i sorát ő szignálta (V. I.).',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch4-ledger' },
    },
    {
      id: 'ch4-f-ilona-profile',
      character: 'ilona',
      text: 'A Fenyő Patikát 2004-ben nyitotta, „saját erőből, hitel nélkül”. A kutyája Bodri.',
      knownWhen: { type: 'pageVisited', page: 'ch4-social-ilona' },
    },
    {
      id: 'ch4-f-ilona-dose',
      character: 'ilona',
      text: 'Szeptember 12-én szólt a kollégájának, hogy Gedeon receptjét ő adja ki; 13-án 5 mg helyett 10 mg-ot adott ki neki, orvosi jóváhagyás nélkül.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch4-pharmacy-password' },
    },
    {
      id: 'ch4-f-gedeon-dose',
      character: 'gedeon',
      text: 'Szeptember 13-án a felírt 5 mg helyett 10 mg-os vérnyomáscsökkentőt kapott a patikában. Másnap leesett a lépcsőn.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch4-dose' },
    },
    {
      id: 'ch4-f-reka-name',
      character: 'reka',
      text: 'Kerekes Pál lánya. Tavaly, az anyja halála után találta meg a padláson az apja kasszakönyv-másolatait.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch4-identity' },
      rename: 'Kerekes Réka',
    },
  ],

  outro: [
    'Egy sor a kasszakönyvben: háromszázezer forint, V. I. szignóval – és egy margójegyzet, hogy ez csak a harmadik év része.',
    'Huszonöt évvel később ugyanez a kézjegy egy kiadási naplóban, egy kétszeres erősségű tabletta mellett.',
    'Az ismeretlen üzenőnek most már neve van. Kerekes Réka holnap mindent elmond – azt is, amit Gedeonnak sem.',
  ],

  completedWhen: { type: 'conversationFinished', conversation: 'ch4-unknown' },
}
