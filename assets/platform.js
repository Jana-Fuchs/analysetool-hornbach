const actors=[
 ['top','users','Projektkunden','Konsumenten','Kunden übermitteln Projektbedarf, Budget und Termine und buchen bei Bedarf eine Leistung. Sie erhalten eine Materialliste, passende Serviceoptionen und den Projektstatus.'],
 ['left','overview','Händler & Hersteller','Produzenten','Drittanbieter liefern Angebote und Produktdaten, Hersteller ergänzen Kompatibilitäts- und Anwendungshinweise. Kunden bezahlen Waren über den jeweiligen Kaufprozess.'],
 ['right','network','Handwerksbetriebe','Produzenten','Vertragsbetriebe melden freie Kapazitäten und den Ausführungsstatus. Für die erbrachte Arbeit erhalten sie eine Auftragsvergütung gemäß Partnervertrag.'],
 ['bottom','roadmap','Logistik & IT','Partner','Logistikpartner liefern Material und melden den Lieferstatus. IT-Partner unterstützen Schnittstellen und Datenqualität. Beide erbringen Leistungen auf Vertragsbasis.']
];

const owner=['center','network','HORNBACH','Orchestrator','HORNBACH betreibt das Projektkonto, setzt Zugangs- und Qualitätsregeln und bündelt Planung, Warenkauf und Servicebuchung. Als Eigenanbieter trägt HORNBACH zusätzlich Material und Beratung bei.'];
const ecosystemActors=[...actors,owner];
let selectedActor='center';
const projectIdeaLink='<a href="#muster/entwicklungsvorschlaege/project">Digitaler Projektbegleiter</a>';

const platformIdeaRoles=new Map([
 ['project',['Grundlage des Konzepts','Eine gemeinsame Projektliste könnte Bestellung, Lieferung und Handwerksleistung für dasselbe Vorhaben sichtbar machen.']],
 ['advisor',['Mögliche Ergänzung','Die KI-Beratung hilft bei Produktfragen in der Planung. Für den gemeinsamen Bestell- und Auftragsstatus braucht es eine Anbindung an die Projektliste.']]
]);

const shortPlatformIdeaTitles=new Map([
 ['Digitaler Projektbegleiter','Projektbegleiter'],
 ['KI-Beratung als Projektservice','KI-Beratung']
]);

function platformOpportunity({panel,cite,developmentProposals,escape}){
 const cards=developmentProposals.map(idea=>{
  const [role,contribution]=platformIdeaRoles.get(idea.id)??['Passung offen','Für diese Idee ist der Beitrag zu einer Plattform noch zu prüfen.'];
  const title=escape(shortPlatformIdeaTitles.get(idea.name)??idea.name);
  const href=`#muster/entwicklungsvorschlaege/${encodeURIComponent(idea.id)}`;
  const badge=`<span class="status-tag${idea.id==='project'?' pink':''}">${role}</span>`;
  const body=`<p>${escape(idea.description)}</p><p>${contribution}</p>`;
  if(idea.id==='advisor')return `<details class="platform-idea-disclosure">
   <summary><span class="platform-idea-title">${title}</span> ${badge}</summary>
   ${body}
   <a class="source-ref" href="${href}">Zum Entwicklungsvorschlag</a>
  </details>`;
  return `<article>
   <header><h4 class="platform-idea-title"><a href="${href}">${title}</a></h4>${badge}</header>
   ${body}
  </article>`;
 }).join('');
 return `<div class="platform-opportunity">
  ${panel('Lücke in der Projektabwicklung',`
   <p>Bestellung, Lieferung und Handwerksleistung gehören aus Kundensicht zum selben Projekt. Die ausgewerteten Geschäftsberichte beschreiben keine gemeinsame Übersicht, die ihren Status zusammenführt.</p>
   ${cite('gb26','37, 72')}`,'platform-gap')}
  <section class="panel platform-ideas" aria-labelledby="platform-ideas-title">
   <h3 id="platform-ideas-title">Top-Ideen</h3>
   ${cards?`<div class="platform-idea-list">${cards}</div>`:'<p>Im Ideenranking sind noch keine Top-Ideen ausgewählt.</p>'}
   ${developmentProposals.some(idea=>idea.id==='project')?'':'<p>Das ausgearbeitete Plattformkonzept basiert auf dem digitalen Projektbegleiter.</p>'}
  </section>
 </div>`;
}

