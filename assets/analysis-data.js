// Fachliche Arbeitsgrundlage. Stufen sind sinngemäße Kurzfassungen der Vorlesungsmatrix.
export const MODEL_SOURCE='Appelfeller & Feldmann (2018), Die digitale Transformation des Unternehmens, Springer. Kriterien und Stufen: Vorlesung Methoden und Reifegrad, Folien 75–81.';
export const PATTERN_SOURCE='Gassmann, Frankenberger & Csik (2013), Geschäftsmodelle entwickeln: 55 innovative Konzepte mit dem St. Galler Business Model Navigator, Hanser.';
export const CANVAS_SOURCE='Osterwalder & Pigneur (2011), Business Model Generation, Campus.';
const product=[
 ['monitor','Überwachung','Zustand, Umwelt und Nutzung des Produkts erfassen.',['Keine digitale Überwachung.','Einzelner Zustand oder Nutzungsparameter wird digital erfasst.','Mehrere Parameter unterstützen Diagnose und Überwachung.','Umfassende Überwachung von Zustand, Umwelt und Nutzung.']],
 ['control','Steuerung & Personalisierung','Produktfunktionen softwaregestützt steuern.',['Keine Softwaresteuerung.','Eine Funktion wird softwaregestützt gesteuert.','Mehrere Funktionen und begrenzte Personalisierung.','Umfangreiche Steuerung und Personalisierung.']],
 ['optimization','Optimierung','Betrieb anhand von Überwachungs- und Steuerungsdaten verbessern.',['Keine datenbasierte Optimierung.','Einzelne Leistungsparameter werden optimiert.','Mehrere Leistungsparameter werden umfassend optimiert.','Optimierung einschließlich Fehlerprognose und Entwicklungsimpulsen.']],
 ['autonomy','Autonomie','Eigenständige Reaktion des Produkts auf Daten.',['Keine selbstständige Anpassung.','Punktuelle selbstständige Reaktionen.','Selbstständige Reaktionen auf umfassend ausgewertete Daten.','Hohe Autonomie mit Selbstdiagnose und Koordination anderer Systeme.']],
 ['connection','Vernetzung','Datenaustausch mit Produkten, Menschen und Systemen.',['Keine digitale Vernetzung.','Einfache technische Ein- und Ausgabesignale.','Umfangreiche technische Vernetzungsmöglichkeiten.','Internetvernetzung oder digitaler Zwilling mit eindeutiger Identifikation.']]
];
const customer=[
 ['development','Produktentwicklung mit Kunden','Entwicklung',['Kunden liefern Ideen, etwa über Online- oder Offlinebefragungen.','Digitale Spuren werden ausgewertet; Kunden wirken an Ideen und Produkttests mit.','Nutzungs- und Befragungsdaten werden integriert ausgewertet und Hypothesen digital mit Kunden getestet.','Kundenressourcen sind digital eingebunden, etwa als Co-Designer und Tester.']],
 ['referral','Kunden werben Kunden','Vorverkauf',['Keine Integration bestehender Kunden in die Neukundengewinnung.','Kunden bewerten Produkte oder Dienstleistungen digital.','Digitale Bewertungen mit ausdrücklichen Empfehlungen an ausgewählte Kunden.','Bestandskunden beraten neue Kunden über unternehmenseigene digitale Communities.']],
 ['demand','Nachfrageprognose','Vorverkauf',['Keine Integration der Kunden in die Nachfrageprognose.','POS-Daten von Kunden werden analysiert, etwa Einkaufswerte und Laufwege.','POS-Daten und Prognosen der Kunden werden gemeinsam ausgewertet.','Gemeinsame Planung und Prognose mit Kunden auf Basis von POS-Daten.']],
 ['information','Informationskanäle','Kauf',['Wenige Kanäle mit Medienbrüchen.','Mehrere, überwiegend getrennte Kanäle.','Abgestimmte Kanäle mit integrierten Informationen.','Durchgängige kanalübergreifende Information und Verhaltensanalyse.']],
 ['order','Auftragseingang','Kauf',['Aufträge auf einzelne Kanäle begrenzt.','Mehrere Bestellkanäle mit begrenzter IT-Integration.','Kanalübergreifender Auftragseingang mit umfangreicher IT-Integration.','Kanalübergreifender Auftragseingang mit direkter Kunden-IT-Anbindung.']],
 ['payment','Bezahlsysteme','Kauf',['Konventionelle Zahlungen, etwa Bargeld oder Rechnung.','Kartenbasierte Zahlung.','Payment-Service-Provider eingebunden.','Mobile Zahlung oder Zahlung per QR-Code.']],
 ['selfservice','Customer Self Service','Kauf',['Kein digitaler Self Service.','Self Service auf Internetplattformen.','Self Service online und an stationären Terminals.','Breiter mobiler und stationärer Self Service mit erweiterten digitalen Hilfen.']],
 ['community','Kunden beraten Kunden','Kauf',['Klassische Erfahrungsberichte.','Onlineforen werden aufgebaut und gefördert.','Kundenberatung online und im stationären Umfeld.','Peer-to-Peer-Plattformen unterstützen die Beratung.']],
 ['aftersales','After Sales','Nach dem Kauf',['Keine digitale Integration.','Digitale Serviceinformation und Auftragsstatus.','Nutzungsdaten ermöglichen vorbeugende und individuelle Services.','Vernetzte Partner und integrierte datenbasierte After-Sales-Services.']],
 ['journey','Customer Journey','Übergreifend',['Isolierte analoge Kontaktpunkte.','Isolierte digitale Kontaktpunkte mit manuellen Übergaben.','Teilweise integrierte digitale Kundenreisen.','Durchgängige digitale Kundenreise mit automatisierter Steuerung.']],
 ['behavior','Verhaltensanalyse','Übergreifend',['Keine Datenanalyse.','Isolierte Analyse transaktionaler Daten.','Integrierte Analyse strukturierter Daten verschiedener Quellen.','Echtzeitanalyse strukturierter und unstrukturierter Daten zur Individualisierung.']],
 ['integration','IT-Integration beim Kunden','Übergreifend',['Keine Integration.','Einseitiger Datenaustausch.','Regelmäßiger Datenaustausch in beide Richtungen.','Direkte Integration mit Kundensystemen und weiteren digitalen Diensten.']]
];
const business=[
 ['concept','Geschäftsidee',['Digitalisierung spielt keine Rolle.','Digitalisierung unterstützt Prozesse, prägt aber nicht die Idee.','Digitalisierung erweitert das bestehende Geschäftsmodell.','Die Geschäftsidee beruht auf Digitalisierung.']],
 ['delivery','Leistungserstellung',['Keine Bedeutung der Digitalisierung.','Digitalisierung steigert die Effizienz.','Digitalisierung erweitert das Leistungsspektrum um hybride Angebote.','Der Kern der Leistungserstellung wird digital ermöglicht.']],
 ['interaction','Kundeninteraktion',['Analoge Interaktion.','Analoge und digitale Interaktion.','Überwiegend digitale Interaktion.','Fast ausschließlich digitale Interaktion.']],
 ['offering','Produkte & Dienstleistungen',['Analoge Produkte und Dienstleistungen.','Analoge Angebote mit digitalisierten Prozessen.','Teilweise digitale Angebote und ergänzende Dienstleistungen.','Analoge Produkte über digitale Touchpoints oder digitale Produkte und Dienstleistungen.']],
 ['goals','Ziele der Digitalisierung',['Einfache Prozessvereinfachung.','Effizienz ausgewählter Prozesse steigern.','Zusätzlichen Kundennutzen und Wettbewerbsfähigkeit schaffen.','Ein langfristig skalierbares digitales Geschäftsmodell etablieren.']]
];
const evidence={
 information:['3','Onlineshop, App und Märkte sind im ICR-Ansatz verbunden.','37, 72'],order:['3','Online- und stationäre Transaktionen sind im ICR-Ansatz verbunden. Direkter Kunden-IT-Zugriff ist nicht belegt.','37, 48, 72'],
 selfservice:['2','Onlineshops und App belegen digitalen Kundenzugang; die vollständige Breite stationärer Self Services bleibt offen.','37, 72'],
 journey:['3','ICR verbindet Online- und stationäre Kanäle. Eine vollständig automatisierte End-to-End-Kundenreise ist nicht belegt.','37, 72'],
 concept:['3','ICR und Online-Marktplatz erweitern das Handelsmodell. Der Warenhandel bleibt zentral.','37, 72'],delivery:['3','Materialverkauf wird um Handwerks- und Projektservices ergänzt.','37'],interaction:['2','Märkte, Beratung, Onlineshops und App bestehen nebeneinander und verbunden.','37, 72'],offering:['3','Waren, digitale Kanäle und projektbezogene Services bilden ein hybrides Angebot.','37, 72'],goals:['3','ICR und Serviceentwicklung zielen auf Kundennutzen und Wettbewerbsfähigkeit.','71–73']
};
function criterion(id,name,phase,levels){const e=evidence[id];return {id,name,phase,levels,current:e?Number(e[0]):null,target:3,evidence:e?e[1]:'Keine ausreichende öffentliche Evidenz für eine belastbare Einstufung. Im Fachgespräch prüfen.',source:e?'gb26':'',pages:e?e[2]:'',reference:'',assumption:true};}
const productAssessment=[
 [3,'Mehrere Sensorarten erfassen Temperatur, Luftfeuchte, Bewegung und Gerätezustände. Einschätzung: mehrere Parameter zur Überwachung.'],
 [3,'App und Browser steuern verschiedene Aktoren; individuell eingerichtete Automatisierungen ermöglichen begrenzte Personalisierung.'],
 [2,'Zeitgesteuertes Heizen und sensorabhängiges Schalten unterstützen die Optimierung einzelner Betriebsparameter. Die Einstufung ist eine Interpretation der beschriebenen Automatisierungen.'],
 [2,'Bewegungssensoren können Licht automatisch einschalten. Dies entspricht punktuellen selbstständigen Reaktionen.'],
 [4,'Gateway und Internetzugang verbinden Geräte mit App und Browser. Die dokumentierte Internetvernetzung entspricht Stufe 4.']
];
const productReference='HORNBACH, SMART HOME by hornbach, Bedingungen, Abschnitte 7 und 9 (S. 3 und 5). https://media.hornbach.de/cms/de/smart-home-bedingungen.pdf · Abruf 18.11.2026. Vorläufige fachliche Einschätzung.';
export const MATURITY_GROUPS=[
 {id:'product',name:'Produkt',scope:'Bewertungsobjekt: SMART HOME by hornbach mit Gateway, kompatiblen Sensoren und Aktoren sowie App-/Browserdienst. Bewertet wird dieses vernetzte Produktsystem. Die Einschätzung gilt für das ausgewählte Beispiel; die Soll-Werte sind Vorschläge des Beraterteams.',criteria:product.map(([id,n,q,l],i)=>({...criterion(id,n,q,l),current:productAssessment[i][0],target:Math.max(3,productAssessment[i][0]),evidence:productAssessment[i][1],reference:productReference}))},
 {id:'customer',name:'Kundenanbindung',scope:'Bewertungsobjekt: die Kundenanbindung im Baumarktgeschäft über Märkte, Onlineshops, App und Services. Stufenbeschreibungen sind sinngemäß gekürzt; maßgeblich ist die Vorlesungsmatrix.',criteria:customer.map(([id,n,p,l])=>criterion(id,n,p,l))},
 {id:'business',name:'Geschäftsmodell',scope:'Bewertungsobjekt: das Handels- und Servicegeschäft des Teilkonzerns Baumarkt. Bewertungen sind vorläufige Interpretation öffentlicher Berichte.',criteria:business.map(([id,n,l])=>criterion(id,n,'Geschäftsmodell',l))}
];
export const LEGACY_CUSTOMER_GROUP=structuredClone(MATURITY_GROUPS[1]);
const customerAssessment={
 development:[1,'Kundenbefragungen und Rückmeldungen beeinflussen Sortiment und Services. Eine systematische Einbindung als digitale Produkttester oder Co-Designer ist damit nicht belegt. Die niedrige Einstufung ist eine Arbeitshypothese zum Beteiligungsgrad.','190, 195–196',''],
 referral:[2,'Der Geschäftsbericht nennt Bewertungsfunktionen im eigenen Onlineshop. Das belegt digitale Kundenbewertungen. Ein gezieltes Empfehlungsverfahren an ausgewählte Neukunden ist daraus nicht ableitbar.','195',''],
 demand:[2,'Online- und stationäre Kauftransaktionen sowie die Digitalisierung von Einkauf und Logistik sprechen für eine Nutzung von Absatzdaten zur Bedarfsplanung. Die konkrete Einbindung von Kundendaten in Prognosemodelle ist öffentlich nicht beschrieben. Gemeinsame Prognosen mit Kunden sind zu prüfen.','37, 72–73',''],
 information:[3,'Märkte, Onlineshop und App bilden das ICR-Angebot; Produkt- und Projektinformationen sind über mehrere Kontaktpunkte zugänglich. Dies spricht für abgestimmte Informationen. Eine vollständig durchgängige Verhaltensanalyse über alle Kanäle ist nicht belegt.','37, 72–73, 195',''],
 order:[3,'Das ICR-Konzept verbindet stationären und digitalen Warenbezug. Die App ermöglicht Onlinebestellungen sowie Reservieren und Abholen. Die Zuordnung zur umfangreichen IT-Integration ist eine fachliche Interpretation; direkter Zugriff auf Kundensysteme bleibt offen.','37, 72','HORNBACH App, offizielle Anbieterbeschreibung, Abruf 18.11.2026. https://play.google.com/store/apps/details?id=de.hornbach'],
 payment:[4,'Die offiziellen Onlinehandelsbedingungen führen Apple Pay und Google Pay als mögliche Zahlarten auf. Dies stützt die Zuordnung zu mobiler Zahlung. Die Verfügbarkeit hängt von der konkreten Bestellung ab. Die Einstufung gilt für diese dokumentierte Funktion.','','HORNBACH AGB im Onlinehandel, Stand 23.07.2025, Abschnitt B.2, S. 11. Abruf 18.11.2026. https://media.hornbach.de/cmsm/de/hornbach-agb-im-onlinehandel.pdf'],
 selfservice:[2,'Onlineshop und App ermöglichen digitale Selbstbedienung, etwa Bestellung, Reservierung und Abruf von Marktinformationen. Die App beschreibt zusätzlich Self-Scan. Eine breite Ausstattung mit stationären Self-Service-Terminals als Voraussetzung höherer Modellstufen ist nicht belegt.','37, 72','HORNBACH App, offizielle Anbieterbeschreibung, Abruf 18.11.2026. https://play.google.com/store/apps/details?id=de.hornbach'],
 community:[1,'Kundenbewertungen bieten anderen Kunden Erfahrungsberichte. Der Bericht beschreibt außerdem Veranstaltungen zum Wissensaustausch. Eine unternehmenseigene digitale Beratungscommunity mit systematischem Kundendialog ist damit nicht nachgewiesen. Stufe 1 ist eine vorsichtige Einordnung des öffentlich belegten Austauschs.','195',''],
 aftersales:[2,'Das Kundenservice-Center übernimmt unter anderem Reklamationen, Sendungsverfolgung und Auftragsbenachrichtigungen. Dies spricht für digital unterstützte Serviceinformation nach dem Kauf. Vorbeugende individuelle Services auf Basis laufender Produktnutzungsdaten sind nicht belegt.','195',''],
 journey:[3,'ICR verbindet Markt, Onlineshop und App; Reservieren und Abholen verknüpft digitale Vorbereitung mit stationärer Abholung. Dies entspricht einer teilweise integrierten Kundenreise. Eine automatisierte Ende-zu-Ende-Steuerung ist nicht nachgewiesen.','37, 72','HORNBACH App, offizielle Anbieterbeschreibung, Abruf 18.11.2026. https://play.google.com/store/apps/details?id=de.hornbach'],
 behavior:[2,'Der Bericht beschreibt die systematische Auswertung von Kundeninteraktionen, Beschwerden und Befragungen. Dies stützt eine strukturierte Analyse einzelner Datenbestände. Wie weit Transaktions- und Verhaltensdaten integriert oder in Echtzeit ausgewertet werden, bleibt offen.','190, 195–196',''],
 integration:[1,'Onlineshop und App belegen digitale Kundenzugänge. Eine technische Anbindung an IT-Systeme der Kunden, etwa Beschaffungssoftware, ist für das bewertete Baumarktgeschäft aus den Quellen nicht ersichtlich. Ein Kundenkonto allein belegt diese Integration nicht. Die Einstufung ist intern zu überprüfen.','37, 72','']
};
MATURITY_GROUPS[1].scope='Kundenanbindung im HORNBACH-Baumarktgeschäft über Märkte, Onlineshop, App und Services.';
MATURITY_GROUPS[1].criteria=MATURITY_GROUPS[1].criteria.map(c=>{
 const [current,evidence,pages,reference]=customerAssessment[c.id];
 return {...c,current,target:Math.max(3,current),evidence,pages,reference,source:pages?'gb26':'',assumption:true};
});
export const LEGACY_PRODUCT_OPTIONS=[
 {id:'smarthome',name:'SMART HOME by hornbach',role:'Hybrides Angebot aus digitaler HORNBACH-Dienstleistung und kompatiblen Geräten.',url:'https://media.hornbach.de/cms/de/smart-home-bedingungen.pdf',group:MATURITY_GROUPS[0]},
 {id:'sileno',name:'GARDENA smart SILENO pro 500 m²',role:'Herstellerprodukt im Handel; bewertet wird die Ausstattung mit smart Gateway und GARDENA smart App.',url:'https://www.gardena.com/de/produkte/rasenpflege/maehroboter/maehroboter-smart-sileno-pro-500-m/970814947.html',
  group:{id:'product',name:'Produkt',scope:'Bewertungsobjekt: GARDENA smart SILENO pro 500 m² mit smart Gateway und smart App. Bewertet werden die vernetzten Funktionen des Herstellerprodukts als Fallbeispiel im HORNBACH-Sortiment.',criteria:product.map(([id,name,phase,levels],i)=>({
   ...criterion(id,name,phase,levels),
   current:[3,3,2,3,4][i],target:[3,3,3,3,4][i],
   evidence:[
    'Echtzeitposition und Gartenkarte machen den Betrieb beobachtbar. Vorläufige Zuordnung zu Stufe 3; Umfang der Fehlerdiagnose prüfen.',
    'Mäh- und Sperrzonen sowie individuelle Pflegeeinstellungen sind per App konfigurierbar. Einschätzung: mehrere Funktionen und begrenzte Personalisierung.',
    'LONA erstellt eine Gartenkarte und passt den Betrieb daran an. Einschätzung: Optimierung ausgewählter Leistungsparameter; umfassende Optimierung bleibt zu prüfen.',
    'Der Roboter mäht selbstständig und nutzt die kartierte Gartenfläche. Stufe 3 ist eine fachliche Einschätzung der datenbasierten Autonomie.',
    'Mit smart Gateway, Internetzugang und smart App ist der Mäher vernetzt. Diese Ausstattung ist Voraussetzung der Bewertung.'
   ][i],reference:'GARDENA, smart SILENO pro 500 m², Art. 19801-20, LONA Intelligence und smarte Ausstattung. Abruf 18.11.2026. https://www.gardena.com/de/produkte/rasenpflege/maehroboter/maehroboter-smart-sileno-pro-500-m/970814947.html'
  }))}},
 {id:'irrigation',name:'GARDENA smart Sensor Control Set',role:'Vernetztes Set aus Water Control, Bodenfeuchtesensor und Gateway; Herstellerprodukt im Handel.',url:'https://www.gardena.com/de/produkte/bewaesserung/bewaesserungssteuerung/smart-sensor-control-set/970826501.html',
  group:{id:'product',name:'Produkt',scope:'Bewertungsobjekt: GARDENA smart Sensor Control Set, Art. 19045-20, mit Water Control, smart Sensor, Gateway und smart App. Bewertet wird das Set als Fallbeispiel im HORNBACH-Sortiment.',criteria:product.map(([id,name,phase,levels],i)=>({
   ...criterion(id,name,phase,levels),
   current:[2,3,2,2,4][i],target:[3,3,3,3,4][i],
   evidence:[
    'Der Sensor misst Bodenfeuchtigkeit. Ein erfasster Zustandsparameter begründet die vorsichtige Zuordnung zu Stufe 2.',
    'Bewässerung und individuell einstellbare Zeitpläne werden per App gesteuert. Stufe 3 ist die Einschätzung der Steuerung und Personalisierung im Set.',
    'Bodenfeuchtedaten unterstützen angepasste Zeitpläne und vermeiden unnötige Bewässerung. Einschätzung: Optimierung eines Leistungsparameters.',
    'Bei ausreichend feuchtem Boden überspringt das Set geplante Bewässerung. Dies entspricht einer punktuellen selbstständigen Reaktion.',
    'Gateway, Internet und App verbinden das Set; zusätzlich werden Smart-Home-Integrationen angeboten. Einschätzung: Stufe 4.'
   ][i],reference:'GARDENA, smart Sensor Control Set, Art. 19045-20, Produktbeschreibung. Abruf 18.11.2026. https://www.gardena.com/de/produkte/bewaesserung/bewaesserungssteuerung/smart-sensor-control-set/970826501.html'
  }))}}
];
const projectCriteria=[
 ['Überwachung des Projektbedarfs und Auftrags','Digitale Sicht auf Bedarf, Verfügbarkeit und Abwicklung.',
  ['Bedarf und Auftragsfortschritt werden überwiegend manuell erfasst.','Einzelne Bedarfs-, Bestands- oder Auftragsdaten sind digital verfügbar.','Bedarf, Bestand und Auftragsfortschritt sind projektbezogen verbunden.','Eine durchgängige Projektsicht unterstützt vorausschauende Hinweise.'],
  2,3,'Sortiment, Online-Handel und digitale Beratungstools sind beschrieben. Dies lässt auf digitale Informationen zu Teilaspekten der Projektversorgung schließen. Eine einheitliche digitale Projektakte ist damit nicht belegt.','37, 72–73'],
 ['Steuerung & Personalisierung des Angebots','Digitale Auswahl und Anpassung der Projektleistung.',
  ['Das Angebot wird ausschließlich im persönlichen Austausch angepasst.','Einzelne Waren- oder Servicebausteine lassen sich digital auswählen.','Mehrere Bausteine lassen sich zu einer individuellen Projektlösung konfigurieren.','Das Leistungsangebot wird über den gesamten Projektverlauf personalisiert gesteuert.'],
  2,3,'Onlineshop, App, Beratung und projektbezogene Services ermöglichen die Auswahl von Angebotsbausteinen. Eine integrierte Konfiguration aller Waren, Lieferungen und Handwerksleistungen ist nicht nachgewiesen.','37, 72–73'],
 ['Optimierung der Projektversorgung','Datenbasierte Verbesserung von Verfügbarkeit und Leistung.',
  ['Verbesserungen erfolgen ohne systematische digitale Datenauswertung.','Daten verbessern einzelne Aspekte der Versorgung oder Beratung.','Mehrere Leistungsaspekte werden projektübergreifend datenbasiert optimiert.','Projektleistungen werden fortlaufend vorausschauend optimiert.'],
  2,3,'Der Bericht beschreibt Digitalisierung und Datenverarbeitung in Einkauf und Logistik sowie den Ausbau von KI-Analysen. Stufe 2 ist eine vorläufige Einordnung der Teiloptimierung; angekündigte KI-Ausbauschritte zählen nicht als bereits erreichte Stufe.','72–73'],
 ['Autonomie der Projektabwicklung','Selbstständige Reaktionen des Leistungsangebots auf Projektdaten.',
  ['Projektentscheidungen und Anpassungen erfordern menschliche Freigabe.','Einzelne definierte Ereignisse lösen automatisch Anpassungen aus.','Mehrere Projektschritte werden datenbasiert selbstständig koordiniert.','Das Angebot optimiert und koordiniert den Projektablauf weitgehend selbstständig.'],
  1,2,'Arbeitshypothese: Projektentscheidungen werden weiterhin durch Kunden oder Mitarbeitende freigegeben. Öffentliche Angaben belegen keine autonome Ende-zu-Ende-Projektabwicklung. Stufe 1 ist eine vorsichtige Annahme, kein Nachweis fehlender interner Automation.','37, 72–73'],
 ['Vernetzung des Leistungsangebots','Verbindung von Sortiment, Kanälen und Ausführungspartnern.',
  ['Waren- und Servicebausteine werden isoliert angeboten.','Einzelne Bausteine tauschen digital Daten aus.','Märkte, Online-Angebot und wesentliche Serviceprozesse sind verknüpft.','Alle relevanten Projektpartner arbeiten auf einer durchgängigen digitalen Projektbasis.'],
  3,4,'Interconnected Retail verbindet digitale und stationäre Angebote; regionale Handwerksbetriebe ergänzen die Projektleistung. Stufe 3 ist eine fachliche Einschätzung dieser Verknüpfung. Eine gemeinsame digitale Projektbasis aller Partner bleibt Zielbild.','37, 72–73']
];
MATURITY_GROUPS[0]={
 id:'product',name:'Produkt',
 scope:'HORNBACHs Leistungsangebot für Bau- und Heimwerkerprojekte: Sortiment, Beratung, Planung, Bestellung, Lieferung und ergänzende Services im Baumarktgeschäft.',
 criteria:product.map(([id,name,phase,levels],i)=>{
  const [title,question,adaptedLevels,current,target,evidence,pages]=projectCriteria[i];
  return {...criterion(id,title,question,adaptedLevels),current,target,evidence,pages,source:'gb26',
   reference:'Eigene Übertragung der Produktmatrix nach Appelfeller/Feldmann auf HORNBACHs hybrides Leistungsangebot. Die Stufenbeschreibungen sind angepasste Arbeitsdefinitionen. Vorläufige Außensicht, Stand 18.11.2026.'};
 })
};
// Reviewed against the lecture matrix, GB 2025/26 and H1 2026/27.
export const LEGACY_REVIEW_GROUPS=structuredClone(MATURITY_GROUPS);
const reviewedAssessments={
 "product": [
  [
   2,
   3,
   null,
   "Bedarf, Materialliste, Verfügbarkeit und Auftragsstatus für ausgewählte Projektarten in einer gemeinsamen Projektsicht verbinden. Das erfüllt die angepasste Stufe 3; eine vorausschauende Komplettsteuerung ist noch kein realistisches flächendeckendes Ziel."
  ],
  [
   2,
   3,
   null,
   "Für ausgewählte Projekte Waren, Lieferoptionen und Servicebausteine gemeinsam konfigurieren. Die Auswahl einzelner Artikel allein reicht für Stufe 3 nicht; erforderlich ist eine zusammenhängende individuelle Projektlösung."
  ],
  [
   2,
   3,
   null,
   "Verfügbarkeit, Lieferung und Beratung anhand gemeinsamer Projektdaten verbessern und die Wirkung beispielsweise über Liefertermintreue und Fehlbestellungen messen. Geplante KI-Funktionen gelten erst nach nachgewiesenem Einsatz als erreicht."
  ],
  [
   1,
   2,
   null,
   "Bei klar definierten Ereignissen automatisch Statusmeldungen oder alternative Liefertermine vorschlagen und freigegebene Regeln ausführen. Menschliche Freigaben bleiben für Kosten- und Projektentscheidungen erhalten. Vor Umsetzung ist die angenommene Ist-Stufe intern zu prüfen."
  ],
  [
   3,
   3,
   null,
   "Die bestehende Verbindung von Markt, Online-Angebot und Services stabilisieren und Datenübergaben für ausgewählte Projekte nachweisen. Eine gemeinsame Echtzeit-Projektbasis aller externen Partner wäre Stufe 4, ist jedoch kein begründetes kurzfristiges Ziel."
  ]
 ],
 "customer": [
  [
   1,
   2,
   null,
   "Kunden in digitale Ideen- und Produkttests einbinden und Befragungen mit freiwillig bereitgestellten Nutzungsdaten verbinden. Eine dauerhafte Co-Designer-Plattform ist für das Handelsgeschäft zunächst nicht erforderlich."
  ],
  [
   2,
   2,
   null,
   "Digitale Kundenbewertungen erhalten und deren Qualität und Nutzbarkeit verbessern. Ein gezieltes Empfehlungsverfahren an ausgewählte Neukunden ist kein zwingendes Ziel; deshalb bleibt die Modellstufe 2 angemessen."
  ],
  [
   2,
   2,
   null,
   "Die angenommene Nutzung von Absatzdaten zunächst intern bestätigen und die Prognosegüte verbessern. Gemeinsame Bedarfsplanung mit Privatkunden ist für viele DIY-Projekte unpraktisch; eine höhere Stufe wird deshalb nicht pauschal angestrebt."
  ],
  [
   3,
   4,
   null,
   "Produktinformationen, Verfügbarkeit und freigegebene Interaktionsdaten über Markt, Web und App konsistent verbinden. Stufe 4 erfordert den nachgewiesenen kanalübergreifenden Informationsfluss und eine datenschutzgerechte Analyse, nicht nur mehrere Kontaktkanäle."
  ],
  [
   3,
   3,
   null,
   "Kanalübergreifende Bestellung und Übergabe zwischen Online-Angebot und Markt zuverlässig ausbauen. Direkter Zugriff auf Kunden-IT ist im überwiegenden Privatkundengeschäft nicht erforderlich; Stufe 3 bleibt das passende Ziel."
  ],
  [
   4,
   4,
   null,
   "Die dokumentierten mobilen Zahlarten stabil und verständlich anbieten. Stufe 4 bezeichnet hier ausschließlich die Zahlungsfunktion, nicht die Reife sämtlicher Kassenprozesse; ein höherer Modellwert existiert nicht."
  ],
  [
   2,
   3,
   "Onlineshop und App bieten Selbstbedienung, einschließlich Self-Scan im Markt. Damit ist mobiler Self Service belegt. Die Modellstufe 3 setzt zusätzlich stationäre Informations- oder Bestellterminals voraus; deren flächendeckender Einsatz ist aus den geprüften Quellen nicht ersichtlich. Deshalb bleibt die vorsichtige Außensicht bei Stufe 2.",
   "Online-Selbstbedienung durch stationäre Informations- und Bestellmöglichkeiten ergänzen und deren Zusammenspiel nachweisen. Self-Scan allein wird nicht mit der gesamten Breite höherer Modellstufen gleichgesetzt."
  ],
  [
   1,
   2,
   null,
   "Ein moderiertes digitales Austauschformat für konkrete Projektfragen pilotieren. Der Schritt von Erfahrungsberichten zu einem geförderten Forum entspricht Stufe 2; eine umfassende Peer-to-Peer-Plattform wird zunächst nicht vorausgesetzt."
  ],
  [
   2,
   2,
   null,
   "Digitale Reklamations- und Statusinformationen konsistent zugänglich machen. Vorbeugende Services auf Basis laufender Produktnutzungsdaten sind bei gewöhnlichen Baumarktartikeln nur begrenzt sinnvoll und deshalb kein allgemeines Soll-Ziel."
  ],
  [
   3,
   4,
   null,
   "Projektbezogene Übergänge zwischen Beratung, Bestellung, Abholung oder Lieferung und Service durchgängig unterstützen. Stufe 4 ist ein Entwicklungsvorschlag und erfordert den Nachweis einer automatisierten Kundenreise in einem definierten Anwendungsfall."
  ],
  [
   2,
   3,
   null,
   "Befragungen, Servicekontakte und zulässig nutzbare Transaktionsdaten integriert auswerten. Für Stufe 3 muss die Verbindung mehrerer strukturierter Datenquellen belegt sein; eine Echtzeit-Personalisierung sämtlicher Kontakte ist nicht erforderlich."
  ],
  [
   1,
   2,
   null,
   "Für geeignete gewerbliche Kunden einen standardisierten digitalen Datenaustausch, etwa einen strukturierten Auftrags- oder Belegexport, pilotieren. Für Privatkunden entsteht keine Pflicht zur IT-Anbindung. Der Ist-Wert bleibt eine vorläufige Annahme, bis der tatsächliche Integrationsumfang geklärt ist."
  ]
 ],
 "business": [
  [
   3,
   3,
   "Der Geschäftsbericht beschreibt einen in Onlineshop und App integrierten Marktplatz sowie die Interconnected-Retail-Strategie. Digitale Möglichkeiten erweitern damit das bestehende Handelsmodell. Der Kern bleibt der Waren- und Projektservicehandel; ein vollständig auf Digitalisierung beruhendes Geschäftsmodell wird daraus nicht abgeleitet.",
   "Das digital erweiterte Handelsmodell mit passenden Marktplatz- und Projektservices weiterentwickeln. Ein rein digitales Geschäftsmodell wäre für die Verbindung aus Warenverfügbarkeit, Markt und Beratung kein automatisch besseres Ziel."
  ],
  [
   2,
   3,
   "Digitale Service- und Beratungstools sowie die Digitalisierung von Einkauf und Logistik sind beschrieben. Das stützt zunächst eine digital unterstützte, effizientere Leistungserstellung. Handwerker- und Projektservices allein belegen noch keine durch Digitalisierung ermöglichte hybride Wertschöpfung. Der hohe Digitalisierungsgrad bei Seniovo ist ein Teilbeispiel und wird nicht auf das gesamte Baumarktgeschäft übertragen.",
   "Eine integrierte Projektleistung aus digitaler Planung, Materialversorgung und Servicekoordination für ausgewählte Anwendungsfälle nachweisen. Erst wenn die Digitalisierung diese Leistungskombination tatsächlich erweitert, ist Stufe 3 begründet."
  ],
  [
   2,
   2,
   "Märkte und persönliche Beratung bestehen neben Onlineshop und App. Das entspricht analoger und digitaler Interaktion. Der Halbjahresbericht nennt einen Onlineumsatzanteil von 13,5 Prozent einschließlich Click & Collect und Marktplatz-Erträgen. Umsatzanteile messen zwar nicht sämtliche Kontakte, stützen aber keinen Schluss auf überwiegend digitale Kundeninteraktion.",
   "Persönliche Beratung und digitale Kontaktmöglichkeiten gezielt verbinden. Eine Verlagerung der Mehrheit aller Kundenkontakte ins Digitale ist für beratungsintensive Bau- und Heimwerkerprojekte kein notwendiges Ziel; die Modellstufe 2 kann daher auch bei guter Kanalintegration angemessen sein."
  ],
  [
   3,
   3,
   "Physische Waren werden um digitale Produkt- und Projektinformationen, Onlineshop, App und projektbezogene Dienstleistungen ergänzt. Für die Bewertung des gesamten hybriden Angebots wird Stufe 3 verwendet. Ein digitaler Bestellkontakt allein wird nicht als Nachweis einer umfassend digitalen Produkt- und Dienstleistungslandschaft interpretiert.",
   "Digitale Planungshilfen und passende Services mit dem physischen Sortiment verbinden und ihren Nutzen nachweisen. Die höhere Stufe wird für das Gesamtangebot nicht allein wegen eines vorhandenen Onlineshops angesetzt."
  ],
  [
   3,
   3,
   "Der Bericht verbindet Interconnected Retail mit Wettbewerbsfähigkeit, Kundennutzen und effizienteren Prozessen. Das entspricht der Zielsetzung von Stufe 3. Einzelne Wachstums- oder KI-Pläne belegen noch kein insgesamt einfach skalierbares digitales Geschäftsmodell.",
   "Kundennutzen und Wettbewerbsfähigkeit über konkrete Größen wie erfolgreiche Projektabschlüsse, Servicequalität und wirtschaftlichen Beitrag steuern. Skalierung wird für geeignete digitale Leistungen geprüft, aber nicht pauschal zum Ziel des gesamten Handelsgeschäfts erklärt."
  ]
 ]
};
for(const group of MATURITY_GROUPS){
 group.criteria=group.criteria.map((c,i)=>{
  const [current,target,evidence,targetEvidence]=reviewedAssessments[group.id][i];
  return {...c,current,target,evidence:evidence??c.evidence,targetEvidence,currentReference:'',targetReference:'',assumption:true};
 });
}
MATURITY_GROUPS[2].criteria.forEach(c=>{c.pages=c.id==='delivery'?'37, 72–73':c.id==='goals'?'71–73':'37, 72';});
Object.assign(MATURITY_GROUPS[2].criteria[2],{source:'h127',pages:'6',reference:'Geschäftsbericht 2025/26, S. 37, 72–73; Halbjahresfinanzbericht 2026/27, S. 6. Umsatzanteil ist kein Maß für sämtliche Kundenkontakte.'});
export const LEITFRAGEN=[
 ['Effizienzpotenziale','Welche Prozesse profitieren am stärksten von weiterer Digitalisierung?','Beratungssuche, Mengenplanung und Bedarfsprognose als Piloten gegen eine Baseline prüfen.'],
 ['Digitale Zusatzdienste','Welche Zusatzdienste ergänzen ausgewählte Produkte?','Materiallisten, kompatibilitätsgeprüfte Planung und digitaler Projektstatus.'],
 ['Product-as-a-Service','Welche Produkte könnten als Dienstleistung angeboten werden?','Werkzeugnutzung mit Wartung statt Kauf untersuchen; Auslastung und Zahlungsbereitschaft zuerst testen.'],
 ['Konfiguration','Welchen Zusatznutzen schafft eine konfigurierbare Kundenschnittstelle?','Passende Mengen und Varianten vor dem Kauf prüfen; Fehlkäufe und Retouren messen.'],
 ['Individualisierung','Ist Mass Customization wirtschaftlich und vom Kunden gewünscht?','Konfigurierbare Projektpakete testen. Kein Nachweis für kundenspezifische Fertigung in Losgröße eins.'],
 ['Plattformrisiko','Droht eine Verdrängung an der Kundenschnittstelle?','Externe Such- und KI-Plattformen könnten den Erstkontakt übernehmen. Eigene Projektbeziehung und Wechselmöglichkeiten stärken.'],
 ['Datenverwertung','Welche Daten entstehen und lassen sie sich kommerzialisieren?','Opt-in-Projektdaten für bessere Services nutzen; ein separates Datenprodukt erst nach Rechte- und Nachfrageprüfung.']
].map(([name,question,answer])=>({name,question,answer}));
export const CANVAS=[
 ['partners','Schlüsselpartner','Hersteller, Lieferanten, Logistik, IT und regionale Handwerksbetriebe.'],
 ['activities','Schlüsselaktivitäten','Beschaffen, Sortimente steuern, beraten, verkaufen und Waren liefern.'],
 ['resources','Schlüsselressourcen','Märkte, Logistik, Mitarbeitende, Marke, digitale Kanäle und Produktdaten.'],
 ['value','Wertangebote','Projektgerechtes Sortiment, Dauertiefpreise, Verfügbarkeit, Beratung und Services.'],
 ['relationships','Kundenbeziehungen','Persönliche Beratung, digitale Selbstbedienung und projektbezogene Unterstützung.'],
 ['channels','Kanäle','Märkte, Onlineshop, App und Handwerker-Service.'],
 ['segments','Kundensegmente','DIY-, Profi- und DIFM-Kunden.'],
 ['costs','Kostenstruktur','Wareneinsatz, Personal, Immobilien, Logistik, IT und Serviceabwicklung.'],
 ['revenue','Erlösquellen','Warenverkauf und ergänzende projektbezogene Dienstleistungen.']
].map(([id,name,text])=>({id,name,text}));
export const FOUR=[{id:'who',name:'Wer',text:'DIY-, Profi- und DIFM-Kunden mit Bau- und Renovierungsprojekten.'},{id:'what',name:'Was',text:'Sortiment, Dauertiefpreise, Verfügbarkeit, Beratung und Projektservices.'},{id:'how',name:'Wie',text:'ICR verbindet Märkte, Onlineshop, App, Beschaffung, Logistik und regionale Servicepartner.'},{id:'value',name:'Wert',text:'Warenmarge und Serviceerlöse tragen Einkauf, Personal, Standorte, Logistik und IT.'}];
export const PATTERN_CATALOG=[
 [1,'addon','Add-on','Ein preisgünstiges Grundangebot lässt sich durch kostenpflichtige Extras erweitern.'],
 [2,'navigator-2','Affiliation','Vertriebspartner empfehlen ein Angebot und erhalten für vermittelte Verkäufe oder andere Ergebnisse eine Provision.'],
 [3,'navigator-3','Aikido','Das Angebot hebt sich ab, indem es mit gängigen Erwartungen der Branche bewusst bricht.'],
 [4,'navigator-4','Auction','Gebote bestimmen den Verkaufspreis eines Produkts oder einer Leistung.'],
 [5,'navigator-5','Barter','Waren oder Leistungen werden direkt gegen andere Waren oder Leistungen getauscht.'],
 [6,'navigator-6','Cash Machine','Kunden zahlen früh, während eigene Ausgaben später anfallen. Das verschafft dem Unternehmen Liquidität.'],
 [7,'navigator-7','Cross Selling','Zum bestehenden Angebot werden passende Produkte oder Leistungen mitverkauft.'],
 [8,'navigator-8','Crowdfunding','Viele Unterstützer finanzieren ein Vorhaben gemeinsam mit einzelnen Beiträgen.'],
 [9,'navigator-9','Crowdsourcing','Eine offene Gruppe steuert Ideen, Wissen oder Arbeit zu einer Aufgabe bei.'],
 [10,'navigator-10','Customer Loyalty','Vorteile für wiederkehrende Kunden fördern langfristige Bindung und weitere Käufe.'],
 [11,'navigator-11','Digitization','Ein bisher physisches Angebot oder ein analoger Prozess wird in eine digitale Form überführt.'],
 [12,'navigator-12','Direct Selling','Der Anbieter verkauft direkt an seine Kunden und übernimmt den Vertrieb selbst.'],
 [13,'ecommerce','E-commerce','Produkte oder Leistungen werden über digitale Verkaufskanäle angeboten und bestellt.'],
 [14,'navigator-14','Experience Selling','Ein besonderes Einkaufs- oder Nutzungserlebnis erhöht den Wert des Angebots.'],
 [15,'navigator-15','Flat Rate','Ein fester Preis deckt die Nutzung eines Angebots im vereinbarten Umfang ab.'],
 [16,'navigator-16','Fractional Ownership','Mehrere Parteien erwerben Anteile an einem Vermögenswert und teilen sich dessen Nutzung.'],
 [17,'navigator-17','Franchising','Selbstständige Partner betreiben Standorte nach einem erprobten Konzept und zahlen dafür Gebühren.'],
 [18,'navigator-18','Freemium','Eine kostenlose Basisversion erleichtert den Einstieg, Zusatzfunktionen sind kostenpflichtig.'],
 [19,'navigator-19','From Push-to-pull','Die tatsächliche Nachfrage löst Beschaffung oder Produktion aus und bestimmt deren Umfang.'],
 [20,'navigator-20','Guaranteed Availability','Der Anbieter verpflichtet sich zu einer vereinbarten Verfügbarkeit eines Produkts oder Systems.'],
 [21,'navigator-21','Hidden Revenue','Dritte, etwa Werbekunden, finanzieren einen Teil des Angebots für die Nutzer.'],
 [22,'navigator-22','Ingredient Branding','Eine erkennbare Komponentenmarke wertet das Endprodukt auf.'],
 [23,'navigator-23','Integrator','Ein Unternehmen übernimmt mehrere aufeinanderfolgende Schritte der Wertschöpfung selbst.'],
 [24,'navigator-24','Layer Player','Ein Unternehmen spezialisiert sich auf eine Stufe der Wertschöpfung und bedient damit mehrere Anbieter oder Branchen.'],
 [25,'navigator-25','Leverage Customer Data','Kundendaten werden ausgewertet, um Angebote zu verbessern oder datenbasierte Leistungen anzubieten.'],
 [26,'navigator-26','License','Gegen eine Gebühr dürfen andere geschütztes Wissen, Technik oder eine Marke nutzen.'],
 [27,'navigator-27','Lock-in','Die Bindung an ein System steigt, wenn ein Wechsel Aufwand oder zusätzliche Kosten verursacht.'],
 [28,'longtail','Long Tail','Viele Nischenangebote erzielen zusammen einen relevanten Umsatz, obwohl jedes nur selten verkauft wird.'],
 [29,'navigator-29','Make More Of It','Vorhandene Ressourcen oder Fähigkeiten werden zusätzlich in anderen Angeboten oder Märkten eingesetzt.'],
 [30,'mass-customization','Mass Customization','Standardisierte Bausteine ermöglichen individuelle Angebote zu Kosten nahe der Serienfertigung.'],
 [31,'navigator-31','No Frills','Ein vereinfachtes Angebot konzentriert sich auf wesentliche Funktionen und ermöglicht dadurch niedrige Preise.'],
 [32,'navigator-32','Open Business Model','Externe Partner wirken gezielt an der Entwicklung und Vermarktung des Angebots mit.'],
 [33,'navigator-33','Open Source','Ein offener Quellcode ermöglicht Beiträge von außen. Erlöse können etwa durch Support oder Betrieb entstehen.'],
 [34,'orchestrator','Orchestrator','Ein Unternehmen koordiniert ein Partnernetzwerk, das wesentliche Teile des Angebots erbringt.'],
 [35,'navigator-35','Pay Per Use','Kunden zahlen nach der tatsächlich genutzten Menge oder Dauer.'],
 [36,'navigator-36','Pay What You Want','Kunden bestimmen selbst, welchen Preis sie für ein Angebot zahlen.'],
 [37,'navigator-37','Peer-to-peer','Eine Plattform vermittelt Austausch oder Handel zwischen gleichrangigen Teilnehmern.'],
 [38,'navigator-38','Performance-based Contracting','Die Vergütung hängt von einer vereinbarten Leistung oder einem messbaren Ergebnis ab.'],
 [39,'navigator-39','Razor And Blade','Ein günstiges Grundprodukt schafft Nachfrage nach passenden Verbrauchsmaterialien oder Zubehör.'],
 [40,'rent','Rent Instead Of Buy','Kunden zahlen für die zeitlich begrenzte Nutzung und müssen das Produkt dafür nicht kaufen.'],
 [41,'navigator-41','Revenue Sharing','Beteiligte Partner teilen die Erlöse aus einem gemeinsamen Angebot nach einem vereinbarten Schlüssel.'],
 [42,'navigator-42','Reverse Engineering','Ein bestehendes Produkt wird untersucht, um seine Funktionsweise zu verstehen und ein eigenes Angebot abzuleiten.'],
 [43,'navigator-43','Reverse Innovation','Eine Lösung entsteht für einen Schwellenmarkt und wird später auch in etablierten Märkten angeboten.'],
 [44,'navigator-44','Robin Hood','Höhere Erlöse aus zahlungskräftigen Segmenten finanzieren günstigere Angebote für andere Kunden.'],
 [45,'navigator-45','Self-service','Kunden übernehmen einzelne Arbeitsschritte selbst, etwa Bestellung, Abholung oder Kasse.'],
 [46,'navigator-46','Shop-in-shop','Ein Anbieter betreibt eine eigene Verkaufsfläche im Geschäft eines anderen Händlers.'],
 [47,'solution','Solution Provider','Ein Bündel aus Produkten und Leistungen löst ein Kundenproblem möglichst vollständig.'],
 [48,'subscription','Subscription','Regelmäßige Zahlungen sichern den fortlaufenden Zugang zu einem Produkt oder einer Leistung.'],
 [49,'navigator-49','Supermarket','Ein breites Sortiment an einem Ort ermöglicht viele Einkäufe in einem Besuch.'],
 [50,'navigator-50','Target The Poor','Das Angebot und seine Kostenstruktur sind auf Menschen mit sehr geringem Einkommen zugeschnitten.'],
 [51,'navigator-51','Trash-to-cash','Abfälle oder Reststoffe werden als Rohstoff oder Produkt wirtschaftlich weiterverwendet.'],
 [52,'two-sided','Two-sided Market','Eine Plattform verbindet zwei Kundengruppen, deren Teilnahme für die jeweils andere Gruppe zusätzlichen Nutzen stiftet.'],
 [53,'navigator-53','Ultimate Luxury','Exklusive Produkte oder Leistungen werden zu einem hohen Preis für einen kleinen, zahlungskräftigen Markt angeboten.'],
 [54,'navigator-54','User Designed','Nutzer entwerfen Produkte selbst. Der Anbieter stellt Werkzeuge, Produktion oder Vertrieb bereit.'],
 [55,'navigator-55','Whitelabel','Ein Hersteller liefert ein Angebot, das andere Unternehmen unter ihrer eigenen Marke verkaufen.'],
];
export function patternRecord(id,name){
 return {id,name,status:'Annahme',evidence:'',source:'',pages:'',reference:PATTERN_SOURCE,evidenceUrl:'',targetEvidence:'',targetReference:''};
}
export const PATTERNS=[
 {id:'navigator-10',name:'Customer Loyalty',status:'Bestehend',evidence:'Die ProfiService-Kundenkarten fördern wiederkehrende Einkäufe mit erweiterter Warenrückgabe, Vorteilen bei Mietgeräten und verlängerter Dauertiefpreisgarantie.',source:'',pages:'',reference:PATTERN_SOURCE,evidenceUrl:'https://media.hornbach.de/cms/de/kundenkarten-profiservice-a4.pdf'},
 {id:'navigator-49',name:'Supermarket',status:'Bestehend',evidence:'Die Bau- und Gartenmärkte bündeln ein breites und tiefes Sortiment unter einem Dach, halten projektgerechte Mengen vor und setzen auf Dauertiefpreise.',source:'gb26',pages:'37',reference:PATTERN_SOURCE},
 {id:'ecommerce',name:'E-Commerce',status:'Bestehend',evidence:'Onlineshops und App sind Bestandteil des ICR-Modells.',source:'gb26',pages:'37, 72',reference:PATTERN_SOURCE},
 {id:'longtail',name:'Long Tail',status:'Annahme',evidence:'Der kuratierte Marktplatz erweitert das Sortiment. Ob Nischenartikel im Sinne des Musters wirtschaftlich relevant sind, ist öffentlich nicht nachgewiesen.',source:'gb26',pages:'72',reference:PATTERN_SOURCE},
 {id:'solution',name:'Solution Provider',status:'Ausbauidee',evidence:'Von Material und einzelnen Services zur durchgängigen Projektlösung. Vollständige Problemlösung ist ein Zielvorschlag.',source:'gb26',pages:'37, 72',reference:PATTERN_SOURCE},
 {id:'subscription',name:'Subscription',status:'Ausbauidee',evidence:'Wiederkehrendes Profi-Paket ist eine neue Hypothese; Zahlungsbereitschaft ist offen.',source:'gb26',pages:'37',reference:PATTERN_SOURCE},
 {id:'orchestrator',name:'Orchestrator',status:'Ausbauidee',evidence:'Partner übernehmen die Ausführung, HORNBACH koordiniert das Serviceversprechen. Der zusätzliche Integrationsumfang ist zu testen.',source:'gb26',pages:'37',reference:PATTERN_SOURCE},
 {id:'rent',name:'Rent Instead of Buy',status:'Bestehend',evidence:'Über den Boels-Mietservice können Kunden Maschinen und Werkzeuge zeitweise nutzen, ohne sie zu kaufen.',source:'',pages:'',reference:PATTERN_SOURCE,evidenceUrl:'https://media.hornbach.de/cmsm/de/xxl-fliesen-verlegen-mawe.pdf',targetEvidence:'Den bestehenden Mietservice um eine projektbezogene Reservierung mit KI-gestützter Verfügbarkeitsplanung erweitern.'},
 {id:'mass-customization',name:'Mass Customization',status:'Bestehend',evidence:'Kunden konfigurieren beim Holzzuschnitt individuelle Maße. HORNBACH fertigt den Zuschnitt aus standardisierten Platten nach Bestellung.',source:'',pages:'',reference:PATTERN_SOURCE,evidenceUrl:'https://www.hornbach.de/conf/holzzuschnitt-nach-mass/80000/'},
 {id:'two-sided',name:'Two-sided Market',status:'Bestehend',evidence:'Der deutsche Online-Marktplatz bringt externe Händler mit HORNBACH-Kunden zusammen. Händler ergänzen das Sortiment über einen gemeinsamen Vertriebskanal.',source:'gb26',pages:'72',reference:PATTERN_SOURCE},
 {id:'addon',name:'Add-on',status:'Ausbauidee',evidence:'Optionale Planungs- und Prüfdienste ergänzen den Materialkauf; Nutzen und Aufpreis sind unvalidiert.',source:'',pages:'',reference:PATTERN_SOURCE}
].map(pattern=>({...patternRecord(pattern.id,pattern.name),...pattern}));
// Preliminary project-team assessments, in the order of the five risk checks.
const INITIAL_RISK_CHECKS={
 project:[[2,'Produkt- und Projektdaten begrenzen.'],[2,'Planungsvorschläge bei sicherheitsrelevanten Arbeiten fachlich prüfen.'],[2,'Materialliste zunächst für ein klar umrissenes Projekt testen.'],[1,'Prototyp kann ohne automatisierte Bestellung betrieben werden.'],[2,'Akzeptanz und Projektabschlussquote im Pilot messen.']],
 service:[[2,'Kontaktdaten nur für die beauftragte Vermittlung nutzen.'],[2,'Serviceinformationen fachlich freigeben.'],[3,'Partner müssen Statusmeldungen zuverlässig zurückspielen.'],[3,'Verfügbarkeit und Vertretung regionaler Partner absichern.'],[2,'Zahlungsbereitschaft und Reklamationen beobachten.']],
 pro:[[2,'Firmen- und Nutzungsdaten für das Paket begrenzen.'],[2,'Leistungen und Laufzeit verständlich erklären.'],[2,'Paket zunächst mit einer kleinen Zielgruppe testen.'],[2,'Servicekosten und Verfügbarkeit über die Laufzeit messen.'],[3,'Zahlungsbereitschaft und Verdrängung bestehender Erlöse sind offen.']],
 advisor:[[2,'Wissensquellen und Zugriffsrechte festlegen.'],[2,'Antworten bei sicherheitsrelevanten Fragen fachlich absichern.'],[2,'Antwortqualität vor dem Einsatz anhand typischer Anfragen testen.'],[2,'Bei Ausfall auf persönliche Beratung umleiten.'],[2,'Zusatznutzen und Akzeptanz eines optionalen Termins prüfen.']],
 availability:[[2,'Bestands- und Auftragsdaten zweckgebunden nutzen.'],[2,'Prognosen und bestätigte Liefertermine klar unterscheiden.'],[3,'Bestandsdaten und Lieferzeiten müssen zuverlässig zusammengeführt werden.'],[3,'Abweichungen und Ausfälle bei Lieferpartnern berücksichtigen.'],[2,'Fehlbestände und Lagerreichweite gemeinsam beobachten.']],
 tools:[[2,'Reservierungsdaten auf das für die Ausleihe Nötige begrenzen.'],[2,'Einweisung und sichere Nutzung der Geräte sicherstellen.'],[3,'Auslastung, Wartung und Verfügbarkeit gemeinsam planen.'],[3,'Ersatzgeräte und Wartungsausfälle im Pilot berücksichtigen.'],[4,'Auslastung und Wartungskosten können die Marge stark belasten.']]
};
const INITIAL_IDEA_REASONS={
 project:{
  impact:'Die gemeinsame Projektliste bündelt drei typische Aufgaben bei Bau- und Renovierungsprojekten: Mengen planen, Material kaufen und bei Bedarf einen Service buchen.',
  feasibility:'Ein Prototyp für ein abgegrenztes Projekt ist mit dem bestehenden Sortiment und den digitalen Kanälen denkbar. Mengenlogik und Übergabe an Kauf und Buchung müssen erprobt werden.',
  cost:'Für einen Pilot fallen vor allem Entwicklung, Pflege der Mengenlogik und die Anbindung von Warenkorb und Servicebuchung an.'
 },
 service:{
  impact:'Ein sichtbarer Terminstatus und klare Leistungsumfänge helfen Kunden bei der Koordination von Handwerksleistungen, besonders bei Projekten mit mehreren Beteiligten.',
  feasibility:'Regionale Handwerkspartner sind bereits Teil des Angebots. Für einen Pilot müssen sie Statusmeldungen zuverlässig liefern und Abläufe mit HORNBACH abstimmen.',
  cost:'Ein Pilot braucht eine technische Schnittstelle für Terminmeldungen sowie Aufwand für Einführung, Koordination und Support der Partner.'
 },
 pro:{
  impact:'Projektablage und priorisierte Servicekoordination können wiederkehrende Abläufe für Profikunden erleichtern. Der Vorteil hängt davon ab, wie häufig sie das Paket nutzen.',
  feasibility:'Ein begrenzter Test mit Profikunden ist möglich. Für ein Angebot müssen Paketumfang, Abrechnung und zugesagte Servicekapazität geklärt werden.',
  cost:'Ein kleiner Pilot kann vorhandene Projekt- und Servicefunktionen nutzen. Zusätzlicher Aufwand entsteht vor allem durch Abrechnung und Betreuung.'
 },
 advisor:{
  impact:'Eine verlässliche Produktauskunft kann Suchwege verkürzen. Bei komplexeren Projekten hilft ein optionaler Planungstermin dabei, die Auskunft in eine Entscheidung zu übersetzen.',
  feasibility:'Für einen begrenzten Pilot lassen sich vorhandene Produktinformationen nutzen. Hinzu kommen Quellenprüfung, fachliche Freigabe und Stichproben zur Antwortqualität.',
  cost:'Der Pilot kann auf vorhandenen Informationen und Beratungsabläufen aufbauen. Zusatzkosten entstehen vor allem für Aufbereitung, Tests und fachliche Kontrolle.'
 },
 availability:{
  impact:'Ein realistischer Material- und Lieferterminvorschlag hilft Kunden, Projektunterbrechungen durch fehlendes Material zu vermeiden.',
  feasibility:'Ein Pilot ist für wenige Warengruppen möglich, wenn Bestandsdaten, Nachfrageprognosen und Lieferzeiten zuverlässig zusammengeführt werden können.',
  cost:'Die Anbindung von Bestands- und Lieferdaten, die laufende Prognosepflege und die Abstimmung mit Lieferpartnern verursachen erheblichen Aufwand.'
 },
 tools:{
  impact:'Zeitweise nutzbare Werkzeuge helfen bei Vorhaben, für die sich ein Kauf kaum lohnt. Der Mehrwert hängt vom Gerätebedarf und der regionalen Verfügbarkeit ab.',
  feasibility:'Vor einem Pilot müssen Geräteverfügbarkeit, Reservierung, Wartung und Verantwortlichkeiten mit dem Mietpartner geklärt werden.',
  cost:'Wartung, Ersatzgeräte und die Abwicklung von Ausgabe und Rückgabe verursachen laufende Kosten. Deren Tragfähigkeit hängt von der Auslastung ab.'
 }
};
export const PROJECT_PILOT=[
 {id:'prototype',period:'Monat 1',title:'Prototyp bauen',owner:'Digital Commerce & Marktberatung'},
 {id:'test',period:'Monat 2',title:'Mit Kunden testen',owner:'Marktberatung & zehn Projektkunden'},
 {id:'review',period:'Monat 3',title:'Pilot bewerten',owner:'Digital Commerce & Controlling'}
];
const projectPilotTasks={
 prototype:'Eine gemeinsame Projektliste für Mengenplanung, Materialbestellung und optionale Servicebuchung entwickeln.',
 test:'Die Liste am Smartphone erstellen, im Markt prüfen und zur Bestellung übernehmen. Fehlpositionen und abgebrochene Übergaben erfassen.',
 review:'Abschlussquote und Fehlpositionen mit dem bisherigen Ablauf vergleichen. Aufwand und Kosten für den Pilotbetrieb schätzen.'
};
export const ADVISOR_PILOT_MEASURE='Digital Commerce und Fachberatung entwickeln in 0–3 Monaten einen Prototyp für die KI-gestützte Produktauskunft. Die Antworten verweisen auf gepflegte Quellen. Bei komplexen oder sicherheitsrelevanten Fragen bietet der Assistent einen Termin mit der Fachberatung an. Zehn Zielkunden testen typische Projektanfragen. Das Team misst Antwortqualität und Suchzeit. Das Controlling schätzt die Kosten für Betrieb und fachliche Prüfung.';
export const ADVISOR_PILOT=PROJECT_PILOT.map((phase,index)=>({
 ...phase,
 owner:['Digital Commerce & Fachberatung','Fachberatung & zehn Zielkunden','Digital Commerce & Controlling'][index]
}));
const advisorPilotTasks={
 prototype:'Eine KI-gestützte Produktauskunft mit gepflegten Quellen bauen. Bei komplexen oder sicherheitsrelevanten Fragen einen Termin mit der Fachberatung anbieten.',
 test:'Zehn Zielkunden stellen typische Projektanfragen. Das Team prüft die Antworten fachlich und misst die Suchzeit.',
 review:'Antwortqualität und Suchzeit mit dem bisherigen Ablauf vergleichen. Controlling schätzt die Kosten für Betrieb und fachliche Prüfung.'
};
export const PROJECT_PILOT_EFFECT='Projektkunden sollen mit weniger Fehlkäufen und Rückfragen von der Planung zur Bestellung gelangen. Dadurch sollen mehr begonnene Projektbestellungen abgeschlossen werden. Im Pilot prüfen wir, ob Fehlpositionen sinken und die Abschlussquote steigt.';
export function ideaTemplate(id='new',name='Neue Idee') {return {
 ...(id==='project'?{pilotTasks:{...projectPilotTasks}}:{}),
 ...(id==='advisor'?{pilotTasks:{...advisorPilotTasks}}:{}),
 id,name,pattern:'',description:'Eigene Idee – Nutzen, Zielgruppe und Angebot konkretisieren.',impact:3,effort:3,risk:0,previousRisk:0,feasibility:3,cost:3,criterionReasons:{impact:"",feasibility:"",cost:""},source:'',pages:'',kpi:'Messbares Pilotziel festlegen.',aiId:'',method:'Ähnlichkeitsprinzip',origin:'Projektorientierte Dienstleistungsunternehmen',transfer:'Ein bekanntes Muster auf die digitale Projektbegleitung übertragen.',patternSource:PATTERN_SOURCE,
 after:FOUR.map(d=>({id:d.id,name:d.name,text:'Veränderung für diese Idee beschreiben.'})),
 canvasChanges:[{id:'value',text:'Den zusätzlichen Kundennutzen konkretisieren.'},{id:'revenue',text:'Erlös- und Kostenannahmen validieren.'}],
 recommendation:{situation:'Noch nicht validierte Geschäftsmodellhypothese.',measure:'Digital Commerce und CX prüfen in 0–3 Monaten einen klickbaren Prototyp.',rationale:'Passung zur Projektorientierung überprüfen.',reference:PATTERN_SOURCE,effect:'Kundennutzen und inkrementellen Deckungsbeitrag messen.',risks:'Datenzugang, Integrationskosten und Zahlungsbereitschaft sind offen.'},
 experiment:{assumption:'Die Zielgruppe erkennt einen hinreichenden zusätzlichen Nutzen.',test:'Prototyp mit zehn Zielkunden besprechen.',success:'Vorab: mindestens drei verbindliche Pilotzusagen von zehn Befragten.',result:'Noch nicht durchgeführt.',decision:'Offen'},
 checks:[['Daten & Rechte','DSGVO bei Personenbezug und Data Act bei vernetzten Produkten fallbezogen prüfen: Datenbedarf, Zweck, Zugriffsrechte und Datenminimierung.'],['KI & Regulierung','Anwendungsfall und Rollen nach AI Act fallbezogen einordnen; menschliche Kontrolle, Kompetenzen und Verantwortung klären.'],['Machbarkeit','Systemzugang, Datenqualität, Kompetenzen und Betrieb im Pilot belegen.'],['Anbieter & Resilienz','NIS2-Betroffenheit fachlich prüfen; unabhängig davon Ausstiegsoptionen, Notfallbetrieb und Wiederherstellung testen.'],['Markt & Kannibalisierung','Zahlungsbereitschaft, Wettbewerbsreaktion und verdrängte Warenmarge testen.']].map(([name,note])=>({name,note,status:'Offen',level:0,reason:''}))
 };}
