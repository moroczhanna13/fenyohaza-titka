import type { Chapter } from './types'

const MORSE: [letter: string, code: string][] = [
  ['A', '·−'], ['B', '−···'], ['C', '−·−·'], ['D', '−··'], ['E', '·'], ['É', '··−··'], ['F', '··−·'],
  ['G', '−−·'], ['H', '····'], ['I', '··'], ['J', '·−−−'], ['K', '−·−'], ['L', '·−··'], ['M', '−−'],
  ['N', '−·'], ['O', '−−−'], ['Ö', '−−−·'], ['P', '·−−·'], ['Q', '−−·−'], ['R', '·−·'], ['S', '···'],
  ['T', '−'], ['U', '··−'], ['Ü', '··−−'], ['V', '···−'], ['W', '·−−'], ['X', '−··−'], ['Y', '−·−−'],
  ['Z', '−−··'],
]

/** 5. fejezet – Réka */
export const chapter5: Chapter = {
  id: 'ch5',
  number: 5,
  title: 'Réka',

  intro: [
    'Az ismeretlen szám mögött végre egy ember áll.',
    'Huszonöt éve vár erre a beszélgetésre. Kérdés, mindent elmond-e.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch5-reka',
      contact: 'Kerekes Réka',
      thread: 'ch1-unknown',
      steps: [
        { type: 'message', from: 'contact', text: 'Kerekes Réka vagyok. Kerekes Pál lánya.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Bocsásson meg, hogy eddig bujkáltam. Gedeon után nem mertem senkiben megbízni.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Miért nem szólt huszonöt évig?',
              replies: [{ type: 'message', from: 'contact', text: 'Mert senki nem kérdezett. És mert féltem.' }],
            },
            {
              text: 'Sejtettem, hogy köze van Pálhoz.',
              replies: [{ type: 'message', from: 'contact', text: 'Gedeon is rájött. Már az első héten.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Azon a nyáron Balatonfüreden voltam táborban. Csak másnap délelőtt tudtam meg, hogy apa meghalt.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Tavaly anyám padlásán találtam meg apa másolatait. Akkor írtam Gedeonnak.',
        },
        { type: 'message', from: 'contact', text: 'Írtam magának egy levelet apáról. Hogy tudja, kiért csinálja ezt.' },
      ],
    },
    {
      id: 'ch5-reka-2',
      contact: 'Kerekes Réka',
      thread: 'ch1-unknown',
      availableAfter: { type: 'conversationFinished', conversation: 'ch5-reka' },
      steps: [
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch5-reka-lie' } },
        {
          type: 'choice',
          options: [
            {
              text: 'Azt írta, táborban volt. A levélben meg azt, hogy maga vitte le a vacsorát.',
              replies: [{ type: 'message', from: 'contact', text: '…' }],
            },
            {
              text: 'Miért hazudott a táborról?',
              replies: [{ type: 'message', from: 'contact', text: 'Mert huszonöt éve ezt mondom mindenkinek.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Igen. Hazudtam. Tizennégy éves voltam.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Fél tizenegy után vittem le a vacsorát. A klub előtt egy zöld Škoda állt. Ilonáé – mindenki ismerte azt az autót.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Apa azt mondta, menjek haza, mert még dolga van a könyvelővel.',
        },
        { type: 'message', from: 'contact', text: 'Mire hazaértem és kinéztem az ablakon, már égett.' },
        { type: 'message', from: 'contact', text: 'Huszonöt évig azt hittem, ha megszólalok, velem is ez lesz.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Van még valami. Gedeon a halála előtti este hangüzenetet hagyott nekem. Továbbítom.',
          audio: 'ch5-voice-gedeon',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Alig lehet érteni, csak recsegés. De a háttérben kopog valamit. Gedeon mindig kopogott, ha gondolkodott. Maga hallja, mit?',
        },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch5-morse' } },
        { type: 'message', from: 'player', text: 'PATIKA. Morzejelekkel kopogta.' },
        { type: 'message', from: 'contact', text: 'A patika.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Tudta. Tudta, hogy a gyógyszerrel van baj, csak már nem volt ereje szólni.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Most már minden megvan. Ha maga is biztos benne, holnap bemegyek a rendőrségre.',
        },
      ],
    },
  ],

  emails: [
    {
      id: 'ch5-mail-reka',
      from: 'Kerekes Réka',
      subject: 'Apáról',
      date: 'nov. 3.',
      availableAfter: { type: 'conversationFinished', conversation: 'ch5-reka' },
      body: [
        'Apa szigorú ember volt, de igazságos. A klub volt az élete: hajnalban ő nyitott, éjjel ő zárt.',
        'Hetek óta mondogatta otthon, hogy valaki lop a kasszából, és hogy a fesztivál után „rendet tesz”.',
        'Aznap este én vittem le neki a vacsorát a klubba, rántott húst, ahogy szerette. Akkor láttam utoljára.',
        'Ma is minden nyáron kimegyek a sétányra a fesztivál éjszakáján. Valakinek emlékeznie kell rá.',
        'Réka',
      ],
    },
  ],

  voiceMessages: [
    {
      id: 'ch5-voice-gedeon',
      knocks: '.--. .- - .. -.- .-',
      transcript: [
        '[recsegés, egy hűtő zúgása]',
        'Gedeon, elcsukló hangon: „Réka… ha ezt… (érthetetlen) …nem a vérnyomás… szédülök, mióta…”',
        '[hosszú csend; a háttérben ütemes kopogás az asztalon, kétszer egymás után: rövid-hosszú-hosszú-rövid · rövid-hosszú · hosszú · rövid-rövid · hosszú-rövid-hosszú · rövid-hosszú]',
        '„…majd megérted. Te mindig…” [a felvétel megszakad]',
      ],
    },
  ],

  photos: [],

  pages: [
    {
      kind: 'static',
      id: 'ch5-morse-page',
      url: 'morzeabc.hu',
      title: 'Morzeábécé',
      intro: 'A nemzetközi morzekód betűi. Rövid jel: · (ti), hosszú jel: − (tá). A betűk között rövid szünet, a szavak között hosszabb.',
      bookmarked: true,
      blocks: [{ type: 'glyphTable', entries: MORSE }],
    },
  ],

  puzzles: [
    {
      id: 'ch5-reka-lie',
      kind: 'connect',
      title: 'Réka két története',
      prompt: 'Melyik két állítás nem lehet egyszerre igaz?',
      availableAfter: { type: 'conversationFinished', conversation: 'ch5-reka' },
      statements: [
        { id: 'ch5-s-march', text: 'Ismeretlen szám, március 12.: „Kezdje a klub könyvelésével.”' },
        {
          id: 'ch5-s-camp',
          text: 'Réka az üzenetben: azon a nyáron Balatonfüreden volt táborban, csak másnap tudta meg, mi történt.',
        },
        { id: 'ch5-s-thief', text: 'Réka a levélben: az apja hetek óta mondta, hogy valaki lop a kasszából.' },
        { id: 'ch5-s-attic', text: 'Réka az üzenetben: tavaly találta meg az apja másolatait az anyja padlásán.' },
        { id: 'ch5-s-dinner', text: 'Réka a levélben: aznap este ő vitte le a vacsorát az apjának a klubba.' },
      ],
      answerHash: '60987db46a271aefac25dadbd73fb078c9b4d35a20ffbcf279cb4913ceaf0061',
      conclusion: 'Réka nem volt táborban: aznap este ott járt a klubnál. Mit látott?',
      hints: [
        'Réka két helyen is mesél a tűz estéjéről. Hasonlítsd össze, hol volt akkor.',
        'Az egyik az üzenetekben van, a másik a levélben, amit Réka küldött.',
        'Kösd össze a tábort a vacsorával: Réka nem lehetett egyszerre Balatonfüreden és a klubnál.',
      ],
    },
    {
      id: 'ch5-morse',
      kind: 'text',
      title: 'Mit kopog Gedeon?',
      prompt: 'Írd be a szót, amit Gedeon a hangüzenetben kikopog.',
      answerHash: '58b78e0dff8247d4ed84e6bf7013fef8ac7b864a051360145bffb7f5a7758b53',
      hints: [
        'Hallgasd meg többször a hangüzenetet, vagy nyisd meg az átiratát. A kopogás rövid és hosszú jelekből áll.',
        'Ez morzekód. A Böngésző könyvjelzői között van egy morzeábécé.',
        'A jelek: ·−−· ·− − ·· −·− ·−. Az első betű P, az utolsó A.',
      ],
    },
  ],

  evidence: [
    {
      id: 'ch5-reka-identity',
      title: 'Az ismeretlen üzenő',
      description: 'Kerekes Réka, Kerekes Pál lánya. Ő írt Gedeonnak márciusban, és ő küldte az apja kasszakönyv-másolatát.',
      source: { type: 'conversation', conversation: 'ch5-reka' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch5-reka' },
    },
    {
      id: 'ch5-reka-witness',
      title: 'Réka, a szemtanú',
      description:
        'Réka 14 évesen fél tizenegy után a klubnál járt. A bejárat előtt Vidor Ilona zöld Škodája állt; az apja azt mondta, még dolga van a könyvelővel. Ilona azt állította, fél tizenegykor bezárta az irodát és elment.',
      source: { type: 'conversation', conversation: 'ch5-reka-2' },
      foundWhen: { type: 'conversationFinished', conversation: 'ch5-reka-2' },
    },
    {
      id: 'ch5-morse-word',
      title: 'Gedeon kopogása',
      description: 'Gedeon a halála előtti este a hangüzenetben morzejelekkel kopogta: PATIKA.',
      source: { type: 'puzzle', puzzle: 'ch5-morse' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch5-morse' },
    },
  ],

  outro: [
    'Egy tizennégy éves lány, aki látta a zöld autót. Egy kasszakönyv-másolat, egy kiadási napló, és egy kopogás egy recsegő felvételen.',
    'Minden darab megvan. Már csak ki kell mondani.',
  ],

  completedWhen: { type: 'conversationFinished', conversation: 'ch5-reka-2' },
}
