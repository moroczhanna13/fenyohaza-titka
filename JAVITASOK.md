# Javítási terv – visszajelzések alapján

Ez a terv a végigjátszás után összegyűjtött kifogásokra ad megoldást. Több pont a történetet is módosítja, ezért a `CLAUDE.md` szabálya szerint **először a „Döntések” részt kell jóváhagyni**, utána frissül a `TORTENET.md`, és csak ezután indul a kódolás. A végén a feladatlista átkerül a `TERV.md`-be.

## Közös alapelvek

A kifogások nagy része ugyanabból a három gyökérokból jön, ezért ezeket minden módosításnál érvényesíteni kell:

1. **A játékos nyomoz, nem a szereplők.** Most Réka mondja meg, mit nézzünk meg, hol, és sokszor azt is, mi a megoldás. Helyette a következő lépést a játékos maga találja meg: Gedeon hiányos jegyzeteiből, a talált dokumentumokból és az ellentmondásokból. Ha elakad, ott a 3 szintű tipp – a szereplőknek nem kell súgniuk.
2. **Senki nem beszél ingyen.** Egy gyanúsított csak akkor mond el valamit, ha (a) a játékos olyan bizonyítékot mutat fel, amit már nem tud letagadni, és (b) neki magának is érdeke megszólalni. Mindegyikük csak annyit mond, amennyi a saját bőrét menti.
3. **Réka tanú, nem narrátor.** Kevesebbet tud, mint most, és a saját hazugságát védi. A játékos nem azért kell, mert Réka lusta, hanem mert Réka egyedül nem tudja összerakni az ügyet.

---

## Döntések (jóváhagyásra vár)

Ezek a pontok megváltoztatják a `TORTENET.md`-ben rögzített cselekményt. Mindegyiknél van egy javasolt változat; ha valamelyik nem tetszik, előbb ezt kell tisztázni.

| # | Kérdés | Javaslat |
| --- | --- | --- |
| D1 | Mi álljon a cédulán? | Gedeon munkajegyzete a **régi** ügyről, nem a saját haláláról (lásd 1. pont). |
| D2 | Mi Ilona indítéka? | Évek óta tartó sikkasztás (több millió Ft), ebből indult a patika; Pál halála nem volt eltervezve (lásd 9. pont). |
| D3 | Mit keresett Mészáros a klubnál, és miért nem ment be? | Részegen, titokban ment be iszogatni a saját kulcsával; azt hitte, a könyvelő vagy Pál rendezkedik, és nem akarta, hogy meglássák (lásd 8. pont). |
| D4 | Réka háttere | Nem tud mindent; tavaly találta meg a másolatokat; a tábor nem kitalált hazugság, hanem a „hivatalos” változat (lásd 12. pont). |
| D5 | Ki leplezi le Rékát? | A játékos jön rá egy fejtörővel, nem Réka fedi fel magát (lásd 7. és 12. pont). |
| D6 | Ki megy a rendőrségre? | A játékos írja meg a feljelentést, Réka tanúvallomást tesz mellé (lásd 12. pont). |
| D7 | Honnan legyenek az új képek? | Fotószerű raszterképek (WebP); forrás: szabad felhasználású fotók átszerkesztve **vagy** képgenerátor, a szövegeket (rendszám, dátumbélyegző) utólag ráillesztve (lásd 6. pont). |

---

## 1. A cédula túl egyértelmű

**Probléma.** „Ha ezt olvasod, nem baleset volt.” – Gedeon nem tudhatta, hogy meg fog halni, és a mondat elveszi a felfedezés örömét.

**Javaslat.** A cédula Gedeon saját munkajegyzete a 2001-es ügyről, amit a dobozban tartott. Például:

> *„VII. 21. – NEM zárlat. Két tűz. Ki hazudik?”*

A hátoldalán marad a rovásírásos KEREKES (a telefon jelszava). Így:

