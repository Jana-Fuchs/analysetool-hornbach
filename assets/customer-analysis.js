// Termin 4/5: independent analysis state; earlier analysis modules remain unchanged.
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=v=>v===null?'Offen':new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(v);
const date='18.11.2026';
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
 innovationConclusion:'HORNBACH nutzt Kundenfeedback und externes Fachwissen, um Sortiment und Services intern weiterzuentwickeln. Damit ist vor allem Outside-in belegt. Ob Kunden regelmäßig mitentwickeln, bleibt offen.',
 examples:[
  {id:'seniovo',name:'Zukauf von Seniovo',type:'Outside-in',status:'Belegt',description:'HORNBACH erwarb das auf barrierefreie Badumbauten spezialisierte Start-up und integrierte dessen Angebot in sein Serviceportfolio.',limit:'Der Zukauf zeigt, wie externes Fachwissen und ein bestehendes Serviceangebot ins Unternehmen gelangen.',sourceUrl:'',sourceDate:'',pages:'46, 72'},
  {id:'feedback',name:'Kundenwissen aus Service und Befragungen',type:'Outside-in',status:'Belegt',description:'HORNBACH wertet Kundenbefragungen und Beschwerden aus, um Auffälligkeiten bei Produkten, Sortiment und Services zu erkennen.',limit:'Kunden liefern Hinweise für die interne Weiterentwicklung. Ob sie auch an Konzepten oder Prototypen mitarbeiten, bleibt anhand dieser Belege offen.',sourceUrl:'',sourceDate:'',pages:'190, 193, 195–196'},
  {id:'cocreation',name:'Projektlabor mit Kunden und Handwerksbetrieben',type:'Coupled',status:'Vorschlag',description:'Kunden, Fachberatung und Partner entwickeln und testen gemeinsam die digitale Projektliste; Erkenntnisse werden in beide Richtungen geteilt.',limit:'Konzeptioneller Vorschlag dieser Analyse, kein belegtes HORNBACH-Programm. Gemeinsame Entwicklung und Regeln zur Verwertung wären Voraussetzung.',sourceUrl:'',sourceDate:date,pages:''},
  {id:'standard',name:'Freigabe eines Projektlisten-Datenformats',type:'Inside-out',status:'Vorschlag',description:'Ein dokumentiertes Format für Materiallisten könnte Partnern ermöglichen, eigene kompatible Hilfen zu entwickeln.',limit:'Keine belegte offene HORNBACH-Schnittstelle. Ein reiner Datenexport ist noch keine Verwertung geistigen Eigentums; Lizenz, Nutzen und Rückfluss wären zu prüfen.',sourceUrl:'',sourceDate:date,pages:''}
 ],
 involvement:[
  {id:'ideas',name:'Ideenfindung',current:2,target:3,currentReference:'',targetReason:'Kunden sollen bei der Auswahl und Weiterentwicklung von Ideen mitwirken.',evidence:'Kundenbefragungen und Servicefeedback liefern Input. Die Zuordnung zu systematischem Feedback ist eine vorläufige Interpretation; eine repräsentative Innovationscommunity ist nicht belegt.',measure:'Ein freiwilliges Projektkunden-Panel ergänzt Befragungen um priorisierte Verbesserungsideen.'},
  {id:'concept',name:'Konzeptentwicklung',current:1,target:2,currentReference:'',targetReason:'Strukturierte Tests sollen zeigen, ob das Konzept die Anforderungen der Kunden erfüllt.',evidence:'Ein Einfluss auf die Weiterentwicklung ist beschrieben; gemeinsames digitales Konzeptdesign ist nicht nachgewiesen. Stufe 1 ist eine vorsichtige Arbeitshypothese, kein Nachweis fehlender Beteiligung.',measure:'Kunden und Fachberatung testen zwei Projektlisten-Prototypen in moderierten Sitzungen.'},
  {id:'prototype',name:'Prototypentest',current:1,target:2,currentReference:'',targetReason:'Ein geplanter Test soll vor der Einführung konkrete Schwächen im Ablauf aufdecken.',evidence:'HORNBACH nutzt Kundenrückmeldungen zur Weiterentwicklung. Für Prototypen ist punktuelle Rückmeldung plausibel. Strukturierte Kundentests sind in den ausgewerteten Geschäftsberichten nicht belegt.',measure:'Einen klickbaren Prototyp mit freiwilligen Kunden prüfen und Entscheidungen dokumentieren.'},
  {id:'launch',name:'Markteinführung',current:1,target:2,currentReference:'',targetReason:'Rückmeldungen aus einer begrenzten Einführung sollen Verbesserungen vor dem breiteren Einsatz ermöglichen.',evidence:'Über Kundenservice und Befragungen kann es bei neuen Angeboten punktuelle Rückmeldungen geben. Ob Kunden bei der Einführung gezielt beteiligt werden oder Feedback über die weitere Einführung entscheidet, ist nicht belegt.',measure:'Vor Ausweitung eines Tests die Verständlichkeit und Aufgabenerfüllung durch Kunden bewerten lassen.'},
  {id:'improve',name:'Weiterentwicklung',current:2,target:3,currentReference:'',targetReason:'Kunden sollen an der Auswahl und Bewertung von Verbesserungen beteiligt werden.',evidence:'Kundeninteraktionen und Reklamationen werden systematisch ausgewertet. Gemeinsame Priorisierung und Rückmeldung an eine dauerhafte Innovationscommunity sind nicht belegt.',measure:'Die Umsetzung ausgewählter Kundenideen und ihre Wirkung an die Teilnehmenden zurückmelden.'}
 ],
 campaign:{
  goal:'Bei welchen Schritten verliert ihr beim Renovieren den Überblick über Material und Mengen? Was müsste eine gemeinsame Projektliste können, damit ihr sie in der Marktberatung und bei der Bestellung weiterverwenden könnt?',
  audience:'Freiwilliger Aufruf an Projektkunden, besonders private Heimwerker mit einem laufenden oder abgeschlossenen Renovierungsvorhaben.',
  incentive:'Teilnehmende können ausgewählte Ideen im Prototyp wiederfinden und erhalten eine Rückmeldung zur Auswahl.',
  rules:'Kurze Beiträge über ein Formular einreichen. Keine persönlichen Daten, fremden Baupläne oder vertraulichen Projektunterlagen teilen. Nutzungsrechte und Moderation vorab erläutern.',
  selection:'Kunden bewerten den Nutzen der Beiträge. Marktberatung und Digital Commerce prüfen Machbarkeit und wählen Vorschläge für den Prototyp aus.',
  feedback:'Eingang bestätigen. Innerhalb von vier Wochen zurückmelden, welche Vorschläge weiterverfolgt werden und warum.',
  risk:'Besonders aktive Kunden können die Rückmeldungen dominieren. Beiträge nach Erfahrung und Projektart auswerten und bei unterrepräsentierten Gruppen gezielt nachfragen.'
 },
 involvementPriority:'',
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
let subview='journey';
const innovationFlows={
 'Outside-in':'HORNBACH nimmt Wissen von außen auf, etwa Kundenfeedback oder Fachwissen von Partnern.',
 'Inside-out':'HORNBACH stellt eigenes Wissen oder eigene Lösungen anderen zur Weiterverwendung bereit.',
 'Coupled':'HORNBACH und externe Partner entwickeln gemeinsam Lösungen und tauschen Wissen in beide Richtungen aus.'
};
const visibleInnovationFlows=new Set(Object.keys(innovationFlows));
const section=(title,body,className='')=>`<section class="ca-section${className?' '+className:''}">${title?`<h2>${title}</h2>`:''}${body}</section>`;
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
   ${phases.map((phase,index)=>`<text x="${x(index)}" y="215" text-anchor="middle"${index===activePhase?' class="ca-experience-phase-active"':''}>${esc(phase.name)}</text>`).join('')}
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
  ${editing?`<div class="ca-experience-edit" role="group" aria-label="Kundenerlebnis bewerten">
   ${Object.entries(journeyMetrics).map(([id,label])=>`<div class="ca-experience-rating" role="group" aria-label="${label}">
    <h5>${label}</h5>
    <div class="ca-experience-values">
     ${visible.map(([layer,stage])=>scale(path+'.'+layer+id,stage,phase[layer+id],1,5)).join('')}
    </div>
   </div>`).join('')}
  </div>`:''}
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
 <button type="button" class="button small ca-add-persona" data-ca-add-persona>Weitere Persona hinzufügen</button>
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

