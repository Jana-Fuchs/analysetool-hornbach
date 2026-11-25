export const cashflowInputs = [
 ['years','Laufzeit (Jahre)',1,10,1,5],
 ['quantity','Projekte je Jahr',0,2000,1,300],
 ['price','Warenverkauf je Projekt (€)',0,2000,10,800],
 ['goodsCost','Wareneinsatz je Projekt (€)',0,2000,10,560],
 ['fee','Servicegebühr je Projekt (€)',0,500,1,39],
 ['serviceCost','Servicekosten je Projekt (€)',0,500,1,19],
 ['runningCost','Fixkosten Service je Jahr (€)',0,100000,100,3000],
 ['setup','Einmalinvestition Service (€)',0,250000,100,10000]
];

export const cashflowDefaults=Object.fromEntries(cashflowInputs.map(([key,,,,,value])=>[key,value]));
const integer=new Intl.NumberFormat('de-DE',{maximumFractionDigits:0});
const money=value=>integer.format(value)+' €';

export function cashflow(a){
 const goods=a.quantity*(a.price-a.goodsCost);
 const service=a.quantity*(a.fee-a.serviceCost)-a.runningCost;
 return [
  ['Produktverkauf','#a84513',0,goods],
  ['Servicevertrag','#326355',-a.setup,service],
  ['Hybrid','#593cb3',-a.setup,goods+service]
 ].map(([label,color,initial,annual])=>{
  const values=Array.from({length:a.years+1},(_,year)=>initial+year*annual);
  const firstYear=values.findIndex((value,year)=>year>0&&value>=0);
  return {label,color,values,breakEven:firstYear<0?null:firstYear};
 });
}

export function cashflowResults(assumptions){
 const scenarios=cashflow(assumptions);
 const all=scenarios.flatMap(s=>s.values);
 const min=Math.min(0,...all),max=Math.max(0,...all);
 const x=year=>110+year/assumptions.years*510;
 const y=value=>max===min?100:20+(max-value)/(max-min)*160;
 const scale=max===min?[0]:[max,(min+max)/2,min];
 return `<div class="chart-legend hybrid-legend">${scenarios.map(s=>`<span style="color:${s.color}">● ${s.label}</span>`).join('')}</div>
 <div class="hybrid-cashflow-plot">
 <svg class="hybrid-cashflow-chart" role="img" aria-labelledby="cashflow-title">
  <title id="cashflow-title">Kumulierter Cashflow in Euro pro Jahr. Einzelwerte stehen in der Tabelle.</title>
  <line x1="${110/6.4}%" x2="${620/6.4}%" y1="${y(0)/2.24}%" y2="${y(0)/2.24}%" stroke="#887d72"/>
  ${scale.map(value=>`<line x1="${110/6.4}%" x2="${620/6.4}%" y1="${y(value)/2.24}%" y2="${y(value)/2.24}%" stroke="#887d72" stroke-dasharray="4 4"/><text x="${102/6.4}%" y="${y(value)/2.24}%" dominant-baseline="middle" text-anchor="end" fill="currentColor">${money(value)}</text>`).join('')}
  <svg width="100%" height="100%" viewBox="0 0 640 224" preserveAspectRatio="none">
   ${scenarios.map(s=>`<polyline points="${s.values.map((value,year)=>x(year)+','+y(value)).join(' ')}" fill="none" stroke="${s.color}" stroke-width="2" vector-effect="non-scaling-stroke"/>`).join('')}
  </svg>
  ${scenarios[0].values.map((_,year)=>`<text x="${x(year)/6.4}%" y="96%" text-anchor="middle" fill="currentColor">${year}</text>`).join('')}
 </svg>
 </div>
 <div class="table-wrap" tabindex="0" role="region" aria-label="Cashflow und Break-even">
  <table class="matrix hybrid-matrix"><caption>Kumulierter Netto-Cashflow nach Jahr</caption>
   <thead><tr><th scope="col">Jahr</th>${scenarios.map(s=>`<th scope="col">${s.label}</th>`).join('')}</tr></thead>
   <tbody>${scenarios[0].values.map((_,year)=>`<tr><th scope="row">${year}</th>${scenarios.map(s=>`<td>${money(s.values[year])}</td>`).join('')}</tr>`).join('')}</tbody>
   <tfoot><tr><th scope="row">Break-even</th>${scenarios.map(s=>`<td>${s.breakEven===null?'Außerhalb der Laufzeit':'Jahr '+s.breakEven}</td>`).join('')}</tr></tfoot>
  </table>
 </div>`;
}

