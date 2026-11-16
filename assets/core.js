import {ideaTemplate} from './analysis-data.js';
import {DEFAULT_STATE} from './data.js';
export const clone = value => JSON.parse(JSON.stringify(value));
export const clamp = (value,min=1,max=5) => Math.max(min,Math.min(max,Number(value)));
export function priorityScore(item, weights) {
 const total=weights.impact+weights.effort+weights.risk;
 return total ? (item.impact*weights.impact+(6-item.effort)*weights.effort+(6-item.risk)*weights.risk)/total : 0;
}
export function ranked(items,weights){return [...items].sort((a,b)=>priorityScore(b,weights)-priorityScore(a,weights));}
export function maturityMean(items,field='current'){return items.reduce((sum,d)=>sum+d[field],0)/items.length;}
export function economics(a){
 const orders=a.projects*a.conversion/100;
 const revenue=orders*a.basket;
 const serviceRevenue=orders*a.fee;
 const contribution=revenue*a.margin/100+serviceRevenue-a.cost;
 return {orders,revenue,serviceRevenue,contribution};
}
// Import only known fields into a fresh schema. Text remains plain text at rendering time.
export function ideaScore(item,weights){
 const total=Object.values(weights).reduce((a,b)=>a+b,0);
 return total?(item.impact*weights.impact+item.feasibility*weights.feasibility+(6-item.cost)*weights.cost+(6-item.risk)*weights.risk)/total:0;
}
export function rankedIdeas(state){return [...state.ideas].sort((a,b)=>ideaScore(b,state.ideaWeights)-ideaScore(a,state.ideaWeights));}
export function modelMean(criteria,field='current'){const known=criteria.filter(c=>c[field]!==null);return known.length?known.reduce((sum,c)=>sum+c[field],0)/known.length:null;}
export function modelGaps(model){return model.flatMap(g=>g.criteria.filter(c=>c.current!==null&&c.target!==null).map(c=>({...c,group:g.name,gap:c.target-c.current}))).filter(c=>c.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,3);}
export function actionQuadrant(item){return item.impact>=4?(item.effort<=2?'Quick Win':'Großes Vorhaben'):(item.effort<=2?'Bei Gelegenheit':'Zurückstellen');}
export function candidateFromIdea(idea){return {id:'idea-'+idea.id,name:idea.name,owner:'Digital Commerce / CX',phase:'0–3 Monate',status:'Geplant',impact:idea.impact,effort:idea.cost,risk:idea.risk,deliverable:idea.recommendation.measure,gate:idea.experiment.success,depends:'Pilotfreigabe und Datenprüfung',originId:idea.id,situation:idea.recommendation.situation,rationale:idea.recommendation.rationale,reference:idea.recommendation.reference,effect:idea.recommendation.effect,risks:idea.recommendation.risks};}
export function validateState(value){
 if(!value || value.schemaVersion!==1)throw new Error('Nicht unterstütztes Dateiformat. Erwartet wird schemaVersion 1.');
 const result=clone(DEFAULT_STATE), variable=new Set(['ideas','actions','patterns','canvasChanges']);
 const nullable=new Set(['current','target','value']);
 function merge(target,input,path='Analyse'){
  if(!input||typeof input!=='object'||Array.isArray(input))throw new Error(path+': Objekt erwartet.');
  for(const key of Object.keys(target)){
   if(!Object.hasOwn(input,key))continue;
   const expected=target[key],got=input[key],at=path+'.'+key;
   if(Array.isArray(expected)){
    if(!Array.isArray(got))throw new Error(at+': Liste erwartet.');
    if(key==='maturity'){
     if(got.length<3||got.length>10)throw new Error('Das freie Netzdiagramm benötigt 3 bis 10 Dimensionen.');
     target[key]=got.map(d=>{const next={id:'',name:'Dimension',current:1,target:1,evidence:'Eigene Annahme',source:'',pages:''};merge(next,d,at);return next;});
    }else if(variable.has(key)){
     const max=key==='ideas'?8:key==='actions'?40:key==='patterns'?55:9;
     if(!got.length||got.length>max)throw new Error(at+': unerwartete Anzahl an Einträgen.');
     target[key]=got.map(d=>{const template=key==='ideas'?clone(DEFAULT_STATE.ideas.find(v=>v.id===d?.id)??ideaTemplate()):key==='actions'?{...clone(DEFAULT_STATE.actions[0]),originId:'',situation:'Eigener Maßnahmenvorschlag.',rationale:'Herleitung ergänzen.',reference:'Quelle ergänzen.',effect:'Wirkung im Pilot prüfen.',risks:'Aufwand und Risiken prüfen.'}:key==='patterns'?clone(DEFAULT_STATE.patterns[0]):{id:'value',text:''};merge(template,d,at);return template;});
    }else{
     if(got.length!==expected.length)throw new Error(at+': unerwartete Anzahl an Einträgen.');
     target[key]=expected.map((d,i)=>{if(typeof d==='string'){if(typeof got[i]!=='string'||got[i].length>10000)throw new Error(at+': ungültiger Text.');return got[i];}const next=clone(d);merge(next,got[i],at);return next;});
    }
   }else if(expected===null){
    if(got!==null&&(typeof got!=='number'||!Number.isInteger(got)||got<1||got> (path.includes('readiness')?5:4)))throw new Error(at+': ungültige Stufe.');
    target[key]=got;
   }else if(typeof expected==='object')merge(expected,got,at);
   else if(typeof expected==='string'){
    if(typeof got!=='string'||got.length>10000)throw new Error(at+': ungültiger Text.');target[key]=got;
   }else if(typeof expected==='boolean'){
    if(typeof got!=='boolean')throw new Error(at+': Wahrheitswert erwartet.');target[key]=got;
   }else if(typeof expected==='number'){
    if(got===null&&nullable.has(key)&&!at.includes('.maturity.'))target[key]=null;
    else {if(typeof got!=='number'||!Number.isFinite(got))throw new Error(at+': gültige Zahl erwartet.');target[key]=got;}
   }
  }
 }
 merge(result,value);
 // Additive migration: retain user edits and append the newly introduced proposals once.
 if(!Object.hasOwn(value,'analysisRevision')){for(const d of DEFAULT_STATE.ideas.slice(3))if(result.ideas.length<8&&!result.ideas.some(i=>i.id===d.id))result.ideas.push(clone(d));}
 if(result.analysisRevision!==1)throw new Error('Nicht unterstützte Analyseversion.');
 // Old exports keep their texts and scores; missing fields receive defaults.
 for(const idea of result.ideas){const old=value.ideas?.find(d=>d.id===idea.id);if(old&&!Object.hasOwn(old,'cost'))idea.cost=old.effort;}
 const ids=list=>{const seen=new Set();for(const d of list){if(!d.id||d.id.length>100||seen.has(d.id))throw new Error('Einträge benötigen eindeutige IDs.');seen.add(d.id);}};
 for(const list of [result.maturity,result.ideas,result.actions,result.patterns])ids(list);
 for(const d of result.maturity){if(!d.name.trim()||d.name.length>40||d.current<1||d.current>5||d.target<1||d.target>5)throw new Error('Ungültige freie Reifegraddimension.');}
 for(const weights of [result.weights,result.ideaWeights]){if(Object.values(weights).some(n=>n<0||n>100)||!Object.values(weights).some(n=>n>0))throw new Error('Gewichte müssen zwischen 0 und 100 liegen, mindestens eines größer als 0.');}
 for(const group of ['ideas','ai','actions'])for(const d of result[group]){
  for(const key of group==='ideas'?['impact','effort','risk','feasibility','cost']:['impact','effort','risk'])if(!Number.isInteger(d[key])||d[key]<1||d[key]>5)throw new Error('Bewertungen müssen zwischen 1 und 5 liegen.');
  if(!d.name.trim())throw new Error('Ein Name ist erforderlich.');
 }
 const validLevel=(v,max)=>v===null||(Number.isInteger(v)&&v>=1&&v<=max);
 for(const [gi,g] of result.model.entries()){if(g.id!==DEFAULT_STATE.model[gi].id||g.criteria.some((c,i)=>c.id!==DEFAULT_STATE.model[gi].criteria[i].id))throw new Error('Modellkriterien dürfen nicht ausgetauscht werden.');ids(g.criteria);for(const c of g.criteria){if(!validLevel(c.current,4)||!validLevel(c.target,4))throw new Error('Modellstufen müssen zwischen 1 und 4 liegen.');if(c.source&&!Object.hasOwn(SOURCE_KEYS,c.source))throw new Error('Unbekannte Belegquelle.');}}
 for(const r of result.readiness)if(!validLevel(r.current,5)||!validLevel(r.target,5))throw new Error('Zusatzreife muss zwischen 1 und 5 liegen.');
 for(const b of result.benchmark){if(b.ratings.some((r,i)=>r.id!==DEFAULT_STATE.benchmark[0].ratings[i].id))throw new Error('Ungültiges Vergleichskriterium.');for(const r of b.ratings)if(!validLevel(r.value,4))throw new Error('Ungültige Vergleichsstufe.');if(b.sourceUrl&&!/^https?:\/\//i.test(b.sourceUrl))throw new Error('Quellen-URL muss mit https:// oder http:// beginnen.');}
 for(const idea of result.ideas){if(idea.after.some((f,i)=>f.id!==DEFAULT_STATE.four[i].id))throw new Error('Ungültige Geschäftsmodelldimension.');ids(idea.canvasChanges);if(!result.ai.some(a=>a.id===idea.aiId))throw new Error('Unbekannte KI-Anwendung.');if(!['Ähnlichkeitsprinzip','Konfrontationsprinzip'].includes(idea.method))throw new Error('Ungültige Methode.');for(const c of idea.checks)if(!['Offen','Grün','Gelb','Rot'].includes(c.status))throw new Error('Ungültiger Risikostatus.');if(!['Offen','Weiter','Ändern','Stoppen'].includes(idea.experiment.decision))throw new Error('Ungültige Experimententscheidung.');for(const c of idea.canvasChanges)if(!result.canvas.some(f=>f.id===c.id))throw new Error('Ungültiges Canvas-Feld.');}
 for(const n of Object.values(result.revenueAssumptions))if(n<0||n>1e9)throw new Error('Ungültige Erlösannahme.');
 if(result.revenueAssumptions.margin>100||result.revenueAssumptions.conversion>100)throw new Error('Prozentwerte dürfen 100 nicht überschreiten.');
 for(const p of result.patterns)if(!['Bestehend','Annahme','Ausbauidee'].includes(p.status))throw new Error('Ungültiger Musterstatus.');
 for(const a of result.actions)if(!['Geplant','In Arbeit','Abgeschlossen'].includes(a.status)||!['0–3 Monate','3–6 Monate','6–12 Monate'].includes(a.phase))throw new Error('Ungültiger Maßnahmenstatus oder Zeitraum.');
 return result;
}
const SOURCE_KEYS={gb26:1,gb25:1,h127:1,task:1,methods:1,patterns:1};
export function reorderDimension(items,id,index){
 const result=[...items],from=result.findIndex(item=>item.id===id);
 if(from<0)return result;
 const [item]=result.splice(from,1);
 result.splice(Math.max(0,Math.min(result.length,index)),0,item);
 return result;
}

// A draft leaves the saved order untouched until pointerup. Using the initial
// order for every move also prevents neighboring axes from swapping repeatedly.
export function previewRadarDrag(items,id,startPointer,labelOrigin,pointer){
 const position={x:labelOrigin.x+pointer.x-startPointer.x,y:labelOrigin.y+pointer.y-startPointer.y};
 const angle=(Math.atan2(position.y-245,position.x-330)+Math.PI/2+2*Math.PI)%(2*Math.PI);
 const index=Math.round(angle/(2*Math.PI/items.length))%items.length;
 return {items:reorderDimension(items,id,index),index,position};
}
