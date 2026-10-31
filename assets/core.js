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
export function validateState(value){
 if(!value || value.schemaVersion!==1) throw new Error('Nicht unterstütztes Dateiformat. Erwartet wird eine Analyse mit schemaVersion 1.');
 const result=clone(DEFAULT_STATE);
 function merge(target,input,path='Analyse'){
  if(!input || typeof input!=='object' || Array.isArray(input)) throw new Error(`${path}: ungültiges Objekt.`);
  for(const key of Object.keys(target)){
   if(!Object.hasOwn(input,key))continue;
   const expected=target[key], got=input[key], at=`${path}.${key}`;
   if(Array.isArray(expected)){
    if(!Array.isArray(got)) throw new Error(`${at}: Liste erwartet.`);
    if(key==='maturity'){
     if(got.length<3||got.length>10) throw new Error('Das Netzdiagramm benötigt 3 bis 10 Dimensionen.');
     const seen=new Set();
     target[key]=got.map(d=>{
      if(!d||typeof d.id!=='string'||!d.id||d.id.length>100||seen.has(d.id))throw new Error('Dimensionen benötigen eindeutige IDs.');
      seen.add(d.id);
      const base={id:d.id,name:'Dimension',current:1,target:1,evidence:'Eigene Annahme',source:'gb26',pages:'72–73'};
      merge(base,d,at);
      for(const f of ['current','target'])if(base[f]<1||base[f]>5)throw new Error('Reifegradwerte müssen zwischen 1 und 5 liegen.');
      if(base.name.length>40)throw new Error('Dimensionsnamen dürfen höchstens 40 Zeichen haben.');
      if(!base.name.trim())throw new Error('Dimensionen benötigen einen Namen.');
      return base;
     });
    }else{
     if(got.length!==expected.length)throw new Error(`${at}: unerwartete Anzahl an Einträgen.`);
     target[key]=expected.map((entry,i)=>{const next=clone(entry);merge(next,got[i],at);return next;});
    }
   }else if(expected&&typeof expected==='object'){merge(expected,got,at);}
   else if(typeof expected==='string'){
    if(typeof got!=='string'||got.length>10000)throw new Error(`${at}: ungültiger Text.`);
    target[key]=got;
   }else if(typeof expected==='number'){
    if(typeof got!=='number'||!Number.isFinite(got))throw new Error(`${at}: gültige Zahl erwartet.`);
    target[key]=got;
   }
  }
 }
 merge(result,value);
 for(const [key,n]of Object.entries(result.weights))if(n<0||n>100)throw new Error(`Gewicht ${key} muss zwischen 0 und 100 liegen.`);
 if(Object.values(result.weights).reduce((a,b)=>a+b,0)===0)throw new Error('Mindestens ein Kriterium benötigt ein Gewicht.');
 for(const group of ['ideas','ai','actions'])for(const d of result[group])for(const key of ['impact','effort','risk'])if(!Number.isInteger(d[key])||d[key]<1||d[key]>5)throw new Error('Bewertungen müssen zwischen 1 und 5 liegen.');
 for(const n of Object.values(result.revenueAssumptions))if(n<0||n>1e9)throw new Error('Erlösannahmen müssen zwischen 0 und 1 Milliarde liegen.');
 if(result.revenueAssumptions.margin>100||result.revenueAssumptions.conversion>100)throw new Error('Prozentwerte dürfen 100 nicht überschreiten.');
 const statuses=['Geplant','In Arbeit','Abgeschlossen'];
 const phases=['0–3 Monate','3–6 Monate','6–12 Monate'];
 for(const action of result.actions)if(!statuses.includes(action.status)||!phases.includes(action.phase))throw new Error('Ungültiger Maßnahmenstatus oder Zeitraum.');
 return result;
}

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