- a cédula a **régi** halálról szól, a játékos mégis gyanút fog, mert Gedeon „baleset” halála ugyanabba a mintába illik;
- a gyanút Gedeon utolsó üzenete erősíti meg („Ha velem történne valami, ott keressék”) – ez már most is benne van, és hihető, mert Gedeon félt, nem jósolt;
- a 2. fejezet két tűzfészke a cédulára is visszautal („Két tűz” – most már érted).

**Érintett helyek.** `chapter1.ts` (box, a bevezető szövege, az ismeretlen szám válaszlehetősége, ami a cédulát idézi), `chapter6.ts` (utóhang: a kerítésen lévő cédula szövege), `TORTENET.md`.

---

## 2. Életszerűbb e-mail fiók

**Probléma.** Csak a játékhoz szükséges levelek vannak, ezért a postafiók mesterséges.

**Javaslat.** Fejezetenként 3–5 „háttérlevél”, amelyek Gedeon hétköznapjait mutatják. Néhány közülük észrevétlenül hasznos, a többi csak hangulat:

| Levél | Feladó | Szerep |
| --- | --- | --- |
| Havi rejtvényújság, beküldési határidő | Fejtörő Klub hírlevél | hangulat: Gedeon rejtvényfejtő |
| Kulcsnyers-rendelés visszaigazolása | zárszerelő nagyker | hangulat: zárszerelő múlt |
| Közüzemi számla, csomagértesítő, banki értesítő | szolgáltatók | hangulat |
| „Nyert egy robotporszívót!” | spam | hangulat, kis humor |
| Háziorvosi kontroll időpont + e-recept értesítő („…5 mg, napi 1x”) | Dr. … háziorvos | **nyom**: a 4. fejezetben ebből derül ki, hogy 5 mg volt felírva (lásd 11. pont) |
| A Fenyőházi Vitorlásklub (újjáalakult) 25 éves emlékezés meghívója | klub | hangulat + a régi nevek felbukkannak |
| Gedeon elküldött levele a könyvtárnak a 2001-es évfolyam kölcsönzéséről | Gedeon (Elküldött mappa) | nyom: Gedeon már tavasszal a 2001-es lapokat kereste |

**Technikai teendő.** Az e-mail adatba kerülhet `folder: 'inbox' | 'sent' | 'spam'` és `read` jelző; az E-mail appban mappaválasztó. A háttérlevelek is a `src/story/` alá kerülnek, fejezetenként.

---

## 3. A 3. fejezetben „csak úgy” megjelenő beszélgetések

**Probléma.** A három gyanúsított beszélgetése a 3. fejezet elején egyszerre felbukkan, a játékosnak semmit nem kell tennie értük.

**Javaslat.** A három beszélgetés **már az 1. fejezettől** ott van az Üzenetekben, de csak telefonszámként (Gedeon nem mentette el a neveket), rövid, semmitmondó előzménnyel. A 3. fejezetben a játékosnak ki kell derítenie, melyik szám kié – ez egy új fejtörő:

| Szám gazdája | Hol található meg a szám |
| --- | --- |
| Tóth Ervin | a polgármesteri hírlevél aláírásában (2. pont: e-mail) |
| Pásztor László | a kocsmája oldalán a Szomszédokon (10. pont: új közösségi oldal) |
| Mészáros Béla | a Fenyőházi Hírek 2001-es fesztivál-előzetesében: „jelentkezni Mészáros Béla klubtitkárnál a … számon” – ugyanaz a mobilszám ma is |

A kiindulópont Gedeon jegyzete (nem Réka): *„Elnök – titkár – mindenes. Mindhárom számot felírtam, ki kié?”*

**Fejtörő.** „Kié a három szám?” – párosítás (szám ↔ név). Ha megvan, a beszélgetések átnevezve megnyílnak, és a névjegyek bekerülnek az új Névjegyek appba (5. pont).

**Technikai teendő.** Új fejtörő-típus `match` (két oszlop párosítása, a válasz a párok rendezett listájának hash-e), vagy három külön `text` fejtörő számonként. A beszélgetésnek kell egy `contactUntil` / `displayName` mező, ami feltételtől függően számot vagy nevet mutat.

---

## 4. Pásztor és Tóth túl hamar vall

