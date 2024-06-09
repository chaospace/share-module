const debounce = (callback: Function, delay: number = 100) => {
  let debounceID: ReturnType<typeof setTimeout>;
  const _callback = (...args: any) => {
    clearTimeout(debounceID);
    debounceID = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
    return debounceID;
  };

  return _callback;
};

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const boolStringToBoolean = (v: string | null | undefined) => (v ?? '') === 'true';

const mockHandler = <T>(_: T) => {};

type Getter = (o: any) => string;
const valueGetter = (o: any) => o.value ?? o.label ?? o;
const labelGetter = (o: any) => o.label ?? o.value ?? o;
const composeOptionItem = (o: any, labelGetter: Getter, valueGetter: Getter) => {
  return { label: labelGetter(o), value: valueGetter(o) };
};

export {
  debounce,
  sleep,
  boolStringToBoolean,
  mockHandler,
  labelGetter,
  valueGetter,
  composeOptionItem
};
