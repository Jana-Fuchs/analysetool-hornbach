# HORNBACH Geschäftsmodell-Analyse

Statische Website für Teil A der DHBW-Aufgabe mit sieben Analysebausteinen. HTML, CSS und JavaScript ohne Framework, externe Dienste oder Build-Abhängigkeiten.

## Lokal öffnen

```sh
npm start
```

Anschließend `http://127.0.0.1:4173` in Chrome öffnen. Benötigt Node.js 22 oder neuer. Alternativ mit einem beliebigen statischen HTTP-Server bereitstellen. Wegen JavaScript-Modulen bitte nicht über `file://` öffnen.

## GitHub Pages

1. Diese Dateien in ein GitHub-Repository übernehmen und auf den Branch `main` pushen.
2. Im Repository **Settings → Pages → Build and deployment → Source: GitHub Actions** wählen.
3. Der Workflow `.github/workflows/pages.yml` prüft die Logik, stellt die Website zusammen und veröffentlicht sie. Bei Bedarf über **Actions → Publish GitHub Pages → Run workflow** starten.
4. Die veröffentlichte URL aus dem Workflow kann mit den Prüfenden geteilt werden. Auch Repository-Unterpfade werden unterstützt, da alle lokalen Links relativ sind.

Es wurde noch nichts veröffentlicht: Das lokale Git-Repository ist auf dem Branch `main` initialisiert. Es wurden noch keine Dateien gestagt und keine Commits erstellt; ein GitHub-Remote ist noch nicht eingerichtet. Alternativ funktioniert Pages mit **Deploy from a branch → main / (root)**; dann läuft die automatische Prüfung aus dem Actions-Workflow nicht als Voraussetzung dieses Deployments.

## Bedienung

- Navigation: neun Tabs, Direktlinks über `#steckbrief`, `#reifegrad`, `#muster`, `#kunden`, `#innovation`, `#plattform`, `#erloese`, `#ki`, `#massnahmen`.
- Die Einführungen erläutern Inhalt und Bedienung. Der Steckbrief beginnt direkt mit den Kennzahlen. Alle Inhaltsbereiche starten aufgeklappt und lassen sich bei Bedarf einzeln schließen.
- Die gemeinsame Kopfzeile zeigt den Tab-Titel sowie **Bearbeiten**, **Export** und das **•••**-Menü. **Bearbeiten** öffnet die Textfelder des aktuellen Bausteins. Zusätzlich gibt es eigene Arbeitsnotizen je Tab.
- **Reifegrad nach Appelfeller/Feldmann:** 22 Kriterien in Produkt (5), Kundenanbindung (12) und Geschäftsmodell (5), Stufen 1–4. Unbekannte Werte bleiben offen. Vier Netzdiagramme, Ist-Soll-Lücken, drei Wettbewerber, Quellen und sieben Leitfragen. Die zusätzliche Bewertung zu KI-Reife, Daten und Resilienz steht unter **KI-Strategie** und nutzt eine eigene Skala von 1–5.
- **Freie Zusatzperspektive:** Runde Punkte verändern Ist-Werte, Quadrate Zielwerte. Dimensionen an den sichtbaren Griffen per Ziehen umordnen. Diagramm, Platzhalter und Reihenfolge zeigen die Einfügeposition bereits während des Ziehens; gespeichert wird beim Loslassen. Ein Abbruch übernimmt die Vorschau nicht. Fokussierte Griffe lassen sich auch mit den Pfeiltasten bedienen. Alternativ unter **Dimensionen bearbeiten** Schieberegler und Pfeile verwenden. Namen ändern, Dimensionen hinzufügen oder entfernen (3–10 Dimensionen).
- **Bewertungen:** Wirkung, Aufwand und Risiko auf einer Skala von 1–5. Höhere Wirkung sowie geringerer Aufwand und geringeres Risiko erhöhen den Score. Gewichte werden auf ihre Summe normiert. Die Maßnahmen verwenden diese drei Kriterien. Das Ideen-Board hat eigene Gewichte für Nutzen, Machbarkeit, Kosten und Risiko.
- **Muster & Ideen:** Sechs vorbefüllte KI-Ideen; bis zu acht Ideen bearbeiten, ergänzen oder entfernen. Musterquelle, HORNBACH-Beleg, KI-Anwendung und Ähnlichkeits-/Konfrontationsprinzip dokumentieren. Vier Kriterien und separate Gewichte steuern Ranking, Opportunity Map und Top 2. Für jede Idee sind Risiko-Checks und Experimente bearbeitbar. Die Top 2 zeigen vier Dimensionen vorher/nachher, alle neun Canvas-Felder mit markierten Veränderungen und einen Empfehlungsentwurf. Entwürfe per Button als Maßnahmenkandidaten übernehmen oder aktualisieren.
- **Steckbrief:** Ergänzend Wer, Was, Wie, Wert und ein bearbeitbares Business Model Canvas.
- **Maßnahmen:** Auch aus Reifegradlücken ableiten; Herleitung, wissenschaftliche Quelle, erwartete Wirkung und Risiken dokumentieren. Maßnahmenkandidaten sind bearbeitbar und entfernbar; Zeiträume lassen sich im Bearbeitungsmodus ändern. Wirkung-Aufwand-Diagramm mit Risikomarkierung, Quick Wins zuerst innerhalb der Roadmap-Phasen.
- **Hybrides Erlösmodell:** Ist-Erlöse und ein Hybridkonzept nach dem Skript zu Termin 7. Regler vergleichen den kumulierten Cashflow für Warenverkauf, Servicevertrag und Hybridmodell. Ein Netzdiagramm vergleicht Ist, Hybridpilot und Soll.
- **KI-Strategie:** Sechs KI-Ideen werden nach vier gleich gewichteten Kriterien bewertet. Die drei besten Ideen erhalten jeweils eine Begründung, ein Pilotziel und einen Kontrollschritt.
- **Export:** komplette Analyse als JSON sichern. **••• → Analyse importieren** lädt eine Sicherung; ungültige Dateien werden abgewiesen.
- **••• → Aktuellen Tab drucken / PDF** nutzt die Druckansicht.
- Änderungen liegen ausschließlich im Arbeitsspeicher der aktuellen Seite. Neuladen stellt die recherchierte Ausgangsanalyse wieder her. Dauerhaft sichern und teilen lassen sich Änderungen per Export/Import; es gibt keine automatische Speicherung im Browser oder auf dem Server.