**Probléma.** Egy idegennek olyasmit mondanak el, amit a rendőrségnek sem – minden ok nélkül, az első kérdésre.

**Javaslat.** Mindkét beszélgetés két részre bomlik: az első körben elzárkóznak, a másodikban egy felmutatott bizonyíték és a saját érdekük miatt szólalnak meg, de csak részben.

**Tóth Ervin**
- 1. kör: udvarias elutasítás, „lezárt ügy”.
- Zár: a 23:10 / 23:40 ellentmondás (2. fejezet) **és** az, hogy a játékos a Fenyőházi Híreknek is megírhatja. Tóth polgármester, jövőre választás – egy újságcikk jobban fáj neki, mint egy beismerés négyszemközt.
- 2. kör: annyit mond, hogy „a sátorban voltam, megbeszélésen, tanúk vannak”. A feketén fizetést **nem** mondja ki. Ezt a játékos maga rakja össze később a kasszakönyvben a „Fesztivál-előleg az üzemeltetőktől” sorból (4. fejezet), vagy Tóth csak célozgat rá („Kérdezze meg az üzemeltetőket, mennyit fizettek – és mennyi ment be a kasszába”).

**Pásztor László**
- 1. kör: „Hazamentem, mint mindenki.” Ez a rendőrségi változat.
- Zár: a játékos máshonnan tudja meg, hogy Pásztor aznap este veszekedett Pállal. Forrás: egy régi lakó hozzászólása Ilona vagy a fesztivál emlékposztja alatt a Szomszédokon („Emlékszem, a Laci aznap este üvöltözött Pállal a stégnél…”).
- 2. kör: szembesítve dühösen bevallja a veszekedést, mert nem akarja, hogy ő legyen a gyanúsított („Nem én voltam. És ha ezt terjeszti, magát is beperelem”). A bérét és Pál mondatát a könyvekről **kelletlenül**, védekezésként mondja el: „Pál maga mondta, hogy valaki lop. Miért gyújtottam volna fel, ha végre kiderült volna, hogy nem én?”

**Technikai teendő.** A beszélgetés-motorba kell a feltételes válaszlehetőség: `ChoiceOption.requires?: Condition` (pl. csak akkor választható „Látták magát Pállal veszekedni”, ha a bizonyíték megvan). A le nem választható lehetőség szürkén látszik, „Még nincs mire hivatkoznod” felirattal.

---

## 5. Szereplők áttekintése

**Probléma.** Nehéz követni, ki kicsoda és mit tudunk róla.

**Javaslat.** Új alkalmazás: **Névjegyek**. Telefonon ez természetes hely, és jól illik a 3. ponthoz (a számok azonosítása után itt jelennek meg a nevek).

Minden névjegyen:
- név, szerep **akkor** (2001) és **most** (2026);
- fotó helyett monogram;
- „Amit tudok róla” lista: a pontok automatikusan bekerülnek, amikor a hozzájuk tartozó bizonyíték megvan (pl. Mészáros: „23:05-kor az autója a klubnál állt”);
- hivatkozás a kapcsolódó beszélgetésre / bizonyítékra.

Szereplők: Berényi Gedeon, Kerekes Pál, Tóth Ervin, Pásztor László, Mészáros Béla, Vidor Ilona, az ismeretlen szám (Réka – a leleplezésig „Ismeretlen”), plusz Gedeon néhány hétköznapi névjegye (patika, háziorvos, könyvtár), hogy ne csak gyanúsítottak legyenek benne.

**Technikai teendő.** Új adat: `src/story/characters.ts` (`Character { id, name, roleThen, roleNow, facts: { text, knownWhen: Condition }[] }`), új app: `src/apps/contacts/`, ikon és bejegyzés a `registry.tsx`-be. A sztori-szöveg csak az adatban lehet.

---

## 6. Gyenge képek

**Probléma.** Az SVG-rajzok sematikusak; a 2001. 07. 21-i fesztiválfotón az elemek szétszórtan, egymáshoz nem illően állnak (a színpad, a klubház és az autó külön-külön kis szigetek, a rendszám apró), nem hiszi el az ember, hogy ez egy fénykép.

