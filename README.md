# Fenyőháza titka

Magyar nyelvű nyomozójáték, ami a böngészőben fut. A játékos megkapja elhunyt nagybátyja telefonját, és az üzenetekből, e-mailekből, fotókból és régi újságcikkekből fejt meg egy 25 éves ügyet: egy kisvárosi vitorlásklub leégését a Tavi Fesztivál éjszakáján.

A főszál fejezetekből áll, mellette rövid, önálló mellékügyek vannak. Nincs backend, a játékállás a böngészőben (`localStorage`) mentődik.

**Játszható itt:** https://moroczhanna13.github.io/fenyohaza-titka/

A `main` ágra pusholt minden változás automatikusan települ (GitHub Actions, `.github/workflows/deploy.yml`).

## Indítás

Node.js 20 vagy újabb kell.

```sh
npm install      # függőségek
npm run dev      # fejlesztői szerver
npm run build    # éles build a dist/ mappába
npm test         # tesztek (Vitest)
```

## Felépítés

- `src/app/` – telefon-keret, útvonalak, globális stílus
- `src/apps/` – a telefon appjai (Üzenetek, E-mail, Galéria, Böngésző, Jegyzetfüzet, Következtetések)
- `src/puzzles/` – újrahasznosítható fejtörő-komponensek
- `src/story/` – a fejezetek és mellékügyek tartalma adatként
- `src/state/` – játékállás és mentés
- `public/audio/` – hangeffektek

A történet háttere a [TORTENET.md](TORTENET.md)-ben, a fejlesztési terv a [TERV.md](TERV.md)-ben van.

## Technológia

React, Vite, TypeScript, CSS modulok, Vitest.
