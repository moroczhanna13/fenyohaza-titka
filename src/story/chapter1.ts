import type { Chapter, Condition } from './types'

const unlocked: Condition = { type: 'puzzleSolved', puzzle: 'ch1-lock' }

// Old Hungarian (rovás) capitals, Unicode U+10C80 block.
const ROVAS: [latin: string, glyph: string][] = [
  ['A', '\u{10C80}'], ['Á', '\u{10C81}'], ['B', '\u{10C82}'], ['C', '\u{10C84}'], ['Cs', '\u{10C86}'],
  ['D', '\u{10C87}'], ['E', '\u{10C89}'], ['É', '\u{10C8B}'], ['F', '\u{10C8C}'], ['G', '\u{10C8D}'],
  ['Gy', '\u{10C8E}'], ['H', '\u{10C8F}'], ['I', '\u{10C90}'], ['Í', '\u{10C91}'], ['J', '\u{10C92}'],
  ['K', '\u{10C93}'], ['L', '\u{10C96}'], ['Ly', '\u{10C97}'], ['M', '\u{10C98}'], ['N', '\u{10C99}'],
  ['Ny', '\u{10C9A}'], ['O', '\u{10C9B}'], ['Ó', '\u{10C9C}'], ['Ö', '\u{10C9E}'], ['Ő', '\u{10C9F}'],
  ['P', '\u{10CA0}'], ['R', '\u{10CA2}'], ['S', '\u{10CA4}'], ['Sz', '\u{10CA5}'], ['T', '\u{10CA6}'],
  ['Ty', '\u{10CA8}'], ['U', '\u{10CAA}'], ['Ú', '\u{10CAB}'], ['Ü, Ű', '\u{10CAD}'], ['V', '\u{10CAE}'],
  ['Z', '\u{10CAF}'], ['Zs', '\u{10CB0}'],
]

