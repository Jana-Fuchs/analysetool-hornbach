// Termin 4/5: independent analysis state; earlier analysis modules remain unchanged.
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=v=>v===null?'Offen':new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(v);
const date='18.11.2026';
const acquisition='https://www.hornbach-holding.de/nachrichten/innovatives-start-up-wird-teil-der-hornbach-gruppe-hornbach-baumarkt-ag-erwirbt-seniovo-den-marktfuehrer-fuer/5178e839-a284-4fc0-bdcb-eb9526b17f81';
const personaSegments={
 diy:'Private Heimwerker (DIY)',
 professional:'Gewerbliche Profikunden',
 difm:'Do-it-for-me-Kunden (DIFM)'
};
const journeySegments={
 diy:[
  ['Suchmaschine, Projektanleitung, HORNBACH-App','Marktbesuch, Austausch im persönlichen Umfeld','Wer zum ersten Mal selbst renoviert, kann vor dem Start schwer einschätzen, welche Arbeitsschritte nötig sind und welches Werkzeug und Material dafür gebraucht wird.','Ein verständlicher Überblick über Umfang und Machbarkeit.','Geprüfte Schritt-für-Schritt-Übersicht mit klaren Materialanforderungen.'],
  ['Onlineshop, Produktdaten, digitale Materialliste','Fachberatung im Markt, Handwerker-Service','Wer die Materialliste aus Shop und Beratung zusammenstellt, muss Mengen selbst berechnen und prüfen, welche Produkte zusammenpassen. Fehler dabei können zu Fehlkäufen oder Nachbestellungen führen.','Eine passende Materialkombination und verlässliche Mengen.','Eine gemeinsame Projektliste, die App und Beratung mit Einwilligung nutzen.'],
  ['Warenkorb, Reservierung und Click & Collect','Markt, Abholung, persönliche Beratung','Wenn sich die vorbereitete Materialliste nicht in den Warenkorb oder die Reservierung übernehmen lässt, müssen Heimwerker Artikel und Mengen erneut eingeben.','Verbindliche Bestellung mit klarer Verfügbarkeit.','Geprüfte Materialliste direkt in Warenkorb oder Reservierung übernehmen.'],
  ['Projektanleitung, Statusinformation, Servicekontakt','Baustelle, Lieferung, regionale Vertragsbetriebe','Wenn Material für den nächsten Arbeitsschritt fehlt oder später ankommt, muss das Projekt unterbrochen oder die Reihenfolge der Arbeiten geändert werden.','Vollständiges Material rechtzeitig vor dem Arbeitsschritt.','Status zu freigegebenen Materialien und Serviceübergaben teilen.'],
  ['Kundenservice, Reklamation, Onlinebewertung','Markt, Rückgabe, Servicegespräch','Nach dem Projekt können Restmaterial, Rückgaben oder Fragen zur Verarbeitung offenbleiben. Ohne Bezug zum Projekt müssen Heimwerker die passenden Artikel und Informationen erneut zusammensuchen.','Eine verständliche Lösung offener Probleme.','Freiwilliges Projektfeedback einholen und sichtbar darauf reagieren.']
 ],
 professional:[
  ['HORNBACH-Website, Sortimentssuche, Angebote','Baustelle, Kollegennetzwerk, Lieferantenkontakt','Vor der Auftragsplanung müssen Profikunden schnell klären, ob die benötigten Artikel in der richtigen Menge bis zum Baustart verfügbar sind.','Schnell einschätzen, ob HORNBACH den Auftrag versorgen kann.','Projektbezogene Sortimentseinstiege mit Verfügbarkeit und Profi-Service bündeln.'],
  ['Onlineshop, App, Merklisten und Produktdaten','Profi-Service, Fachberatung, wiederkehrende Einkaufswege','Für wiederkehrende Aufträge kann es Zeit kosten, dieselben Artikel, Mengen und technischen Anforderungen erneut in einer Bestellliste zusammenzustellen.','Eine vollständige, schnell bestellbare Bedarfsliste.','Projektlisten mit Wiederbestellung, Mengenprüfung und fachlicher Rückfrage verbinden.'],
  ['Onlinebestellung, Rechnungskauf soweit verfügbar, Reservierung','Markteinkauf, Abholung, Lieferung zur Baustelle','Wenn Ware aus mehreren Bestellungen zu unterschiedlichen Zeiten ankommt, müssen Profikunden Lieferungen, Abholungen und die Arbeit auf der Baustelle einzeln koordinieren.','Ware vollständig zum vereinbarten Termin erhalten.','Bestellung und Lieferstatus je Auftrag übersichtlich zusammenführen.'],
  ['Digitale Auftrags- und Lieferinformationen','Baustelle, eigenes Team, Lieferanten und Servicepartner','Fehlt eine Materialposition oder kommt sie zu spät, kann das Team den nächsten Arbeitsschritt nicht wie geplant beginnen. Dadurch können auch weitere Gewerke warten müssen.','Materialverfügbarkeit passend zum Baufortschritt.','Abweichungen früh melden und klare Kontaktwege für die Klärung bieten.'],
  ['Rechnung, Kundenservice, digitale Bestellhistorie','Rückgabe, Reklamation, persönliche Betreuung','Wenn Rechnung, Bestellung und Baustelle nicht direkt zugeordnet werden können, dauert es länger, Ersatz zu bestellen oder eine Reklamation zu klären.','Eine schnelle Klärung mit Bezug auf den Auftrag.','Auftragsbezogenes Feedback und Wiederbestellung vereinfachen.']
 ],
 difm:[
  ['Projektideen, Serviceinformationen, Website','Empfehlungen aus dem Umfeld, Beratung im Markt','Wer die Ausführung abgeben möchte, kann zu Beginn schwer erkennen, welche Arbeiten ein Fachbetrieb übernimmt und was noch selbst organisiert werden muss.','Vertrauen in einen passenden, realisierbaren Projektweg.','Projektstart mit verständlicher Abgrenzung von Material und Handwerkerleistung.'],
  ['Digitale Produktinformationen, Serviceanfrage','Beratung, Aufmaß und Abstimmung mit Fachbetrieb','Wenn Material, Aufmaß und Handwerkerleistung getrennt geplant werden, bleibt leicht offen, was im Angebot enthalten ist, wer es erledigt und welche Kosten dazukommen.','Ein abgestimmter Plan mit transparenten Leistungen und Kosten.','Material- und Serviceplanung mit nachvollziehbarer Übergabe koordinieren.'],
  ['Onlineauswahl, Termin- und Angebotskommunikation','Marktberatung, Auftrag mit ausführendem Betrieb','Wenn Materialbestellung und Handwerkerauftrag getrennt freigegeben werden, ist vor der Zusage möglicherweise unklar, wer bestellt und welche Gesamtkosten anfallen.','Klarheit, wer Material und Ausführung beauftragt.','Nächste Schritte, Preise und Zuständigkeiten vor Freigabe darstellen.'],
  ['Statusmeldungen, Servicekontakt','Lieferung, Baustelle, regionaler Vertragsbetrieb','Bei einer Terminänderung müssen Kunden unter Umständen Markt und Fachbetrieb einzeln kontaktieren, um zu erfahren, wann es weitergeht und wer die Änderung bestätigt.','Verlässlicher Fortschritt und ein erreichbarer Ansprechpartner.','Freigegebene Statusinformationen und Kontaktperson je Projekt anbieten.'],
  ['Kundenservice, Servicefeedback','Abnahme, Nachbesserung, persönliche Rückmeldung','Wenn nach der Abnahme ein Mangel auffällt, kann unklar sein, ob HORNBACH oder der ausführende Betrieb für die Nachbesserung zuständig ist.','Eine nachvollziehbare Lösung bei Mängeln oder Restarbeiten.','Projektbezogene Rückmeldung mit klarer Weiterleitung an die zuständige Stelle.']
 ]
};
const painPointIdeas={
 all:{discover:['advisor'],plan:['project'],buy:['project'],implement:['availability']},
 diy:{discover:['advisor'],plan:['project'],buy:['project'],implement:['availability']},
 professional:{plan:['pro','project'],buy:['availability'],implement:['availability'],after:['pro']},
 difm:{discover:['service'],plan:['service','project'],buy:['service'],implement:['service'],after:['service']}
};
const segmentPainMetrics={
 diy:[
  'Der Einstieg soll leichter fallen. Im Test prüfen, wie viele Heimwerker nach der Anleitung die nötigen Schritte und Materialien vollständig benennen können.',
  'Die gemeinsame Liste soll Fehlkäufe verringern. Fehlpositionen je fachlich geprüfter Materialliste mit und ohne gemeinsame Liste vergleichen.',
  'Die Übernahme soll erneute Eingaben sparen. Zeit bis zur Bestellung und Anzahl manuell erneut eingegebener Positionen messen.',
  'Geteilte Statusinformationen sollen Unterbrechungen verringern. Erfassen, wie oft Arbeitsschritte wegen fehlenden Materials oder ungeklärter Übergaben verschoben werden.',
  'Sichtbare Reaktionen sollen die Rückmeldung nachvollziehbar machen. Anteil beantworteter Hinweise und Zeit bis zur ersten Antwort erfassen.'
 ],
 professional:[
  'Der Einstieg soll die Prüfung der Verfügbarkeit beschleunigen. Zeit messen, bis ein Betrieb Menge und Liefertermin für eine typische Auftragsliste geklärt hat.',
  'Die Wiederbestellung soll Planungsaufwand sparen. Zeit und Korrekturen beim Zusammenstellen einer wiederkehrenden Bestellung vergleichen.',
  'Die Übersicht soll die Baustellenlogistik erleichtern. Anteil vollständiger Lieferungen im vereinbarten Zeitfenster und zusätzliche Statusanfragen erfassen.',
  'Frühe Meldungen sollen Ausfälle abfedern. Messen, wie viel Vorlauf Betriebe vor einer Lieferabweichung erhalten und wie oft Folgearbeiten verschoben werden.',
  'Der Auftragsbezug soll Nachbestellungen und Reklamationen beschleunigen. Zeit bis zur Nachbestellung oder Klärung und Zahl der Rückfragen erfassen.'
 ],
 difm:[
  'Die Übersicht soll Zuständigkeiten klären. Nach dem Einstieg prüfen, wie viele Kunden korrekt benennen können, wer Material beschafft und wer die Arbeiten übernimmt.',
  'Die gemeinsame Planung soll Lücken im Angebot vermeiden. Erfassen, wie oft Leistungsumfang, Material oder Kosten vor der Freigabe nachträglich geklärt werden müssen.',
  'Klare Angaben sollen Entscheidungen erleichtern. Vor der Freigabe prüfen, ob Kunden Gesamtkosten, nächste Schritte und Zuständigkeiten richtig wiedergeben können.',
  'Eine feste Ansprechperson soll Abstimmungen verkürzen. Bei Terminänderungen die Zeit bis zur verbindlichen Rückmeldung und die Zahl der nötigen Kontakte messen.',
  'Die Rückmeldung soll direkt bei der zuständigen Stelle ankommen. Anteil der beim ersten Kontakt richtig zugeordneten Fälle und Zeit bis zur Klärung erfassen.'
 ]
};
const experienceScores=['currentEmotion','targetEmotion','currentSatisfaction','targetSatisfaction'];
const segmentExperienceDefaults={
 diy:[
  ['Vorfreude auf das Projekt, gemischt mit Unsicherheit über Aufwand und Machbarkeit.',3,5,3,4],
  ['Sorge, bei Mengen und kompatiblen Materialien eine falsche Entscheidung zu treffen.',2,4,2,4],
  ['Erleichterung beim Abschluss der Bestellung, solange alle Positionen verfügbar sind.',3,4,3,5],
  ['Motivation durch sichtbaren Fortschritt, aber Frust, wenn Material fehlt und die Arbeit stockt.',3,4,2,4],
  ['Stolz auf das Ergebnis und der Wunsch, offene Fragen schnell zu klären.',4,5,4,5]
 ],
 professional:[
  ['Sachlicher Einstieg mit Zeitdruck, wenn die Verfügbarkeit für den Auftrag unklar ist.',3,4,3,5],
  ['Routine bei der Planung, aber Ärger, wenn wiederkehrende Positionen neu erfasst werden müssen.',3,4,2,5],
  ['Anspannung, wenn Liefertermine und Baustellenablauf nicht zuverlässig zusammenpassen.',2,4,2,5],
  ['Druck, wenn fehlendes Material die Arbeit des Teams oder Folgeaufträge verzögert.',2,4,2,5],
  ['Zufriedenheit bei schneller Klärung, Ärger bei Rückfragen ohne Auftragsbezug.',3,4,3,5]
 ],
 difm:[
  ['Interesse am Projekt, aber Unsicherheit darüber, welche Arbeiten ein Betrieb übernimmt.',2,4,2,4],
  ['Anspannung, solange Leistungen, Zuständigkeiten und Kosten noch offen sind.',2,5,2,4],
  ['Zögern vor der Freigabe, wenn Materialbestellung und Handwerkerauftrag getrennt laufen.',2,4,2,4],
  ['Unruhe bei Terminänderungen, besonders wenn keine Ansprechperson erreichbar ist.',2,5,2,5],
  ['Erleichterung nach der Abnahme, mit möglicher Sorge über offene Restarbeiten.',4,5,3,5]
 ]
};
const personaFields=[
 ['project','Projekt'],
 ['goals','Ziele'],
 ['situation','Ausgangssituation'],
 ['information','Informationswege']
];
export const additionalPersonaDefaults={
 name:'',age:'',segment:'',description:'',
 ...Object.fromEntries(personaFields.map(([key])=>[key,'']))
};
export const CUSTOMER_ANALYSIS={
 persona:'Alex, 38, renoviert erstmals ein Badezimmer in Eigenleistung und lässt einzelne Arbeiten durch Fachbetriebe ausführen. Ziel: passende Materialien, verlässliche Mengen und planbare Termine. Begrenzte Erfahrung und Zeit; Smartphone zur Vorbereitung, Marktbesuch für Beratung. Fiktive Analysepersona, keine interviewte Person.',
 additionalPersonas:[],
 segmentExperience:Object.fromEntries(Object.entries(segmentExperienceDefaults).map(([id,phases])=>[
  id,phases.map(([emotion,currentEmotion,targetEmotion,currentSatisfaction,targetSatisfaction])=>({
   emotion,currentEmotion,targetEmotion,currentSatisfaction,targetSatisfaction,severity:null
  }))
 ])),
 journey:[
  {id:'discover',name:'Entdecken',online:'Suchmaschine, HORNBACH-Projektinformationen, Video-Tutorials',offline:'Markt, Austausch im persönlichen Umfeld',action:'HORNBACH stellt Produkt- und Projektinformationen bereit.',pain:'Wer ein Bau- oder Renovierungsprojekt beginnt, muss erst herausfinden, welche Schritte nötig sind und welche Materialien und Werkzeuge dafür gebraucht werden. Das erschwert es, Aufwand und Machbarkeit früh einzuschätzen.',emotion:'Neugier, zugleich Überforderung durch Informationsfülle.',moment:'Erster belastbarer Überblick über Umfang und Machbarkeit.',opportunity:'Projektorientierte Einstiegsseite mit verständlicher Material- und Arbeitsschrittübersicht.',risk:'Unvollständige oder durch KI falsch zusammengefasste Informationen führen zu falschen Erwartungen.',future:'Geführter Projektstart mit geprüften Informationen und sichtbaren Grenzen der Auskunft.',measure:'Projektstart',metric:'Anteil vollständig erstellter Projektlisten',currentEmotion:3,targetEmotion:4,currentSatisfaction:3,targetSatisfaction:4,severity:3,source:'gb26',pages:'190, 195'},
  {id:'plan',name:'Planen',online:'Onlineshop, App, digitale Produktinformationen',offline:'Fachberatung im Markt, Handwerker-Service',action:'Sortiment, Beratung und Projektservices unterstützen die Auswahl.',pain:'Informationen zu Mengen, Varianten und passenden Produkten können über Onlineshop und Beratung verteilt sein. Kunden müssen sie zu einer Materialliste zusammenführen und riskieren dabei Fehlmengen oder unpassende Artikel.',emotion:'Unsicherheit und Angst vor Fehlkäufen.',moment:'Entscheidung für Materialkombination und benötigte Mengen.',opportunity:'Gemeinsame Projektliste mit Mengenprüfung und Übergabe an die Fachberatung.',risk:'Fehlerhafte Empfehlungen oder unklare Zuständigkeit; keine automatischen sicherheitskritischen Bauzusagen.',future:'Freigegebene Projektliste wird zwischen App und Beratung mit Einwilligung weiterverwendet.',measure:'Projektliste',metric:'Fehlpositionen je geprüfter Materialliste',currentEmotion:2,targetEmotion:4,currentSatisfaction:2,targetSatisfaction:4,severity:5,source:'gb26',pages:'37, 72–73, 195'},
  {id:'buy',name:'Kaufen',online:'Onlinebestellung, Reservieren und Abholen über die App',offline:'Markt, Abholung, persönliche Beratung',action:'HORNBACH verbindet Online-Warenbezug und stationäre Märkte im ICR-Ansatz.',pain:'Beim Wechsel von der Beratung oder Materialliste zur Bestellung müssen Kunden möglicherweise Artikel und Mengen erneut eingeben. Wie häufig das vorkommt, ist offen.',emotion:'Zeitdruck und Sorge um Verfügbarkeit.',moment:'Verbindliche Bestellung und Abholzusage.',opportunity:'Geprüfte Liste in Warenkorb oder Reservierung übernehmen; Verfügbarkeit und Preis klar anzeigen.',risk:'Veraltete Bestandsinformationen und unklare Verantwortlichkeit bei Marktplatzartikeln.',future:'Kontext bleibt beim Übergang von der Liste zur Bestellung erhalten.',measure:'Kontextübergabe',metric:'Abschlussquote begonnener Projektbestellungen',currentEmotion:3,targetEmotion:4,currentSatisfaction:3,targetSatisfaction:4,severity:4,source:'gb26',pages:'37, 72'},
  {id:'implement',name:'Umsetzen',online:'Projektanleitungen, Statusinformation und Servicekontakt',offline:'Baustelle, Lieferung, regionale Vertragsbetriebe',action:'Der Handwerker-Service ergänzt den Warenbezug durch regionale Betriebe.',pain:'Wenn Liefertermin und Arbeitsbeginn nicht zusammenpassen oder Material fehlt, kann der nächste Arbeitsschritt ins Stocken geraten. Ob sich alle Informationen in einer digitalen Projektakte verfolgen lassen, ist offen.',emotion:'Anspannung bei Terminabhängigkeiten.',moment:'Material ist rechtzeitig vollständig verfügbar.',opportunity:'Gemeinsamer Status für freigegebene Materialien, Lieferungen und Serviceübergaben.',risk:'Partnerabhängigkeit, zusätzliche Koordination und sensible Projektinformationen.',future:'Nachvollziehbare Statusmeldungen mit klarer Kontaktperson bei Abweichungen.',measure:'Projektstatus',metric:'Anteil termingerechter vollständiger Lieferungen',currentEmotion:2,targetEmotion:4,currentSatisfaction:2,targetSatisfaction:4,severity:4,source:'gb26',pages:'37, 72–73'},
  {id:'after',name:'Danach',online:'Kundenservice, Reklamation, Onlinebewertung',offline:'Markt, Rückgabe und Servicegespräch',action:'Das Kundenservice-Center bearbeitet Rückmeldungen und gibt Erkenntnisse an Fachbereiche weiter.',pain:'Nach Projektabschluss können Kunden Rückmeldungen über Bewertungen geben. Ob sie nachvollziehen können, was mit ihrem konkreten Hinweis passiert und ob er in Verbesserungen einfließt, ist offen.',emotion:'Erleichterung bei Erfolg, Frustration bei ungelösten Restproblemen.',moment:'Eine Reklamation wird verständlich und verbindlich gelöst.',opportunity:'Projektbezogene Nachbefragung und Einladung zu freiwilligen Konzepttests.',risk:'Selektionsverzerrung und unerwünschte Kontaktaufnahme; Zweck und Einwilligung klären.',future:'Feedback führt zu sichtbarer Rückmeldung und geeigneten Verbesserungsaufgaben.',measure:'Feedbackschleife',metric:'Lösungsquote und Zufriedenheit nach Servicekontakt',currentEmotion:3,targetEmotion:4,currentSatisfaction:3,targetSatisfaction:4,severity:3,source:'gb26',pages:'195–196'}
 ],
 innovationConclusion:'Die Quellen sprechen für eine selektive Öffnung, besonders durch externes Wissen und Zukäufe (Outside-in). Befragungen und Beschwerden beeinflussen Sortiment und Services. Ein unternehmensweit offener Innovationsprozess oder dauerhaftes Co-Design mit Kunden ist damit nicht bewiesen. Partnerschaften im Tagesgeschäft sind ohne gemeinsamen Entwicklungsnachweis noch keine Coupled Innovation.',
 examples:[
  {id:'seniovo',name:'Zukauf von Seniovo',type:'Outside-in',status:'Belegt',description:'HORNBACH kündigte 2023 die Übernahme des auf barrierefreie Bäder spezialisierten Start-ups an. Externes Prozess- und Digitalisierungswissen wird integriert.',limit:'Einordnung als Outside-in nach der Vorlesungsmethode; ein Zukauf allein belegt noch keinen Innovationserfolg.',sourceUrl:acquisition,sourceDate:'27.11.2023',pages:'37, 72'},
  {id:'feedback',name:'Kundenwissen aus Service und Befragungen',type:'Outside-in',status:'Belegt',description:'Rückmeldungen, Beschwerden und Kundenbefragungen fließen laut Bericht in die Weiterentwicklung von Sortiment und Services ein.',limit:'Dies ist ein Wissenszufluss. Aktives Co-Design oder ein offener Ideenwettbewerb ist daraus nicht ableitbar.',sourceUrl:'https://www.hornbach-holding.de/media/document/53a06c3f-6dfe-485b-b39a-a3ca941e7ea7/assets/20260519_HH_GB_DE.pdf',sourceDate:'19.05.2026',pages:'190, 195–196'},
  {id:'cocreation',name:'Projektlabor mit Kunden und Handwerksbetrieben',type:'Coupled',status:'Vorschlag',description:'Kunden, Fachberatung und Partner entwickeln und testen gemeinsam die digitale Projektliste; Erkenntnisse werden in beide Richtungen geteilt.',limit:'Konzeptioneller Vorschlag dieser Analyse, kein belegtes HORNBACH-Programm. Gemeinsame Entwicklung und Regeln zur Verwertung wären Voraussetzung.',sourceUrl:'',sourceDate:date,pages:''},
  {id:'standard',name:'Freigabe eines Projektlisten-Datenformats',type:'Inside-out',status:'Vorschlag',description:'Ein dokumentiertes Format für Materiallisten könnte Partnern ermöglichen, eigene kompatible Hilfen zu entwickeln.',limit:'Keine belegte offene HORNBACH-Schnittstelle. Ein reiner Datenexport ist noch keine Verwertung geistigen Eigentums; Lizenz, Nutzen und Rückfluss wären zu prüfen.',sourceUrl:'',sourceDate:date,pages:''}
 ],
 involvement:[
  {id:'ideas',name:'Ideenfindung',current:2,target:3,evidence:'Kundenbefragungen und Servicefeedback liefern Input. Die Zuordnung zu systematischem Feedback ist eine vorläufige Interpretation; eine repräsentative Innovationscommunity ist nicht belegt.',measure:'Ein freiwilliges Projektkunden-Panel ergänzt Befragungen um priorisierte Verbesserungsideen.'},
  {id:'concept',name:'Konzeptentwicklung',current:1,target:2,evidence:'Ein Einfluss auf die Weiterentwicklung ist beschrieben; gemeinsames digitales Konzeptdesign ist nicht nachgewiesen. Stufe 1 ist eine vorsichtige Arbeitshypothese, kein Nachweis fehlender Beteiligung.',measure:'Kunden und Fachberatung testen zwei Projektlisten-Prototypen in moderierten Sitzungen.'},
  {id:'prototype',name:'Prototypentest',current:null,target:2,evidence:'Keine belastbaren Angaben zu strukturierten Kundentests für die hier vorgeschlagene digitale Projektlösung. Offen bleibt offen und wird nicht als Null gewertet.',measure:'Einen klickbaren Prototyp mit freiwilligen Kunden prüfen und Entscheidungen dokumentieren.'},
  {id:'launch',name:'Markteinführung',current:null,target:2,evidence:'Ein formaler Kundeneinfluss auf Freigaben neuer digitaler Projektleistungen ist aus den geprüften Quellen nicht ersichtlich.',measure:'Vor Ausweitung eines Tests die Verständlichkeit und Aufgabenerfüllung durch Kunden bewerten lassen.'},
  {id:'improve',name:'Weiterentwicklung',current:2,target:3,evidence:'Kundeninteraktionen und Reklamationen werden systematisch ausgewertet. Gemeinsame Priorisierung und Rückmeldung an eine dauerhafte Innovationscommunity sind nicht belegt.',measure:'Die Umsetzung ausgewählter Kundenideen und ihre Wirkung an die Teilnehmenden zurückmelden.'}
 ],
 campaign:{goal:'Wie lässt sich eine Materialliste ohne Kontextverlust zwischen Smartphone und Marktberatung weiterverwenden?',audience:'Freiwillige DIY-, Profi- und DIFM-Kunden mit aktuellem Renovierungsprojekt sowie Fachberatung und regionale Partner.',incentive:'Einblick in den Prototyp, transparente Rückmeldung und auf Wunsch Namensnennung; keine Teilnahmeabhängigkeit von positiven Bewertungen.',rules:'Datensparsame Einreichung; keine fremden Baupläne oder vertraulichen Daten. Nutzungsrechte, Vertraulichkeit, Moderation und Löschung vor Beginn vereinbaren.',selection:'Fachjury prüft Sicherheit und Machbarkeit; Kunden priorisieren Nutzbarkeit. Ein öffentliches Voting allein entscheidet nicht.',feedback:'Eingang bestätigen; innerhalb von vier Wochen eine begründete Rückmeldung zum Vorschlag geben.'},
 scenarioJourney:true,scenarioInnovation:true
};
const journeyTabs=[
 ['persona','Persona'],
 ['map','Journey Map'],
 ['optimization','Pain Points & Optimierung'],
 ['scenario','Reifegrad-Wirkung']
];
let activeJourneyTab=journeyTabs[0][0];
let activeJourneySegment=null;
const journeyLayers=[['current','Ist'],['target','Soll']];
const journeyMetrics={Emotion:'Emotion',Satisfaction:'Zufriedenheit'};
let activeJourneyMetric='Emotion';
const visibleJourneyLayers=new Set(journeyLayers.map(([id])=>id));
let subview='journey',exampleFilter='Alle';
const lecture=(which,pdf,printed)=>`<a class="source-ref" href="docs/${which==='journey'?'2026-11-18 Kunde_und_Journey.pdf':'2026-11-18 Open_Innovation.pdf'}#page=${pdf}" target="_blank" rel="noopener">Termin ${which==='journey'?4:5} · Folie ${printed} · PDF-Seite ${pdf}</a>`;
const sourceUrl=url=>/^https?:\/\//i.test(url)?`<a class="source-ref" href="${esc(url)}" target="_blank" rel="noopener">Originalquelle ↗</a>`:'';
const section=(title,body)=>`<section class="ca-section">${title?`<h2>${title}</h2>`:''}${body}</section>`;
let openJourneyPhase=0;