export function enrichIdeas(ideas){
 const pilotPlans={
  project:'Digital Commerce und Marktberatung entwickeln in 0–3 Monaten einen Prototyp für eine gemeinsame Projektliste. Zehn Projektkunden testen, ob sie am Smartphone Mengen planen, die Liste in der Marktberatung prüfen lassen und anschließend passende Materialien bestellen sowie bei Bedarf einen Service buchen können. Das Team erfasst Fehlpositionen und abgebrochene Übergaben. Das Controlling schätzt Aufwand und Kosten für einen Pilotbetrieb.',
  advisor:ADVISOR_PILOT_MEASURE
 };
 const added=[
 {id:'advisor',name:'KI-Beratung als Projektservice',pattern:'Add-on',description:'Quellengebundene Produktauskunft mit optionalem fachlich geprüftem Planungstermin verbinden.',impact:4,effort:2,risk:2,feasibility:4,cost:2,aiId:'knowledge',origin:'Beratungsangebote im Fachhandel',kpi:'Suchzeit −20 % und mindestens 95 % korrekte Testantworten.'},
 {id:'availability',name:'Verlässliche Projektverfügbarkeit',pattern:'Solution Provider',description:'KI-Bedarfsprognosen und Projektlisten zu einem geprüften Material- und Lieferterminvorschlag verbinden.',impact:4,effort:4,risk:3,feasibility:3,cost:4,aiId:'forecast',origin:'Lieferkettensteuerung im Handel',kpi:'Fehlbestände −10 % ohne zusätzlichen Lagerbestand.'},
 {id:'tools',name:'Werkzeugnutzung statt Kauf',pattern:'Rent Instead of Buy',description:'KI prognostiziert Werkzeugbedarf und Verfügbarkeit; ein regionaler Pilot testet nutzungsabhängige Abrechnung mit Wartung.',impact:3,effort:4,risk:4,feasibility:2,cost:4,aiId:'forecast',method:'Konfrontationsprinzip',origin:'Sharing- und Vermietungsmodelle',kpi:'Auslastung und Deckungsbeitrag nach Wartung sowie verdrängter Warenmarge.'}
 ];
 return [...ideas,...added].map((d,i)=>{const t=ideaTemplate(d.id,d.name);Object.assign(t,d);t.feasibility=d.feasibility??[4,3,3][i];t.cost=d.cost??d.effort;
 t.aiId=d.aiId??(i===1?'knowledge':'planner');t.method=d.method??(i===2?'Konfrontationsprinzip':'Ähnlichkeitsprinzip');t.origin=d.origin??['Projektservice im Fachhandel','Dienstleistungsnetzwerke','Software-Abonnements'][i];
 const reasons=INITIAL_IDEA_REASONS[t.id];
 if(reasons)t.criterionReasons={...reasons};
 const assessment=INITIAL_RISK_CHECKS[t.id];
 if(assessment){
  t.checks.forEach((check,index)=>{[check.level,check.reason]=assessment[index];});
  t.risk=Math.max(...t.checks.map(check=>check.level));
 }
 t.transfer=`${t.pattern} aus „${t.origin}“ auf ${t.name.toLowerCase()} übertragen. ${t.description}`;
 t.after=FOUR.map(f=>({...f,text:f.id==='who'?(i===2?'Gewerbliche Projektkunden und Handwerksbetriebe.':f.text):f.id==='what'?t.description:f.id==='how'?`Bestehende ICR-Kanäle und Partner um ${t.aiId==='forecast'?'datenbasierte Bedarfsplanung':t.aiId==='knowledge'?'quellengebundene Wissensassistenz':'assistierte Projektplanung'} ergänzen.`:`${t.pattern==='Subscription'?'Monatliche Paketgebühr':t.pattern==='Rent Instead of Buy'?'Nutzungsgebühr':t.pattern==='Add-on'?'Optionale Servicegebühr':'Warenmarge und optionale Serviceerlöse'}; zusätzliche Betriebs- und Partnerkosten einbeziehen.`}));
 t.canvasChanges=[{id:'value',text:t.description},{id:'activities',text:t.after[2].text},{id:'resources',text:'Qualitätsgesicherte Produktdaten, freigegebene KI-Werkzeuge und fachliche Kontrolle ergänzen.'},{id:'costs',text:'Pilot, Integration, Personal, KI-Betrieb und Partnerabwicklung berücksichtigen.'},{id:'revenue',text:t.after[3].text}];
 t.recommendation={situation:`${t.name} ist eine unvalidierte Ausbauidee auf Basis vorhandener Handels- und Servicefähigkeiten.`,measure:pilotPlans[t.id]??`Digital Commerce / CX: ${t.name} in 0–3 Monaten mit zehn Zielkunden als Prototyp testen; Controlling ermittelt Kosten und Vergleichsbasis.`,rationale:`Das Muster ${t.pattern} knüpft an die Projektorientierung an. ${t.transfer}`,reference:PATTERN_SOURCE,effect:t.id==='project'?PROJECT_PILOT_EFFECT:t.kpi,risks:'Zahlungsbereitschaft, verlässliche Daten und Integration sind offen. Bestehende Erlöse, Servicekosten und Partnerabhängigkeit berücksichtigen.'};return t;});
}
export const SUPPLEMENT={
 maturityAssessmentRevision:1,customerAssessmentRevision:1,productScopeRevision:1,productSelection:'smarthome',productAssessments:Object.fromEntries(LEGACY_PRODUCT_OPTIONS.map(p=>[p.id,structuredClone(p.group)])),
 model:MATURITY_GROUPS,modelQuestions:LEITFRAGEN,four:FOUR,canvas:CANVAS,patterns:PATTERNS,ideaManualOrder:false,ideaWeights:{impact:35,feasibility:25,cost:25,risk:15},
 benchmark:[
 {id:'obi',name:'OBI',scope:'DIY-Handel in Deutschland; Vergleich der Kundenanbindung, keine Konzernrangliste.',sourceUrl:'https://www.obi.de/info/heyobi',evidence:'heyOBI bietet digitale Fachberatung, Einkaufsliste und Markt-Navigation. Interpretation: abgestimmte Informationskanäle (3), eine digitale, jedoch nicht durchgängig belegte Kundenreise (2) und Online-Self-Service (2). Stationäre Terminals oder vollständige End-to-End-Automation sind mit dieser Quelle nicht belegt.',retrieved:'2026-11-16',ratings:[{id:'information',value:3},{id:'journey',value:2},{id:'selfservice',value:2}],assumption:true},
 {id:'bauhaus',name:'BAUHAUS',scope:'DIY-Handel in Deutschland; nur die drei genannten Kundenkriterien sind vergleichbar.',sourceUrl:'https://www.bauhaus.info/s/service/vorteile/bauhaus-app',evidence:'Die App bietet Verfügbarkeitsprüfung, Produktfinder, Einkaufslisten sowie Reservieren und Abholen. Interpretation: Informationskanäle und Teilkundenreise sind verbunden (3); mobiler Self Service ist belegt, stationäre Terminals nicht (2). Kein Nachweis vollständiger End-to-End-Automation.',retrieved:'2026-11-16',ratings:[{id:'information',value:3},{id:'journey',value:3},{id:'selfservice',value:2}],assumption:true},
 {id:'toom',name:'toom',scope:'DIY-Handel in Deutschland; nur die drei genannten Kundenkriterien sind vergleichbar.',sourceUrl:'https://toom.de/wissen-service/toom-app/',evidence:'Die App verbindet Marktverfügbarkeit, Bestellung, Reservierung und digitale Vorteilskarte; Videoberatung wird angeboten. Interpretation: abgestimmte Kanäle und eine integrierte Teilkundenreise (3); Online-Self-Service ist belegt, stationäre Terminals nicht (2). Interne Entscheidungsautomation ist unbekannt.',retrieved:'2026-11-16',ratings:[{id:'information',value:3},{id:'journey',value:3},{id:'selfservice',value:2}],assumption:true}
 ],
 benchmarkManual:Object.fromEntries(MATURITY_GROUPS.map(group=>[group.id,
  Object.fromEntries(group.criteria.map(criterion=>[criterion.id,
   Object.fromEntries(['obi','bauhaus','toom'].map(id=>[id,{value:null,sourceUrl:'',estimated:false,reason:''}]))
  ]))
 ])),
 benchmarkConclusion:'Digitale Beratung und kanalübergreifende Kundenbegleitung sind auch im Wettbewerb sichtbar. Eine belastbare Überlegenheit von HORNBACH lässt sich mit dieser begrenzten Außensicht nicht belegen. Die vorläufige Lücke liegt bei durchgängiger Projektbegleitung und messbarem Servicenutzen; weitere Peer-Belege sind erforderlich.',
 readiness:[
 ...['Strategie','Daten','Kompetenzen','Technologie & Betrieb','Governance & Risiko'].map(name=>({name,kind:'KI-Reife',current:null,target:4,evidence:'Öffentliche Angaben reichen für diese interne Fähigkeit nicht aus. Verantwortliche und Belege im Fachgespräch ergänzen.'})),
 ...['Datenbestand & Qualität','Datenzugang & Rechte','Datennutzung & Verantwortung','Digitale Souveränität','Cybersicherheit & Resilienz'].map(name=>({name,kind:'Ergänzende Perspektive',current:null,target:4,evidence:'Prüfen: Datenverantwortliche, Qualitätsmetriken, Zugriffsregeln, Wechselmöglichkeiten, getestete Backups und Wiederanlaufpläne. Keine rechtliche Betroffenheit unterstellt.'}))
 ]
};
