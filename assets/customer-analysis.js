// Termin 4/5: independent analysis state; earlier analysis modules remain unchanged.
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=v=>v===null?'Offen':new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(v);
const date='18.11.2026';
const acquisition='https://www.hornbach-holding.de/nachrichten/innovatives-start-up-wird-teil-der-hornbach-gruppe-hornbach-baumarkt-ag-erwirbt-seniovo-den-marktfuehrer-fuer/5178e839-a284-4fc0-bdcb-eb9526b17f81';
const app='https://play.google.com/store/apps/details?id=de.hornbach';
const personaSegments={
 diy:'Private Heimwerker (DIY)',
 professional:'Gewerbliche Profikunden',
 difm:'Do-it-for-me-Kunden (DIFM)'
};
const journeySegments={
 diy:[
  ['Suchmaschine, Projektanleitung, HORNBACH-App','Marktbesuch, Austausch im persönlichen Umfeld','Welche Arbeitsschritte und Materialien gehören zum Projekt?','Ein verständlicher Überblick über Umfang und Machbarkeit.','Geprüfte Schritt-für-Schritt-Übersicht mit klaren Materialanforderungen.'],
  ['Onlineshop, Produktdaten, digitale Materialliste','Fachberatung im Markt, Handwerker-Service','Mengen, Varianten und Kompatibilität über mehrere Kontakte zusammenführen.','Eine passende Materialkombination und verlässliche Mengen.','Eine gemeinsame Projektliste, die App und Beratung mit Einwilligung nutzen.'],
  ['Warenkorb, Reservierung und Click & Collect','Markt, Abholung, persönliche Beratung','Beratung, Liste und Bestellung können erneute Eingaben erfordern.','Verbindliche Bestellung mit klarer Verfügbarkeit.','Geprüfte Materialliste direkt in Warenkorb oder Reservierung übernehmen.'],
  ['Projektanleitung, Statusinformation, Servicekontakt','Baustelle, Lieferung, regionale Vertragsbetriebe','Material, Liefertermin und Ausführung müssen zusammenpassen.','Vollständiges Material rechtzeitig vor dem Arbeitsschritt.','Status zu freigegebenen Materialien und Serviceübergaben teilen.'],
  ['Kundenservice, Reklamation, Onlinebewertung','Markt, Rückgabe, Servicegespräch','Erfahrungen nach Abschluss werden nicht immer in die nächste Planung übernommen.','Eine verständliche Lösung offener Probleme.','Freiwilliges Projektfeedback einholen und sichtbar darauf reagieren.']
 ],
 professional:[
  ['HORNBACH-Website, Sortimentssuche, Angebote','Baustelle, Kollegennetzwerk, Lieferantenkontakt','Produkte und Verfügbarkeit müssen zum konkreten Auftrag und Zeitplan passen.','Schnell einschätzen, ob HORNBACH den Auftrag versorgen kann.','Projektbezogene Sortimentseinstiege mit Verfügbarkeit und Profi-Service bündeln.'],
  ['Onlineshop, App, Merklisten und Produktdaten','Profi-Service, Fachberatung, wiederkehrende Einkaufswege','Wiederkehrende Bedarfe, Mengen und Produktspezifikationen kosten Zeit.','Eine vollständige, schnell bestellbare Bedarfsliste.','Projektlisten mit Wiederbestellung, Mengenprüfung und fachlicher Rückfrage verbinden.'],
  ['Onlinebestellung, Rechnungskauf soweit verfügbar, Reservierung','Markteinkauf, Abholung, Lieferung zur Baustelle','Zeitfenster, mehrere Lieferungen und Baustellenlogistik müssen abgestimmt werden.','Ware vollständig zum vereinbarten Termin erhalten.','Bestellung und Lieferstatus je Auftrag übersichtlich zusammenführen.'],
  ['Digitale Auftrags- und Lieferinformationen','Baustelle, eigenes Team, Lieferanten und Servicepartner','Verspätungen oder fehlende Positionen können Folgearbeiten blockieren.','Materialverfügbarkeit passend zum Baufortschritt.','Abweichungen früh melden und klare Kontaktwege für die Klärung bieten.'],
  ['Rechnung, Kundenservice, digitale Bestellhistorie','Rückgabe, Reklamation, persönliche Betreuung','Probleme und Nachbestellungen kosten Zeit, wenn der Auftragskontext fehlt.','Eine schnelle Klärung mit Bezug auf den Auftrag.','Auftragsbezogenes Feedback und Wiederbestellung vereinfachen.']
 ],
 difm:[
  ['Projektideen, Serviceinformationen, Website','Empfehlungen aus dem Umfeld, Beratung im Markt','Unklarheit, welche Arbeiten selbst nötig sind und was ein Betrieb übernehmen kann.','Vertrauen in einen passenden, realisierbaren Projektweg.','Projektstart mit verständlicher Abgrenzung von Material und Handwerkerleistung.'],
  ['Digitale Produktinformationen, Serviceanfrage','Beratung, Aufmaß und Abstimmung mit Fachbetrieb','Materialauswahl, Leistungsumfang und Zuständigkeiten müssen zusammenpassen.','Ein abgestimmter Plan mit transparenten Leistungen und Kosten.','Material- und Serviceplanung mit nachvollziehbarer Übergabe koordinieren.'],
  ['Onlineauswahl, Termin- und Angebotskommunikation','Marktberatung, Auftrag mit ausführendem Betrieb','Bestellung, Angebot und Leistungsfreigabe können getrennte Schritte sein.','Klarheit, wer Material und Ausführung beauftragt.','Nächste Schritte, Preise und Zuständigkeiten vor Freigabe darstellen.'],
  ['Statusmeldungen, Servicekontakt','Lieferung, Baustelle, regionaler Vertragsbetrieb','Terminänderungen oder Rückfragen zwischen Kunde, Markt und Betrieb abstimmen.','Verlässlicher Fortschritt und ein erreichbarer Ansprechpartner.','Freigegebene Statusinformationen und Kontaktperson je Projekt anbieten.'],
  ['Kundenservice, Servicefeedback','Abnahme, Nachbesserung, persönliche Rückmeldung','Offene Punkte nach der Ausführung können schwer zuzuordnen sein.','Eine nachvollziehbare Lösung bei Mängeln oder Restarbeiten.','Projektbezogene Rückmeldung mit klarer Weiterleitung an die zuständige Stelle.']
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
 journey:[
  {id:'discover',name:'Entdecken',online:'Suchmaschine, HORNBACH-Projektinformationen, Video-Tutorials',offline:'Markt, Austausch im persönlichen Umfeld',action:'HORNBACH stellt Produkt- und Projektinformationen bereit.',pain:'Unsicherheit darüber, welche Arbeitsschritte und Materialien zum Vorhaben gehören.',emotion:'Neugier, zugleich Überforderung durch Informationsfülle.',moment:'Erster belastbarer Überblick über Umfang und Machbarkeit.',opportunity:'Projektorientierte Einstiegsseite mit verständlicher Material- und Arbeitsschrittübersicht.',risk:'Unvollständige oder durch KI falsch zusammengefasste Informationen führen zu falschen Erwartungen.',future:'Geführter Projektstart mit geprüften Informationen und sichtbaren Grenzen der Auskunft.',measure:'Projektstart',metric:'Anteil vollständig erstellter Projektlisten',currentEmotion:3,targetEmotion:4,currentSatisfaction:3,targetSatisfaction:4,severity:3,source:'gb26',pages:'190, 195'},
  {id:'plan',name:'Planen',online:'Onlineshop, App, digitale Produktinformationen',offline:'Fachberatung im Markt, Handwerker-Service',action:'Sortiment, Beratung und Projektservices unterstützen die Auswahl.',pain:'Mengen, Varianten und Kompatibilität müssen über mehrere Kontakte zusammengeführt werden.',emotion:'Unsicherheit und Angst vor Fehlkäufen.',moment:'Entscheidung für Materialkombination und benötigte Mengen.',opportunity:'Gemeinsame Projektliste mit Mengenprüfung und Übergabe an die Fachberatung.',risk:'Fehlerhafte Empfehlungen oder unklare Zuständigkeit; keine automatischen sicherheitskritischen Bauzusagen.',future:'Freigegebene Projektliste wird zwischen App und Beratung mit Einwilligung weiterverwendet.',measure:'Projektliste',metric:'Fehlpositionen je geprüfter Materialliste',currentEmotion:2,targetEmotion:4,currentSatisfaction:2,targetSatisfaction:4,severity:5,source:'gb26',pages:'37, 72–73, 195'},
  {id:'buy',name:'Kaufen',online:'Onlinebestellung, Reservieren und Abholen über die App',offline:'Markt, Abholung, persönliche Beratung',action:'HORNBACH verbindet Online-Warenbezug und stationäre Märkte im ICR-Ansatz.',pain:'Ein Wechsel zwischen Beratung, Liste und Bestellung kann erneute Eingaben erfordern; tatsächliche Häufigkeit ist zu prüfen.',emotion:'Zeitdruck und Sorge um Verfügbarkeit.',moment:'Verbindliche Bestellung und Abholzusage.',opportunity:'Geprüfte Liste in Warenkorb oder Reservierung übernehmen; Verfügbarkeit und Preis klar anzeigen.',risk:'Veraltete Bestandsinformationen und unklare Verantwortlichkeit bei Marktplatzartikeln.',future:'Kontext bleibt beim Übergang von der Liste zur Bestellung erhalten.',measure:'Kontextübergabe',metric:'Abschlussquote begonnener Projektbestellungen',currentEmotion:3,targetEmotion:4,currentSatisfaction:3,targetSatisfaction:4,severity:4,source:'gb26',pages:'37, 72'},
  {id:'implement',name:'Umsetzen',online:'Projektanleitungen, Statusinformation und Servicekontakt',offline:'Baustelle, Lieferung, regionale Vertragsbetriebe',action:'Der Handwerker-Service ergänzt den Warenbezug durch regionale Betriebe.',pain:'Material, Liefertermin und Ausführung müssen zusammenpassen; eine einheitliche digitale Projektakte ist nicht belegt.',emotion:'Anspannung bei Terminabhängigkeiten.',moment:'Material ist rechtzeitig vollständig verfügbar.',opportunity:'Gemeinsamer Status für freigegebene Materialien, Lieferungen und Serviceübergaben.',risk:'Partnerabhängigkeit, zusätzliche Koordination und sensible Projektinformationen.',future:'Nachvollziehbare Statusmeldungen mit klarer Kontaktperson bei Abweichungen.',measure:'Projektstatus',metric:'Anteil termingerechter vollständiger Lieferungen',currentEmotion:2,targetEmotion:4,currentSatisfaction:2,targetSatisfaction:4,severity:4,source:'gb26',pages:'37, 72–73'},
  {id:'after',name:'Danach',online:'Kundenservice, Reklamation, Onlinebewertung',offline:'Markt, Rückgabe und Servicegespräch',action:'Das Kundenservice-Center bearbeitet Rückmeldungen und gibt Erkenntnisse an Fachbereiche weiter.',pain:'Erfahrungen können in Bewertungen eingehen; systematische digitale Mitentwicklung durch Projektkunden ist nicht nachgewiesen.',emotion:'Erleichterung bei Erfolg, Frustration bei ungelösten Restproblemen.',moment:'Eine Reklamation wird verständlich und verbindlich gelöst.',opportunity:'Projektbezogene Nachbefragung und Einladung zu freiwilligen Konzepttests.',risk:'Selektionsverzerrung und unerwünschte Kontaktaufnahme; Zweck und Einwilligung klären.',future:'Feedback führt zu sichtbarer Rückmeldung und geeigneten Verbesserungsaufgaben.',measure:'Feedbackschleife',metric:'Lösungsquote und Zufriedenheit nach Servicekontakt',currentEmotion:3,targetEmotion:4,currentSatisfaction:3,targetSatisfaction:4,severity:3,source:'gb26',pages:'195–196'}
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
 ['proposal','Pain Points'],
 ['measurement','Messplan'],
 ['scenario','Reifegrad-Wirkung']
];
let activeJourneyTab=journeyTabs[0][0];
let activeJourneySegment='all';
const journeyLayers=[['current','Ist'],['target','Soll']];
const visibleJourneyLayers=new Set(journeyLayers.map(([id])=>id));
let subview='journey',exampleFilter='Alle';
const lecture=(which,pdf,printed)=>`<a class="source-ref" href="docs/${which==='journey'?'2026-11-18 Kunde_und_Journey.pdf':'2026-11-18 Open_Innovation.pdf'}#page=${pdf}" target="_blank" rel="noopener">Termin ${which==='journey'?4:5} · Folie ${printed} · PDF-Seite ${pdf}</a>`;
const sourceUrl=url=>/^https?:\/\//i.test(url)?`<a class="source-ref" href="${esc(url)}" target="_blank" rel="noopener">Originalquelle ↗</a>`:'';
const section=(title,body)=>`<section class="ca-section">${title?`<h2>${title}</h2>`:''}${body}</section>`;
let openJourneyPhase=null;

function journeyBoard(phases){
 return `<figure class="ca-journey-board" aria-label="Die fünf Phasen der Customer Journey">
  <ol class="ca-board-phases">
   ${phases.map((phase,i)=>`<li><button type="button" class="ca-board-phase" id="ca-board-phase-${i}" aria-expanded="false" aria-controls="ca-phase-${i}"><span class="ca-board-hole" aria-hidden="true"><span class="ca-board-nail"></span></span><span class="ca-board-label">${esc(phase.name)}</span></button></li>`).join('')}
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
function curves(data){
 const visible=journeyLayers.map(([id])=>id).filter(id=>visibleJourneyLayers.has(id));
 return `<figure class="ca-curves"><figcaption><h3>Emotion und Zufriedenheit</h3><p>Eigene Annahmen auf einer Skala von 1 (sehr negativ) bis 5 (sehr positiv). Keine erhobenen Kundendaten; Soll zeigt ein hypothetisches Zielbild.</p></figcaption>${['Emotion','Satisfaction'].map((metric,mi)=>`<svg viewBox="0 0 700 230" role="img" aria-label="${mi?'Zufriedenheit':'Emotion'} je Phase, Ist und Soll"><text x="45" y="20">${mi?'Zufriedenheit':'Emotion'}</text>${[1,2,3,4,5].map(v=>`<line x1="45" x2="655" y1="${190-v*30}" y2="${190-v*30}" class="ca-grid"/><text x="20" y="${195-v*30}">${v}</text>`).join('')}${visible.map(key=>{const points=data.journey.map((d,i)=>({x:70+i*140,y:190-d[key+metric]*30,value:d[key+metric],name:d.name}));return `${points.slice(0,-1).map((p,i)=>p.value===null||points[i+1].value===null?'':`<line x1="${p.x}" y1="${p.y}" x2="${points[i+1].x}" y2="${points[i+1].y}" class="ca-${key}"/>`).join('')}${points.map(p=>p.value===null?'':`<circle cx="${p.x}" cy="${p.y}" r="5" class="ca-${key}"><title>${esc(p.name)} · ${key==='current'?'Ist':'Soll'} ${p.value}</title></circle>`).join('')}`;}).join('')}${data.journey.map((d,i)=>`<text x="${70+i*140}" y="215" text-anchor="middle">${esc(d.name)}</text>`).join('')}</svg>`).join('')}<div class="chart-legend">${visibleJourneyLayers.has('current')?'<span class="status-tag orange">Ist · Annahme</span>':''}${visibleJourneyLayers.has('target')?'<span class="status-tag pink">Soll · Vorschlag</span>':''}</div></figure>`;
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
function journeyView(state,{editing,cite},tab){
 const data=state.customerAnalysis,showCurrent=visibleJourneyLayers.has('current'),showTarget=visibleJourneyLayers.has('target');
 const views={
  persona:()=>personaView(data,editing),
  map:()=>section('',`${journeyBoard(data.journey)}
  ${data.journey.map((p,i)=>{const segment=journeySegments[activeJourneySegment]?.[i];const online=segment?.[0]??p.online,offline=segment?.[1]??p.offline,pain=segment?.[2]??p.pain,moment=segment?.[3]??p.moment,future=segment?.[4]??p.future;const canEdit=editing&&activeJourneySegment==='all';return `<article class="ca-phase" id="ca-phase-${i}" aria-labelledby="ca-phase-title-${i}" style="--bubble-pointer:${(i+.5)*100/data.journey.length}%" hidden><header><h3 id="ca-phase-title-${i}">${esc(p.name)}</h3><div class="pattern-filter ca-journey-filters" role="group" aria-label="Journey-Ansicht">
   <select class="ca-segment-filter" id="ca-segment-${i}" data-ca-segment aria-label="Customer Journey nach Kundensegment filtern">
    <option value="all" ${activeJourneySegment==='all'?'selected':''}>Alle Segmente · Ausgangsjourney</option>
    ${Object.entries(personaSegments).map(([id,label])=>`<option value="${id}" ${activeJourneySegment===id?'selected':''}>${esc(label)}</option>`).join('')}
   </select>
   ${journeyLayers.map(([id,label])=>`<button type="button" id="ca-layer-${i}-${id}" data-ca-mode="${id}" aria-pressed="${visibleJourneyLayers.has(id)}">${visibleJourneyLayers.has(id)?'<span aria-hidden="true">✓</span> ':''}${label}</button>`).join('')}
  </div></header>${showCurrent||showTarget?`${showCurrent?`<div class="ca-layer ca-layer-current"><h4>Ist</h4>${text(`journey.${i}.online`,'Online-Touchpoints',online,canEdit)}${text(`journey.${i}.offline`,'Offline-Touchpoints',offline,canEdit)}${text(`journey.${i}.action`,'Actions von HORNBACH',p.action,canEdit)}${text(`journey.${i}.moment`,'Moment of Truth',moment,canEdit)}${text(`journey.${i}.pain`,'Pain Point · Hypothese',pain,canEdit)}${text(`journey.${i}.emotion`,'Erfahrung / Emotion · Hypothese',p.emotion,canEdit)}${scale(`journey.${i}.severity`,'Schmerzpunkt · 1 gering bis 5 hoch',p.severity,1,5)}</div>`:''}${showTarget?`<div class="ca-layer ca-layer-target"><h4>Soll</h4>${text(`journey.${i}.future`,segment?'Segmentbezogene Chance / Soll-Erlebnis':'Soll-Erlebnis · Vorschlag',segment?future:p.future,canEdit)}${segment?'':text(`journey.${i}.opportunity`,'Chance / Maßnahme',p.opportunity,canEdit)}</div>`:''}${text(`journey.${i}.risk`,'Risiken und Grenzen',p.risk,canEdit)}${text(`journey.${i}.metric`,'Erfolgskriterium',p.metric,canEdit)}<div class="ca-score-grid">${showCurrent?scale(`journey.${i}.currentEmotion`,'Emotion Ist',p.currentEmotion,1,5)+scale(`journey.${i}.currentSatisfaction`,'Zufriedenheit Ist',p.currentSatisfaction,1,5):''}${showTarget?scale(`journey.${i}.targetEmotion`,'Emotion Soll',p.targetEmotion,1,5)+scale(`journey.${i}.targetSatisfaction`,'Zufriedenheit Soll',p.targetSatisfaction,1,5):''}</div>`:'<p>Wähle Ist oder Soll, um die Phase anzuzeigen.</p>'}<footer class="ca-phase-sources"><h4>Quellen</h4>${cite(p.source,p.pages)}${i===2?sourceUrl(app):''}</footer></article>`;}).join('')}
  ${showCurrent||showTarget?curves(data):''}`),
  proposal:()=>{
   const pain=strongestPain(data);
   return section('Größter Schmerzpunkt & Entwicklungsvorschlag',`<article class="ca-recommendation"><span class="status-tag orange">Eigene Priorisierung · ${pain.severity}/5</span><h3>${esc(pain.name)}: ${esc(pain.pain)}</h3>${recommendation('journey',pain)}<button class="button" data-ca-candidate="journey">${state.actions.some(a=>a.originId==='course-journey')?'Maßnahmenvorschlag aktualisieren':'Als Maßnahmenvorschlag übernehmen'}</button></article>`);
  },
  measurement:()=>`<section class="ca-section" aria-label="Messplan und digitale Kundeninteraktion"><div class="ca-cards">${[
 ['NPS','Promotorenanteil minus Kritikeranteil in Prozentpunkten. Nach Projektabschluss befragen, Antwortquote und Segment ausweisen. Keine gemessene HORNBACH-Baseline; ein Zielwert wird erst nach Erhebung festgelegt.'],
 ['CLV & Kundenbindung','Vereinfachtes Analysemodell: Deckungsbeitrag je Kauf × Käufe pro Jahr × erwartete Beziehungsdauer minus Akquisitionskosten. Gleiche Zeitbasis und Kundensegmente verwenden; kein gemessener HORNBACH-CLV. Kundenbindungsrate: (Kunden am Ende minus Neukunden im Zeitraum) ÷ Kunden am Anfang; ohne eindeutige Kohorte nicht belastbar.'],
 ['Conversion & Service','Abgeschlossene Projektbestellungen ÷ begonnene Projektbestellungen. Ergänzend Fehlpositionen und gelöste Anliegen ohne erneuten Kontakt messen. Zielvorschlag: 20 % weniger Fehlpositionen als die Vergleichsgruppe bei gleicher Prüfmethodik.'],
 ['Wiederkehr & CLV','Wiederkäufe und Deckungsbeiträge je Projektkundensegment beobachten. Für einen CLV fehlen öffentlich Kundendauer, Wiederkaufsfrequenz und Akquisitionskosten. Reichweite oder App-Downloads ersetzen diesen Nachweis nicht.'],
 ['Mobile First & KI-Einstieg','Prüfplan statt erfundenem Testergebnis: mobile Suche, Listenübergabe, Checkout und barrierefreie Bedienbarkeit testen. Bei einem Einstieg über KI-Assistenten Produktdaten, Herkunft und Verfügbarkeit nachvollziehbar halten; keine bestehende Agenten-Anbindung von HORNBACH behauptet.']
 ].map(([t,b])=>`<article class="panel"><h3>${t}</h3><p>${b}</p></article>`).join('')}</div>${lecture('journey',35,37)} ${lecture('journey',41,43)} ${lecture('journey',65,68)} ${lecture('journey',70,73)} ${lecture('journey',71,74)} ${lecture('journey',83,86)}</section>`,
  scenario:()=>scenarioView(state)
 };
 return tab?views[tab]():journeyTabs.slice(0,-1).map(([id])=>views[id]()).join('');
}
function recommendation(kind,p){
 const innovation=kind==='innovation';
 return `<dl class="ca-recommendation-fields"><dt>Ausgangslage</dt><dd>${esc(innovation?p.evidence:p.pain)} ${innovation?'Offene Phasen sind keine nachgewiesenen Schwächen und werden separat als Beleglücken geführt.':'Die Priorisierung ist eine eigene Hypothese, kein erhobenes Kundenurteil.'}</dd><dt>Maßnahme · wer · bis wann</dt><dd>${esc(innovation?p.measure:p.opportunity)} Zuständigkeit im Vorschlag: Digital Commerce und Marktberatung, bei Co-Creation zusätzlich ein freiwilliges Kundenpanel. Zeithorizont: drei Monate für einen begrenzten Test. Dies ist ein konzeptioneller Vorschlag, kein gestartetes Projekt.</dd><dt>Herleitung & Alternative</dt><dd>${innovation?'Gemeinsame Konzepttests schließen die Lücke zwischen passivem Feedback und Mitentwicklung. Ein reines öffentliches Voting wäre leichter skalierbar, liefert aber weniger Kontext und ist anfällig für Verzerrungen.':'Die Verbindung von Informationen und Beratung adressiert Kontextverlust und Fehlmengen. Zusätzliche isolierte Informationsseiten wären einfacher, würden den Kanalbruch aber nicht gezielt lösen.'}</dd><dt>Wissenschaftliche Grundlage</dt><dd>${innovation?'Chesbrough (2003), Open Innovation; Vorlesung Termin 5, Folien 15, 21–23, 48–49.':'Lemon & Verhoef (2016), Understanding Customer Experience Throughout the Customer Journey; Vorlesung Termin 4, Folien 81, 84–86.'} Eigene Übertragung auf HORNBACH.</dd><dt>Wirkung & Messung</dt><dd>${innovation?'Zielvorschläge: mindestens zehn verwertbare Verbesserungsideen in acht Wochen; mindestens zwei davon fachlich geprüft in einen Prototyp überführen. Einreichungslog, Juryentscheidung und Prototypnachweis dokumentieren; keine bestehenden Ist-Kennzahlen.':'Zielvorschlag: Fehlpositionen in geprüften Materiallisten gegenüber einer Vergleichsgruppe um 20 % reduzieren. Aufgabenerfolg und Zufriedenheit getrennt messen; Segment, Stichprobe und Zeitraum dokumentieren.'}</dd><dt>Aufwand & Risiken</dt><dd>${innovation?'Rekrutierung und Moderation, Nutzungsrechte, Vertraulichkeit, Integrationsaufwand und enttäuschte Erwartungen bei nicht umgesetzten Ideen.':'Produktdatenqualität, Integration von App und Beratung, Schulung, zusätzliche Kosten und Vertrauen in Empfehlungen. Sicherheitskritische Arbeiten bleiben in qualifizierten Händen.'}</dd></dl>`;
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
  proposal:()=>section('Schwächste belegbare Einbindung & Empfehlung',weak?`<p>Unter den bewerteten Phasen ist <strong>${esc(weak.name)} (${weak.current}/3)</strong> am schwächsten eingeordnet. ${data.involvement.filter(p=>p.current===null).length} Phasen bleiben offen und sind zunächst zu untersuchen.</p>${recommendation('innovation',weak)}<button class="button" data-ca-candidate="innovation">${state.actions.some(a=>a.originId==='course-innovation')?'Maßnahmenvorschlag aktualisieren':'Als Maßnahmenvorschlag übernehmen'}</button>`:'<p>Keine bewertete Phase. Zunächst Belege ergänzen; aus offenen Werten wird keine schwächste Stelle berechnet.</p>'),
  campaign:()=>section('Entwurf einer Crowdsourcing-Kampagne',`${Object.entries({goal:'Ziel',audience:'Zielgruppe',incentive:'Anreiz',rules:'Regeln & Rechte',selection:'Bewertung',feedback:'Rückmeldung'}).map(([key,title])=>text('campaign.'+key,title,data.campaign[key],editing)).join('')}<p class="scope-note">Vorgeschlagenes Format: Customer Advisory Panel mit Co-Creation, keine bereits durchgeführte Kampagne. Risiko: selbstselektierte Teilnehmende; verschiedene Projektkundensegmente gezielt berücksichtigen.</p>${lecture('innovation',30,30)} ${lecture('innovation',45,45)}`),
  scenario:()=>scenarioView(state)
 };
 return view?views[view]():Object.entries(views).filter(([id])=>id!=='scenario').map(([,render])=>render()).join('');
}
export function customerScenario(state){
 const groups=structuredClone(state.model),data=state.customerAnalysis;
 const changes=[];
 const update=(group,id,value,why)=>{const c=groups.find(g=>g.id===group).criteria.find(c=>c.id===id),before=c.current;if(before!==null&&before>=value)return;c.current=value;changes.push({name:c.name,before,value,why});};
 if(data.scenarioJourney){update('product','monitor',3,'Gemeinsame Projektliste und Statusdaten wären nachzuweisen.');update('product','control',3,'Zusammenhängende Konfiguration mehrerer Projektbausteine wäre erforderlich.');update('customer','journey',4,'Durchgängige digitale Übergaben müssten im definierten Projektfall belegt sein.');}
 if(data.scenarioInnovation)update('customer','development',2,'Digitale Ideen- und Produkttests mit Kunden müssten tatsächlich stattfinden.');
 return {groups,changes};
}
function scenarioView(state){const scenario=customerScenario(state),before=state.model.map(g=>({name:g.name,value:mean(g.criteria,'current')})),after=scenario.groups.map(g=>mean(g.criteria,'current'));
 const xy=(i,v)=>[160+Math.cos(-Math.PI/2+i*2*Math.PI/3)*90*v/4,140+Math.sin(-Math.PI/2+i*2*Math.PI/3)*90*v/4];
 return section('Mögliche Wirkung auf den Reifegrad',`<p>Eigenes Wirkungsszenario: Die Maßnahmen verändern nicht die bewertete Ausgangslage. Höhere Stufen wären erst nach Umsetzung und Nachweis gerechtfertigt; eine bessere Zufriedenheit allein erfüllt keine Modellstufe.</p><div class="ca-scenario-options"><label><input type="checkbox" data-ca-scenario="scenarioJourney" ${state.customerAnalysis.scenarioJourney?'checked':''}> Integrierte Projektliste und Kontextübergabe</label><label><input type="checkbox" data-ca-scenario="scenarioInnovation" ${state.customerAnalysis.scenarioInnovation?'checked':''}> Digitale Konzept- und Produkttests</label></div><div class="ca-scenario-layout"><svg viewBox="0 0 320 270" role="img" aria-label="Reifegrad: Ausgangslage und hypothetisches Maßnahmenszenario">${[1,2,3,4].map(v=>`<polygon points="${before.map((g,i)=>xy(i,v).join(',')).join(' ')}" class="ca-grid"/>`).join('')}${[before.map(g=>g.value),after].map((values,k)=>values.every(v=>v!==null)?`<polygon points="${values.map((v,i)=>xy(i,v).join(',')).join(' ')}" class="ca-${k?'target':'current'}"/>`:'').join('')}${before.map((g,i)=>{const [x,y]=xy(i,5);return `<text x="${x}" y="${y}" text-anchor="middle">${esc(g.name)}</text>`;}).join('')}</svg><div><div class="chart-legend"><span class="status-tag orange">Ausgangslage</span><span class="status-tag pink">Wirkungsszenario</span></div><ul>${before.map((g,i)=>`<li>${esc(g.name)}: ${fmt(g.value)} → ${fmt(after[i])} / 4</li>`).join('')}</ul><p>Gleich gewichtete Mittelwerte bekannter Kriterien. Keine zusätzlichen Ist-Werte.</p></div></div><ul>${scenario.changes.map(c=>`<li><strong>${esc(c.name)}: ${fmt(c.before)} → ${c.value}</strong> · ${esc(c.why)}</li>`).join('')||'<li>Keine zusätzliche Stufenänderung im ausgewählten Szenario.</li>'}</ul>`);
}
export function renderCustomerAnalysis(state,context,view){
 if(view==='journey')return `<section class="maturity-folder journey-folder">
  <div class="folder-tabs" role="tablist" aria-label="Customer-Journey-Ansichten">${journeyTabs.map(([id,label])=>`<button type="button" role="tab" id="journey-tab-${id}" data-journey-tab="${id}" aria-selected="${activeJourneyTab===id}" tabindex="${activeJourneyTab===id?0:-1}" aria-controls="journey-folder-content">${label}</button>`).join('')}</div>
  <div class="folder-content" id="journey-folder-content" role="tabpanel" aria-labelledby="journey-tab-${activeJourneyTab}" tabindex="0">${journeyView(state,context,activeJourneyTab)}</div>
 </section>`;
 if(view)return `<div class="ca-content">${innovationView(state,context)}${scenarioView(state)}</div>`;
 return `<div class="ca-tabs" role="tablist" aria-label="Kundenanalyse"><button class="button secondary" role="tab" id="ca-tab-journey" aria-controls="ca-content" aria-selected="${subview==='journey'}" data-ca-view="journey">Customer Journey</button><button class="button secondary" role="tab" id="ca-tab-innovation" aria-controls="ca-content" aria-selected="${subview==='innovation'}" data-ca-view="innovation">Open Innovation</button></div><div id="ca-content" role="tabpanel" aria-labelledby="ca-tab-${subview}">${subview==='journey'?journeyView(state,context):innovationView(state,context)}${scenarioView(state)}</div>`;}
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
  const layerButton=el.closest('[data-ca-mode]');
  const layer=layerButton?.getAttribute('data-ca-mode');
  if(layer){
   if(!visibleJourneyLayers.delete(layer))visibleJourneyLayers.add(layer);
   render();
   globalThis.document?.getElementById(layerButton.id)?.focus({preventScroll:true});
   return;
  }
  for(const [attr,set] of [['data-ca-view',v=>subview=v],['data-ca-filter',v=>exampleFilter=v]]){const button=el.closest('['+attr+']');if(button){set(button.getAttribute(attr));render();return;}}
  const candidate=el.closest('[data-ca-candidate]');if(candidate){const kind=candidate.dataset.caCandidate,id='course-'+kind,old=state.actions.find(a=>a.originId===id);if(!old&&state.actions.length>=40){toast('Höchstens 40 Maßnahmen möglich.');return;}const p=kind==='journey'?strongestPain(state.customerAnalysis):weakestInvolvement(state.customerAnalysis);if(!p)return;const action={id,name:kind==='journey'?'Journey: '+p.name+' – gemeinsame Projektliste':'Open Innovation: '+p.name+' – Kundenpanel',owner:'Digital Commerce / Marktberatung · vorgeschlagen',phase:'0–3 Monate',status:old?.status||'Geplant',impact:4,effort:3,risk:3,deliverable:kind==='journey'?p.opportunity:p.measure,gate:kind==='journey'?'20 % weniger Fehlpositionen gegenüber einer Vergleichsgruppe; Zufriedenheit separat erheben.':'Zehn verwertbare Ideen in acht Wochen, zwei fachlich geprüfte Prototypverbesserungen.',depends:'Konzeptioneller Vorschlag; Freigabe, Datenzugang und Teilnehmende erforderlich.',originId:id,situation:kind==='journey'?p.pain:p.evidence,rationale:kind==='journey'?'Größter Schmerzpunkt der hypothetischen Journey; Kontextverlust zwischen Beratung und Bestellung adressieren.':'Schwächste bewertete Phase der Kundeneinbindung; offene Phasen zunächst belegen.',reference:kind==='journey'?'Lemon & Verhoef (2016); Termin 4, Folien 84–86; GB 2025/26, S. '+p.pages:'Chesbrough (2003); Termin 5, Folien 47–49; GB 2025/26, S. 190, 195–196.',effect:'Wirkung erst nach Prüfung nachweisbar; siehe separates Reifegradszenario in Tab 4.',risks:'Rekrutierung, Datenqualität, Nutzungsrechte, Kosten und Integrationsaufwand.'};if(old)Object.assign(old,action,{id:old.id});else state.actions.push(action);save();render();toast('Begründeter Vorschlag in Maßnahmen übernommen.');return;}
 }
 const set=(path,value)=>{const keys=path.split('.'),last=keys.pop();keys.reduce((o,k)=>o[k],state.customerAnalysis)[last]=value;};
 if(event.type==='input'&&el.dataset.caText){
  if(el.dataset.caText.endsWith('.age')&&!validPersonaAge(el.value))return;
  set(el.dataset.caText,el.value);save();return;
 }
 if(event.type==='change'&&el.matches('[data-ca-segment]')){
  activeJourneySegment=el.value;
  render();
  globalThis.document?.getElementById(el.id)?.focus({preventScroll:true});
  return;
 }
 if(event.type==='change'&&el.dataset.caScore){const value=el.value===''?null:Number(el.value),min=Number(el.dataset.min),max=Number(el.dataset.max);if(value!==null&&(!Number.isInteger(value)||value<min||value>max)){toast('Ungültiger Skalenwert.');render();return;}if(el.dataset.caScore.endsWith('.severity')&&value===null){toast('Die Schmerzpunktpriorisierung benötigt einen Wert von 1 bis 5.');render();return;}set(el.dataset.caScore,value);save();render();return;}
 if(event.type==='change'&&el.dataset.caScenario){state.customerAnalysis[el.dataset.caScenario]=el.checked;save();render();}
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

 for(const p of data.journey){for(const key of ['currentEmotion','targetEmotion','currentSatisfaction','targetSatisfaction'])if(p[key]!==null&&(!Number.isInteger(p[key])||p[key]<1||p[key]>5))throw new Error('Journey-Skalen müssen zwischen 1 und 5 liegen.');if(!Number.isInteger(p.severity)||p.severity<1||p.severity>5)throw new Error('Ungültige Schmerzpunktpriorität.');}
 for(const p of data.involvement)for(const key of ['current','target'])if(p[key]!==null&&(!Number.isInteger(p[key])||p[key]<0||p[key]>3))throw new Error('Kundeneinbindung muss zwischen 0 und 3 liegen.');
 for(const x of data.examples)if(!['Outside-in','Inside-out','Coupled'].includes(x.type)||!['Belegt','Vorschlag'].includes(x.status)||x.sourceUrl&&!/^https?:\/\//i.test(x.sourceUrl))throw new Error('Ungültiges Open-Innovation-Beispiel.');
}