## Quellen und fachlicher Rahmen

Unter **Berichte & Quellen** stehen lokale PDFs, direkte Download-Buttons, Original-URLs und Geschäftsjahre bereit. `docs/QUELLEN.md` dokumentiert Downloads und Prüfsummen. Die zwei letzten vollständigen Geschäftsberichte bilden die Basis; der Halbjahresbericht aktualisiert den Stand. Kennzahlen der Holding und des Teilkonzerns Baumarkt werden getrennt bezeichnet, Halbjahreswerte nicht annualisiert.

Reifegrad, Scores, Kundenhürden, Zielmodell, Maßnahmen, Pilotziele und Erlöshypothesen sind Einschätzungen des fiktiven Inhouse-Beraterteams. Öffentliche Berichte ersetzen keine internen Daten oder Kundeninterviews. Dies ist ein Studienprojekt, keine offizielle HORNBACH-Veröffentlichung.

## Prüfung

```sh
npm run check
```

Prüft JavaScript-Syntax sowie Priorisierungslogik, Szenariorechnung und Importvalidierung mit Node.js. Die Browserprüfung ist in `docs/PRUEFUNG.md` dokumentiert.

## Gestaltung

Das vom Nutzer bereitgestellte Logo aus `logo.de-DE.v1.svg` liegt unverändert in `assets/hornbach-logo.svg`. Die Farbwerte stammen daraus: Orange `#f79e1c`, Magenta `#c80986`, Dunkel `#041116`. Buttons orientieren sich an der bereitgestellten Hornbach-Referenz. Es werden SVG-Icons statt Emojis verwendet. Der Fließtext ist auf Desktop 16 px, auf Mobilgeräten mindestens 15 px groß; Quellen und ergänzende Metadaten sind kleiner.

## Dateien

- `index.html`: statische Einstiegseite und Dialoge
- `assets/data.js`: recherchierte Ausgangsanalyse und Quellen
- `assets/analysis-data.js`: Kriterien und Kurzbeschreibungen, Methodik, Muster, Ideenentwürfe und Quellen für die ergänzende Analyse
- `assets/analysis-ui.js`: Kriterienbewertung, Diagramme, Ideen-Board, Top-2-Ausarbeitung und Übernahme von Maßnahmen
- `assets/core.js`: Berechnung und validierter Import
- `assets/app.js`: Navigation, Diagramm, Bearbeitung im Arbeitsspeicher, Export und Import
- `assets/styles.css`: Desktop-, Mobil- und Drucklayout
- `docs/`: Aufgabenstellung und heruntergeladene Originalberichte

## Erweiterte Methodik und bestehende Daten

Neue Installationen enthalten sechs Ideen. Bestehende schemaVersion-1-Analysen werden additiv ergänzt: Texte und bisherige Bewertungen bleiben erhalten, fehlende neue Felder erhalten Vorgaben; drei neue Vorschläge werden einmalig ergänzt (höchstens acht Ideen). Auch Exporte älterer Versionen bleiben importierbar. Die interne `analysisRevision` verhindert wiederholtes Ergänzen bewusst entfernter Ideen.

Stufenbeschreibungen sind sinngemäße Kurzfassungen der Vorlesungsmatrix. Öffentliche Angaben erlauben nicht bei allen Kriterien eine Einstufung. Insbesondere das Produktobjekt und interne KI-Fähigkeiten müssen fachlich konkretisiert und belegt werden; fehlende Belege werden nicht als niedrige Stufe oder als 0 interpretiert. Der Wettbewerbsvergleich verwendet drei gemeinsame Kriterien und kennzeichnet alle Einstufungen als vorläufige Außensicht. Das Tool enthält Prüfaufträge zu Datenschutz, KI-Regulierung, Datenzugang und Resilienz, keine pauschalen Rechtsfristen.


### Termin 4 und 5

Tab 4 enthält getrennte Ansichten für Customer Journey und Open Innovation. Die Journey bietet eine fiktive Persona, fünf Phasen mit Online-/Offline-Touchpoints, Ist-/Soll-Vergleich sowie editierbare Emotions- und Zufriedenheitsskalen. Open Innovation zeigt belegte Beispiele und Vorschläge getrennt, einen Typfilter, die Verteilung der belegten Beispiele und eine Arbeitsskala der Kundeneinbindung. Ein separates Wirkungsszenario kopiert die Reifegrad-Ausgangswerte, ohne Tab 2 zu verändern. Begründete Vorschläge lassen sich per Button nach Tab 7 übernehmen und dort priorisieren. Änderungen bleiben wie bisher flüchtig; Export/Import schließt die neuen Felder ein.

`assets/customer-analysis.js` und `assets/customer-analysis.css` kapseln den neuen Baustein. Alle CSS-Regeln sind auf `#panel-kunden` begrenzt. Die Ausgangsdaten der Tabs 1–3 bleiben unverändert. Methodik und genaue PDF-/Folienverweise sind in `docs/QUELLEN.md` dokumentiert.
