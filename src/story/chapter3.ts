import type { Chapter, Condition } from './types'

const timelineSolved: Condition = { type: 'puzzleSolved', puzzle: 'ch3-timeline' }

/** 3. fejezet – Hamis alibik */
export const chapter3: Chapter = {
  id: 'ch3',
  number: 3,
  title: 'Hamis alibik',

  intro: [
    'Gedeon telefonjában három régi beszélgetés van három férfival, akik 2001-ben a klubhoz tartoztak: Tóth Ervin elnökkel, Mészáros Béla titkárral és Pásztor László kisegítővel.',
    'Mindhárman ma is Fenyőházán élnek. Ideje kérdezni.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch3-toth',
      contact: 'Tóth Ervin',
      history: [
        {
          type: 'message',
          from: 'player',
          time: 'júl. 2. 10:14',
          text: 'Polgármester úr, a 2001-es tűzről szeretnék kérdezni.',
        },
        { type: 'message', from: 'contact', text: 'Berényi úr, az egy lezárt ügy. Kérem, hagyja nyugodni.' },
      ],
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'Gedeon rokona vagyok. Ő már nem tud kérdezni, ezért én kérdezek.',
              replies: [
                { type: 'message', from: 'contact', text: 'Részvétem. De nem tudok többet mondani, mint huszonöt éve.' },
              ],
            },
            {
              text: 'A cikk szerint 23:40-kor riasztotta a tűzoltókat. A napló szerint 23:10-kor jött a bejelentés.',
              replies: [{ type: 'message', from: 'contact', text: 'Ki adta magának azt a naplót?' }],
            },
          ],
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Hol volt 23:10 és 23:40 között?',
              replies: [{ type: 'message', from: 'contact', text: '…' }],
            },
            {
              text: 'Miért mondott 23:40-et az újságnak?',
              replies: [{ type: 'message', from: 'contact', text: 'Mert az jobban hangzott.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Rendben. Nem a klubházban voltam.' },
        {
          type: 'message',
          from: 'contact',
          text: '23 órától a fesztiválsátorban ültem az üzemeltetőkkel. Pénzügyek. Nem olyanok, amiket egy klubelnök az újságban szeretne látni.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Amikor szóltak, hogy ég a klub, már elmúlt fél tizenkettő. A 23:40-et azért mondtam, hogy senki ne kérdezze, hol voltam addig.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Felgyújtani nem gyújtottam fel semmit. Az üzemeltetők tanúsíthatják – ha megtalálja őket.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Feketén fizettek?',
              replies: [{ type: 'message', from: 'contact', text: 'Ezt nem mondtam. És maga sem fogja.' }],
            },
            {
              text: 'Köszönöm, hogy elmondta.',
              replies: [{ type: 'message', from: 'contact', text: 'Nem magának mondtam el. Csak elegem van belőle.' }],
            },
          ],
        },
      ],
    },
    {
      id: 'ch3-pasztor',
      contact: 'Pásztor László',
      history: [
        { type: 'message', from: 'player', time: 'aug. 14. 18:02', text: 'Pásztor úr, emlékszik még 2001 nyarára?' },
        { type: 'message', from: 'contact', text: 'Arra itt mindenki emlékszik.' },
      ],
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'Gedeon rokona vagyok. Ő mit kérdezett magától?',
              replies: [{ type: 'message', from: 'contact', text: 'Ugyanazt, amit most maga fog.' }],
            },
            {
              text: 'Maga akkor a klubban dolgozott, igaz?',
              replies: [{ type: 'message', from: 'contact', text: 'Igaz. Már nagyon régen.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Kisegítő voltam a klubban, afféle mindenes. Pál volt a főnököm.' },
        { type: 'message', from: 'contact', text: 'Aznap este összevesztünk. Ezt a rendőrségnek nem mondtam el.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Min vesztek össze?',
              replies: [{ type: 'message', from: 'contact', text: 'Pénzen. Mi máson.' }],
            },
            {
              text: 'Miért titkolta el?',
              replies: [
                { type: 'message', from: 'contact', text: 'Mert egy órával később Pál meghalt. Maga mit tett volna?' },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Két hónapja nem kaptam fizetést. Pál azt mondta, nincs pénz a kasszában. Pedig a fesztivál előtt tele volt.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Háromnegyed tizenegykor volt, a stégnél. Utána hazamentem. Éjfélkor a feleségem keltett, hogy ég a klub.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Pál ott maradt. Azt mondta, még bemegy az irodába, mert valami nem stimmel a könyvekkel.',
        },
      ],
    },
    {
      id: 'ch3-meszaros',
      contact: 'Mészáros Béla',
      history: [
        { type: 'message', from: 'player', time: 'aug. 30. 20:41', text: 'Mészáros úr, beszélhetnénk a klubról?' },
        { type: 'message', from: 'contact', text: 'Nincs miről beszélni. Huszonöt éve volt.' },
      ],
      steps: [
        {
          type: 'choice',
          options: [
            {
              text: 'Gedeon rokona vagyok. Csak pár kérdést tennék fel.',
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
          text: '23 órától éjfélig végig a színpad mögött voltam. Ezt a rendőrségnek is elmondtam, tanúk is vannak rá.',
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
      thread: 'ch3-meszaros',
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
          text: 'Volt egy saját kulcsom a klubházhoz. Senki nem tudott róla, Pál sem.',
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
              replies: [{ type: 'message', from: 'contact', text: 'Nem láttam az arcát. Csak a kezét meg a dossziékat.' }],
            },
            {
              text: 'Miért nem szólt senkinek?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Mert akkor el kellett volna mondanom, mit kerestem ott a saját kulcsommal.',
                },
              ],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Elmentem. Húsz perccel később már égett az egész.' },
        { type: 'message', from: 'contact', text: 'Ha valaki tudja, mi volt azokban a könyvekben, az nem én vagyok.' },
      ],
    },
    {
      id: 'ch3-unknown',
      contact: 'Ismeretlen szám',
      thread: 'ch1-unknown',
      steps: [
        {
          type: 'message',
          from: 'contact',
          text: 'Gedeon mindhármukat megkereste. A beszélgetéseik még ott vannak a telefonon.',
        },
        { type: 'message', from: 'contact', text: 'Kérdezze meg őket, hol voltak aznap éjjel. Engem ne említsen.' },
        {
          type: 'wait',
          until: {
            type: 'all',
            conditions: [
              { type: 'conversationFinished', conversation: 'ch3-toth' },
              { type: 'conversationFinished', conversation: 'ch3-pasztor' },
              { type: 'conversationFinished', conversation: 'ch3-meszaros' },
            ],
          },
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Egy régi fesztiválos csoportban találtam ezt a képet. 2001, a tűz éjszakája.',
          photo: 'ch3-photo-festival',
        },
        { type: 'message', from: 'contact', text: 'Nézze meg a hátteret. Ki parkolt a klubnál 23:05-kor?' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch3-car-owner' } },
        { type: 'message', from: 'player', text: 'Mészáros Béla autója.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Mészáros Béla. Aki azt mondta a rendőrségnek, hogy egész este a színpadnál volt.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Rakja időrendbe, ki mit mondott aznap éjjelről. Az egyik vallomás nem fog beleférni.',
        },
        { type: 'wait', until: timelineSolved },
        { type: 'message', from: 'contact', text: 'Kérdezze meg Mészárost, mit keresett a klubnál.' },
      ],
    },
  ],

  photos: [
    {
      id: 'ch3-photo-festival',
      src: 'images/ch3/festival-night.svg',
      alt: 'Éjszakai fesztiválfotó, a sarokban narancssárga dátumbélyegző: ’01 7 21 23:05. Előtérben a tömeg sziluettje, balra a kivilágított színpad, az égen tűzijáték. Jobbra, a háttérben a vitorlásklub, az irodaablakban ég a villany. A klubház mellett egy piros autó parkol, a rendszáma nagyítva olvasható: GBM-418.',
      caption: 'Feltöltve a „Régi fenyőházi fesztiválok” csoportba',
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
  ],

  puzzles: [
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
        '23 órától fél tizenkettőig a fesztiválsátorban volt az üzemeltetőkkel, pénzügyeket intézett. Ezért mondott az újságnak 23:40-et.',
      source: { type: 'conversation', conversation: 'ch3-toth' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-toth' },
    },
    {
      id: 'ch3-pasztor-alibi',
      title: 'Pásztor László vallomása',
      description:
        '22:45-kor összeveszett Kerekes Pállal a stégnél a ki nem fizetett bére miatt, aztán hazament. Pál szerint a kassza üres volt, és „valami nem stimmelt a könyvekkel”.',
      source: { type: 'conversation', conversation: 'ch3-pasztor' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-pasztor' },
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
        'Mészárosnak saját kulcsa volt a klubházhoz. 23 óra után látta, hogy az irodában valaki a könyvelési dossziékat pakolja. Húsz perccel később kigyulladt a klub.',
      source: { type: 'conversation', conversation: 'ch3-meszaros-2' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch3-meszaros-2' },
    },
  ],

  outro: [
    'Tóth Ervin a pénzt intézte, Pásztor László hazament, Mészáros Béla a saját kulcsával ott járt – és elmenekült.',
    'Valaki aznap éjjel, húsz perccel a tűz előtt a könyvelési dossziékat pakolta az irodában. Kerekes Pál a halála előtt azt mondta, valami nem stimmel a könyvekkel.',
    'Ha a tűz a könyvek miatt volt, a könyveknél kell folytatni.',
  ],

  completedWhen: {
    type: 'all',
    conditions: [
      { type: 'conversationFinished', conversation: 'ch3-meszaros-2' },
      { type: 'conversationFinished', conversation: 'ch3-unknown' },
    ],
  },
}
