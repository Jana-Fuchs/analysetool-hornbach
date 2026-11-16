import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_STATE} from '../assets/data.js';
import {ideaTemplate} from '../assets/analysis-data.js';
import {clone,validateState,ideaScore,rankedIdeas,modelMean,modelGaps,candidateFromIdea,actionQuadrant} from '../assets/core.js';
import {maturityAnalysis,ideasAnalysis} from '../assets/analysis-ui.js';
test('idea ranking changes with independent criteria and inverted cost/risk',()=>{
 const s=clone(DEFAULT_STATE);s.ideas=[{...ideaTemplate('a','A'),impact:5,feasibility:1,cost:5,risk:5},{...ideaTemplate('b','B'),impact:1,feasibility:5,cost:1,risk:1}];
 s.ideaWeights={impact:100,feasibility:0,cost:0,risk:0};assert.equal(rankedIdeas(s)[0].id,'a');
 s.ideaWeights={impact:0,feasibility:30,cost:30,risk:40};assert.equal(rankedIdeas(s)[0].id,'b');assert.equal(ideaScore(s.ideas[1],s.ideaWeights),5);
 assert.deepEqual(s.weights,DEFAULT_STATE.weights);
});
test('unknown maturity values are excluded and positive gaps rank across groups',()=>{
 assert.equal(modelMean([{current:null},{current:2},{current:4}]),3);
 assert.equal(modelMean([{current:null}]),null);
 const gaps=modelGaps([{name:'Test',criteria:[{id:'unknown',current:null,target:4},{id:'a',current:1,target:4},{id:'b',current:3,target:2},{id:'c',current:2,target:4}]}]);
 assert.deepEqual(gaps.map(g=>g.id),['a','c']);assert.equal(gaps[0].gap,3);
});
test('extended export/import preserves added ideas, experiments and action candidates',()=>{
 const s=clone(DEFAULT_STATE),d=ideaTemplate('custom','Eigene Idee');d.after[0].text='Neue Zielgruppe';d.canvasChanges.push({id:'costs',text:'Betriebskosten'});d.checks[0].status='Gelb';d.experiment.result='Vier Zusagen';d.experiment.decision='Weiter';
 s.ideas.push(d);s.actions.push(candidateFromIdea(d));s.model[1].criteria[0].current=2;
 assert.deepEqual(validateState(s),s);assert.equal(s.actions.at(-1).originId,'custom');
});
test('old schema-1 files migrate additively without losing existing edits',()=>{
 const s=clone(DEFAULT_STATE);for(const key of ['analysisRevision','model','modelQuestions','four','canvas','patterns','ideaWeights','benchmark','benchmarkConclusion','readiness'])delete s[key];
 s.ideas=s.ideas.slice(0,3).map(({id,name,pattern,description,impact,effort,risk,source,pages,kpi})=>({id,name,pattern,description,impact,effort,risk,source,pages,kpi}));
 s.ideas[0].description='Meine bisherige Analyse';s.ideas[0].effort=4;
 const migrated=validateState(s);assert.equal(migrated.ideas[0].description,'Meine bisherige Analyse');assert.equal(migrated.ideas[0].cost,4);assert.equal(migrated.model.length,3);assert.equal(migrated.ideas.length,6);assert.equal(migrated.ideas[0].after.length,4);
});
test('extended imports reject invalid levels, references, weights and variable array limits',()=>{
 for(const mutate of [s=>s.model[0].criteria[0].current=5,s=>s.model[1].criteria[0].current=2.5,s=>s.benchmark[0].sourceUrl='javascript:alert(1)',s=>s.benchmark[0].ratings[0].id='missing',s=>s.ideaWeights={impact:0,feasibility:0,cost:0,risk:0},s=>s.ideas[0].aiId='missing',s=>s.ideas[0].checks[0].status='invalid',s=>s.ideas[0].after[0].id='invalid',s=>s.ideas.push(...clone(s.ideas)),s=>s.ideas[0].cost=6,s=>s.model[0].criteria[0].id='missing']){
  const s=clone(DEFAULT_STATE);mutate(s);assert.throws(()=>validateState(s));
 }
});
test('criteria, charts, top-two models and experiments render with escaped user input',()=>{
 const s=clone(DEFAULT_STATE);s.ideas[0].name='<script>alert(1)</script>';
 const context={editing:false,icon:()=>'',cite:()=>''};
 const maturity=maturityAnalysis(s,context),ideas=ideasAnalysis(s,context);
 assert.equal((maturity.match(/class="model-chart panel"/g)||[]).length,4);
 assert.equal((ideas.match(/class="top-idea"/g)||[]).length,2);
 assert.match(ideas,/&lt;script&gt;/);assert.doesNotMatch(ideas,/<script>/);assert.match(ideas,/Erfolgskriterium vor Testbeginn/);
 assert.equal(actionQuadrant({impact:5,effort:2}),'Quick Win');
});