const journeyFieldGuidance={
 pain:'Eine konkrete Hürde, die Kunden in dieser Phase Zeit, Aufwand oder Sicherheit kostet.',
 action:'Was HORNBACH an diesem Kontaktpunkt konkret tut, etwa beraten, informieren oder eine Bestellung bereitstellen.',
 moment:'Ein entscheidender Moment, der beeinflusst, ob und wie Kunden weitermachen.',
 future:'Wie Kunden die Phase nach einer Verbesserung erleben sollen.',
 opportunity:'Welche konkrete Änderung die Hürde für Kunden verringern könnte.',
 risk:'Was die Umsetzung erschweren oder die Wirkung der Maßnahme begrenzen könnte.',
 metric:'Woran sich erkennen und messen lässt, ob die Maßnahme wirkt.'
};
function journeyPhase(data,phase,index,{editing}){
 const path=`journey.${index}`;
 const segment=journeySegments[activeJourneySegment]?.[index];
 const [online,offline,pain,moment,future]=segment??[phase.online,phase.offline,phase.pain,phase.moment,phase.future];
 const segmentSelected=activeJourneySegment!==null;
 const field=(key,label,value=phase[key])=>text(
  `${path}.${key}`,label,segmentSelected?value:journeyFieldGuidance[key],segmentSelected&&editing&&!segment
 );
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
    ${segmentSelected?`<div class="ca-touchpoints">
     ${field('online','Online',online)}
     ${field('offline','Offline',offline)}
    </div>`:'<div class="ca-field"><p>Touchpoints sind Kontaktpunkte, an denen Kunden mit HORNBACH oder dem Angebot in Berührung kommen, etwa in der App, im Markt oder bei einer Beratung.</p></div>'}
   </div>
   <div class="ca-phase-card">
    ${field('pain','Pain Point',pain)}
    ${segmentSelected?scale(segment?`segmentExperience.${activeJourneySegment}.${index}.severity`:`${path}.severity`,'Bewertung (1 gering bis 5 hoch)',journeyPainPoint(data,index,activeJourneySegment).severity,1,5):''}
   </div>
   <div class="ca-phase-card-stack">
    <div class="ca-phase-card">${field('action','Actions von HORNBACH')}</div>
    <div class="ca-phase-card">${field('moment','Moment of Truth',moment)}</div>
   </div>
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
 });
 return section('',`${filter}
  <div class="ca-phase-grid ca-optimization-grid">${cards.slice(0,2).join('')}</div>
  ${cards.length>2?`<details class="ca-optimization-more">
   <summary>Weitere Pain Points</summary>
   <div class="ca-phase-grid ca-optimization-grid">${cards.slice(2).join('')}</div>
  </details>`:''}`);
}

function journeyView(state,context,tab){
 const data=state.customerAnalysis;
 const views={
  persona:()=>personaView(data,context.editing),
  map:()=>section('',`${journeyBoard(data.journey)}
  ${data.journey.map((phase,index)=>journeyPhase(data,phase,index,context)).join('')}`),
  optimization:()=>journeyOptimization(data,context.developmentProposals??[]),
  scenario:()=>journeyScenarioView(state,context.cite)
 };
 return tab?views[tab]():journeyTabs.slice(0,-1).map(([id])=>views[id]()).join('');
}
const involvementLevels=[
 'Es ist belegt, dass Kunden in dieser Phase nicht einbezogen werden.',
 'Kunden geben punktuell Rückmeldung oder bringen einzelne Ideen ein.',
 'HORNBACH holt systematisch Kundenfeedback ein oder führt strukturierte Tests mit Kunden durch.',
 'Kunden entwickeln Ideen, Konzepte oder Lösungen gemeinsam mit HORNBACH weiter.'
];
let pendingInvolvementRating=null;
let pinnedInvolvementStage=null;
let involvementAssignment=null;

function involvementRatingForm(pending,phase,label){
 const target=pending.key==='target';
 const value=pending.value===null?'Keine Einstufung':'Stufe '+pending.value;
 return `<form class="rating-change-reason" data-ca-involvement-rating>
  <p><strong>${label} · ${value}</strong></p>
  <label><span>Begründung</span><textarea name="reason" id="ca-involvement-reason" rows="3" maxlength="10000" required>${pending.value===phase[pending.key]?esc(target?phase.targetReason:phase.evidence):''}</textarea></label>
  ${target?`<label><span>Maßnahme</span><textarea name="measure" rows="3" maxlength="10000" required>${pending.value===phase.target?esc(phase.measure):''}</textarea></label>`:
   `<label><span>Quelle (optional)</span><input name="source" maxlength="10000" value="${pending.value===phase.current?esc(phase.currentReference):''}"></label>`}
  <div class="rating-change-actions"><button type="submit" class="button small">Übernehmen</button><button type="button" class="button small secondary" data-ca-involvement-cancel>Abbrechen</button></div>
 </form>`;
}

