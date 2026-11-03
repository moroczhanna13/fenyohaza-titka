import type { Chapter } from './types'

/** 6. fejezet – A vád */
export const chapter6: Chapter = {
  id: 'ch6',
  number: 6,
  title: 'A vád',

  intro: [
    'Minden darab megvan.',
    'Réka holnap bemegy a rendőrségre. Előtte még egyszer végig kell menni mindenen – egyetlen gyenge pont, és Ilona kimagyarázza magát.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch6-reka',
      contact: 'Kerekes Réka',
      thread: 'ch1-unknown',
      steps: [
        {
          type: 'message',
          from: 'contact',
          text: 'Mielőtt bemegyek, mondja el nekem az egészet, ahogy a rendőrségen is elmondaná.',
        },
        { type: 'message', from: 'contact', text: 'Ha egy ponton is téved, Ilona ügyvédje szétszedi az egészet.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch6-accusation' } },
        { type: 'message', from: 'contact', text: 'Köszönöm.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Huszonöt évig egyedül vittem ezt. Gedeon volt az első, aki elhitte. Maga a második.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Gedeon is ezt akarta.',
              replies: [{ type: 'message', from: 'contact', text: 'Tudom. Ezért magának hagyta a cédulát, nem nekem.' }],
            },
            {
              text: 'Mi lesz most?',
              replies: [{ type: 'message', from: 'contact', text: 'Most végre nem rajtunk múlik.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Holnap reggel bemegyek. Elviszem apa másolatait és Gedeon telefonját is – ha odaadja.',
        },
      ],
    },
  ],

  photos: [],

  puzzles: [
    {
      id: 'ch6-accusation',
      kind: 'accusation',
      title: 'A vád',
      prompt: 'Válaszolj mind az öt kérdésre. Ha egy válasz nem áll meg, vissza kell nézned a hozzá tartozó bizonyítékokat.',
      questions: [
        {
          id: 'ch6-q-arsonist',
          text: 'Ki gyújtotta fel a vitorlásklubot?',
          options: ['Tóth Ervin', 'Pásztor László', 'Mészáros Béla', 'Vidor Ilona'],
          answerHash: 'aafc6199a8b4f65dc5329f50ef61e2f0d1300a55a89f32ee4d1a878970c7b5b4',
          chapter: 'ch5',
        },
        {
          id: 'ch6-q-not-accident',
          text: 'Miből tudjuk, hogy a tűz nem baleset volt?',
          options: [
            'Az újság szerint elektromos zárlat okozta.',
            'A tűzoltónapló szerint két ponton, az irodában és a csónakraktárban égett.',
            'Tóth Ervin 23:40-et mondott az újságnak.',
            'A tűzijáték 22:30-kor kezdődött.',
          ],
          answerHash: '7ef7a412f2d90b2c33309e526d282daacf7aa83099561348a04683907627ecde',
          chapter: 'ch2',
        },
        {
          id: 'ch6-q-motive',
          text: 'Miért kellett a klubnak leégnie?',
          options: [
            'A biztosítási pénzért.',
            'Mert Kerekes Pál el akarta bocsátani a könyvelőt.',
            'Hogy eltűnjön a könyvelés: a június 27-i sorból 300 000 Ft hiányzott, és Pál rájött.',
            'Bosszúból Tóth Ervin ellen.',
          ],
          answerHash: 'f6fa5d8fe5a208f6c6e55bb5f0e4bd201d6782f0eea040d3a52f79dd14338cad',
          chapter: 'ch4',
        },
        {
          id: 'ch6-q-witness',
          text: 'Ki látta 23 óra után, hogy valaki az irodában a könyvelési dossziékat pakolja?',
          options: [
            'Mészáros Béla, aki a saját kulcsával ment a klubhoz.',
            'Pásztor László a stégről.',
            'Tóth Ervin a fesztiválsátorból.',
            'Kerekes Réka, amikor a vacsorát vitte.',
          ],
          answerHash: 'c3a8fe080503eba69c6d9ac41e2aa3a31522e2dcbc69ccf6c533462d295f49d8',
          chapter: 'ch3',
        },
        {
          id: 'ch6-q-gedeon',
          text: 'Hogyan halt meg Berényi Gedeon?',
          options: [
            'Szívrohamot kapott.',
            'Elütötte egy autó.',
            'Véletlenül túladagolta a gyógyszerét.',
            'A patikában a felírt helyett dupla erősségű vérnyomáscsökkentőt kapott, szédülni kezdett, és leesett a lépcsőn.',
          ],
          answerHash: '725909ca55eff87dd1af3a9e34d92dc4487eddcc6201fb9bbd350936866a03cb',
          chapter: 'ch4',
        },
      ],
      answerHash: 'd2e479caccf0aa3ba5981da35a3780a1f0dd9e342b0d1bb140fbf834d2f428f7',
      conclusion:
        'Vidor Ilona 2001 nyarán 300 000 forintot sikkasztott a klub kasszájából. Amikor Kerekes Pál rájött, a tűz éjszakáján két helyen felgyújtotta a klubházat, a könyvekkel együtt. Huszonöt évvel később, amikor Gedeon a nyomára bukkant, a patikában dupla erősségű gyógyszert adott neki.',
      hints: [
        'Minden kérdéshez van bizonyíték a Jegyzetfüzetben.',
        'A tettes az, akinek az autója a klubnál állt, akinek a szignója a hamis soron van, és aki Gedeon gyógyszerét kiadta.',
        'Vidor Ilona; két tűzfészek; a 300 000 Ft-os hamis sor; Mészáros Béla; dupla erősségű vérnyomáscsökkentő.',
      ],
    },
  ],

  evidence: [],

  outro: [
    'Kerekes Réka másnap reggel bement a rendőrségre. Magával vitte az apja kasszakönyv-másolatait, a patika kiadási naplóját és Gedeon telefonját.',
    'Vidor Ilonát egy héttel később őrizetbe vették. A Fenyő Patika azóta zárva.',
    'A Kikötő sétány 4. kerítésére valaki egy szál virágot kötött. Mellette egy cédula, ismerős kézírással lemásolva: „Nem baleset volt.”',
  ],

  completedWhen: {
    type: 'all',
    conditions: [
      { type: 'puzzleSolved', puzzle: 'ch6-accusation' },
      { type: 'conversationFinished', conversation: 'ch6-reka' },
    ],
  },
}
