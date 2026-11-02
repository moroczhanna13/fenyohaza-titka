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
- [ ] Oldal: Fenyőházi Hírek archívum (keresés dátumra)
- [ ] Következtetések app: két állítás összekötése
- [ ] Fejtörő: ki hazudott az időről (összekötés)
- [ ] Idővonal-fejtörő: négy vallomás időrendbe húzása
- [ ] Oldal: jármű-nyilvántartó (régi rendszám alapján keresés)
- [ ] Kikérdezések: a gyanúsítottak beszélgetései (Tóth Ervin, Pásztor László, Mészáros Béla)

## 4. A 4-6. fejezet

- [ ] Kassza-táblázat fejtörő (hibás sor megjelölése)
- [ ] Oldal: a patika belső felülete, jelszó-találgatás
- [ ] Morze-hangüzenet generálása Web Audio API-val
- [ ] Réka beszélgetései és a két történet közti ellentmondás
- [ ] A vád: kérdéssor, hibás válasznál vissza a megfelelő fejezetbe
- [ ] Befejezés-képernyő

## 5. Mellékügyek

- [ ] Mellékügy-választó képernyő
- [ ] Az eltűnt kisbusz (menetrend, térkép, útvonal)
- [ ] A hamis aukció (képek visszakeresése, ellentmondások)

## 6. Kiadás

- [ ] Tesztelés ismerősökkel, a visszajelzések összegyűjtése
- [ ] Teljesítmény és hozzáférhetőség ellenőrzése
- [ ] GitHub Pages vagy Netlify telepítés
- [ ] Rövid bemutató oldal vagy README képernyőképekkel

## Ötletek később

- Angol nyelvű változat
- Több mellékügy (A szellemvonat)
- Statisztika a játék végén
