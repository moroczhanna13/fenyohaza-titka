import type { Chapter, Condition, MapPlace, MapRoad, StoryCase } from './types'

const routeSolved: Condition = { type: 'puzzleSolved', puzzle: 'mb-route' }
const busFound: Condition = { type: 'puzzleSolved', puzzle: 'mb-location' }

const PLACES: MapPlace[] = [
  { id: 'mb-school', label: 'Fenyőháza, iskola', x: 46, y: 46 },
  { id: 'mb-kovago', label: 'Kővágó (kút)', x: 84, y: 40 },
  { id: 'mb-nadas', label: 'Nádas', x: 12, y: 30 },
  { id: 'mb-inn', label: 'Rózsa Csárda', x: 28, y: 76 },
  { id: 'mb-fork', label: 'Bükkösi elágazás', x: 66, y: 16, labelSide: 'left' },
  { id: 'mb-farm', label: 'Ködös-major', x: 90, y: 4 },
  { id: 'mb-forester', label: 'Erdészlak', x: 42, y: 4 },
]

const ROADS: MapRoad[] = [
  { from: 'mb-school', to: 'mb-kovago', km: 12 },
  { from: 'mb-school', to: 'mb-inn', km: 15 },
  { from: 'mb-school', to: 'mb-nadas', km: 20 },
  { from: 'mb-nadas', to: 'mb-inn', km: 18 },
  { from: 'mb-inn', to: 'mb-kovago', km: 22 },
  { from: 'mb-nadas', to: 'mb-kovago', km: 25 },
  { from: 'mb-kovago', to: 'mb-fork', km: 9 },
  { from: 'mb-fork', to: 'mb-farm', km: 2 },
  { from: 'mb-fork', to: 'mb-forester', km: 3 },
]

