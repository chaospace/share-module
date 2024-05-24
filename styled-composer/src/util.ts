import { getOrReplaceValue } from './core';

const isNumber = (v: any) => typeof +v === 'number' && !isNaN(+v);

const marginInterpreter = (key: number | string, provider?: number[]) => {
  const nKey = Number(key);
  if (!isNumber(nKey)) {
    return getOrReplaceValue(key, provider, key);
  }
  const abs = Math.abs(nKey);
  const n = getOrReplaceValue(abs, provider, abs);
  return abs !== nKey ? n * -1 : n;
};

export { marginInterpreter };