**Javaslat.** Az összes galériakép cseréje fotószerű raszterképre (WebP, kb. 1200 px széles, képenként 150–300 kB).

- **Forrás (D7):** szabad felhasználású fotók (pl. Unsplash, Pexels, Wikimedia Commons, a licencet a `public/images/LICENSES.md`-be kell írni) átszerkesztve, **vagy** képgenerátor. A generált képeken a szöveg megbízhatatlan, ezért a játékhoz fontos feliratokat (rendszám, dátumbélyegző, plakátszöveg) utólag kell rátenni.
- **A 2001-es fesztiválfotó** külön figyelmet kap: korhű, kissé szemcsés, vakus éjszakai fotó; a klubház és az autó a kép egyharmadában, egymás mellett; a rendszám nagyításkor olvasható; narancssárga dátumbélyegző a sarokban. Ha a 8. pont opcionális ötlete megvalósul, a kép szélén egy zöld autó orra is látszik.
- **Dokumentumok** (tűzoltónapló, kasszakönyv): beszkennelt papír hatású kép, kézírásos betűtípussal – vagy maradnak HTML-ben, de papírtextúrával.
- **Nagyítás:** a fotónézegetőben legyen nagyítás/húzás, hogy a rendszámot tényleg nagyítani kelljen.

**Technikai teendő.** A `photo.src` WebP-re mutat; `PhotoViewer` nagyítás (CSS `transform` + pointer események, új csomag nélkül). Az `alt` szövegek maradnak, a hozzáférhetőség miatt.

---

## 7. Réka túl szájbarágós

**Probléma.** Lépésről lépésre megmondja, mit kell nézni („Nézze meg, mikor riasztották… aztán nézze meg, mit írt az újság”), sokszor a választ is kimondja.

**Javaslat.**
- Réka csak **anyagot ad** (a tűzoltónapló fotóját, a kasszakönyv-másolatot), utasítást nem. „Gedeon ezt küldte, nem értettem, mit akart vele.”
- A következő lépés iránya **Gedeon jegyzeteiből** jön: a Jegyzetfüzetben fejezetenként megnyíló, töredékes oldalak az ő kézírásával (pl. „23:10 – és a Hírek?”, „M. B. – hátsó ajtó?”). Rövidek, kérdésként fogalmaznak, a választ nem adják meg.
- A megoldást **a játékos mondja ki** Rékának, nem fordítva (a mostani „Tóth Ervin. Akkor klubelnök, ma polgármester.” típusú üzeneteket a játékos küldi).
- Réka nem tud jelszót, belső oldalt, Ilona szokásait (lásd 11. pont).
- Réka hangja: tartózkodó, néha kitér, nem mindenre válaszol. Saját titka van (12. pont), ezért óvatos.

**Érintett helyek.** `chapter2.ts`, `chapter3.ts`, `chapter4.ts` ismeretlen-szám beszélgetései; Jegyzetfüzet: új „Gedeon jegyzetei” fül (`notes` adat a fejezetekben, `availableAfter` feltétellel).

---

## 8. Mészáros miért nem ment be?

**Probléma.** Volt kulcsa, látta, hogy valaki a dossziékat pakolja, és mégsem ment be – nem derül ki, miért. Továbbá nem tudjuk, mit keresett ott egyáltalán.

**Javaslat (D3).** Mészáros a tűzijáték után, ittasan, egy üveggel indult a klubba: évek óta titokban oda járt inni a saját, engedély nélkül csináltatott kulcsával. Az irodában villanyt és egy alakot látott, aki a polcról pakolt. Azt hitte, a könyvelő vagy Pál rendezkedik – az ő irodájuk volt, ebben nem volt semmi gyanús. Nem akarta, hogy lássák részegen és a kulccsal, ezért visszafordult. Csak a tűz után értette meg, mit látott, de akkor már nem vallhatta be, hogy ott volt.

