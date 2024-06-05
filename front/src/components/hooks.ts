import React, { useEffect, useMemo } from 'react';

const setRef = <T extends any = any>(ref: React.ForwardedRef<T>, instance: T) => {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(instance);
  } else {
    ref.current = instance;
  }
};

function useRefSync<T extends any>(ref: React.ForwardedRef<T>) {
  const innerRef = React.useRef<T>(null);
  useEffect(() => {
    setRef(ref, innerRef.current);
  });
  return innerRef;
}

function useRefGroupSync<T extends any>(refs: React.ForwardedRef<T>[]) {
  return useMemo(() => {
    if (refs.every(o => o === null)) {
      return null;
    }
    return (instance: T) => {
      refs.forEach(o => setRef(o, instance));
    };
  }, [refs]);
}

export { useRefSync, useRefGroupSync };