function roles(context){
 const {cite,panel}=context;
 return `<div class="ecosystem-layout">
  <h2 class="platform-role-heading">Welche Rollen übernimmt HORNBACH?</h2>
  <div class="platform-role-grid">
   ${panel('Eigener Warenhandel',`<p>HORNBACH kauft Waren ein und verkauft sie aus dem eigenen Sortiment direkt an Kunden. Markt, Onlineshop und App greifen dabei für Beratung und Verkauf ineinander.</p>${cite('gb26','37, 72')}`)}
   ${panel('Online-Marktplatz',`<p>In Deutschland betreibt HORNBACH einen Online-Marktplatz im Shop und in der App. Dort verkauft das Unternehmen eigene Waren und stellt ausgewählten Händlern einen Vertriebskanal für deren Produkte zur Verfügung.</p>${cite('gb26','37, 72')}`)}
   ${panel('Handwerker-Service',`<p>HORNBACH organisiert den Service und die Abwicklung zum Festpreis mit Gewährleistung. Regionale Vertragsbetriebe führen die Arbeiten aus. Seniovo ergänzt das Angebot für barrierefreie Badumbauten.</p>${cite('gb26','37, 72')}`)}
  </div>
  <h2>Ansatzpunkte für das Plattformkonzept</h2>
  ${platformOpportunity(context)}
 </div>`;
}

function ecosystemMap({icon,cite}){
 return `<section class="panel ecosystem-panel">
  <h2>Wer wirkt auf der Projektplattform mit?</h2>
  <p class="section-description">Wähle einen Knoten, um zu sehen, welche Leistungen und Daten die Beteiligten austauschen und wer wofür bezahlt.</p>
  <div class="ecosystem-map">
   ${ecosystemActors.map(([position,symbol,name,role])=>`<button type="button" class="${position==='center'?'eco-center':`eco-node eco-${position}`}" data-platform-actor="${position}" aria-controls="platform-actor-detail" aria-pressed="${position===selectedActor}">
    ${icon(symbol)}<strong>${name}</strong><span>${role}</span>
   </button>`).join('')}
  </div>
  <div id="platform-actor-detail" class="platform-actor-detail" aria-live="polite">${actorDetail()}</div>
  <p class="method-caption">Rollenkarte im Zielbild. ${cite('platformLecture','54')}</p>
 </section>`;
}

function actorDetail(){
 const [,,name,role,flow]=ecosystemActors.find(([position])=>position===selectedActor);
 return `<h3>${name} <small>· ${role}</small></h3><p>${flow}</p>`;
}

export function selectPlatformActor(button){
 selectedActor=button.dataset.platformActor;
 const panel=button.closest('.ecosystem-panel');
 for(const actor of panel.querySelectorAll('[data-platform-actor]')){
  actor.setAttribute('aria-pressed',String(actor===button));
 }
 panel.querySelector('#platform-actor-detail').innerHTML=actorDetail();
}

const canvas=[
 ['Eigentümer','HORNBACH betreibt den kuratierten Marktplatz in Shop und App.','HORNBACH betreibt das Projektkonto und verantwortet Zugang, Qualitätsstandards und Reklamationswege.'],
 ['Konsumenten','DIY- und Profikunden finden ergänzende Produkte im Marktplatz.','DIY-, Profi- und DIFM-Kunden koordinieren Material, Termine und optionale Handwerksleistungen über ein Projektkonto.'],
 ['Produzenten','Ausgewählte Drittanbieter erweitern das Sortiment.','Händler und Hersteller liefern Angebote und Produktdaten. Vertragsbetriebe ergänzen buchbare Leistungen und geben ihren Status zurück.'],
 ['Partner','Markt, Shop und App sind die Vertriebskanäle. Der Bericht weist keine eigenständige Gruppe technischer Marktplatzpartner aus.','Logistik- und IT-Partner binden Lieferstatus und Produktdaten über definierte Schnittstellen an.'],
 ['Interaktion & Erlös','Kunden kaufen Waren. HORNBACH erzielt Margen im Eigenhandel. Vertragskonditionen des Marktplatzes sind im Bericht nicht ausgewiesen.','Eine Projektliste führt zur Warenbestellung und bei Bedarf zum Serviceauftrag. Die Basisplanung bleibt im Pilot kostenlos. Eine Gebühr für zusätzliche Koordination wird erst nach dem Pilot getestet.']
];

