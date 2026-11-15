# Svjetlost Graf — nezvanični demo

Samostalan Next.js/React/TypeScript koncept za digitalnu štampariju Svjetlost Graf u Dobrinji. Nije naručen niti odobren od vlasnika. Predloženi vizuelni identitet, ilustracije printera i korica su originalni demo materijal.

## Lokalno

`npm install`, `npm run typecheck`, `npm run build`, `npm run dev`.

Poslovni podaci i grupisanje usluga su u `business.ts`. Kontakt vodi isključivo na telefonski poziv. Interaktivni Google Maps embed i rezervni link pretražuju naziv i punu adresu, bez tvrdnje o preciznom pinu ili tačnom ulazu. Metadata sadrži `noindex, nofollow`, a `/robots.txt` zabranjuje indeksiranje.

## Završni QA

Kontaktne ploče u `qa/screenshots/` čuvaju početak, 25%, 50%, 75% i kraj ispisa na telefonu i desktopu. `node qa.cjs` snima pojedinačne kadrove u privremeni direktorij, a `node qa-interactions.cjs` provjerava širine, meni, replay, reduced-motion i URL-ove. Za lokalni browser QA potreban je Chrome na putanji navedenoj u skriptama.

GitHub–Vercel integracija je ranije vratila `repo_no_access`; produkcija je zato objavljena direktnim deploymentom. Novi GitHub commit se neće automatski objaviti bez ponovnog povezivanja repozitorija ili novog direktnog deploymenta. Vanjski Google Fonts ostaje zavisnost; lokalni fontovi nisu dodani jer preuzimanje iz ovog okruženja nije bilo dostupno. Automatizirani browser u ovom okruženju blokira učitavanje Google Maps iframea; rezervni Maps link ostaje dostupan.

## Izvori provjereni 15.11.2026.

- [Akta registar](https://www.akta.ba/registar/50693/svjetlost-graf-obrtnicka-djelatnost-sarajevo): naziv i adresa.
- [Najbolje.ba](https://najbolje.ba/sarajevo/usluzne-djelatnosti/fotokopirnice/svjetlost-graf/): adresa, telefon, štampa i uvez akademskih radova; stariji opis.
- [WorldPlaces](https://bosnia-and-herzegovina.worldplaces.me/review/98113680-svjetlost-graf-digitalna-stamparija.html): širi spisak usluga, uključujući graviranje; dostupnost nije aktuelno potvrđena. Profil nudi prijedlog službenog weba, bez potvrđenog vlastitog sajta.

## Prije službene upotrebe vlasnik treba potvrditi

- Tačan i aktuelan popis usluga, posebno graviranje, pečate i vrste uveza.
- Telefon, adresu, precizan Maps pin i radno vrijeme.
- Cijene, rokove, formate, vrste materijala i postupak zaprimanja dokumenata.
- Odobreni naziv, logo, fotografije, tekst, domen i saglasnost za objavu.

Ocjena i recenzije nisu korištene. Službeni cjenovnik i sati nisu prikazani. Podaci firme Svjetlost–BH Print nisu korišteni.