export function cashflowView(assumptions,cite){
 return `<section class="panel economics-panel">
  <h2>Cashflow im Modellvergleich</h2>
  <p class="hybrid-cashflow-intro">Alle Startwerte sind Pilotannahmen. In allen drei Varianten gilt dieselbe Projektmenge pro Jahr. Der Servicevertrag enthält nur den digitalen Planungsservice. Im Hybridmodell kommen Warenverkauf und Service zusammen.</p>
  <div class="economics-inputs">${cashflowInputs.map(([key,label,min,max,step])=>`<label class="platform-slider" for="cashflow-${key}"><span>${label}</span><input id="cashflow-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${assumptions[key]}" data-cashflow="${key}"><output id="cashflow-value-${key}" for="cashflow-${key}">${integer.format(assumptions[key])}</output></label>`).join('')}</div>
  <div id="cashflow-results">${cashflowResults(assumptions)}</div>
  <details class="platform-simulation-method hybrid-cashflow-method">
   <summary>Annahmen & Rechenweg</summary>
   <p class="method-caption">Jahr 0 erfasst die Serviceinvestition. Pro Jahr ergibt sich der Produktbeitrag aus Menge × (Preis − Wareneinsatz). Der Servicebeitrag ist Menge × (Gebühr − variable Kosten) − Fixkosten. Break-even ist das erste operative Jahresende mit einem kumulierten Cashflow ab 0 €. Ohne Abzinsung, Steuern, Zahlungsziele und Kapitaleffekte. ${cite('trends','25–27, 42')}</p>
   <p class="method-caption">Handrechnung mit Startwerten für Jahr 1. Warenbeitrag 300 × (800 € − 560 €) = 72.000 €. Service inklusive Investition: 300 × (39 € − 19 €) − 3.000 € − 10.000 € = −7.000 €. Zusammen ergibt der Hybrid 65.000 €.</p>
  </details>
 </section>`;
}

export function hybridOverview({cite,editable,escape,showOriginal,state}){
 const dimensions=[
  ['partners','Schlüsselpartner','Hersteller liefern Kompatibilitätsdaten. Märkte erproben die Übergabe aus dem Projektkonto.'],
  ['activities','Schlüsselaktivitäten','Planungsregeln pflegen, Beratende dafür schulen und digitale Planungen fachlich freigeben.'],
  ['resources','Schlüsselressourcen','Produktdaten und lokale Bestände mit versionierten Planungsregeln verbinden.'],
  ['value','Wertangebot','Material und Beratung um eine buchbare, geprüfte Projektplanung ergänzen.'],
  ['relationships','Kundenbeziehungen','Kunden über ein gemeinsames Projektkonto vom ersten Entwurf bis zur Abholung begleiten.'],
  ['channels','Kanäle','Online begonnene Projektliste im Markt weiterverwenden.'],
  ['segments','Kundensegmente','DIY-Kunden mit planungsintensiven Projekten gezielt ansprechen.'],
  ['costs','Kostenstruktur','Investition in Integration und Tests sowie laufende Kosten für Datenpflege, Betrieb und Beratung.'],
  ['revenue','Einnahmequellen','Warenverkauf um eine einmalige Planungsgebühr je Projekt ergänzen.']
 ];
 return `<div class="hybrid-models">
 <section class="callout hybrid-current">
  <h2>Ist-Erlösmodell</h2>
  <p>HORNBACH ist im Kerngeschäft produktbasiert. Die Baumärkte und das Onlinegeschäft verkaufen Waren für Bau- und Gartenprojekte. Separate Serviceerlöse lassen sich aus den herangezogenen Berichtsangaben nicht beziffern.</p>
  <div class="hybrid-sources">${cite('gb26','37–38, 48–50')}</div>
  <p>Der Holzzuschnitt ist ein produktorientierter Service, weil er den Warenkauf ergänzt. Der Boels-Mietservice ist nutzungsorientiert, weil Kunden Werkzeuge zeitweise nutzen. Die Mietgebühr lässt sich anhand des Angebots keinem eigenen HORNBACH-Erlös zuordnen.</p>
  <div class="hybrid-sources"><a class="source-ref" href="https://www.hornbach.de/conf/holzzuschnitt-nach-mass/80000/" target="_blank" rel="noopener">Holzzuschnitt</a> <a class="source-ref" href="https://media.hornbach.de/cmsm/de/xxl-fliesen-verlegen-mawe.pdf" target="_blank" rel="noopener">Boels-Mietservice</a></div>
 </section>
 <section class="callout"><h2>Hybridmodell mit AI Context Platforms</h2>
  ${editable('hybridConcept',state.hybridConcept,{label:'Konzept bearbeiten'})}
  <p>Ressourcen sind ein gepflegter Produktkatalog, marktspezifische Bestände, versionierte Planungsregeln und fachlich Verantwortliche. Kosten entstehen insbesondere durch Datenanbindung, Tests und laufende Datenpflege.</p>
 </section>
 </div>
 <section class="hybrid-canvas"><h2>Veränderungen im Business Model Canvas</h2>
  <input type="checkbox" id="hybrid-canvas-original" ${showOriginal?'checked':''}>
  <label for="hybrid-canvas-original">Aktuelles Geschäftsmodell einblenden</label>
  <div class="canvas-grid canvas-board">${dimensions.map(([id,title,body])=>{
   const original=state.canvas.find(field=>field.id===id);
   return `<article class="panel canvas-${id}"><h4>${title}</h4><p>${body}</p>
    ${original?`<div class="hybrid-canvas-original"><h5>Aktuelles Geschäftsmodell</h5><p>${escape(original.text)}</p></div>`:''}
   </article>`;
  }).join('')}</div>
 </section>
 <section class="panel hybrid-archetype-panel"><h2>Archetypen des digitalen Projektbegleiters</h2>
  <p>Die Produktarchetypen werden auf den digitalen Begleiter für ein physisches DIY-Projekt übertragen. Pilotziel ist die vernetzte Stufe.</p>
  <dl class="hybrid-archetypes">
   <dt>Digital</dt><dd>Materialliste und Projektstand speichern und wieder aufrufen.</dd>
   <dt>Vernetzt</dt><dd>Projektkonto, Katalog und lokale Bestände über Schnittstellen abgleichen.</dd>
   <dt>Responsiv</dt><dd>Als nächste Ausbaustufe auf Bestandsänderungen reagieren und passende Alternativen vorschlagen.</dd>
   <dt>Intelligent</dt><dd>Ein autonom umplanender Begleiter wäre ein späteres Konzept. Im Pilot geben Fachkräfte Planungsänderungen frei.</dd>
  </dl>
 </section>`;
}

