import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_STATE} from '../assets/data.js';
import {ideaTemplate,LEGACY_CUSTOMER_GROUP,LEGACY_REVIEW_GROUPS} from '../assets/analysis-data.js';
import {clone,validateState,ideaScore,rankedIdeas,modelMean,modelGaps,candidateFromIdea,actionQuadrant} from '../assets/core.js';
import {maturityAnalysis,ideasAnalysis,completedIdeas,handleAnalysisEvent} from '../assets/analysis-ui.js';
test('idea ranking changes with independent criteria and inverted cost/risk',()=>{
 const s=clone(DEFAULT_STATE);s.ideas=[{...ideaTemplate('a','A'),impact:5,feasibility:1,cost:5,risk:5},{...ideaTemplate('b','B'),impact:1,feasibility:5,cost:1,risk:1}];
 s.ideaWeights={impact:100,feasibility:0,cost:0,risk:0};assert.equal(rankedIdeas(s)[0].id,'a');
 s.ideaWeights={impact:0,feasibility:30,cost:30,risk:40};assert.equal(rankedIdeas(s)[0].id,'b');assert.equal(ideaScore(s.ideas[1],s.ideaWeights),5);
 assert.deepEqual(s.weights,DEFAULT_STATE.weights);
});
test('new ideas stay unranked at zero and can be moved after saving',()=>{
 const state=clone(DEFAULT_STATE);
 const order=rankedIdeas(state).map(idea=>idea.id);
 const previousDocument=globalThis.document,previousCSS=globalThis.CSS;
 globalThis.document={querySelector:()=>null,getElementById:()=>null};
 globalThis.CSS={escape:id=>id};
 let startedEditing=false;
 const options={save(){},render(){},toast(){},startEditing(){startedEditing=true;}};
 const click=(action,id)=>handleAnalysisEvent({type:'click',target:{
  closest:selector=>selector==='[data-x-action]'?{dataset:{xAction:action,id}}:null
 }},state,options);
 const tab=id=>handleAnalysisEvent({type:'click',target:{
  closest:selector=>selector==='[data-idea-tab]'?{dataset:{ideaTab:id}}:null
 }},state,options);
 try{
  click('add-idea');
  const idea=state.ideas.at(-1),index=state.ideas.length-1;
  assert.equal(idea.name,'');
  assert.equal(idea.pattern,'');
  assert.equal(idea.description,'');
  assert.equal(idea.aiId,'');
  assert.equal(startedEditing,false);
  assert.deepEqual([idea.impact,idea.feasibility,idea.cost,idea.risk,ideaScore(idea,state.ideaWeights)],[0,0,0,0,0]);
  assert.equal(state.ideaManualOrder,false);
  assert.deepEqual(rankedIdeas(state).slice(0,-1).map(item=>item.id),order);
  tab('board');
  const draft=ideasAnalysis(state,{editing:true,cite:()=>''});
  assert.equal((draft.match(/data-x-text="ideas\.\d+\.name"/g)||[]).length,1);
  assert.match(draft,new RegExp(`data-x-text="ideas\\.${index}\\.name"[^>]*value=""`));
  const draftRow=draft.match(/<tr[^>]*idea-draft-row[\s\S]*?<\/tr>/)?.[0];
  assert.match(draftRow,/<td colspan="6">/);
  const patternSelect=draftRow.match(/<select data-x-value="ideas\.\d+\.pattern">[\s\S]*?<\/select>/)?.[0];
  assert.ok(patternSelect);
  assert.equal((patternSelect.match(/<option /g)||[]).length,56);
  assert.doesNotMatch(draftRow,/score-badge|<td>0<\/td>/);
  idea.name='Neue Idee';
  click('finish-idea',idea.id);
  assert.equal(completedIdeas(state).length,6);
  idea.pattern='Unbekanntes Muster';
  idea.method='Ähnlichkeitsprinzip';
  idea.description='Ein zusätzlicher Service für Projektkunden.';
  click('finish-idea',idea.id);
  assert.equal(completedIdeas(state).length,6);
  idea.pattern='Add-on';
  click('finish-idea',idea.id);
  assert.equal(completedIdeas(state).length,7);
  const added=ideasAnalysis(state,{editing:false,cite:()=>''});
  assert.match(added,new RegExp(`data-idea-row="${idea.id}"[^>]*>[\\s\\S]*?<span class="row-index">7<\\/span>`));
  assert.match(added,new RegExp(`data-idea-row="${idea.id}"[\\s\\S]*score-badge">Offen<\\/span>`));
  handleAnalysisEvent({type:'keydown',key:'ArrowUp',preventDefault(){},target:{
   dataset:{ideaRow:idea.id}
  }},state,options);
  assert.equal(state.ideas.at(-2),idea);
  assert.deepEqual(rankedIdeas(state).slice(0,2).map(item=>item.id),order.slice(0,2));
  assert.deepEqual(validateState(state),state);
  click('sort-ideas');
  assert.equal(state.ideaManualOrder,false);
  click('add-idea');
  const second=state.ideas.at(-1);
  Object.assign(second,{name:'Zweite neue Idee',pattern:'Add-on',method:'Konfrontationsprinzip',description:'Ein zusätzlicher Service für Profis.'});
  click('finish-idea',second.id);
  const expanded=ideasAnalysis(state,{editing:false,cite:()=>''});
  assert.match(expanded,new RegExp(`data-idea-row="${second.id}"[^>]*>[\\s\\S]*?<span class="row-index">8<\\/span>`));
 }finally{tab('patterns');globalThis.document=previousDocument;globalThis.CSS=previousCSS;}
});
test('idea criteria apply a new score only with a reason and keep it through export',()=>{
 const state=clone(DEFAULT_STATE),idea=state.ideas[0];
 const previousDocument=globalThis.document;
 globalThis.document={querySelector:()=>null,getElementById:()=>null};
 const click=(selector,dataset)=>handleAnalysisEvent({type:'click',target:{
  closest:query=>query===selector?{dataset}:null
 }},state,{save(){},render(){},toast(){}});
 const tab=ideaTab=>click('[data-idea-tab]',{ideaTab});
 const board=()=>ideasAnalysis(state,{editing:false,cite:()=>''});
 const level={value:'4'},reason={value:'   ',focus(){}};
 assert.ok(state.ideas.every(item=>Object.values(item.criterionReasons).every(Boolean)));
 const older=clone(state);
 delete older.ideas[0].criterionReasons;
 assert.ok(validateState(older).ideas[0].criterionReasons.impact);
 older.ideas[0].impact=2;
 assert.equal(validateState(older).ideas[0].criterionReasons.impact,'');
 let notice;
 const apply=()=>handleAnalysisEvent({type:'submit',preventDefault(){},target:{
  dataset:{ideaCriterionForm:'0',criterionKey:'impact'},closest:()=>null,
  elements:{namedItem:name=>({level,reason})[name]}
 }},state,{save(){},render(){},toast(message,options){notice={message,options};}});
 try{
  reason.defaultValue=idea.criterionReasons.impact;
  reason.value=reason.defaultValue;
  handleAnalysisEvent({type:'change',target:{
   dataset:{ideaCriterionLevel:''},value:'4',closest:()=>null,
   form:{dataset:{savedLevel:'5'},elements:{namedItem:()=>reason}}
  }},state,{});
  assert.equal(reason.value,'');
  apply();
  assert.equal(idea.impact,5);
  tab('board');
  reason.value='blah';
  apply();
  assert.equal(idea.impact,4);
  assert.equal(rankedIdeas(state)[0].id,'advisor');
  const rendered=board();
  assert.match(rendered,/<tbody><tr data-idea-row="advisor"/);
  assert.deepEqual(notice,{message:'Ranking geändert. „Digitaler Projektbegleiter“ steht jetzt auf Platz 2.',options:{ranking:true}});
  assert.match(rendered,/id="idea-criterion-0-impact"[\s\S]*?<textarea name="reason"[^>]*>blah<\/textarea>/);
  assert.equal(validateState(state).ideas[0].criterionReasons.impact,reason.value);
  level.value='0';
  apply();
  assert.equal(ideaScore(idea,state.ideaWeights),0);
  assert.equal(idea.criterionReasons.impact,'');
 }finally{tab('patterns');globalThis.document=previousDocument;}
});
test('risk checks require a reason for a changed level and apply together',()=>{
 const state=clone(DEFAULT_STATE),idea=state.ideas[0];
 const previousDocument=globalThis.document;
 globalThis.document={querySelector:()=>null};
 const inputs=new Map();
 idea.checks.forEach((check,index)=>{
  inputs.set('level-'+index,{value:String(check.level)});
  inputs.set('reason-'+index,{value:check.reason,focus(){}});
 });
 const apply=()=>handleAnalysisEvent({type:'submit',preventDefault(){},target:{
  dataset:{ideaRiskForm:'0'},closest:()=>null,elements:{namedItem:name=>inputs.get(name)}
 }},state,{save(){},render(){},toast(){}});
 try{
  inputs.get('level-0').value='5';
  const hint={hidden:true};
  handleAnalysisEvent({type:'change',target:{
   dataset:{riskLevel:'0',savedLevel:'2'},value:'5',closest:()=>null,
   form:{elements:{namedItem:name=>inputs.get(name)},querySelector:()=>hint}
  }},state,{});
  assert.equal(inputs.get('reason-0').value,'');
  assert.equal(inputs.get('reason-0').required,true);
  assert.equal(hint.hidden,false);
  inputs.get('reason-0').value='   ';
  apply();
  assert.equal(idea.risk,2);
  assert.equal(idea.checks[0].level,2);
  inputs.get('reason-0').value='Zusätzliche Absicherung erforderlich.';
  inputs.get('level-1').value='0';
  apply();
  assert.equal(idea.risk,0);
  assert.equal(ideaScore(idea,state.ideaWeights),0);
  inputs.get('level-1').value='2';
  inputs.get('reason-1').value='Fachlich prüfen.';
  apply();
  assert.equal(idea.risk,5);
  assert.equal(validateState(state).ideas[0].risk,5);
 }finally{globalThis.document=previousDocument;}
});
test('unknown maturity values are excluded and positive gaps rank across groups',()=>{
 assert.equal(modelMean([{current:null},{current:2},{current:4}]),3);
 assert.equal(modelMean([{current:null}]),null);
 const gaps=modelGaps([{name:'Test',criteria:[{id:'unknown',current:null,target:4},{id:'a',current:1,target:4},{id:'b',current:3,target:2},{id:'c',current:2,target:4}]}]);
 assert.deepEqual(gaps.map(g=>g.id),['a','c']);assert.equal(gaps[0].gap,3);
});
test('extended export/import preserves added ideas, experiments and action candidates',()=>{
 const s=clone(DEFAULT_STATE),d=ideaTemplate('custom','Eigene Idee');d.after[0].text='Neue Zielgruppe';d.canvasChanges.push({id:'costs',text:'Betriebskosten'});d.checks[0].status='Gelb';d.checks.forEach(check=>{check.level=3;});d.risk=3;d.experiment.result='Vier Zusagen';d.experiment.decision='Weiter';
 s.ideas.push(d);s.actions.push(candidateFromIdea(d));s.model[1].criteria[0].current=2;
 assert.deepEqual(validateState(s),s);assert.equal(s.actions.at(-1).originId,'custom');
});
test('old schema-1 files migrate additively without losing existing edits',()=>{
 const s=clone(DEFAULT_STATE);for(const key of ['analysisRevision','model','modelQuestions','four','canvas','patterns','ideaWeights','benchmark','benchmarkConclusion','readiness'])delete s[key];
 s.ideas=s.ideas.slice(0,3).map(({id,name,pattern,description,impact,effort,risk,source,pages,kpi})=>({id,name,pattern,description,impact,effort,risk,source,pages,kpi}));
 s.ideas[0].description='Meine bisherige Analyse';s.ideas[0].effort=4;
 const migrated=validateState(s);assert.equal(migrated.ideas[0].description,'Meine bisherige Analyse');assert.equal(migrated.ideas[0].cost,4);assert.equal(migrated.ideas[0].risk,0);assert.equal(migrated.ideas[0].previousRisk,2);assert.equal(migrated.model.length,3);assert.equal(migrated.ideas.length,6);assert.equal(migrated.ideas[0].after.length,4);
});
test('extended imports reject invalid levels, references, weights and variable array limits',()=>{
 for(const mutate of [s=>s.model[0].criteria[0].current=5,s=>s.model[1].criteria[0].current=2.5,s=>s.benchmark[0].sourceUrl='javascript:alert(1)',s=>s.benchmark[0].ratings[0].id='missing',s=>s.ideaWeights={impact:0,feasibility:0,cost:0,risk:0},s=>s.ideas[0].aiId='missing',s=>s.ideas[0].checks[0].status='invalid',s=>s.ideas[0].after[0].id='invalid',s=>s.ideas.push(...clone(s.ideas)),s=>s.ideas[0].cost=6,s=>s.model[0].criteria[0].id='missing']){
  const s=clone(DEFAULT_STATE);mutate(s);assert.throws(()=>validateState(s));
 }
});
test('criteria, charts and top-two models render with escaped user input',()=>{
 const s=clone(DEFAULT_STATE);s.ideas[0].name='<script>alert(1)</script>';s.ideas[0].source='gb26';
 const context={editing:false,icon:()=>'',cite:()=>''};
 const maturity=maturityAnalysis(s,context),ideas=ideasAnalysis(s,context);
 assert.equal((maturity.match(/class="model-chart (?:panel|product-chart)(?: many-criteria-chart)?"/g)||[]).length,1);
 assert.match(ideas,/data-idea-tab="patterns" aria-selected="true"/);
 assert.doesNotMatch(ideas,/Woran erkennen wir Erfolg\?/);
 const previousDocument=globalThis.document;
 globalThis.document={getElementById:()=>null};
 let rendered='';
 const activate=(id,type='click',key)=>handleAnalysisEvent({
  type,key,preventDefault(){},
  target:{closest:selector=>selector==='[data-idea-tab]'?{dataset:{ideaTab:id}}:null}
 },s,{render(){rendered=ideasAnalysis(s,context);}});
 try{
  activate('patterns','keydown','ArrowRight');
  assert.match(rendered,/data-idea-tab="board" aria-selected="true"/);
  assert.doesNotMatch(rendered,/Woran erkennen wir Erfolg\?|<h3[^>]*>Experiment<\/h3>/);
  assert.doesNotMatch(rendered,/Höchste Bewertung/);
  assert.doesNotMatch(rendered,/Ideen aus KI-Anwendungen/);
  assert.doesNotMatch(rendered,/data-idea-details|idea-ranking-details|KI-Anwendung \(optional\)/);
  assert.match(rendered,/data-open-idea-risk="idea-risk-0"/);
  assert.match(rendered,/data-open-idea-criterion="idea-criterion-0-impact"/);
  assert.match(rendered,/form="idea-criterion-0-impact-close">Abbrechen/);
  assert.match(rendered,/form="idea-risk-0-close">Abbrechen/);
  assert.doesNotMatch(rendered,/formmethod="dialog"/);
  assert.match(rendered,/Spürbarer Aufwand für Umsetzung und Betrieb/);
  assert.match(rendered,/Ausschlaggebend:/);
  assert.doesNotMatch(rendered,/data-idea-tab="risks"|data-x-value="ideas\.0\.risk"/);
  const editor=ideasAnalysis(s,{...context,editing:true});
  assert.match(editor,/Welches Navigator-Muster nutzt die Idee\?/);
  assert.match(editor,/Ideenbeschreibung:/);
  assert.doesNotMatch(editor,/Nutzen &amp; Angebot|KI-Anwendung \(optional\)/);
  activate('map');
  assert.match(rendered,/class="opportunity-map"/);
  assert.doesNotMatch(rendered,/Hohe Wirkung und geringer Aufwand/);
  assert.match(rendered,/aria-hidden="true"><strong>KI-Beratung als Projektservice<\/strong><span>Nutzen 4 \/ Machbarkeit 4 \/ Kosten 2 \/ Risiko 2/);
  assert.doesNotMatch(rendered,/popovertarget="idea-map-point|stroke="#c80986"/);
  assert.match(rendered,/<ol class="map-key"><li>&lt;script&gt;alert\(1\)&lt;\/script&gt;<\/li><li>KI-Beratung als Projektservice<\/li>/);
  assert.match(rendered,/Entwicklungsvorschläge/);
  activate('proposals');
  assert.equal((rendered.match(/data-idea-details="[^"]+" aria-expanded="true"/g)||[]).length,1);
  assert.match(rendered,/data-idea-details="project" aria-expanded="true"/);
  assert.match(rendered,/data-idea-details="advisor" aria-expanded="false"/);
  assert.doesNotMatch(rendered,/<table|Gewichteter Mittelwert/);
  assert.equal((rendered.match(/Beiträge zum Score/g)||[]).length,2);
  assert.match(rendered,/<dt>Nutzen<\/dt><dd>\+1,75<\/dd>/);
  assert.match(rendered,/<h4>Erwartete Wirkung<\/h4>/);
  assert.equal((rendered.match(/class="top-idea"/g)||[]).length,2);
  assert.match(rendered,/&lt;script&gt;/);assert.doesNotMatch(rendered,/<script>/);
  assert.equal((rendered.match(/class="profile-triangle-diagram"/g)||[]).length,2);
  assert.equal((rendered.match(/class="delta proposal-score"/g)||[]).length,2);
  assert.match(rendered,/<h4 class="proposal-state-current">Ist<\/h4>/);
  assert.match(rendered,/<h4 class="proposal-state-target">Neu<\/h4>/);
  assert.doesNotMatch(rendered,/data-proposal-model|proposal-canvas|Herleitung &amp; Passung|Wissenschaftliche Quelle|Übernimmt Entwurf/);
 }finally{
  activate('patterns');
  globalThis.document=previousDocument;
 }
 assert.equal(actionQuadrant({impact:5,effort:2}),'Quick Win');
});

test('pattern catalogue keeps Ist and Soll independent and requires a reason',()=>{
 const state=clone(DEFAULT_STATE);
 const context={editing:false,cite:id=>id};
 const render=()=>ideasAnalysis(state,context);
 assert.match(render(),/data-pattern-filter="current" aria-pressed="true"[\s\S]*data-pattern-filter="target" aria-pressed="true"[\s\S]*data-pattern-filter="all" aria-pressed="false"/);
 assert.match(render(),/Derzeit genutzt/);
 assert.match(render(),/Ausbaufähig/);
 assert.match(render(),/popover role="region"/);
 assert.match(render(),/pattern-current pattern-target" data-pattern-id="rent"/);
 assert.doesNotMatch(render(),/pattern-choice" data-pattern-id="navigator-2"/);
 const previousDocument=globalThis.document,previousCSS=globalThis.CSS;
 globalThis.document={querySelector:()=>null};
 globalThis.CSS={escape:id=>id};
 globalThis.document.getElementById=()=>null;
 const filter=value=>handleAnalysisEvent({type:'click',target:{closest:selector=>selector==='[data-pattern-filter]'?{dataset:{patternFilter:value}}:null}},state,{render});
 let saves=0;
 const submit=(id,reason,value)=>handleAnalysisEvent({
  type:'submit',preventDefault(){},submitter:{value},
  target:{dataset:{patternTarget:id},elements:{reason:{value:reason,focus(){}},reference:{value:'https://example.org/source'}}}
 },state,{save(){saves++;},render,toast(){}});
 try{
  filter('target');
  assert.match(render(),/data-pattern-id="ecommerce"/);
  assert.doesNotMatch(render(),/data-pattern-id="addon"/);
  filter('target');
  assert.match(render(),/data-pattern-id="addon"/);
  assert.match(render(),/data-pattern-id="ecommerce"/);
  assert.equal((render().match(/data-pattern-id="rent"/g)||[]).length,1);
  assert.doesNotMatch(render(),/data-pattern-id="navigator-2"/);
  filter('current');
  assert.match(render(),/data-pattern-id="addon"/);
  assert.doesNotMatch(render(),/data-pattern-id="ecommerce"/);
  filter('all');
  assert.match(render(),/data-pattern-filter="all" aria-pressed="true"/);
  assert.equal((render().match(/<button type="button" class="pattern-tile"/g)||[]).length,55);
  submit('navigator-2','   ');
  assert.equal(saves,0);
  submit('navigator-2','Eigener Ausbauvorschlag');
  assert.match(render(),/pattern-target" data-pattern-id="navigator-2"/);
  assert.deepEqual(validateState(state),state);
  submit('navigator-2','','remove');
  assert.match(render(),/pattern-choice" data-pattern-id="navigator-2"/);
  submit('rent','','remove');
  assert.match(render(),/pattern-current" data-pattern-id="rent"/);
 }finally{globalThis.document=previousDocument;globalThis.CSS=previousCSS;}
});

test('project offering migrates old product assessments and preserves subsequent edits',()=>{
 const legacy=clone(DEFAULT_STATE);
 delete legacy.productScopeRevision;
 legacy.model[0]=clone(legacy.productAssessments.sileno);
 legacy.productSelection='sileno';
 legacy.model[0].criteria[0].evidence='Eigene frühere Bewertung';
 const migrated=validateState(legacy);
 assert.deepEqual(migrated.model[0],DEFAULT_STATE.model[0]);
 assert.equal(migrated.productAssessments.sileno.criteria[0].evidence,'Eigene frühere Bewertung');
 migrated.model[0].criteria[0].current=4;
 const restored=validateState(JSON.parse(JSON.stringify(migrated)));
 assert.equal(restored.model[0].criteria[0].current,4);
 assert.equal(restored.productAssessments.sileno.criteria[0].evidence,'Eigene frühere Bewertung');
 const html=maturityAnalysis(restored,{editing:false,icon:()=>'',cite:()=>''});
 assert.ok(!html.includes('data-product-select'));
 assert.ok(restored.model[0].criteria[0].reference.includes('angepasste Arbeitsdefinitionen'));
 const edited=maturityAnalysis(restored,{editing:true,icon:()=>'',cite:()=>''});
 assert.ok(edited.includes('data-model-tab="product"'));
});

test('product chart opens one criterion and retains editable rating controls',()=>{
 const state=clone(DEFAULT_STATE),context={editing:true,icon:()=>'',cite:()=>''};
 const previousDocument=globalThis.document;
 const previousWindow=globalThis.window;
 globalThis.window={scrollY:0,scrollTo(){}};
 globalThis.document={querySelector:()=>({focus(){},getBoundingClientRect(){return {top:300,height:80};}})};
 try{
  for(const id of ['monitor','autonomy']){
   let prevented=false,rendered='';
   handleAnalysisEvent({type:'keydown',key:'Enter',preventDefault(){prevented=true;},target:{closest:()=>({dataset:{criterionId:id}})}},state,{save(){},render(){rendered=maturityAnalysis(state,context);},toast(){}});
   assert.ok(prevented);
   assert.equal((rendered.match(/class="selected-product-criterion file-criterion"/g)||[]).length,1);
   const criterion=state.model[0].criteria.find(c=>c.id===id),index=state.model[0].criteria.indexOf(criterion);
   assert.ok(rendered.includes('<h3 tabindex="-1">'+criterion.name.replaceAll('&','&amp;')+'</h3>'));
   assert.ok(rendered.includes('data-x-value="model.0.criteria.'+index+'.current"'));
   assert.ok(rendered.includes('angepasste Arbeitsdefinitionen'));
   assert.ok(!rendered.includes('class="criterion-title"><span class="criterion-number">1.</span><span>Überwachung'));
  }
 }finally{globalThis.document=previousDocument;globalThis.window=previousWindow;}
});

test('customer and business charts select and close their own criteria',()=>{
 const state=clone(DEFAULT_STATE),context={editing:false,icon:()=>'',cite:()=>''};
 const previousDocument=globalThis.document,previousWindow=globalThis.window;
 globalThis.document={querySelector:()=>({focus(){},getBoundingClientRect(){return {top:300,height:80};}})};
 globalThis.window={scrollY:0,scrollTo(){}};
 try{
  for(const [groupId,criterionId,groupIndex] of [['customer','selfservice',1],['business','concept',2]]){
   let rendered='';
   const options={save(){},render(){rendered=maturityAnalysis(state,context);},toast(){}};
   handleAnalysisEvent({type:'click',preventDefault(){},target:{closest:selector=>selector==='[data-criterion-id]'?{dataset:{groupId,criterionId}}:null}},state,options);
   assert.ok(rendered.includes('data-selected-group="'+groupId+'"'));
   const index=state.model[groupIndex].criteria.findIndex(c=>c.id===criterionId);
   assert.ok(rendered.includes('data-x-value="model.'+groupIndex+'.criteria.'+index+'.current"'));
   handleAnalysisEvent({type:'click',target:{closest:selector=>selector==='[data-close-criterion]'?{dataset:{closeCriterion:groupId}}:null}},state,options);
   assert.ok(!rendered.includes('data-selected-group="'+groupId+'"'));
  }
 }finally{globalThis.document=previousDocument;globalThis.window=previousWindow;}
});

test('customer estimates complete the radar and migrate untouched legacy values',()=>{
 const customer=DEFAULT_STATE.model[1];
 assert.equal(customer.criteria.length,12);
 assert.ok(customer.criteria.every(c=>Number.isInteger(c.current)&&c.current>=1&&c.current<=4&&c.assumption&&c.evidence&&c.target>=c.current));
 assert.ok(Math.abs(modelMean(customer.criteria)-26/12)<1e-10);
 const old=clone(DEFAULT_STATE);
 delete old.customerAssessmentRevision;
 old.model[1]=clone(LEGACY_CUSTOMER_GROUP);
 assert.deepEqual(validateState(old).model[1],customer);
 old.model[1].criteria[0].current=3;
 old.model[1].criteria[0].evidence='Eigene interne Bewertung';
 const migrated=validateState(old);
 assert.equal(migrated.model[1].criteria[0].current,3);
 assert.equal(migrated.model[1].criteria[0].evidence,'Eigene interne Bewertung');
 assert.ok(migrated.model[1].criteria.every(c=>c.current!==null));
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(migrated))),migrated);
});

test('reviewed assessments migrate defaults, preserve edits and explain every target',()=>{
 const old=clone(DEFAULT_STATE);delete old.maturityAssessmentRevision;old.model=clone(LEGACY_REVIEW_GROUPS);
 old.model[0].criteria[0].evidence='Eigene geprüfte Begründung';
 old.model[1].criteria[0].target=4;
 const migrated=validateState(old);
 assert.equal(migrated.model[2].criteria[1].current,2);
 assert.equal(migrated.model[2].criteria[2].target,2);
 assert.equal(migrated.model[0].criteria[4].target,3);
 assert.equal(migrated.model[0].criteria[0].evidence,'Eigene geprüfte Begründung');
 assert.equal(migrated.model[1].criteria[0].target,4);
 assert.match(migrated.model[1].criteria[0].targetEvidence,/Individuell/);
 assert.ok(migrated.model.flatMap(g=>g.criteria).every(c=>c.targetEvidence.length>50));
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(migrated))),migrated);
});

test('folder tabs show a selected model and stage bubbles separate Ist and Soll',()=>{
 const state=clone(DEFAULT_STATE),context={editing:false,icon:()=>'',cite:()=>''};
 const previous=globalThis.document,previousWindow=globalThis.window;
 globalThis.window={innerWidth:1400};
 globalThis.document={querySelector:()=>({focus(){},scrollIntoView(){assert.fail('Opening a stage must not scroll the page');},getBoundingClientRect(){return {height:80,top:200};}})};
 let html='';const options={save(){},render(){html=maturityAnalysis(state,context);},toast(){}};
 const click=(selector,dataset)=>handleAnalysisEvent({type:'click',target:{closest:s=>s===selector?{dataset}:null}},state,options);
 try{
  click('[data-model-tab]',{modelTab:'customer'});
  assert.match(html,/data-selected-group="customer"/);
  assert.match(html,/aria-label="Produktentwicklung mit Kunden" aria-pressed="true"/);
  handleAnalysisEvent({type:'click',preventDefault(){},target:{closest:s=>s==='[data-criterion-id]'?{dataset:{groupId:'customer',criterionId:'development'}}:null}},state,options);
  assert.match(html,/data-x-value="model.1.criteria.0.target"/);
  click('[data-stage-group]',{stageGroup:'customer',stageId:'development',stageKey:'target',stageLevel:'2'});
  assert.match(html,/class="stage-bubble stage-preview is-open"/);
  assert.match(html,/Soll-Begründung/);
  assert.doesNotMatch(html,/aria-label="Begründung"/);
  click('[data-close-bubble]',{});
  assert.doesNotMatch(html,/class="stage-bubble stage-preview is-open"/);
  click('[data-model-tab]',{modelTab:'overview'});
  assert.doesNotMatch(html,/data-selected-group=/);
 }finally{globalThis.document=previous;globalThis.window=previousWindow;}
});

test('rating changes require a reason and commit rating and explanation together',()=>{
 const state=clone(DEFAULT_STATE),previous=globalThis.document;
 globalThis.document={querySelector:()=>({focus(){}})};
 let saves=0;const options={save(){saves++;},render(){},toast(){}};
 const click=selector=>handleAnalysisEvent({type:'click',target:{closest:s=>s===selector?{}:null}},state,options);
 try{
  for(const key of ['current','target']){
   const c=state.model[0].criteria[0],before=c[key],after=before===4?2:4,path=`model.0.criteria.0.${key}`;
   handleAnalysisEvent({type:'change',target:{dataset:{xValue:path},value:String(after),closest:()=>null}},state,options);
   assert.equal(c[key],before);const count=saves;
   click('[data-save-rating]');assert.equal(saves,count);assert.equal(c[key],before);
   handleAnalysisEvent({type:'input',target:{value:'Neue Quellen belegen diese Einordnung.',hasAttribute:name=>name==='data-rating-reason'}},state,options);
   if(key==='current')handleAnalysisEvent({type:'input',target:{value:'Neue Studie, S. 12',hasAttribute:name=>name==='data-rating-source'}},state,options);
   assert.equal(saves,count);
   click('[data-save-rating]');assert.equal(c[key],after);assert.equal(saves,count+1);
   assert.match(c[key==='current'?'evidence':'targetEvidence'],/Neue Quellen/);
   if(key==='current'){assert.equal(c.source,'');assert.equal(c.pages,'');assert.equal(c.reference,'');assert.equal(c.currentReference,'Neue Studie, S. 12');}
   else assert.equal(c.targetReference,'');
   handleAnalysisEvent({type:'change',target:{dataset:{xValue:path},value:String(before),closest:()=>null}},state,options);
   click('[data-cancel-rating]');assert.equal(c[key],after);assert.equal(saves,count+1);
  }
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))),state);
 }finally{globalThis.document=previous;}
});