/** 1. fejezet – A doboz */
export const chapter1: Chapter = {
  id: 'ch1',
  number: 1,
  title: 'A doboz',

  intro: [
    'Berényi Gedeon nyugdíjas zárszerelő volt, és megszállott rejtvényfejtő. A nagybátyád. Nemrég meghalt – hivatalosan baleset.',
    'Az utolsó éveiben egy régi fenyőházi ügy nem hagyta nyugodni. Hogy mi, azt senkinek nem mondta el.',
    'A hagyatékból két dolgot kaptál: a telefonját és egy kartondobozt. A dobozban egy cédula van, az ő kézírásával.',
    'A telefon le van zárva.',
  ],

  lock: { puzzle: 'ch1-lock', title: 'Berényi Gedeon telefonja' },

  box: [
    {
      id: 'ch1-box-note',
      title: 'A cédula',
      blocks: [{ type: 'text', text: '„Ha ezt olvasod, nem baleset volt.”' }],
    },
    {
      id: 'ch1-box-note-back',
      title: 'A cédula hátoldala',
      // KEREKES
      blocks: [{ type: 'text', script: 'rovas', text: '\u{10C93}\u{10C89}\u{10CA2}\u{10C89}\u{10C93}\u{10C89}\u{10CA4}' }],
    },
    {
      id: 'ch1-box-alphabet',
      title: 'Megsárgult lap: a rovásírás betűi',
      blocks: [{ type: 'glyphTable', entries: ROVAS }],
    },
  ],

  apps: [
    { app: 'messages', availableAfter: unlocked },
    { app: 'gallery', availableAfter: unlocked },
  ],

  conversations: [
    {
      id: 'ch1-unknown',
      contact: 'Ismeretlen szám',
      availableAfter: unlocked,
      history: [
        {
          type: 'message',
          from: 'contact',
          time: 'márc. 12. 22:47',
          text: 'Berényi úr? Kerekes Pál miatt írok. A vitorlásklubos tűz.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Nem baleset volt. Ön az egyetlen ebben a városban, aki még kérdez.',
        },
        { type: 'message', from: 'player', text: 'Ki maga? Honnan van meg ez a szám?' },
        { type: 'message', from: 'contact', text: 'Ez most mellékes. Kezdje a klub könyvelésével.' },
        {
          type: 'message',
          from: 'player',
          time: 'jún. 3. 08:15',
          text: 'Utánanéztem. A klub elszámolásai 2001 nyarán egyik napról a másikra megszakadnak.',
        },
        { type: 'message', from: 'contact', text: 'Tudom. Vigyázzon, kivel beszél róla.' },
        {
          type: 'message',
          from: 'player',
          time: 'szept. 14. 21:30',
          text: 'Ma este ott voltam, ahol az egész kezdődött. Csináltam egy képet. Ha velem történne valami, ott keressék.',
        },
      ],
      steps: [
        { type: 'message', from: 'contact', text: 'Berényi úr? Hetek óta nem válaszol.' },
        { type: 'message', from: 'contact', text: 'Csak annyit írjon, hogy jól van.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Gedeon meghalt. A nagybátyám volt.',
              replies: [
                { type: 'message', from: 'contact', text: 'Sajnálom.' },
                { type: 'message', from: 'contact', text: 'Tényleg.' },
              ],
            },
            {
              text: 'Ki kérdezi?',
              replies: [
                { type: 'message', from: 'contact', text: 'Valaki, aki szólt neki, hogy vigyázzon.' },
                { type: 'message', from: 'contact', text: 'Ha maga nem ő, akkor már késő.' },
              ],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'A hagyatékból kapta a telefont, igaz? Mit mondtak, mi történt vele?' },
        {
          type: 'choice',
          options: [
            {
              text: 'Azt mondják, baleset volt.',
              replies: [{ type: 'message', from: 'contact', text: 'Persze. Ahogy huszonöt éve is.' }],
            },
            {
              text: 'A dobozában volt egy cédula: „Ha ezt olvasod, nem baleset volt.”',
              replies: [{ type: 'message', from: 'contact', text: 'Akkor ő is tudta, hogy sietnie kell.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Olvassa vissza, mit írt nekem utoljára.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Én nem tudom, melyik képre gondolt. Maga viszont a kezében tartja a telefonját.',
        },
        { type: 'message', from: 'contact', text: 'Hol készült a kép? Írja meg a pontos címet.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch1-photo-place' } },
        { type: 'message', from: 'contact', text: 'Kikötő sétány 4. Ott állt a vitorlásklub, mielőtt leégett.' },
        { type: 'message', from: 'contact', text: 'A gondnok bent égett. Kerekes Pál.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Miért nem megy a rendőrségre?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'A rendőrség huszonöt éve balesetnek nevezte. Egy név nélküli üzenet miatt nem fogják újra elővenni.',
                },
              ],
            },
            {
              text: 'Maga honnan tud ennyit?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Ebben a városban mindenki tud valamit. Csak senki nem mondja ki.',
                },
              ],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Nézzen körül a romoknál. Jelentkezem.' },
        { type: 'message', from: 'contact', text: 'És senkinek ne mondja el, hogy írtam.' },
      ],
    },
    {
      id: 'ch1-pharmacy',
      contact: 'Fenyő Patika',
      availableAfter: unlocked,
      history: [
        {
          type: 'message',
          from: 'contact',
          time: 'szept. 12. 09:02',
          text: 'Tisztelt Berényi úr! Megérkezett az új vérnyomás-gyógyszere, holnaptól átveheti. Üdvözlettel: Vidor Ilona, Fenyő Patika',
        },
        { type: 'message', from: 'player', text: 'Köszönöm, holnap beugrom.' },
      ],
      steps: [],
    },
  ],

  photos: [
    {
      id: 'ch1-photo-workshop',
      src: 'images/ch1/workshop.svg',
      alt: 'Műhely esti lámpafényben: szerszámfal, kulcsnyersek, a munkapadon egy szétszedett lakat és egy nagyító.',
      info: { takenAt: '2026-07-02T18:20', place: 'Fenyőháza, Bükk utca 12.', coordinates: { lat: 46.9241, lon: 17.8833 } },
    },
    {
      id: 'ch1-photo-square',
      src: 'images/ch1/main-square.svg',
      alt: 'A főtér a városházával, zászlók a homlokzaton, piaci standok és néhány járókelő.',
      info: { takenAt: '2026-08-20T10:05', place: 'Fenyőháza, Fő tér', coordinates: { lat: 46.9205, lon: 17.8867 } },
    },
    {
      id: 'ch1-photo-poster',
      src: 'images/ch1/festival-poster.svg',
      alt: 'Kifakult plakát egy hirdetőtáblán: vitorlás a tavon, felirata „Tavi Fesztivál 2001 – Fenyőházi Vitorlásklub”.',
      info: { takenAt: '2026-09-10T14:40', place: 'Fenyőháza, Városi Könyvtár', coordinates: { lat: 46.9198, lon: 17.8852 } },
    },
    {
      id: 'ch1-photo-lake-morning',
      src: 'images/ch1/lake-morning.svg',
      alt: 'Reggeli tópart ködös túlparttal: homokos strand, piros vízimentő-torony, bóják és egy üres pad.',
      info: { takenAt: '2026-09-14T08:30', place: 'Fenyőháza, Szabadstrand', coordinates: { lat: 46.9150, lon: 17.8790 } },
    },
    {
      id: 'ch1-photo-lake-evening',
      src: 'images/ch1/lake-evening.svg',
      alt: 'Alkonyat a tónál. A bal parton egy leégett épület fekete körvonala, előtte elszenesedett stégcölöpök állnak ki a vízből.',
      info: { takenAt: '2026-09-14T21:12', place: 'Fenyőháza, Kikötő sétány 4.', coordinates: { lat: 46.9132, lon: 17.8915 } },
    },
  ],

  puzzles: [
    {
      id: 'ch1-lock',
      kind: 'text',
      title: 'A telefon jelszava',
      prompt: 'Add meg a jelszót.',
      answerHash: 'a70ea909747473920fab0c500b050aa5aacec99f642ef0936db5926bf1713131',
      hints: [
        'A cédula hátoldalán lévő jelek betűk. Nézd meg, mi van még a dobozban.',
        'A rovásírást jobbról balra olvassuk.',
        'Jobbról az első jel a K. A szó egy név a régi ügyből.',
      ],
    },
    {
      id: 'ch1-photo-place',
      kind: 'text',
      title: 'Hol készült a kép?',
      prompt: 'Írd meg a pontos címet.',
      answerHash: '7013109292e95b90c045327b581d0b81733fddc72d8e1214cb16998456632926',
      hints: [
        'Gedeon utolsó üzenetéből kiderül, mikor készült a kép.',
        'A Galériában minden képnek van infó-lapja. Keresd a szeptember 14-i esti képet.',
        'A szeptember 14-i kép infó-lapján a Hely sorban álló cím a válasz.',
      ],
    },
  ],

  evidence: [
    {
      id: 'ch1-last-message',
      title: 'Gedeon utolsó üzenete',
      description: 'Szeptember 14-én este ott járt, „ahol az egész kezdődött”, és csinált egy képet.',
      source: { type: 'conversation', conversation: 'ch1-unknown' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch1-lock' },
    },
    {
      id: 'ch1-club-ruins',
      title: 'A vitorlásklub romja',
      description: 'Kikötő sétány 4. Itt állt a vitorlásklub, ami huszonöt éve a Tavi Fesztivál éjszakáján leégett.',
      source: { type: 'puzzle', puzzle: 'ch1-photo-place' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch1-photo-place' },
    },
  ],

  completedWhen: {
    type: 'all',
    conditions: [
      { type: 'puzzleSolved', puzzle: 'ch1-photo-place' },
      { type: 'conversationFinished', conversation: 'ch1-unknown' },
    ],
  },
}
