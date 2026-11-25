import test from 'node:test';
import assert from 'node:assert/strict';
import {cashflow,cashflowDefaults} from '../assets/hybrid.js';
import {DEFAULT_STATE} from '../assets/data.js';
import {clone,validateState} from '../assets/core.js';

test('cumulative cashflow and break-even match the hand calculation',()=>{
 const [product,service,hybrid]=cashflow(cashflowDefaults);
 assert.deepEqual(product.values.slice(0,2),[0,72000]);
 assert.deepEqual(service.values,[-10000,-7000,-4000,-1000,2000,5000]);
 assert.deepEqual(hybrid.values.slice(0,2),[-10000,65000]);
 assert.deepEqual([product.breakEven,service.breakEven,hybrid.breakEven],[1,4,1]);
 assert.equal(cashflow({...cashflowDefaults,years:3})[1].breakEven,null);
});

test('older exports retain their ratings and receive the new KI ideas',()=>{
 const old=clone(DEFAULT_STATE);
 delete old.cashflowAssumptions;
 old.ai=old.ai.slice(0,3);
 delete old.ai[0].feasibility;
 old.ai[0].effort=5;
 old.ai[0].description='Eigene Beschreibung';
 const restored=validateState(old);
 assert.equal(restored.ai.length,6);
 assert.equal(restored.ai[0].feasibility,1);
 assert.equal(restored.ai[0].description,'Eigene Beschreibung');
 assert.deepEqual(restored.cashflowAssumptions,cashflowDefaults);
 restored.ai[2].integration=1;
 restored.cashflowAssumptions.years=7;
 assert.deepEqual(validateState(restored),restored);
 restored.cashflowAssumptions.years=11;
 assert.throws(()=>validateState(restored),/Cashflow/);
});