function journeyBoard(phases){
 return `<figure class="ca-journey-board" aria-label="Die fünf Phasen der Customer Journey">
  <ol class="ca-board-phases">
   ${phases.map((phase,i)=>`<li><button type="button" class="ca-board-phase${openJourneyPhase===i?' ca-nail-seated':''}" id="ca-board-phase-${i}" aria-expanded="${openJourneyPhase===i}" aria-controls="ca-phase-${i}"><span class="ca-board-hole" aria-hidden="true"><span class="ca-board-nail"></span></span><span class="ca-board-label">${esc(phase.name)}</span></button></li>`).join('')}
  </ol>
  <div class="ca-hammer-travel" aria-hidden="true"><div class="ca-hammer-swing"><div class="ca-hammer">
   <span class="ca-hammer-handle"></span><span class="ca-hammer-head"></span><span class="ca-hammer-face"></span>
  </div></div></div>
 </figure>`;
}

export function animateJourneyBoard(panel){
 const board=panel.querySelector('.ca-journey-board');
 if(!board)return;
 const travel=board.querySelector('.ca-hammer-travel');
 const swing=board.querySelector('.ca-hammer-swing');
 const buttons=[...board.querySelectorAll('.ca-board-phase')];
 const bubbles=buttons.map(button=>panel.querySelector('#'+button.getAttribute('aria-controls')));
 const rest=-26, seated=-4;
 let animations=[];

 function updateBoard(){
  buttons.forEach((button,index)=>{
   const expanded=openJourneyPhase===index;
   button.setAttribute('aria-expanded',String(expanded));
   button.classList.toggle('ca-nail-seated',expanded);
   bubbles[index].hidden=!expanded;
  });
 }

 function stopStrike(){
  animations.forEach(animation=>animation.cancel());
  animations=[];
 }

 function strike(button,index){
  const position=(index+.5)*100/buttons.length;
  const timing={duration:760};
  const pose=(y,angle)=>`translateY(${y}px) rotate(${angle}deg)`;
  animations.push(
   travel.animate([
    {transform:`translateX(${position-7}%)`,opacity:0},
    {transform:`translateX(${position}%)`,opacity:1,offset:.24},
    {transform:`translateX(${position}%)`,opacity:1,offset:.78},
    {transform:`translateX(${position+4}%)`,opacity:0}
   ],timing),
   swing.animate([
    {transform:pose(rest-15,-13)},
    {transform:pose(rest-18,-20),offset:.36,easing:'ease-in'},
    {transform:pose(rest,0),offset:.59,easing:'ease-out'},
    {transform:pose(seated,0),offset:.72,easing:'ease-out'},
    {transform:pose(rest-20,-13)}
   ],timing),
   button.querySelector('.ca-board-nail').animate([
    {transform:`translateY(${rest}px)`},
    {transform:`translateY(${rest}px)`,offset:.59,easing:'ease-out'},
    {transform:`translateY(${seated}px)`,offset:.72},
    {transform:`translateY(${seated}px)`}
   ],timing)
  );
 }

 function selectPhase(index){
  const previous=buttons[openJourneyPhase]?.querySelector('.ca-board-nail');
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const previousPosition=previous&&!reduceMotion?getComputedStyle(previous).transform:null;
  stopStrike();
  openJourneyPhase=index;
  updateBoard();
  if(reduceMotion)return;
  if(previousPosition){
   animations.push(previous.animate([
    {transform:previousPosition},
    {transform:`translateY(${rest}px)`}
   ],{duration:180,easing:'ease-out'}));
  }
  if(index!==null)strike(buttons[index],index);
 }

 buttons.forEach((button,index)=>button.addEventListener('click',()=>{
  selectPhase(openJourneyPhase===index?null:index);
 }));
 bubbles.forEach((bubble,index)=>bubble.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const filter=bubble.querySelector('.ca-segment-filter[open]');
  if(filter){
   filter.open=false;
   filter.querySelector('summary').focus();
   return;
  }
  selectPhase(null);
  buttons[index].focus();
 }));
 updateBoard();
}
const text=(path,label,value,editing)=>editing?`<label class="ca-field"><span>${label}</span><textarea rows="3" data-ca-text="${path}" maxlength="10000">${esc(value)}</textarea></label>`:`<div class="ca-field"><h4>${label}</h4><p>${esc(value)}</p></div>`;
const scale=(path,label,value,min,max)=>`<label class="ca-score"><span>${label}</span><select data-ca-score="${path}" data-min="${min}" data-max="${max}"><option value="" ${value===null?'selected':''}>Offen</option>${Array.from({length:max-min+1},(_,i)=>i+min).map(v=>`<option ${v===value?'selected':''}>${v}</option>`).join('')}</select></label>`;
const mean=(items,key)=>{const known=items.filter(c=>c[key]!==null);return known.length?known.reduce((a,c)=>a+c[key],0)/known.length:null;};
export function strongestPain(data){return data.journey.reduce((a,b)=>b.severity>a.severity?b:a);}
export function weakestInvolvement(data){return data.involvement.filter(p=>p.current!==null).reduce((a,b)=>!a||b.current<a.current?b:a,null);}
function experienceChart(phases,experience,activePhase,visible,metric){
 const title=journeyMetrics[metric];
 const x=index=>70+index*140;
 const y=value=>190-value*30;
 return `<div class="ca-experience-chart"><svg viewBox="0 25 700 205" role="img" aria-label="${title} je Phase">
   ${[1,2,3,4,5].map(value=>`<line x1="45" x2="655" y1="${y(value)}" y2="${y(value)}" class="ca-grid"/><text x="20" y="${y(value)+5}">${value}</text>`).join('')}
   ${visible.map(([id,label])=>{
    const points=phases.map((phase,index)=>{
     const values=experience[index];
     const value=values[id+metric];
     const overlaps=visible.length===2&&values['current'+metric]===values['target'+metric];
     return {x:x(index)+(overlaps?(id==='current'?-6:6):0),y:y(value),value,name:phase.name};
    });
    const lines=points.slice(1).map((point,index)=>{
     const previous=points[index];
     return point.value===null||previous.value===null?'':`<line x1="${previous.x}" y1="${previous.y}" x2="${point.x}" y2="${point.y}" class="ca-${id}"/>`;
    }).join('');
    const markers=points.map((point,index)=>point.value===null?'':`<circle cx="${point.x}" cy="${point.y}" r="5" class="ca-${id}${index===activePhase?' ca-point-active':''}"><title>${esc(point.name)} · ${label} ${point.value}</title></circle>`).join('');
    return lines+markers;
   }).join('')}
   ${phases.map((phase,index)=>`<text x="${x(index)}" y="215" text-anchor="middle">${esc(phase.name)}</text>`).join('')}
  </svg></div>`;
}

