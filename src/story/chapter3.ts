import type { Chapter } from './types'

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
      id: 'ch3-unknown',
      contact: 'Ismeretlen szám',
      thread: 'ch1-unknown',
      steps: [
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
  ],

  evidence: [
    {
      id: 'ch3-car',
      title: 'Autó a klubháznál',
      description: 'A tűz éjszakáján 23:05-kor Mészáros Béla piros Opelje a klubház mellett parkolt. Az irodában égett a villany.',
      source: { type: 'photo', photo: 'ch3-photo-festival' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch3-car-owner' },
    },
  ],
}
