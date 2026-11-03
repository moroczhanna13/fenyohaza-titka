# Fenyőháza titka – történet és fejtörők

Munkacím. A nevek, a háttér és a megoldás cserélhető, de a fejlesztés ezt a változatot követi.

## Kiindulás

A játékos nagybátyja, Berényi Gedeon, nyugdíjas zárszerelő és szenvedélyes rejtvényfejtő meghalt, hivatalosan balesetben. Hagyatékba a játékos megkapja a telefonját és egy dobozt, benne egy cédulával: *„Ha ezt olvasod, nem baleset volt.”* Gedeon az utolsó éveiben egy régi ügyet ásott a kisvárosban, Fenyőházán.

## A régi ügy

25 éve, a Tavi Fesztivál éjszakáján leégett a vitorlásklub. A gondnok, Kerekes Pál a tűzben meghalt, a klub kasszájából pedig hiányzott egy ismeretlen összeg. A rendőrség balesetnek minősítette.

## A megoldás (a játékos csak a végén tudja meg)

A klub akkori könyvelője, Vidor Ilona (ma a város patikása) hamisította a könyvelést. A gondnok észrevette, ezért Ilona felgyújtotta a klubházat a bizonyítékokkal együtt. Gedeon évtizedek múlva rájött, és mielőtt nyilvánosságra hozhatta volna, Ilona gyógyszerekkel és „balesettel” eltüntette az útjából.

## Szereplők

| Szereplő | Ki ő? | Mit rejteget |
| --- | --- | --- |
| Tóth Ervin | polgármester, akkor klubelnök | feketén fizettetett a fesztivál üzemeltetőkkel, de a tűzhöz nincs köze |
| Pásztor László | kocsmáros, akkor kisegítő a klubban | aznap éjjel a tónál volt, mert összeveszett valakivel |
| Mészáros Béla | akkori klubtitkár | volt egy titkos kulcsa a klubházhoz, és ezt eltitkolta |
| Vidor Ilona | patikás, akkor a könyvelő | hamisította a könyvelést, ez az igazi tettes |
| Réka | az ismeretlen üzenő | Kerekes Pál lánya, hónapokkal ezelőtt értesítette Gedeont |

## Fejezetek

1. **A doboz:** feloldod Gedeon telefonját, és megtalálod az utolsó üzenetét.
2. **A tó éjszakája:** kiderül, mi történt a fesztivál éjszakáján, és hogy a tűz nem véletlen volt.
3. **Hamis alibik:** egyenként kikérdezed a gyanúsítottakat, az ellentmondásokból összerakod a nap időrendjét.
4. **A könyvelés:** a kassza nyomát követed, megtalálod a hamisított sorokat.
5. **Réka:** az üzenő előjön, de nem minden igaz, amit mond.
6. **A vád:** utolsó következtetés-képernyő, ahol megvádolod a tettest. Rossz válasz esetén visszalépsz egy fejezetet.

## Fejtörők a főszálban

Minden fejtörőhöz 3 tipp tartozik.

| Fejezet | Fejtörő | Típus | Megoldás útja |
| --- | --- | --- | --- |
| 1 | A cédula hátoldalán rovásírásos szó | kódfejtés | A dobozban egy rovásírás-ábécé is van, a szó a telefon jelszava |
| 1 | Gedeon galériája, egy fotó a tóról | megfigyelés | A kép infó-lapján látszik a pontos hely és idő, ez vezet a klubház romjához |
| 2 | A Fenyőházi Hírek online archívuma | keresés | Dátumra keresve előkerül a régi cikk, a tűzoltók naplója szerint a riasztás 23:10-kor volt, a cikk szerint 23:40-kor |
| 2 | Következtetés: ki hazudott az időről? | logika | Két ellentmondó állítást kell összekötni a következtetés-képernyőn |
| 3 | Alibi-idővonal | logika | Négy vallomást időrendbe húzol, pontosan egy nem fér bele |
| 3 | A fesztiválfotó háttérautója | keresés | A régi rendszám alapján a jármű-nyilvántartó oldalon kiderül a tulajdonosa |
| 4 | A klub kasszakönyve | számolás | Egy táblázatban az egyenlegek nem stimmelnek, a hibás sor a hamisítás |
| 4 | A patika belső oldala | jelszó-találgatás | A jelszó Ilona kutyájának neve és az évforduló, mindkettő egy régi közösségi posztban van |
| 5 | Gedeon utolsó hangüzenete | kódfejtés | A háttérben a billentyűhang rövid-hosszú ritmusa morze, ez egy szót ad |
| 5 | Réka két története | logika | Két beszélgetés között egy apró részlet nem egyezik |
| 6 | A vád | következtetés | Öt kérdés a kulcsbizonyítékokról, hibás válasznál vissza a megfelelő fejezetbe |