function journeyExperience(data,index,editing){
 if(activeJourneySegment===null)return `<section class="ca-experience">
  <h4>Kundenerlebnis</h4>
  <p class="ca-experience-note">Wähle zuerst ein Kundensegment.</p>
 </section>`;
 const segment=Object.hasOwn(personaSegments,activeJourneySegment)?activeJourneySegment:null;
 const experience=segment?data.segmentExperience[segment]:data.journey;
 const phase=experience[index];
 const path=segment?`segmentExperience.${segment}.${index}`:`journey.${index}`;
 const visible=journeyLayers.filter(([id])=>visibleJourneyLayers.has(id));
 const metric=activeJourneyMetric;
 return `<section class="ca-curves ca-experience">
  <h4>Kundenerlebnis</h4>
  ${visibleJourneyLayers.has('current')?text(path+'.emotion','Erfahrung in dieser Phase',phase.emotion,editing):''}
  <div class="ca-experience-controls">
   <div class="pattern-filter ca-experience-metrics" role="group" aria-label="Kennzahl">
    ${Object.entries(journeyMetrics).map(([id,label])=>`<button type="button" id="ca-metric-${index}-${id}" data-ca-metric="${id}" aria-pressed="${id===metric}">${label}</button>`).join('')}
   </div>
   <div class="ca-experience-values">
    ${visible.map(([id,label])=>`<span class="status-tag ${id==='current'?'orange':'pink'}">${label}</span>`).join('')}
   </div>
  </div>
  ${experienceChart(data.journey,experience,index,visible,metric)}
  <p class="ca-experience-note">Skala von 1 (sehr negativ) bis 5 (sehr positiv)</p>
  ${editing?`<details class="ca-experience-edit">
   <summary>${journeyMetrics[metric]} bewerten</summary>
   <div class="ca-experience-values">
    ${visible.map(([id,label])=>scale(path+'.'+id+metric,label,phase[id+metric],1,5)).join('')}
   </div>
  </details>`:''}
 </section>`;
}

