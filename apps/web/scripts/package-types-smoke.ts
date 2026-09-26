import { calculateHexagram } from '@liuyao/core';
import { getRulesForFact } from '@liuyao/knowledge';

const result = calculateHexagram({ lines: [7, 7, 7, 7, 7, 7] });
const primaryHexagramId: typeof result.primaryHexagramId = result.primaryHexagramId;
const relativeRules = getRulesForFact('line.relative');

void primaryHexagramId;
void relativeRules;