**Opcionális bővítés (zárszerelő-szál).** A kulcsot 2001 júniusában Gedeon műhelyében másoltatta. Gedeon régi műhelynaplójában („M. B. – Vitorlásklub, hátsó ajtó, 1 db”) a játékos megtalálja ezt – így derül ki, miért gyanakodott Gedeon éppen Mészárosra. Ez Gedeon szakmáját is beköti a nyomozásba.

**Hibajavítás az idővonalban.** Mészáros most azt mondja: „Húsz perccel később már égett az egész.” A fotón 23:05-kor még ott áll az autója, a bejelentés viszont 23:10-kor volt – a húsz perc nem fér bele. Javítás: „Pár perccel később, amikor visszanéztem a sétányról, már füst jött a raktár felől.”

---

## 9. 300 000 Ft nem elég indok

**Probléma.** 300 000 Ft miatt két ember megölése és egy klubház felgyújtása nem hihető.

**Javaslat (D2).** Három változtatás együtt:

1. **Nagyobb, rendszeres sikkasztás.** A június 27-i sor csak a jéghegy csúcsa. Ilona három éven át lopott a kasszából (tagdíjak, hajóbérlés, pályázati támogatás); Pál becslése a margón: kb. 4–5 millió Ft – ez 2001-ben egy átlagkereset többéves összege. A pénzből indult 2004-ben a Fenyő Patika: Ilona egész mostani élete erre épül.
2. **Pál halála nem volt eltervezve.** Ilona a könyveket akarta eltüntetni, mert Pál a fesztivál utáni közgyűlésen „rendet akart tenni”. Nem tudta, hogy Pál a csónakraktárban van – vagy Pál rajtakapta, dulakodtak, és Ilona pánikban gyújtott. Ez egy megrémült ember elkapkodott tette, nem hidegvérű gyilkosság 300 ezerért.
3. **Gedeon halálának indoka más.** A sikkasztás mára elévült, Pál halála viszont **nem évül el**. Ilona 2026-ban nem a pénzt védte, hanem azt, hogy ne derüljön ki: ő felelős egy ember haláláért. Ez az első, pánikból elkövetett halálesetnél sokkal erősebb indok egy második, már tudatos tettre.

**Érintett helyek.** `chapter4.ts` (a kasszakönyv megjegyzése a margón, új bizonyíték: „Pál jegyzete: a hiány három év alatt kb. 4,5 millió”), opcionálisan egy második, könnyebb kasszalap egy másik hónapról; `chapter6.ts` (az indítékról szóló kérdés válaszai és a zárószöveg), `TORTENET.md`.

---

## 10. A szomszedok.hu bénán néz ki

**Probléma.** Sima szöveges lista, nem hasonlít közösségi oldalra.

**Javaslat.** Új oldaltípus: `social` (közösségi profil).

- fejléc: borítókép, kerek profilkép (monogram), név, rövid bemutatkozás, lakhely;
- bejegyzés-kártyák: dátum, szöveg, opcionális kép, kedvelések száma, hozzászólások (név + szöveg);
- több profil ugyanazon a „Fenyőházi Szomszédok” oldalon: Vidor Ilona, a Pásztor Söröző (nyitvatartás, **telefonszám** – 3. pont), egy fesztivál-emlékposzt a régi lakók hozzászólásaival (**Pásztor veszekedése** – 4. pont), és a kisbusz-mellékügy csoportja.

A kutyás poszthoz kép kerül (Bodri), a patika nyitásáról szóló poszthoz a patika fotója.

**Technikai teendő.** Új típus a `types.ts`-ben (`SocialPage`), új `SocialPageView.tsx` saját CSS modullal; a meglévő `ch4-social-ilona` és a kisbusz `szomszedok.hu/fenyohaza` oldala átáll rá.

---

## 11. A patika belső oldala

**Probléma.** A felhasználónév eleve be van írva, és nem derül ki, honnan tudja Réka (Gedeon), hogy Ilona jelszava hogyan készül.