function personaDetails(persona){
 const fields=personaFields.filter(([key])=>persona[key]);
 return fields.length?`<dl>${fields.map(([key,label])=>`<div><dt>${label}</dt><dd>${esc(persona[key])}</dd></div>`).join('')}</dl>`:'';
}
function personaCard(persona,editing){
 return `<article class="ca-persona">
  <div class="ca-persona-photo"><img src="assets/persona-alex.jpg" width="720" height="720" alt="Porträt der fiktiven Analysepersona Alex"></div>
  <div class="ca-persona-profile">
   <header class="ca-persona-heading"><h2>Alex, 38</h2><span class="status-tag orange">${personaSegments.diy}</span></header>
   ${editing?text('persona','Steckbrief bearbeiten',persona,true):persona===CUSTOMER_ANALYSIS.persona?personaDetails({
    project:'Erste Badrenovierung in Eigenleistung, einzelne Arbeiten übernimmt ein Fachbetrieb.',
    goals:'Passende Materialien, verlässliche Mengen und planbare Termine.',
    situation:'Begrenzte Erfahrung und Zeit.',
    information:'Smartphone zur Vorbereitung, Marktbesuch für Beratung.'
   }):`<p class="editable-text">${esc(persona)}</p>`}
  </div>
 </article>`;
}
function personaView(data,editing){
 return `${personaCard(data.persona,editing)}
 ${data.additionalPersonas.map((persona,index)=>{
 const path='additionalPersonas.'+index;
 return `<article class="ca-additional-persona ca-persona">
  ${persona.image?`<div class="ca-persona-photo"><img src="${esc(persona.image)}" alt="Porträt von ${esc(persona.name)}"></div>`:'<div class="ca-persona-photo ca-persona-placeholder" aria-hidden="true"><span></span></div>'}
  <div class="ca-persona-profile">
   <header class="ca-persona-heading"><h2>${esc(persona.name)}${persona.age?', '+esc(persona.age):''}</h2>${persona.segment?`<span class="status-tag orange">${esc(personaSegments[persona.segment])}</span>`:''}</header>
   ${editing?`${text(path+'.name','Name',persona.name,true)}
    <label class="edit-field"><span>Alter</span><input type="number" min="0" step="1" value="${esc(persona.age)}" data-ca-text="${path}.age"></label>
    ${personaFields.map(([key,label])=>text(path+'.'+key,label,persona[key],true)).join('')}
    ${persona.description?text(path+'.description','Steckbrief',persona.description,true):''}`
   :`${personaDetails(persona)}${persona.description?`<p class="editable-text">${esc(persona.description)}</p>`:''}`}
  </div>
 </article>`;
 }).join('')}
 <hr class="ca-persona-divider">
 <button type="button" class="button small ca-add-persona" data-ca-add-persona>Weitere Personen hinzufügen</button>
 <dialog id="ca-persona-dialog" aria-labelledby="ca-persona-dialog-title">
  <h2 id="ca-persona-dialog-title">Weitere Personen hinzufügen</h2>
  <form data-ca-persona-form>
   <label class="edit-field"><span>Name</span><input name="name" type="text" required maxlength="10000"></label>
   <label class="edit-field"><span>Alter</span><input name="age" type="number" min="0" step="1" required></label>
   <label class="edit-field analysis-select"><span>Kundensegment</span><select name="segment" required>
    <option value="">Kundensegment auswählen</option>
    ${Object.entries(personaSegments).map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}
   </select></label>
   <fieldset class="ca-persona-fields">
    <legend>Steckbrief</legend>
    ${personaFields.map(([key,label])=>`<label class="edit-field"><span>${label}</span><textarea name="${key}" rows="2" maxlength="10000" required></textarea></label>`).join('')}
   </fieldset>
   <label class="edit-field"><span>Bild einfügen (optional)</span><input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" data-ca-persona-image></label>
   <div class="ca-persona-actions">
    <button class="button small">Hinzufügen</button>
    <button class="button small secondary" formmethod="dialog" formnovalidate>Abbrechen</button>
   </div>
  </form>
 </dialog>`;
}
function journeySegmentFilter(data,index){
 const options=[['all','Alle Segmente'],...Object.entries(personaSegments)];
 const currentLabel=options.find(([id])=>id===activeJourneySegment)?.[1]??'Kundensegment wählen';
 return `<details class="ca-segment-filter">
  <summary id="ca-segment-${index}">${esc(currentLabel)}</summary>
  <ul class="ca-segment-options">
   ${options.map(([id,label])=>{
    const names=data.additionalPersonas.filter(persona=>persona.segment===id).map(persona=>persona.name);
    if(id==='diy')names.unshift('Alex');
    return `<li><button type="button" data-ca-segment="${id}" data-ca-segment-trigger="ca-segment-${index}" aria-pressed="${activeJourneySegment===id}"><span>${esc(label)}</span>${names.length?`<span class="ca-segment-personas">${esc(names.join(', '))}</span>`:''}</button></li>`;
   }).join('')}
  </ul>
 </details>`;
}

