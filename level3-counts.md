# Level 3 word list: counts and verification

Total entries: 135 (all lv:3, all in `level3.js` as `var LEVEL3 = [ ... ];`).
Fields covered: 12. Archaic entries: 16 (all with field "Archaic" and archaic:true).

## Counts per field

| Field | Count | Words |
|---|---|---|
| Law | 13 | Nießbrauch, Willenserklärung, Verjährung, Rechtskraft, Anfechtung, Rechtsbehelf, Dienstbarkeit, Auflassung, Zession, Hypothek, Abtretung, Verfassungsbeschwerde, Vollstreckung |
| Medicine | 8 | Anamnese, Ätiologie, Pathogenese, Letalität, Prävalenz, Pharmakologie, Toxikologie, nosokomial |
| Engineering | 8 | Drehmoment, Resonanz, Wirkungsgrad, Getriebe, Elastizität, Steifigkeit, Härte, Ermüdung |
| Natural sciences | 9 | Osmose, Entropie, Isotop, Katalysator, Chromosom, Genotyp, Phänotyp, Taxonomie, Supraleitung |
| Philosophy | 14 | Dasein, Weltanschauung, Aufhebung, Ontologie, Phänomenologie, Hermeneutik, Solipsismus, Dialektik, Transzendenz, Erkenntnistheorie, Metaphysik, Nihilismus, Existenzialismus, Vernunft |
| Psychology | 12 | Verdrängung, Fehlleistung, Projektion, Dissoziation, Narzissmus, Archetyp, Konditionierung, Kognition, Trieb, Libido, Resilienz, Komplex |
| Economics | 15 | Mittelstand, Mitbestimmung, Schuldenbremse, Konjunktur, Bruttoinlandsprodukt, Zahlungsbilanz, Inflation, Rezession, Leitzins, Wechselkurs, Handelsbilanz, Gewerkschaft, Betriebsrat, Streik, Tarifvertrag |
| Trades and crafts | 10 | Fachwerk, Zunft, Schraubstock, Hobel, Lehrling, Geselle, Werkstück, Schmiede, Zimmermann, Tischler |
| Academia | 13 | Habilitation, Lehrstuhl, Dissertation, Immatrikulation, Exmatrikulation, Promotion, Fakultät, Dekan, Rektor, Vorlesung, Seminar, Staatsexamen, Doktorvater |
| Bureaucracy and administration | 10 | Verwaltungsakt, Dienstweg, Meldepflicht, Verhältnismäßigkeit, Widerspruch, Bußgeld, Ordnungswidrigkeit, Verwaltungsgericht, Zuständigkeit, Besoldung |
| Music and arts | 7 | Leitmotiv, Bildungsroman, Kontrapunkt, Libretto, Expressionismus, Jugendstil, Atonalität |
| Archaic | 16 | Minne, Buhle, Hagestolz, Oheim, Muhme, Gevatter, Mamsell, Gesinde, Kemenate, hold, wacker, Knecht, Lehen, Gaukler, Vetter, Kerker |

## Verification method

1. Every candidate was fetched from the German Wiktionary via the MediaWiki action API (`action=query&prop=extracts&explaintext=1`), which returns the article's definitions, IPA, plural forms and example sentences. The Wiktionary REST definition endpoint (`/api/rest_v1/page/definition/`) returns 501 for de.wiktionary.org, so it was not usable.
2. Word, definition, field tag, IPA and plural were taken from the Wiktionary article. The English gloss (`en`) and the English example translation (`exEn`) are my own translations of the verified German definition and example.
3. Six entries have no example sentence in Wiktionary. For those, the example comes from DWDS (`dwds.de/wb/<word>`, usage examples), and the `src` field points to the DWDS page with a note in the entry: Ermüdung, Fehlleistung, Hagestolz, Mamsell, Kemenate, Doktorvater. All other entries cite their Wiktionary article URL.
4. `archaic:true` was set only where the Wiktionary article labels a sense `veraltet`, `veraltend` or `veraltend, historisch`. See the notes in the entries for which sense carries the label.
5. Duplicates were checked against `index.html` (364 existing words): zero overlaps.
6. All 135 `src` URLs were checked with curl on 2026-11-21: all return HTTP 200.
7. `node --check level3.js` passes; the file parses and loads as valid JavaScript. Every entry has w/en/ex/exEn/lv/field/archaic/src; nouns carry a/pos/pl; adjectives carry pos only, no article or plural. No em dashes anywhere in the file.

