import {PROJECT_PILOT,PATTERN_CATALOG,PATTERNS,CANVAS_SOURCE,MODEL_SOURCE,ideaTemplate,patternRecord} from './analysis-data.js';
import {assessedIdeaRisk,ideaScore,rankedIdeas,modelMean,modelGaps,actionQuadrant,candidateFromIdea} from './core.js';
const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const n=v=>v===null?'Offen':new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(v);
const field=(path,label,value,edit)=>edit?`<label class="edit-field"><span>${e(label)}</span><textarea data-x-text="${path}" rows="3" maxlength="10000">${e(value)}</textarea></label>`:`<div class="analysis-field"><h4>${e(label)}</h4><p class="editable-text">${e(value)}</p></div>`;
const tag=(text,kind='')=>`<span class="status-tag ${kind}">${e(text)}</span>`;
const section=(title,body,icon,open=true)=>`<details class="profile-dimension analysis-section" ${open?'open':''}><summary><span class="dimension-icon">${icon('overview')}</span><strong>${e(title)}</strong>${icon('chevron')}</summary><div class="dimension-detail">${body}</div></details>`;
const headedSection=(title,body)=>`<div class="section-heading"><h2>${e(title)}</h2></div><section class="panel analysis-section headed-analysis">${body}</section>`;
const select=(path,label,value,options,labelClass='')=>`<label class="analysis-select"><span class="${labelClass}">${e(label)}</span><select data-x-value="${path}">${options.map(([v,t])=>`<option value="${e(v)}" ${String(v)===String(value)?'selected':''}>${e(t)}</option>`).join('')}</select></label>`;
const levels=(path,label,value,max=4,labelClass='')=>select(path,label,value===null?'':value,[['','Nicht belegt'],...Array.from({length:max},(_,i)=>[i+1,'Stufe '+(i+1)])],labelClass);
const status=(path,value)=>select(path,'Einordnung',value,[[true,'Annahme / Außensicht'],[false,'Intern validiert']]);
const link=url=>/^https?:\/\//i.test(url)?`<a class="source-ref" href="${e(url)}" target="_blank" rel="noopener">Öffentliche Quelle öffnen ↗</a>`:'';
let activeModel=null;
const ideaTabs=[['patterns','Musterübersicht'],['board','Ideen-Board'],['map','Opportunity Map'],['proposals','Entwicklungsvorschläge']];
let activeIdeaTab=ideaTabs[0][0];
const collapsedIdeaDetails=new Set();
const activePatternFilters=new Set(['current','target']);
const patternFilters=[['current','Derzeit genutzt'],['target','Ausbaufähig'],['all','Alle Muster']];
let activeOverviewGroup='product';
let stageBubble=null;
let pendingRating=null;
const selectedCriteria={product:null,customer:null,business:null};
function radar(title,items,max=4,showSummary=true,showStatus=showSummary,groupId=''){
 const productChart=Boolean(groupId);
 const manyCriteria=items.length>8;
 const selectedCriterion=selectedCriteria[groupId];
 const center=210,r=productChart?105:122,xy=(i,v)=>[center+Math.cos(-Math.PI/2+i*2*Math.PI/items.length)*r*v/max,center+Math.sin(-Math.PI/2+i*2*Math.PI/items.length)*r*v/max];
 const coords=(value)=>items.map((d,i)=>xy(i,value(d))).map(p=>p.join(',')).join(' ');
 const series=(key,cls)=>{
  const complete=items.every(d=>d[key]!==null);
  const shape=complete
   ? `<polygon class="${cls}" points="${coords(d=>d[key])}"/>`
   : items.map((d,i)=>{
    const next=(i+1)%items.length;
    if(d[key]===null||items[next][key]===null)return '';
    const [x1,y1]=xy(i,d[key]),[x2,y2]=xy(next,items[next][key]);
    return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
   }).join('');
  return shape+items.map((d,i)=>{
   if(d[key]===null)return '';
   const [x,y]=xy(i,d[key]);
   return `<circle class="${cls}" cx="${x}" cy="${y}" r="${key==='target'?6:4}"><title>${e(d.name)} · ${key==='current'?'Ist':'Soll'} ${n(d[key])}</title></circle>`;
  }).join('');
 };
 return `<figure class="model-chart ${productChart?'product-chart':'panel'}${productChart&&manyCriteria?' many-criteria-chart':''}"><figcaption>${showSummary&&!productChart?`<h3>${e(title)}</h3>`:''}<div class="chart-legend">${tag('Ist','orange')}${tag('Soll','pink')}${tag('1–'+max)}</div></figcaption><svg viewBox="${showSummary?(showStatus?'0 0 420 420':(manyCriteria?'-100 -10 620 435':'-40 40 500 310')):'0 0 420 350'}" role="group" aria-label="${e(title)}: Ist und Soll.${productChart?' Kriterium auswählen, um die Bewertung zu öffnen.':' Bereich auswählen, um Ist- und Soll-Wert anzuzeigen.'}">${Array.from({length:max},(_,i)=>`<polygon points="${coords(()=>i+1)}" class="radar-grid"/><text x="215" y="${center-r*(i+1)/max-4}" class="radar-tick">${i+1}</text>`).join('')}${items.map((d,i)=>{
 const [x,y]=xy(i,max);
 let [lx,ly]=xy(i,max*(showSummary?(productChart?1.4:1.33):(i===0?1.23:1.43)));
 if(!showSummary){lx=i===0?210:i===1?325:95;ly=i===0?64:310;}
 if(productChart&&manyCriteria){
  if(i===0){lx=center;ly=24;}
  else if(i===6){lx=center;ly=400;}
  else {lx=i<6?350:70;ly=80+60*(i<6?i-1:11-i);}
 }
 const anchor=productChart&&x>center+1?'start':productChart&&x<center-1?'end':'middle';
 const words=d.name.split(' '),lines=[];
 let line='';
 for(const word of words){
  if((line+' '+word).trim().length>18&&line){lines.push(line);line=word;}
  else line=(line+' '+word).trim();
 }
 if(line)lines.push(line);

 const width=Math.max(...lines.map(l=>l.length))*(productChart?10:11)+20;
 const left=anchor==='start'?lx-10:anchor==='end'?lx-width+10:lx-width/2;
 const connectorX=anchor==='start'?lx-12:anchor==='end'?lx+12:lx;
 const connectorY=anchor==='middle'?(ly<center?ly+10:ly-24):ly-6;
 const connector=productChart?`<line x1="${x}" y1="${y}" x2="${connectorX}" y2="${connectorY}" class="criterion-connector" aria-hidden="true"/>`:'';
 const label=`<text x="${lx}" y="${ly}" text-anchor="${anchor}" class="model-chart-label">${lines.map((l,j)=>`<tspan x="${lx}" dy="${j?20:0}">${e(l)}</tspan>`).join('')}</text>`;
 const overviewChoice=`<g role="button" tabindex="0" data-overview-group="${e(d.id)}" aria-label="${e(d.name)}" aria-pressed="${activeOverviewGroup===d.id}" aria-controls="overview-selected-scores" class="criterion-chart-choice"><rect x="${left}" y="${ly-20}" width="${width}" height="${lines.length*20+12}" rx="3"/>${label}</g>`;
 return `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="radar-axis"/>${connector}${productChart?`<g role="button" tabindex="0" data-criterion-id="${e(d.id)}" data-group-id="${e(groupId)}" aria-label="${e(d.fullName||d.name)}" aria-pressed="${selectedCriterion===d.id}" class="criterion-chart-choice"><rect x="${left}" y="${ly-20}" width="${width}" height="${lines.length*20+12}" rx="3"/>${label}</g>`:overviewChoice}`;
}).join('')}${series('current','radar-current')}${series('target','radar-target')}</svg>${showStatus?`<p class="scope-note">Ist ${n(modelMean(items))} · Soll ${n(modelMean(items,'target'))} · ${items.filter(d=>d.current!==null).length}/${items.length} Ist-Werte belegt oder eingeschätzt. Bei Lücken werden bekannte Punkte und ihre direkten Verbindungen angezeigt.</p>`:''}</figure>`;
}
function maturityCriterion(c,path,{editing,cite,groupId}) {
 return `<section class="selected-product-criterion file-criterion" data-selected-group="${e(groupId)}"><div class="selected-criterion-heading"><h3 tabindex="-1">${e(c.name)}</h3><button class="icon-button" data-close-criterion="${e(groupId)}" aria-label="Kriterium schließen">×</button></div><div class="stage-columns">${['current','target'].map(key=>{
 const target=key==='target',label=target?'Soll':'Ist',bubble=stageBubble?.group===groupId&&stageBubble?.id===c.id&&stageBubble?.key===key;
 return `<div class="stage-column ${target?'stage-target':'stage-current'}">${levels(path+'.'+key,label,pendingRating?.path===path+'.'+key?pendingRating.value:c[key],4,target?'delta muted':'delta')}${pendingRating?.path===path+'.'+key?`<div class="rating-change-reason"><p><strong>${label}: ${pendingRating.previous===null?'Offen':'Stufe '+pendingRating.previous} → ${pendingRating.value===null?'Offen':'Stufe '+pendingRating.value}</strong></p><label><span>Begründe, warum sich die Bewertung ändert.</span><textarea data-rating-reason rows="4" maxlength="10000" required placeholder="Begründung der Änderung">${e(pendingRating.reason)}</textarea></label><label><span>Quelle (optional)</span><input data-rating-source type="text" maxlength="10000" placeholder="z. B. Titel, Seite oder URL" value="${e(pendingRating.source)}"></label><div class="rating-change-actions"><button type="button" class="button small" data-save-rating aria-label="Änderung mit Begründung für diese Sitzung übernehmen">✓ Übernehmen</button><button type="button" class="button small secondary" data-cancel-rating>Abbrechen</button></div></div>`:''}<div class="stage-stack">${c.levels.map((description,i)=>`<button type="button" ${c[key]!==i+1?'disabled':''} class="stage-card ${c[key]===i+1?'stage-active':''}" data-stage-group="${groupId}" data-stage-id="${c.id}" data-stage-key="${key}" data-stage-level="${i+1}" aria-expanded="${Boolean(bubble&&stageBubble.level===i+1)}"><strong>Stufe ${i+1}${c[key]===i+1?' · '+label:''}</strong><span>${e(description)}</span></button>${c[key]===i+1?`<div class="stage-bubble stage-preview${bubble&&stageBubble.level===i+1?' is-open':''}" role="region" aria-label="${label}-Begründung"><button class="icon-button" data-close-bubble aria-label="Begründung schließen">×</button>${c[key]===i+1?`<h4>${label}-Begründung</h4>`:''}${c[key]===i+1?field(path+(target?'.targetEvidence':'.evidence'),'Begründung',target?c.targetEvidence:c.evidence,editing):`<p>Diese Stufe ist aktuell nicht als ${label} ausgewählt. Die Bewertung lässt sich oben ändern.</p>`}${!target&&c[key]===i+1&&c.source?cite(c.source,c.pages):''}${c[key]===i+1&&(target?c.targetReference:c.currentReference)?`<p class="rating-source"><strong>Quelle:</strong> ${e(target?c.targetReference:c.currentReference)}</p>`:''}</div>`:''}`).join('')}</div></div>`;
 }).join('')}</div>${editing?status(path+'.assumption',c.assumption)+field(path+'.reference','Zusätzlicher Beleg / Fundstelle',c.reference,true):''}</section>`;
}
function overviewScores(selected){
 return `<aside class="overview-scores" aria-label="Bereichswerte">
  <div id="overview-selected-scores" aria-live="polite" aria-atomic="true">
   <h3>${e(selected.name)}</h3>
   <div class="stage-columns">
    ${[['Ist',modelMean(selected.criteria)],['Soll',modelMean(selected.criteria,'target')]].map(([label,value])=>`<div class="stage-column overview-stage">
     <span class="delta${label==='Soll'?' muted':''}">${label}</span>
     <p class="overview-score">${value===null?'Nicht belegt':'Stufe '+n(value)}</p>
    </div>`).join('')}
   </div>
  </div>
  <p class="overview-score-intro">Die Bereichswerte sind gleich gewichtete Mittelwerte der bewerteten Kriterien.</p>
 </aside>`;
}
function developmentGaps(gaps){
 return `<section class="development-gaps"><h4>Wichtigste Entwicklungslücken</h4>${gaps.length?`<ul>${gaps.map(g=>`<li>
  <strong>${e(g.name)}</strong><span class="development-gap-values"><span class="overview-ist">Ist ${n(g.current)}</span> → <span class="overview-soll">Soll ${n(g.target)}</span> · +${n(g.gap)}</span>
 </li>`).join('')}</ul>`:'<p>Keine positive Lücke mit bekanntem Ist- und Soll-Wert.</p>'}</section>`;
}
function benchmarkSource(name,url){
 return /^https?:\/\//i.test(url)?`<a href="${e(url)}" target="_blank" rel="noopener">${e(name)}</a>`:e(name);
}
const benchmarkTitle='Entwicklungslücken im Wettbewerbsvergleich';
const additionalBenchmarks={
 product:{
  criterionId:'control',
  rows:[
   ['OBI',1,'Für den Holzzuschnitt erfolgt die Beauftragung laut OBI im Markt. Stufe 1 ist eine Schätzung für dieses Teilangebot.','https://www.obi.de/beratung-und-planung/zuschnitt-service/holzzuschnitt'],
   ['BAUHAUS',2,'Ausgewählte Zuschnittplatten online nach Maß konfigurieren und bestellen.','https://www.bauhaus.info/zuschnittplatten/c/10000766'],
   ['toom',1,'Maße und Schnittart werden laut Servicebeschreibung im Markt abgestimmt. Stufe 1 ist eine Schätzung für dieses Teilangebot.','https://toom.de/service/services-im-markt/zuschnittservice/']
  ]
 },
 business:{
  criterionId:'delivery',
  rows:[
   ['OBI',2,'Online oder im Markt eine Vermittlung an selbstständige Handwerksbetriebe anfragen.','https://www.obi.de/beratung-und-planung/machbarmacher'],
   ['BAUHAUS',2,'Montageberatung online buchen. BAUHAUS koordiniert die Arbeiten zum Festpreis.','https://www.bauhaus.info/s/service/services/montageservice'],
   ['toom',2,'Online-Anfrage und anschließende Koordination durch den Handwerksservice deuten auf digitale Unterstützung einzelner Schritte hin. Stufe 2 ist eine Schätzung.','https://toom.de/service/handwerksservice/']
  ]
 }
};
const benchmarkEstimates={
 monitor:{
  obi:[2,'heyOBI verbindet Einkaufslisten und digitale Beratung mit der Reservierung von Artikeln. Das spricht für eine digitale Sicht auf einzelne Bedarfs- und Auftragsdaten. Eine durchgängige Projektakte ist damit nicht belegt.','https://www.obi.de/legal/heyobi/vertragsbedingungen'],
  bauhaus:[2,'Die App zeigt die Verfügbarkeit im Fachcentrum und führt Merk- und Einkaufslisten. Das stützt Stufe 2 für einzelne Bestands- und Bedarfsinformationen.','https://www.bauhaus.info/s/service/vorteile/bauhaus-app'],
  toom:[2,'Die App zeigt Marktbestände und ermöglicht Bestellungen und Reservierungen. Das stützt Stufe 2 für einzelne Bestands- und Auftragsdaten.','https://apps.apple.com/de/app/toom/id1518750532']
 },
 optimization:{
  obi:[2,'Das Markt-Navi nutzt die Artikeldaten der Einkaufsliste, um Kundinnen und Kunden den Standort der Ware zu zeigen. Ich werte das als Verbesserung eines einzelnen Schritts der Projektversorgung.','https://www.obi.de/info/heyobi'],
  bauhaus:[2,'Die App sortiert die Einkaufsliste nach der Regalreihenfolge im gewählten Fachcentrum. Das verbessert einen einzelnen Schritt der Warenbeschaffung.','https://www.bauhaus.info/presse/archiv/pi-bauhaus-app-2023'],
  toom:[2,'Die Online-Planungshilfen berechnen den Materialbedarf aus Projektdaten. Das verbessert einen Teil der Versorgung, belegt aber keine projektübergreifende Optimierung.','https://toom.de/planungshilfen/']
 },
 development:{
  obi:[1,'OBI fragt nach dem Kauf nach Kundenzufriedenheit und Produktbewertungen. Das ist ein Anhaltspunkt für Kundeneingaben auf Stufe 1. Gemeinsame Produkttests sind in der Quelle nicht dokumentiert.','https://www.obi.de/legal/heyobi/vertragsbedingungen'],
  bauhaus:[1,'BAUHAUS sammelt Produktbewertungen und fragt sie teilweise aktiv an. Das stützt eine vorsichtige Schätzung auf Stufe 1 als Feedbackkanal. Wie das Feedback in die Produktentwicklung einfließt, geht aus der Quelle nicht hervor.','https://www.bauhaus.info/l/legal/terms-and-conditions'],
  toom:[1,'toom beschreibt ein Feedbackformular für die App. Das zeigt einen Kanal für Kundeneingaben und dient als Anhaltspunkt für Stufe 1. Eine direkte Mitentwicklung von Produkten ist damit nicht belegt.','https://apps.apple.com/de/app/toom/id1518750532']
 }
};
function benchmarkRatings(state,group,criterionId){
 const additional=additionalBenchmarks[group.id];
 return state.benchmark.map((b,index)=>{
  const ratingIndex=group.id==='customer'?b.ratings.findIndex(r=>r.id===criterionId):-1;
  const example=additional?.criterionId===criterionId?additional.rows.find(([name])=>name.toLowerCase()===b.id):null;
  const estimate=benchmarkEstimates[criterionId]?.[b.id];
  if(ratingIndex>=0)return {
   provider:b,value:b.ratings[ratingIndex].value,evidence:b.evidence,estimated:b.assumption,
   source:b.sourceUrl,date:b.retrieved,path:`benchmark.${index}.ratings.${ratingIndex}.value`
  };
  if(example||estimate)return {
   provider:b,value:example?.[1]??estimate[0],evidence:example?.[2]??estimate[1],source:example?.[3]??estimate[2],
   date:example?'19.11.2026':'20.11.2026',
   estimated:Boolean(estimate)||(group.id==='product'?b.id!=='bauhaus':b.id==='toom')
  };
  const path=`benchmarkManual.${group.id}.${criterionId}.${b.id}`;
  const manual=state.benchmarkManual[group.id][criterionId][b.id];
  return {provider:b,value:manual.value,source:manual.sourceUrl,manualPath:path,estimated:manual.estimated,reason:manual.reason};
 });
}

