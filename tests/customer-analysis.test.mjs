import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_STATE} from '../assets/data.js';
import {clone,validateState} from '../assets/core.js';
import {renderCustomerAnalysis,handleCustomerAnalysisEvent,customerScenario,strongestPain,weakestInvolvement} from '../assets/customer-analysis.js';
const ctx={editing:false,cite:(id,pages)=>`<a>${id} ${pages}</a>`};
function controls(state){let html='',saves=0;const options={save(){saves++;},render(){html=renderCustomerAnalysis(state,ctx);},toast(){}};return {options,get html(){return html;},get saves(){return saves;},click(attribute,value){handleCustomerAnalysisEvent({type:'click',target:{closest:selector=>selector==='#panel-kunden'?{}:selector==='['+attribute+']'?{dataset:{caCandidate:value},getAttribute:()=>value}:null}},state,options);}};}
test('course analysis preserves earlier model values and keeps maturity scenarios separate',()=>{
 const s=clone(DEFAULT_STATE),before=JSON.stringify(s.model),scenario=customerScenario(s);
 assert.equal(JSON.stringify(s.model),before);
 assert.equal(scenario.groups[0].criteria[0].current,3);
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
 const s=clone(DEFAULT_STATE),c=controls(s);c.click('data-ca-view','journey');
 assert.match(c.html,/Online-Touchpoints/);assert.match(c.html,/Offline-Touchpoints/);assert.match(c.html,/Emotion und Zufriedenheit/);
 c.click('data-ca-mode','current');assert.doesNotMatch(c.html,/data-ca-score="journey.0.currentEmotion"/);assert.match(c.html,/data-ca-score="journey.0.targetEmotion"/);
 c.click('data-ca-mode','target');assert.match(c.html,/Wähle Ist oder Soll/);
 c.click('data-ca-mode','current');assert.match(c.html,/data-ca-score="journey.0.currentEmotion"/);assert.doesNotMatch(c.html,/data-ca-score="journey.0.targetEmotion"/);
 c.click('data-ca-mode','target');c.click('data-ca-view','innovation');
 assert.match(c.html,/2 von 2 \(100 %\)/);assert.match(c.html,/Inside-out: 0 von 2/);
 c.click('data-ca-filter','Coupled');assert.match(c.html,/Projektlabor/);assert.doesNotMatch(c.html,/<h3>Zukauf von Seniovo/);
 c.click('data-ca-filter','Alle');s.customerAnalysis.innovationConclusion='<script>alert(1)</script>';c.options.render();assert.match(c.html,/&lt;script&gt;/);assert.doesNotMatch(c.html,/<script>/);
 c.click('data-ca-view','journey');
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