**Javaslat.**
1. **Hogyan jut el oda a játékos (Réka nélkül)?** A 4. fejezet elején megérkezik Gedeon lakásából a maradék holmi; a dobozban egy gyógyszeres doboz: „… 10 mg”. Az e-recept értesítő (2. pont) szerint viszont 5 mg volt felírva. Ezt az ellentmondást a játékos veszi észre (új összekötős fejtörő vagy egy rövid szöveges kérdés). Utána a patika nyilvános oldalán (`fenyopatika.hu`) a lábléc alján ott a „Munkatársi belépés” link.
2. **A belépés:**
   - először felhasználóválasztó lista: Kovács Zsófia, Vidor Ilona, Németh Péter (gyakornok) – nevekkel, monogrammal;
   - Ilonára kattintva jelszót kér;
   - „Elfelejtett jelszó?” → „Jelszó-emlékeztető (a felhasználó adta meg): **kutya + fontos évszám**”;
   - a jelszót a Szomszédok profilból rakja össze a játékos (`bodri2004`).
3. Más felhasználókra kattintva rövid, hiteles hibaüzenet („Hibás jelszó”), ezek zsákutcák.
4. Réka ch4-es üzenetei közül a jelszóról és a belső oldalról szóló részek törlődnek.

**Technikai teendő.** A `LoginPage` típus kap egy `users: { name, initials, puzzle?: PuzzleId, passwordHint?: string }[]` listát a fix `username` helyett; `LoginPageView` két lépésben (választás → jelszó + elfelejtett jelszó). A tippeket is át kell írni (az első tipp most azt mondja, hogy a felhasználónév ki van töltve).

---

## 12. Réka szerepe nem hihető

**Probléma.** Ha Réka mindent tud, minek kell a játékos? Miért várt 25 évet? Miért bízik meg hirtelen Gedeon unokaöccsében, és miért csak napok múlva fedi fel magát? A végén ő megy a rendőrségre, a vádat mégis a játékosnak kell tudnia.

**Javaslat (D4–D6).**

**Mit tud Réka, és mit nem.**
- Tudja: aznap este a klubnál járt, és Ilona autója ott állt. 14 évesen ebben semmi gyanúsat nem látott – a könyvelő az apjával dolgozott, ez természetes volt.
- Megvannak neki az apja kasszakönyv-másolatai, de nem ért a könyveléshez, nem tudja, mi van bennük.
- **Nem** tudja: Tóth hazugságát, Mészáros kulcsát, Pásztor veszekedését, a hamis sort, a patikai naplót. Ezeket Gedeon kezdte kideríteni, és a játékos fejezi be.

**Miért most, és miért nem 25 éve?**
- Tavaly halt meg az anyja; a ház kiürítésekor találta meg a padláson a másolatokat. Ekkor kezdett gyanakodni, és ekkor írt Gedeonnak, akiről tudta, hogy a régi ügyeket bújja.
- A tábor-történet nem Réka kitalációja: hivatalosan valóban táborban volt, de aznap titokban hazaszökött, hogy meglepje az apját. Soha nem merte bevallani – először a büntetéstől félt, később attól, hogy ha nem megy el, az apja talán ma is élne. Ez a 25 éves hallgatás oka, és ez a hazugság marad az 5. fejezet ellentmondás-fejtörőjének alapja.

**Miért bízik meg a játékosban – és miért csak lassan?**
- Nem bízik meg benne hirtelen. Azért ír a telefonra, mert Gedeon nem válaszol, és nála vannak a nyomozás anyagai (fotók, a tűzoltónapló, a beszélgetések). A telefonnal Gedeon munkája is a játékosra szállt.
- Fejezetről fejezetre teszteli: csak akkor ad újabb anyagot, ha a játékos maga is talált valamit, amit ő nem tudott.
- **Nem Réka fedi fel magát (D5).** A 4. fejezet végén a játékos rájön, ki ő: Pál gyászjelentése a Hírek archívumában („Gyászolja felesége és lánya, Réka (14)”), a másolatok, amelyek csak a családnál lehettek, és egy elszólás („apa mindig…”) együtt kiadják. Új fejtörő: „Ki az ismeretlen üzenő?” – a válasz Kerekes Réka. Réka csak ekkor, lelepleződve áll elő.

