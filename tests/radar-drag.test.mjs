import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {previewRadarDrag,reorderDimension,clamp} from '../assets/core.js';

const app = await readFile(new URL('../assets/app.js', import.meta.url), 'utf8');
const geometry = app.slice(app.indexOf('function radarGeometry('),app.indexOf('function maturityView('));
const handlers = app.slice(app.indexOf('function bindRadar('),app.indexOf('function updateEconomics('));
function fixture(){
 const listeners={},preview={hidden:true,innerHTML:''};let saves=0,renders=0;
 const maturity=['a','b','c'].map((id,i)=>({id,name:['Kunden und Partnerintegration','Prozesse','Technologie'][i],current:3,target:4}));
 const state={maturity};
 const label={dataset:{dragAxis:'a'},hasAttribute:key=>key==='data-drag-axis'};
 const svg={
  innerHTML:'',addEventListener:(name,handler)=>listeners[name]=handler,
  createSVGPoint:()=>({x:0,y:0,matrixTransform(){return {x:this.x,y:this.y};}}),
  getScreenCTM:()=>({inverse:()=>({})}),setPointerCapture(){},classList:{add(){},remove(){}}
 };
 const context=vm.createContext({
  $:selector=>selector==='#radar'?svg:selector==='#radar-order-preview'?preview:null,
  $$:()=>[],state,drag:null,Math,CSS:{escape:value=>value},escape:String,
  previewRadarDrag,reorderDimension,clamp,updateRadar(){},
  save(){saves++;},render(){renders++;}
 });
 vm.runInContext(geometry+'\n'+handlers+'\nbindRadar();',context);
 const down=(x=310,y=38)=>listeners.pointerdown({target:{closest:()=>label},clientX:x,clientY:y,pointerId:1,preventDefault(){}});
 const move=(x,y)=>listeners.pointermove({clientX:x,clientY:y});
 return {state,svg,preview,listeners,down,move,saves:()=>saves,renders:()=>renders};
}

test('the complete multiline label follows horizontal and vertical pointer movement',()=>{
 const f=fixture();f.down();f.move(390,78);
 assert.match(f.svg.innerHTML,/data-drag-axis="a"[^>]*transform="translate\(410 78\)"/);
 f.move(250,-12);
 assert.match(f.svg.innerHTML,/data-drag-axis="a"[^>]*transform="translate\(270 -12\)"/);
});
test('the chart and order chips preview insertion before the order is committed',()=>{
 const f=fixture();f.down();f.move(490,349);
 assert.deepEqual([...f.svg.innerHTML.matchAll(/data-drag-axis="([^"]+)"/g)].map(m=>m[1]),['b','a','c']);
 assert.match(f.svg.innerHTML,/radar-drop-placeholder/);
 assert.match(f.svg.innerHTML,/Position 2 \/ 3/);
 assert.match(f.svg.innerHTML,/data-drag-axis="a"[\s\S]*?text-anchor="middle" dominant-baseline="central" class="radar-label"/);
 assert.equal(f.preview.hidden,false);
 assert.match(f.preview.innerHTML,/class="moving">2\. Kunden und Partnerintegration/);
 assert.deepEqual(f.state.maturity.map(d=>d.id),['a','b','c']);
 assert.equal(f.saves(),0);
 f.listeners.pointerup();
 assert.deepEqual(Array.from(f.state.maturity,d=>d.id),['b','a','c']);
 assert.equal(f.saves(),1);
});
test('cancelling a drag leaves the original order and saved state intact',()=>{
 const f=fixture();f.down();f.move(490,349);f.listeners.pointercancel();
 assert.deepEqual(f.state.maturity.map(d=>d.id),['a','b','c']);
 assert.equal(f.saves(),0);assert.equal(f.renders(),1);
});
test('angular insertion covers every slot for 3–10 dimensions without mutating input',()=>{
 for(let count=3;count<=10;count++){
  const items=Array.from({length:count},(_,i)=>({id:String(i)}));
  for(let index=0;index<count;index++){
   const angle=-Math.PI/2+index*2*Math.PI/count;
   const position={x:330+207*Math.cos(angle),y:245+207*Math.sin(angle)};
   const draft=previewRadarDrag(items,'0',{x:330,y:38},{x:330,y:38},position);
   assert.equal(draft.index,index);
   assert.equal(draft.items[index],items[0]);
   assert.deepEqual(items.map(d=>d.id),Array.from({length:count},(_,i)=>String(i)));
  }
 }
});