function concept({icon,cite,panel,platformNote}){
 return `<div class="ecosystem-layout">
  ${panel('Plattformkonzept für den digitalen Projektbegleiter', `
   <p>Die gemeinsame Projektliste verbindet Planung, Beratung und Materialkauf. Die vorgeschlagene Erweiterung ergänzt Angebote, Buchung und Statusmeldungen der Partner.</p>
   <p>Die <a href="#kunden">Customer Journey</a> zeigt, in welchen Segmenten die Projektübergabe hakt. In <a href="#innovation">Open Innovation</a> geht es darum, die Projektliste mit Kunden und Fachleuten zu verbessern.</p>
   <p><strong>Wann lohnt sich die Erweiterung?</strong> Wenn Kunden zusätzlich externe Leistungen buchen möchten und regionale Betriebe freie Kapazitäten haben, kommt ein Plattformpilot infrage. Löst die Projektliste das Problem bereits, kann sie eigenständig bleiben.</p>`,'platform-highlight')}
  <section class="panel">
   <h2>Platform Value Canvas</h2>
   <div class="table-wrap">
    <table class="matrix platform-canvas">
     <thead><tr><th scope="col">Rolle / Interaktion</th><th scope="col"><span class="status-tag orange">Ist</span> Online-Marktplatz</th><th scope="col"><span class="status-tag pink">Zielbild</span> Projektplattform</th></tr></thead>
     <tbody>${canvas.map(([role,today,target])=>`<tr><th scope="row">${role}</th><td>${today}</td><td>${target}</td></tr>`).join('')}</tbody>
    </table>
   </div>
   <p class="method-caption">Beschreibung des Ist und Zuordnung der Rollen durch das Projektteam. ${cite('gb26','37, 72')} ${cite('platformLecture','76')} ${cite('platformLecture','82')}</p>
  </section>
  <details class="additional-details platform-method">
   <summary>Wie wurden Rolle und Muster gewählt?</summary>
   <ol class="simple-list">
    <li><strong>Kompetenzen:</strong> Sortiment, Fachberatung, vorhandene digitale Kanäle und Vertragsbetriebe bilden die Basis. Gemeinsame Projekt- und Statusdaten ergänzen diese Fähigkeiten.</li>
    <li><strong>Rolle:</strong> Für das Zielbild übernimmt HORNBACH die Rolle des Orchestrators und bleibt Warenanbieter. Ein externer KI-Assistent könnte künftig den Erstkontakt übernehmen. Ein solcher Kanal wäre als Zubringer zu prüfen, während Buchung und Projektstatus bei HORNBACH bleiben.</li>
    <li><strong>Vorhandenes Muster:</strong> Two-sided Market verbindet Drittanbieter mit Käufern. Die Auswahl der Anbieter begrenzt Komplexität und unterstützt die Qualität.</li>
    <li><strong>Erweiterungsmuster:</strong> Solution Provider bündelt Material, Beratung und Handwerksleistung. Orchestrator verbindet die Partnerbeiträge über gemeinsame Leistungsstandards, Schnittstellen und Auftragsstatus.</li>
    <li><strong>Bewertung:</strong> Wenn sich Bedarf und Partnerkapazität bestätigen, kann HORNBACH die Kombination in einem regionalen Mikromarkt erproben. Buchungsquote, Termintreue und Deckungsbeitrag zeigen, ob sie den Aufwand rechtfertigt.</li>
   </ol>
   ${cite('platformLecture','81–82')} ${cite('platformLecture','60')}
   <p class="method-caption">Geschäftsmodellmuster nach Gassmann, Frankenberger & Csik (2013). Methodik nach dem <a href="https://websites.fraunhofer.de/entourage-epn/home-2/" target="_blank" rel="noopener">Fraunhofer Ecosystem Participation Navigator</a>. Auswahl und Kombination der Muster durch das Projektteam.</p>
  </details>
  ${ecosystemMap({icon,cite})}
  ${panel('HORNBACH als Orchestrator im Zielbild',platformNote,'platform-highlight')}
  <div class="platform-next"><button type="button" class="button secondary" data-section-tab="pilot">Weiter zur Pilotprüfung</button></div>
 </div>`;
}

const controls=[
 ['customers','Projektkunden zum Start',0,500,10,120,''],
 ['partners','Servicepartner zum Start',0,50,1,8,''],
 ['customerGrowth','Basiswachstum Kunden pro Monat',0,10,1,3,' %'],
 ['partnerGrowth','Basiswachstum Partner pro Monat',0,10,1,2,' %'],
 ['effect','Maximaler Netzwerkeffekt pro Monat',0,10,1,4,' PP']
];
let simulationValues=Object.fromEntries(controls.map(([id,,,,,value])=>[id,value]));
const formatter=new Intl.NumberFormat('de-DE',{maximumFractionDigits:0});
const format=value=>formatter.format(value);

