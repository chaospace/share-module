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

export { debounce, sleep, boolStringToBoolean, mockHandler };
