const debounce = (callback: Function, delay: number = 100) => {
  let debounceID: ReturnType<typeof setTimeout>;
  const _callback = (...args: any) => {
    clearTimeout(debounceID);
    debounceID = setTimeout(() => {
      callback(args);
    }, delay);
    return debounceID;
  };

  return _callback;
};

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const boolStringToBoolean = (v: string | null | undefined) => (v ?? '') === 'true';

export { debounce, sleep, boolStringToBoolean };
