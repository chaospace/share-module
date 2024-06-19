type TFunc = (...args: any) => any;
import { toParams } from '@/styles/utils';
const pipe = <T extends TFunc, U extends TFunc[], L extends TFunc>(...fns: [T, ...U, L]) => {
  return (...args: Parameters<T>): ReturnType<L> => {
    return fns.reduce((v, fn) => fn(...toParams(v)), args as any);
  };
};

it('함수 파이프 테스트', () => {
  const sum = (a: number, b: number) => a + b;
  const ab = (s: number) => 'sum: ' + s.toString();
  const pipeSum = pipe(sum, ab);
  const answer = pipeSum(10, 20);
  expect(answer).toEqual('sum: 30');
});
