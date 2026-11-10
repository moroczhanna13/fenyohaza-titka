import type { Chapter } from './types'

/** 6. fejezet – A feljelentés */
export const chapter6: Chapter = {
  id: 'ch6',
  number: 6,
  title: 'A feljelentés',

  intro: [
    'Minden darab megvan.',
    'Réka tanúskodni fog. A feljelentést viszont neked kell megírnod a megyei rendőr-főkapitányságnak – pontról pontra, úgy, hogy Ilona ügyvédje se tudja szétszedni.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch6-reka',
      contact: 'Kerekes Réka',
      thread: 'ch1-unknown',
      steps: [
        { type: 'message', from: 'contact', text: 'Megírta már a feljelentést?' },
        {
          type: 'message',
          from: 'contact',
          text: 'Minden állításhoz kell bizonyíték. Ha egy ponton is téved, Ilona ügyvédje szétszedi az egészet.',
        },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch6-accusation' } },
        { type: 'message', from: 'contact', text: 'Elolvastam. Minden benne van.' },
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
              replies: [{ type: 'message', from: 'contact', text: 'Tudom. Nem véletlenül magára hagyta a dobozt.' }],
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
          text: 'Holnap reggel nyolckor a kapitányság előtt. Hozza a telefont és a dobozt. Én hozom apa másolatait, és elmondom, amit huszonöt éve kellett volna.',
        },
      ],
    },
  ],

  photos: [],

  puzzles: [
    {
      id: 'ch6-accusation',
      kind: 'accusation',
      title: 'A feljelentés',
      prompt: 'A feljelentés öt pontja. Mindegyiknél válaszd ki, mit állítasz. Ha egy pont nem áll meg, vissza kell nézned a hozzá tartozó bizonyítékokat.',
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
            'Hogy eltűnjenek a könyvek: Ilona évek óta lopott a kasszából (a június 27-i sorból is 300 000 Ft hiányzott), és Pál rájött.',
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
        'Vidor Ilona három éven át, összesen mintegy 4,5 millió forintot sikkasztott a vitorlásklub kasszájából. Amikor Kerekes Pál rájött, és feljelentéssel fenyegette, a fesztivál éjszakáján el akarta tüntetni a könyveket: két helyen felgyújtotta a klubházat. Pál a csónakraktárban bent égett. Huszonöt évvel később, amikor Gedeon a nyomára bukkant, a patikában kétszeres erősségű vérnyomáscsökkentőt adott neki.',
      hints: [
        'Minden ponthoz van bizonyíték a Jegyzetfüzetben; a Szereplők fülön az is összegyűlt, mit tudsz az egyes emberekről.',
        'A tettes az, akinek az autója a klubnál állt, akinek a szignója a hamis soron van, és aki Gedeon gyógyszerét kiadta.',
        'Vidor Ilona; két tűzfészek; az évekig tartó sikkasztás és a 300 000 Ft-os hamis sor; Mészáros Béla; kétszeres erősségű vérnyomáscsökkentő.',
      ],
    },
  ],

  evidence: [],

  outro: [
    'Másnap reggel ketten mentetek be a megyei rendőr-főkapitányságra. Te átadtad a feljelentést, Gedeon telefonját és a dobozt. Réka tanúvallomást tett, és elmondta, amit huszonöt évig titkolt.',
    'Az ügyet újranyitották. Vidor Ilonát egy héttel később őrizetbe vették. A Fenyő Patika azóta zárva.',
    'A Kikötő sétány 4. kerítésére valaki egy szál virágot kötött. Mellette egy cédula: „VII. 21. – NEM zárlat. Két tűz. Ki hazudik?” Alatta, más kézírással: „Most már tudjuk.”',
  ],

  completedWhen: {
    type: 'all',
    conditions: [
      { type: 'puzzleSolved', puzzle: 'ch6-accusation' },
      { type: 'conversationFinished', conversation: 'ch6-reka' },
    ],
  },
}