/** Mellékügy – Az eltűnt kisbusz */
const chapter: Chapter = {
  id: 'mb',
  title: 'Az eltűnt kisbusz',

  intro: [
    'Hétfő reggel, 2026. október 19. A Fenyőházi Általános Iskola kisbusza eltűnt a garázsból.',
    'Nincs betört ablak, nincs feszegetett zár. Az igazgatónő arra kér, nézz utána, mielőtt hívja a rendőrséget.',
  ],

  apps: [
    { app: 'messages' },
    { app: 'email' },
    { app: 'gallery' },
    { app: 'browser' },
    { app: 'notebook' },
    { app: 'deductions' },
  ],

  conversations: [
    {
      id: 'mb-judit',
      contact: 'Szalai Judit',
      steps: [
        {
          type: 'message',
          from: 'contact',
          text: 'Jó reggelt! Szalai Judit vagyok, az iskola igazgatója. Juhászné adta meg a számát, azt mondta, maga ki szokott deríteni dolgokat.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Eltűnt a kisbuszunk. Pénteken délután még a garázsban volt, ma reggel háromnegyed hétkor Kántor úr, a gondnok, üresen találta a garázst.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Van betörésnyom?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Semmi. A garázs zárva volt, pontosan úgy, ahogy Kántor úr pénteken hagyta.',
                },
              ],
            },
            {
              text: 'Rendőrséget hívott már?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Még nem. Ha valamelyik kollégám volt, nem szeretném, hogy rendőrségi ügy legyen belőle.',
                },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Kulcsa hármuknak van: Kántor úrnak, Varga Sándornak, a sofőrünknek, és Bakos Tamásnak, aki szerda óta helyettesíti. Varga urat szerdán megműtötték, most is kórházban van.',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Kántor úr lefotózta a térképet a garázs faláról, és elküldte e-mailben a menetlevelet. A heti menetrend fent van az iskola honlapján.',
          photo: 'mb-map',
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Hétvégén jött egy furcsa e-mail is a tankolókártya-cégtől. Azt is továbbítottam.',
        },
        {
          type: 'choice',
          options: [
            {
              text: 'Bakos Tamással beszélt már?',
              replies: [{ type: 'message', from: 'contact', text: 'Kétszer hívtam. Nem veszi fel.' }],
            },
            {
              text: 'Mi a furcsa az e-mailben?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Hogy vasárnap hajnalban tankoltak a kártyánkkal. Hétvégén a busz nem jár.',
                },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Egy szülő most küldte ezt a képet egy szombati lakodalomból. Szerinte a háttérben a mi buszunk áll. A Szomszédok-csoportban is írtak a lagziról.',
          photo: 'mb-wedding',
        },
        { type: 'message', from: 'contact', text: 'Ha kitalálja, merre járt a busz a hétvégén, szóljon.' },
        { type: 'wait', until: routeSolved },
        { type: 'message', from: 'contact', text: 'Nádas, Rózsa Csárda, vissza Nádasra, aztán Kővágó. Lakodalmi fuvar. A mi buszunkkal.' },
        {
          type: 'message',
          from: 'contact',
          text: 'Még valami: a Tó Taxi diszpécsere az unokatestvérem. Vasárnap hajnalban 3:40-kor egy férfit vettek fel a Bükkösi elágazásnál, és behozták Fenyőházára. Gyalog jött ki az erdő felől, olajos volt a keze.',
        },
        { type: 'message', from: 'contact', text: 'A busz tehát valahol ott van. De hol?' },
        { type: 'wait', until: busFound },
        {
          type: 'message',
          from: 'contact',
          text: 'Kántor úr kiment a majorhoz. Ott áll a busz a pajtában, ponyvával letakarva. Elment a kuplungja.',
        },
        { type: 'message', from: 'contact', text: 'Bakos Tamás most írt. Azt mondja, magával akar beszélni, nem velem.' },
      ],
    },
    {
      id: 'mb-bakos',
      contact: 'Bakos Tamás',
      availableAfter: { type: 'conversationFinished', conversation: 'mb-judit' },
      steps: [
        { type: 'message', from: 'contact', text: 'Tudom, hogy maga találta meg a buszt.' },
        {
          type: 'choice',
          options: [
            {
              text: 'Miért vitte el?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Negyvenezer forintért. Horváthéknak fuvar kellett a nádasi rokonoknak, a busz meg úgyis állt egész hétvégén.',
                },
              ],
            },
            {
              text: 'Miért nem szólt senkinek?',
              replies: [
                {
                  type: 'message',
                  from: 'contact',
                  text: 'Mert akkor most nem lenne munkám. Azt hittem, hétfőn csendben megjavíttatom.',
                },
              ],
            },
          ],
        },
        {
          type: 'message',
          from: 'contact',
          text: 'Hazafelé Kővágón tankoltam, a kártya úgyis nálam volt. A Bükkösi elágazás után megadta magát a kuplung. A földúton még be tudtam gurulni a major pajtájába, hogy ne lássa senki.',
        },
        { type: 'message', from: 'contact', text: 'A javítást kifizetem. Megmondja az igazgatónőnek, hogy sajnálom?' },
        {
          type: 'choice',
          options: [
            {
              text: 'Ezt magának kell megmondania.',
              replies: [{ type: 'message', from: 'contact', text: 'Igaza van. Felhívom.' }],
            },
            {
              text: 'Megmondom. De a kulcsot leadja.',
              replies: [{ type: 'message', from: 'contact', text: 'Már bedobtam az iskola postaládájába.' }],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Köszönöm, hogy nem a rendőrség talált meg.' },
      ],
    },
  ],

  emails: [
    {
      id: 'mb-email-logbook',
      from: 'Kántor Imre',
      subject: 'Menetlevél – PLK-215',
      date: 'okt. 19.',
      body: [
        'Igazgató asszony kérésére küldöm a kisbusz menetlevelének utolsó két napját.',
        'Csütörtök, okt. 15. – Reggeli és délutáni járatok. Indulás: 47 957 km, leadás: 48 085 km. Vezette: B. T.',
        'Péntek, okt. 16. – Reggeli és délutáni járatok. Indulás: 48 085 km, leadás 17:05-kor: 48 213 km. Vezette: B. T.',
        'Hétvégén a busz nem közlekedik. Pénteken 17:10-kor én zártam be a garázst.',
        'Kántor Imre, gondnok',
      ],
    },
    {
      id: 'mb-email-fuel',
      from: 'Szalai Judit',
      subject: 'Fw: Kártyás tankolás – értesítő',
      date: 'okt. 19.',
      body: [
        '---------- Továbbított üzenet ----------',
        'Feladó: TankKártya Ügyfélszolgálat · 2026. 10. 18. 02:43',
        'Tisztelt Ügyfelünk! A PLK-215 rendszámú járműhöz tartozó kártyával az alábbi tranzakció történt.',
        'Időpont: 2026. 10. 18. 02:41',
        'Helyszín: Kővágói töltőállomás, Fő út 2.',
        'Termék: gázolaj, 38,6 liter',
        'A kúton bekért kilométeróra-állás: 48 294 km',
        'Ha a tranzakciót nem Ön kezdeményezte, kérjük, jelezze ügyfélszolgálatunknak.',
      ],
    },
  ],

  pages: [
    {
      kind: 'static',
      id: 'mb-timetable',
      url: 'fenyohaziiskola.hu/kisbusz',
      title: 'Fenyőházi Általános Iskola – Iskolabusz',
      intro: 'Fehér Ford Transit, PLK-215. Csak tanítási napokon közlekedik.',
      bookmarked: true,
      blocks: [
        { type: 'heading', text: 'Menetrend (hétfőtől péntekig)' },
        {
          type: 'table',
          headers: ['Járat', 'Útvonal', 'Indul', 'Érkezik'],
          rows: [
            ['Reggeli 1.', 'Kővágó – iskola', '7:05', '7:20'],
            ['Reggeli 2.', 'Nádas – iskola', '7:35', '7:55'],
            ['Délutáni 1.', 'iskola – Kővágó', '15:20', '15:35'],
            ['Délutáni 2.', 'iskola – Nádas', '16:10', '16:30'],
          ],
        },
        {
          type: 'text',
          text: 'A busz minden járatra az iskolától indul üresen, és oda is tér vissza. Napi futásteljesítmény: 128 km. Hétvégén és a szünetekben a busz az iskola garázsában áll.',
        },
      ],
    },
    {
      kind: 'social',
      id: 'mb-neighbours',
      url: 'szomszedok.hu/fenyohaza',
      title: 'Fenyőházi Szomszédok – Fenyőháza és környéke',
      bookmarked: true,
      profileType: 'group',
      name: 'Fenyőháza és környéke',
      about: 'Nyilvános csoport · 2 318 tag',
      details: ['Helyi hírek, hirdetések, elveszett és talált dolgok.'],
      posts: [
        {
          author: 'Horváth Eszter',
          time: 'okt. 18. 11:02',
          text: 'Köszönjük mindenkinek, aki ott volt a lagzinkban a Rózsa Csárdában! Külön köszönet Tominak, aki elhozta a nádasi rokonokat, és hajnalban haza is vitte őket Nádasra!',
          likes: 57,
          comments: [
            { author: 'Kiss Ilona', text: 'Az a fehér kisbusz? Olyan volt, mint egy iskolabusz.' },
            {
              author: 'Horváth Eszter',
              text: 'Ugyan, bérelt. Tomi még a feliratot is leragasztotta rajta, hogy szebb legyen a fotókon.',
            },
          ],
        },
        {
          author: 'Juhász Péter',
          time: 'okt. 17. 18:30',
          text: 'Elveszett egy fekete-fehér macska a Kikötő sétány környékén. Bajusz névre hallgat.',
          likes: 12,
          comments: [{ author: 'Bencze Margit', text: 'Megosztottam. Remélem, hazatalál!' }],
        },
      ],
    },
    {
      kind: 'static',
      id: 'mb-forestry',
      url: 'bukkoserdeszet.hu/hirek',
      title: 'Bükkösi Erdészet – Hírek',
      intro: 'Fodor Gábor erdész bejegyzései.',
      bookmarked: true,
      availableAfter: routeSolved,
      blocks: [
        { type: 'heading', text: 'okt. 18. 9:15 · Hajnali járművek' },
        {
          type: 'text',
          text: 'Aki hajnalban a Ködös-major felé vezető földúton járt: a sárban friss keréknyom van, és a régi pajta ajtaja nyitva áll. Kérem, ne használják a majort, az épület balesetveszélyes.',
        },
        {
          type: 'text',
          text: 'Az Erdészlak felé éjjel senki nem jött, a kutyám mindenkit megugat, aki a kapu közelébe ér.',
        },
        { type: 'heading', text: 'okt. 10. 8:00 · Gombaszezon' },
        { type: 'text', text: 'Gombászni csak a kijelölt területeken szabad. Az erdészlaknál térképet adunk.' },
      ],
    },
  ],

  photos: [
    {
      id: 'mb-map',
      src: 'images/minibus/map.svg',
      alt: 'Kézzel rajzolt térkép a garázs faláról. Középen Fenyőháza és az iskola, körülötte Nádas, a Rózsa Csárda és Kővágó. Kővágótól északra a Bükkösi elágazás, onnan rövid földút vezet egyik oldalon az Erdészlakhoz, a másikon a Ködös-majorhoz.',
      caption: 'A térkép a garázs falán',
      info: { takenAt: '2026-10-19T07:02', place: 'Fenyőháza, iskola', device: 'Samsung Galaxy A14' },
    },
    {
      id: 'mb-wedding',
      src: 'images/minibus/wedding.svg',
      alt: 'Éjszakai lakodalmi fotó a Rózsa Csárda előtt. Ünneplő vendégek, a háttérben egy fehér kisbusz áll, az oldalán a felirat ragasztószalaggal letakarva; egy csík kilátszik: „…LÁNOS ISKOLA”.',
      caption: 'Lakodalom, Rózsa Csárda',
      info: { takenAt: '2026-10-17T23:48', place: 'Rózsa Csárda, Szőlőhegy', device: 'iPhone 13' },
    },
  ],

  puzzles: [
    {
      id: 'mb-route',
      kind: 'route',
      title: 'Merre járt a busz?',
      prompt:
        'Rakd össze, merre járt a busz a hétvégén! Az iskolától indul, és a kővágói tankolásnál ér véget. A teljes útnak pontosan annyi kilométernek kell lennie, amennyit a busz pénteki leadás óta ment.',
      places: PLACES,
      roads: ROADS,
      start: 'mb-school',
      answerHash: 'd4795f858ccfc4100d51352bed7c7269c46f913f058e88cc03375f2a90a62ef0',
      conclusion:
        'Szombat este valaki kivitte a buszt a garázsból, elhozta Nádasról a lakodalmi vendégeket a Rózsa Csárdába, hajnalban hazavitte őket, aztán Kővágón tankolt: 20 + 18 + 18 + 25 = 81 km. A vendégek szerint a sofőrt Tominak hívják.',
      hints: [
        'Hasonlítsd össze a menetlevél utolsó kilométeróra-állását a tankolási értesítővel.',
        '48 294 − 48 213 = 81 km. A lakodalmas kép és a Szomszédok-bejegyzés megmondja, hol járt még a busz.',
        'Iskola → Nádas → Rózsa Csárda → Nádas → Kővágó.',
      ],
    },
    {
      id: 'mb-location',
      kind: 'text',
      title: 'Hol áll a busz?',
      prompt: 'Hol áll most a kisbusz? Írd be a hely nevét, ahogy a térképen szerepel.',
      answerHash: 'dbc4af8fb58422f3162098ba0b5d66c49a9887bc4eac0947027cfb167c4a6f52',
      hints: [
        'A taxi a Bükkösi elágazásnál vette fel a férfit. Gyalog nem jöhetett messziről.',
        'A térképen két hely van az elágazás közelében. A Bükkösi Erdészet oldalán írtak róluk.',
        'Ködös-major.',
      ],
    },
  ],

  evidence: [
    {
      id: 'mb-ev-keys',
      title: 'Három kulcs',
      description:
        'A garázshoz Kántor Imre gondnoknak, Varga Sándor sofőrnek és Bakos Tamás helyettes sofőrnek van kulcsa. Varga úr szerda óta kórházban fekszik.',
      source: { type: 'conversation', conversation: 'mb-judit' },
      foundWhen: { type: 'photoViewed', photo: 'mb-map' },
    },
    {
      id: 'mb-ev-wedding',
      title: 'A busz a lakodalomban',
      description:
        'Szombaton 23:48-kor egy fehér kisbusz állt a Rózsa Csárda előtt, az oldalán letakart felirattal: „…LÁNOS ISKOLA”.',
      source: { type: 'photo', photo: 'mb-wedding' },
      foundWhen: { type: 'photoViewed', photo: 'mb-wedding' },
    },
    {
      id: 'mb-ev-guests',
      title: 'Fuvar Nádasról',
      description: 'Horváth Eszter szerint „Tomi” hozta el a nádasi rokonokat a lagziba, és hajnalban haza is vitte őket.',
      foundWhen: { type: 'pageVisited', page: 'mb-neighbours' },
    },
    {
      id: 'mb-ev-route',
      title: 'A hétvégi 81 kilométer',
      description: 'Iskola – Nádas – Rózsa Csárda – Nádas – Kővágó, ahol vasárnap 2:41-kor tankoltak a busszal.',
      source: { type: 'puzzle', puzzle: 'mb-route' },
      foundWhen: routeSolved,
    },
    {
      id: 'mb-ev-tracks',
      title: 'Keréknyom a majornál',
      description:
        'Fodor Gábor erdész vasárnap reggel friss keréknyomot talált a Ködös-major felé vezető földúton, a pajta ajtaja nyitva állt. Az Erdészlak felé senki nem ment.',
      foundWhen: { type: 'pageVisited', page: 'mb-forestry' },
    },
    {
      id: 'mb-ev-found',
      title: 'A busz megvan',
      description: 'A kisbusz a Ködös-major pajtájában áll, ponyvával letakarva, tönkrement kuplunggal.',
      source: { type: 'puzzle', puzzle: 'mb-location' },
      foundWhen: busFound,
    },
  ],

  completedWhen: {
    type: 'all',
    conditions: [busFound, { type: 'conversationFinished', conversation: 'mb-bakos' }],
  },

  outro: [
    'A kisbusz kedd reggel vontatón érkezett vissza az iskolába. Bakos Tamás kifizette a kuplungcserét, és leadta a kulcsát.',
    'Szalai Judit nem tett feljelentést. A menetlevélbe Kántor Imre csak ennyit írt: „Hétvége: 81 km, lagzi.”',
  ],
}

export const minibusCase: StoryCase = {
  id: 'minibus',
  kind: 'side',
  title: 'Az eltűnt kisbusz',
  summary: 'Az iskola kisbusza egyik napról a másikra nyom nélkül eltűnt a zárt garázsból.',
  chapters: [chapter],
}