function journeyPainPoint(data,index,segmentId){
 const phase=data.journey[index];
 const segment=journeySegments[segmentId]?.[index];
 return {
  phase,
  index,
  severity:data.segmentExperience[segmentId]?.[index].severity??phase.severity,
  pain:segment?.[2]??phase.pain,
  measure:segment?.[4]??phase.opportunity,
  metric:segmentPainMetrics[segmentId]?.[index]??phase.metric
 };
}
function rankedJourneyPainPoints(data,segmentId){
 return data.journey.map((_,index)=>journeyPainPoint(data,index,segmentId)).sort((a,b)=>b.severity-a.severity);
}
function matchingDevelopmentIdea(segmentId,phaseId,proposals){
 const ids=painPointIdeas[segmentId]?.[phaseId]??[];
 for(const id of ids){
  const idea=proposals.find(proposal=>proposal.id===id);
  if(idea)return idea;
 }
}
function developmentIdeaLink(idea){
 return `<a href="#muster/entwicklungsvorschlaege/${encodeURIComponent(idea.id)}">${esc(idea.name)} ↗</a>`;
}

function journeyPhase(data,phase,index,{editing}){
 const path=`journey.${index}`;
 const segment=journeySegments[activeJourneySegment]?.[index];
 const [online,offline,pain,moment,future]=segment??[phase.online,phase.offline,phase.pain,phase.moment,phase.future];
 const canEdit=editing&&!segment;
 const field=(key,label,value=phase[key])=>text(`${path}.${key}`,label,value,canEdit);
 const showCurrent=visibleJourneyLayers.has('current'),showTarget=visibleJourneyLayers.has('target');
 const expanded=openJourneyPhase===index;

 return `<article class="ca-phase" id="ca-phase-${index}" aria-labelledby="ca-phase-title-${index}" style="--bubble-pointer:${(index+.5)*100/data.journey.length}%"${expanded?'':' hidden'}>
  <header>
   <h3 id="ca-phase-title-${index}">${esc(phase.name)}</h3>
   <div class="pattern-filter ca-journey-filters" role="group" aria-label="Journey-Ansicht">
    ${journeySegmentFilter(data,index)}
    ${journeyLayers.map(([id,label])=>`<button type="button" id="ca-layer-${index}-${id}" data-ca-mode="${id}" aria-pressed="${visibleJourneyLayers.has(id)}">${visibleJourneyLayers.has(id)?'<span aria-hidden="true">✓</span> ':''}${label}</button>`).join('')}
   </div>
  </header>
  ${showCurrent?`<div class="ca-layer ca-layer-current ca-phase-grid" role="group" aria-label="Ist">
   <div class="ca-phase-card">
    <h4>Touchpoints</h4>
    <div class="ca-touchpoints">
     ${field('online','Online',online)}
     ${field('offline','Offline',offline)}
    </div>
   </div>
   <div class="ca-phase-card">
    ${field('pain','Pain Point',pain)}
    ${scale(segment?`segmentExperience.${activeJourneySegment}.${index}.severity`:`${path}.severity`,'Bewertung (1 gering bis 5 hoch)',journeyPainPoint(data,index,activeJourneySegment).severity,1,5)}
   </div>
   <div class="ca-phase-card">${field('action','Actions von HORNBACH')}</div>
   <div class="ca-phase-card">${field('moment','Moment of Truth',moment)}</div>
  </div>`:''}
  ${showTarget?`<div class="ca-layer ca-layer-target ca-phase-grid" role="group" aria-label="Soll">
   <div class="ca-phase-card">${field('future',segment?'Segmentbezogene Chance / Soll-Erlebnis':'Soll-Erlebnis',future)}</div>
   ${segment?'':`<div class="ca-phase-card">${field('opportunity','Chance / Maßnahme')}</div>`}
   <div class="ca-phase-card">${field('risk','Risiken und Grenzen')}</div>
   <div class="ca-phase-card">${field('metric','Erfolgskriterium')}</div>
  </div>`:''}
  ${showCurrent||showTarget?journeyExperience(data,index,editing):'<p>Wähle Ist oder Soll, um die Phase anzuzeigen.</p>'}
 </article>`;
}

function journeyOptimization(data,proposals){
 const filter=`<div class="pattern-filter ca-optimization-filter">${journeySegmentFilter(data,'optimization')}</div>`;
 if(activeJourneySegment===null)return section('',`${filter}<p>Wähle zuerst ein Kundensegment.</p>`);

 const ranked=rankedJourneyPainPoints(data,activeJourneySegment);
 let rank=1;
 const cards=ranked.map(({phase,severity,pain,measure,metric},position)=>{
  if(position>0&&severity<ranked[position-1].severity)rank=position+1;
  const idea=matchingDevelopmentIdea(activeJourneySegment,phase.id,proposals);
  return `<article class="ca-phase-card ca-optimization-card">
   <header class="ca-optimization-card-header">
    <h3>Pain Point</h3>
    <span class="status-tag">Phase ${esc(phase.name)}</span>
    <span class="status-tag orange">${severity}/5</span>
    <span class="ca-pain-rank" aria-label="Rang ${rank}">${rank}</span>
   </header>
   <p class="ca-ranked-pain">${esc(pain)}</p>
   ${text('', 'Maßnahme', measure, false)}
   <div class="ca-field"><h4>Passende Idee</h4><p>${idea?developmentIdeaLink(idea):'Offen'}</p></div>
   ${text('', 'Wirkung und Messung', metric, false)}
  </article>`;
 }).join('');
 return section('',`${filter}<div class="ca-phase-grid ca-optimization-grid">${cards}</div>`);
}

