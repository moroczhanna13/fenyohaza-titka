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
    'Berényi Gedeon nyugdíjas zárszerelő volt, és megszállott rejtvényfejtő. A nagybátyád. Szeptember közepén leesett a lépcsőn a saját házában. Hivatalosan baleset.',
    'Harminc évig mászott létrán mások zárjaihoz, és egyszer sem esett le. Ez azóta sem hagy nyugodni.',
    'Az utolsó évében egy régi fenyőházi ügy foglalkoztatta. Hogy mi, azt senkinek nem mondta el.',
    'A hagyatékból egy kartondobozt kaptál, rajta az ő írásával: „Neked. Te szereted a rejtvényeket.” Benne a telefonja és néhány papír.',
    'A telefon le van zárva.',
  ],

  lock: { puzzle: 'ch1-lock', title: 'Berényi Gedeon telefonja' },

  box: [
    {
      id: 'ch1-box-note',
      title: 'A cédula',
      blocks: [{ type: 'text', text: '„VII. 21. – NEM zárlat. Két tűz. Ki hazudik?”' }],
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
    { app: 'notebook', availableAfter: unlocked },
    { app: 'email', availableAfter: unlocked },
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
              text: 'A dobozában volt egy cédula: „NEM zárlat. Két tűz. Ki hazudik?”',
              replies: [
                { type: 'message', from: 'contact', text: 'Két tűz?' },
                { type: 'message', from: 'contact', text: 'Akkor messzebb jutott, mint amennyit nekem elmondott.' },
              ],
            },
          ],
        },
        { type: 'message', from: 'contact', text: 'Az utolsó üzenetében egy képről írt. Nekem nem küldte el.' },
        { type: 'message', from: 'contact', text: 'Ha megtalálja, írja meg, hol készült.' },
        { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'ch1-photo-place' } },
        { type: 'message', from: 'player', text: 'Megvan a kép. Kikötő sétány 4.' },
        { type: 'message', from: 'contact', text: 'Igen. Ott állt a vitorlásklub, mielőtt leégett.' },
        { type: 'message', from: 'contact', text: 'A gondnok bent halt meg. Kerekes Pál.' },
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
          text: 'Tisztelt Berényi úr! Megérkezett az új vérnyomás-gyógyszere, holnaptól átveheti. Üdvözlettel: Vidor Ilona, Fenyő Patika · fenyopatika.hu',
        },
        { type: 'message', from: 'player', text: 'Köszönöm, holnap beugrom.' },
      ],
      steps: [],
    },
    // Gedeon never saved these three numbers; who is who is found out in chapter 3.
    {
      id: 'ch1-num-toth',
      contact: '+36 30 412 7781',
      availableAfter: unlocked,
      history: [
        {
          type: 'message',
          from: 'player',
          time: 'júl. 2. 10:14',
          text: 'Jó napot kívánok! Berényi Gedeon vagyok. A 2001-es vitorlásklubos tűzről kérdeznék, ha ráér.',
        },
        { type: 'message', from: 'contact', text: 'Nem érek rá. Az egy lezárt ügy, kérem, hagyja nyugodni.' },
        {
          type: 'message',
          from: 'player',
          time: 'júl. 9. 08:30',
          text: 'Csak egyetlen kérdés: hány órakor értesült a tűzről?',
        },
      ],
      steps: [],
    },
    {
      id: 'ch1-num-pasztor',
      contact: '+36 20 518 3364',
      availableAfter: unlocked,
      history: [
        {
          type: 'message',
          from: 'player',
          time: 'aug. 14. 18:02',
          text: 'Jó estét! Berényi Gedeon vagyok. Emlékszik még 2001 nyarára?',
        },
        { type: 'message', from: 'contact', text: 'Arra itt mindenki emlékszik.' },
        { type: 'message', from: 'contact', text: 'Ha inni jön, jöjjön. Ha kérdezni, ne.' },
      ],
      steps: [],
    },
    {
      id: 'ch1-num-meszaros',
      contact: '+36 30 266 0915',
      availableAfter: unlocked,
      history: [
        { type: 'message', from: 'player', time: 'aug. 30. 20:41', text: 'Jó estét! Beszélhetnénk a régi klubról?' },
        { type: 'message', from: 'contact', text: 'Nincs miről beszélni. Huszonöt éve volt.' },
        { type: 'message', from: 'player', text: 'Csak a fesztivál éjszakájáról kérdeznék.' },
        { type: 'message', from: 'contact', text: 'Akkor végképp nincs.' },
      ],
      steps: [],
    },
  ],

  emails: [
    {
      id: 'ch1-mail-puzzleclub',
      from: 'Fejtörő Klub',
      subject: 'Októberi feladványok – hiányoltuk a megfejtését',
      date: 'okt. 5.',
      availableAfter: unlocked,
      body: [
        'Kedves Gedeon!',
        'Tizenkét év óta most először nem érkezett meg a havi megfejtése. Remélem, csak a nyár volt hosszú.',
        'Csatoltuk az októberi feladványokat: két keresztrejtvény, egy logikai sakkfeladvány és – külön kérésére – egy titkosírásos levél.',
        'Szívélyes üdvözlettel: Szentes Ágnes, Fejtörő Klub',
      ],
    },
    {
      id: 'ch1-mail-library',
      from: 'Városi Könyvtár',
      subject: 'Lejárt kölcsönzési határidő',
      date: 'okt. 2.',
      availableAfter: unlocked,
      body: [
        'Tisztelt Olvasónk!',
        'Az alábbi dokumentum kölcsönzési határideje lejárt: Fenyőházi Hírek, 2001. évfolyam (bekötött példány, csak helyben olvasható – kivételes engedéllyel kölcsönözve).',
        'Kérjük, mielőbb juttassa vissza a könyvtárba.',
        'Üdvözlettel: Fenyőházi Városi Könyvtár',
      ],
    },
    {
      id: 'ch1-mail-newspaper',
      from: 'Fenyőházi Hírek',
      subject: 'Elkészült az online archívumunk',
      date: 'szept. 30.',
      availableAfter: unlocked,
      body: [
        'Kedves Olvasónk!',
        'Örömmel jelentjük, hogy elkészült a Fenyőházi Hírek online archívuma. 1990-től minden lapszámunk elérhető, dátum szerint kereshető.',
        'Jó böngészést kíván a szerkesztőség',
      ],
    },
    {
      id: 'ch1-mail-spam-prize',
      folder: 'spam',
      from: 'Nyereményközpont',
      subject: 'GRATULÁLUNK! Ön nyert egy robotporszívót!',
      date: 'szept. 18.',
      availableAfter: unlocked,
      body: [
        'Kedves Szerencsés Nyertes!',
        'Önt választottuk ki heti sorsolásunk fődíjára! A nyeremény átvételéhez csak a szállítási díjat (990 Ft) kell kifizetnie bankkártyával 24 órán belül.',
        'Ne hagyja ki ezt a lehetőséget!',
      ],
    },
    {
      id: 'ch1-mail-water',
      from: 'Fenyőházi Vízmű',
      subject: 'Vízdíj-értesítő – 2026. augusztus',
      date: 'szept. 15.',
      availableAfter: unlocked,
      body: [
        'Tisztelt Berényi Gedeon!',
        'Augusztusi fogyasztása: 4 m³. Fizetendő: 3 412 Ft, fizetési határidő: szeptember 30.',
        'Fenyőházi Vízmű Kft. – ügyfélszolgálat',
      ],
    },
    {
      id: 'ch1-mail-erecept',
      from: 'E-recept értesítő',
      subject: 'Új e-receptje érkezett',
      date: 'szept. 10.',
      availableAfter: unlocked,
      body: [
        'Tisztelt Berényi Gedeon!',
        'Háziorvosa, dr. Somogyi Katalin e-receptet állított ki Önnek:',
        'Amlodipin 5 mg tabletta, 30 db. Adagolás: naponta 1 tabletta, reggel.',
        'A recept bármely gyógyszertárban kiváltható a TAJ-kártyája bemutatásával. Ez egy automatikus értesítés, kérjük, ne válaszoljon rá.',
      ],
    },
    {
      id: 'ch1-mail-sent-puzzleclub',
      folder: 'sent',
      from: 'Fejtörő Klub',
      subject: 'Augusztusi megfejtések',
      date: 'aug. 31.',
      availableAfter: unlocked,
      body: [
        'Kedves Ágnes!',
        'Mellékelem az augusztusi megfejtéseket. A titkosírásosnál a kulcs ezúttal is a dátumban volt – ahogy szinte mindig.',
        'A szeptemberivel lehet, hogy csúszni fogok. Egy régi ügy most minden időmet elviszi.',
        'Üdv: Gedeon',
      ],
    },
    {
      id: 'ch1-mail-keys',
      from: 'Zár-Kulcs Nagyker',
      subject: 'Rendelése visszaigazolása (#20931)',
      date: 'aug. 28.',
      availableAfter: unlocked,
      body: [
        'Köszönjük rendelését!',
        '20 db Yale-kulcsnyers, 2 db cilinderbetét (30/30), 1 db tűreszelő-készlet. Fizetendő: 18 650 Ft, utánvéttel.',
        'Várható kézbesítés: 2–3 munkanap.',
      ],
    },
    {
      id: 'ch1-mail-mayor',
      from: 'Tóth Ervin polgármester',
      subject: 'Köszönjük, Fenyőháza!',
      date: 'aug. 25.',
      availableAfter: unlocked,
      body: [
        'Kedves Fenyőháziak!',
        'Köszönöm mindenkinek, aki idén is velünk ünnepelt a Tavi Fesztiválon. Jövőre ugyanitt, ugyanígy!',
        'Ha kérdésük, javaslatuk van, keressenek bizalommal: fogadóórám minden hónap első hétfőjén van a városházán, de a mobilomon is elérnek.',
        'Tóth Ervin polgármester · +36 30 412 7781',
      ],
    },
    {
      id: 'ch1-mail-spam-parcel',
      folder: 'spam',
      from: 'Csomagkövetés',
      subject: 'Csomagja nem kézbesíthető – vámkezelési díj szükséges',
      date: 'aug. 3.',
      availableAfter: unlocked,
      body: [
        'Tisztelt Ügyfelünk!',
        'Csomagja a vámraktárban várakozik. A kézbesítéshez fizessen be 1 290 Ft vámkezelési díjat 48 órán belül, különben a csomagot visszaküldjük.',
      ],
    },
    {
      id: 'ch1-mail-club',
      from: 'Fenyőházi Vitorlásklub',
      subject: 'Meghívó – 25 éve égett le a klubház',
      date: 'júl. 10.',
      availableAfter: unlocked,
      body: [
        'Kedves Tagjaink, Barátaink!',
        'Huszonöt éve, 2001. július 21-én a Tavi Fesztivál éjszakáján leégett régi klubházunk, és életét vesztette gondnokunk, Kerekes Pál.',
        'Július 21-én, kedden este 8 órakor a Kikötő sétány 4. előtt rövid megemlékezést tartunk. Beszédet mond Tóth Ervin polgármester, a régi klub elnöke.',
        'A 2009-ben újjáalakult Fenyőházi Vitorlásklub vezetősége',
      ],
    },
    {
      id: 'ch1-mail-sent-library',
      folder: 'sent',
      from: 'Fenyőházi Városi Könyvtár',
      subject: 'Kölcsönzési kérelem – Fenyőházi Hírek, 2001',
      date: 'márc. 20.',
      availableAfter: unlocked,
      body: [
        'Tisztelt Könyvtár!',
        'Szeretném kikölcsönözni a Fenyőházi Hírek 2001-es bekötött évfolyamát. Tudom, hogy csak helyben olvasható, de egy régi ügy miatt otthon kellene dolgoznom vele néhány hétig. Vigyázni fogok rá.',
        'Köszönettel: Berényi Gedeon',
      ],
    },
  ],

  photos: [
    {
      id: 'ch1-photo-workshop',
      src: 'images/ch1/workshop.webp',
      alt: 'Gedeon műhelye esti lámpafényben: kulcsmásoló gép közelről, a satuban kulcsnyersek, körülöttük fémforgács.',
      info: { takenAt: '2026-07-02T18:20', place: 'Fenyőháza, Bükk utca 12.', coordinates: { lat: 46.9241, lon: 17.8833 } },
    },
    {
      id: 'ch1-photo-square',
      src: 'images/ch1/main-square.webp',
      alt: 'A főtér a városházával: a homlokzaton „VÁROSHÁZA” felirat és zászlók, előtte szökőkút a kövezett téren.',
      info: { takenAt: '2026-08-20T10:05', place: 'Fenyőháza, Fő tér', coordinates: { lat: 46.9205, lon: 17.8867 } },
    },
    {
      id: 'ch1-photo-poster',
      src: 'images/ch1/festival-poster.webp',
      alt: 'Parafatábla a könyvtárban, rajta egy kifakult, összehajtogatott plakát: vitorlás a tavon. Felirata: „Tavi Fesztivál 2001, július 20–21., Kikötő sétány. Vásár, sétahajózás, esti koncert. Tűzijáték szombaton 22:30. Fenyőházi Vitorlásklub.” Mellette két kézzel írt cetli.',
      info: { takenAt: '2026-09-10T14:40', place: 'Fenyőháza, Városi Könyvtár', coordinates: { lat: 46.9198, lon: 17.8852 } },
    },
    {
      id: 'ch1-photo-lake-morning',
      src: 'images/ch1/lake-morning.webp',
      alt: 'Párás reggel a tóparton: homokos strand, fűzfák és nyárfák, mögöttük erdős hegyoldal, a vízparton néhány korai fürdőző.',
      info: { takenAt: '2026-09-14T08:30', place: 'Fenyőháza, Szabadstrand', coordinates: { lat: 46.9150, lon: 17.8790 } },
    },
    {
      id: 'ch1-photo-pills',
      src: 'images/ch1/pills.webp',
      alt: 'Konyhaasztal, rajta egy levél fehér tabletta és a patika kiadási címkéje: „Fenyő Patika · Fő tér 3. – Berényi Gedeon – Amlodipin 10 mg tabl. 30x – 1x1 reggel – Kiadva: 2026.09.13.”',
      info: { takenAt: '2026-09-13T19:40', place: 'Fenyőháza, Bükk utca 12.', coordinates: { lat: 46.9241, lon: 17.8833 } },
    },
    {
      id: 'ch1-photo-lake-evening',
      src: 'images/ch1/lake-evening.webp',
      alt: 'Kék óra a tónál. A parton egy leégett épület maradványai: kormos, csonka kémény és alacsony, beomlott alapfalak, mögöttük a víz és kopasz fák.',
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
      title: 'Hol készült Gedeon utolsó képe?',
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

  notes: [
    {
      id: 'ch1-note-unknown',
      date: 'márc. 12.',
      text: 'Ismeretlen szám. Pál miatt ír, a könyvelést emlegeti. Nem mondja meg, ki ő – nem is kérdezem többet.\nAki huszonöt év után is ezen rágódik, annak oka van rá.',
      availableAfter: unlocked,
    },
    {
      id: 'ch1-note-pills',
      date: 'szept. 13.',
      text: 'Új doboz a patikából. Más a színe, mint eddig.\nRákérdezni a doktornőnél.',
      availableAfter: unlocked,
    },
  ],

  characters: [
    { id: 'gedeon', name: 'Berényi Gedeon', roleNow: 'a nagybátyád; nyugdíjas zárszerelő, rejtvényfejtő' },
    { id: 'reka', name: 'Ismeretlen szám', roleNow: 'névtelenül ír Gedeon telefonjára' },
    { id: 'pal', name: 'Kerekes Pál', roleThen: 'a vitorlásklub gondnoka' },
    { id: 'ilona', name: 'Vidor Ilona', roleNow: 'patikus, Fenyő Patika' },
    { id: 'toth', name: 'Tóth Ervin', roleNow: 'Fenyőháza polgármestere' },
  ],

  characterFacts: [
    {
      id: 'ch1-f-gedeon-death',
      character: 'gedeon',
      text: 'Szeptember közepén leesett a lépcsőn a saját házában. Hivatalosan baleset.',
    },
    {
      id: 'ch1-f-gedeon-photo',
      character: 'gedeon',
      text: 'Szeptember 14-én este a leégett vitorlásklub romjait fotózta, utána azt írta: „Ha velem történne valami, ott keressék.”',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch1-photo-place' },
    },
    {
      id: 'ch1-f-reka-march',
      character: 'reka',
      text: 'Márciusban írt először Gedeonnak, Kerekes Pál halála miatt. Nem mondja meg, ki ő.',
    },
    {
      id: 'ch1-f-pal-death',
      character: 'pal',
      text: '2001. július 21-én, a Tavi Fesztivál éjszakáján halt meg, amikor leégett a vitorlásklub. A rendőrség balesetnek minősítette.',
      knownWhen: { type: 'puzzleSolved', puzzle: 'ch1-photo-place' },
    },
    {
      id: 'ch1-f-ilona-pills',
      character: 'ilona',
      text: 'Szeptember 12-én ő írt Gedeonnak, hogy megérkezett az új vérnyomás-gyógyszere.',
    },
  ],

  outro: [
    'Másnap kimész a Kikötő sétányra. A telek gazos, a kerítés mögött kormos alapfalak, a vízből elszenesedett cölöpök állnak ki.',
    'Huszonöt éve itt állt a vitorlásklub. A Tavi Fesztivál éjszakáján porig égett, a gondnok, Kerekes Pál bent halt meg. A rendőrség balesetnek minősítette.',
    'Gedeon nem hitte el. Most már te sem.',
  ],

  completedWhen: {
    type: 'all',
    conditions: [
      { type: 'puzzleSolved', puzzle: 'ch1-photo-place' },
      { type: 'conversationFinished', conversation: 'ch1-unknown' },
    ],
  },
}
