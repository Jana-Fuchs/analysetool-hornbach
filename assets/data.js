import {CUSTOMER_ANALYSIS} from './customer-analysis.js';
import {SUPPLEMENT,enrichIdeas} from './analysis-data.js';
export const SOURCES = {
  platformLecture: { title: 'Digitale Plattformen und Ökosysteme', organization: 'DHBW Karlsruhe · Jonas Staib', file: 'docs/2026-11-19 Plattform_und_Oekosystem.pdf', description: 'Termin 6 vom 19.11.2026: Rollenkarte, Ecosystem Participation Navigator, Platform Value Canvas, Netzwerkeffekte und Markteintritt.' },
  gb26: { title: 'Geschäftsbericht 2025/26', organization: 'HORNBACH Holding AG & Co. KGaA', file: 'docs/HORNBACH_Holding_Geschaeftsbericht_2025-26.pdf', url: 'https://www.hornbach-holding.de/media/document/53a06c3f-6dfe-485b-b39a-a3ca941e7ea7/assets/20260519_HH_GB_DE.pdf', description: 'Grundlage für Geschäftsmodell, Konzernkennzahlen, ICR, Marktplatz und Digitalisierungsstrategie.' },
  gb25: { title: 'Geschäftsbericht 2024/25', organization: 'HORNBACH Holding AG & Co. KGaA', file: 'docs/HORNBACH_Holding_Geschaeftsbericht_2024-25.pdf', url: 'https://www.hornbach-holding.de/media/document/8d05df5c-4533-48a5-8270-f0b90a156f56/assets/20250521_HH_GB_DE_Links.pdf', description: 'Vergleichsbasis für Umsatz, Onlinegeschäft und bereits bestehende Plattformaktivitäten.' },
  h127: { title: 'Halbjahresfinanzbericht 2026/27', organization: 'HORNBACH Holding AG & Co. KGaA', file: 'docs/HORNBACH_Holding_Halbjahresfinanzbericht_2026-27.pdf', url: 'https://www.hornbach-holding.de/media/document/b063e59a-46a8-4b77-8441-052b6dff8ef0/assets/DE0006083405-Q2-2026-EQ-D-00.pdf', description: 'Aktualisierung: Halbjahresumsatz, Ergebnis und Onlineanteil. Halbjahreswerte werden nicht auf ein Gesamtjahr hochgerechnet.' },
  task: { title: 'Einstieg und Setup · Aufgabenstellung', organization: 'DHBW Karlsruhe · Jonas Staib', file: 'docs/2026-10-28 Einstieg_und_Setup.pdf', description: 'Teil A, Folien 81, 82 und 84: sieben Bausteine, Bewertung, bearbeitbare Eingaben und Maßnahmen-Roadmap. Fünf Dimensionen nach Vorlesungsfolie 50.' }
};
export const TABS = [
 {id:'steckbrief',short:'Steckbrief',subtitle:'',icon:'overview'},
 {id:'reifegrad',short:'Digitaler Reifegrad',subtitle:'',icon:'radar'},
 {id:'muster',short:'Muster & Ideen',subtitle:'',icon:'bulb'},
 {id:'kunden',short:'Customer Journey',icon:'users'},
 {id:'innovation',short:'Open Innovation',icon:'bulb'},
 {id:'plattform',short:'Plattform & Ökosystem',icon:'network'},
 {id:'erloese',short:'Erlösmodell & KI',subtitle:'Das Erlösszenario zeigt die Wirtschaftlichkeit eines Projektpiloten unter veränderbaren Annahmen. Die anschließende Matrix priorisiert drei KI-Anwendungen anhand ihrer Bewertungen und Gewichte.',icon:'spark'},
 {id:'massnahmen',short:'Zielmodell & Maßnahmen',subtitle:'Priorisierte Maßnahmen und Roadmap ab Projektfreigabe. Bewertungen und Status sind direkt änderbar; Zuständigkeiten, Ergebnisse und Entscheidungskriterien über „Bearbeiten“.',icon:'roadmap'}
];
export const DEFAULT_STATE = {
 schemaVersion:1,
 profile:[
  {id:'customers',title:'Kunden',question:'Für wen schaffen wir Wert?',text:'Projektorientierte Heimwerker und private Renovierer bilden den Kern. Handwerksbetriebe und andere gewerbliche Kunden werden gezielt über den ProfiService angesprochen. DIFM-Kunden lassen ihre Projekte durch Fachleute umsetzen.',source:'gb26',pages:'37',tag:'DIY · Profi · DIFM'},
  {id:'value',title:'Nutzen',question:'Welches Problem lösen wir?',text:'Ein breites und tiefes Sortiment in projektgerechten Mengen, transparente Dauertiefpreise und fachliche Beratung. Projektservices verbinden Materialkauf und Umsetzung – vom Selbermachen bis zum Handwerker-Service.',source:'gb26',pages:'37',tag:'Verfügbarkeit & Projektkompetenz'},
  {id:'operations',title:'Wertschöpfung',question:'Wie entsteht die Leistung?',text:'Großflächige Märkte, Onlineshops und App bilden das Handelsmodell. Zentrale Beschaffung, Eigenmarken und Logistik sichern die Warenversorgung. Digitale Werkzeuge unterstützen Beratung und Prozesse im Markt.',source:'gb26',pages:'37–38, 72–73',tag:'Interconnected Retail'},
  {id:'partners',title:'Partner',question:'Wer macht das Angebot möglich?',text:'Hersteller und Lieferanten, Logistik- und Technologieanbieter sowie regionale Vertrags-Handwerksbetriebe. Ausgewählte Drittanbieter ergänzen das Sortiment im deutschen Online-Marktplatz; Seniovo ergänzt das Angebot für barrierefreie Bäder.',source:'gb26',pages:'37–38, 72',tag:'Lieferanten & Servicepartner'},
  {id:'finance',title:'Finanzen',question:'Wie fließt Geld zurück?',text:'Der Kern ist der Warenverkauf, ergänzt um projektbezogene Dienstleistungen. Einkauf, Personal, Immobilien, Logistik und IT prägen die Kosten. 2025/26: 6.433,9 Mio. € Konzernumsatz und 264,7 Mio. € bereinigtes EBIT.',source:'gb26',pages:'40–42, 48–54',tag:'Handelsmarge & Services'}
 ],
 profileConclusion:'Die Stärke liegt in der Verbindung von Sortiment, Markt und Beratung. Der nächste Hebel ist eine durchgängige Projektbegleitung: Bedarf verstehen, Material und Service bündeln und den Projekterfolg messbar machen.',
 maturity:[
  {id:'customer',name:'Kundenerlebnis',current:4,target:5,evidence:'Onlineshops, App und projektbezogene Services sind vorhanden. Eine durchgängige Projektakte ist hier ein Zielvorschlag.',source:'gb26',pages:'37, 71–72'},
  {id:'process',name:'Prozesse',current:3,target:4,evidence:'Weitere Automatisierung der Beschaffung und Lieferketten ist vorgesehen. Der erreichte Automatisierungsgrad wird nicht quantifiziert.',source:'gb26',pages:'72–73'},
  {id:'data',name:'Daten & KI',current:3,target:4,evidence:'KI für Analysen und Prozesssteuerung wird forciert. Ein konzernweiter messbarer KI-Reifegrad ist nicht veröffentlicht.',source:'gb26',pages:'72–73'},
  {id:'tech',name:'Technologie',current:4,target:4,evidence:'ICR-Architektur und mobile Geräte im Verkauf sind etabliert. Das IT-Hub in Rumänien soll weitere Kapazitäten schaffen.',source:'gb26',pages:'72–73'},
  {id:'ecosystem',name:'Partner & Plattform',current:3,target:4,evidence:'Kuratierter Marktplatz und regionale Handwerkskooperationen bestehen. Eine integrierte Projektplattform wird als nächster Schritt vorgeschlagen.',source:'gb26',pages:'37, 72'},
  {id:'revenue',name:'Erlösinnovation',current:2,target:4,evidence:'Warenhandel und Services tragen das Modell. Ein validiertes wiederkehrendes Projektservice-Abonnement ist in dieser Analyse eine neue Hypothese.',source:'gb26',pages:'37, 48–54'}
 ],
 maturityNote:'Außensicht auf Basis öffentlicher Berichte, keine interne Reifegradmessung. Fehlende öffentliche Belege bedeuten nicht, dass intern keine Fähigkeit vorhanden ist. Scores und Zielwerte sind Annahmen des Projektteams.',
 weights:{impact:50,effort:30,risk:20},
 ideas:[
  {id:'project',name:'Digitaler Projektbegleiter',pattern:'Solution Provider',description:'Eine gemeinsame Projektliste verbindet Mengenplanung, Materialkauf und optionale Servicebuchung.',impact:5,effort:3,risk:2,source:'gb26',pages:'37, 72',kpi:'Projektabschlussquote und Deckungsbeitrag je Projekt'},
  {id:'service',name:'Geprüftes Service-Netzwerk',pattern:'Orchestrator',description:'Bestehende Handwerksleistungen mit Terminstatus, transparenten Leistungsumfängen und Kundenfeedback verbinden.',impact:4,effort:3,risk:3,source:'gb26',pages:'37, 72',kpi:'Servicequote und termingerechte Fertigstellung'},
  {id:'pro',name:'Profi-Servicepaket',pattern:'Subscription',description:'Optionales monatliches Paket für Profis, etwa mit Projektablage und priorisierter Servicekoordination; Zahlungsbereitschaft zuerst testen.',impact:3,effort:2,risk:3,source:'gb26',pages:'37, 72',kpi:'Zahlungsbereitschaft, Bindung und Servicekosten'}
 ],
 journey:[
  {id:'inspire',name:'Inspirieren',touchpoint:'Projektideen · App · Markt',observation:'Projektorientierung und Beratung sind Teil des bestehenden Angebots.',pain:'Bedarf und verfügbares Budget bleiben über Kanalwechsel hinweg unvollständig.',opportunity:'Gemeinsamen Projekt-Check mit Kunden entwickeln.',metric:'Quote gestarteter Projektpläne',source:'gb26',pages:'37, 71–72'},
  {id:'plan',name:'Planen',touchpoint:'Beratung · Projektliste',observation:'Breites Sortiment und ergänzende Handwerksservices unterstützen die Projektplanung.',pain:'Mengen, Varianten und Materialkompatibilität sind für Kunden schwer einzuschätzen.',opportunity:'Mengenplanung und Materiallisten mit 15 Pilotkunden testen.',metric:'Vollständigkeit der Materialliste',source:'gb26',pages:'37, 72'},
  {id:'buy',name:'Beschaffen',touchpoint:'Onlineshop · Click & Collect',observation:'Online- und stationäre Angebote sind im ICR-Modell verbunden.',pain:'Ein Projekt kann mehrere Warenkörbe, Lieferungen und Partner benötigen.',opportunity:'Projektbezogenen Warenkorb und Lieferstatus pilotieren.',metric:'Abbruchquote und Liefertermintreue',source:'gb26',pages:'48, 72'},
  {id:'build',name:'Umsetzen',touchpoint:'DIY · Handwerker-Service',observation:'Regionale Vertragsbetriebe realisieren Projekte im Handwerker-Service.',pain:'Unsicherheit bei Arbeitsschritten und bei der Abstimmung mit Ausführenden.',opportunity:'Statusmeldungen und Rückfragen im Projektverlauf erproben.',metric:'Rückfragen und Nacharbeitsquote',source:'gb26',pages:'37, 72'},
  {id:'retain',name:'Weiterentwickeln',touchpoint:'Feedback · Folgeprojekt',observation:'Kundenorientierung und wiederkehrende Projektbedarfe bieten eine Anschlussmöglichkeit.',pain:'Erfahrungen aus abgeschlossenen Projekten fließen möglicherweise zu wenig in neue Angebote ein.',opportunity:'Opt-in für Projektfeedback und gemeinsame Produkttests anbieten.',metric:'Wiederkaufrate und Feedbackquote',source:'gb26',pages:'37, 71–72'}
 ],
 customerNote:'Die Pain Points sind Hypothesen, keine Ergebnisse einer Kundenbefragung. Interviews mit DIY-, Profi- und DIFM-Kunden müssen ihre Bedeutung und Häufigkeit prüfen.',
 platformNote:'Ziel ist ein kuratiertes Projekt-Ökosystem auf den vorhandenen Kanälen. HORNBACH steuert Kundenzugang, Sortimentsqualität und Serviceversprechen; Partner liefern spezialisierte Produkte und Ausführungskapazität.',
 revenueAssumptions:{projects:2000,conversion:15,basket:800,margin:30,fee:39,cost:60000},
 ai:[
  {id:'knowledge',name:'Wissensassistent für die Beratung',description:'Quellengebundene Antworten aus freigegebenen Produkt- und Serviceinformationen für Mitarbeitende.',impact:4,effort:2,risk:2,kpi:'Suchzeit −20 %; ≥95 % fachlich korrekte Antworten im Testset.',guardrail:'Quellenpflicht, Rechtekonzept, fachliche Freigabe; keine autonome Sicherheitsberatung.'},
  {id:'forecast',name:'Bestands- und Bedarfsprognose',description:'Saisonale Nachfrage pro Artikel und Markt prognostizieren und Bestellvorschläge verbessern.',impact:5,effort:4,risk:3,kpi:'Fehlbestände −10 % bei höchstens konstantem Lagerbestand.',guardrail:'Datenqualität vor Pilotstart prüfen; Schattenbetrieb, menschliche Bestellfreigabe.'},
  {id:'planner',name:'KI-gestützte Projektplanung',description:'Aus Kundenanforderungen eine überprüfbare Materialliste und passende Serviceoptionen vorschlagen.',impact:5,effort:4,risk:4,kpi:'Planungszeit −20 %; keine Zunahme fehlerhafter Materiallisten.',guardrail:'Kompatibilitätsregeln, Prüfung durch Fachpersonal; keine Zusagen für Statik oder Installation.'}
 ],
 target:[
  {title:'Kunden',text:'DIY-, Profi- und DIFM-Kunden mit einem durchgängigen Projektkonto begleiten.'},
  {title:'Nutzen',text:'Material, Wissen und verlässliche Umsetzung in einem Projektablauf verbinden.'},
  {title:'Wertschöpfung',text:'ICR um qualitätsgesicherte Daten, Projektlisten und assistierte Beratung erweitern.'},
  {title:'Partner',text:'Hersteller und Handwerksbetriebe mit klaren Leistungs- und Qualitätsregeln integrieren.'},
  {title:'Finanzen',text:'Warenmarge als Kern; Servicegebühren nur bei nachgewiesenem Kundennutzen ergänzen.'}
 ],
 actions:[
  {id:'foundation',name:'Datenbasis & Pilotmessung',owner:'IT / Data & Controlling',phase:'0–3 Monate',status:'Geplant',impact:5,effort:2,risk:2,deliverable:'Produktdaten für einen Pilotbereich prüfen; Baseline für Suchzeit, Conversion und Fehlbestände erheben.',gate:'≥95 % vollständige Pflichtattribute; Messkonzept durch Fachbereich freigegeben.',depends:'Keine'},
  {id:'assistant',name:'Beratungsassistent pilotieren',owner:'Vertrieb & IT',phase:'0–3 Monate',status:'Geplant',impact:4,effort:2,risk:2,deliverable:'Internen Wissensassistenten mit zwei Pilotmärkten und kontrolliertem Wissensbestand testen.',gate:'20 % weniger Suchzeit und ≥95 % korrekte Testantworten.',depends:'Datenbasis & Pilotmessung'},
  {id:'projectpilot',name:'Projektbegleiter mit Kunden testen',owner:'Digital Commerce & CX',phase:'3–6 Monate',status:'Geplant',impact:5,effort:3,risk:2,deliverable:'Eine Projektkategorie, 15 Kundeninterviews und klickbarer Prototyp; danach begrenzter Live-Pilot.',gate:'Positiver inkrementeller Deckungsbeitrag im Vergleichstest; Pilotkosten einbeziehen.',depends:'Datenbasis & Pilotmessung'},
  {id:'partners',name:'Servicepartner anbinden',owner:'Services & Partnermanagement',phase:'3–6 Monate',status:'Geplant',impact:4,effort:3,risk:3,deliverable:'Regionalen Partnerpilot mit Statusmeldungen, Leistungsumfang und verbindlichem Serviceprozess aufbauen.',gate:'≥90 % termingerechte Aufträge und tragfähige Marge nach Servicekosten.',depends:'Projektbegleiter mit Kunden testen'},
  {id:'forecastpilot',name:'Prognose im Schattenbetrieb',owner:'Supply Chain & Data',phase:'6–12 Monate',status:'Geplant',impact:5,effort:4,risk:3,deliverable:'Nachfrageprognose für eine Warengruppe gegen bestehende Planung vergleichen.',gate:'10 % weniger Fehlbestände, ohne zusätzlichen Lagerbestand; saisonale Effekte kontrollieren.',depends:'Datenbasis & Pilotmessung'},
  {id:'scale',name:'Skalierung & Erlösmodell validieren',owner:'Geschäftsführung & Controlling',phase:'6–12 Monate',status:'Geplant',impact:4,effort:4,risk:3,deliverable:'Erfolgreiche Piloten auf weitere Märkte ausweiten; Zahlungsbereitschaft für Services prüfen.',gate:'Nur nach bestandenem Pilot-Gate und positivem Business Case skalieren.',depends:'Projekt- und Servicepilot'}
 ],
 recommendation:'Zuerst die Datengrundlage und einen internen Beratungsassistenten freigeben. Den Projektbegleiter parallel mit Kunden validieren. Größere Plattform- und Abo-Investitionen erst nach einem positiven Pilotnachweis entscheiden.',
 notes:{steckbrief:'',reifegrad:'',muster:'',kunden:'',innovation:'',plattform:'',erloese:'',massnahmen:''}
};

