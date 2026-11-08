import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createTransferBudget} from '../lib/transfer-budget.mjs';

test('payload reservation refuses excess and resets only at the next time window',()=>{
 let time=0;const reserve=createTransferBudget({limit:100,periodMs:1000,now:()=>time});
 assert.equal(reserve(60).allowed,true);assert.equal(reserve(41).allowed,false);assert.equal(reserve(40).allowed,true);assert.equal(reserve(1).retryAfter,1);
 time=999;assert.equal(reserve(1).allowed,false);time=1000;assert.equal(reserve(100).allowed,true);assert.equal(reserve(-1).allowed,false);
});