## Mellékügyek

| Mellékügy | Helyzet | Új fejtörő-típus |
| --- | --- | --- |
| Az eltűnt kisbusz | Az iskolai kisbusz másnapra nyom nélkül eltűnt a garázsból | menetrend, térkép, útvonal-kikövetkeztetés |
| A hamis aukció | Egy online bolhapiaci hirdetés túl szép, hogy igaz legyen | képek visszakeresése, a hirdető profiljának ellentmondásai |
| A szellemvonat | Egy régi, lezárt peronon éjjel fény látszik | hangfelvétel, rovásírás, rejtett üzenet a plakáton |

## Hangulat

Sötétkék és borostyánsárga színek, enyhe rádiózaj a háttérben, értesítéshang az új üzeneteknél. A szöveg köznapi magyar, kicsit szarkasztikus, de nem humoros, hiszen az ügy súlyos.

## Kidolgozott részletek (1–3. fejezet)

A játékban már szereplő, a fenti vázlatot kiegészítő tények. A későbbi fejezetek ezekre épülnek; a teljes szöveg a `src/story/chapter*.ts` fájlokban van.

- **Idővonal:** a játék jelene 2026 ősze. A Tavi Fesztivál 2001. július 20–21-én volt, a tűz szombat éjjel, július 21-én. Tűzijáték 22:30-kor.
- **Helyszín:** a klubház címe Kikötő sétány 4. Gedeon szeptember 14-én 21:12-kor fotózta a romokat, 21:30-kor írta az utolsó üzenetét.
- **1. fejezet:** a telefon jelszava KEREKES (rovásírással a cédula hátoldalán). Gedeon még tavasszal egy ismeretlen számtól (Réka) kapott üzenetet; Réka névtelenül, magázva ír.
- **Előre jelzett szálak:** Vidor Ilona a patikából üzent Gedeonnak „az új vérnyomás-gyógyszeréről” (szept. 12.). Ilona a cikkben azt állítja, fél tizenegykor bezárta az irodát. A Régi Rendszám oldalon az ő autója is szerepel (HKZ-907).
- **2. fejezet:** a tűzoltónapló szerint a bejelentés 23:10-kor jött, és a tűz két ponton (iroda, csónakraktár) égett. A Fenyőházi Hírek 2001. július 23-i cikkében Tóth Ervin klubelnök 23:40-et mond. Ő hazudott az időről.
- **3. fejezet:** Tóth 23:00 és 23:30 között a fesztiválsátorban feketén intézte a pénzt az üzemeltetőkkel. Pásztor László 22:45-kor összeveszett Kerekes Pállal a ki nem fizetett bére miatt, aztán hazament; Pál szerint „valami nem stimmel a könyvekkel”. Mészáros Béla azt állította, végig a színpadnál volt, de a 23:05-ös fesztiválfotón a piros Opelje (GBM-418) a klubnál áll. Szembesítve bevallja: titkos kulcsa volt, és látta, hogy valaki az irodában a könyvelési dossziékat pakolja; húsz perccel később égett a klub. Az arcot nem látta.

## Kidolgozott részletek (4–6. fejezet)