Object.assign(DEFAULT_STATE, structuredClone(SUPPLEMENT));
DEFAULT_STATE.ideas=enrichIdeas(DEFAULT_STATE.ideas);
Object.assign(SOURCES,{methods:{title:"Methoden und Reifegrad",organization:"DHBW Karlsruhe · Jonas Staib",file:"docs/2026-11-03 Methoden_und_Reifegrad.pdf.pdf"},patterns:{title:"Muster und Ideen",organization:"DHBW Karlsruhe · Jonas Staib",file:"docs/2026-11-03 Muster_und_Ideen.pdf.pdf"}});
TABS.find(t=>t.id==="reifegrad").subtitle="";

DEFAULT_STATE.actions.forEach(a=>a.originId='');

DEFAULT_STATE.analysisRevision=1;

for(const action of DEFAULT_STATE.actions)Object.assign(action,{situation:'Pilotvorschlag aus der öffentlichen Außensicht auf ICR, Daten und Services.',rationale:'Mit begrenztem Pilotumfang den Nutzen für Beratung, Projektbegleitung oder Warenversorgung nachweisen.',reference:'Appelfeller & Feldmann (2018), Die digitale Transformation des Unternehmens; Geschäftsbericht 2025/26, S. 71–73.',effect:action.gate,risks:'Datenqualität, Integration, Fachkapazität und zusätzliche Betriebs- oder Partnerkosten vor Freigabe prüfen.'});

DEFAULT_STATE.customerAnalysis=structuredClone(CUSTOMER_ANALYSIS);
