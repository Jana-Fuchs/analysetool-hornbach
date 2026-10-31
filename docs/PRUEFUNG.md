# Prüfprotokoll

Stand: 31.10.2026. Lokaler HTTP-Server, reale Prüfung in Google Chrome.

## Browserprüfung

- Alle sieben Tabs geöffnet, Inhalte und Navigation geprüft.
- Desktopansicht (1512 Pixel Breite) visuell geprüft; Screenshots in `preview/`.
- Mobile Ansicht mit 390 × 844 Pixeln geprüft: bei allen sieben Tabs entspricht die Dokumentbreite der Viewportbreite. Die Navigation und breite Bewertungsmatrizen scrollen innerhalb ihrer Container.
- Reifegrad: Ist-Punkt tatsächlich per Maus gezogen; Schieberegler und Mittelwert aktualisieren sich. Beschriftung per Maus gezogen; Reihenfolge der Dimensionen wird entsprechend geändert.
- Neue Dimension hinzugefügt, umbenannt, Seite neu geladen und persistierten Namen geprüft. Dimension entfernt und ursprüngliche Reihenfolge wiederhergestellt.
- Idee niedriger bewertet; Rangfolge passt sich an. Ausgangswert wiederhergestellt.
- Gewicht Wirkung geändert: Formel und Score reagieren unmittelbar und normieren die Gewichtssumme. Wieder auf 50/30/20 zurückgestellt.
- Erlösszenario: Ausgangsbeitrag 23.700 €; bei 0 % Abschlussquote beträgt der Beitrag −60.000 €. Ausgangsannahmen wiederhergestellt.
- Maßnahmenstatus „In Arbeit“ gewählt; zugehörige Roadmap-Karte übernimmt den Status. Ausgangsstatus wiederhergestellt.
- Steckbrieftext bearbeitet und sichtbare Übernahme geprüft.
- JSON exportiert, lokale Analyse über den Dialog zurückgesetzt und die exportierte Datei über den Datei-Dialog importiert. Der bearbeitete Text wurde wiederhergestellt.
- Quellenbibliothek geöffnet: vier Dokumente, vier lokale PDF-Links und drei Original-PDF-Links vorhanden. Alle PDF-Dateien im Dateisystem anhand der PDF-Signatur geprüft.
- Browserkonsole: keine Warnungen oder Fehler bei den geprüften Flows.
- Abschließend alle Teständerungen über den Zurücksetzen-Dialog entfernt und Standard-Viewport wiederhergestellt.

## Automatisierte Prüfungen

`npm run check` erfolgreich:

- JavaScript-Syntax von App, Daten und Kernlogik.
- Gewichtete Priorisierung einschließlich umgekehrter Aufwands- und Risikobewertung.
- Szenariorechnung einschließlich null zusätzlicher Abschlüsse.
- JSON-Roundtrip mit bearbeiteten Notizen und zusätzlichen, umgeordneten Dimensionen.
- Abweisung ungültiger Werte, doppelter Dimensions-IDs, null gewichteter Kriterien und falscher Schema-Versionen.
- Unbekannte Importfelder und Prototype-Keys werden nicht übernommen.

## Grenzen

- Kein Live-Deployment geprüft: Zum Zeitpunkt der Browserprüfung war noch kein Git-Repository eingerichtet. Inzwischen ist das lokale Repository auf `main` initialisiert; Commits und ein GitHub-Remote sind noch nicht vorhanden. Ein Pages-Workflow und die Einrichtungshinweise in der README sind vorbereitet.
- Die Druckansicht ist im Stylesheet enthalten; ein physischer Ausdruck und jede Drucker-/PDF-Konfiguration wurden nicht geprüft.
- Fachliche Scores und Zukunftsannahmen wurden auf innere Konsistenz geprüft. Eine interne HORNBACH-Validierung oder empirische Kundenbefragung ist nicht Bestandteil dieser Umsetzung.

## Nachprüfung nach der Designüberarbeitung

31.10.2026, auf Nutzerfeedback hin:

- Original-SVG aus dem Downloads-Ordner übernommen; Orange `#f79e1c`, Magenta `#c80986` und Dunkel `#041116` aus der Datei verwendet.
- Alle sieben Tabs besitzen eine Einführung, die Inhalt und Bedienung erklärt. Keine Eyebrow-Elemente mehr im DOM.
- Fließtext auf Desktop 16 px, in der mobilen Einführung 15 px. Metadaten und Quellen sind kleiner gesetzt.
- Startseite: drei Kennzahlen und fünf zunächst geschlossene Geschäftsmodelldimensionen. Aufklappen und Bearbeitungsmodus in Chrome geprüft; der Bearbeitungsmodus öffnet alle fünf Textfelder.
- Mehrzeilige Netzdiagramm-Beschriftung diagonal per Maus verschoben; die neue Reihenfolge geprüft und die vorherige Reihenfolge anschließend wiederhergestellt. Vorhandene eigene Dimensionen und Texte blieben erhalten.
- Regressionstest für den tatsächlichen Pointer-Handler: Beschriftungen folgen positiver und negativer x- und y-Verschiebung als Einheit, einschließlich des ursprünglichen Zeigerabstands. Das behebt die vorher feststehenden x-Koordinaten der SVG-tspan-Elemente.
- Neue Dimension über den aufklappbaren Editor hinzugefügt und wieder entfernt; Editor bleibt für die Bearbeitung geöffnet.
- Vier PDF-Download-Buttons in der Quellenbibliothek vorhanden. Geschäftsbericht 2025/26 über Chrome heruntergeladen; SHA-256 stimmt mit dem Original in docs/ überein.
- Alle sieben Tabs erneut in Chrome auf Desktop und bei 390 × 844 Pixeln geöffnet. Kein horizontaler Seitenüberlauf; Tabellen und Navigation scrollen bei Bedarf in ihren eigenen Containern.
- Keine Warnungen oder Fehler in der Browserkonsole.
- `npm run check`: sechs Tests erfolgreich, einschließlich des neuen Drag-Regressionsfalls.
- Kein Git-Commit und kein Deployment durchgeführt.