- **4. fejezet:** Kerekes Pál minden hónap végén lefénymásolta a kasszakönyvet és hazavitte; a 2001. júniusi másolatot Réka küldi el. A június 27-i sorban („Fesztivál-előleg az üzemeltetőktől”, +450 000 Ft) az egyenleg csak 150 000 Ft-tal nő: 300 000 Ft hiányzik, a sort V. I. szignálta. Ilona jelszava `bodri2004` (kutyája, Bodri, és a patika nyitásának éve, a Fenyőházi Szomszédok oldalon). A patika kiadási naplója szerint Gedeon 2026. szeptember 13-án a felírt 5 mg helyett 10 mg-os vérnyomáscsökkentőt kapott, kiadta V. I.; másnap szédült, leesett a lépcsőn.
- **5. fejezet:** az ismeretlen üzenő Kerekes Réka. Azt mondja, a tűz idején táborban volt Balatonfüreden, a levelében viszont azt írja, ő vitte le aznap este a vacsorát az apjának. Szembesítve bevallja: 14 évesen fél tizenegy után a klubnál járt, a bejárat előtt Ilona zöld Škodája (HKZ-907) állt, az apja azt mondta, még dolga van a könyvelővel. Gedeon a halála előtti este hangüzenetet hagyott Rékának; a háttérben morzéval kopogta: PATIKA.
- **6. fejezet:** a vád öt kérdése: a tettes (Vidor Ilona), miért nem baleset (két tűzfészek), az indíték (a hamis sor), a szemtanú a dossziékhoz (Mészáros), Gedeon halála (a dupla erősségű tabletta). Utóhang: Réka a bizonyítékokkal bemegy a rendőrségre, Ilonát egy héttel később őrizetbe veszik, a patika bezár.

## Kidolgozott részletek (mellékügyek)

A mellékügyek önállóak, saját mentésük van, és a kezdőképernyő „Ügyek” gombjával bármikor választhatók.

- **Az eltűnt kisbusz:** 2026. október 19-én, hétfőn reggel eltűnik a Fenyőházi Általános Iskola kisbusza (fehér Ford Transit, PLK-215) a zárt garázsból. Kulcsa Kántor Imre gondnoknak, Varga Sándor sofőrnek (kórházban) és Bakos Tamás helyettes sofőrnek van. A menetlevél szerint pénteken 48 213 km-rel adták le, a tankolókártya-értesítő szerint vasárnap 2:41-kor Kővágón 48 294 km-nél tankoltak: 81 km. A lakodalmi fotó és a Szomszédok-bejegyzés alapján az útvonal iskola – Nádas – Rózsa Csárda – Nádas – Kővágó (20 + 18 + 18 + 25 km). Bakos („Tomi”) 40 000 Ft-ért lakodalmi fuvart vállalt, hazafelé a Bükkösi elágazás után tönkrement a kuplung, a buszt a Ködös-major pajtájába gurította. A Tó Taxi 3:40-kor vette fel az elágazásnál, az erdész keréknyomot látott a major felé. Feljelentés nincs, Bakos kifizeti a javítást és leadja a kulcsot.
- **A hamis aukció:** 2026. október 30-án, pénteken Juhász Margit (szomszéd, Petra unokája ajánlotta a játékost) a bolhapiac.hu-n egy „1890 körüli bécsi ingaórát” venne 85 000 Ft-ért; „Kovács Erika” 30 000 Ft előleget kér aznap 18 óráig. A Képkereső szerint az óra képe a Vértes Aukciósház 2019-es katalógusából való (112. tétel, elkelt), a profilkép ingyenes stockfotó, amelyet egy tavasszal letiltott hirdető („Szabó Anna”) is használt. Ellentmondás: a profil szerint „Fenyőházán élek születésem óta”, a hirdetés szerint „külföldön dolgozom”, ezért nincs személyes átvétel. Margit nem utal, a hirdetést jelentik; a csaló ismeretlen, fél év alatt négy néven próbálkozott.