test('benchmark sources and manual ratings follow the visible development gaps',()=>{
 const state=clone(DEFAULT_STATE);
 const context={editing:false,icon:()=>'',cite:()=>''};
 const previousDocument=globalThis.document;
 globalThis.document={querySelector:()=>null,querySelectorAll:()=>[]};
 let html='';
 const options={save(){},render(){html=maturityAnalysis(state,context);},toast(){}};
 const show=modelTab=>handleAnalysisEvent({
  type:'click',target:{closest:selector=>selector==='[data-model-tab]'?{dataset:{modelTab}}:null}
 },state,options);
 const benchmark=()=>html.match(/<section class="benchmark-comparison">[\s\S]*?<\/section>/)[0];
 try{
  show('business');
  assert.match(benchmark(),/machbarmacher/);
  const delivery=state.model[2].criteria.find(criterion=>criterion.id==='delivery');
  const concept=state.model[2].criteria.find(criterion=>criterion.id==='concept');
  concept.target=4;
  options.render();
  for(const provider of ['obi','bauhaus','toom']){
   assert.ok(benchmark().includes(`data-benchmark-rating="benchmarkManual.business.concept.${provider}"`));
  }
  assert.match(benchmark(),/machbarmacher/);
  assert.match(benchmark(),/>Offen<\/button>/);
  assert.doesNotMatch(benchmark(),/class="benchmark-sources"/);
  delivery.target=delivery.current;
  options.render();
  assert.doesNotMatch(benchmark(),/machbarmacher/);
  let sourceUrl='',basis='source',reason='';
  const submit=()=>handleAnalysisEvent({
   type:'submit',preventDefault(){},target:{
    dataset:{benchmarkRating:'benchmarkManual.business.concept.obi',dialogId:'benchmark-evidence-business-concept-obi'},
    elements:{namedItem:name=>({value:name==='level'?'2':name==='basis'?basis:name==='reason'?reason:sourceUrl,focus(){}})}
   }
  },state,options);
  submit();
  assert.equal(state.benchmarkManual.business.concept.obi.value,null);
  sourceUrl='https://example.com/concept';
  submit();
  assert.match(benchmark(),/>2<\/button>/);
  assert.match(benchmark(),/https:\/\/example\.com\/concept/);
  concept.target=concept.current;
  options.render();
  assert.doesNotMatch(benchmark(),/https:\/\/example\.com\/concept/);
  assert.deepEqual(validateState(state).benchmarkManual.business.concept.obi,{
   value:2,sourceUrl:'https://example.com/concept',estimated:false,reason:''
  });
  concept.target=4;
  basis='estimate';
  sourceUrl='';
  submit();
  assert.equal(state.benchmarkManual.business.concept.obi.estimated,false);
  reason='Vergleichbares Angebot in einem Teilbereich.';
  submit();
  assert.doesNotMatch(benchmark(),/>2 \*<\/button>/);
  assert.match(benchmark(),/Stufe 2 \(Schätzung\)/);
  assert.deepEqual(validateState(state).benchmarkManual.business.concept.obi,{
   value:2,sourceUrl:'',estimated:true,reason
  });
 }finally{
  show('overview');
  globalThis.document=previousDocument;
 }
});