function journeyView(state,context,tab){
 const data=state.customerAnalysis;
 const views={
  persona:()=>personaView(data,context.editing),
  map:()=>section('',`${journeyBoard(data.journey)}
  ${data.journey.map((phase,index)=>journeyPhase(data,phase,index,context)).join('')}`),
  optimization:()=>journeyOptimization(data,context.developmentProposals??[]),
  scenario:()=>journeyScenarioView(state,context.developmentProposals??[])
 };
 return tab?views[tab]():journeyTabs.slice(0,-1).map(([id])=>views[id]()).join('');
}
function innovationRecommendation(p){
 return `<dl class="ca-recommendation-fields"><dt>Ausgangslage</dt><dd>${esc(p.evidence)} Offene Phasen sind keine nachgewiesenen Schwächen und werden separat als Beleglücken geführt.</dd><dt>Maßnahme · wer · bis wann</dt><dd>${esc(p.measure)} Zuständigkeit im Vorschlag: Digital Commerce und Marktberatung, bei Co-Creation zusätzlich ein freiwilliges Kundenpanel. Zeithorizont: drei Monate für einen begrenzten Test. Dies ist ein konzeptioneller Vorschlag, kein gestartetes Projekt.</dd><dt>Herleitung & Alternative</dt><dd>Gemeinsame Konzepttests schließen die Lücke zwischen passivem Feedback und Mitentwicklung. Ein reines öffentliches Voting wäre leichter skalierbar, liefert aber weniger Kontext und ist anfällig für Verzerrungen.</dd><dt>Wissenschaftliche Grundlage</dt><dd>Chesbrough (2003), Open Innovation; Vorlesung Termin 5, Folien 15, 21–23, 48–49. Eigene Übertragung auf HORNBACH.</dd><dt>Wirkung & Messung</dt><dd>Zielvorschläge: mindestens zehn verwertbare Verbesserungsideen in acht Wochen; mindestens zwei davon fachlich geprüft in einen Prototyp überführen. Einreichungslog, Juryentscheidung und Prototypnachweis dokumentieren; keine bestehenden Ist-Kennzahlen.</dd><dt>Aufwand & Risiken</dt><dd>Rekrutierung und Moderation, Nutzungsrechte, Vertraulichkeit, Integrationsaufwand und enttäuschte Erwartungen bei nicht umgesetzten Ideen.</dd></dl>`;
}
function distribution(examples){
 const types=['Outside-in','Inside-out','Coupled'],belegt=examples.filter(d=>d.status==='Belegt'),counts=types.map(t=>belegt.filter(d=>d.type===t).length),total=counts.reduce((a,b)=>a+b,0),colors=['#f79e1c','#ca0088','#53616a'];let end=0;
 const stops=counts.map((count,i)=>{const start=end;end+=total?count/total*100:0;return `${colors[i]} ${start}% ${end}%`;});
 return `<figure class="ca-distribution"><div class="ca-pie" role="img" aria-label="Verteilung der belegten Beispiele: ${types.map((t,i)=>t+' '+counts[i]).join(', ')}" style="background:${total?'conic-gradient('+stops.join(',')+')':'#eee'}"></div><figcaption><h3>Verteilung der belegten Beispiele</h3><ul>${types.map((t,i)=>`<li>${t}: ${counts[i]} von ${total} (${total?fmt(counts[i]/total*100):0} %)</li>`).join('')}</ul><p>Eigene Auswahl, keine vollständige Erhebung von HORNBACHs Innovationsportfolio. Vorschläge werden nicht mitgezählt. Kein belegtes Beispiel bedeutet keinen Nachweis der Abwesenheit.</p></figcaption></figure>`;
}
export function innovationView(state,{editing,cite},view){
 const data=state.customerAnalysis,weak=weakestInvolvement(data),filtered=data.examples.filter(x=>exampleFilter==='Alle'||x.type===exampleFilter);
 const views={
  overview:()=>section('Closed oder Open Innovation?',`${text('innovationConclusion','Begründete Einordnung',data.innovationConclusion,editing)}${cite('gb26','37, 72, 190, 195–196')} ${lecture('innovation',17,17)}<p class="scope-note">Die Existenz eines Marktplatzes oder einer Lieferbeziehung allein beweist keine gemeinsame Innovation. Wissenszufluss, Wissensabgabe und gemeinsame Entwicklung werden getrennt betrachtet. Quellenstand: ${date}.</p>`)+
   section('Beispiele & Prozesszuordnung',`<div class="ca-view-switch" role="group" aria-label="Open-Innovation-Beispiele filtern">${['Alle','Outside-in','Inside-out','Coupled'].map(t=>`<button class="button small secondary" data-ca-filter="${t}" aria-pressed="${exampleFilter===t}">${t}</button>`).join('')}</div><div class="ca-cards">${filtered.map(x=>`<article class="panel"><div class="tag-row"><span class="status-tag ${x.status==='Belegt'?'orange':'pink'}">${x.status}</span><span class="status-tag">${x.type}</span></div><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p><p class="scope-note">${esc(x.limit)}</p>${x.pages?cite('gb26',x.pages):lecture('innovation',19,19)}${sourceUrl(x.sourceUrl)}<p class="ca-date">${x.sourceUrl?'Veröffentlichung':'Eigener Vorschlag'}: ${x.sourceDate} · geprüft ${date}</p></article>`).join('')}</div>${distribution(data.examples)}`),
  involvement:()=>section('Kundeneinbindung im Innovationsprozess',`<p>Eigene Arbeitsskala: 0 = nachweislich kein Einbezug, 1 = punktueller Input, 2 = systematisches Feedback oder Tests, 3 = gemeinsame Entwicklung. „Offen“ bedeutet fehlende Evidenz und wird nicht als 0 gewertet. Diese Skala ist keine zusätzliche Appelfeller/Feldmann-Bewertung.</p><div class="ca-involvement">${data.involvement.map((p,i)=>`<article class="panel"><h3>${esc(p.name)}</h3><div class="ca-score-grid">${scale(`involvement.${i}.current`,'Ist · Einschätzung',p.current,0,3)}${scale(`involvement.${i}.target`,'Soll · Vorschlag',p.target,0,3)}</div>${text(`involvement.${i}.evidence`,'Begründung / Beleglücke',p.evidence,editing)}${text(`involvement.${i}.measure`,'Entwicklungsschritt',p.measure,editing)}${cite('gb26','190, 195–196')}</article>`).join('')}</div>${lecture('innovation',15,15)} ${lecture('innovation',48,48)}`),
  proposal:()=>section('Schwächste belegbare Einbindung & Empfehlung',weak?`<p>Unter den bewerteten Phasen ist <strong>${esc(weak.name)} (${weak.current}/3)</strong> am schwächsten eingeordnet. ${data.involvement.filter(p=>p.current===null).length} Phasen bleiben offen und sind zunächst zu untersuchen.</p>${innovationRecommendation(weak)}<button class="button" data-ca-candidate="innovation">${state.actions.some(a=>a.originId==='course-innovation')?'Maßnahmenvorschlag aktualisieren':'Als Maßnahmenvorschlag übernehmen'}</button>`:'<p>Keine bewertete Phase. Zunächst Belege ergänzen; aus offenen Werten wird keine schwächste Stelle berechnet.</p>'),
  campaign:()=>section('Entwurf einer Crowdsourcing-Kampagne',`${Object.entries({goal:'Ziel',audience:'Zielgruppe',incentive:'Anreiz',rules:'Regeln & Rechte',selection:'Bewertung',feedback:'Rückmeldung'}).map(([key,title])=>text('campaign.'+key,title,data.campaign[key],editing)).join('')}<p class="scope-note">Vorgeschlagenes Format: Customer Advisory Panel mit Co-Creation, keine bereits durchgeführte Kampagne. Risiko: selbstselektierte Teilnehmende; verschiedene Projektkundensegmente gezielt berücksichtigen.</p>${lecture('innovation',30,30)} ${lecture('innovation',45,45)}`),
  scenario:()=>innovationScenarioView(state)
 };
 return view?views[view]():Object.entries(views).filter(([id])=>id!=='scenario').map(([,render])=>render()).join('');
}
const projectListEffects=[
 ['customer','journey',4,'Die digitale Kundenreise muss vom Projektstart bis zum Abschluss durchgängig verbunden sein. Übergaben und nächste Schritte müssen automatisch gesteuert werden.']
];
const innovationEffects=[
 ['customer','development',2,'Digitale Nutzungsspuren müssen ausgewertet werden und Kunden müssen aktiv an Ideen und Produkttests mitwirken.']
];
function applyScenario(state,effects){
 const groups=structuredClone(state.model);
 const changes=[];
 for(const [group,id,value,why] of effects){
  const criterion=groups.find(entry=>entry.id===group).criteria.find(entry=>entry.id===id);
  const before=criterion.current;
  if(before!==null&&before>=value)continue;
  criterion.current=value;
  changes.push({name:criterion.name,before,value,why});
 }
 return {groups,changes};
}
export function customerScenario(state){
 const {scenarioJourney,scenarioInnovation}=state.customerAnalysis;
 return applyScenario(state,[
  ...(scenarioJourney?projectListEffects:[]),
  ...(scenarioInnovation?innovationEffects:[])
 ]);
}
function scenarioChart(state,scenario){
 const before=state.model.map(group=>({name:group.name,value:mean(group.criteria,'current')}));
 const after=scenario.groups.map(group=>mean(group.criteria,'current'));
 const xy=(index,value)=>[160+Math.cos(-Math.PI/2+index*2*Math.PI/before.length)*90*value/4,137+Math.sin(-Math.PI/2+index*2*Math.PI/before.length)*90*value/4];
 const points=values=>values.map((value,index)=>xy(index,value).join(',')).join(' ');
 const series=(values,kind,label)=>{
  const polygon=values.every(value=>value!==null)?`<polygon points="${points(values)}" class="ca-${kind}"/>`:'';
  return polygon+values.map((value,index)=>{
   if(value===null)return '';
   const [x,y]=xy(index,value);
   return `<circle class="ca-${kind}" cx="${x}" cy="${y}" r="4"><title>${esc(before[index].name)} · ${label} ${fmt(value)}</title></circle>`;
  }).join('');
 };
 return `<div class="ca-scenario-layout">
  <svg viewBox="0 0 320 260" role="img" aria-label="Netzdiagramm zur Reifegradwirkung. Werte stehen in der Tabelle daneben.">
   ${[1,2,3,4].map(level=>`<polygon points="${points(before.map(()=>level))}" class="ca-grid"/><text x="169" y="${xy(0,level)[1]+5}">${level}</text>`).join('')}
   ${before.map((group,index)=>{
    const [x,y]=xy(index,4);
    const [labelX,labelY]=xy(index,4.75);
    return `<line x1="160" y1="137" x2="${x}" y2="${y}" class="ca-grid"/><text x="${labelX}" y="${labelY}" text-anchor="middle">${esc(group.name)}</text>`;
   }).join('')}
   ${series(before.map(group=>group.value),'current','Ist')}
   ${scenario.changes.length?series(after,'target','Szenario'):''}
  </svg>
  <div>
   <div class="chart-legend"><span class="status-tag orange">Ist</span>${scenario.changes.length?'<span class="status-tag pink">Szenario</span>':''}</div>
   <table class="matrix ca-scenario-table"><thead><tr><th scope="col">Bereich</th><th scope="col">Ist</th>${scenario.changes.length?'<th scope="col">Szenario</th>':''}</tr></thead>
    <tbody>${before.map((group,index)=>`<tr><th scope="row">${esc(group.name)}</th><td>${fmt(group.value)}</td>${scenario.changes.length?`<td>${fmt(after[index])}</td>`:''}</tr>`).join('')}</tbody>
   </table>
   <p>Mittelwerte der bewerteten Kriterien, Skala 1 bis 4. Die Ist-Bewertung im digitalen Reifegrad bleibt unverändert.</p>
  </div>
 </div>`;
}
function scenarioChanges(scenario,empty){
 return section('Voraussetzungen für höhere Stufen',scenario.changes.length?`<dl class="ca-recommendation-fields">
  ${scenario.changes.map(change=>`<dt>${esc(change.name)} · ${fmt(change.before)} → ${change.value}</dt><dd>${esc(change.why)}</dd>`).join('')}
 </dl>`:`<p>${empty}</p>`);
}
function journeyScenarioView(state,proposals){
 const data=state.customerAnalysis;
 const segmentId=activeJourneySegment??'all';
 const highest=rankedJourneyPainPoints(data,segmentId)[0];
 const segmentLabel=personaSegments[segmentId]??'Alle Segmente';
 const idea=proposals.find(proposal=>proposal.id==='project');
 const scenario=applyScenario(state,data.scenarioJourney?projectListEffects:[]);
 const candidateExists=state.actions.some(action=>action.originId==='course-journey');
 return section('Projektübergabe zwischen App, Markt und Bestellung',`
  <p>Beim Planen und Kaufen kann der Projektkontext zwischen den Kanälen verloren gehen. Eine gemeinsame Projektliste kann Artikel, Mengen und Änderungen aus der Beratung für die Bestellung verfügbar halten.</p>
  ${idea?`<p class="ca-scenario-idea">Entwicklungsvorschlag: ${developmentIdeaLink(idea)}</p>`:''}
  <p>Eine gemeinsame Liste verbessert die Übergabe. Für Stufe 4 muss zusätzlich der gesamte digitale Projektablauf durchgängig verbunden sein und Übergaben und nächste Schritte automatisch steuern. Das Netzdiagramm zeigt dieses Zielbild als Szenario.</p>
  <div class="ca-scenario-options"><label><input id="ca-scenario-journey-toggle" type="checkbox" data-ca-scenario="scenarioJourney"${data.scenarioJourney?' checked':''}> Durchgängigen Projektablauf als Szenario einblenden</label></div>
  ${scenarioChart(state,scenario)}`)
  +scenarioChanges(scenario,data.scenarioJourney?'Die aktuelle Bewertung erreicht die hinterlegte Szenariostufe bereits.':'Das Netzdiagramm zeigt den Ist-Stand. Blende das Szenario für den Vergleich ein.')
  +section('Priorisierter Maßnahmenkandidat',`<article class="ca-phase-card ca-scenario-focus">
   <div class="tag-row"><span class="status-tag">${esc(segmentLabel)}</span><span class="status-tag">Phase ${esc(highest.phase.name)}</span><span class="status-tag orange">${highest.severity}/5</span></div>
   <p>${esc(highest.measure)}</p>
   <div class="tag-row">
    <button type="button" class="button small secondary" data-journey-tab="optimization">Zu Pain Points &amp; Optimierung</button>
    <button type="button" class="button small" id="ca-journey-scenario-candidate" data-ca-candidate="journey">${candidateExists?'Maßnahmenkandidat aktualisieren':'Als Maßnahmenkandidat übernehmen'}</button>
   </div>
  </article>`)
  +`<p class="method-caption">${lecture('journey',81,84)} ${lecture('journey',82,85)}</p>`;
}
function innovationScenarioView(state){
 const enabled=state.customerAnalysis.scenarioInnovation;
 const scenario=applyScenario(state,enabled?innovationEffects:[]);
 return section('Mögliche Wirkung auf den Reifegrad',`<p>Das Szenario betrachtet die aktive Kundenbeteiligung an digitalen Konzept- und Produkttests.</p>
 <div class="ca-scenario-options"><label><input id="ca-scenario-innovation-toggle" type="checkbox" data-ca-scenario="scenarioInnovation"${enabled?' checked':''}> Digitale Konzept- und Produkttests</label></div>
 ${scenarioChart(state,scenario)}`)+scenarioChanges(scenario,enabled?'Der Ist-Wert liegt bereits auf oder über der hinterlegten Szenariostufe.':'Aktiviere die Produkttests, um die Voraussetzung zu sehen.');
}
export function renderCustomerAnalysis(state,context,view){
 if(view==='journey')return `<section class="maturity-folder journey-folder">
  <div class="folder-tabs" role="tablist" aria-label="Customer-Journey-Ansichten">${journeyTabs.map(([id,label])=>`<button type="button" role="tab" id="journey-tab-${id}" data-journey-tab="${id}" aria-selected="${activeJourneyTab===id}" tabindex="${activeJourneyTab===id?0:-1}" aria-controls="journey-folder-content">${label}</button>`).join('')}</div>
  <div class="folder-content" id="journey-folder-content" role="tabpanel" aria-labelledby="journey-tab-${activeJourneyTab}" tabindex="0">${journeyView(state,context,activeJourneyTab)}</div>
 </section>`;
 if(view)return `<div class="ca-content">${innovationView(state,context)}${innovationScenarioView(state)}</div>`;
 return `<div class="ca-tabs" role="tablist" aria-label="Kundenanalyse"><button class="button secondary" role="tab" id="ca-tab-journey" aria-controls="ca-content" aria-selected="${subview==='journey'}" data-ca-view="journey">Customer Journey</button><button class="button secondary" role="tab" id="ca-tab-innovation" aria-controls="ca-content" aria-selected="${subview==='innovation'}" data-ca-view="innovation">Open Innovation</button></div><div id="ca-content" role="tabpanel" aria-labelledby="ca-tab-${subview}">${subview==='journey'?journeyView(state,context)+journeyScenarioView(state,context.developmentProposals??[]):innovationView(state,context)+innovationScenarioView(state)}</div>`;}