Die Dateien `preview/steckbrief-chrome.jpg` und `preview/reifegrad-chrome.jpg` zeigen das überarbeitete Design. Eine mobile Vorschau liegt in `preview/steckbrief-mobil-chrome.jpg`.

## Nachprüfung: kompakte Kopfzeile und direkte Bedienung

31.10.2026, weitere Anpassung auf Nutzerfeedback:

- Eine gemeinsame Kopfzeile mit genau einem h1 für den Tab-Titel sowie Bearbeiten, Export und Menü. Die zusätzliche Bezeichnung „Geschäftsmodell-Analyse“ und die zweite Titelzeile im Inhalt wurden entfernt.
- Direkte Beschreibungen ohne „Hier sehen Sie …“.
- Alle Inhaltsbereiche in allen sieben Tabs starten aufgeklappt. In Chrome wurden pro Tab Gesamtzahl und Zahl geöffneter details-Elemente verglichen; sie stimmen jeweils überein.
- Sichtbare Sechs-Punkt-Griffe an den Diagrammbeschriftungen. Mausbedienung und anschließende Umordnung über die Pfeiltasten in Chrome geprüft; vorherige Reihenfolge wiederhergestellt.
- Während des Ziehens werden Nachbarachsen und Polygone mit einer vorläufigen Reihenfolge dargestellt. Ein Platzhalter markiert das Ziel, die Beschriftung bleibt am Zeiger, und eine Positionsanzeige sowie die Reihenfolgeleiste aktualisieren sich. Die Dimensionenkarten folgen ebenfalls der Vorschau.
- Automatisierte Tests prüfen die tatsächlich verwendeten Pointer-Handler: zweidimensionale Bewegung eines mehrzeiligen Labels, Vorschau vor dem Speichern, Speichern beim Loslassen, Abbruch ohne Änderung und alle Einfügepositionen für 3–10 Dimensionen.
- Alle sieben Tabs auf Desktop und bei 390 × 844 Pixeln in Chrome geprüft. Kein horizontaler Seitenüberlauf und keine Fehler oder Warnungen in der Browserkonsole.
- `npm run check`: neun Tests erfolgreich. Kein Commit erstellt.

## Nachprüfung: Titel, Buttonhöhen und Griffausrichtung

31.10.2026:

- Überschrift und Tab-Name verwenden dieselbe Datenquelle; in Chrome für alle sieben Tabs auf Übereinstimmung geprüft.
- Bearbeiten und Export verwenden dieselben Buttonklassen. Gemessene Höhen: Desktop jeweils 48,4 px, mobil jeweils 40 px.
- Einleitung im Steckbrief entfernt; kein leeres Absatz-Element bleibt zurück.
- Drag-Griffe als kleine, rahmenlose Punkte gestaltet. Textzeilen liegen symmetrisch um die gemeinsame vertikale Mitte. In Chrome auf Desktop und Mobil für ein- und mehrzeilige Beschriftungen gemessen: 0 px Mittelpunktabweichung.
- Kein horizontaler Überlauf in der geprüften mobilen Ansicht; keine Warnungen oder Fehler in der Browserkonsole. Die neun bestehenden Tests bestehen.

## Nachprüfung: Datumsanzeigen und Reifegradtext

- Kalenderdaten aus Tabs, Quellenhinweisen, Tooltips, Annahmen-Badges, Seitenleiste und Quellenfenster entfernt. Geschäftsjahre bleiben zur Zuordnung der Berichte und Kennzahlen erhalten.
- Automatische qualitative Reifegradeinordnung vollständig entfernt, einschließlich der Aktualisierungslogik. Ist- und Zielwerte sowie die numerische Differenz bleiben erhalten.
- Weitere Werbeüberschriften durch sachliche Bezeichnungen ersetzt beziehungsweise redundante Zwischenüberschriften entfernt.
- Exportdatei ohne Datum im Namen; kein automatisch erzeugter Zeitstempel im Analyseexport.
- Alle sieben Tabs sowie das Quellenfenster in Chrome auf sichtbare Kalenderdaten und datierte Tooltips geprüft: keine Treffer.
- Reifegradwert geändert und zurückgestellt; keine Warnungen oder Fehler in der Browserkonsole. Neun automatisierte Tests erfolgreich.
