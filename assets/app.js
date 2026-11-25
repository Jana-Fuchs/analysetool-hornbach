import {cashflowResults,cashflowView,hybridMaturity,hybridOverview} from './hybrid.js';
import {platformView,selectPlatformActor,updatePlatformSimulation} from './platform.js';
import {PATTERN_SOURCE} from './analysis-data.js';
import {applyDescriptionTypography} from './description-typography.js';
import {renderCustomerAnalysis,innovationView,handleCustomerAnalysisEvent,animateJourneyBoard,scenarioRadar,applyScenario} from './customer-analysis.js';
import {maturityAnalysis,ideasAnalysis,completedIdeas,developmentIdeas,openIdeaProposal,triangleView,showTrianglePart,canvasView,actionAnalysis,readiness,handleAnalysisEvent} from './analysis-ui.js';
import {SOURCES,TABS,DEFAULT_STATE} from './data.js';
import {clone,clamp,priorityScore,ranked,maturityMean,modelMean,economics,validateState,previewRadarDrag,reorderDimension} from './core.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const number=(n,digits=1)=>new Intl.NumberFormat('de-DE',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(n);
const euro=n=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const pathGet=(obj,path)=>path.split('.').reduce((v,k)=>v?.[k],obj);
function pathSet(obj,path,value){const keys=path.split('.');const last=keys.pop();keys.reduce((v,k)=>v[k],obj)[last]=value;}
let state=clone(DEFAULT_STATE), active='steckbrief', editing=false, drag=null;
const icons={download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-4-4L5 15Z"/>',check:'<path d="m4 12 5 5L20 6"/>',chevron:'<path d="m8 4 8 8-8 8"/>',file:'<path d="M14 3H5v18h14V8Zm0 0v5h5M8 13h8m-8 4h8"/>',overview:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',radar:'<path d="m12 2 9 7-3 11H6L3 9Z"/><path d="m12 7 5 4-2 6H9l-2-6Z"/><path d="M12 2v10m9-3-9 3m6 8-6-8m-6 8 6-8M3 9l9 3"/>',bulb:'<path d="M8 16a7 7 0 1 1 8 0v3H8Z"/><path d="M9 22h6m-3-10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 5a5 5 0 0 1 3 5v1"/>',network:'<rect x="8" y="8" width="8" height="8" rx="2"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="m6 6 2 2m8 0 2-2M6 18l2-2m8 0 2 2"/>',spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',roadmap:'<path d="M6 3v18m0-17h12l-3 4 3 4H6m4 5h8m-5 4h5"/>'};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.overview}</svg>`;}
function cite(id,pages=''){
 const source=Object.hasOwn(SOURCES,id)?SOURCES[id]:null;if(!source)return '<span class="source-ref">Eigene Angabe</span>';
 const page=parseInt(pages,10),pdfPage=id==='methods'?page-1:id==='patterns'?page-4:page;
 return `<a class="source-ref" href="${source.file}${Number.isFinite(pdfPage)&&pdfPage>0?'#page='+pdfPage:''}" target="_blank" rel="noopener" title="${escape(source.title)}">${icon('file')} ${id==='gb26'?'GB 2025/26':id==='gb25'?'GB 2024/25':id==='h127'?'H1 2026/27':id==='methods'?'Methoden':id==='patterns'?'Muster':id==='trends'?'Termin 7':'Aufgabe'}${pages?(['methods','patterns','trends'].includes(id)?' · Folie ':' · S. ')+escape(pages):''}</a>`;
}
function editable(path,value,{multiline=true,label='Text bearbeiten'}={}){
 const keys=path.split('.');
 let baseline=pathGet(DEFAULT_STATE,path);
 if(Array.isArray(state[keys[0]])&&state[keys[0]][keys[1]]?.id){
  const original=DEFAULT_STATE[keys[0]].find(d=>d.id===state[keys[0]][keys[1]].id);
  baseline=original?pathGet(original,keys.slice(2).join('.')):undefined;
 }
 const changed=baseline!==value;
 if(editing)return `<label class="edit-field"><span>${escape(label)}</span>${multiline?`<textarea aria-label="${escape(label)}" data-field="${path}" rows="4" maxlength="10000">${escape(value)}</textarea>`:`<input aria-label="${escape(label)}" data-field="${path}" value="${escape(value)}" maxlength="1000">`}</label>`;
 return `<p class="editable-text">${escape(value)}</p>${changed?'<small class="edited-label">Eigene Bearbeitung · diese Sitzung</small>':''}`;
}
function sectionHead(kicker,title,extra=''){return `<div class="section-heading"><h2>${title}</h2>${extra}</div>`;}
function callout(title,body){return `<section class="callout"><h3>${title}</h3><div>${body}</div></section>`;}
function panel(title,body,cls=''){return `<section class="panel ${cls}"><h3>${title}</h3>${body}</section>`;}
function metric(label,value,delta,info,source,pages,negative=false){return `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value">${value}</div><div class="metric-detail"><span class="delta ${negative?'muted':''}">${delta}</span><span>${info}</span></div>${cite(source,pages)}</div>`;}
const profileTabs=[
 ['dimensions','Fünf Dimensionen'],
 ['triangle','Magisches Dreieck'],
 ['canvas','Business Model Canvas']
];
let activeProfileTab='dimensions';
let selectedTrianglePart='what';
function profileTriangle(){
 return `${triangleView(state.four,{
  id:'profile-triangle-text',selected:selectedTrianglePart,
  content:(part,i)=>editable('four.'+i+'.text',part.text,{label:part.name+' – Analyse bearbeiten'})
 })}
 <p class="method-caption source-note">${escape(PATTERN_SOURCE)} · Ist-Beschreibung: <a href="${escape(SOURCES.gb26.file)}#page=37" target="_blank" rel="noopener">Geschäftsbericht 2025/26, S. 37–38, 72–73</a> · analytische Zuordnung.</p>`;
}
function profileView(){
 const panels={
  dimensions:`<div class="dimension-list">${state.profile.map((d,i)=>`<details class="profile-dimension" open><summary><span class="dimension-icon">${icon(['users','bulb','overview','network','roadmap'][i])}</span><strong>${escape(d.title)}</strong>${icon('chevron')}</summary><div class="dimension-detail">${editable('profile.'+i+'.text',d.text,{label:d.title+' – Analyse bearbeiten'})}${cite(d.source,d.pages)}</div></details>`).join('')}</div>`,
  triangle:profileTriangle(),
  canvas:canvasView(state,editing)
 };
 return `<div class="metrics">
 ${metric('Konzernumsatz','6,434 <small>Mrd. €</small>','+3,8 %','zum Vorjahr','gb26','48')}
 ${metric('Bereinigtes EBIT','264,7 <small>Mio. €</small>','−1,8 %','zum Vorjahr','gb26','50',true)}
 ${metric('Onlineanteil Baumarkt','12,7 <small>%</small>','+0,4 PP','inkl. Click & Collect','gb26','48')}
 </div>
 <div class="maturity-folder profile-folder">
  <div class="folder-tabs" role="tablist" aria-label="Steckbrief-Ansichten">
   ${profileTabs.map(([id,label])=>`<button type="button" role="tab" id="profile-tab-${id}" data-profile-tab="${id}" aria-controls="profile-panel-${id}" aria-selected="${id===activeProfileTab}" tabindex="${id===activeProfileTab?0:-1}">${label}</button>`).join('')}
  </div>
  ${profileTabs.map(([id])=>`<div class="folder-content profile-tab-panel" id="profile-panel-${id}" role="tabpanel" aria-labelledby="profile-tab-${id}" ${id===activeProfileTab?'':'hidden'}>${panels[id]}</div>`).join('')}
 </div>`;
}
function selectProfileTab(tab){
 activeProfileTab=tab.dataset.profileTab;
 for(const button of $$('[data-profile-tab]')){
  const selected=button===tab;
  button.setAttribute('aria-selected',String(selected));
  button.tabIndex=selected?0:-1;
  document.getElementById(button.getAttribute('aria-controls')).hidden=!selected;
 }
 tab.focus({preventScroll:true});
}
$('#main').addEventListener('click',event=>{
 const tab=event.target.closest('[data-profile-tab]');
 if(tab)selectProfileTab(tab);
 const part=event.target.closest('[data-triangle-part]');
 if(part){
  const id=part.dataset.trianglePart;
  const diagram=part.closest('.profile-triangle');
  const selected=diagram.dataset.selectedTrianglePart===id?'':id;
  diagram.dataset.selectedTrianglePart=selected;
  if(diagram.closest('.profile-folder'))selectedTrianglePart=selected;
  showTrianglePart(diagram,selected);
 }
});
for(const eventType of ['pointerover','focusin','pointerout','focusout']){
 $('#main').addEventListener(eventType,event=>{
  const part=event.target.closest('[data-triangle-part]');
  if(!part||part.contains(event.relatedTarget))return;
  const diagram=part.closest('.profile-triangle');
  const entering=eventType==='pointerover'||eventType==='focusin';
  showTrianglePart(diagram,entering?part.dataset.trianglePart:diagram.dataset.selectedTrianglePart);
 });
}
$('#main').addEventListener('keydown',event=>{
 const tab=event.target.closest('[data-profile-tab]');
 if(!tab)return;
 const tabs=$$('[data-profile-tab]');
 const index=[...tabs].indexOf(tab);
 const next={ArrowLeft:(index+tabs.length-1)%tabs.length,ArrowRight:(index+1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
 if(next===undefined)return;
 event.preventDefault();
 selectProfileTab(tabs[next]);
});
function radarGeometry(){const n=state.maturity.length;const items=drag?.kind==='axis'?drag.preview.items:state.maturity;return items.map((d,i)=>({...d,angle:-Math.PI/2+i*2*Math.PI/n}));}
const point=(angle,r)=>[330+Math.cos(angle)*r,245+Math.sin(angle)*r];
function points(field,ratio=1){return radarGeometry().map(d=>point(d.angle,160*(field?d[field]/5:ratio)).join(',')).join(' ');}
function radarLabelLines(name){
 const lines=[];let rest=name;
 while(rest.length>18){const split=rest.lastIndexOf(' ',18),at=split>5?split:18;lines.push(rest.slice(0,at));rest=rest.slice(at).trim();}
 if(rest)lines.push(rest);return lines;
}
function radarAxisLabel(d){
 const [lx,ly]=point(d.angle,207),anchorAt=angle=>Math.cos(angle)>.2?'start':Math.cos(angle)<-.2?'end':'middle';
 const lines=radarLabelLines(d.name),width=Math.max(...lines.map(line=>line.length))*7.5;
 const contents=anchor=>{
  const gripX=anchor==='start'?-24:anchor==='end'?10:-width/2-24;
  const grip=`<g class="radar-grip" transform="translate(${gripX} -5)" aria-hidden="true"><rect x="-4" y="-10" width="24" height="30" rx="3"/>${[0,5,10].map(y=>`<circle cx="3" cy="${y}" r="1.15"/><circle cx="8" cy="${y}" r="1.15"/>`).join('')}</g>`;
  const text=`<text x="0" y="0" text-anchor="${anchor}" dominant-baseline="central" class="radar-label">${lines.map((line,i)=>`<tspan x="0" y="${(i-(lines.length-1)/2)*1.2}em" dominant-baseline="central">${escape(line)}</tspan>`).join('')}</text>`;
  return grip+text;
 };
 const moving=drag?.kind==='axis'&&drag.id===d.id;
 const anchor=anchorAt(moving?drag.originalAngle:d.angle);
 const position=moving?drag.preview.position:{x:lx,y:ly};
 const placeholder=moving?`<g class="radar-drop-placeholder" transform="translate(${lx} ${ly})" aria-hidden="true">${contents(anchorAt(d.angle))}</g>`:'';
 const positionHint=moving?`<text x="0" y="${lines.length*18+13}" text-anchor="${anchor}" class="radar-position">Position ${drag.preview.index+1} / ${state.maturity.length}</text>`:'';
 return `${placeholder}<g class="radar-axis-label ${moving?'is-dragging':''}" data-drag-axis="${escape(d.id)}" data-position="${moving?drag.preview.index:radarGeometry().findIndex(item=>item.id===d.id)}" transform="translate(${position.x} ${position.y})" tabindex="0" role="button" aria-label="${escape(d.name)} verschieben"><title>Ziehen oder mit den Pfeiltasten umordnen</title>${contents(anchor)}${positionHint}</g>`;
}
function radarMarkup(){return `<title id="radar-title">Digitaler Reifegrad: Ist und Ziel auf einer Skala von 1 bis 5</title><desc>Punkte ziehen, um Werte zu ändern. Dimensionen an den Griffen verschieben; die Reihenfolge wird während des Ziehens angezeigt. Alternativ Pfeiltasten oder die Schaltflächen in der Dimensionenliste verwenden.</desc>
 ${[1,2,3,4,5].map(v=>`<polygon points="${points(null,v/5)}" class="radar-grid"/><text x="337" y="${245-v*32+13}" class="radar-tick">${v}</text>`).join('')}
 ${radarGeometry().map(d=>{const [x,y]=point(d.angle,160);return `<line x1="330" y1="245" x2="${x}" y2="${y}" class="radar-axis"/>`;}).join('')}
 <polygon points="${points('target')}" class="radar-target"/><polygon points="${points('current')}" class="radar-current"/>
 ${radarGeometry().map(d=>{const [x,y]=point(d.angle,160*d.current/5),[tx,ty]=point(d.angle,160*d.target/5);return `<rect x="${tx-5}" y="${ty-5}" width="10" height="10" rx="2" class="radar-target-handle" data-drag-target="${escape(d.id)}"/><circle cx="${x}" cy="${y}" r="8" class="radar-handle" data-drag-value="${escape(d.id)}"/>`;}).join('')}
 ${radarGeometry().map(radarAxisLabel).join('')}`;}
function maturityView(){const avg=maturityMean(state.maturity), target=maturityMean(state.maturity,'target');return `<section class="panel radar-panel"><div class="radar-heading"><div class="chart-legend"><span class="delta"><span>Ist <span id="current-mean">${number(avg)}</span> / 5</span></span><span class="delta muted"><span>Ziel <span id="target-mean">${number(target)}</span> / 5</span></span></div></div><svg id="radar" viewBox="0 0 660 500" role="img" aria-labelledby="radar-title">${radarMarkup()}</svg><div id="radar-order-preview" class="radar-order-preview" role="status" aria-live="polite" hidden></div><div class="progress-track" aria-hidden="true"><span id="maturity-progress" style="width:${avg/5*100}%"></span></div></section>
 <details class="dimension-editor" open><summary>Dimensionen bearbeiten <span>${state.maturity.length} Dimensionen</span>${icon('chevron')}</summary><div class="dimension-editor-content"><div class="dimension-editor-tools"><p>Ist- und Zielwerte von 1 bis 5. Mindestens 3, höchstens 10 Dimensionen.</p><button class="button" data-action="add-dimension">+ Dimension</button></div><div class="dimension-controls">${state.maturity.map((d,i)=>`<article class="dimension-control" data-dimension-id="${escape(d.id)}"><div class="dimension-control-top"><label class="sr-only" for="dimension-${i}">Name Dimension ${i+1}</label><input id="dimension-${i}" class="dimension-name" data-field="maturity.${i}.name" maxlength="40" value="${escape(d.name)}"><div class="dimension-reorder"><button class="icon-button" data-action="move-dimension" data-index="${i}" data-direction="-1" aria-label="${escape(d.name)} nach vorne" ${i===0?'disabled':''}>↑</button><button class="icon-button" data-action="move-dimension" data-index="${i}" data-direction="1" aria-label="${escape(d.name)} nach hinten" ${i===state.maturity.length-1?'disabled':''}>↓</button><button class="icon-button danger-text" data-action="remove-dimension" data-index="${i}" aria-label="${escape(d.name)} entfernen" ${state.maturity.length<=3?'disabled':''}>×</button></div></div><div class="score-inputs">${['current','target'].map((field,j)=>`<label class="score-slider"><span>${j?'Ziel':'Ist'}</span><input type="range" min="1" max="5" step="0.1" data-dimension="${i}" data-value-field="${field}" value="${d[field]}" aria-label="${escape(d.name)} ${j?'Ziel':'Ist'}"><output>${number(d[field])}</output></label>`).join('')}</div><details open><summary>Begründung</summary>${editable(`maturity.${i}.evidence`,d.evidence,{label:'Begründung '+d.name+' bearbeiten'})}${cite(d.source,d.pages)}</details></article>`).join('')}</div></div></details>
 <details class="additional-details" open><summary>Bewertungsskala & Methode ${icon('chevron')}</summary><p>1: einzelne Initiativen · 2: punktuell digitalisiert · 3: systematisch verbunden · 4: integriert und steuerbar · 5: durchgängig optimiert. Der Mittelwert gewichtet alle Dimensionen gleich.</p>${editable('maturityNote',state.maturityNote,{label:'Methodische Einordnung bearbeiten'})}</details>`;}
function weightsPanel(){const sum=Object.values(state.weights).reduce((a,b)=>a+b,0);return `<div class="weight-panel"><h3>Gewichtung</h3><div class="weight-controls">${[['impact','Wirkung'],['effort','Aufwand'],['risk','Risiko']].map(([id,name])=>`<label>${name}<span><input type="number" min="0" max="100" step="1" value="${state.weights[id]}" data-weight="${id}" aria-label="Gewicht ${name}"> %</span></label>`).join('')}</div><details class="formula-details" open><summary>So wird priorisiert</summary><p>1 = gering, 5 = hoch. Hohe Wirkung, geringer Aufwand und geringes Risiko erhöhen die Priorität. Diese Gewichte gelten für Maßnahmen.</p><div class="formula">Score = [Wirkung × ${state.weights.impact} + (6 − Aufwand) × ${state.weights.effort} + (6 − Risiko) × ${state.weights.risk}] / ${sum}.</div></details></div>`;}
function ratingInput(group,index,key,value){return `<select class="rating-select" data-rating="${group}.${index}.${key}" aria-label="${escape(state[group][index].name)} – ${key==='impact'?'Wirkung':key==='effort'?'Aufwand':'Risiko'}">${[1,2,3,4,5].map(n=>`<option ${value===n?'selected':''}>${n}</option>`).join('')}</select>`;}
function scoreBadge(item){const s=priorityScore(item,state.weights),group=['actions','ideas'].find(g=>state[g].includes(item)),i=state[group].indexOf(item);return `<span data-score-group="${group}" data-score-index="${i}" class="score-badge ${s>=4?'high':''}">${number(s)} <small>/ 5</small></span>`;}
function refreshPriorities(){
 const sum=Object.values(state.weights).reduce((a,b)=>a+b,0);
 $$('.formula').forEach(el=>el.textContent=`Score = [Wirkung × ${state.weights.impact} + (6 − Aufwand) × ${state.weights.effort} + (6 − Risiko) × ${state.weights.risk}] / ${sum}. ${sum!==100?'Gewichte werden auf ihre Summe normiert.':'Gewichte summieren sich zu 100 %.'} Gilt für Maßnahmen.`);
 $$('[data-score-group]').forEach(el=>{const item=state[el.dataset.scoreGroup][el.dataset.scoreIndex],score=priorityScore(item,state.weights);el.innerHTML=number(score)+' <small>/ 5</small>';el.classList.toggle('high',score>=4);});
 $$('.actions-matrix tbody').forEach(body=>{
  const rows=[...body.rows],score=row=>{const [group,i]=row.querySelector('[data-rating]').dataset.rating.split('.');return priorityScore(state[group][i],state.weights);};
  rows.sort((a,b)=>score(b)-score(a)).forEach((row,i)=>{body.append(row);const index=row.querySelector('.row-index');if(index)index.textContent=String(i+1).padStart(2,'0');});
 });
}
function customerView(view='journey'){return renderCustomerAnalysis(state,{editing,cite,developmentProposals:developmentIdeas(state)},view);}
function revenueScenario(){const a=state.revenueAssumptions,e=economics(a);return ` <section class="panel economics-panel"><h3>Erlösszenario</h3><p class="section-description">Zusätzliche Abschlüsse gegenüber einer Vergleichsgruppe; alle Beträge netto.</p><div class="economics-inputs">${[['projects','Zusätzliche Projektkontakte','',1e7],['conversion','Abschlussquote','%',100],['basket','Warenkorb netto','€',1e7],['margin','Waren-Rohertragsmarge','%',100],['fee','Servicegebühr netto','€',1e7],['cost','Zusätzliche Pilotkosten / Monat','€',1e8]].map(([key,label,unit,max])=>`<label>${label}<div><input type="number" min="0" max="${max}" step="1" value="${a[key]}" data-economics="${key}" aria-label="${label}"><span>${unit}</span></div></label>`).join('')}</div><div class="economics-results"><div><span>Zusätzliche Abschlüsse</span><strong id="eco-orders">${number(e.orders,0)}</strong></div><div><span>Zusätzlicher Warenumsatz</span><strong id="eco-revenue">${euro(e.revenue)}</strong></div><div><span>Serviceumsatz</span><strong id="eco-services">${euro(e.serviceRevenue)}</strong></div><div class="eco-contribution"><span>Beitrag nach Pilotkosten</span><strong id="eco-contribution">${euro(e.contribution)}</strong></div></div><details class="platform-simulation-method hybrid-cashflow-method"><summary>Rechenweg</summary><p class="method-caption">Beitrag = Abschlüsse × (Warenkorb × Rohertragsmarge + Servicegebühr) − Pilotkosten. Pilotkosten müssen variable Abwicklung, Personal, Betrieb und Marketing enthalten. Einmalkosten separat bewerten; das Ergebnis ist kein Konzerngewinn.</p></details></section>`;}
function revenueStreams(){return `<section class="monthly-revenue-streams"><h3>Erlösbausteine</h3><div class="three-col revenue-cards">${panel('Warenmarge',`<p>Materialverkauf über Markt und digitale Kanäle. Die Handelsspanne und die operative Kostenbasis bestimmen die Ergebniswirkung.</p>${cite('gb26','48–54')}`)}${panel('Projekt- & Servicegebühren',`<p>Eine transparente Gebühr für zusätzliche, konkret erbrachte Planung oder Koordination. Keine Gebühr für bereits kostenfreie Standardleistungen ohne zusätzlichen Nutzen.</p>`)}${panel('Optionales Profi-Paket',`<p>Wiederkehrende Erlöse nur bei wiederkehrendem Nutzen: etwa erweiterte Projektverwaltung und abgestimmte Serviceleistungen für Profis.</p>`)}</div>
</section>`;}
const aiCriteria=[
 ['impact','Wertbeitrag'],['feasibility','Machbarkeit'],['risk','Risiko & Regulierung'],['integration','Integration & Skalierung']
];
const aiScore=d=>(d.impact+d.feasibility+(6-d.risk)+d.integration)/4;
function aiPortfolio(){
 const sorted=[...state.ai].sort((a,b)=>aiScore(b)-aiScore(a));
 return `<section class="panel">
  <h2>KI-Ideen für HORNBACH</h2>
  <p>Sechs Vorschläge für Beratung, Projektplanung und interne Abläufe. Der Geschäftsbericht liefert die strategische Ausgangslage. Bewertungen und Pilotziele sind Einschätzungen des Projektteams. ${cite('gb26','72–73')} ${cite('trends','53–55')}</p>
  <p class="method-caption">1 = gering, 5 = hoch. Alle vier Kriterien zählen gleich. Für den Score geht das Risiko als 6 − Risikowert ein. Daten, Prozesse und regulatorische Einstufung werden für den konkreten Einsatz vor Pilotfreigabe geprüft.</p>
  <div class="table-wrap" tabindex="0" role="region" aria-label="Bewertungsmatrix der KI-Ideen"><table class="matrix ai-matrix">
   <thead><tr><th scope="col">KI-Idee</th>${aiCriteria.map(([,label])=>`<th scope="col">${label}</th>`).join('')}<th scope="col">Priorität</th></tr></thead>
   <tbody>${sorted.map(d=>{
    const i=state.ai.indexOf(d);
    return `<tr><td><h3>${escape(d.name)}</h3>${editable('ai.'+i+'.description',d.description,{label:d.name+' bearbeiten'})}</td>
     ${aiCriteria.map(([key,label])=>`<td><select id="ai-rating-${i}-${key}" class="rating-select" data-rating="ai.${i}.${key}" aria-label="${escape(d.name+' – '+label)}">${[1,2,3,4,5].map(n=>`<option ${d[key]===n?'selected':''}>${n}</option>`).join('')}</select></td>`).join('')}
     <td><span class="score-badge ${aiScore(d)>=4?'high':''}">${number(aiScore(d),2)} <small>/ 5</small></span></td></tr>`;
   }).join('')}</tbody>
  </table></div>
 </section>
 <section class="panel"><h2>Drei priorisierte Use Cases</h2>
  <div class="three-col">${sorted.slice(0,3).map(d=>{
   const i=state.ai.indexOf(d);
   return panel(escape(d.name),`
    ${editable('ai.'+i+'.reason',d.reason,{label:'Auswahl begründen'})}
    <h4>Pilotziel</h4>${editable('ai.'+i+'.kpi',d.kpi,{label:'Pilotziel bearbeiten'})}
    <h4>Kontrolle</h4>${editable('ai.'+i+'.guardrail',d.guardrail,{label:'Kontrolle bearbeiten'})}
   `);
  }).join('')}</div>
 </section>`;
}
function targetModel(){return `<p class="method-caption">Das Zielmodell führt die Ansätze aus <a href="#erloese">dem hybriden Erlösmodell</a> und <a href="#ki">der KI-Strategie</a> in die Umsetzungsplanung über. ${cite('trends','70, 73–75')}</p>${callout('Entscheidungsvorschlag an die Geschäftsführung',editable('recommendation',state.recommendation,{label:'Entscheidungsvorschlag bearbeiten'}))}
<details class="additional-details" open><summary>Zielgeschäftsmodell ${icon('chevron')}</summary><div class="target-grid">${state.target.map((d,i)=>`<article class="target-card"><span class="row-index">0${i+1}</span><h3>${escape(d.title)}</h3>${editable('target.'+i+'.text',d.text,{label:'Zielmodell '+d.title+' bearbeiten'})}</article>`).join('')}</div>
 </details>`;}
function actionPriorities(){return `${sectionHead('PRIORISIERUNG','Priorisierte Maßnahmen')}${weightsPanel()}<div class="table-wrap"><table class="matrix actions-matrix"><thead><tr><th>Maßnahme / Verantwortung</th><th>Wirkung</th><th>Aufwand</th><th>Risiko</th><th>Priorität</th><th>Status</th></tr></thead><tbody>${ranked(state.actions,state.weights).map((d,rank)=>{const i=state.actions.indexOf(d);return `<tr><td><div class="table-item"><span class="row-index">${String(rank+1).padStart(2,'0')}</span><div><h3>${escape(d.name)}</h3>${editable('actions.'+i+'.owner',d.owner,{multiline:false,label:'Verantwortung bearbeiten'})}<span class="item-meta">${escape(d.phase)}</span></div></div></td>${['impact','effort','risk'].map(k=>`<td>${ratingInput('actions',i,k,d[k])}</td>`).join('')}<td>${scoreBadge(d)}</td><td><select class="status-select" data-status="${i}" aria-label="Status ${escape(d.name)}">${['Geplant','In Arbeit','Abgeschlossen'].map(s=>`<option ${s===d.status?'selected':''}>${s}</option>`).join('')}</select></td></tr>`;}).join('')}</tbody></table></div>
 `;}
function actionRoadmap(){return `${sectionHead('ROADMAP','Roadmap',``)}<div class="roadmap-grid">${['0–3 Monate','3–6 Monate','6–12 Monate'].map((phase,p)=>`<section class="roadmap-column"><div class="roadmap-heading"><span>0${p+1}</span><h3>${phase}</h3><small>${['Datengrundlage & Beratungspilot','Projekt- und Servicepilot','Nachweis & Skalierung'][p]}</small></div>${state.actions.filter(d=>d.phase===phase).sort((a,b)=>Number(b.impact>=4&&b.effort<=2)-Number(a.impact>=4&&a.effort<=2)).map(d=>{const i=state.actions.indexOf(d);return `<article class="roadmap-card"><div class="roadmap-card-heading"><span class="status-tag ${d.status==='Abgeschlossen'?'done':d.status==='In Arbeit'?'working':''}">${escape(d.status)}</span>${scoreBadge(d)}</div><h4>${escape(d.name)}</h4>${editing?editable('actions.'+i+'.name',d.name,{multiline:false,label:'Maßnahme'}):''}${editing?`<label class="analysis-select"><span>Zeitraum</span><select data-x-value="actions.${i}.phase">${['0–3 Monate','3–6 Monate','6–12 Monate'].map(p=>`<option ${p===d.phase?'selected':''}>${p}</option>`).join('')}</select></label>`:''}${editable('actions.'+i+'.deliverable',d.deliverable,{label:'Ergebnis der Maßnahme bearbeiten'})}<div class="gate"><span class="mini-label">Entscheidungskriterium</span>${editable('actions.'+i+'.gate',d.gate,{label:'Entscheidungskriterium bearbeiten'})}</div>${editable('actions.'+i+'.depends',d.depends,{multiline:false,label:'Abhängigkeit'})}<details class="action-reasoning" open><summary>Herleitung, Wirkung & Risiken</summary>${[['situation','Ausgangslage'],['rationale','Herleitung'],['reference','Wissenschaftliche Quelle'],['effect','Erwartete Wirkung'],['risks','Aufwand & Risiken']].map(([key,label])=>`<span class="mini-label">${label}</span>${editable('actions.'+i+'.'+key,d[key],{label})}`).join('')}</details>${d.originId?`<span class="status-tag pink">Abgeleiteter Maßnahmenkandidat</span>${editing?`<button class="button small secondary" data-x-action="remove-candidate" data-id="${escape(d.id)}">Kandidat entfernen</button>`:''}`:''}</article>`;}).join('')}</section>`).join('')}</div><p class="method-caption">Zeiträume, Verantwortlichkeiten, Bewertungen und Pilotziele sind Vorschläge des Projektteams, keine beschlossene Unternehmensplanung. Strategische Grundlage: ${cite('gb26','71–73')}</p>`;}
const context=()=>({editing,icon,cite});
let showOriginalCanvas=false;
const sectionTabs={
 innovation:[
  ['overview','Einordnung & Beispiele'],['involvement','Kundeneinbindung & Maßnahmen'],
  ['scenario','Reifegrad-Wirkung']
 ].map(([id,label])=>[id,label,()=>innovationView(state,{...context(),developmentProposals:developmentIdeas(state)},id)]),
 plattform:[
  ['roles','Ausgangslage'],['concept','Plattformkonzept'],['pilot','Pilot & Markteintritt']
 ].map(([id,label])=>[id,label,()=>platformView(id,{icon,cite,panel,escape,developmentProposals:developmentIdeas(state),platformNote:editable('platformNote',state.platformNote,{label:'Plattformrolle bearbeiten'})})]),
 erloese:[
  ['hybrid','Ist & Hybridkonzept',()=>hybridOverview({cite,editable,escape,showOriginal:showOriginalCanvas,state})],
  ['scenario','Cashflow & Szenarien',()=>cashflowView(state.cashflowAssumptions,cite)+`<section class="panel monthly-pilot-scenario"><h2>Monatsszenario für den Projektpiloten</h2>${revenueScenario()}${revenueStreams()}</section>`],
  ['maturity','Reifegrad-Wirkung',()=>hybridMaturity(state,{scenarioRadar,applyScenario,modelMean,escape})]
 ],
 ki:[
  ['portfolio','KI-Use-Cases',aiPortfolio],['readiness','KI-Reife',()=>readiness(state,context())]
 ],
 massnahmen:[
  ['target','Zielmodell',targetModel],['priorities','Priorisierung',actionPriorities],
  ['roadmap','Roadmap',actionRoadmap],['effect','Wirkung & Risiken',()=>actionAnalysis(state,context())]
 ]
};
const selectedSections={};
function sectionFolder(page,title,subtitle){
 const tabs=sectionTabs[page];
 const [selected,,content]=tabs.find(([id])=>id===selectedSections[page])??tabs[0];
 const panelId=page+'-folder-content';
 return `<section class="maturity-folder section-folder">
  <div class="folder-tabs" role="tablist" aria-label="${escape(title)}">${tabs.map(([id,label])=>`<button type="button" role="tab" id="${page}-tab-${id}" data-section-tab="${id}" aria-selected="${id===selected}" aria-controls="${panelId}" tabindex="${id===selected?0:-1}">${label}</button>`).join('')}</div>
  <div class="folder-content" id="${panelId}" role="tabpanel" aria-labelledby="${page}-tab-${selected}" tabindex="0">${selected===tabs[0][0]&&subtitle?`<p class="tab-intro">${subtitle}</p>`:''}${content()}</div>
 </section>`;
}
const views={
 steckbrief:profileView,
 reifegrad:()=>maturityAnalysis(state,context()),
 muster:()=>ideasAnalysis(state,context()),
 kunden:()=>customerView('journey')
};
for(const type of ['click','keydown'])$('#main').addEventListener(type,event=>{
 const button=event.target.closest('[data-section-tab]');
 if(!button)return;
 const tabs=sectionTabs[active];
 let index=tabs.findIndex(([id])=>id===button.dataset.sectionTab);
 if(type==='keydown'){
  switch(event.key){
   case 'ArrowLeft': index=(index+tabs.length-1)%tabs.length; break;
   case 'ArrowRight': index=(index+1)%tabs.length; break;
   case 'Home': index=0; break;
   case 'End': index=tabs.length-1; break;
   default: return;
  }
  event.preventDefault();
 }
 const [id]=tabs[index];
 selectedSections[active]=id;
 render();
 document.getElementById(active+'-tab-'+id)?.focus({preventScroll:true});
});
$('#main').addEventListener('click',event=>{
 const actor=event.target.closest('[data-platform-actor]');
 if(actor)selectPlatformActor(actor);
});
$('#main').addEventListener('input',event=>{
 if(event.target.matches('[data-platform-simulation]'))updatePlatformSimulation(event.target.closest('.platform-simulation'));
});
function render(){
 const disclosures=new Map((document.querySelector('#panel-'+active)?$$('#main details'):[]).map(d=>[d.querySelector(':scope > summary')?.textContent.trim(),d.open]));
 const tab=TABS.find(t=>t.id===active),i=TABS.indexOf(tab);
 $('#navigation').innerHTML=TABS.map((t,n)=>`<a id="tab-${t.id}" href="#${t.id}" role="tab" aria-selected="${active===t.id}" aria-controls="panel-${t.id}" tabindex="${active===t.id?0:-1}" class="nav-item ${active===t.id?'active':''}"><span class="nav-number">${n+1}</span><span>${t.short}</span></a>`).join('');
 $('#tab-title').textContent=tab.short;
 const editButton=$('.edit-toggle');
 editButton.innerHTML=icon(editing?'check':'edit')+(editing?'Fertig':'Bearbeiten');
 editButton.setAttribute('aria-pressed',String(editing));
 editButton.classList.toggle('editing',editing);
 $('#main').innerHTML=`<section id="panel-${active}" role="tabpanel" aria-labelledby="tab-${active}">${tab.subtitle&&!sectionTabs[active]?`<p class="tab-intro">${tab.subtitle}</p>`:''}${editing?'<div class="edit-banner">Änderungen gelten bis zum Neuladen. Zum dauerhaften Sichern bitte exportieren. Bearbeitete Inhalte sind eigene Angaben.</div>':''}${sectionTabs[active]?sectionFolder(active,tab.short,tab.subtitle):views[active]()}</section>`;
 $$('#main details').forEach(d=>{const key=d.querySelector(':scope > summary')?.textContent.trim();if(disclosures.has(key))d.open=disclosures.get(key);});
 applyDescriptionTypography($('#panel-'+active),active);
 document.title=`${tab.short} · HORNBACH Analyse`;
 if(active==='reifegrad')bindRadar();
 if(active==='kunden')animateJourneyBoard($('#panel-kunden'));
}

function navigate(){
 const hash=location.hash.slice(1);
 const [,proposalId]=hash.match(/^muster\/entwicklungsvorschlaege\/([\w-]+)$/)??[];
 const platformOverview=hash==='plattform/ausgangslage';
 const id=proposalId?'muster':platformOverview?'plattform':hash;
 if(platformOverview)selectedSections.plattform='roles';
 active=TABS.some(tab=>tab.id===id)?id:'steckbrief';
 editing=false;
 if(proposalId)openIdeaProposal(proposalId);
 render();
 const heading=proposalId&&document.getElementById('idea-proposal-heading-'+proposalId);
 if(heading){
  heading.focus({preventScroll:true});
  heading.scrollIntoView({block:'start'});
 }else window.scrollTo(0,0);
}
function toast(message,{ranking=false}={}){
 const notice=$('#toast');
 notice.textContent=message;
 notice.classList.toggle('toast-ranking',ranking);
 notice.hidden=false;
 clearTimeout(toast.timer);
 toast.timer=setTimeout(()=>notice.hidden=true,ranking?6500:4500);
}
function save(){ $('#save-state').textContent='Nur für diese Sitzung · Sicherung per Export'; }
function exportAnalysis(){const blob=new Blob([JSON.stringify({...state,ideas:completedIdeas(state)},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='hornbach-analyse.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Analyse als JSON exportiert.');}
function showSources(){
 $('#source-content').innerHTML=`<p class="dialog-intro">Studienanalyse von HORNBACH zur fachlichen Beurteilung in der Vorlesung. Im Mittelpunkt stehen die Anwendung der Vorlesungsmodelle, die Herleitung aus Quellen und die kritische Einordnung der Ergebnisse.</p><p>Ist-Werte sind quellenbasierte Einschätzungen des Projektteams. Soll-Werte, Maßnahmen und Experimente sind eigene analytische Entwicklungsvorschläge; sie stellen keine beschlossene Unternehmensplanung dar. Fehlende öffentliche Belege bleiben als Unsicherheit kenntlich.</p><p>Unternehmensberichte und Vorlesungsunterlagen zum Öffnen und Herunterladen.</p><div class="source-list">${Object.entries(SOURCES).map(([id,source])=>`<article><div><h3>${source.title}</h3><div class="source-actions"><a class="button" href="${source.file}" download>${icon('download')} PDF herunterladen</a><a class="text-link" href="${source.file}" target="_blank" rel="noopener">PDF öffnen</a>${source.url?`<a class="text-link" href="${source.url}" target="_blank" rel="noopener">Originalquelle</a>`:''}</div></div></article>`).join('')}</div><details class="additional-details" open><summary>Methodik & Export ${icon('chevron')}</summary><p>Fakten verweisen auf die Originalberichte. Bewertungen und Zukunftsvorschläge sind Annahmen des Projektteams, keine interne Messung oder Unternehmensprognose.</p><p>Reifegrad nach Appelfeller/Feldmann: Kriterien auf Stufen 1–4, Mittelwerte nur über bekannte Werte. KI-Reife: 1–5. Ideen: Nutzen, Machbarkeit, Kosten und Risiko mit eigenen Gewichten. KI-Anwendungen: Wertbeitrag, Machbarkeit, Risiko und Regulierung, Integration und Skalierung. Maßnahmen: Wirkung, Aufwand und Risiko. Gewichte werden auf ihre Summe normiert.</p><p>Änderungen gelten nur bis zum Neuladen. Ein Neuladen stellt die vollständige Ausgangsanalyse wieder her. Dauerhaft sichern und teilen können Sie Ihre Bearbeitung per Export; eine exportierte Datei lässt sich wieder importieren.</p></details>`;
 $('#source-dialog').showModal();
}
function updateRadar(){
 $('#radar').innerHTML=radarMarkup();
 $('#current-mean').textContent=number(maturityMean(state.maturity));$('#target-mean').textContent=number(maturityMean(state.maturity,'target'));
 $('#maturity-progress').style.width=maturityMean(state.maturity)/5*100+'%';
 $$('[data-dimension]').forEach(input=>{input.value=state.maturity[input.dataset.dimension][input.dataset.valueField];input.nextElementSibling.textContent=number(input.value);});
}
function bindRadar(){
 const svg=$('#radar');
 const coordinates=event=>{const p=svg.createSVGPoint();p.x=event.clientX;p.y=event.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());};
 svg.addEventListener('pointerdown',event=>{
  const el=event.target.closest('[data-drag-value],[data-drag-target],[data-drag-axis]');if(!el)return;
  const kind=el.hasAttribute('data-drag-axis')?'axis':el.hasAttribute('data-drag-target')?'target':'current';
  const id=el.dataset.dragAxis||el.dataset.dragTarget||el.dataset.dragValue,start=coordinates(event);
  if(kind==='axis'){
   const item=radarGeometry().find(d=>d.id===id),[x,y]=point(item.angle,207);
   const original=[...state.maturity],origin={x,y};
   drag={kind,id,start,origin,original,originalAngle:item.angle,preview:previewRadarDrag(original,id,start,origin,start)};
  }else{
   drag={kind,id,originalValue:state.maturity.find(item=>item.id===id)[kind]};
  }
  svg.setPointerCapture(event.pointerId);event.preventDefault();svg.classList.add('dragging');
 });
 svg.addEventListener('pointermove',event=>{
  if(!drag)return;const local=coordinates(event);
  if(drag.kind==='axis'){
   drag.preview=previewRadarDrag(drag.original,drag.id,drag.start,drag.origin,local);
   svg.innerHTML=radarMarkup();
   const preview=$('#radar-order-preview');preview.hidden=false;
   preview.innerHTML=drag.preview.items.map((item,i)=>`<span class="${item.id===drag.id?'moving':''}">${i+1}. ${escape(item.name)}</span>`).join('');
   const list=$('.dimension-controls');
   if(list){const cards=new Map($$('[data-dimension-id]',list).map(card=>[card.dataset.dimensionId,card]));drag.preview.items.forEach(item=>list.append(cards.get(item.id)));}
   return;
  }
  const index=state.maturity.findIndex(d=>d.id===drag.id);if(index<0)return;
  const angle=-Math.PI/2+index*2*Math.PI/state.maturity.length;
  const projected=(local.x-330)*Math.cos(angle)+(local.y-245)*Math.sin(angle);
  state.maturity[index][drag.kind]=Math.round(clamp(projected/160*5)*10)/10;updateRadar();
 });
 const finish=cancelled=>{
  if(!drag)return;const previous=drag;drag=null;svg.classList.remove('dragging');
  if(previous.kind==='axis'){
   if(!cancelled){state.maturity=previous.preview.items;save();}
   render();
  }else{
   if(cancelled)state.maturity.find(item=>item.id===previous.id)[previous.kind]=previous.originalValue;
   updateRadar();if(!cancelled)save();
  }
 };
 svg.addEventListener('pointerup',()=>finish(false));
 svg.addEventListener('pointercancel',()=>finish(true));
 svg.addEventListener('keydown',event=>{
  const label=event.target.closest('[data-drag-axis]');if(!label)return;
  const direction={ArrowLeft:-1,ArrowUp:-1,ArrowRight:1,ArrowDown:1}[event.key];if(!direction)return;
  event.preventDefault();const id=label.dataset.dragAxis,index=state.maturity.findIndex(item=>item.id===id),to=index+direction;
  if(to<0||to>=state.maturity.length)return;
  state.maturity=reorderDimension(state.maturity,id,to);save();render();
  $(`[data-drag-axis="${CSS.escape(id)}"]`).focus();
 });
}
function updateEconomics(){const e=economics(state.revenueAssumptions);$('#eco-orders').textContent=number(e.orders,0);$('#eco-revenue').textContent=euro(e.revenue);$('#eco-services').textContent=euro(e.serviceRevenue);$('#eco-contribution').textContent=euro(e.contribution);$('#eco-contribution').classList.toggle('negative',e.contribution<0);}
document.addEventListener('input',event=>{
 const el=event.target;
 if(el.dataset.weight&&el.value!==''&&el.checkValidity()){const next={...state.weights,[el.dataset.weight]:Number(el.value)};if(Object.values(next).some(v=>v>0)){state.weights=next;refreshPriorities();save();}}
 if(el.dataset.field){let v=el.value;if(el.dataset.field.endsWith('.name')&&!v.trim())return;pathSet(state,el.dataset.field,v);save();if(active==='reifegrad'&&el.dataset.field.startsWith('maturity.')&&el.dataset.field.endsWith('.name'))updateRadar();}
 if(el.hasAttribute('data-dimension')){state.maturity[Number(el.dataset.dimension)][el.dataset.valueField]=clamp(el.value);updateRadar();save();}
 if(el.dataset.cashflow){
  state.cashflowAssumptions[el.dataset.cashflow]=Number(el.value);
  document.getElementById('cashflow-value-'+el.dataset.cashflow).textContent=number(el.value,0);
  $('#cashflow-results').innerHTML=cashflowResults(state.cashflowAssumptions);
  save();
 }
 if(el.dataset.economics){if(el.value===''||!el.checkValidity())return;state.revenueAssumptions[el.dataset.economics]=Number(el.value);updateEconomics();save();}
});
document.addEventListener('change',event=>{
 const el=event.target;
 if(el.id==='hybrid-canvas-original')showOriginalCanvas=el.checked;
 if(el.dataset.weight){
  const value=Number(el.value);if(el.value===''||!el.checkValidity()){el.value=state.weights[el.dataset.weight];toast('Bitte ein Gewicht zwischen 0 und 100 eingeben.');return;}
  const next={...state.weights,[el.dataset.weight]:value};if(Object.values(next).every(v=>v===0)){el.value=state.weights[el.dataset.weight];toast('Mindestens ein Gewicht muss größer als 0 sein.');return;}
  state.weights=next;save();refreshPriorities();
 }
 if(el.dataset.rating){pathSet(state,el.dataset.rating,Number(el.value));save();render();if(el.id)document.getElementById(el.id)?.focus({preventScroll:true});}
 if(el.hasAttribute('data-status')){state.actions[Number(el.dataset.status)].status=el.value;save();render();}
 if(el.dataset.economics&&(el.value===''||!el.checkValidity())){el.value=state.revenueAssumptions[el.dataset.economics];toast('Bitte einen gültigen, nicht negativen Szenariowert eingeben.');}
 if(el.dataset.field?.endsWith('.name')&&!el.value.trim()){el.value=pathGet(state,el.dataset.field);toast('Bitte einen Namen für die Dimension eingeben.');}
});
document.addEventListener('click',event=>{
 const el=event.target.closest('[data-action]');if(!el)return;const action=el.dataset.action;
 if(action!=='more'){$('#more-menu').hidden=true;$('[data-action="more"]').setAttribute('aria-expanded','false');}
 if(action==='skip'){event.preventDefault();$('#main').focus();}
 if(action==='edit'){editing=!editing;render();$('.edit-toggle').focus();}
 if(action==='sources')showSources();
 if(action==='close-dialog')$('#source-dialog').close();
 if(action==='export')exportAnalysis();
 if(action==='more'){const menu=$('#more-menu');menu.hidden=!menu.hidden;el.setAttribute('aria-expanded',String(!menu.hidden));}
 if(action==='print')window.print();
 if(action==='import')$('#import-file').click();
 if(action==='reset')$('#confirm-dialog').showModal();
 if(action==='cancel-reset')$('#confirm-dialog').close();
 if(action==='confirm-reset'){state=clone(DEFAULT_STATE);save();$('#confirm-dialog').close();render();toast('Ausgangsanalyse wiederhergestellt.');}
 if(action==='add-dimension'){
  if(state.maturity.length>=10){toast('Es sind höchstens 10 Dimensionen möglich.');return;}
  const i=state.maturity.length;state.maturity.push({id:'custom-'+crypto.randomUUID(),name:'Neue Dimension',current:2,target:4,evidence:'Eigene Annahme – bitte Bewertung und Begründung ergänzen.',source:'',pages:''});save();render();$('.dimension-editor').open=true;$('#dimension-'+i).focus();$('#dimension-'+i).select();
 }
 if(action==='remove-dimension'&&state.maturity.length>3){state.maturity.splice(Number(el.dataset.index),1);save();render();$('.dimension-editor').open=true;toast('Dimension entfernt.');}
 if(action==='move-dimension'){const from=Number(el.dataset.index),to=from+Number(el.dataset.direction);if(to<0||to>=state.maturity.length)return;const [item]=state.maturity.splice(from,1);state.maturity.splice(to,0,item);save();render();$('.dimension-editor').open=true;$('#dimension-'+to).focus();}
});
document.addEventListener('click',event=>{if(!event.target.closest('.topbar-actions')){$('#more-menu').hidden=true;$('[data-action="more"]').setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#more-menu').hidden=true;$('[data-action="more"]').setAttribute('aria-expanded','false');}});
$('#navigation').addEventListener('keydown',event=>{const i=TABS.findIndex(t=>t.id===active);let next;if(event.key==='ArrowDown')next=(i+1)%TABS.length;if(event.key==='ArrowUp')next=(i+TABS.length-1)%TABS.length;if(event.key==='Home')next=0;if(event.key==='End')next=TABS.length-1;if(next!==undefined){event.preventDefault();location.hash=TABS[next].id;setTimeout(()=>$('#tab-'+TABS[next].id)?.focus(),0);}});
$('#import-file').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;
 try{if(file.size>2_000_000)throw new Error('Die Datei darf höchstens 2 MB groß sein.');const incoming=validateState(JSON.parse(await file.text()));state=incoming;save();render();toast('Analyse erfolgreich importiert.');}
 catch(error){toast('Import fehlgeschlagen: '+error.message);}event.target.value='';
});
for(const dialog of [$('#source-dialog'),$('#confirm-dialog')])dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
for(const type of ['input','change','click','keydown','submit'])document.addEventListener(type,event=>handleCustomerAnalysisEvent(event,state,{save,render,toast}));
for(const type of ['input','change','click','keydown','submit','pointerover','focusin','pointerdown','pointermove','pointerup','pointercancel'])document.addEventListener(type,event=>handleAnalysisEvent(event,state,{save,render,toast,startEditing:()=>{editing=true;}}));
window.addEventListener('hashchange',navigate);navigate();
save();
