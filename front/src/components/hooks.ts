import React, { useEffect, useMemo } from 'react';
import { composeOptionItem, labelGetter, valueGetter } from './util';

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

function useRefForward<T extends any>(refs: React.ForwardedRef<T>[]) {
  return useMemo(() => {
    if (refs.every(o => o === null)) {
      return null;
    }
    return (instance: T) => {
      refs.forEach(o => setRef(o, instance));
    };
  }, [refs]);
}

function useListProvider<T>(source: T[], getLabel = labelGetter, getValue = valueGetter) {
  return useMemo(() => {
    return source.map(o => composeOptionItem(o, getLabel, getValue));
  }, [source, getLabel, getValue]);
}

export { useRefSync, useRefForward, useListProvider };