## Notable candidates dropped and why

- Missing from German Wiktionary entirely (no article): Pfandrecht, Vormerkung, Pharmakokinetik, Biegefestigkeit, Zugfestigkeit, Biegemoment, Querkraft, Vorhandenheit, Zuhandenheit, Gegenübertragung, Individuation, Ordnungspolitik, Zwölftontechnik, Sicherungseigentum, Zurückbehaltungsrecht, Pharmakodynamik, Bruchfestigkeit, Scherfestigkeit, Torsionsmoment, Längskraft, Schnittkraft, Zuhandensein, Anima, Persona, Wettbewerbspolitik, Dodekaphonie, Serialismus, Bestandskraft, Wertschöpfung, Fiskalpolitik, Handwerksrolle, Lehrbeauftragter, Introversion, Minnedienst.
- Verified in Wiktionary but dropped for lack of any usable example sentence in Wiktionary or DWDS: Tatbestand, Komorbidität, Kontraindikation, Rezidiv, Noxe, Remission (its only Wiktionary example belongs to the non-medical sense), Schubspannung, Dämpfung, Passung, Halbwertszeit, Tektonik, Photosynthese, Intentionalität, Über-Ich, Sublimierung, Abwehrmechanismus, Kurzarbeit, Stagflation, Geldpolitik, Tarifautonomie, Wettbewerbsfähigkeit, Meisterbrief, Gesellenstück, Gesellenbrief, Handwerkskammer, Drechselbank, Rohling, Privatdozent, Referendariat, Kolloquium, Emeritierung, Ordinarius, Ermessensspielraum, Aktenzeichen, Gesamtkunstwerk, Sprechgesang, Kapellmeister, Vergangenheitsbewältigung, Rezitativ, Grundschuld, Druckfestigkeit, Vorhandensein, Wirtschaftsordnung, Utilitarismus, Extraversion, Ödipuskomplex, Protektionismus, Amboss, Dirne, Metze, Leibeigener, Spielmann, Schultheiß, Büttel, Alchemist, Mundschenk, Truchsess, Lehnsherr, Buhlschaft.
- Dropped after label check (no `veraltet`/`veraltend` label on any sense, so they do not qualify as archaic and fit no other field): Junker, Fron, Page, Schöffe, Ablass, Knappe, Zehnt, Vasall, Herold, Scharfrichter, Fehde, Sühne, Buße, Wallfahrt, Magd, Ahn, Tändelei, Frevel, Demut, Hoffart, Minnesang, Sippe, schnöde, Innung (also no example), Walz (its only examples are surname uses, not the journeyman sense).
- `Base` (kinship sense) was dropped: the Wiktionary article fetched is the chemistry sense only; the kinship entry could not be verified with an example.
- `Schatten` (Jungian sense) was dropped: the Wiktionary senses listed do not include the Jungian archetype sense.

## Notes

- `nosokomial` is an adjective and is correctly lowercased as the headword.
- The `nosokomial` example quotes the Wiktionary text as printed, including its spelling of the CDC name; the entry note flags this.
- Field counts are uneven by design: quality and verifiability beat an even spread. Music and arts (7) and Medicine (8) are the thinnest fields; both are easy to extend later from the dropped list once examples are sourced (e.g. Sprechgesang, Gesamtkunstwerk, Kapellmeister via Duden examples).
