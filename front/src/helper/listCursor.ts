const createListCursor = <T>(source: T[]) => {
  const max = source.length;
  let current = 0;
  return {
    getCurrent() {
      return current;
    },
    setCurrent(n: number) {
      current = n;
      return current;
    },
    next() {
      current = current + 1 >= max ? current : current + 1;
      return current;
    },
    prev() {
      current = current - 1 < 0 ? current : current - 1;
      return current;
    }
  };
};

export default createListCursor;
