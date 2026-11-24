const actors=[
 ['top','users','Projektkunden','Konsumenten','Kunden übermitteln Projektbedarf, Budget und Termine und buchen bei Bedarf eine Leistung. Sie erhalten eine Materialliste, passende Serviceoptionen und den Projektstatus.'],
 ['left','overview','Händler & Hersteller','Produzenten','Drittanbieter liefern Angebote und Produktdaten, Hersteller ergänzen Kompatibilitäts- und Anwendungshinweise. Kunden bezahlen Waren über den jeweiligen Kaufprozess.'],
 ['right','network','Handwerksbetriebe','Produzenten','Vertragsbetriebe melden freie Kapazitäten und den Ausführungsstatus. Für die erbrachte Arbeit erhalten sie eine Auftragsvergütung gemäß Partnervertrag.'],
 ['bottom','roadmap','Logistik & IT','Partner','Logistikpartner liefern Material und melden den Lieferstatus. IT-Partner unterstützen Schnittstellen und Datenqualität. Beide erbringen Leistungen auf Vertragsbasis.']
];

const owner=['center','network','HORNBACH','Orchestrator','HORNBACH betreibt das Projektkonto, setzt Zugangs- und Qualitätsregeln und bündelt Planung, Warenkauf und Servicebuchung. Als Eigenanbieter trägt HORNBACH zusätzlich Material und Beratung bei.'];
const ecosystemActors=[...actors,owner];
let selectedActor='center';

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
 return `<div class="ecosystem-layout platform-roles">
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

const actorAnalysis={
 top:[
  'Kunden kaufen Material bei HORNBACH oder bei ausgewählten Händlern. Handwerksleistungen laufen über den Handwerker-Service.',
  'Private und gewerbliche Kunden koordinieren Material, Lieferungen, Termine und optionale Handwerksleistungen über ein Projektkonto. Die Basisplanung bleibt im Pilot kostenlos.',
  'Solution Provider',
  'Kunden können Material und Leistungen für ein ganzes Vorhaben zusammen planen. Der digitale Projektbegleiter liefert dafür die gemeinsame Liste.'
 ],
 left:[
  'Ausgewählte Drittanbieter erweitern das Sortiment im Online-Marktplatz.',
  'Händler und Hersteller liefern zusätzlich Produktdaten und Kompatibilitätshinweise, damit Angebote zur Projektliste passen.',
  'Two-sided Market',
  'Der Marktplatz bringt Händler und Käufer bereits zusammen. Die Projektliste soll Angebote für das konkrete Vorhaben auffindbar machen.'
 ],
 right:[
  'Regionale Vertragsbetriebe führen Aufträge aus. HORNBACH organisiert den Handwerker-Service.',
  'Betriebe bieten passende Leistungen an, melden freie Termine und geben den Auftragsstatus an die Projektübersicht zurück.',
  'Orchestrator',
  'HORNBACH legt gemeinsame Leistungs- und Buchungsstandards fest. Die Betriebe führen die Arbeit eigenständig aus.'
 ],
 bottom:[
  'Markt, Shop und App dienen als Vertriebskanäle. Die ausgewerteten Berichte weisen technische Marktplatzpartner nicht eigenständig aus.',
  'Logistik- und IT-Partner binden Lieferstatus und Produktdaten über gemeinsame Schnittstellen an.',
  'Orchestrator',
  'Einheitliche Schnittstellen helfen HORNBACH, die Beiträge verschiedener Partner in einer Projektübersicht zusammenzuführen.'
 ],
 center:[
  'HORNBACH betreibt den kuratierten Online-Marktplatz, verkauft eigene Waren und verdient im Eigenhandel an der Marge. Die Vertragskonditionen des Marktplatzes sind öffentlich nicht ausgewiesen.',
  'HORNBACH verwaltet das Projektkonto und verantwortet Zugang, Qualität und Reklamationswege. Eine Gebühr für zusätzliche Koordination wäre erst nach dem Pilot zu prüfen.',
  'Two-sided Market → Orchestrator und Solution Provider',
  'Der bestehende Marktplatz vermittelt zwischen Händlern und Kunden. Im Zielbild koordiniert HORNBACH zusätzlich die Partnerleistungen und bündelt sie mit Material und Beratung zu einer Projektlösung.'
 ]
};

function ecosystemMap({icon,cite,platformNote}){
 return `<section class="ecosystem-panel" aria-label="Plattformkonzept für den digitalen Projektbegleiter">
  <div class="ecosystem-map">
   ${ecosystemActors.map(([position,symbol,name,role])=>`<button type="button" class="${position==='center'?'eco-center':`eco-node eco-${position}`}" data-platform-actor="${position}" aria-controls="platform-actor-${position}" aria-pressed="${position===selectedActor}">
    ${icon(symbol)}<strong>${name}</strong><span>${role}</span>
   </button>`).join('')}
  </div>
  <div class="platform-actor-detail" aria-live="polite"${selectedActor?'':' hidden'}>
   ${ecosystemActors.map(([position,,name,,flow])=>{
    const [current,target,pattern,reason]=actorAnalysis[position];
    return `<section id="platform-actor-${position}" data-platform-detail="${position}"${position===selectedActor?'':' hidden'}>
     <h3>${name}</h3>
     <div class="platform-actor-states">
      <div><h4 class="status-tag orange">Ist</h4><p>${current}</p>${cite('gb26','37, 72')}</div>
      <div><h4 class="status-tag pink">Zielbild</h4><p>${target}</p></div>
     </div>
     <h4>Austausch im Zielbild</h4><p>${flow}</p>
     <h4>Geschäftsmodellmuster</h4><p><strong>${pattern}</strong></p><p>${reason}</p>
     ${position==='center'?`<h4>Plattformrolle</h4>${platformNote}`:''}
    </section>`;
   }).join('')}
  </div>
 </section>`;
}

export function selectPlatformActor(button){
 selectedActor=selectedActor===button.dataset.platformActor?null:button.dataset.platformActor;
 const panel=button.closest('.ecosystem-panel');
 for(const actor of panel.querySelectorAll('[data-platform-actor]')){
  actor.setAttribute('aria-pressed',String(actor.dataset.platformActor===selectedActor));
 }
 panel.querySelector('.platform-actor-detail').hidden=!selectedActor;
 for(const detail of panel.querySelectorAll('[data-platform-detail]')){
  detail.hidden=detail.dataset.platformDetail!==selectedActor;
 }
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

function simulation(){
 return `<section class="panel platform-simulation">
  <h2>Wie könnten Kunden und Servicepartner gemeinsam wachsen?</h2>
  <p class="section-description">Vergleiche über 24 Monate, wie sich beide Seiten mit und ohne Netzwerkeffekt entwickeln könnten. Die Regler zeigen, wie stark das Ergebnis von den Annahmen abhängt. Ob die gemeinsame Übersicht im Alltag hilft, misst der regionale Pilot.</p>
  <div class="economics-inputs">
   ${controls.map(([id,label,min,max,step,,suffix])=>`<label class="platform-slider" for="platform-${id}"><span>${label}</span>
    <input id="platform-${id}" data-platform-simulation="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${simulationValues[id]}">
    <output for="platform-${id}" data-suffix="${suffix}">${simulationValues[id]}${suffix}</output>
   </label>`).join('')}
  </div>
  <div class="flow-legend platform-chart-legend"><span>Mit Netzwerkeffekt</span><span>Ohne Netzwerkeffekt</span><span>X-Achse: Monate · Y-Achsen je Marktseite</span></div>
  <div data-platform-results>${networkResults(simulationValues)}</div>
  <details class="platform-simulation-method">
   <summary>Annahmen & Rechenweg</summary>
   <p>Jede Seite wächst monatlich um ihre Basisrate plus einen Aufschlag durch die jeweils andere Seite. Aufschlag = maximaler Effekt × Gegenseite ÷ (Gegenseite + Halbwert). Bei 20 Servicepartnern bzw. 500 Projektkunden erreicht der Aufschlag die Hälfte seines Maximums. Beide Seiten nutzen die Werte des Vormonats. Ein Startwert von null bleibt im Modell bei null.</p>
   <p>Die Startwerte stehen für einen kleinen Bestand im regionalen Pilot. Wachstumsraten und Halbwerte sind Modellannahmen und dienen dem Vergleich. Das Modell betrachtet positive indirekte Effekte. In der Praxis können zu viele Anfragen Betriebe überlasten, und ein wachsendes Angebot braucht gute Kuration.</p>
   <p>Handrechnung mit den voreingestellten Werten: 120 × [1 + (3 + 4 × 8 ÷ 28) ÷ 100] ≈ 125 Kunden. Gleichzeitig ergeben 8 × [1 + (2 + 4 × 120 ÷ 620) ÷ 100] ≈ 8,22 Partner. Die Anzeige rundet auf ganze Teilnehmer.</p>
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
  ['0–3 Monate','Serviceangebot sichern','Digital Commerce und Partnermanagement wählen eine Projektkategorie mit erkennbarem Buchungsbedarf und ausreichend regionaler Handwerkskapazität. HORNBACH und die Betriebe vereinbaren, welche Leistungen buchbar sind und wann Liefer- und Auftragsstatus aktualisiert werden.'],
  ['3–6 Monate','Kunden im Mikromarkt gewinnen','Digital Commerce und Pilotmärkte sprechen bestehende Projektkunden in Beratung, Shop und App an. Die Projektliste bleibt kostenlos. Das Team beobachtet, ob Kunden alle drei Statusangaben finden, und erfasst Rückfragen, abgebrochene Übergaben und den Aufwand der Betriebe.'],
  ['6–12 Monate','Ausbau prüfen','Controlling vergleicht Rückfragen, Abbrüche und den Aufwand für die Statuspflege mit dem bisherigen Ablauf. Ausbau bei mindestens 90 % termingerechten Aufträgen und positivem zusätzlichem Deckungsbeitrag.']
 ];
 return `<div class="ecosystem-layout platform-pilot">
  <h2>Pilotablauf</h2>
  <div class="roadmap-grid">
   ${stages.map(([time,title,body])=>`<section class="roadmap-column"><div class="roadmap-heading"><h3>${time}</h3></div><article class="roadmap-card"><h4>${title}</h4><p>${body}</p></article></section>`).join('')}
  </div>
  <section class="platform-decision" aria-labelledby="platform-decision-heading">
   <h2 id="platform-decision-heading">Entscheidung zum Markteintritt</h2>
   <div class="table-wrap">
    <table class="matrix platform-decision-table" aria-labelledby="platform-decision-heading">
     <thead><tr><th scope="col">Prüffrage</th><th scope="col">Was im Pilot zählt</th></tr></thead>
     <tbody>
      <tr><th scope="row">Hilft die Übersicht den Kunden?</th><td>Kunden finden Bestellung, Lieferung und Handwerkertermin ohne Hilfe. Rückfragen und abgebrochene Übergaben gehen gegenüber dem bisherigen Ablauf zurück.</td></tr>
      <tr><th scope="row">Klappt die Zusammenarbeit?</th><td>Betriebe melden freie Termine und Auftragsstatus wie vereinbart. Sie erfassen den Zeitaufwand je Auftrag, damit HORNBACH beurteilen kann, ob die Pflege vertretbar ist.</td></tr>
      <tr><th scope="row">Trägt sich das Angebot?</th><td>Mindestens 90 % der Aufträge werden termingerecht erledigt. Der zusätzliche Deckungsbeitrag ist positiv. Die Buchungsquote zeigt, wie häufig Kunden das Angebot nutzen.</td></tr>
     </tbody>
    </table>
   </div>
   <div class="platform-decision-note">
    <p><strong>Empfehlung</strong> Wenn der Pilot diese Kriterien erfüllt, die Partnerbuchung in weiteren Regionen erproben.</p>
    <details>
     <summary>Begründung und Risiken</summary>
     <dl class="platform-recommendation">
     <dt>Ausgangslage</dt><dd>Ein Marktplatz und ein Netz regionaler Handwerksbetriebe bestehen. Der Pilot setzt an der gemeinsamen Sicht auf Bestellungen, Lieferungen und Serviceaufträge an. ${cite('gb26','37, 72')}</dd>
     <dt>Herleitung</dt><dd>In der vorgesehenen Orchestrator-Rolle würde HORNBACH Zugang und Abwicklung gestalten. Der regionale Start bündelt Nachfrage und Kapazität und adressiert das Henne-Ei-Problem.</dd>
     <dt>Wissenschaftliche Quelle</dt><dd>Parker, Van Alstyne & Choudary (2016), <em>Platform Revolution</em>, zur wechselseitigen Verstärkung von Angebot und Nachfrage.</dd>
     <dt>Erwartete Wirkung</dt><dd>Die gemeinsame Übersicht soll Rückfragen und abgebrochene Übergaben verringern. Die Buchung soll mehr Anfragen in bestätigte Aufträge überführen.</dd>
     <dt>Aufwand & Risiken</dt><dd>IT-Anbindung, Schulung und Reklamationsbearbeitung verursachen Anlaufkosten. Abhängigkeit von einzelnen Betrieben, unübersichtliche Angebote und Bevorzugung im Ranking können die Akzeptanz schwächen. Partnerprüfung, transparente Rankingkriterien und definierte Datenzugriffe gehören zum Pilot.</dd>
    </dl>
    <p class="method-caption">Zeiträume, Verantwortlichkeiten und Entscheidungskriterien sind Pilotvorschläge des Projektteams.</p>
    </details>
   </div>
  </section>
  ${simulation()}
 </div>`;
}

const views={roles,concept:ecosystemMap,pilot};

export function platformView(id,context){
 return views[id](context);
}
