import type { Chapter } from './types'

/** 2. fejezet – A tó éjszakája */
export const chapter2: Chapter = {
  id: 'ch2',
  number: 2,
  title: 'A tó éjszakája',

  intro: [
    'Ha tudni akarod, mi történt azon az éjszakán, a régi újságoknál kell kezdened.',
    'A Fenyőházi Hírek archívuma ma már online is elérhető. Gedeon postafiókjában ott a levél róla.',
  ],

  apps: [{ app: 'browser' }, { app: 'deductions' }],

  conversations: [
    {
      id: 'ch2-unknown',
      contact: 'Ismeretlen szám',
      thread: 'ch1-unknown',
      steps: [
        { type: 'message', from: 'contact', text: 'Kint volt a romoknál?' },
        {
          type: 'choice',
          options: [
            {
              text: 'Igen. Nem sok maradt belőle.',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Huszonöt év alatt senki nem takarította el. Mintha mindenki úgy döntött volna, hogy nem nézi.',
                },
              ],
            },
            {
              text: 'Mit kellett volna ott találnom?',
              replies: [{ type: 'message', from: 'contact', text: 'Semmit. Csak látnia kellett.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Gedeon egy héttel a halála előtt ezt küldte nekem.',
          photo: 'ch2-photo-firelog',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Nézze meg, mikor riasztották a tűzoltókat. Aztán nézze meg, mit írt akkor az újság.',
        },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch2-article-time' } },
        { type: 'message', from: 'player', text: 'Az újság szerint 23:40-kor.' },
        { type: 'message', from: 'contact', text: 'A napló szerint 23:10-kor. Fél óra.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Valaki hazudott. Kösse össze, ami nem stimmel – Gedeon is így csinálta.',
        },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch2-who-lied' } },
        { type: 'message', from: 'contact', text: 'Tóth Ervin. Akkor klubelnök, ma polgármester.' },
        { type: 'message', from: 'contact', text: 'Fél órát tagadott le abból az éjszakából.' },
        {
          type: 'choice',
          options: [
            {
              text: 'És a két tűzfészek?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Egy zárlat nem gyullad ki két helyen egyszerre. Gedeon is ezt mondta.',
                },
              ],
            },
            {
              text: 'Maga kit gyanúsít?',
              replies: [{ type: 'message', from: 'contact', text: 'Mindenkit, aki aznap éjjel a klub körül volt.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'A tűz nem véletlen volt. Ezt most már maga is tudja.' },
        { type: 'message', from: 'contact', text: 'Holnap írok.' },
      ],
    },
  ],

  photos: [
    {
      id: 'ch2-photo-firelog',
      src: 'images/ch2/firelog.svg',
      alt: 'Kézzel vezetett tűzoltósági eseménynapló egy oldala, 2001. július 21., szombat. 21:40 – gyakorlat vége. 23:10 – telefonos bejelentés: ég a Vitorlásklub, Kikötő sétány 4. (piros karikával bekarikázva). 23:14 – kivonulás két géppel. 23:21 – helyszín, tűz két ponton: iroda és csónakraktár. 01:35 – eloltva, egy halott, a gondnok, a raktárban.',
      info: { takenAt: '2026-09-05T11:20', place: 'Fenyőháza, Tűzoltószertár' },
    },
  ],

  pages: [
    {
      kind: 'newsArchive',
      id: 'ch2-archive',
      url: 'fenyohazihirek.hu/archivum',
      title: 'Fenyőházi Hírek – Archívum',
      intro: 'Lapszámaink 1990-től. Válassz egy napot: a keresés az adott nap és az azt követő három nap cikkeit mutatja.',
      bookmarked: true,
      searchDays: 3,
      articles: [
        {
          id: 'ch2-article-preview',
          date: '2001-07-16',
          title: 'Hétvégén újra Tavi Fesztivál',
          body: [
            'Július 20-án és 21-én ismét a Kikötő sétányon lesz a Tavi Fesztivál. Lesz vásár, sétahajózás és esti koncert a víz mellett.',
            'A szombati zárónapon 22:30-kor kezdődik a tűzijáték, amelyet hagyományosan a vitorlásklub szervez. A programot Mészáros Béla klubtitkár fogja össze.',
          ],
        },
        {
          id: 'ch2-article-fire',
          date: '2001-07-23',
          title: 'Leégett a vitorlásklub – a gondnok a lángok között halt meg',
          author: '(sz. t.)',
          body: [
            'Szombat éjjel, a Tavi Fesztivál zárónapján porig égett a Fenyőházi Vitorlásklub Kikötő sétányi klubháza. A tűzben életét vesztette Kerekes Pál (54), a klub gondnoka.',
            'Tóth Ervin klubelnök lapunknak elmondta: 23 óra 40 perckor értesült a tűzről, és azonnal riasztotta a tűzoltókat. „Mire kiértek, már a tető is égett” – mondta.',
            'A rendőrség szerint minden jel balesetre utal: a tüzet valószínűleg elektromos zárlat okozta. Idegenkezűségre nincs adat.',
            'A klub vezetősége gyűjtést szervez az újjáépítésre.',
          ],
        },
        {
          id: 'ch2-article-collection',
          date: '2001-07-30',
          title: 'Gyűjtés indul a klubházért',
          body: [
            'A vitorlásklub vezetősége gyűjtést szervez a leégett klubház újjáépítésére. Az adományokat a polgármesteri hivatalban is fogadják.',
            'Vidor Ilona, a klub könyvelője szerint a tűzben a pénztárkönyv és a teljes könyvelés is odaveszett. „Fél tizenegykor zártam be az irodát, akkor még minden rendben volt” – mondta lapunknak.',
          ],
        },
      ],
    },
  ],

  puzzles: [
    {
      id: 'ch2-article-time',
      kind: 'text',
      title: 'Mit írt az újság?',
      prompt: 'Hány órakor riasztotta a tűzoltókat Tóth Ervin a cikk szerint?',
      answerHash: 'f15a3a5d34619f23d79d4124224e69f757a36d8ffb90aa7c17bf085ceb6cd53a',
      hints: [
        'A Fenyőházi Hírek archívuma a Böngészőben, a könyvjelzők között van.',
        'Az archívumban napra lehet keresni. A fesztivál dátuma a Galériában lévő plakáton áll.',
        'Keress 2001. július 21-re, és nyisd meg a tűzről szóló cikket. A második bekezdésben Tóth Ervin mondja meg az időpontot.',
      ],
    },
    {
      id: 'ch2-who-lied',
      kind: 'connect',
      title: 'Ki hazudott az időről?',
      prompt: 'Melyik két állítás mond ellent egymásnak a riasztás időpontjáról?',
      availableAfter: { type: 'puzzleSolved', puzzle: 'ch2-article-time' },
      statements: [
        { id: 'ch2-s-fireworks', text: 'Plakát: a tűzijáték szombaton 22:30-kor kezdődött.' },
        { id: 'ch2-s-toth', text: 'Tóth Ervin a cikkben: 23:40-kor értesült a tűzről, és azonnal riasztotta a tűzoltókat.' },
        { id: 'ch2-s-police', text: 'Rendőrség: a tüzet valószínűleg elektromos zárlat okozta.' },
        { id: 'ch2-s-log', text: 'Tűzoltónapló: a bejelentés 23:10-kor érkezett.' },
        { id: 'ch2-s-two-fires', text: 'Tűzoltónapló: a tűz két ponton, az irodában és a csónakraktárban égett.' },
      ],
      answerHash: '6d21a1314ffcaede1fa1ecad460c9ae09b4e4527a03243c72acb063bddb7990f',
      conclusion:
        'Tóth Ervin fél órával későbbre tette a riasztást, mint ahogy a napló szerint történt. Mit csinált 23:10 és 23:40 között?',
      hints: [
        'Két állítás ugyanarról az eseményről szól, de más időpontot mond.',
        'Mindkettő a tűzoltók riasztásáról szól.',
        'Kösd össze Tóth Ervin állítását a tűzoltónapló 23:10-es bejegyzésével.',
      ],
    },
  ],

  evidence: [
    {
      id: 'ch2-firelog',
      title: 'A tűzoltók naplója',
      description: 'A bejelentés 23:10-kor érkezett. A tűz két ponton, az irodában és a csónakraktárban égett – zárlatnál ez szinte lehetetlen.',
      source: { type: 'photo', photo: 'ch2-photo-firelog' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch2-article-time' },
    },
    {
      id: 'ch2-article',
      title: 'A Fenyőházi Hírek cikke',
      description: '2001. július 23.: Tóth Ervin klubelnök szerint 23:40-kor riasztotta a tűzoltókat. A rendőrség zárlatra gyanakodott.',
      source: { type: 'puzzle', puzzle: 'ch2-article-time' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch2-article-time' },
    },
    {
      id: 'ch2-toth-lied',
      title: 'Tóth Ervin fél órája',
      description: 'Tóth Ervin 23:40-et mondott az újságnak, pedig a riasztás 23:10-kor volt. Fél órát letagadott.',
      source: { type: 'puzzle', puzzle: 'ch2-who-lied' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch2-who-lied' },
    },
  ],

  outro: [
    'A tűz nem zárlat volt: két helyen égett egyszerre. Tóth Ervin, aki ma a város polgármestere, fél órát letagadott abból az éjszakából.',
    'De nem ő volt az egyetlen, aki aznap éjjel a klub körül járt.',
  ],

  completedWhen: { type: 'conversationFinished', conversation: 'ch2-unknown' },
}
