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
    'Az ismeretlen szám mögött Kerekes Réka áll, Kerekes Pál lánya.',
    'Huszonöt éve hallgat valamiről. Kérdés, most mindent elmond-e.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch5-reka',
      contact: 'Kerekes Réka',
      thread: 'ch1-unknown',
      steps: [
        { type: 'message', from: 'contact', text: 'Igen. Kerekes Réka vagyok, Pál lánya.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Bocsásson meg, hogy bujkáltam. Gedeon meghalt, miután kérdezősködni kezdett. Nem tudtam, kiben bízhatok.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Miért nem szólt huszonöt évig?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Tizennégy éves voltam, és mindenki azt mondta, zárlat. Mit mondtam volna?',
                },
              ],
            },
            {
              text: 'És most bennem megbízik?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Nem egészen. De maga ott folytatta, ahol Gedeon abbahagyta. Ez több, mint amit bárki más tett.',
                },
              ],
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
          text: 'Tavaly meghalt anyám. A ház kiürítésekor találtam meg a padláson apa másolatait. Nem értettem belőlük semmit, de tudtam, hogy apa nem véletlenül hordta haza őket.',
        },
        { type: 'message', from: 'contact', text: 'Gedeonról tudtam, hogy a régi ügyeket bújja. Neki írtam.' },
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
              text: 'Pásztor László szerint aznap este, háromnegyed tizenegy körül Pál kislánya vitte le neki a vacsorát. Maga nem volt táborban.',
              replies: [{ type: 'message', from: 'contact', text: '…' }],
            },
            {
              text: 'Miért hazudott a táborról?',
              replies: [{ type: 'message', from: 'contact', text: 'Mert huszonöt éve ezt mondom mindenkinek.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Igen. Hazudtam.' },
        {
          type: 'message',
          from: 'contact',
          text: 'A rendőrségnek is ezt mondtam huszonöt éve. Ha most kiderül, hogy akkor hazudtam, ki fog hinni nekem bármit is?',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Táborban voltam, de aznap délután megszöktem. Stoppal jöttem haza, meg akartam lepni apát a fesztiválon.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Fél tizenegy után vittem le neki a vacsorát. A klub előtt egy zöld Škoda állt. Ilonáé – mindenki ismerte azt az autót.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Apa azt mondta, menjek haza, mert még dolga van a könyvelővel. Ideges volt. Azt hittem, a szökés miatt haragszik rám.',
        },
        { type: 'message', from: 'contact', text: 'Mire hazaértem és kinéztem az ablakon, már égett.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Anyám másnap hajnalban visszavitt a táborba, és megtiltotta, hogy bárkinek elmondjam, hogy otthon voltam. Félt.',
        },
        { type: 'message', from: 'contact', text: 'Én meg huszonöt évig azt hittem, ha ott maradok vele, ma is élne.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Nem a maga hibája volt.',
              replies: [{ type: 'message', from: 'contact', text: 'Tudom. Mostanában kezdem elhinni.' }],
            },
            {
              text: 'Ilona azt mondta az újságnak, fél tizenegykor bezárta az irodát.',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Akkor ezt nem tudtam. Gedeon mutatta meg a cikket. Azóta nem alszom.',
                },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Van még valami. Gedeon a halála előtti este hangüzenetet hagyott nekem. Nem vettem fel a telefont. Továbbítom.',
          audio: 'ch5-voice-gedeon',
        },
        { type: 'message', from: 'contact', text: 'Alig lehet érteni. Én csak recsegést hallok.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch5-morse' } },
        { type: 'message', from: 'player', text: 'A háttérben kopog. Morzejelek: P-A-T-I-K-A.' },
        { type: 'message', from: 'contact', text: 'A patika.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Tudta. Tudta, hogy a gyógyszerrel van baj, csak már nem volt ereje szólni.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Ilona most is minden reggel kinyitja a patikát, mintha mi sem történt volna.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Ha bemegyünk a rendőrségre, elmondom, amit huszonöt éve nem mertem. De a feljelentést magának kell megírnia. Maga rakta össze.',
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
        { id: 'ch5-s-attic', text: 'Réka az üzenetben: tavaly, az anyja halála után találta meg az apja másolatait a padláson.' },
        {
          id: 'ch5-s-pasztor',
          text: 'Pásztor László: háromnegyed tizenegy körül, amikor a stéghez ért, Pál kislánya épp hazaindult – a vacsoráját hozta neki.',
        },
      ],
      answerHash: 'd09d631e8adf7cdb2b76a2bbab1690d4c6babe3439c3bc467afb5cfb3563988e',
      conclusion: 'Réka nem volt táborban: aznap este ott járt a klubnál. Mit látott?',
      hints: [
        'Réka azt mondja, hol volt a tűz estéjén. Valaki más is említette, ki járt aznap este a klubnál.',
        'Pásztor László vallomását nézd meg a Jegyzetfüzetben: kit látott, amikor a stéghez ért?',
        'Kösd össze Réka tábor-történetét Pásztor vallomásával: Pál kislánya aznap este a klubnál volt.',
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
      id: 'ch5-reka-witness',
      title: 'Réka, a szemtanú',
      description:
        'Réka 14 évesen megszökött a táborból, és fél tizenegy után a klubnál járt. A bejárat előtt Vidor Ilona zöld Škodája állt; az apja azt mondta, még dolga van a könyvelővel. Ilona azt állította, fél tizenegykor bezárta az irodát.',
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

  characterFacts: [
    {
      id: 'ch5-f-reka-camp',
      character: 'reka',
      text: 'A tűz estéjén megszökött a balatonfüredi táborból. Fél tizenegy után levitte a vacsorát az apjának, és a klub előtt Ilona zöld Škodáját látta. Huszonöt évig titkolta.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch5-reka-2' },
    },
    {
      id: 'ch5-f-ilona-car',
      character: 'ilona',
      text: 'A tűz estéjén fél tizenegy után a zöld Škodája (HKZ-907) a klub bejárata előtt állt – pedig azt mondta, akkor bezárt és elment.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch5-reka-2' },
    },
    {
      id: 'ch5-f-pal-bookkeeper',
      character: 'pal',
      text: 'Fél tizenegy után hazaküldte Rékát, mert „még dolga volt a könyvelővel”.',
      knownWhen: { type: 'conversationFinished', conversation: 'ch5-reka-2' },
    },
    {
      id: 'ch5-f-gedeon-morse',
      character: 'gedeon',
      text: 'A halála előtti este hangüzenetet hagyott Rékának; a háttérben morzejelekkel kopogta: PATIKA.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch5-morse' },
    },
  ],

  outro: [
    'Egy tizennégy éves lány, aki megszökött a táborból, és látta a zöld autót. Egy kasszakönyv-másolat, egy kiadási napló, és egy kopogás egy recsegő felvételen.',
    'Minden darab megvan. Már csak le kell írni.',
  ],

  completedWhen: { type: 'conversationFinished', conversation: 'ch5-reka-2' },
}
