import assert from 'node:assert/strict';
import { calculateHexagram } from '@liuyao/core';
import { getRulesForFact } from '@liuyao/knowledge';

const result = calculateHexagram({ lines: [7, 7, 7, 7, 7, 7] });
assert.equal(result.primaryHexagramId, 'hexagram-01');

const relativeRules = getRulesForFact('line.relative');
assert.ok(relativeRules.some(rule => rule.id === 'rule-six-relative-classification'));
assert.ok(Object.isFrozen(relativeRules));