const hybridMaturityEffects=[
 ['product','monitor',3,'Projektbedarf, Warenbestand und Auftragsfortschritt werden im Projektkonto verknüpft.'],
 ['customer','selfservice',3,'Kunden können ihre Projektliste online und an einem Selbstbedienungsterminal im Pilotmarkt abrufen und bearbeiten.'],
 ['business','delivery',3,'Die buchbare, digital unterstützte Planung ergänzt den Warenverkauf um eine neue Leistung.']
];

export function hybridMaturity(state,{scenarioRadar,applyScenario,modelMean,escape}){
 const scenario=applyScenario(state,hybridMaturityEffects);
 const groups=state.model.map((group,i)=>({
  name:group.name,
  current:modelMean(group.criteria),
  scenario:modelMean(scenario.groups[i].criteria),
  target:modelMean(group.criteria,'target')
 }));
 const values={
  before:groups.map(({name,current})=>({name,value:current})),
  after:groups.map(group=>group.scenario)
 };
 const decimal=new Intl.NumberFormat('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2});
 const format=value=>value===null?'Offen':decimal.format(value);
 const targetDecimal=new Intl.NumberFormat('de-DE',{maximumFractionDigits:1});
 const formatTarget=value=>value===null?'Offen':targetDecimal.format(value);
 return `<section class="hybrid-maturity">
  <h2>Reifegrad-Wirkung des hybriden Erlösmodells</h2>
  <div class="ca-maturity-layout">
   <figure class="model-chart panel ca-maturity-radar">
    <figcaption class="chart-legend"><span class="status-tag orange">Ist</span><span class="status-tag pink">Hybridpilot</span><span class="status-tag ca-original-target-tag">Soll</span></figcaption>
    ${scenarioRadar(values,true,groups.map(group=>group.target),'Hybridpilot')}
   </figure>
   <div class="hybrid-maturity-summary">
    <div class="table-wrap ca-maturity-comparison">
     <table class="matrix hybrid-matrix" aria-label="Reifegrad nach Dimension"><thead><tr><th scope="col">Dimension</th><th scope="col">Ist</th><th scope="col">Hybridpilot</th><th scope="col">Soll</th></tr></thead>
      <tbody>${groups.map(g=>`<tr><th scope="row">${escape(g.name)}</th>${[g.current,g.scenario].map(value=>`<td>${format(value)}</td>`).join('')}<td>${formatTarget(g.target)}</td></tr>`).join('')}</tbody>
     </table>
    </div>
    ${scenario.changes.length?`<ul class="method-caption">${scenario.changes.map(({name,before,value,why})=>`<li><strong>${escape(name)} (${before??'offen'} → ${value})</strong>. ${escape(why)}</li>`).join('')}</ul>`:'<p class="method-caption">Die hinterlegten Ist-Stufen erreichen die Annahmen des Hybridpiloten bereits.</p>'}
   </div>
  </div>
 </section>`;
}