export function simulateNetwork({customers,partners,customerGrowth,partnerGrowth,effect}){
 const months=[{customers,partners}];
 for(let month=1;month<=24;month++){
  const previous=months[month-1];
  months.push({
   customers:previous.customers*(1+(customerGrowth+effect*previous.partners/(previous.partners+20))/100),
   partners:previous.partners*(1+(partnerGrowth+effect*previous.customers/(previous.customers+500))/100)
  });
 }
 return months;
}

function networkResults(values){
 const months=simulateNetwork(values);
 const baseline=simulateNetwork({...values,effect:0});
 return `<div class="platform-charts">${[['customers','Projektkunden'],['partners','Servicepartner']].map(([key,label])=>{
  const last=months.at(-1)[key],without=baseline.at(-1)[key];
  const max=Math.max(1,Math.ceil(last));
  const points=series=>series.map((m,i)=>`${46+i*12},${132-m[key]/max*104}`).join(' ');
  return `<div class="platform-chart">
   <h3>${label}</h3>
   <p><strong>${format(last)}</strong> in Monat 24 · ${format(without)} ohne Netzwerkeffekt</p>
   <svg viewBox="0 0 360 160" role="img" aria-label="${label}: von ${format(values[key])} zu ${format(last)} in 24 Monaten, ohne Netzwerkeffekt zu ${format(without)}">
    <path d="M46 28H334 M46 80H334 M46 132H334" class="platform-chart-grid"/>
    <text x="40" y="32" text-anchor="end">${format(max)}</text><text x="40" y="136" text-anchor="end">0</text>
    ${[0,6,12,18,24].map(month=>`<text x="${46+month*12}" y="151" text-anchor="middle">${month}</text>`).join('')}
    <polyline class="platform-network-line" points="${points(months)}"/>
    <polyline class="platform-baseline-line" points="${points(baseline)}"/>
   </svg>
  </div>`;
 }).join('')}</div>`;
}

function simulation({cite}){
 return `<section class="panel platform-simulation">
  <h2>Wie könnten Kunden und Servicepartner gemeinsam wachsen?</h2>
  <p class="section-description">Vergleiche über 24 Monate, wie sich beide Seiten mit und ohne Netzwerkeffekt entwickeln könnten. Passe die Startwerte und Wachstumsannahmen an den regionalen Pilot an.</p>
  <div class="economics-inputs">
   ${controls.map(([id,label,min,max,step,,suffix])=>`<label class="platform-slider" for="platform-${id}"><span>${label}</span>
    <input id="platform-${id}" data-platform-simulation="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${simulationValues[id]}">
    <output for="platform-${id}" data-suffix="${suffix}">${simulationValues[id]}${suffix}</output>
   </label>`).join('')}
  </div>
  <div class="flow-legend platform-chart-legend"><span>Mit Netzwerkeffekt</span><span>Ohne Netzwerkeffekt</span><span>X-Achse: Monate · Y-Achsen je Marktseite</span></div>
  <div data-platform-results>${networkResults(simulationValues)}</div>
  <details class="additional-details">
   <summary>Annahmen & Rechenweg</summary>
   <p>Jede Seite wächst monatlich um ihre Basisrate plus einen Aufschlag durch die jeweils andere Seite. Aufschlag = maximaler Effekt × Gegenseite ÷ (Gegenseite + Halbwert). Bei 20 Servicepartnern bzw. 500 Projektkunden erreicht der Aufschlag die Hälfte seines Maximums. Beide Seiten nutzen die Werte des Vormonats. Ein Startwert von null bleibt im Modell bei null.</p>
   <p>Die Startwerte stehen für einen kleinen Bestand im regionalen Pilot. Wachstumsraten und Halbwerte sind Modellannahmen und dienen dem Vergleich. Das Modell betrachtet positive indirekte Effekte. In der Praxis können zu viele Anfragen Betriebe überlasten, und ein wachsendes Angebot braucht gute Kuration.</p>
   <p>Handrechnung mit den voreingestellten Werten: 120 × [1 + (3 + 4 × 8 ÷ 28) ÷ 100] ≈ 125 Kunden. Gleichzeitig ergeben 8 × [1 + (2 + 4 × 120 ÷ 620) ÷ 100] ≈ 8,22 Partner. Die Anzeige rundet auf ganze Teilnehmer.</p>
   ${cite('platformLecture','55–56')} ${cite('platformLecture','83')}
  </details>
 </section>`;
}