let selectedInvolvementPhase='ideas';
function involvementStageBubble(phase,index,value,stageId,sides,cite){
 const pinned=pinnedInvolvementStage===stageId;
 return `<div id="${stageId}-reason" class="stage-bubble stage-preview${pinned?' is-open':''}" tabindex="-1">
  <button type="button" class="icon-button" data-ca-involvement-unpin="${stageId}" aria-label="Begründung schließen">×</button>
  ${sides.map(([key,label])=>key==='target'?
   `<h4 class="ca-involvement-target-reason">${label}-Begründung</h4><p>${esc(phase.targetReason)}</p><h4>Maßnahme</h4><p>${esc(phase.measure)}</p>`:
   `<h4 class="ca-involvement-current-reason">${label}-Begründung</h4>
    ${phase.current!==null&&['prototype','launch'].includes(phase.id)?'<span class="status-tag">Schätzung</span>':''}
    <p>${esc(phase.evidence)}</p>
    ${phase.currentReference?`<p><strong>Quelle:</strong> ${esc(phase.currentReference)}</p>`:
      phase.evidence===CUSTOMER_ANALYSIS.involvement[index].evidence?cite('gb26','190, 195–196'):''}`).join('')}
  <div class="rating-change-actions">
   ${journeyLayers.map(([key,label])=>`<button type="button" class="button small ca-involvement-set-${key}" data-ca-involvement-level="${value??''}" data-ca-involvement-side="${key}">${phase[key]===value?label+' bearbeiten':'Als '+label+' setzen'}</button>`).join('')}
  </div>
 </div>`;
}
function involvementStages(phases,{cite}){
 const selectedIndex=phases.findIndex(phase=>phase.id===selectedInvolvementPhase);
 const selected=phases[selectedIndex];
 const cards=phases.map(phase=>`<button type="button" class="ca-involvement-card" id="ca-involvement-${esc(phase.id)}"
  data-ca-involvement-phase="${esc(phase.id)}" aria-expanded="${phase===selected}" aria-controls="ca-involvement-editor">
  <strong>${esc(phase.name)}</strong>
  <span class="ca-involvement-scores">${journeyLayers.map(([key,label])=>`<span class="ca-involvement-score ca-${key}-score">
   <span>${label}</span><b${phase[key]===null?' class="ca-involvement-unknown"':''}>${phase[key]===null?'Nicht belegt':phase[key]}</b>
  </span>`).join('')}</span>
 </button>`).join('');
 return `<div class="ca-involvement-overview">${cards}</div>
  <div id="ca-involvement-editor"${selected?'':' hidden'}>${selected?`
   <section class="panel ca-involvement-editor">
    <header class="ca-involvement-editor-heading">
     <h3>${esc(selected.name)}</h3>
     <button type="button" class="icon-button" data-ca-involvement-phase="${esc(selected.id)}" aria-label="Stufenansicht schließen">×</button>
    </header>
    <div class="ca-involvement-stage-bar">
     ${[...involvementLevels.entries(),[null,'Für diese Bewertung ist keine Stufe festgelegt.']].map(([value,description])=>{
      const sides=journeyLayers.filter(([key])=>selected[key]===value);
      const current=sides.some(([key])=>key==='current'),target=sides.some(([key])=>key==='target');
      const id=`ca-rate-${selected.id}-${value??'open'}`;
      const label=value===null?(current&&!target?'Nicht belegt':target&&!current?'Noch offen':'Nicht belegt / offen'):'Stufe '+value;
      const style=current&&target?'both':current?'current':target?'target':'';
      return `<div class="ca-involvement-stage-item">
       <button type="button" id="${id}" class="stage-card${style?' stage-active ca-stage-'+style:''}" data-ca-involvement-stage="${value??''}"
        ${style?`aria-expanded="${pinnedInvolvementStage===id}" aria-controls="${id}-reason"`:`aria-expanded="${involvementAssignment?.id===id}" aria-controls="ca-involvement-assignment"`}>
        <strong>${label}</strong>
        <span class="ca-involvement-stage-role">${sides.map(([key,side])=>`<span class="ca-involvement-role-${key}">${side}</span>`).join(' und ')}</span>
        <span>${description}</span>
       </button>
       ${style?involvementStageBubble(selected,selectedIndex,value,id,sides,cite):''}
      </div>`;
     }).join('')}
    </div>
    <div id="ca-involvement-assignment" tabindex="-1"${involvementAssignment?'':' hidden'}>${involvementAssignment?`
     <p>${involvementAssignment.value===''?'Keine Einstufung':'Stufe '+involvementAssignment.value} zuordnen</p>
     <div class="rating-change-actions">${journeyLayers.map(([key,label])=>`<button type="button" class="button small ca-involvement-set-${key}" data-ca-involvement-level="${involvementAssignment.value}" data-ca-involvement-side="${key}">Als ${label} setzen</button>`).join('')}</div>
    `:''}</div>
    ${pendingInvolvementRating?involvementRatingForm(pendingInvolvementRating,selected,pendingInvolvementRating.key==='current'?'Ist':'Soll'):''}
   </section>`:''}</div>`;
}
function innovationExamples(examples,cite){
 return `<div class="ca-cards">${examples.map(example=>{
  const documented=example.status==='Belegt';
  const type=example.type==='Coupled'?'Outside-in + Inside-out':example.type;
  return `<article class="panel ca-innovation-example">
   <span class="status-tag ${documented?'orange':'pink'}">${esc(type)}</span>
   <h4>${esc(example.name)}</h4><p>${esc(example.description)}</p>
   <p class="ca-example-interpretation"><strong>${documented?'Was der Fall zeigt':'Was sich damit erproben ließe'}:</strong>${esc(example.limit)}</p>
   ${documented?(example.id==='seniovo'?cite('gb25','46, 72'):cite('gb26','190, 193, 195–196')):''}
  </article>`;
 }).join('')}</div>`;
}
function innovationDistribution(examples){
 const documented=examples.filter(example=>example.status==='Belegt');
 const types=[['Outside-in','var(--orange)'],['Inside-out','var(--magenta)'],['Coupled','#59656b']];
 const counts=types.map(([type,color])=>({type,color,value:documented.filter(example=>example.type===type).length}));
 let end=0;
 const stops=counts.filter(entry=>entry.value>0).map(entry=>{
  const start=end;
  end+=entry.value/documented.length*100;
  return `${entry.color} ${start}% ${end}%`;
 });
 return `<figure class="ca-innovation-distribution">
  ${documented.length?`<div class="ca-innovation-pie" aria-hidden="true" style="background:conic-gradient(${stops.join(', ')})"></div>`:''}
  <figcaption>
   <h3>Anteile der belegten Beispiele</h3>
   <ul>${counts.map(({type,color,value})=>`<li><span class="ca-innovation-dot" style="background:${color}" aria-hidden="true"></span>${type} <strong>${value}${documented.length?' · '+fmt(value/documented.length*100)+' %':''}</strong></li>`).join('')}</ul>
   <p>${documented.length} belegte Fälle aus der Recherche. Ausbauideen zählen hier nicht mit.</p>
  </figcaption>
 </figure>`;
}
function innovationOverview(data,{editing,cite}){
 const evidence=data.examples.filter(example=>example.status==='Belegt'&&
  visibleInnovationFlows.has(example.type));
 const proposals=innovationExpertise(data,visibleInnovationFlows);
 return section('',`
  <div class="ca-innovation-position">
   <h2>Wo steht HORNBACH heute?</h2>
   ${text('innovationConclusion','Einordnung',data.innovationConclusion,editing)}
   ${cite('gb26','190, 193, 195–196')} ${cite('gb25','46, 72')}
  </div>`)
  +section('',`<div class="ca-cards ca-innovation-models">
   <article class="panel"><header class="ca-innovation-model-heading"><h3>Closed Innovation</h3></header><p>Ideen, Entwicklung und Tests bleiben im Unternehmen. Die eigenen Teams entscheiden, welche Ansätze sie weiterverfolgen und wie sie die Ergebnisse nutzen.</p></article>
   <article class="panel ca-innovation-open"><header class="ca-innovation-model-heading"><h3>Open Innovation</h3><span class="status-tag">Bei HORNBACH belegt</span></header><p>Das Unternehmen öffnet gezielt einzelne Schritte der Entwicklung. Externe können Ideen einbringen, Lösungen mitentwickeln oder Ergebnisse für eigene Anwendungen nutzen.</p></article>
  </div>`)
  +section('Beispiele und Vorschläge',`
   <div class="ca-innovation-flows">
    ${Object.entries(innovationFlows).map(([type,description])=>`<div>
     <h3 class="${type==='Outside-in'?'ca-flow-outside':type==='Inside-out'?'ca-flow-inside':'ca-flow-coupled'}"><label for="ca-flow-${type}">
      <input type="checkbox" id="ca-flow-${type}" data-ca-filter="${type}"${visibleInnovationFlows.has(type)?' checked':''}> ${type}
     </label></h3>
     <p>${description}</p>
    </div>`).join('')}
   </div>
   ${evidence.length?innovationExamples(evidence,cite):''}
   ${!visibleInnovationFlows.size?'<p>Wähle mindestens eine Richtung, um Beispiele zu sehen.</p>':''}
   ${visibleInnovationFlows.size&&!evidence.length&&!proposals?'<p>Für diese Auswahl ist kein Fall hinterlegt.</p>':''}
   ${proposals}
   ${innovationDistribution(data.examples)}`,'ca-innovation-examples-section');
}
const innovationIdeaDrafts={
 project:{
  phase:'Konzeptentwicklung und Prototypentest',
  customer:'Private Heimwerker erstellen eine digitale Materialliste, lassen sie im Markt prüfen und übernehmen sie in eine Testbestellung. Sie zeigen, an welchen Stellen Angaben fehlen oder sie Eingaben wiederholen müssen.',
  expert:'Externe Handwerksbetriebe prüfen, welche Angaben zu Mengen, Material und Ausführung für eine brauchbare Projektliste nötig sind. Im Projektlabor überarbeiten sie die Liste gemeinsam mit Kunden und Marktberatung.',
  measure:'Abgebrochene Übergaben und Fehlpositionen je geprüfter Liste erfassen. Dokumentieren, welche Rückmeldungen zu Änderungen am Prototyp führen.'
 },
 advisor:{
  phase:'Konzeptentwicklung und Prototypentest',
  customer:'Projektkunden testen den KI-Assistenten mit eigenen Material- und Planungsfragen. Sie zeigen, welche Antworten unverständlich sind und wann sie eine persönliche Beratung brauchen.',
  expert:'Externe Fachleute prüfen die Antworten an typischen Projektfällen. Gemeinsam mit der Marktberatung legen sie fest, welche Fragen eine fachliche Prüfung oder eine Übergabe an einen Menschen brauchen.',
  measure:'Suchzeit, fachlich korrekte Antworten und sinnvolle Weiterleitungen prüfen. Die Fehler und daraus abgeleiteten Änderungen am Assistenten dokumentieren.'
 },
 availability:{
  phase:'Prototypentest',
  customer:'Projektkunden testen Material- und Lieferterminvorschläge für einen typischen Projektablauf und melden, welche Angaben für ihre Planung fehlen.',
  expert:'Lieferanten und Logistikpartner prüfen, welche Bestandsdaten und Lieferzusagen belastbar sind.',
  measure:'Abweichungen zwischen vorgeschlagenem und tatsächlichem Liefertermin sowie fehlende Positionen erfassen.'
 },
 service:{
  phase:'Konzeptentwicklung',
  customer:'Kunden vergleichen zwei Varianten für Leistungsumfang, Terminstatus und Rückfragen an den ausführenden Betrieb.',
  expert:'Handwerksbetriebe arbeiten mit HORNBACH aus, welche Leistungen, Termine und Zuständigkeiten digital festgehalten werden können.',
  measure:'Prüfen, wie viele Kunden Zuständigkeit und Leistungsumfang richtig verstehen und welche Rückfragen offenbleiben.'
 },
 pro:{
  phase:'Konzeptentwicklung',
  customer:'Gewerbliche Projektkunden testen ein Musterpaket und markieren, welche Leistungen ihren Arbeitsalltag erleichtern und wofür sie zahlen würden.',
  expert:'Externe Gewerke prüfen gemeinsam mit der Marktberatung, welche Zusagen zur Koordination im Arbeitsalltag eingehalten werden können.',
  measure:'Nutzungsabsicht, Zahlungsbereitschaft und die am häufigsten nachgefragten Leistungen erfassen.'
 },
 tools:{
  phase:'Prototypentest',
  customer:'Heimwerker testen die Reservierung für ein konkretes Vorhaben und melden, welche Angaben zu Verfügbarkeit, Preis oder Rückgabe fehlen.',
  expert:'Mietpartner und Werkstattfachleute prüfen Abläufe für Auslastung, Wartung und Übergabe.',
  measure:'Erfolgreiche Reservierungen, ungeklärte Rückfragen und Unterbrechungen durch fehlendes Werkzeug erfassen.'
 }
};
const involvementMeasureIdeas={
 ideas:[
  ['project','Das Kundenpanel sammelt Probleme beim Übertragen der Materialliste und priorisiert gemeinsam, welche Verbesserung zuerst entwickelt wird.'],
  ['advisor','Das Kundenpanel sammelt typische Beratungsfragen und priorisiert, welche der Assistent zuerst abdecken soll.']
 ],
 concept:[
  ['project','Der Projektbegleiter liefert den konkreten Anwendungsfall. Kunden und Fachberatung vergleichen zwei Varianten der Liste und entscheiden, welche Übergabe verständlicher ist.']
 ],
 prototype:[
  ['project','Ein klickbarer Projektbegleiter macht die Übergabe vom Smartphone über die Marktberatung bis zur Bestellung testbar. Die beobachteten Hürden fließen in die nächste Version ein.'],
  ['advisor','Ein Prototyp der KI-Beratung lässt Kunden typische Materialfragen ausprobieren. Unklare Antworten und fehlende Übergaben werden für die Überarbeitung festgehalten.']
 ],
 launch:[
  ['advisor','Vor einem breiteren Start testen Kunden typische Beratungsaufgaben und zeigen, ob sie die Antwort verstehen und bei Bedarf den Weg zur Fachberatung finden.'],
  ['project','Ein begrenzter Test des Projektbegleiters zeigt, ob Kunden ihre Liste im vorgesehenen Ablauf bis zur Bestellung nutzen können.']
 ],
 improve:[
  ['project','Bei der Projektliste kann HORNBACH Teilnehmenden zeigen, welche ihrer Vorschläge umgesetzt wurden und ob dadurch weniger Übergaben abbrechen.'],
  ['advisor','HORNBACH kann Kunden zeigen, welche Rückmeldungen zu verbesserten Antworten oder Weiterleitungen geführt haben, und die Änderungen erneut mit ihnen prüfen.']
 ]
};
function projectCrowdsourcing(campaign,proposal,editing){
 const fields=[
  ['goal','Fragestellung'],['audience','Zielgruppe'],['incentive','Anreiz'],
  ['rules','Regeln'],['selection','Bewertung'],['feedback','Rückmeldung'],['risk','Risiko']
 ];
 return `<details class="ca-involvement-pilot">
  <summary>Crowdsourcing für die Projektliste</summary>
  <div class="ca-involvement-pilot-body">
   <p>Kampagnenentwurf für den ${proposal?developmentIdeaLink(proposal):'digitalen Projektbegleiter'}.</p>
   ${fields.map(([key,label])=>text('campaign.'+key,label,campaign[key],editing)).join('')}
  </div>
 </details>`;
}
function involvementMeasures(data,proposals,editing){
 const project=proposals.find(idea=>idea.id==='project');
 const available=data.involvement.filter(phase=>phase.target!==null&&phase.measure.trim());
 const priority=available.find(phase=>phase.id===data.involvementPriority)
  ??available.filter(phase=>phase.current!==null&&phase.current<phase.target)
   .reduce((lowest,phase)=>!lowest||phase.current<lowest.current?phase:lowest,null);
 const ordered=[...available].sort((a,b)=>Number(b===priority)-Number(a===priority));
 const cards=ordered.map(phase=>{
  const original=CUSTOMER_ANALYSIS.involvement.find(item=>item.id===phase.id);
  const conceptPilot=phase===priority&&phase.id==='concept'&&phase.measure===original?.measure;
  const tied=phase.current!==null&&available.some(other=>other!==phase&&other.current===phase.current&&other.target>other.current);
  const links=phase.measure===original?.measure?involvementMeasureIdeas[phase.id]??[]:[];
  let match;
  for(const [id,contribution] of links){
   const idea=proposals.find(item=>item.id===id);
   if(idea){match={idea,contribution};break;}
  }
  return `<article class="ca-phase-card ca-involvement-measure${phase===priority?' ca-involvement-prioritized':''}">
   <header><h3>${esc(phase.name)}</h3><span class="status-tag pink">Soll · Stufe ${phase.target}</span>${phase===priority?'<span class="status-tag orange">Priorität</span>':''}</header>
   ${text('', 'Maßnahme', phase.measure, false)}
   <div class="ca-field"><h4>Passende Idee</h4><p>${match?developmentIdeaLink(match.idea):'Offen'}</p></div>
   ${match?text('', 'So hilft die Idee', match.contribution, false):''}
   ${phase.id==='ideas'?projectCrowdsourcing(data.campaign,project,editing):''}
   ${conceptPilot?`<p class="scope-note ca-involvement-priority-reason"><strong>Warum zuerst?</strong> ${tied?`Mehrere Phasen liegen bei Ist-Stufe ${phase.current}. `:''}In der Konzeptentwicklung können Kunden die Projektliste mitgestalten, bevor HORNBACH sich auf eine Variante festlegt.</p>
   <details class="ca-involvement-pilot">
    <summary>Priorisierter Pilotversuch</summary>
    <div class="ca-involvement-pilot-body">
     ${text('', 'Umsetzung', 'Digital Commerce und Marktberatung vergleichen innerhalb von drei Monaten zwei Varianten der Projektliste mit zehn freiwilligen Projektkunden.', false)}
     ${text('', 'Begründung', 'Moderierte Tests zeigen, wo Kunden bei der Übergabe hängen bleiben. Ein reines Online-Voting kann eine bevorzugte Variante zeigen, liefert aber weniger Einblick in die Ursachen.', false)}
     ${text('', 'Zielwerte', 'Mindestens acht von zehn Testpersonen übertragen eine Liste ohne Hilfe. Mindestens zwei wiederkehrende Hürden werden vor dem nächsten Test behoben und dokumentiert.', false)}
     ${text('', 'Erhebung', 'Je Variante im Testprotokoll zählen, wie viele Personen die Liste ohne Hilfe übertragen. Wiederkehrende Hürden mit einer eindeutigen Kennung erfassen und in der nächsten Version mit derselben Aufgabe erneut prüfen.', false)}
     <div class="ca-field"><h4>Wissenschaftliche Grundlage</h4>
      <p>Dickinson und Wilby vergleichen in einer Studie frühe Konzepttests mit und ohne Produktprobe. Für die Projektliste übertragen wir den Ansatz auf einen Prototypentest, bei dem die Teilnehmenden die Übergabe selbst ausprobieren.</p>
      <a class="source-ref" href="https://doi.org/10.1111/1540-5885.1420117" target="_blank" rel="noopener">Dickinson &amp; Wilby (1997), Concept Testing With and Without Product Trial</a>
     </div>
     ${text('', 'Risiko', 'Die kleine freiwillige Stichprobe bildet nicht alle Kundensegmente ab. Deshalb unterschiedliche Projekterfahrung einbeziehen und Ergebnisse als Pilotbefund kennzeichnen.', false)}
    </div>
   </details>`:''}
   <button type="button" class="button small secondary ca-involvement-priority-button" id="ca-priority-${esc(phase.id)}" data-ca-involvement-priority="${esc(phase.id)}" aria-pressed="${phase===priority}">${phase===priority?'Priorisiert':'Priorisieren'}</button>
  </article>`;
 }).join('');
 return section('Abgeleitete Maßnahmen',cards?`<div class="ca-phase-grid ca-involvement-measures">${cards}</div>`:'<p>Für die Soll-Stufen sind noch keine Maßnahmen hinterlegt.</p>','ca-involvement-measures-section');
}
const expertiseExpansion={
 cocreation:{
  label:'Coupled',
  action:'HORNBACH lädt Fachleute zu einem gemeinsamen Test ein. Sie prüfen reale Projektfälle, benennen fachliche Lücken und arbeiten an der nächsten Version mit.',
  result:'Fachliche Änderungen und die Gründe dafür im Testprotokoll festhalten. Vorab klären, wie gemeinsam erarbeitete Ergebnisse genutzt werden dürfen.'
 },
 standard:{
  label:'Inside-Out',
  action:'HORNBACH dokumentiert, wie Artikel, Mengen, Einheiten und Freigaben in einer Projektliste beschrieben werden. Ausgewählte Partner könnten kompatible Hilfen entwickeln und mit Beispieldaten testen.',
  result:'Mit einem Partner prüfen, ob eine Liste ohne erneute Eingabe übernommen werden kann. Nutzungsrechte, Datenzugriff und Freigaben für Projektinformationen vorher klären.'
 }
};
function innovationExpertise(data,flows){
 const cards=data.examples.filter(example=>example.status==='Vorschlag'&&
  Object.hasOwn(expertiseExpansion,example.id)&&
  flows.has(example.type)).map(example=>{
  const expansion=expertiseExpansion[example.id];
  const coupled=example.type==='Coupled';
  return `<article class="panel ca-innovation-example ca-expertise-card">
   <span class="status-tag${coupled?'':' pink'}">${expansion.label} · Vorschlag</span>
   <h4>${esc(example.name)}</h4>
   <p class="ca-example-interpretation"><strong>Umsetzung:</strong>${esc(expansion.action)}</p>
   <p class="ca-example-interpretation"><strong>Woran wir den Nutzen prüfen:</strong>${esc(expansion.result)}</p>
  </article>`;
 }).join('');
 return cards?`<div class="ca-cards ca-expertise-grid">${cards}</div>`: '';
}
export function innovationView(state,{editing,cite,developmentProposals},view){
 const data=state.customerAnalysis;
 const views={
  overview:()=>innovationOverview(data,{editing,cite}),
  involvement:()=>section('',involvementStages(data.involvement,{cite}))
   +involvementMeasures(data,developmentProposals??[],editing),
  scenario:()=>innovationScenarioView(state,cite)
 };
 return view?views[view]():Object.entries(views).filter(([id])=>id!=='scenario').map(([,render])=>render()).join('');
}
const projectListEffects=[
 ['customer','journey',4,'Die digitale Kundenreise muss vom Projektstart bis zum Abschluss durchgängig verbunden sein. Übergaben und nächste Schritte müssen automatisch gesteuert werden.']
];
const innovationEffects=[
 ['customer','development',2,'Digitale Nutzungsspuren müssen ausgewertet werden und Kunden müssen aktiv an Ideen und Produkttests mitwirken.']
];
export function applyScenario(state,effects){
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
  ...(scenarioInnovation&&state.customerAnalysis.involvement.some(supportsInnovationScenario)?innovationEffects:[])
 ]);
}
function scenarioValues(state,scenario){
 return {
  before:state.model.map(group=>({name:group.name,value:mean(group.criteria,'current')})),
  after:scenario.groups.map(group=>mean(group.criteria,'current'))
 };
}
const scenarioMeanFormat=new Intl.NumberFormat('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2});
const formatScenarioMean=value=>value===null?'Offen':scenarioMeanFormat.format(value);
export function scenarioRadar({before,after},showTarget,originalTarget,targetLabel='Szenario'){
 const centerY=147;
 const radius=112;
 const xy=(index,value)=>{
  const angle=-Math.PI/2+index*2*Math.PI/before.length;
  return [160+Math.cos(angle)*radius*value/4,centerY+Math.sin(angle)*radius*value/4];
 };
 const points=values=>values.map((value,index)=>xy(index,value).join(',')).join(' ');
 const series=(values,kind,label)=>{
  const polygon=values.every(value=>value!==null)?`<polygon points="${points(values)}" class="radar-${kind}"/>`:'';
  return polygon+values.map((value,index)=>{
   if(value===null)return '';
   const [x,y]=xy(index,value);
   return `<circle class="radar-${kind}" cx="${x}" cy="${y}" r="${kind==='target'?6:4}"><title>${esc(before[index].name)} · ${label} ${kind!=='original-target'?formatScenarioMean(value):fmt(value)}</title></circle>`;
  }).join('');
 };
 return `<svg viewBox="0 0 320 260" role="img" aria-label="Netzdiagramm zur Reifegradwirkung, Skala 1 bis 4">
   ${[1,2,3,4].map(level=>`<polygon points="${points(before.map(()=>level))}" class="radar-grid"/><text x="169" y="${xy(0,level)[1]+4}" class="radar-tick">${level}</text>`).join('')}
   ${before.map((group,index)=>{
    const [x,y]=xy(index,4);
    const [labelX,labelY]=[x,index===0?19:y+22];
    return `<line x1="160" y1="${centerY}" x2="${x}" y2="${y}" class="radar-axis"/><text x="${labelX}" y="${labelY}" text-anchor="middle" class="model-chart-label">${esc(group.name)}</text>`;
   }).join('')}
   ${originalTarget?series(originalTarget,'original-target','Soll aus dem digitalen Reifegrad'):''}
   ${series(before.map(group=>group.value),'current','Ist')}
   ${showTarget?series(after,'target',targetLabel):''}
  </svg>`;
}
function journeyScenarioView(state,cite){
 const criterion=state.model.find(group=>group.id==='customer').criteria.find(item=>item.id==='journey');
 const scenario=applyScenario(state,projectListEffects);
 const goal=scenario.groups.find(group=>group.id==='customer').criteria.find(item=>item.id==='journey').current;
 return maturityComparison(state,scenario,criterion,goal,'Journey')
  +section('',`<div class="ca-maturity-explanation">
   ${text('', 'Warum diese Ist-Einstufung?', criterion.evidence, false)}
   ${criterion.source?cite(criterion.source,criterion.pages):''}
   ${text('', 'Projektübergabe zwischen App, Markt und Bestellung', 'Beim Planen und Kaufen kann der Projektkontext zwischen den Kanälen verloren gehen. Eine gemeinsame Projektliste kann Artikel, Mengen und Änderungen aus der Beratung für die Bestellung verfügbar halten.', false)}
   ${text('', 'Was muss für Stufe 4 belegt sein?', projectListEffects[0][3], false)}
   ${!scenario.changes.length?'<p class="scope-note">Die Ist-Bewertung erreicht die hinterlegte Szenariostufe bereits.</p>':''}
  </div>`);
}
function maturityComparison(state,scenario,criterion,goal,type){
 const toggleKey='scenario'+type;
 const comparable=scenario.changes.length>0;
 const showTarget=comparable&&state.customerAnalysis[toggleKey];
 const values=scenarioValues(state,scenario);
 const originalTarget=state.model.map(group=>mean(group.criteria,'target'));
 const scope=state.model.findIndex(group=>group.id==='customer');
 const currentMean=values.before[scope].value;
 const targetMean=values.after[scope];
 return section('',`
  <div class="ca-maturity-layout">
   <figure class="model-chart panel ca-maturity-radar">
    <figcaption class="chart-legend"><span class="status-tag orange">Ist</span>${showTarget?'<span class="status-tag pink">Szenario</span>':''}<span class="status-tag ca-original-target-tag">Soll</span></figcaption>
    ${scenarioRadar(values,showTarget,originalTarget)}
   </figure>
   <div class="ca-maturity-comparison">
    <h3>${esc(criterion.name)}</h3>
    <div class="stage-columns">
     <article class="stage-column stage-current stage-card stage-active ca-maturity-score">
      <span class="status-tag orange">Ist</span>
      <h4>${criterion.current===null?'Offen':'Stufe '+criterion.current}</h4>
      <p>${esc(criterion.current===null?'Für dieses Kriterium ist im digitalen Reifegrad kein Ist-Wert hinterlegt.':criterion.levels[criterion.current-1])}</p>
     </article>
     <article class="stage-column stage-target stage-card stage-active ca-maturity-score">
      <span class="status-tag pink">Szenario</span>
      <h4>${goal===null?'Offen':'Stufe '+goal}</h4>
      <p>${esc(goal===null?'Für die hinterlegten Maßnahmen ist die Reifegradwirkung noch zu prüfen.':criterion.levels[goal-1])}</p>
     </article>
    </div>
    <p class="ca-maturity-average"><strong>Kundenanbindung im Netzdiagramm</strong><span>Ist ${formatScenarioMean(currentMean)} → Szenario ${formatScenarioMean(goal===null?null:targetMean)} → Soll ${fmt(originalTarget[scope])}</span></p>
    ${comparable?`<label class="ca-maturity-toggle"><input id="ca-scenario-${type.toLowerCase()}-toggle" type="checkbox" data-ca-scenario="${toggleKey}"${showTarget?' checked':''}> Szenario im Netzdiagramm anzeigen</label>`:''}
   </div>
  </div>`);
}
function supportsInnovationScenario(phase){
 const original=CUSTOMER_ANALYSIS.involvement.find(item=>item.id===phase.id);
 return phase.target>=2&&phase.measure===original?.measure&&['concept','prototype'].includes(phase.id);
}
function innovationScenarioView(state,cite){
 const data=state.customerAnalysis;
 const supports=data.involvement.filter(supportsInnovationScenario);
 const eligible=supports.length>0;
 const model=state.model.find(group=>group.id==='customer');
 const criterion=model.criteria.find(item=>item.id==='development');
 const possible=applyScenario(state,eligible?innovationEffects:[]);
 const goal=eligible?possible.groups.find(group=>group.id==='customer').criteria.find(item=>item.id==='development').current:null;
 return maturityComparison(state,possible,criterion,goal,'Innovation')
  +section('',`<div class="ca-maturity-explanation">
   ${text('', 'Warum diese Ist-Einstufung?', criterion.evidence, false)}
   ${criterion.source?cite(criterion.source,criterion.pages):''}
   ${eligible?`
    ${text('', 'Welche Maßnahmen tragen dazu bei?', supports.map(phase=>phase.measure).join(' '), false)}
    ${text('', 'Was muss für Stufe 2 belegt sein?', 'Teilnehmende bringen eigene Ideen ein oder arbeiten an einer Variante mit und testen sie digital. HORNBACH dokumentiert, wo sie den Ablauf abbrechen oder wiederholen, wertet diese Nutzungsspuren aus und hält fest, welche Änderungen daraus folgen.', false)}
    ${!possible.changes.length?'<p class="scope-note">Die Ist-Bewertung erreicht die für diese Maßnahmen angesetzte Stufe bereits.</p>':''}`:''}
  </div>`);
}
export function renderCustomerAnalysis(state,context,view){
 if(view==='journey')return `<section class="maturity-folder journey-folder">
  <div class="folder-tabs" role="tablist" aria-label="Customer-Journey-Ansichten">${journeyTabs.map(([id,label])=>`<button type="button" role="tab" id="journey-tab-${id}" data-journey-tab="${id}" aria-selected="${activeJourneyTab===id}" tabindex="${activeJourneyTab===id?0:-1}" aria-controls="journey-folder-content">${label}</button>`).join('')}</div>
  <div class="folder-content" id="journey-folder-content" role="tabpanel" aria-labelledby="journey-tab-${activeJourneyTab}" tabindex="0">${journeyView(state,context,activeJourneyTab)}</div>
 </section>`;
 if(view)return `<div class="ca-content">${innovationView(state,context)}${innovationView(state,context,'scenario')}</div>`;
 return `<div class="ca-tabs" role="tablist" aria-label="Kundenanalyse"><button class="button secondary" role="tab" id="ca-tab-journey" aria-controls="ca-content" aria-selected="${subview==='journey'}" data-ca-view="journey">Customer Journey</button><button class="button secondary" role="tab" id="ca-tab-innovation" aria-controls="ca-content" aria-selected="${subview==='innovation'}" data-ca-view="innovation">Open Innovation</button></div><div id="ca-content" role="tabpanel" aria-labelledby="ca-tab-${subview}">${subview==='journey'?journeyView(state,context)+journeyScenarioView(state,context.cite):innovationView(state,context)+innovationView(state,context,'scenario')}</div>`;}
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
 if(event.type==='submit'&&el.matches('[data-ca-involvement-rating]')){
  event.preventDefault();
  const pending=pendingInvolvementRating;
  const phase=state.customerAnalysis.involvement.find(item=>item.id===selectedInvolvementPhase);
  if(!pending||!phase)return;
  const reason=el.elements.namedItem('reason');
  const measure=el.elements.namedItem('measure');
  for(const field of [reason,measure].filter(Boolean)){
   if(field.value.trim())continue;
   field.setCustomValidity('Bitte fülle dieses Feld aus.');
   field.reportValidity();
   return;
  }
  phase[pending.key]=pending.value;
  if(pending.key==='current'){
   phase.evidence=reason.value.trim();
   phase.currentReference=el.elements.namedItem('source').value.trim();
  }else{
   phase.targetReason=reason.value.trim();
   phase.measure=measure.value.trim();
  }
  pinnedInvolvementStage=`ca-rate-${phase.id}-${pending.value??'open'}`;
  involvementAssignment=null;
  pendingInvolvementRating=null;
  save();render();
  globalThis.document?.getElementById(pinnedInvolvementStage)?.focus({preventScroll:true});
  return;
 }
 if(event.type==='input'&&el.matches('[data-ca-involvement-rating] textarea'))el.setCustomValidity('');
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
  const priorityButton=el.closest('[data-ca-involvement-priority]');
  if(priorityButton){
   const data=state.customerAnalysis;
   const phase=data.involvement.find(item=>item.id===priorityButton.dataset.caInvolvementPriority);
   if(!phase||phase.target===null||!phase.measure.trim())return;
   data.involvementPriority=data.involvementPriority===phase.id?'':phase.id;
   save();render();
   globalThis.document?.getElementById(priorityButton.id)?.focus();
   return;
  }
  const phaseButton=el.closest('[data-ca-involvement-phase]');
  if(phaseButton){
   const phase=phaseButton.dataset.caInvolvementPhase;
   selectedInvolvementPhase=selectedInvolvementPhase===phase?null:phase;
   pendingInvolvementRating=null;
   pinnedInvolvementStage=null;
   involvementAssignment=null;
   render();
   globalThis.document?.getElementById('ca-involvement-'+phase)?.focus({preventScroll:true});
   return;
  }
  const stageButton=el.closest('[data-ca-involvement-stage]');
  if(stageButton){
   pendingInvolvementRating=null;
   if(stageButton.classList.contains('stage-active')){
    pinnedInvolvementStage=pinnedInvolvementStage===stageButton.id?null:stageButton.id;
    involvementAssignment=null;
   }else{
    pinnedInvolvementStage=null;
    involvementAssignment=involvementAssignment?.id===stageButton.id?null:{id:stageButton.id,value:stageButton.dataset.caInvolvementStage};
   }
   render();
   const openedId=involvementAssignment?'ca-involvement-assignment':pinnedInvolvementStage?pinnedInvolvementStage+'-reason':'';
   if(openedId){
    const opened=globalThis.document?.getElementById(openedId);
    opened?.focus({preventScroll:true});
    opened?.scrollIntoView({block:'nearest'});
   }else globalThis.document?.getElementById(stageButton.id)?.focus({preventScroll:true});
   return;
  }
  const levelButton=el.closest('[data-ca-involvement-level]');
  if(levelButton){
   const key=levelButton.dataset.caInvolvementSide;
   const raw=levelButton.dataset.caInvolvementLevel;
   pendingInvolvementRating={key,value:raw===''?null:Number(raw)};
   pinnedInvolvementStage=null;
   involvementAssignment=null;
   render();
   globalThis.document?.getElementById('ca-involvement-reason')?.focus();
   return;
  }
  const unpin=el.closest('[data-ca-involvement-unpin]');
  if(unpin){
   pinnedInvolvementStage=null;
   render();
   globalThis.document?.getElementById(unpin.dataset.caInvolvementUnpin)?.focus({preventScroll:true});
   return;
  }
  if(el.closest('[data-ca-involvement-cancel]')){
   const pending=pendingInvolvementRating;
   pendingInvolvementRating=null;
   render();
   globalThis.document?.getElementById(`ca-rate-${selectedInvolvementPhase}-${pending.value??'open'}`)?.focus({preventScroll:true});
   return;
  }
  const viewButton=el.closest('[data-ca-view]');
  if(viewButton){
   subview=viewButton.getAttribute('data-ca-view');
   render();
   return;
  }
  const candidate=el.closest('[data-ca-candidate]');
  if(candidate){
   const kind=candidate.dataset.caCandidate;
   const linkedIdea=kind==='innovation'&&state.ideas.find(idea=>idea.id===candidate.dataset.caCandidateIdea);
   const draft=linkedIdea&&innovationIdeaDrafts[linkedIdea.id];
   const id='course-'+kind+(draft?'-'+linkedIdea.id:'');
   const existing=state.actions.find(action=>action.originId===id);
   if(!existing&&state.actions.length>=40){toast('Höchstens 40 Maßnahmen möglich.');return;}
   const data=state.customerAnalysis;
   const journey=kind==='journey';
   const segmentId=activeJourneySegment??'all';
   const segmentLabel=personaSegments[segmentId]??'Alle Segmente';
   const pain=journey?rankedJourneyPainPoints(data,segmentId)[0]:null;
   const involvement=journey?null:weakestInvolvement(data);
   if(!pain&&!involvement&&!draft)return;
   const action={
    id,originId:id,
    name:journey?`Journey: ${pain.phase.name} (${segmentLabel})`:draft?`Open Innovation: ${linkedIdea.name}`:`Open Innovation: ${involvement.name} – Kundenpanel`,
    owner:'Digital Commerce / Marktberatung · vorgeschlagen',
    phase:'0–3 Monate',
    status:existing?.status||'Geplant',
    impact:4,effort:3,risk:3,
    deliverable:journey?pain.measure:draft?draft.customer:involvement.measure,
    gate:journey?pain.metric:draft?draft.measure:'Zehn verwertbare Ideen in acht Wochen, zwei fachlich geprüfte Prototypverbesserungen.',
    depends:'Konzeptioneller Vorschlag. Freigabe, Datenzugang und Teilnehmende erforderlich.',
    situation:journey?pain.pain:involvement?.evidence??'Kundeneinbindung für die gewählte Idee im Pilot prüfen.',
    rationale:journey?`Höchstbewerteter Schmerzpunkt (${pain.severity}/5) im ausgewählten Kundensegment. Die Maßnahme wird im Pilot geprüft.`:draft?`Vorgeschlagene Kundenbeteiligung in ${draft.phase}.`:'Schwächste bewertete Phase der Kundeneinbindung. Offene Phasen zunächst belegen.',
    reference:journey?`Lemon & Verhoef (2016), Termin 4, Folien 84–86, GB 2025/26, S. ${pain.phase.pages}`:'HORNBACH Holding, Geschäftsbericht 2025/26, S. 190, 193, 195–196.',
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
 if(event.type==='change'&&el.dataset.caFilter){
  const type=el.dataset.caFilter;
  if(el.checked)visibleInnovationFlows.add(type);
  else visibleInnovationFlows.delete(type);
  render();
  globalThis.document?.getElementById(el.id)?.focus({preventScroll:true});
  return;
 }
 if(event.type==='change'&&el.dataset.caScore){const value=el.value===''?null:Number(el.value),min=Number(el.dataset.min),max=Number(el.dataset.max);if(value!==null&&(!Number.isInteger(value)||value<min||value>max)){toast('Ungültiger Skalenwert.');render();return;}if(el.dataset.caScore.endsWith('.severity')&&value===null){toast('Die Schmerzpunktpriorisierung benötigt einen Wert von 1 bis 5.');render();return;}const path=el.dataset.caScore;
  set(path,value);save();render();
  const control=el.id?globalThis.document?.getElementById(el.id):globalThis.document?.querySelector(`[data-ca-score="${path}"]`);
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
 if(data.involvementPriority&&!data.involvement.some(phase=>phase.id===data.involvementPriority))throw new Error('Ungültige Priorität der Kundeneinbindung.');
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
