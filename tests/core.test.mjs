import test from 'node:test';
import assert from 'node:assert/strict';
import {clone,validateState,priorityScore,ranked,economics,maturityMean} from '../assets/core.js';
import {DEFAULT_STATE} from '../assets/data.js';
test('priorities reverse cost/risk and normalize arbitrary weights',()=>{
 assert.equal(priorityScore({impact:5,effort:1,risk:1},{impact:50,effort:30,risk:20}),5);
 assert.equal(priorityScore({impact:1,effort:5,risk:5},{impact:50,effort:30,risk:20}),1);
 assert.equal(priorityScore(DEFAULT_STATE.ideas[0],{impact:5,effort:3,risk:2}),4.2);
 assert.equal(ranked(DEFAULT_STATE.ideas,DEFAULT_STATE.weights)[0].id,'project');
});
test('scenario computes incremental contribution, not profit or revenue alone',()=>{
 assert.deepEqual(economics(DEFAULT_STATE.revenueAssumptions),{orders:300,revenue:240000,serviceRevenue:11700,contribution:23700});
 assert.equal(economics({...DEFAULT_STATE.revenueAssumptions,conversion:0}).contribution,-60000);
});
test('export/import roundtrip preserves edits and custom dimensions',()=>{
 const edited=clone(DEFAULT_STATE);
 edited.maturity.reverse();
 edited.maturity.push({id:'custom',name:'Neue Dimension',current:2.5,target:4,evidence:'Workshop',source:'gb26',pages:'72'});
 edited.notes.kunden='Ergebnisse aus Interviews';
 assert.deepEqual(validateState(edited),edited);
 assert.equal(Math.round(maturityMean(DEFAULT_STATE.maturity)*10)/10,3.2);
});
test('import rejects invalid values, duplicate IDs, wrong formats and zero weights',()=>{
 const changes=[s=>s.maturity=[],s=>s.maturity[0].current=7,s=>s.maturity[1].id=s.maturity[0].id,s=>s.weights={impact:0,effort:0,risk:0},s=>s.ai[0].risk=-1,s=>s.revenueAssumptions.conversion=101,s=>s.actions[0].status='unbekannt',s=>s.ideas[0].impact=NaN,s=>s.schemaVersion=2];
 for(const change of changes){const s=clone(DEFAULT_STATE);change(s);assert.throws(()=>validateState(s));}
});
test('unknown imported properties are ignored and prototype keys are never merged',()=>{
 const input=JSON.parse(JSON.stringify(DEFAULT_STATE).replace('"schemaVersion":1','"schemaVersion":1,"__proto__":{"polluted":true},"unknown":"ignored"'));
 const result=validateState(input);
 assert.equal(result.unknown,undefined);
 assert.equal({}.polluted,undefined);
 assert.deepEqual(result,DEFAULT_STATE);
});