export function updatePlatformSimulation(section){
 const inputs=[...section.querySelectorAll('[data-platform-simulation]')];
 simulationValues=Object.fromEntries(inputs.map(input=>{
  const output=input.nextElementSibling;
  output.value=input.value+output.dataset.suffix;
  return [input.dataset.platformSimulation,input.valueAsNumber];
 }));
 section.querySelector('[data-platform-results]').innerHTML=networkResults(simulationValues);
}

function pilot({cite,panel}){
 const stages=[
  ['0–3 Monate','Serviceangebot sichern','Digital Commerce und Partnermanagement wählen eine Projektkategorie mit erkennbarem Buchungsbedarf und ausreichend regionaler Handwerkskapazität. Die Betriebe vereinbaren Leistungsumfang und Statusmeldungen.'],
  ['3–6 Monate','Kunden im Mikromarkt gewinnen','Digital Commerce und Pilotmärkte sprechen bestehende Projektkunden in Beratung, Shop und App an. Die Projektliste bleibt kostenlos. Der Pilot vergleicht Buchungsquote und Aufwand mit der bisherigen Abwicklung.'],
  ['6–12 Monate','Wirkung prüfen und Gebühren testen','Controlling prüft termingerechte Aufträge und inkrementellen Deckungsbeitrag. Bei mindestens 90 % termingerechten Aufträgen und positivem Beitrag kann HORNBACH in weiteren Märkten testen, ob Kunden für zusätzliche Koordination zahlen.']
 ];
 return `<div class="ecosystem-layout">
  ${panel('Partnerbuchung regional erproben',`<p>Der Pilot baut auf der Projektliste aus der Top-Idee ${projectIdeaLink} auf. Er prüft, ob Kunden daraus eine Handwerksleistung buchen können und ob Betriebe Kapazitäten und Auftragsstatus verlässlich melden. Die Projektkategorie wird anhand von Kundenbedarf und regionaler Partnerkapazität ausgewählt.</p>${cite('platformLecture','51')} ${cite('platformLecture','66–67')}`,'platform-highlight')}
  ${simulation({cite})}
  <h2>Vom Partnerangebot zur Entscheidung</h2>
  <div class="roadmap-grid">
   ${stages.map(([time,title,body])=>`<section class="roadmap-column"><div class="roadmap-heading"><h3>${time}</h3></div><article class="roadmap-card"><h4>${title}</h4><p>${body}</p></article></section>`).join('')}
  </div>
  ${panel('Empfehlung für den Markteintritt',`
   <dl class="platform-recommendation">
    <dt>Ausgangslage</dt><dd>Ein Marktplatz und ein Netz regionaler Handwerksbetriebe bestehen. Der Pilot setzt an der gemeinsamen Sicht auf Bestellungen, Lieferungen und Serviceaufträge an. ${cite('gb26','37, 72')}</dd>
    <dt>Maßnahme</dt><dd>Services und Partnermanagement vereinbaren mit Digital Commerce bis Monat 6 einen einheitlichen Leistungsumfang, freie Kapazitäten und Statusmeldungen für einen regionalen Piloten.</dd>
    <dt>Herleitung</dt><dd>In der vorgesehenen Orchestrator-Rolle würde HORNBACH Zugang und Abwicklung gestalten. Der regionale Start bündelt Nachfrage und Kapazität und adressiert das Henne-Ei-Problem.</dd>
    <dt>Wissenschaftliche Quelle</dt><dd>Parker, Van Alstyne & Choudary (2016), <em>Platform Revolution</em>, zur wechselseitigen Verstärkung von Angebot und Nachfrage. ${cite('platformLecture','85')}</dd>
    <dt>Erwartete Wirkung</dt><dd>Die gemeinsame Abwicklung könnte mehr Anfragen in bestätigte Buchungen überführen. Der Pilot misst Buchungsquote, termingerechte Ausführung und inkrementellen Deckungsbeitrag gegenüber der bisherigen Abwicklung.</dd>
    <dt>Aufwand & Risiken</dt><dd>IT-Anbindung, Schulung und Reklamationsbearbeitung verursachen Anlaufkosten. Abhängigkeit von einzelnen Betrieben, unübersichtliche Angebote und Bevorzugung im Ranking können die Akzeptanz schwächen. Partnerprüfung, transparente Rankingkriterien und definierte Datenzugriffe gehören zum Pilot.</dd>
   </dl>
   <p class="method-caption">Zeiträume, Verantwortlichkeiten und Entscheidungskriterien sind Pilotvorschläge des Projektteams.</p>
   <a class="button secondary" href="#massnahmen">Zu Zielmodell & Maßnahmen</a>`)}
 </div>`;
}

const views={roles,concept,pilot};

export function platformView(id,context){
 return views[id](context);
}
