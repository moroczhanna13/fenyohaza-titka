# Fenyőháza titka

Magyar nyelvű, böngészős nyomozójáték. A játékos egy telefon felületén (üzenetek, e-mail, galéria, böngésző, jegyzetfüzet, következtetések) fejt meg egy 25 éves ügyet. Főszál fejezetekkel, mellé rövid önálló mellékügyek. Inspiráció az *An Elmwood Trail*, de a történet, a helyszín és a fejtörők saját, magyar tartalmúak.

A részletes sztori és a fejtörők a `TORTENET.md`-ben vannak, a feladatlista a `TERV.md`-ben.

## Munkamód

- Dolgozz a `TERV.md` alapján. Minden munkamenet elején olvasd el, vedd a következő nem kipipált feladatot.
- Egyszerre egy feladatot csinálj. Ha kész, pipáld ki a `TERV.md`-ben (`- [x]`), és egy-két mondatban írd le, mi változott.
- Új függőséget (npm csomagot) csak akkor adj hozzá, ha előbb megkérdezted.
- Ha a `TORTENET.md` és a kérés ellentmond, kérdezz vissza, ne találj ki új cselekményt.
- Válaszolj magyarul.

## Technológia

- React + Vite + TypeScript, backend nincs, az egész játék a böngészőben fut.
- Stílus: sima CSS modulok (nincs UI-keretrendszer).
- Játékállás: `useReducer` + mentés `localStorage`-ba.
- Telepítés: GitHub Pages vagy Netlify.

## Parancsok

- `npm install` – függőségek
- `npm run dev` – fejlesztői szerver
- `npm run build` – éles build (minden feladat végén futtasd, hibamentesnek kell lennie)
- `npm test` – tesztek (Vitest)

## Mappaszerkezet

```
src/
  app/        telefon-keret, útvonalak
  apps/       Üzenetek, E-mail, Galéria, Böngésző, Jegyzetfüzet, Következtetések
  puzzles/    újrahasznosítható fejtörő-komponensek
  story/      fejezetek adatként (JSON/TS), mellékügyek
  state/      játékállás, mentés
public/
  audio/      hangeffektek
```

## Szabályok

- **A történet adat, nem kód.** Üzenetek, bizonyítékok, fejtörők és tippek a `src/story/` alatt vannak. Komponensbe soha ne írj bele sztori-szöveget.
- A felületen látható szöveg magyar. Az azonosítók, fájlnevek, kommentek angolok.
- A fejtörők válaszát SHA-256 hash-ként tároljuk (`crypto.subtle`), a beírt válasz előtte: kisbetűs, ékezetek nélkül, szóközök nélkül. Ez nem védelem, csak a véletlen spoilert akadályozza.
- Minden fejtörőhöz pontosan 3 tipp tartozik, gyengétől az erősebbig. Nincs hirdetés, nincs pontlevonás.
- Beszélgetésekben a játékos válaszlehetőségek közül választ. A válasz csak a hangulatot és a részleteket befolyásolja, a kulcsinformációt a játékos mindenképp megkapja.
- Mobil-első kialakítás: telefonon teljes képernyő, nagy kijelzőn a telefon középen.
- Hang: rövid, szabad felhasználású effektek. A morze hangüzenetet a böngészőben generáljuk (Web Audio API).
- Hozzáférhetőség: minden gomb billentyűzettel elérhető, a hangokhoz van szöveges megfelelő.
