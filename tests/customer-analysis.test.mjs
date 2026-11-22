import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_STATE} from '../assets/data.js';
import {clone,validateState} from '../assets/core.js';
import {innovationView,renderCustomerAnalysis,handleCustomerAnalysisEvent,customerScenario,strongestPain,weakestInvolvement} from '../assets/customer-analysis.js';
import {developmentIdeas} from '../assets/analysis-ui.js';
const ctx={editing:false,cite:(id,pages)=>`<a>${id} ${pages}</a>`};
function controls(state,context=ctx){let html='',saves=0;const options={save(){saves++;},render(){html=renderCustomerAnalysis(state,context);},toast(){}};return {options,get html(){return html;},get saves(){return saves;},click(attribute,value){handleCustomerAnalysisEvent({type:'click',target:{closest:selector=>selector==='#panel-kunden'?{}:selector==='['+attribute+']'?{dataset:{caCandidate:value,caMetric:value,caSegment:value},getAttribute:()=>value}:null}},state,options);}};}
test('course analysis preserves earlier model values and keeps maturity scenarios separate',()=>{
 const s=clone(DEFAULT_STATE),before=JSON.stringify(s.model),scenario=customerScenario(s);
 assert.equal(JSON.stringify(s.model),before);
 assert.deepEqual(scenario.groups[0],s.model[0]);
 assert.equal(scenario.groups[1].criteria.find(c=>c.id==='development').current,2);
 s.customerAnalysis.scenarioJourney=false;s.customerAnalysis.scenarioInnovation=false;
 assert.deepEqual(customerScenario(s).groups,s.model);
 assert.equal(customerScenario(s).changes.length,0);
 assert.equal(strongestPain(s.customerAnalysis).id,'plan');
 assert.equal(weakestInvolvement(s.customerAnalysis).id,'concept');
 s.customerAnalysis.involvement.forEach(p=>p.current=null);
 assert.equal(weakestInvolvement(s.customerAnalysis),null);
});
test('journey and innovation views filter proposals and escape editable content',()=>{
 const s=clone(DEFAULT_STATE),c=controls(s,{...ctx,editing:true});c.click('data-ca-view','journey');
 assert.match(c.html,/<h4>Touchpoints<\/h4>[\s\S]*?<span>Online<\/span>[\s\S]*?<span>Offline<\/span>/);
 assert.match(c.html,/<span>Pain Point<\/span>[^]*?data-ca-score="journey.0.severity"/);
 assert.doesNotMatch(c.html,/<h4>(Ist|Soll)<\/h4>/);
 assert.match(c.html,/ca-layer-target ca-phase-grid[\s\S]*?<span>Risiken und Grenzen<\/span>[\s\S]*?<span>Erfolgskriterium<\/span>/);
 assert.match(c.html,/<h4>Kundenerlebnis<\/h4>/);
 assert.match(c.html,/Wähle zuerst ein Kundensegment/);
 assert.doesNotMatch(c.html,/ca-experience-chart|ca-phase-sources|ca-optimization-card/);
 c.click('data-ca-segment','all');
 assert.doesNotMatch(c.html,/aria-label="Zufriedenheit je Phase"/);
 c.click('data-ca-metric','Satisfaction');
 assert.match(c.html,/aria-label="Zufriedenheit je Phase"/);
 assert.match(c.html,/<details class="ca-experience-edit">[\s\S]*?<summary>Zufriedenheit bewerten<\/summary>[\s\S]*?data-ca-score="journey.0.currentSatisfaction"/);
 assert.doesNotMatch(c.html,/aria-label="Emotion je Phase"|data-ca-score="journey.0.currentEmotion"/);
 c.click('data-ca-metric','Emotion');
 const readOnly=renderCustomerAnalysis(s,ctx);
 assert.match(readOnly,/<span class="status-tag orange">Ist<\/span>/);
 assert.match(readOnly,/<span class="status-tag pink">Soll<\/span>/);
 assert.match(readOnly,/<\/svg><\/div>\s*<p class="ca-experience-note">Skala von 1 \(sehr negativ\) bis 5 \(sehr positiv\)<\/p>/);
 assert.doesNotMatch(readOnly,/data-ca-score="journey.0.currentEmotion"/);
 c.click('data-ca-mode','current');assert.doesNotMatch(c.html,/data-ca-score="journey.0.currentEmotion"/);assert.match(c.html,/data-ca-score="journey.0.targetEmotion"/);
 c.click('data-ca-mode','target');assert.match(c.html,/Wähle Ist oder Soll/);
 assert.doesNotMatch(c.html,/<span>(Risiken und Grenzen|Erfolgskriterium)<\/span>/);
 c.click('data-ca-mode','current');assert.match(c.html,/data-ca-score="journey.0.currentEmotion"/);assert.doesNotMatch(c.html,/data-ca-score="journey.0.targetEmotion"/);
 c.click('data-ca-mode','target');c.click('data-ca-view','innovation');
 assert.match(c.html,/2 von 2 \(100 %\)/);assert.match(c.html,/Inside-out: 0 von 2/);
 c.click('data-ca-filter','Coupled');assert.match(c.html,/Projektlabor/);assert.doesNotMatch(c.html,/<h3>Zukauf von Seniovo/);
 c.click('data-ca-filter','Alle');s.customerAnalysis.innovationConclusion='<script>alert(1)</script>';c.options.render();assert.match(c.html,/&lt;script&gt;/);assert.doesNotMatch(c.html,/<script>/);
 c.click('data-ca-view','journey');
});
test('segment selection switches experience text, scores and curve, with independent importable edits',async()=>{
 const state=clone(DEFAULT_STATE),view=controls(state,{...ctx,editing:true,developmentProposals:developmentIdeas(state)});
 const change=(dataset,value,type='change')=>handleCustomerAnalysisEvent({
  type,target:{dataset,value,closest:selector=>selector==='#panel-kunden'?{}:null,matches:()=>false}
 },state,view.options);
 try {
  view.click('data-ca-segment','difm');
  assert.match(view.html,/segmentExperience.difm.0.emotion[^>]*>Interesse am Projekt/);
  assert.equal((view.html.match(/<article class="ca-phase-card ca-optimization-card">/g)||[]).length,5);
  assert.match(view.html,/<summary id="ca-segment-0">Do-it-for-me-Kunden \(DIFM\)<\/summary>/);
  assert.match(view.html,/<summary id="ca-segment-optimization">Do-it-for-me-Kunden \(DIFM\)<\/summary>/);
  assert.match(view.html,/Phase Entdecken[\s\S]*?welche Arbeiten ein Fachbetrieb übernimmt/);
  const firstRankedCard=()=>view.html.split('<article class="ca-phase-card ca-optimization-card">')[1].split('</article>')[0];
  assert.match(firstRankedCard(),/Pain Point<\/h3>[\s\S]*?Phase Planen[\s\S]*?5\/5[\s\S]*?aria-label="Rang 1">1/);
  assert.match(view.html,/data-ca-score="segmentExperience.difm.0.severity"/);
  await change({caScore:'segmentExperience.difm.0.severity',min:'1',max:'5'},'5');
  assert.match(firstRankedCard(),/Pain Point<\/h3>[\s\S]*?Phase Entdecken[\s\S]*?5\/5[\s\S]*?aria-label="Rang 1">1/);
  assert.equal(validateState(state).customerAnalysis.segmentExperience.difm[0].severity,5);
  assert.match(firstRankedCard(),/<h4>Maßnahme<\/h4>[\s\S]*?<h4>Wirkung und Messung<\/h4>[\s\S]*?wer Material beschafft/);
  assert.doesNotMatch(firstRankedCard(),/Ausgangslage/);
  assert.match(firstRankedCard(),/<h4>Passende Idee<\/h4><p>Offen<\/p>/);
  assert.match(view.html,/href="#muster\/entwicklungsvorschlaege\/project">Digitaler Projektbegleiter/);
  view.click('data-ca-segment','diy');
  const scenario=()=>view.html.split('<h2>Projektübergabe zwischen App, Markt und Bestellung</h2>')[1];
  assert.match(scenario(),/Customer Journey · 3 → 4/);
  assert.match(scenario(),/Priorisierter Maßnahmenkandidat[\s\S]*?Private Heimwerker \(DIY\)[\s\S]*?Phase Planen/);
  assert.doesNotMatch(scenario(),/Produktentwicklung mit Kunden|Steuerung &amp; Personalisierung|Maßnahme nach Phase wählen/);
  view.click('data-ca-segment','difm');
  assert.match(scenario(),/Customer Journey · 3 → 4/);
  assert.match(scenario(),/Priorisierter Maßnahmenkandidat[\s\S]*?Do-it-for-me-Kunden/);
  await handleCustomerAnalysisEvent({type:'change',target:{dataset:{caScenario:'scenarioJourney'},checked:false,closest:selector=>selector==='#panel-kunden'?{}:null,matches:()=>false}},state,view.options);
  assert.doesNotMatch(scenario(),/Customer Journey · 3 → 4/);
  assert.match(innovationView(state,ctx,'scenario'),/Produktentwicklung mit Kunden · 1 → 2/);
  view.click('data-ca-segment','diy');
  assert.match(view.html,/href="#muster\/entwicklungsvorschlaege\/advisor">KI-Beratung als Projektservice/);
  view.click('data-ca-segment','difm');
  assert.doesNotMatch(firstRankedCard(),/data-ca-candidate="journey"/);
  assert.match(view.html,/ca-point-active"><title>Entdecken · Ist 2<\/title>/);
  await change({caText:'segmentExperience.difm.0.emotion'},'Bearbeitete Erfahrung','input');
  await change({caScore:'segmentExperience.difm.0.currentEmotion',min:'1',max:'5'},'5');
  assert.match(view.html,/Bearbeitete Erfahrung/);
  assert.match(view.html,/ca-point-active"><title>Entdecken · Ist 5<\/title>/);
  view.click('data-ca-segment','diy');
  assert.match(view.html,/ca-point-active"><title>Entdecken · Ist 3<\/title>/);
  assert.doesNotMatch(view.html,/Bearbeitete Erfahrung/);
  assert.equal(validateState(JSON.parse(JSON.stringify(state))).customerAnalysis.segmentExperience.difm[0].currentEmotion,5);
  const legacy=clone(state);
  delete legacy.customerAnalysis.segmentExperience;
  assert.deepEqual(validateState(legacy).customerAnalysis.segmentExperience,DEFAULT_STATE.customerAnalysis.segmentExperience);
  state.customerAnalysis.segmentExperience.difm[0].currentEmotion=6;
  assert.throws(()=>validateState(state),/Journey-Skalen/);
 }finally{
  view.click('data-ca-segment','all');
 }
});
test('candidate handoff is idempotent and does not mutate tabs 1 to 3',()=>{
 const s=clone(DEFAULT_STATE),before=clone({model:s.model,ideas:s.ideas,profile:s.profile}),c=controls(s);
 c.click('data-ca-candidate','journey');c.click('data-ca-candidate','journey');c.click('data-ca-candidate','innovation');
 assert.equal(s.actions.filter(a=>a.originId==='course-journey').length,1);assert.equal(s.actions.filter(a=>a.originId==='course-innovation').length,1);
 assert.deepEqual({model:s.model,ideas:s.ideas,profile:s.profile},before);
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);
});
test('new analysis imports accept unknown values and reject invalid scale and source data',()=>{
 const old=clone(DEFAULT_STATE);delete old.customerAnalysis;assert.deepEqual(validateState(old).customerAnalysis,DEFAULT_STATE.customerAnalysis);
 const s=clone(DEFAULT_STATE);s.customerAnalysis.journey[0].currentEmotion=null;s.customerAnalysis.involvement[2].current=0;assert.deepEqual(validateState(s),s);
 for(const value of [6,-1,1.5]){const bad=clone(DEFAULT_STATE);bad.customerAnalysis.journey[0].currentSatisfaction=value;assert.throws(()=>validateState(bad));}
 const bad=clone(DEFAULT_STATE);bad.customerAnalysis.examples[0].sourceUrl='javascript:alert(1)';assert.throws(()=>validateState(bad));
});

test('new fields survive export/import and invalid scales are rejected',()=>{
 const s=clone(DEFAULT_STATE);s.customerAnalysis.journey[0].currentEmotion=null;s.customerAnalysis.involvement[0].current=0;
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);
 const old=clone(s);delete old.customerAnalysis;assert.deepEqual(validateState(old).customerAnalysis,DEFAULT_STATE.customerAnalysis);
 for(const value of [-1,4,1.5]){const bad=clone(DEFAULT_STATE);bad.customerAnalysis.involvement[2].current=value;assert.throws(()=>validateState(bad));}
 const bad=clone(DEFAULT_STATE);bad.customerAnalysis.journey[0].targetSatisfaction=6;assert.throws(()=>validateState(bad));
});