async function personaImage(file){
 const image=await createImageBitmap(file);
 try{
  const scale=Math.min(1,480/Math.max(image.width,image.height));
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(image.width*scale));
  canvas.height=Math.max(1,Math.round(image.height*scale));
  const context=canvas.getContext('2d',{alpha:false});
  context.fillStyle='#fff';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.drawImage(image,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/jpeg',.82);
 }finally{
  image.close();
 }
}
export function readPersonaImage(value){
 if(typeof value!=='string'||value.length>350000||(value&&!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value))){
  throw new Error('Das Persona-Bild ist ungültig.');
 }
 return value;
}
export async function handleCustomerAnalysisEvent(event,state,{save,render,toast}){
 const el=event.target;
 if(event.type==='click'&&!el.closest('.ca-segment-filter')){
  globalThis.document?.querySelector('#panel-kunden .ca-segment-filter[open]')?.removeAttribute('open');
 }
 if(!el.closest('#panel-kunden')&&!el.closest('#panel-innovation'))return;
 if(event.type==='submit'&&el.matches('[data-ca-persona-form]')){
  if(event.submitter?.formMethod==='dialog')return;
  event.preventDefault();
  const nameInput=el.elements.namedItem('name');
  const name=nameInput.value.trim();
  if(!name){
   toast('Bitte einen Namen eingeben.');
   nameInput.focus();
   return;
  }
  const segmentInput=el.elements.namedItem('segment');
  const segment=segmentInput.value;
  if(!Object.hasOwn(personaSegments,segment)){
   segmentInput.focus();
   return;
  }
  const ageInput=el.elements.namedItem('age');
  const age=ageInput.value.trim();
  if(!validPersonaAge(age)){
   ageInput.focus();
   return;
  }
  const persona={...additionalPersonaDefaults,name,age,segment};
  for(const [key,label] of personaFields){
   const input=el.elements.namedItem(key);
   const value=input.value.trim();
   if(!value){
    input.setCustomValidity('Bitte fülle „'+label+'“ aus.');
    input.reportValidity();
    return;
   }
   persona[key]=value;
  }
  const imageInput=el.elements.namedItem('image');
  const file=imageInput.files[0];
  let image='';
  if(file){
   const submit=el.querySelector('button');
   if(submit.disabled)return;
   submit.disabled=true;
   try{
    image=readPersonaImage(await personaImage(file));
   }catch{
    if(el.isConnected&&el.closest('dialog').open){
     imageInput.setCustomValidity('Dieses Bild konnte nicht geöffnet werden. Bitte wähle ein anderes Bild.');
     imageInput.reportValidity();
    }
    return;
   }finally{
    submit.disabled=false;
   }
   if(!el.isConnected||!el.closest('dialog').open||imageInput.files[0]!==file)return;
  }
  state.customerAnalysis.additionalPersonas.push({...persona,image});
  save();
  render();
  document.querySelector('[data-ca-add-persona]')?.focus({preventScroll:true});
  toast('Persona hinzugefügt.');
  return;
 }
 if(event.type==='input'&&el.matches('[data-ca-persona-form] textarea'))el.setCustomValidity('');
 if(event.type==='change'&&el.matches('[data-ca-persona-image]'))el.setCustomValidity('');
 if(event.type==='click'&&el.closest('[data-ca-add-persona]')){
  const dialog=document.getElementById('ca-persona-dialog');
  dialog.querySelector('form').reset();
  dialog.querySelectorAll('textarea, [data-ca-persona-image]').forEach(input=>input.setCustomValidity(''));
  dialog.showModal();
  return;
 }
 const tab=el.closest('[data-journey-tab]');
 if(tab&&(event.type==='click'||event.type==='keydown')){
  let next=journeyTabs.findIndex(([id])=>id===tab.dataset.journeyTab);
  if(event.type==='keydown'){
   switch(event.key){
    case 'ArrowLeft': next=(next+journeyTabs.length-1)%journeyTabs.length; break;
    case 'ArrowRight': next=(next+1)%journeyTabs.length; break;
    case 'Home': next=0; break;
    case 'End': next=journeyTabs.length-1; break;
    default: return;
   }
   event.preventDefault();
  }
  activeJourneyTab=journeyTabs[next][0];
  render();
  document.getElementById('journey-tab-'+activeJourneyTab)?.focus();
  return;
 }
 if(event.type==='click'){
  const metricButton=el.closest('[data-ca-metric]');
  if(metricButton){
   activeJourneyMetric=metricButton.dataset.caMetric;
   render();
   globalThis.document?.getElementById(metricButton.id)?.focus({preventScroll:true});
   return;
  }
  const segmentButton=el.closest('[data-ca-segment]');
  if(segmentButton){
   activeJourneySegment=segmentButton.dataset.caSegment;
   render();
   globalThis.document?.getElementById(segmentButton.dataset.caSegmentTrigger)?.focus({preventScroll:true});
   return;
  }
  const layerButton=el.closest('[data-ca-mode]');
  const layer=layerButton?.getAttribute('data-ca-mode');
  if(layer){
   if(!visibleJourneyLayers.delete(layer))visibleJourneyLayers.add(layer);
   render();
   globalThis.document?.getElementById(layerButton.id)?.focus({preventScroll:true});
   return;
  }
  for(const [attr,set] of [['data-ca-view',v=>subview=v],['data-ca-filter',v=>exampleFilter=v]]){const button=el.closest('['+attr+']');if(button){set(button.getAttribute(attr));render();return;}}
  const candidate=el.closest('[data-ca-candidate]');
  if(candidate){
   const kind=candidate.dataset.caCandidate;
   const id='course-'+kind;
   const existing=state.actions.find(action=>action.originId===id);
   if(!existing&&state.actions.length>=40){toast('Höchstens 40 Maßnahmen möglich.');return;}
   const data=state.customerAnalysis;
   const journey=kind==='journey';
   const segmentId=activeJourneySegment??'all';
   const segmentLabel=personaSegments[segmentId]??'Alle Segmente';
   const pain=journey?rankedJourneyPainPoints(data,segmentId)[0]:null;
   const involvement=journey?null:weakestInvolvement(data);
   if(!pain&&!involvement)return;
   const action={
    id,originId:id,
    name:journey?`Journey: ${pain.phase.name} (${segmentLabel})`:`Open Innovation: ${involvement.name} – Kundenpanel`,
    owner:'Digital Commerce / Marktberatung · vorgeschlagen',
    phase:'0–3 Monate',
    status:existing?.status||'Geplant',
    impact:4,effort:3,risk:3,
    deliverable:journey?pain.measure:involvement.measure,
    gate:journey?pain.metric:'Zehn verwertbare Ideen in acht Wochen, zwei fachlich geprüfte Prototypverbesserungen.',
    depends:'Konzeptioneller Vorschlag. Freigabe, Datenzugang und Teilnehmende erforderlich.',
    situation:journey?pain.pain:involvement.evidence,
    rationale:journey?`Höchstbewerteter Schmerzpunkt (${pain.severity}/5) im ausgewählten Kundensegment. Die Maßnahme wird im Pilot geprüft.`:'Schwächste bewertete Phase der Kundeneinbindung. Offene Phasen zunächst belegen.',
    reference:journey?`Lemon & Verhoef (2016), Termin 4, Folien 84–86, GB 2025/26, S. ${pain.phase.pages}`:'Chesbrough (2003), Termin 5, Folien 47–49, GB 2025/26, S. 190, 195–196.',
    effect:journey?'Kundennutzen im Pilot messen und den Nachweis für das betroffene Reifegradkriterium getrennt führen.':'Wirkung der Kundeneinbindung nach den Konzept- und Produkttests prüfen.',
    risks:journey?pain.phase.risk:'Rekrutierung, Datenqualität, Nutzungsrechte, Kosten und Integrationsaufwand.'
   };
   if(existing)Object.assign(existing,action,{id:existing.id});
   else state.actions.push(action);
   save();render();
   globalThis.document?.getElementById(candidate.id)?.focus({preventScroll:true});
   toast('Begründeter Vorschlag in Maßnahmen übernommen.');
   return;
  }
 }
 const set=(path,value)=>{const keys=path.split('.'),last=keys.pop();keys.reduce((o,k)=>o[k],state.customerAnalysis)[last]=value;};
 if(event.type==='input'&&el.dataset.caText){
  if(el.dataset.caText.endsWith('.age')&&!validPersonaAge(el.value))return;
  set(el.dataset.caText,el.value);save();return;
 }
 if(event.type==='change'&&el.dataset.caScore){const value=el.value===''?null:Number(el.value),min=Number(el.dataset.min),max=Number(el.dataset.max);if(value!==null&&(!Number.isInteger(value)||value<min||value>max)){toast('Ungültiger Skalenwert.');render();return;}if(el.dataset.caScore.endsWith('.severity')&&value===null){toast('Die Schmerzpunktpriorisierung benötigt einen Wert von 1 bis 5.');render();return;}const path=el.dataset.caScore;
  set(path,value);save();render();
  const control=globalThis.document?.querySelector(`[data-ca-score="${path}"]`);
  const editor=control?.closest('.ca-experience-edit');
  if(editor)editor.open=true;
  control?.focus({preventScroll:true});
  return;
 }
 if(event.type==='change'&&el.dataset.caScenario){
  state.customerAnalysis[el.dataset.caScenario]=el.checked;
  save();render();
  globalThis.document?.getElementById(el.id)?.focus({preventScroll:true});
 }
}
function validPersonaAge(age){
 return /^\d+$/.test(age)&&Number.isSafeInteger(Number(age));
}
export function validateCustomerAnalysis(data){
 for(const persona of data.additionalPersonas){
  if(persona.segment&&!Object.hasOwn(personaSegments,persona.segment))throw new Error('Ungültiges Kundensegment.');
  if(persona.age&&!validPersonaAge(persona.age))throw new Error('Ungültiges Alter für die Persona.');
 }
 for(const [key,list] of [['journey',data.journey],['involvement',data.involvement],['examples',data.examples]])if(list.some((d,i)=>d.id!==CUSTOMER_ANALYSIS[key][i].id))throw new Error('Analyseeinträge dürfen nicht ausgetauscht werden.');
 for(const d of data.examples){if(!['Outside-in','Inside-out','Coupled'].includes(d.type)||!['Belegt','Vorschlag'].includes(d.status))throw new Error('Ungültige Innovationseinordnung.');if(d.sourceUrl&&!/^https?:\/\//i.test(d.sourceUrl))throw new Error('Ungültige Quellen-URL.');}

 for(const phase of [...data.journey,...Object.values(data.segmentExperience).flat()]){
  if(phase.severity!==null&&(!Number.isInteger(phase.severity)||phase.severity<1||phase.severity>5))throw new Error('Ungültige Schmerzpunktpriorität.');
  for(const key of experienceScores){
   const value=phase[key];
   if(value!==null&&(!Number.isInteger(value)||value<1||value>5))throw new Error('Journey-Skalen müssen zwischen 1 und 5 liegen.');
  }
 }
 if(data.journey.some(phase=>phase.severity===null))throw new Error('Ungültige Schmerzpunktpriorität.');
 for(const p of data.involvement)for(const key of ['current','target'])if(p[key]!==null&&(!Number.isInteger(p[key])||p[key]<0||p[key]>3))throw new Error('Kundeneinbindung muss zwischen 0 und 3 liegen.');
 for(const x of data.examples)if(!['Outside-in','Inside-out','Coupled'].includes(x.type)||!['Belegt','Vorschlag'].includes(x.status)||x.sourceUrl&&!/^https?:\/\//i.test(x.sourceUrl))throw new Error('Ungültiges Open-Innovation-Beispiel.');
}
