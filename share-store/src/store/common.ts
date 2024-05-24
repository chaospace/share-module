//타입 단언
const isFunc = (value: unknown): value is Function => typeof value === 'function';

const curriedSetter = <U>(key: string, next: U, prev: U) => {
  const answer = { [key]: isFunc(next) ? next(prev) : next };
  return answer;
};

const getNextState = <T>(next: T, prev: T) => {
  return isFunc(next) ? next(prev) : next;
};

export { curriedSetter, getNextState };
