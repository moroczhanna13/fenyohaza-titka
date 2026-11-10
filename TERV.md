# Terv és feladatlista

Szabály: egyszerre egy feladat, a végén `npm run build` fusson hibátlanul, utána pipáld ki.

## 0. Alap

- [x] Vite + React + TypeScript projekt létrehozása, `npm run dev` működik
- [x] Vitest beállítása, egy példa teszt lefut
- [x] Mappaszerkezet létrehozása a `CLAUDE.md` szerint
- [x] Alap stílus: színek (sötétkék, borostyánsárga), betűtípus, CSS változók
- [x] README rövid leírással

## 1. Prototípus (cél: kiderüljön, működik-e a forma)

- [x] Telefon-keret komponens (mobilon teljes képernyő, nagy kijelzőn középen)
- [x] Kezdőképernyő appikonokkal (Üzenetek, Galéria aktív, a többi még szürke)
- [x] Játékállás: reducer + automatikus mentés localStorage-ba + "Új játék" gomb
- [x] Adatformátum a fejezetekhez (típusok TypeScriptben): üzenet, bizonyíték, fejtörő, tipp
- [x] Üzenetek app: beszélgetéslista, csevegés, válaszlehetőségek, értesítéshang
- [x] Galéria app: képrács, nagyítás, infó-lap (hely, dátum)
- [x] Szöveges fejtörő-komponens (beírt válasz, hash-ellenőrzés, normalizálás)
- [x] Tipp-rendszer: 3 szint, a megnyitott tippek mentődnek
- [x] 1. fejtörő: rovásírásos szó a telefon jelszavához (rovásírás-ábécé a dobozban)
- [x] 2. fejtörő: galériafotó infó-lapjáról a klubház helye
- [x] Prototípus végigjátszása, hibák javítása

## 2. Az 1. fejezet befejezése

- [x] Jegyzetfüzet app: a megtalált bizonyítékok automatikusan bekerülnek, a játékos is írhat
- [x] E-mail app
- [x] Hangok: rádiózaj a háttérben, üzenet- és sikerhang, hangerő-kapcsoló
- [x] A fejezet vége: átvezetés a 2. fejezetre
- [x] Teszt: a fejezet automatikusan végigjátszható a megoldásokkal

## 3. A 2-3. fejezet

- [x] Böngésző app: címsor, a játékon belüli hamis oldalak betöltése
- [x] Oldal: Fenyőházi Hírek archívum (keresés dátumra)
- [x] Következtetések app: két állítás összekötése
- [x] Fejtörő: ki hazudott az időről (összekötés)
- [x] Idővonal-fejtörő: négy vallomás időrendbe húzása
- [x] Oldal: jármű-nyilvántartó (régi rendszám alapján keresés)
- [x] Kikérdezések: a gyanúsítottak beszélgetései (Tóth Ervin, Pásztor László, Mészáros Béla)

## 4. A 4-6. fejezet

- [x] Kassza-táblázat fejtörő (hibás sor megjelölése)
- [x] Oldal: a patika belső felülete, jelszó-találgatás
- [x] Morze-hangüzenet generálása Web Audio API-val
- [x] Réka beszélgetései és a két történet közti ellentmondás
- [x] A vád: kérdéssor, hibás válasznál vissza a megfelelő fejezetbe
- [x] Befejezés-képernyő

## 5. Mellékügyek

- [x] Mellékügy-választó képernyő
- [x] Az eltűnt kisbusz (menetrend, térkép, útvonal)
- [x] A hamis aukció (képek visszakeresése, ellentmondások)

## 6. Kiadás

- [ ] Tesztelés ismerősökkel, a visszajelzések összegyűjtése
- [x] Teljesítmény és hozzáférhetőség ellenőrzése
- [x] GitHub Pages vagy Netlify telepítés
- [ ] Rövid bemutató oldal vagy README képernyőképekkel

## 7. Javítások a visszajelzések alapján

Részletek és indoklás: `JAVITASOK.md`. A történet a frissített `TORTENET.md`-t követi.

- [x] Döntések jóváhagyása, `TORTENET.md` frissítése
- [x] Motor: `match` fejtörő-típus (párosítás)
- [x] Motor: hivatkozás-blokk, közösségi oldal (`social`) és Szomszédok-kezdőlap kereséssel
- [x] Motor: patika-belépés felhasználóválasztóval és elfelejtett jelszóval
- [ ] Motor: e-mail mappák (beérkezett, elküldött, spam)
- [ ] Motor: Gedeon jegyzetei a Jegyzetfüzetben
- [ ] Névjegyek app szereplőkkel és kiderített tényekkel
- [ ] Fotónézegető nagyítás
- [ ] 1. fejezet: új cédula, névtelen számok, háttérlevelek, gyógyszeres fotó
- [ ] 2. fejezet: Réka csak anyagot ad, új archívumcikkek (szám, gyászjelentés)
- [ ] 3. fejezet: számok párosítása, kétkörös kihallgatások, Szomszédok-oldalak, Mészáros új indoka
- [ ] 4. fejezet: margójegyzet, gyógyszer-ellentmondás, patika nyilvános oldal és új belépés, Réka leleplezése
- [ ] 5–6. fejezet: Réka új háttere, feljelentés-keret, új utóhang
- [ ] Kisbusz-mellékügy Szomszédok-oldala az új közösségi oldaltípusra
- [ ] Mentésverzió emelése, tesztek, teljes végigjátszás és idővonal-ellenőrzés
- [ ] Képek: raszteres, fotószerű galériaképek (a 2001-es fesztiválfotó elsőként)

## Ötletek később

- Angol nyelvű változat
- Több mellékügy (A szellemvonat)
- Statisztika a játék végén