function benchmarkBrand(id,name){
 const logos={hornbach:'hornbach-logo.svg',obi:'benchmark-obi.svg',bauhaus:'benchmark-bauhaus.svg',toom:'benchmark-toom.svg'};
 return Object.hasOwn(logos,id)?`<span class="benchmark-brand"><img src="assets/${logos[id]}" alt="${e(name)}"></span>`:e(name);
}

function benchmarkOverview(state){
 const rows=state.model.map(group=>{
  const common=modelGaps([group]).map(gap=>({gap,ratings:benchmarkRatings(state,group,gap.id)}))
   .filter(({ratings})=>ratings.length&&ratings.every(({value})=>value!==null));
  const average=values=>values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
  const hornbach=average(common.map(({gap})=>gap.current));
  const peers=state.benchmark.map((_,i)=>average(common.map(({ratings})=>ratings[i].value)));
  return {group,hornbach,peers};
 });
 return `<section class="benchmark-comparison benchmark-overview">
  <h4>${benchmarkTitle}</h4>
  <div class="table-wrap"><table class="matrix" aria-label="Vergleichbare Ist-Mittelwerte">
   <thead><tr><th scope="col">Bereich</th><th scope="col">${benchmarkBrand('hornbach','HORNBACH')}</th>${state.benchmark.map(b=>`<th scope="col">${benchmarkBrand(b.id,b.name)}</th>`).join('')}</tr></thead>
   <tbody>${rows.map(({group,hornbach,peers})=>`<tr><th scope="row">${e(group.name)}</th><td>${n(hornbach)}</td>${peers.map(value=>`<td>${n(value)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>
  <p class="benchmark-sources">Ist-Mittelwerte auf Stufen 1–4. Pro Bereich zählen nur gezeigte Kriterien mit Werten für alle Anbieter. Die Außensicht enthält Schätzungen.</p>
 </section>`;
}
function syncBenchmarkBasis(form){
 const requiresSource=form.elements.namedItem('basis').value==='source';
 const source=form.elements.namedItem('source');
 source.disabled=!requiresSource;
 source.required=requiresSource;
 form.querySelector('[data-benchmark-source]').hidden=!requiresSource;
 const reason=form.elements.namedItem('reason');
 reason.disabled=requiresSource;
 reason.required=!requiresSource;
 form.querySelector('[data-benchmark-reason]').hidden=requiresSource;
}
function benchmarkCell(group,gap,rating,editing){
 const {provider,value,evidence,estimated,source,date,path,manualPath,reason}=rating;
 const dialogId=`benchmark-evidence-${group.id}-${gap.id}-${provider.id}`;
 const title=provider.name+' · '+gap.name;
 const label=n(value)+(value!==null&&estimated?' *':'');
 return `<td>
  <button type="button" class="benchmark-criterion" data-benchmark-dialog="${dialogId}" aria-haspopup="dialog" aria-label="${e(title+' · '+(value===null?'Offen':'Stufe '+n(value)))}">${label}</button>
  <dialog id="${dialogId}" aria-labelledby="${dialogId}-title">
   <h3 id="${dialogId}-title">${e(title)}</h3>
   ${value!==null?`<p><strong>Stufe ${n(value)}${estimated?' (Schätzung)':''}</strong>${evidence?`<br>${e(evidence)}`:''}</p>`:''}
   ${source?`<p>${benchmarkSource('Quelle öffnen',source)}${date?' · '+e(date):''}</p>`:''}
   ${manualPath?`<form data-benchmark-rating="${manualPath}" data-dialog-id="${dialogId}">
    <label class="analysis-select"><span>Stufe</span><select name="level" required>
     <option value="">Offen</option>
     ${[1,2,3,4].map(level=>`<option value="${level}" ${value===level?'selected':''}>Stufe ${level}</option>`).join('')}
    </select></label>
    <label class="analysis-select"><span>Grundlage</span><select name="basis">
     <option value="source">Quelle</option>
     <option value="estimate" ${estimated?'selected':''}>Schätzung</option>
    </select></label>
    <div data-benchmark-source ${estimated?'hidden':''}>
     <label class="edit-field"><span>Quelle (URL)</span><input type="url" name="source" value="${e(source)}" ${estimated?'disabled':'required'} maxlength="10000" placeholder="https://…"></label>
    </div>
    <div data-benchmark-reason ${estimated?'':'hidden'}>
     <label class="edit-field"><span>Begründung</span><textarea name="reason" rows="3" maxlength="10000" ${estimated?'required':'disabled'}>${e(reason)}</textarea></label>
    </div>
    <div class="benchmark-dialog-actions">
     <button class="button small">Speichern</button>
     <button class="button small secondary" formmethod="dialog" formnovalidate>Schließen</button>
    </div>
   </form>`:`<form method="dialog">${editing&&path?levels(path,'Stufe',value):''}<button class="button small secondary">Schließen</button></form>`}
  </dialog>
 </td>`;
}
function benchmarkComparison(group,gaps,state,editing){
 const customer=group.id==='customer';
 const providers=state.benchmark;
 return `<section class="benchmark-comparison">
  <h4>${benchmarkTitle}</h4>
  ${gaps.length?`<div class="table-wrap"><table class="matrix benchmark-table" aria-label="${benchmarkTitle}">
   <thead><tr><th scope="col">Kriterium</th>${providers.map(b=>`<th scope="col">${benchmarkBrand(b.id,b.name)}</th>`).join('')}</tr></thead>
   <tbody>${gaps.map(gap=>`<tr><th scope="row">${e(gap.name)}</th>${benchmarkRatings(state,group,gap.id).map(rating=>benchmarkCell(group,gap,rating,editing)).join('')}</tr>`).join('')}</tbody>
  </table></div>`:'<p>Derzeit gibt es keine bewertete Entwicklungslücke für den Vergleich.</p>'}
  ${gaps.length?`<button type="button" class="button small secondary" data-x-action="benchmark-measure" data-id="${e(group.id)}">Maßnahme ableiten</button>`:''}
  ${customer&&editing?`<div>${providers.map((b,i)=>`<article class="panel spaced"><h3>${e(b.name)}</h3>${field(`benchmark.${i}.scope`,'Vergleichbarkeit',b.scope,true)}${field(`benchmark.${i}.evidence`,'Beleg & Grenzen',b.evidence,true)}${field(`benchmark.${i}.sourceUrl`,'Quellen-URL',b.sourceUrl,true)}${field(`benchmark.${i}.retrieved`,'Quellenstand / Abruf',b.retrieved,true)}${status(`benchmark.${i}.assumption`,b.assumption)}</article>`).join('')}${field('benchmarkConclusion','Wettbewerbssituation & Konsequenz',state.benchmarkConclusion,true)}</div>`:''}
 </section>`;
}
function maturityQuestions(state,group,{editing,icon}){
 // Keep the question indexes aligned with the existing edit and export paths.
 const questionIndexes={product:[1,3,4],customer:[0,5],business:[2,6]};
 const questions=questionIndexes[group.id];
 return `<section class="maturity-questions" aria-labelledby="overview-questions-title">
  <h3 id="overview-questions-title"><span class="dimension-icon" aria-hidden="true">${icon('bulb')}</span>Leitfragen – ${e(group.name)}</h3>
  ${questions.map(i=>({question:state.modelQuestions[i],index:i})).map(({question:q,index:i})=>`
  <article class="analysis-question">
   <h3>${e(q.question)}</h3>
   <div class="analysis-question-answer">${editing?field(`modelQuestions.${i}.answer`,q.name,q.answer,true):`<p class="editable-text">${e(q.answer)}</p>`}</div>
  </article>`).join('')}
 </section>`;
}
function maturityFolder(state,overview,{editing,icon,cite}){
 const groups=state.model;
 const overviewGroup=groups.find(group=>group.id===activeOverviewGroup)??groups[0];
 const g=groups.find(g=>g.id===activeModel),gi=groups.indexOf(g);
 const shortNames={product:['Überwachung','Steuerung','Optimierung','Autonomie','Vernetzung'],customer:['Mitentwicklung','Empfehlungen','Nachfrageprognose','Informationskanäle','Auftragseingang','Bezahlsysteme','Self Service','Kundenberatung','After Sales','Customer Journey','Verhaltensanalyse','IT-Integration'],business:['Geschäftsidee','Leistung','Interaktion','Angebot','Ziele']};
 const selected=g?.criteria.find(c=>c.id===selectedCriteria[g.id]);
 const gaps=g?modelGaps([g]):overview
  .filter(area=>area.current!==null&&area.target!==null)
  .map(area=>({...area,gap:Number((area.target-area.current).toFixed(1))}))
  .filter(area=>area.gap>0)
  .sort((a,b)=>b.gap-a.gap);
 return `<section class="maturity-folder ${!g?'folder-with-scores':''} ${g?'folder-open':''} ${selected?'has-selection':''}"><div class="folder-tabs" role="tablist" aria-label="Reifegradbereiche"><button role="tab" id="folder-tab-overview" data-model-tab="overview" aria-selected="${!g}" aria-controls="folder-content">Übersicht</button>${groups.map(d=>`<button role="tab" id="folder-tab-${d.id}" data-model-tab="${d.id}" aria-selected="${activeModel===d.id}" aria-controls="folder-content">${e(d.name)}</button>`).join('')}</div><div class="folder-content" id="folder-content" role="tabpanel" aria-labelledby="folder-tab-${activeModel??'overview'}"><div class="folder-chart">${g?`${radar(g.name+' nach Kriterien',g.criteria.map((c,i)=>({...c,fullName:c.name,name:shortNames[g.id][i]})),4,true,false,g.id)}`:`<div class="model-overview folder-overview">${radar('Drei Bereiche im Vergleich',overview,4,false)}</div>`}${developmentGaps(gaps)}${g?benchmarkComparison(g,gaps,state,editing):benchmarkOverview(state)}</div>${g?`<div class="folder-stages">${selected?maturityCriterion(selected,`model.${gi}.criteria.${g.criteria.indexOf(selected)}`,{editing,cite,groupId:g.id}):'<p class="criterion-placeholder">Wähle ein Kriterium im Schaubild.</p>'}</div>`:`<div class="overview-sidebar">${overviewScores(overviewGroup)}${maturityQuestions(state,overviewGroup,{editing,icon})}</div>`}</div></section>`;
}
export function maturityAnalysis(state,{editing,icon,cite}){
 const groups=state.model,overview=groups.map(g=>({id:g.id,name:g.name,current:modelMean(g.criteria),target:modelMean(g.criteria,'target')}));
 return `${maturityFolder(state,overview,{editing,icon,cite})}`;
}
export function readiness(state,{editing,icon}){return section('KI-Reife, Daten & Resilienz',`<p>Zusätzliche Perspektiven auf einer eigenen Skala von 1–5: 1 einzelne Initiativen · 2 punktuell · 3 systematisch · 4 integriert · 5 messbar optimiert. Sie verändern die Modellbewertung auf Stufen 1–4 nicht. Keine Einstufung ohne Beleg.</p>${state.readiness.map((r,i)=>`<article class="criterion"><div class="criterion-body">${tag(r.kind)}<h3>${e(r.name)}</h3><div class="analysis-controls">${levels(`readiness.${i}.current`,'Ist',r.current,5)}${levels(`readiness.${i}.target`,'Soll',r.target,5)}</div>${field(`readiness.${i}.evidence`,'Begründung / Prüfauftrag',r.evidence,editing)}</div></article>`).join('')}`,icon);}
export function triangleView(dimensions,{id,selected='what',content}){
 return `<div class="profile-triangle" data-selected-triangle-part="${e(selected)}">
  <div class="profile-triangle-diagram" role="group" aria-label="Magisches Dreieck">
   <svg viewBox="0 0 400 260" preserveAspectRatio="none" aria-hidden="true"><polygon points="200,22 40,230 360,230"/></svg>
   ${dimensions.map(part=>`<button type="button" class="triangle-part triangle-part-${e(part.id)}" data-triangle-part="${e(part.id)}" aria-controls="${id}-${e(part.id)}" aria-pressed="${selected===part.id}">${e(part.name)}</button>`).join('')}
  </div>
  <div class="profile-triangle-explanations">${dimensions.map((part,index)=>`<div class="triangle-part-text" id="${id}-${e(part.id)}" ${selected===part.id?'':'hidden'}><h3>${e(part.name.toLocaleUpperCase('de-DE'))}</h3>${content(part,index)}</div>`).join('')}</div>
 </div>`;
}
export function showTrianglePart(diagram,id){
 for(const button of diagram.querySelectorAll('[data-triangle-part]')){
  button.setAttribute('aria-pressed',String(button.dataset.trianglePart===diagram.dataset.selectedTrianglePart));
  document.getElementById(button.getAttribute('aria-controls')).hidden=button.dataset.trianglePart!==id;
 }
}
function modelCards(dimensions,editing,path='four'){return `<section class="navigator-triangle" aria-label="Geschäftsmodell-Navigator"><svg class="navigator-lines" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true"><path d="M400 85 L110 490 L690 490 Z M400 85V300 M110 490L400 300L690 490"/></svg>${dimensions.map((f,i)=>`<article class="navigator-node navigator-node-${i}"><span class="delta">${e(f.name)}</span>${editing?field(`${path}.${i}.text`,f.name,f.text,true):`<p class="editable-text">${e(f.text)}</p>`}</article>`).join('')}</section>`;}

export function canvasView(state,editing){return `<div class="canvas-grid canvas-board">${state.canvas.map((c,i)=>`<article class="panel canvas-${c.id}">${field(`canvas.${i}.text`,c.name,c.text,editing)}</article>`).join('')}</div><p class="method-caption source-note">${e(CANVAS_SOURCE)} · Ist-Beschreibung: ${e('Geschäftsbericht 2025/26, S. 37–38, 72–73; analytische Zuordnung.')}</p>`;}
export function businessAnalysis(state,ctx){return modelCards(state.four,ctx.editing)+headedSection('Business Model Canvas',canvasView(state,ctx.editing));}
function opportunityMap(items,score,title,interactive=false){
 const height=interactive?440:360;
 const baseY=interactive?320:290, yStep=65;
 const radius=interactive?15:13;
 const points=items.map((d,i)=>{
  const cost=d.cost??d.effort;
  const peers=items.slice(0,i).filter(p=>(p.cost??p.effort)===cost&&p.impact===d.impact).length;
  const column=peers%3;
  const offset=interactive?(cost===1?column*30:cost===5?-column*30:[0,-30,30][column]):column*14;
  const x=65+(cost-1)*125+offset;
  const y=baseY-(d.impact-1)*yStep-Math.floor(peers/3)*(interactive?(d.impact>=4?-32:32):18);
  return {d,x,y,metrics:interactive?
   `Nutzen ${d.impact} / Machbarkeit ${d.feasibility} / Kosten ${cost} / Risiko ${d.risk}`:
   `Wirkung ${d.impact} / Aufwand ${cost} / Risiko ${d.risk}`};
 });
 return `<figure class="${interactive?'opportunity-map':'panel opportunity-map'}"><figcaption>${interactive?`<h2>${e(title)}</h2>`:`<h3>${e(title)}</h3>`}${interactive?'':'<p>Hohe Wirkung und geringer Aufwand liegen oben links. Nummern entsprechen der Liste darunter; ein magentafarbener Rand markiert hohes Risiko (4–5).</p>'}</figcaption>
 <div class="opportunity-plot"><svg viewBox="0 0 640 ${height}" role="img" aria-label="${e(title)}. ${interactive?'Nutzen nach Kosten.':'Wirkung nach Aufwand oder Kosten.'}"> ${interactive?`<rect x="45" y="12" width="270" height="178" fill="#fff4df"/><rect x="315" y="12" width="270" height="178" fill="#fcecf6"/><rect x="45" y="190" width="540" height="180" fill="#f6f6f4"/>
 <path d="M45 12V370H585M315 12V370M45 190H585" fill="none" stroke="#9aa1a5"/>
 <text class="map-label" x="62" y="34">Quick Wins</text><text class="map-label" x="332" y="34">Große Vorhaben</text><text class="map-label" x="62" y="354">Bei Gelegenheit</text><text class="map-label" x="332" y="354">Zurückstellen</text>
 <text class="map-label" x="12" y="190" text-anchor="middle" transform="rotate(-90 12 190)">Nutzen</text><text class="map-label" x="315" y="423" text-anchor="middle">Kosten →</text>
 ${[1,2,3,4,5].map(v=>`<text x="${65+(v-1)*125}" y="392" text-anchor="middle">${v}</text><text x="36" y="${baseY-(v-1)*yStep+5}" text-anchor="end">${v}</text>`).join('')}`:`<rect x="65" y="30" width="250" height="130" fill="#fff4df"/><rect x="315" y="30" width="250" height="130" fill="#fcecf6"/><rect x="65" y="160" width="500" height="130" fill="#f6f6f4"/><text x="80" y="52">Quick Wins</text><text x="330" y="52">Große Vorhaben</text><text x="80" y="282">Bei Gelegenheit</text><text x="330" y="282">Zurückstellen</text><path d="M65 30V290H565M315 30V290M65 160H565" fill="none" stroke="#9aa1a5"/><text x="270" y="335">Aufwand / Kosten →</text><text x="10" y="22">Wirkung ↑</text>${[1,2,3,4,5].map(v=>`<text x="${65+(v-1)*125}" y="310">${v}</text><text x="45" y="${290-(v-1)*65}">${v}</text>`).join('')}`}
 ${points.map(({d,x,y,metrics},i)=>`<g>${interactive?'':`<title>${i+1}. ${e(d.name)} · ${metrics} · Score ${n(score(d))}</title>`}<circle cx="${x}" cy="${y}" r="${radius}" fill="#f79e1c" stroke="${!interactive&&d.risk>=4?'#c80986':'#041116'}" stroke-width="${!interactive&&d.risk>=4?4:1.5}"/><text x="${x}" y="${y+4}" text-anchor="middle" font-weight="bold">${i+1}</text></g>`).join('')}</svg>
 ${interactive?points.map(({d,x,y,metrics},i)=>`<div class="map-point${x>=320?' map-point-right':''}" style="left:${x/6.4}%;top:${y/height*100}%">
  <span class="map-point-trigger" tabindex="0" role="img" aria-label="${i+1}. ${e(d.name)} · ${metrics}"></span>
  <div class="map-point-info" aria-hidden="true"><strong>${e(d.name)}</strong><span>${metrics}</span></div>
 </div>`).join(''):''}
 </div><ol class="map-key">${points.map(({d,metrics})=>`<li>${e(d.name)}${interactive?'':' · '+metrics}</li>`).join('')}</ol></figure>`;
}
function patternStatus(record){
 const current=record?.status==='Bestehend'&&Boolean(record.evidence.trim());
 const targetEvidence=record?.targetEvidence||(record?.status==='Ausbauidee'?record.evidence:'');
 return {current,targetEvidence,target:Boolean(targetEvidence.trim())};
}
function patternCard(number,id,name,record,cite,popoverId){
 const {current,target,targetEvidence}=patternStatus(record);
 const source=record?.targetReference||'';
 return `<div class="pattern-choice${current?' pattern-current':''}${target?' pattern-target':''}" data-pattern-id="${e(id)}">
  <button type="button" class="pattern-tile" popovertarget="${popoverId}">
   ${number?`<small>${number}</small>`:''}<strong>${e(name)}</strong>
   ${current?tag('Derzeit genutzt','orange'):''}${target?tag('Ausbaufähig','pink'):''}
  </button>
  <div class="pattern-preview" id="${popoverId}" popover role="region" aria-label="${e(name)}">
   <button type="button" class="icon-button pattern-close" popovertarget="${popoverId}" popovertargetaction="hide" aria-label="Musterinfo schließen">×</button>
   <h3>${e(name)}</h3>
   ${current?`<h4 class="pattern-preview-current">Derzeit genutzt</h4><p>${e(record.evidence)}</p>${record.source?cite(record.source,record.pages):link(record.evidenceUrl)}`:''}
   ${record?.status==='Annahme'&&record.evidence?`<h4>Offene Einordnung</h4><p>${e(record.evidence)}</p>${record.source?cite(record.source,record.pages):link(record.evidenceUrl)}`:''}
   ${number?`<a class="source-ref" href="https://www.businessmodelnavigator.com/pattern?id=${number}" target="_blank" rel="noopener">Muster im Navigator ↗</a>`:''}
   ${target?`<h4 class="pattern-preview-target">Ausbaufähig</h4><p>${e(targetEvidence)}</p>${source?(link(source)||`<p class="method-caption">${e(source)}</p>`):record.status==='Ausbauidee'&&record.source?cite(record.source,record.pages):''}`:''}
   <form data-pattern-target="${e(id)}">
    <label class="edit-field"><span>Begründung für den Ausbau</span><textarea name="reason" rows="3" maxlength="10000" required>${e(targetEvidence)}</textarea></label>
    <label class="edit-field"><span>Quelle oder Link (optional)</span><input name="reference" maxlength="10000" value="${e(source)}"></label>
    <div class="tag-row"><button class="button small" type="submit">${target?'Vormerkung aktualisieren':'Für Ausbau vormerken'}</button>${target?'<button class="button small secondary" type="submit" value="remove" formnovalidate>Vormerkung entfernen</button>':''}</div>
   </form>
  </div>
 </div>`;
}
function patternOverview(state,cite){
 const records=new Map(state.patterns.map(p=>[p.id,p]));
 const catalogIds=new Set(PATTERN_CATALOG.map(([,id])=>id));
 const matches=record=>{
  const {current,target}=patternStatus(record);
  return !activePatternFilters.size||(current&&activePatternFilters.has('current'))||(target&&activePatternFilters.has('target'));
 };
 const catalog=PATTERN_CATALOG.map(([number,id,name])=>({
  number,id,name,record:records.get(id)??PATTERNS.find(p=>p.id===id)
 })).filter(({record})=>matches(record));
 const extra=state.patterns.filter(p=>!catalogIds.has(p.id)&&matches(p));
 return `<div class="pattern-filter" role="group" aria-label="Muster filtern">
  ${patternFilters.map(([value,label])=>{
   const pressed=value==='all'?!activePatternFilters.size:activePatternFilters.has(value);
   return `<button type="button" id="pattern-filter-${value}" data-pattern-filter="${value}" aria-pressed="${pressed}">${pressed&&value!=='all'?'<span aria-hidden="true">✓</span> ':''}${label}</button>`;
  }).join('')}
 </div>
 ${catalog.length?`<div class="pattern-catalog">${catalog.map(({number,id,name,record})=>patternCard(number,id,name,record,cite,'pattern-preview-'+number)).join('')}</div>`:''}
 ${extra.length?`<h3 class="spaced">Eigene Muster</h3><div class="pattern-catalog">${extra.map((p,i)=>patternCard(null,p.id,p.name,p,cite,'pattern-preview-extra-'+i)).join('')}</div>`:''}
 ${!catalog.length&&!extra.length?'<p>Für diese Auswahl gibt es keine Muster.</p>':''}`;
}
let newIdeaId=null;
export function completedIdeas(state){
 return state.ideas.filter(idea=>idea.id!==newIdeaId);
}
let ideaPress=null;
let suppressIdeaClick=false;
function boardIdeas(state){
 return state.ideaManualOrder?state.ideas:rankedIdeas(state);
}
function scoredIdeas(state){
 return rankedIdeas(state).filter(idea=>idea.name.trim()&&idea.id!==newIdeaId&&ideaScore(idea,state.ideaWeights)>0);
}
function notifyIdeaRanking(state,before,idea,toast){
 const after=scoredIdeas(state);
 if(state.ideaManualOrder||before.length===after.length&&before.every((item,index)=>item===after[index])){
  toast('Bewertung übernommen.');
  return;
 }
 const position=after.indexOf(idea)+1;
 const change=idea?(position?` „${idea.name}“ steht jetzt auf Platz ${position}.`:` „${idea.name}“ ist vorerst ohne Rang.`):'';
 toast('Ranking geändert.'+change,{ranking:true});
}
const navigatorPatternOptions=PATTERN_CATALOG.map(([, ,name])=>[name,name]);
function navigatorPatternName(value){
 return navigatorPatternOptions.find(([name])=>name.toLowerCase()===value.trim().toLowerCase())?.[0]??'';
}
function ideaRanking(state,ranked,editing){
 const weights=state.ideaWeights;
 const criteria=[['impact','Nutzen'],['feasibility','Machbarkeit'],['cost','Kosten'],['risk','Risiko']];
 const hasDraft=state.ideas.some(idea=>idea.id===newIdeaId);
 return `<section class="idea-ranking" aria-labelledby="idea-ranking-heading">
  <h2 id="idea-ranking-heading">Ranking der Ideen</h2>
  <div class="idea-ranking-weights">
   <h3>Gewichte für Ideen</h3>
   <div class="weight-controls">${criteria.map(([key,label])=>`<label><span>${label}</span><span><input type="number" min="0" max="100" step="1" data-x-weight="${key}" value="${weights[key]}" aria-label="Ideengewicht ${label}" ${hasDraft?'disabled':''}> %</span></label>`).join('')}</div>
  </div>
  <div class="table-wrap">
   <table class="matrix idea-ranking-table" aria-labelledby="idea-ranking-heading">
    <thead><tr><th scope="col">Idee / Muster</th>${criteria.map(([,label])=>`<th scope="col">${label}</th>`).join('')}<th scope="col">Score</th></tr></thead>
    <tbody>${boardIdeas(state).map((idea,rank)=>{
     const index=state.ideas.indexOf(idea);
     const scoreRank=ranked.indexOf(idea);
     const path=`ideas.${index}`;
     const top=scoreRank>=0&&scoreRank<2;
     const draft=idea.id===newIdeaId;
     const editable=draft||(!hasDraft&&editing);
     const score=ideaScore(idea,weights);
     const description=idea.description.trim();
     const transfer=idea.transfer.trim();
     const explanation=idea.pattern&&transfer&&!(description&&transfer.includes(description))
      ?[description,transfer].filter(Boolean).join(' ')
      :description;
     return `<tr ${hasDraft?'':`data-idea-row="${e(idea.id)}" tabindex="0" aria-keyshortcuts="ArrowUp ArrowDown"`} class="idea-ranking-row${draft?' idea-draft-row':''}${rank%2?' idea-ranking-even':''}${top?' idea-ranking-top':''}"><td${draft?' colspan="6"':''}>
      <div class="idea-ranking-name">${draft?'':`<span class="row-index">${rank+1}</span>`}${editable?'':`<h3>${e(idea.name)}</h3>`}</div>
      ${editable?`<div class="idea-ranking-editor">
       <label class="edit-field"><span>Idee</span><input data-x-text="${path}.name" maxlength="10000" value="${e(idea.name)}"></label>
       ${select(path+'.pattern','Welches Navigator-Muster nutzt die Idee?',navigatorPatternName(idea.pattern),[['','Muster auswählen'],...navigatorPatternOptions])}
       ${select(path+'.method','Methode',idea.method,[['','Methode auswählen'],['Ähnlichkeitsprinzip','Ähnlichkeitsprinzip'],['Konfrontationsprinzip','Konfrontationsprinzip']].filter(([value])=>draft||value))}
       ${field(path+'.description','Ideenbeschreibung:',explanation,true)}
       ${draft?`<button class="button small" data-x-action="finish-idea" data-id="${e(idea.id)}">Idee übernehmen</button>`:''}
       <button class="button small secondary" data-x-action="remove-idea" data-id="${e(idea.id)}" ${state.ideas.length<=1?'disabled':''}>Idee entfernen</button>
      </div>`:`
       ${idea.pattern?`<div class="idea-ranking-pattern">${tag(idea.pattern,'pink')}${tag(idea.method)}</div><p class="idea-ranking-question"><strong>Ideenbeschreibung:</strong></p>`:''}
       <p>${e(explanation)}</p>
      `}
     </td>${draft?'':`${criteria.map(([key,label])=>`<td>${hasDraft?(idea[key]||'Offen'):key==='risk'?ideaRiskControl(idea,index,idea.name||'Idee '+(rank+1)):ideaCriterionControl(idea,index,key,label,idea.name||'Idee '+(rank+1))}</td>`).join('')}
     <td><span class="score-badge${score>0?' high':''}">${score>0?n(score):'Offen'}</span></td>`}</tr>`;
    }).join('')}</tbody>
   </table>
  </div>
  ${state.ideas.length<5?'<p class="edit-banner">Für die Aufgabe mindestens fünf Ideen ausarbeiten.</p>':''}
  <button class="button small" data-x-action="add-idea" ${state.ideas.length>=8||hasDraft?'disabled':''}>+ Idee hinzufügen</button>
  ${state.ideaManualOrder&&!hasDraft?'<button class="button small secondary" data-x-action="sort-ideas">Nach Score sortieren</button>':''}
 </section>`;
}
function ideaProposals(state,ranked,editing){
 return `<div class="idea-proposals">${ranked.slice(0,2).map((idea,rank)=>{
  const index=state.ideas.indexOf(idea);
  const expanded=!collapsedIdeaDetails.has(idea.id),detailId='idea-proposal-'+index;
  return `<section class="idea-proposal">
   <h3 class="idea-proposal-heading"><button type="button" data-idea-details="${e(idea.id)}" aria-expanded="${expanded}" aria-controls="${detailId}">
    <span class="row-index">${rank+1}</span><span>${e(idea.name)}</span>${tag(idea.pattern,'pink')}<span class="idea-detail-chevron" aria-hidden="true"></span>
   </button></h3>
   <div class="idea-detail-body" id="${detailId}" ${expanded?'':'hidden'}>${topIdea(state,idea,index,editing)}</div>
  </section>`;
 }).join('')}</div>`;
}
export function ideasAnalysis(state,{editing,cite}){
 const weights=state.ideaWeights;
 const ranked=scoredIdeas(state);
 const views={
  patterns:()=>patternOverview(state,cite),
  board:()=>ideaRanking(state,ranked,editing),
  map:()=>opportunityMap(ranked,d=>ideaScore(d,weights),'Opportunity Map',true),
  proposals:()=>ideaProposals(state,ranked,editing)
 };
 return `<section class="maturity-folder ideas-folder">
  <div class="folder-tabs" role="tablist" aria-label="Muster und Ideen">${ideaTabs.map(([id,label])=>`<button type="button" role="tab" id="idea-tab-${id}" data-idea-tab="${id}" aria-selected="${activeIdeaTab===id}" tabindex="${activeIdeaTab===id?0:-1}" aria-controls="idea-folder-content">${label}</button>`).join('')}</div>
  <div class="folder-content" id="idea-folder-content" role="tabpanel" aria-labelledby="idea-tab-${activeIdeaTab}" tabindex="0">${views[activeIdeaTab]()}</div>
 </section>`;
}
const ideaCriterionScales={
 impact:[
  'Kleiner Vorteil für wenige Kunden.',
  'Begrenzter Vorteil in einzelnen Situationen.',
  'Spürbarer Vorteil bei einem konkreten Kundenproblem.',
  'Deutlicher Vorteil für viele Kunden oder bei einem wichtigen Projekt.',
  'Großer Vorteil bei einem häufigen und wichtigen Kundenproblem.'
 ],
 feasibility:[
  'Wichtige Daten, Technik oder Kompetenzen fehlen.',
  'Ein Pilot setzt mehrere wesentliche Vorarbeiten voraus.',
  'Ein Pilot ist mit zusätzlichem Aufwand möglich.',
  'Ein Pilot ist mit kleinen Anpassungen an vorhandenen Mitteln möglich.',
  'Mit vorhandenen Mitteln kurzfristig testbar.'
 ],
 cost:[
  'Mit vorhandenen Mitteln und kleinem Zusatzbudget machbar.',
  'Geringe zusätzliche Kosten für Umsetzung oder Betrieb.',
  'Spürbarer Aufwand für Umsetzung und Betrieb.',
  'Erhebliche Investition oder erhebliche laufende Kosten.',
  'Hohe Investition oder hohe laufende Kosten.'
 ]
};
function ideaCriterionControl(idea,index,key,label,name){
 const id=`idea-criterion-${index}-${key}`;
 return `<button class="idea-risk-trigger" type="button" data-open-idea-criterion="${id}" aria-haspopup="dialog" aria-label="${label} für ${e(name)} bewerten">${idea[key]||'Offen'}</button>
 <dialog id="${id}" class="idea-criterion-dialog" aria-labelledby="${id}-heading">
  <div class="dialog-head"><h2 id="${id}-heading">${label} bewerten · ${e(name)}</h2><form id="${id}-close" method="dialog"><button class="icon-button" aria-label="Schließen">×</button></form></div>
  <form data-idea-criterion-form="${index}" data-criterion-key="${key}" data-saved-level="${idea[key]}">
   <fieldset class="idea-criterion-levels"><legend>Welche Stufe passt zur Idee?</legend>
    ${['Offen',...ideaCriterionScales[key]].map((description,level)=>`<label><input type="radio" name="level" value="${level}" data-idea-criterion-level ${level===idea[key]?'checked':''}><span><strong>${level||'Offen'}</strong>${level?` · ${e(description)}`:''}</span></label>`).join('')}
   </fieldset>
   <label class="edit-field"><span>Kurze Begründung</span><textarea name="reason" maxlength="10000" rows="3" ${idea[key]?'required':''}>${e(idea.criterionReasons[key])}</textarea></label>
   <div class="dialog-actions">
    <button class="button secondary" type="submit" form="${id}-close">Abbrechen</button>
    <button class="button" type="submit">Bewertung übernehmen</button>
   </div>
  </form>
 </dialog>`;
}
function ideaRiskControl(idea,index,label){
 const id=`idea-risk-${index}`;
 const risk=assessedIdeaRisk(idea);
 const missing=idea.checks.filter(check=>!check.level).length;
 const decisive=idea.checks.filter(check=>check.level===risk).map(check=>check.name).join(', ');
 const levels=[[0,'Offen'],[1,'1 · Sehr gering'],[2,'2 · Gering'],[3,'3 · Mittel'],[4,'4 · Hoch'],[5,'5 · Sehr hoch']];
 return `<button class="idea-risk-trigger" type="button" data-open-idea-risk="${id}" aria-haspopup="dialog" aria-label="Risiko für ${e(label)} bewerten">${risk||'Offen'}</button>
 <dialog id="${id}" class="idea-risk-dialog" aria-labelledby="${id}-heading">
  <div class="dialog-head"><h2 id="${id}-heading">Risiko bewerten · ${e(label)}</h2><form id="${id}-close" method="dialog"><button class="icon-button" aria-label="Schließen">×</button></form></div>
  <p class="dialog-intro">Bewerte jeden Prüfpunkt. Die höchste Einzelbewertung bestimmt das Gesamtrisiko.</p>
  <p class="idea-risk-result" aria-live="polite">${risk?`<strong>${risk} / 5</strong> · Ausschlaggebend: ${e(decisive)}`:`<strong>Offen</strong> · Noch ${missing} von ${idea.checks.length} Prüfpunkten offen.`}</p>
  ${!risk&&idea.previousRisk?`<p class="method-caption">Frühere Gesamtbewertung: ${idea.previousRisk} / 5</p>`:''}
  <form data-idea-risk-form="${index}">
   ${idea.checks.map((check,j)=>`<article class="risk-check">
    <label class="analysis-select"><span>${e(check.name)}</span><select name="level-${j}" data-risk-level="${j}" data-saved-level="${check.level}">
     ${levels.map(([value,label])=>`<option value="${value}" ${value===check.level?'selected':''}>${label}</option>`).join('')}
    </select></label>
    <p class="method-caption"><strong>Prüfhinweis:</strong> ${e(check.note)}</p>
    <label class="edit-field"><span>Begründung / Absicherung</span><textarea name="reason-${j}" maxlength="10000" rows="3">${e(check.reason)}</textarea></label>
    <p class="idea-risk-change-note" data-risk-change="${j}" hidden>Begründe die neue Stufe und gib an, wie du das Risiko absichern würdest.</p>
   </article>`).join('')}
   <div class="dialog-actions">
    <button class="button secondary" type="submit" form="${id}-close">Abbrechen</button>
    <button class="button" type="submit">Bewertung übernehmen</button>
   </div>
  </form>
 </dialog>`;
}
function proposalTriangle(state,idea,index,editing){
 const id='proposal-triangle-'+index;
 return `<section class="proposal-triangle" aria-labelledby="${id}-heading">
  <h4 id="${id}-heading" class="idea-comparison-heading">Was ändert sich beim Magischen Dreieck?</h4>
  ${triangleView(state.four,{id,content:(part,i)=>`<div class="proposal-triangle-state">
   <h4 class="proposal-state-current">Ist</h4>
   <p class="editable-text">${e(part.text)}</p>
  </div><div class="proposal-triangle-state">
   <h4 class="proposal-state-target">Neu</h4>
   ${editing?`<textarea aria-label="${e(part.name+' · Neu')}" data-x-text="ideas.${index}.after.${i}.text" rows="3" maxlength="10000">${e(idea.after[i].text)}</textarea>`:`<p class="editable-text">${e(idea.after[i].text)}</p>`}
  </div>`})}
 </section>`;
}
function projectPilot(idea,index,editing){
 return `<section class="proposal-pilot">
  <h4>Entwicklungsvorschlag</h4>
  <ol class="proposal-timeline">${PROJECT_PILOT.map(({id,period,title,owner})=>`<li>
   <span class="proposal-period">${period}</span>
   <h5>${title}</h5>
   <p class="proposal-owner">${owner}</p>
   ${editing?field(`ideas.${index}.pilotTasks.${id}`,'Aufgabe',idea.pilotTasks[id],true):`<p>${e(idea.pilotTasks[id])}</p>`}
  </li>`).join('')}</ol>
 </section>`;
}
function proposalScoreDetails(idea,weights){
 const total=Object.values(weights).reduce((sum,weight)=>sum+weight,0);
 const criteria=[['impact','Nutzen',idea.impact],['feasibility','Machbarkeit',idea.feasibility],['cost','Kosten',6-idea.cost],['risk','Risiko',6-idea.risk]];
 const format=new Intl.NumberFormat('de-DE',{maximumFractionDigits:2});
 return `<div class="proposal-score-details">
  <span>Beiträge zum Score</span>
  <dl>${criteria.map(([key,label,points])=>`<div><dt>${label}</dt><dd>+${format.format(points*weights[key]/total)}</dd></div>`).join('')}</dl>
 </div>`;
}
function topIdea(state,idea,index,editing){
 const isProject=idea.id==='project';
 const path=`ideas.${index}.recommendation`;
 const labels={effect:'Erwartete Wirkung',risks:'Aufwand & Risiken'};
 return `<article class="top-idea">
  <div class="proposal-score-row">
   <div class="delta proposal-score"><strong>${n(ideaScore(idea,state.ideaWeights))}</strong><span>Score</span></div>
   ${proposalScoreDetails(idea,state.ideaWeights)}
  </div>
  ${isProject?projectPilot(idea,index,editing):`${field(path+'.situation','Ausgangslage',idea.recommendation.situation,editing)}<div class="proposal-pilot">${field(path+'.measure','Entwicklungsvorschlag · Zuständigkeit · Zeithorizont',idea.recommendation.measure,editing)}</div>`}
  ${Object.entries(labels).map(([key,label])=>field(path+'.'+key,label,idea.recommendation[key],editing)).join('')}
  <button class="button${isProject?' small':''}" data-x-action="candidate" data-id="${e(idea.id)}">${state.actions.some(a=>a.originId===idea.id)?'Maßnahmenkandidat aktualisieren':'Als Maßnahmenkandidat übernehmen'}</button>
  ${proposalTriangle(state,idea,index,editing)}
 </article>`;
}
export function actionAnalysis(state,{icon}){return section('Wirkung, Aufwand & Risiko',`${opportunityMap(state.actions,d=>(d.impact+(6-d.effort)+(6-d.risk))/3,'Maßnahmen im Vergleich')}<div class="three-col">${['Quick Win','Großes Vorhaben','Bei Gelegenheit','Zurückstellen'].map(q=>`<article class="panel"><h3>${q}</h3><ul>${state.actions.filter(a=>actionQuadrant(a)===q).sort((a,b)=>b.impact-a.impact).map(a=>`<li>${e(a.name)} ${a.risk>=4?tag('Hohes Risiko','pink'):''}</li>`).join('')||'<li>Keine Maßnahme in diesem Bereich.</li>'}</ul></article>`).join('')}</div><p class="method-caption">Quick Win: Wirkung ≥ 4, Aufwand ≤ 2. Große Vorhaben: Wirkung ≥ 4, Aufwand > 2. Die Roadmap bleibt abhängig von Pilotfreigaben und fachlichen Abhängigkeiten.</p>`,icon);}
function moveBoardIdea(state,id,target,{save,render}){
 const ideas=[...boardIdeas(state)];
 const from=ideas.findIndex(idea=>idea.id===id);
 if(from<0||target<0||target>=ideas.length||from===target)return;
 const [idea]=ideas.splice(from,1);
 ideas.splice(target,0,idea);
 state.ideas=ideas;
 state.ideaManualOrder=true;
 save();
 render();
 document.querySelector(`[data-idea-row="${CSS.escape(id)}"]`)?.focus({preventScroll:true});
}
function positionIdeaPreview(preview,x,y){
 preview.style.left=`${Math.min(x+12,Math.max(4,document.documentElement.clientWidth-preview.offsetWidth-4))}px`;
 preview.style.top=`${Math.min(y+12,Math.max(4,document.documentElement.clientHeight-preview.offsetHeight-4))}px`;
}
function showIdeaPreview(press){
 const preview=document.createElement('table');
 preview.className='matrix idea-ranking-table idea-drag-preview';
 preview.setAttribute('aria-hidden','true');
 preview.inert=true;
 preview.style.width=`${press.row.getBoundingClientRect().width}px`;
 const row=press.row.cloneNode(true);
 [...row.cells].forEach((cell,index)=>{cell.style.width=`${press.row.cells[index].getBoundingClientRect().width}px`;});
 preview.createTBody().append(row);
 document.body.append(preview);
 positionIdeaPreview(preview,press.x,press.y);
 return preview;
}
export function handleAnalysisEvent(event,state,{save,render,toast,startEditing=()=>{}}){
 const el=event.target;
 if(event.type==='change'&&el.name==='basis'&&el.form?.dataset.benchmarkRating){
  syncBenchmarkBasis(el.form);
  return;
 }
 if(event.type==='submit'&&el.dataset.benchmarkRating){
  if(event.submitter?.formMethod==='dialog')return;
  event.preventDefault();
  const [,groupId,criterionId,providerId]=el.dataset.benchmarkRating.split('.');
  const rating=state.benchmarkManual[groupId]?.[criterionId]?.[providerId];
  const level=Number(el.elements.namedItem('level').value);
  const source=el.elements.namedItem('source');
  const estimated=el.elements.namedItem('basis').value==='estimate';
  const sourceUrl=estimated?'':source.value.trim();
  if(!rating||![1,2,3,4].includes(level))return;
  if(!estimated&&!/^https?:\/\//i.test(sourceUrl)){
   toast('Bitte eine vollständige http- oder https-URL eingeben.');
   source.focus();
   return;
  }
  const reasonField=el.elements.namedItem('reason');
  const reason=estimated?reasonField.value.trim():'';
  if(estimated&&!reason){
   toast('Bitte begründe die Schätzung.');
   reasonField.focus();
   return;
  }
  Object.assign(rating,{value:level,sourceUrl,estimated,reason});
  save();
  render();
  document.querySelector(`[data-benchmark-dialog="${el.dataset.dialogId}"]`)?.focus({preventScroll:true});
  return;
 }
 if(event.type==='pointerdown'){
  suppressIdeaClick=false;
  const row=el.closest('[data-idea-row]');
  if(event.button!==0||event.pointerType!=='mouse'||!row||el.closest('input, select, textarea, a'))return;
  const press={row,pointerId:event.pointerId,x:event.clientX,y:event.clientY,timer:null,preview:null,moved:false};
  press.timer=setTimeout(()=>{
   if(!row.isConnected)return;
   press.preview=showIdeaPreview(press);
   row.classList.add('is-dragging');
  },350);
  ideaPress=press;
  return;
 }
 if(['pointermove','pointerup','pointercancel'].includes(event.type)){
  const press=ideaPress;
  if(!press||event.pointerId!==press.pointerId)return;
  if(event.type==='pointermove'&&event.buttons===1&&press.preview){
   positionIdeaPreview(press.preview,event.clientX,event.clientY);
   const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-idea-row]');
   if(!target||target===press.row||target.parentElement!==press.row.parentElement)return;
   const bounds=target.getBoundingClientRect();
   const movingDown=Boolean(press.row.compareDocumentPosition(target)&Node.DOCUMENT_POSITION_FOLLOWING);
   if(movingDown!==(event.clientY>=bounds.top+bounds.height/2))return;
   const insertionPoint=movingDown?target.nextElementSibling:target;
   press.row.parentElement.insertBefore(press.row,insertionPoint);
   press.moved=true;
   return;
  }
  if(event.type==='pointermove'&&event.buttons===1&&Math.hypot(event.clientX-press.x,event.clientY-press.y)<6)return;
  clearTimeout(press.timer);
  ideaPress=null;
  press.row.classList.remove('is-dragging');
  press.preview?.remove();
  if(event.type==='pointerup'&&press.preview){
   suppressIdeaClick=true;
   if(press.moved){
    const rows=[...press.row.parentElement.querySelectorAll('[data-idea-row]')];
    moveBoardIdea(state,press.row.dataset.ideaRow,rows.indexOf(press.row),{save,render});
   }
  }else if(press.moved)render();
  return;
 }
 if(event.type==='keydown'&&el.dataset?.ideaRow&&['ArrowUp','ArrowDown'].includes(event.key)){
  event.preventDefault();
  const id=el.dataset.ideaRow;
  const index=boardIdeas(state).findIndex(idea=>idea.id===id);
  moveBoardIdea(state,id,index+(event.key==='ArrowUp'?-1:1),{save,render});
  return;
 }
 if(event.type==='click'&&suppressIdeaClick&&event.detail>0){
  suppressIdeaClick=false;
  if(el.closest('[data-idea-row]'))return;
 }

 if(event.type==='click'){
  const criterionButton=el.closest('[data-open-idea-criterion]');
  if(criterionButton?.dataset.openIdeaCriterion){
   const dialog=document.getElementById(criterionButton.dataset.openIdeaCriterion);
   const form=dialog?.querySelector('[data-idea-criterion-form]');
   if(form){
    form.reset();
    form.elements.namedItem('reason').required=form.dataset.savedLevel!=='0';
   }
   dialog?.showModal();
   return;
  }
  const riskButton=el.closest('[data-open-idea-risk]');
  if(riskButton?.dataset.openIdeaRisk){
   const dialog=document.getElementById(riskButton.dataset.openIdeaRisk);
   const form=dialog?.querySelector('[data-idea-risk-form]');
   if(form){
    form.reset();
    form.querySelectorAll('textarea').forEach(input=>{input.required=false;});
    form.querySelectorAll('[data-risk-change]').forEach(note=>{note.hidden=true;});
   }
   dialog?.showModal();
   return;
  }
  const trigger=el.closest('[data-benchmark-dialog]');
  if(trigger?.dataset.benchmarkDialog){
   const dialog=document.getElementById(trigger.dataset.benchmarkDialog);
   const form=dialog?.querySelector('[data-benchmark-rating]');
   if(form){
    form.reset();
    syncBenchmarkBasis(form);
   }
   dialog?.showModal();
   return;
  }
 }
 if(event.type==='click'){
  const detailButton=el.closest('[data-idea-details]');
  if(detailButton?.dataset.ideaDetails){
   const id=detailButton.dataset.ideaDetails;
   const expanded=collapsedIdeaDetails.delete(id);
   if(!expanded)collapsedIdeaDetails.add(id);
   detailButton.setAttribute('aria-expanded',String(expanded));
   const details=document.getElementById(detailButton.getAttribute('aria-controls'));
   if(details)details.hidden=!expanded;
   return;
  }
  const filter=el.closest('[data-pattern-filter]')?.dataset.patternFilter;
  if(filter){
   if(filter==='all')activePatternFilters.clear();
   else if(activePatternFilters.has(filter))activePatternFilters.delete(filter);
   else activePatternFilters.add(filter);
   render();
   document.getElementById('pattern-filter-'+filter)?.focus({preventScroll:true});
   return;
  }
 }
 if(event.type==='pointerover'||event.type==='focusin'){
  const tile=el.closest('.pattern-tile');
  if(!tile||tile.contains(event.relatedTarget))return;
  const card=tile.parentElement;
  if(!card.matches('.pattern-current, .pattern-target'))return;
  const rect=card.getBoundingClientRect();
  const viewportWidth=document.documentElement.clientWidth;
  const width=Math.min(320,viewportWidth-24);
  const center=rect.left+rect.width/2;
  const left=Math.max(12,Math.min(center-width/2,viewportWidth-width-12));
  card.style.setProperty('--preview-left',`${left-rect.left}px`);
  card.style.setProperty('--preview-tail',`${center-left-6}px`);
  return;
 }
 if(event.type==='submit'&&el.dataset.patternTarget){
  event.preventDefault();
  const id=el.dataset.patternTarget;
  let record=state.patterns.find(p=>p.id===id);
  const catalogEntry=PATTERN_CATALOG.find(([,key])=>key===id);
  if(!record&&!catalogEntry)return;
  const reason=el.elements.reason.value.trim();
  const removing=event.submitter?.value==='remove';
  if(!removing&&!reason){toast('Bitte begründe, warum sich der Ausbau lohnt.');el.elements.reason.focus();return;}
  if(!record){
   const baseline=PATTERNS.find(p=>p.id===id);
   record=baseline?{...baseline}:patternRecord(id,catalogEntry[2]);
   state.patterns.push(record);
  }
  if(removing&&record.status==='Ausbauidee'){
   Object.assign(record,{status:'Annahme',evidence:'',source:'',pages:''});
  }
  record.targetEvidence=removing?'':reason;
  record.targetReference=removing?'':el.elements.reference.value.trim();
  save();
  render();
  const card=document.querySelector(`[data-pattern-id="${CSS.escape(id)}"]`);
  if(card){
   card.querySelector('.pattern-tile').focus({preventScroll:true});
   card.querySelector('.pattern-preview').showPopover();
  }else{
   document.getElementById('pattern-filter-target')?.focus({preventScroll:true});
  }
  return;
 }
 if(event.type==='input'&&el.hasAttribute?.('data-rating-source')){if(pendingRating)pendingRating.source=el.value;return;}
 if(event.type==='input'&&el.hasAttribute?.('data-rating-reason')){if(pendingRating)pendingRating.reason=el.value;return;}
 if(event.type==='click'&&el.closest('[data-cancel-rating]')){pendingRating=null;render();return;}
 if(event.type==='click'&&el.closest('[data-save-rating]')){
  if(!pendingRating)return;
  if(!pendingRating.reason.trim()){toast('Bitte begründe zuerst die Änderung.');document.querySelector('[data-rating-reason]')?.focus();return;}
  const match=pendingRating.path.match(/^model\.(\d+)\.criteria\.(\d+)\.(current|target)$/);
  const c=state.model[Number(match[1])].criteria[Number(match[2])],key=match[3];
  const before=pendingRating.previous===null?'Offen':'Stufe '+pendingRating.previous,after=pendingRating.value===null?'Offen':'Stufe '+pendingRating.value;
  c[key]=pendingRating.value;
  c[key==='current'?'evidence':'targetEvidence']=`Eigene Neubewertung (${before} → ${after}): ${pendingRating.reason.trim()}`;
  c[key==='current'?'currentReference':'targetReference']=(pendingRating.source||'').trim();
  if(key==='current'){c.source='';c.pages='';c.reference='';}
  c.assumption=true;
  pendingRating=null;stageBubble=null;save();render();toast('Für diese Sitzung übernommen. Zum Sichern exportieren.');return;
 }
 if(event.type==='change'&&/^model\.\d+\.criteria\.\d+\.(current|target)$/.test(el.dataset.xValue||'')){
  const path=el.dataset.xValue,keys=path.split('.'),key=keys.pop(),c=keys.reduce((o,k)=>o[k],state),value=el.value===''?null:Number(el.value);
  if(value!==null&&(!Number.isInteger(value)||value<1||value>4)){render();return;}
  if(value===c[key]){pendingRating=null;render();return;}
  pendingRating={path,value,previous:c[key],reason:pendingRating?.path===path?pendingRating.reason:'',source:pendingRating?.path===path?pendingRating.source:''};
  stageBubble=null;render();document.querySelector('[data-rating-reason]')?.focus();return;
 }
 const ideaTab=el.closest('[data-idea-tab]');
 if(ideaTab?.dataset.ideaTab&&(event.type==='click'||event.type==='keydown')){
  let next=ideaTabs.findIndex(([id])=>id===ideaTab.dataset.ideaTab);
  if(event.type==='keydown'){
   switch(event.key){
    case 'ArrowLeft': next=(next+ideaTabs.length-1)%ideaTabs.length; break;
    case 'ArrowRight': next=(next+1)%ideaTabs.length; break;
    case 'Home': next=0; break;
    case 'End': next=ideaTabs.length-1; break;
    default: return;
   }
   event.preventDefault();
  }
  activeIdeaTab=ideaTabs[next][0];
  render();
  document.getElementById('idea-tab-'+activeIdeaTab)?.focus({preventScroll:true});
  return;
 }
 const folderTab=el.closest('[data-model-tab]');
 if(event.type==='click'&&folderTab){
  pendingRating=null;
  activeModel=folderTab.dataset.modelTab==='overview'?null:folderTab.dataset.modelTab;
  stageBubble=null;
  const group=state.model.find(g=>g.id===activeModel);
  if(group)selectedCriteria[group.id]=group.criteria[0].id;
  render();document.querySelector(`[data-model-tab="${folderTab.dataset.modelTab}"]`)?.focus({preventScroll:true});return;
 }
 const stage=el.closest('[data-stage-group]');
 if(event.type==='click'&&stage){
  const criterion=state.model.find(g=>g.id===stage.dataset.stageGroup)?.criteria.find(c=>c.id===stage.dataset.stageId);
  if(!criterion||criterion[stage.dataset.stageKey]!==Number(stage.dataset.stageLevel))return;
  stageBubble={group:stage.dataset.stageGroup,id:stage.dataset.stageId,key:stage.dataset.stageKey,level:Number(stage.dataset.stageLevel)};
  render();document.querySelector('.stage-bubble')?.scrollIntoView({behavior:'smooth',block:'nearest'});return;
 }
 if(event.type==='click'&&el.closest('[data-close-bubble]')){stageBubble=null;render();return;}
 const closeButton=el.closest('[data-close-criterion]');
 if(event.type==='click'&&closeButton){
  pendingRating=null;
  const groupId=closeButton.dataset.closeCriterion;
  const previousCriterion=selectedCriteria[groupId];
  selectedCriteria[groupId]=null;
  render();
  document.querySelector(`[data-group-id="${groupId}"][data-criterion-id="${previousCriterion}"]`)?.focus();
  return;
 }
 const chartChoice=el.closest('[data-criterion-id]');
 if(chartChoice&&(event.type==='click'||(event.type==='keydown'&&['Enter',' '].includes(event.key)))){
  event.preventDefault();
  const groupId=chartChoice.dataset.groupId||'product';
  activeModel=groupId;stageBubble=null;pendingRating=null;
  selectedCriteria[groupId]=chartChoice.dataset.criterionId;
  render();
  const heading=document.querySelector(`[data-selected-group="${groupId}"] .selected-criterion-heading > h3`);
  heading?.focus({preventScroll:true});
  const topbarHeight=document.querySelector('.topbar')?.getBoundingClientRect().height||0;
  if(heading&&window.innerWidth<1000)window.scrollTo({top:window.scrollY+heading.getBoundingClientRect().top-topbarHeight-24,behavior:'smooth'});
  return;
 }
 const overviewButton=el.closest('[data-overview-group]');
 if(overviewButton&&(event.type==='click'||(event.type==='keydown'&&['Enter',' '].includes(event.key)))){
  event.preventDefault();
  activeOverviewGroup=overviewButton.dataset.overviewGroup;
  render();
  document.querySelector(`[data-overview-group="${activeOverviewGroup}"]`)?.focus({preventScroll:true});
  return;
 }
 const set=(path,value)=>{const keys=path.split('.'),key=keys.pop();keys.reduce((o,k)=>o[k],state)[key]=value;};
 if(event.type==='input'&&el.dataset.xText){
  const path=el.dataset.xText;
  set(path,el.value);
  const description=path.match(/^ideas\.(\d+)\.description$/);
  if(description)state.ideas[Number(description[1])].transfer='';
  save();
  return;
 }
 if(event.type==='change'&&el.dataset.xText){if(el.dataset.xText.endsWith('.name')&&!/^ideas\.\d+\.name$/.test(el.dataset.xText)&&!el.value.trim()){set(el.dataset.xText,'Eigener Entwurf');el.value='Eigener Entwurf';toast('Ein Name ist erforderlich.');save();}if(el.dataset.xText.endsWith('.sourceUrl')&&el.value&&!/^https?:\/\//i.test(el.value)){set(el.dataset.xText,'');el.value='';save();toast('Bitte eine vollständige http- oder https-URL eingeben.');}return;}
 if(event.type==='change'&&el.dataset.xWeight){const v=Number(el.value),next={...state.ideaWeights,[el.dataset.xWeight]:v};if(el.value===''||!Number.isFinite(v)||v<0||v>100||Object.values(next).every(v=>v===0)){toast('Gewicht 0–100; mindestens ein Gewicht muss positiv sein.');render();return;}const before=scoredIdeas(state);state.ideaWeights=next;save();render();notifyIdeaRanking(state,before,null,toast);return;}
 if(event.type==='change'&&el.dataset?.ideaCriterionLevel!==undefined){
  const reason=el.form.elements.namedItem('reason');
  reason.value=el.value===el.form.dataset.savedLevel?reason.defaultValue:'';
  reason.required=el.value!=='0';
  return;
 }
 if(event.type==='submit'&&el.dataset?.ideaCriterionForm!==undefined){
  event.preventDefault();
  const index=Number(el.dataset.ideaCriterionForm);
  const key=el.dataset.criterionKey;
  const idea=state.ideas[index];
  const level=Number(el.elements.namedItem('level').value);
  if(!idea||!Object.hasOwn(ideaCriterionScales,key)||!Number.isInteger(level)||level<0||level>5)return;
  const input=el.elements.namedItem('reason');
  const reason=input.value.trim();
  if(level>0&&!reason){
   toast('Bitte begründe die gewählte Stufe.');
   input.focus();
   return;
  }
  const before=scoredIdeas(state);
  idea[key]=level;
  idea.criterionReasons[key]=level?reason:'';
  save();
  render();
  document.querySelector(`[data-open-idea-criterion="idea-criterion-${index}-${key}"]`)?.focus({preventScroll:true});
  notifyIdeaRanking(state,before,idea,toast);
  return;
 }
 if(event.type==='change'&&el.dataset?.riskLevel!==undefined){
  const index=el.dataset.riskLevel;
  const reason=el.form.elements.namedItem('reason-'+index);
  const changed=el.value!==el.dataset.savedLevel;
  const needsReason=changed&&el.value!=='0';
  reason.value=changed?'':reason.defaultValue;
  reason.required=needsReason;
  el.form.querySelector(`[data-risk-change="${index}"]`).hidden=!needsReason;
  return;
 }
 if(event.type==='submit'&&el.dataset?.ideaRiskForm!==undefined){
  event.preventDefault();
  const index=Number(el.dataset.ideaRiskForm);
  const idea=state.ideas[index];
  if(!idea)return;
  const checks=idea.checks.map((check,j)=>({
   ...check,level:Number(el.elements.namedItem('level-'+j).value),
   reason:el.elements.namedItem('reason-'+j).value.trim()
  }));
  if(checks.some(check=>!Number.isInteger(check.level)||check.level<0||check.level>5))return;
  const missing=checks.findIndex((check,j)=>check.level>0&&check.level!==idea.checks[j].level&&!check.reason);
  if(missing>=0){
   toast('Bitte begründe die geänderte Risikostufe.');
   el.elements.namedItem('reason-'+missing).focus();
   return;
  }
  const risk=assessedIdeaRisk({checks});
  const before=scoredIdeas(state);
  idea.checks=checks;
  idea.risk=risk;
  save();
  render();
  document.querySelector(`[data-open-idea-risk="idea-risk-${index}"]`)?.focus({preventScroll:true});
  notifyIdeaRanking(state,before,idea,toast);
  return;
 }
 if(event.type==='change'&&/^ideas\.\d+\.pattern$/.test(el.dataset?.xValue||'')&&!navigatorPatternName(el.value)){
  const index=Number(el.dataset.xValue.split('.')[1]);
  if(state.ideas[index]?.id!==newIdeaId||el.value){
   toast('Bitte wähle ein gültiges Navigator-Muster.');
   render();
   return;
  }
 }
 if(event.type==='change'&&el.dataset.xValue){const p=el.dataset.xValue;let v=el.value;if(p.endsWith('.current')||p.endsWith('.target')||p.endsWith('.value'))v=v===''?null:Number(v);else if(p.endsWith('.assumption'))v=v==='true';else if(/^ideas\.\d+\.(impact|feasibility|cost)$/.test(p))v=Number(v);set(p,v);save();render();[...document.querySelectorAll('[data-x-value]')].find(node=>node.dataset.xValue===p)?.focus();return;}
 if(event.type!=='click')return;
 const button=el.closest('[data-x-action]');if(!button)return;const action=button.dataset.xAction,id=button.dataset.id;
 if(action==='add-idea'){
  if(state.ideas.length>=8||state.ideas.some(idea=>idea.id===newIdeaId))return;
  const idea={...ideaTemplate('idea-'+crypto.randomUUID(),''),description:'',transfer:'',method:'',impact:0,feasibility:0,cost:0,risk:0,effort:0};
  state.ideas.push(idea);
  newIdeaId=idea.id;
 }
 if(action==='finish-idea'){
  const index=state.ideas.findIndex(idea=>idea.id===id);
  if(id!==newIdeaId||index<0)return;
  const idea=state.ideas[index];
  const required=[['name','Ideenname'],['pattern','Navigator-Muster'],['method','Methode'],['description','Ideenbeschreibung']];
  const missing=required.find(([key])=>key==='pattern'?!navigatorPatternName(idea.pattern):!idea[key].trim());
  if(missing){
   const [key,label]=missing;
   toast(key==='pattern'?'Bitte wähle ein gültiges Navigator-Muster.':`Bitte fülle das Feld „${label}“ aus.`);
   const attribute=key==='method'||key==='pattern'?'data-x-value':'data-x-text';
   document.querySelector(`[${attribute}="ideas.${index}.${key}"]`)?.focus();
   return;
  }
  idea.pattern=navigatorPatternName(idea.pattern);
  newIdeaId=null;
 }
 if(action==='sort-ideas')state.ideaManualOrder=false;
 if(action==='remove-idea'){
  if(state.ideas.length<=1)return;
  if(id===newIdeaId)newIdeaId=null;
  collapsedIdeaDetails.delete(id);
  state.ideas=state.ideas.filter(d=>d.id!==id);
 }
 if(action==='remove-candidate'&&state.actions.length>1)state.actions=state.actions.filter(a=>a.id!==id||!a.originId);
 if(action==='benchmark-measure'){
  const group=state.model.find(item=>item.id===id);
  const [gap]=group?modelGaps([group]):[];
  if(!gap)return;
  const originId='benchmark-'+group.id+'-'+gap.id;
  if(state.actions.some(item=>item.originId===originId)){toast('Diese Maßnahme ist bereits in Zielmodell & Maßnahmen vorhanden.');return;}
  if(state.actions.length>=40){toast('Höchstens 40 Maßnahmen möglich.');return;}
  state.actions.push({
   id:originId,originId,name:'Pilot: '+gap.name,owner:'Fachbereich / Digital Commerce',phase:'0–3 Monate',status:'Geplant',
   impact:3,effort:3,risk:3,
   deliverable:gap.targetEvidence||gap.levels[gap.target-1],
   gate:'Zielstufe im Pilot anhand eines dokumentierten Praxisbeispiels prüfen.',
   depends:'Pilotfreigabe und Ausgangsmessung',
   situation:`${group.name} · Ist ${n(gap.current)} → Soll ${n(gap.target)}`,
   rationale:'Aus der größten dokumentierten Entwicklungslücke abgeleitet. Die vorläufige Wettbewerbssicht dient der Einordnung.',
   reference:MODEL_SOURCE,
   effect:'Zielstufe erreichen und Kundennutzen im Pilot messen.',
   risks:'Datenverfügbarkeit, Aufwand und Akzeptanz vor Pilotstart prüfen.'
  });
  toast('Maßnahme in Zielmodell & Maßnahmen übernommen.');
 }
 if(state.actions.length>=40&&action==='candidate'&&!state.actions.some(a=>a.originId===id)){toast('Höchstens 40 Maßnahmen möglich.');return;}
 if(action==='candidate'){const d=state.ideas.find(d=>d.id===id),candidate=candidateFromIdea(d),old=state.actions.find(a=>a.originId===id);if(old){const status=old.status;Object.assign(old,candidate,{status});}else state.actions.push(candidate);toast('Maßnahmenkandidat in Maßnahmen & Roadmap übernommen.');}
 save();render();
 if(action==='add-idea')document.querySelector(`[data-x-text="ideas.${state.ideas.length-1}.name"]`)?.focus();
}
