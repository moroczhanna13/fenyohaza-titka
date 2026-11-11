import type { Chapter, Condition, StoryCase } from './types'

const sourceFound: Condition = { type: 'puzzleSolved', puzzle: 'au-source' }
const lieFound: Condition = { type: 'puzzleSolved', puzzle: 'au-lie' }

/** Mellékügy – A hamis aukció */
const chapter: Chapter = {
  id: 'au',
  title: 'A hamis aukció',

  intro: [
    'Péntek délelőtt, 2026. október 30. Juhász Margit, a szomszéd, gyönyörű ingaórát talált a Bolhapiacon.',
    'Az eladó előleget kér, ma este hatig. Margit néni előbb még téged kérdez.',
  ],

  apps: [
    { app: 'messages' },
    { app: 'gallery' },
    { app: 'browser' },
    { app: 'notebook' },
    { app: 'deductions' },
  ],

  conversations: [
    {
      id: 'au-margit',
      contact: 'Juhász Margit',
      steps: [
        {
          type: 'message',
          from: 'contact',
          text: 'Kedvesem, Petra unokám mondta, hogy maga ért ezekhez az internetes dolgokhoz. Találtam a Bolhapiacon egy gyönyörű ingaórát, olyat, amilyen a nagyapámnak volt!',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Csak 85 000 forint. Az eladó kedves hölgy, fenyőházi. Csak 30 000 forint előleget kér, ma este hatig.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Küldje át, megnézem.',
              replies: [{ type: 'message', from: 'contact', text: 'Már küldöm is, ahogy Petra mutatta.' }],
            },
            {
              text: 'Még ne utaljon semmit!',
              replies: [{ type: 'message', from: 'contact', text: 'Jaj, de hát akkor elviszik előlem!' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Lementettem a képét a hirdetésből.',
          photo: 'au-clock',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Ez meg a hölgy fényképe a profiljáról. Nézze, milyen kedves arc.',
          photo: 'au-portrait',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'A hirdetés a bolhapiac.hu-n van. Kovács Erika a neve.',
        },
        { type: 'message', from: 'contact', text: 'Na, mit gondol? Honnan van az a szép kép?' },
        { type: 'wait', until: sourceFound },
        {
          type: 'message',
          from: 'player',
          text: 'Utánanéztem a képnek. Az óra fotója a Vértes Aukciósház katalógusából van, 2019 tavaszán árverezték el.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Vértes Aukciósház? 2019-ben? De hát azt írta, tegnap fényképezte a nagymamája nappalijában…',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Valaki más képét használja.',
              replies: [{ type: 'message', from: 'contact', text: 'De miért tenne ilyet egy rendes ember?' }],
            },
            {
              text: 'Ezt az órát már hét éve eladták.',
              replies: [{ type: 'message', from: 'contact', text: 'Akkor mit akar nekem eladni?' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Írtam neki, hogy átmennék megnézni. Azt felelte, sajnos nem lehet, mert külföldön dolgozik, a futár hozza. De hát a profilján az áll, hogy Fenyőházán él…',
        },
        { type: 'message', from: 'contact', text: 'Akkor most melyik igaz?' },
        { type: 'wait', until: lieFound },
        {
          type: 'message',
          from: 'player',
          text: 'A kettő nem lehet egyszerre igaz. Aki születése óta Fenyőházán él, az nem dolgozik úgy külföldön, hogy egy órát se tudjon megmutatni.',
        },
        { type: 'message', from: 'contact', text: 'Szóval egyik sem. Ez a Kovács Erika nem is létezik.' },
        { type: 'message', from: 'contact', text: 'Petra szerint jelenteni kell a hirdetést. Segít?' },
        {
          type: 'choice',
          options: [
            {
              text: 'Bejelentem a Bolhapiacnál.',
              replies: [{ type: 'message', from: 'contact', text: 'Köszönöm, kedvesem.' }],
            },
            {
              text: 'Jelentsük együtt, megmutatom, hogyan kell.',
              replies: [{ type: 'message', from: 'contact', text: 'Na, ezt megtanulom. Legközelebb egyedül is megy.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Egy óra múlva eltűnt a hirdetés is, a profil is. A 30 000 forint meg itt maradt a számlámon.',
        },
        { type: 'message', from: 'contact', text: 'Ha legközelebb gyönyörű órát látok, előbb magának szólok.' },
      ],
    },
  ],

  pages: [
    {
      kind: 'static',
      id: 'au-ad',
      url: 'bolhapiac.hu/hirdetes/44718',
      title: 'Antik ingaóra, 1890 körül – 85 000 Ft',
      intro: 'Feladva: okt. 29. · Fenyőháza · Hirdető: Kovács Erika',
      bookmarked: true,
      blocks: [
        { type: 'heading', text: 'Leírás' },
        {
          type: 'text',
          text: '„Bécsi ingaóra, diófa ház, tökéletesen működik. Nagymamám hagyatékából, ő is fenyőházi volt. Az órát tegnap fotóztam a nappalijában.”',
        },
        {
          type: 'text',
          text: '„Személyesen sajnos nem lehet átvenni, mert külföldön dolgozom. Futárral küldöm, miután megérkezett a 30 000 Ft előleg. Az előleget ma 18 óráig kérem, mert sok az érdeklődő.”',
        },
        { type: 'heading', text: 'Fizetés' },
        { type: 'text', text: 'Előre utalás. A számlaszámot üzenetben küldöm.' },
      ],
    },
    {
      kind: 'static',
      id: 'au-profile',
      url: 'bolhapiac.hu/profil/kovacs.erika',
      title: 'Kovács Erika profilja',
      intro: '„Fenyőházán élek születésem óta, szeretem a régi dolgokat.”',
      bookmarked: true,
      blocks: [
        {
          type: 'table',
          headers: ['Tag', 'Értékelés', 'Hirdetés'],
          rows: [['2026. okt. 28. óta', 'nincs', '3 aktív']],
        },
        { type: 'heading', text: 'További hirdetései' },
        {
          type: 'table',
          headers: ['Hirdetés', 'Ár'],
          rows: [
            ['Antik ingaóra, 1890 körül', '85 000 Ft'],
            ['Bontatlan okostelefon', '45 000 Ft'],
            ['Gyerekbicikli, alig használt', '15 000 Ft'],
          ],
        },
      ],
    },
    {
      kind: 'imageSearch',
      id: 'au-image-search',
      url: 'kepkereso.hu',
      title: 'Képkereső',
      intro: 'Válassz egy képet a galériádból, és megmutatjuk, hol szerepel még az interneten.',
      bookmarked: true,
      searches: [
        {
          id: 'au-search-clock',
          photo: 'au-clock',
          matches: [
            {
              title: 'Antikórák fórum – „Ilyen órát árulnak, mennyit érhet?”',
              url: 'antikorak.hu/forum/tema/9932',
              date: '2024. május 3.',
              snippet: 'Valaki ugyanezt a képet töltötte fel. Válasz: „Ez a Vértes Aukciósház katalógusából van. Vigyázz, nem ez az első hirdetés vele.”',
            },
            {
              title: 'Vértes Aukciósház – 2019. tavaszi árverés, 112. tétel',
              url: 'vertesaukcio.hu/katalogus/2019-tavasz/112',
              date: '2019. március 14.',
              snippet: 'Bécsi ingaóra, diófa ház, 1890 körül. Kikiáltási ár: 240 000 Ft. Elkelt.',
            },
          ],
        },
        {
          id: 'au-search-portrait',
          photo: 'au-portrait',
          matches: [
            {
              title: 'Bolhapiac.hu – Szabó Anna profilja (letiltva)',
              url: 'bolhapiac.hu/profil/szabo.anna',
              date: '2026. április',
              snippet: 'Ugyanez a profilkép egy másik, azóta letiltott hirdetőnél.',
            },
            {
              title: 'Szabad stockfotó: kávéscsésze kézben, latte art',
              url: 'szabadfoto.hu/kep/88213',
              date: '2017. szeptember 2.',
              snippet: 'Ingyen felhasználható portré. Bárki letöltheti.',
            },
          ],
        },
      ],
    },
  ],

  photos: [
    {
      id: 'au-clock',
      src: 'images/auction/clock.webp',
      alt: 'Fénykép egy sötét fa házas, oromzatos falióráról világos fal előtt. Az óralap római számos, alul üvegajtó mögött sárgaréz inga.',
      caption: 'Az ingaóra a hirdetésből',
      info: { takenAt: '2026-10-30T10:14', device: 'Mentett kép' },
    },
    {
      id: 'au-portrait',
      src: 'images/auction/portrait.webp',
      alt: 'Profilkép: két kéz egy fekete csészét tart, amelybe éppen tejhabot öntenek; tökéletes, stúdiószerű fény. Arc nem látszik.',
      caption: 'Kovács Erika profilképe',
      info: { takenAt: '2026-10-30T10:15', device: 'Mentett kép' },
    },
  ],

  puzzles: [
    {
      id: 'au-source',
      kind: 'text',
      title: 'Honnan van a kép?',
      prompt: 'Hol jelent meg először az óra fényképe? Írd be a weboldal gazdájának nevét.',
      answerHash: 'd675ffa9e0a5f5ad534c12957daebd128cbe3c7136fb9c1166ac63023dc57e86',
      hints: [
        'A Böngészőben van egy Képkereső. Keress rá vele az óra képére.',
        'Nem a legfrissebb találat számít, hanem a legrégebbi.',
        'Vértes Aukciósház.',
      ],
    },
    {
      id: 'au-lie',
      kind: 'connect',
      title: 'Ki ez az eladó?',
      prompt: 'Kovács Erika nem mondhat igazat mindenben. Melyik két állítása üti egymást?',
      statements: [
        { id: 'au-s-local', text: 'Profil: „Fenyőházán élek születésem óta.”' },
        { id: 'au-s-granny', text: 'Hirdetés: „Nagymamám hagyatékából, ő is fenyőházi volt.”' },
        { id: 'au-s-new', text: 'Profil: 2026. október 28. óta tag, értékelése nincs.' },
        { id: 'au-s-abroad', text: 'Hirdetés: „Személyesen nem lehet átvenni, mert külföldön dolgozom.”' },
        { id: 'au-s-deposit', text: 'Hirdetés: az előleget ma 18 óráig kell utalni.' },
      ],
      answerHash: '642cc2b2b9ce9a03d794fa5e3b1aa3144b7cbb12e67f32f9d89f8a21aa7d9e2b',
      availableAfter: sourceFound,
      conclusion:
        'Aki születése óta Fenyőházán él, az nem dolgozhat úgy külföldön, hogy egy órát se tudjon megmutatni. Kovács Erika kitalált személy: lopott katalógusképpel, stockfotós profillal, sürgető határidővel szed előleget.',
      hints: [
        'Ha valaki tényleg itt él, mi akadálya lenne a személyes átvételnek?',
        'Nézd meg, mit ír magáról a profilon, és mit a hirdetésben az átvételről.',
        '„Fenyőházán élek születésem óta” és „külföldön dolgozom”.',
      ],
    },
  ],

  evidence: [
    {
      id: 'au-ev-ad',
      title: 'A hirdetés',
      description:
        'Antik ingaóra 85 000 Ft-ért. Személyes átvétel nincs, 30 000 Ft előleget kell utalni aznap 18 óráig. Az eladó szerint az órát „tegnap fotózta”.',
      foundWhen: { type: 'pageVisited', page: 'au-ad' },
    },
    {
      id: 'au-ev-catalogue',
      title: 'Lopott kép',
      description:
        'Az óra képe 2019-ben a Vértes Aukciósház katalógusában jelent meg, az óra akkor 240 000 Ft fölött elkelt. 2024-ben egy másik hirdetésben is felbukkant.',
      source: { type: 'photo', photo: 'au-clock' },
      foundWhen: { type: 'pageVisited', page: 'au-search-clock' },
    },
    {
      id: 'au-ev-stock',
      title: 'Stockfotó a profilon',
      description:
        'Kovács Erika profilképe egy ingyenes stockfotó, és ugyanezt használta egy idén tavasszal letiltott hirdető, „Szabó Anna” is.',
      source: { type: 'photo', photo: 'au-portrait' },
      foundWhen: { type: 'pageVisited', page: 'au-search-portrait' },
    },
    {
      id: 'au-ev-profile',
      title: 'Friss profil',
      description: 'Kovács Erika egy nappal a hirdetés előtt regisztrált, értékelése nincs, és bontatlan telefont is árul.',
      foundWhen: { type: 'pageVisited', page: 'au-profile' },
    },
    {
      id: 'au-ev-lie',
      title: 'Itt él, vagy külföldön?',
      description: 'A profil szerint születése óta Fenyőházán él, a hirdetés szerint külföldön dolgozik, ezért nem lehet személyesen átvenni az órát.',
      source: { type: 'puzzle', puzzle: 'au-lie' },
      foundWhen: lieFound,
    },
  ],

  completedWhen: {
    type: 'all',
    conditions: [lieFound, { type: 'conversationFinished', conversation: 'au-margit' }],
  },

  outro: [
    'A Bolhapiac válasza szerint ugyanez a hirdető fél év alatt négy néven, ugyanazzal a stockfotóval próbálkozott. A rendőrség ismeretlen tettes ellen nyomoz.',
    'Juhász Margit végül a Kikötő sétány régiségboltjában vett egy ingaórát. Nem bécsi, és öt percet késik, de ott áll a nappaliban.',
  ],
}

export const auctionCase: StoryCase = {
  id: 'auction',
  kind: 'side',
  title: 'A hamis aukció',
  summary: 'Egy online bolhapiaci hirdetés túl szép, hogy igaz legyen. A szomszéd néni ma este utalna.',
  chapters: [chapter],
}
