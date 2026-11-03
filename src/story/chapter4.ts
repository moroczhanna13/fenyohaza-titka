import type { Chapter } from './types'

/** 4. fejezet – A könyvelés */
export const chapter4: Chapter = {
  id: 'ch4',
  number: 4,
  title: 'A könyvelés',

  intro: [
    'Kerekes Pál a halála előtt azt mondta, valami nem stimmel a könyvekkel. A könyvek elégtek a tűzben.',
    'Legalábbis mindenki ezt hitte.',
  ],

  apps: [],

  conversations: [
    {
      id: 'ch4-unknown',
      contact: 'Ismeretlen szám',
      thread: 'ch1-unknown',
      steps: [
        {
          type: 'message',
          from: 'contact',
          text: 'Pál nem bízott senkiben. Minden hónap végén lefénymásolta a kasszakönyvet, és hazavitte.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Átküldtem az utolsó másolatot, 2001 júniusából. Gedeon napokig ült felette.',
        },
        { type: 'message', from: 'contact', text: 'Keresse meg a sort, ahol nem stimmel a számolás.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch4-ledger' } },
        {
          type: 'message',
          from: 'player',
          text: 'A június 27-i sor. 450 000 forint jött be, az egyenleg mégis csak 150 000-rel nőtt. V. I. szignálta.',
        },
        { type: 'message', from: 'contact', text: 'Vidor Ilona. A klub könyvelője.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Háromszázezer forint tűnt el egyetlen sorban. Pál észrevette. Három héttel később leégett a klub.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Ilona ma a patikus, igaz?',
              replies: [{ type: 'message', from: 'contact', text: 'Igen. A Fenyő Patika az övé.' }],
            },
            {
              text: 'Ezt Gedeon is tudta?',
              replies: [{ type: 'message', from: 'contact', text: 'Tudta. És mégis tőle vette a gyógyszerét. Nem volt másik patika.' }],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Gedeon a halála előtti napon a Fenyő Patikából hozta az új gyógyszerét. A patikának van egy belső oldala: fenyopatika.hu/belso.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Gedeon azt mondta, Ilona minden jelszava ugyanúgy készül: a kutyája neve, meg egy évszám, ami fontos neki.',
        },
        { type: 'message', from: 'contact', text: 'Nézze meg, mit posztol magáról a Szomszédok oldalon.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch4-pharmacy-password' } },
        {
          type: 'message',
          from: 'player',
          text: 'Bent vagyok. Szeptember 13-án Gedeon a felírt 5 mg helyett 10 mg-os vérnyomáscsökkentőt kapott. Kiadta: V. I.',
        },
        { type: 'message', from: 'contact', text: '…' },
        { type: 'message', from: 'contact', text: 'Ezért szédült. Ezért esett le a lépcsőn.' },
        { type: 'message', from: 'contact', text: 'Holnap mindent elmondok. Azt is, hogy ki vagyok.' },
      ],
    },
  ],

  photos: [],

  pages: [
    {
      kind: 'static',
      id: 'ch4-social-ilona',
      url: 'szomszedok.hu/vidor.ilona',
      title: 'Fenyőházi Szomszédok – Vidor Ilona',
      intro: 'Patikus, Fenyőháza. Kutyás, teás, könyves.',
      bookmarked: true,
      blocks: [
        {
          type: 'text',
          text: '2024. március 1. · Húsz éve, 2004. március 1-jén nyitottuk meg a Fenyő Patikát. Köszönöm minden kedves vásárlónak, hogy azóta is minket választ!',
        },
        { type: 'text', text: '2023. augusztus 6. · Bodri ma tizenkét éves. Még mindig ő a főnök a pult mögött.' },
        { type: 'text', text: '2023. július 22. · Idén sem megyek ki a fesztiválra. Valahogy nem megy.' },
        { type: 'text', text: '2022. május 14. · Megérkeztek az új gyógyteakeverékeink. Kóstolják meg!' },
      ],
    },
    {
      kind: 'login',
      id: 'ch4-pharmacy',
      url: 'fenyopatika.hu/belso',
      title: 'Fenyő Patika – belső rendszer',
      intro: 'Csak munkatársaknak.',
      username: 'vidor.ilona',
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
        'A június 27-i sorban 450 000 Ft bevétel után az egyenleg csak 150 000 Ft-tal nőtt. 300 000 Ft eltűnt. A sort V. I., Vidor Ilona szignálta.',
      hints: [
        'Minden sorban: egyenleg = előző egyenleg + bevétel − kiadás.',
        'Számold végig a sorokat fentről lefelé, és figyeld, hol nem jön ki a következő egyenleg.',
        'A június 27-i sor: 1 353 500 + 450 000 nem 1 503 500.',
      ],
    },
    {
      id: 'ch4-pharmacy-password',
      kind: 'text',
      title: 'A patika jelszava',
      prompt: 'Jelszó',
      whereToSolve: 'A jelszót a patika belső oldalán kell beírni: fenyopatika.hu/belso (Böngésző).',
      answerHash: '3aae5cfbd52907de94fddd9f9ee4a4c7f8be35acd3cff808727ac6f56ff48ff5',
      hints: [
        'A felhasználónév már ki van töltve. A jelszó Ilona kutyájának neve és egy számára fontos évszám, egybeírva.',
        'Ilona posztjai a Böngészőben, a Fenyőházi Szomszédok oldalon vannak: ott a kutyája neve és a patika nyitásának éve.',
        'A jelszó: bodri2004.',
      ],
    },
  ],

  evidence: [
    {
      id: 'ch4-ledger-row',
      title: 'A hamisított sor',
      description:
        'Pál kasszakönyv-másolatában a június 27-i sorból 300 000 Ft hiányzik. A sort V. I., Vidor Ilona könyvelő szignálta – három héttel a tűz előtt.',
      source: { type: 'puzzle', puzzle: 'ch4-ledger' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch4-ledger' },
    },
    {
      id: 'ch4-pharmacy-log',
      title: 'A patika kiadási naplója',
      description:
        'Gedeon szeptember 13-án a felírt 5 mg helyett 10 mg-os vérnyomáscsökkentőt kapott, orvosi jóváhagyás nélkül. Kiadta: V. I. Előző nap Ilona szólt a kollégájának, hogy Gedeon receptjét ő adja ki.',
      source: { type: 'puzzle', puzzle: 'ch4-pharmacy-password' },
      foundWhen: { type: 'puzzleSolved', puzzle: 'ch4-pharmacy-password' },
    },
  ],

  outro: [
    'Egy sor a kasszakönyvben: háromszázezer forint, V. I. szignóval.',
    'Huszonöt évvel később ugyanez a kézjegy egy kiadási naplóban, egy dupla erősségű tabletta mellett.',
    'Az ismeretlen üzenő holnap előjön.',
  ],

  completedWhen: { type: 'conversationFinished', conversation: 'ch4-unknown' },
}