**Ki megy a rendőrségre? (D6)**
- A 6. fejezet nem „mondd el nekem, mielőtt bemegyek”, hanem a játékos megírja a **feljelentést** a megyei rendőr-főkapitányságnak: a vád öt kérdése a feljelentés öt bekezdése (tettes, miért nem baleset, indíték, szemtanú, Gedeon halála).
- Réka **tanúvallomást** tesz mellé: végre elmondja, hogy aznap este ott volt.
- Utóhang: együtt mennek be; a játékos viszi Gedeon telefonját és a dobozt, Réka az apja másolatait.
- A zárómondatok: „Gedeon volt az első, aki elhitte. Maga a második” – marad, de a „magának hagyta a cédulát, nem nekem” sor törlődik.

---

## Feladatlista (sorrendben)

Minden feladat végén `npm run build` és `npm test`, utána kipipálás, commit.

### A. Előkészítés
- [ ] A „Döntések” (D1–D7) jóváhagyása
- [ ] `TORTENET.md` frissítése a jóváhagyott változattal (indíték, Réka, Mészáros, cédula, befejezés)
- [ ] A feladatlista átvezetése a `TERV.md`-be (új szakasz: „7. Javítások”)

### B. Motor és új komponensek (sztoritól független)
- [ ] Feltételes válaszlehetőség a beszélgetésekben (`ChoiceOption.requires`)
- [ ] Beszélgetés megjelenítendő neve feltételtől függően (szám → név)
- [ ] `match` fejtörő-típus (párosítás)
- [ ] `social` oldaltípus + `SocialPageView`
- [ ] Patika-belépés: felhasználóválasztó, jelszó, elfelejtett jelszó
- [ ] E-mail mappák (beérkezett, elküldött, spam)
- [ ] Névjegyek app + `characters.ts` adat
- [ ] Jegyzetfüzet: „Gedeon jegyzetei” fül
- [ ] Fotónézegető nagyítás

### C. Történet-módosítások fejezetenként
- [ ] 1. fejezet: új cédula, a három szám már látható névtelenül, háttérlevelek
- [ ] 2. fejezet: Réka csak anyagot ad, Gedeon jegyzete vezet a Hírekhez, a megoldást a játékos mondja ki
- [ ] 3. fejezet: „Kié a három szám?” fejtörő; Tóth és Pásztor két körben, bizonyítékra vallanak; Mészáros új indoka és az idővonal-hiba javítása
- [ ] 4. fejezet: gyógyszeres doboz + e-recept ellentmondás, patika nyilvános oldal, új belépés; nagyobb sikkasztás (Pál margójegyzete); Réka leleplezése fejtörővel
- [ ] 5. fejezet: Réka új háttere (padlás, anyja halála, titkos hazaszökés a táborból)
- [ ] 6. fejezet: feljelentés-keret, Réka tanúvallomása, új indok a vád kérdéseiben, új utóhang
- [ ] Szomszédok oldalak átállítása `social` típusra (Ilona, Pásztor Söröző, fesztivál-emlékposzt, kisbusz-csoport)
- [ ] Tippek felülvizsgálata minden módosított fejtörőnél (pontosan 3, gyengétől erősig)
- [ ] `playthrough.test.ts` és `validate.test.ts` frissítése az új lépésekkel

### D. Képek
- [ ] Képforrás kiválasztása (D7), licencek a `public/images/LICENSES.md`-be
- [ ] A 2001-es fesztiválfotó újrakészítése (rendszám, dátumbélyegző, klubház egy képrészben)
- [ ] A többi galériakép és dokumentumkép cseréje
- [ ] Új képek: Bodri, a patika, gyógyszeres doboz, Szomszédok-borítóképek

### E. Ellenőrzés
- [ ] Teljes végigjátszás: minden lépéshez van-e nyom, ami nem egy szereplő utasításából jön
- [ ] Idővonal-ellenőrzés (22:30 Ilona „bezár” → Réka 22:30 után → 22:45 Pásztor → 23:05 fotó → 23:10 bejelentés → 23:21 tűzoltók)
- [ ] Mobil és asztali nézet, billentyűzetes kezelés az új felületeken
