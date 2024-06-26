import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { composeOptionItem, labelGetter, valueGetter } from './util';

const getPointDirection = (point: { x: number; y: number }, prev: { x: number; y: number }) => {
  const dx = point.x - prev.x;
  const dy = point.y - prev.y;

  const v = Math.max(Math.abs(dx), Math.abs(dy));
  const answer = { x: 0, y: 0 };
  if (v === Math.abs(dx)) {
    answer.x = dx > 0 ? -1 : 1;
  } else {
    answer.y = dy > 0 ? -1 : 1;
  }
  return answer;
};

const useMouseInfo = () => {
  const info = useRef({
    mouse: { x: 0, y: 0 },
    getPointDirection,
    direction: { x: 0, y: 0 }
  });
  useIsomorphicLayoutEffect(() => {
    const props = info.current;
    const onMove = (e: MouseEvent) => {
      if (props.mouse.x !== e.clientX || props.mouse.y !== e.clientY) {
        props.mouse.x = e.clientX;
        props.mouse.y = e.clientY;
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return info.current;
};

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

function useInit() {
  const initRef = useRef(false);
  if (initRef.current === false) {
    initRef.current = true;
    return false;
  }

  return initRef.current;
}

const useIsomorphicLayoutEffect = window === undefined ? useLayoutEffect : useEffect;

function useMount(handler: React.EffectCallback) {
  useEffect(handler, []);
}

function useWatch(handler: React.EffectCallback, deps?: React.DependencyList) {
  useEffect(handler, deps);
}

function useUnMount(handler: () => any) {
  useEffect(() => handler, []);
}

/**
 * prefers-color-scheme 테마 컬러 훅
 */
const PREFERS_COLOR = {
  DARK: 'dark',
  LIGHT: 'light'
};

const initializeThemeValue = () => {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let value = isDarkMode ? PREFERS_COLOR.DARK : PREFERS_COLOR.LIGHT;
  //스토리지에 저장 값 확인
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    value = storedTheme;
  }
  return value;
};

function useTheme() {
  const [theme, setThemeMode] = useState(initializeThemeValue());
  const toggleTheme = () => {
    const next = theme === PREFERS_COLOR.LIGHT ? PREFERS_COLOR.DARK : PREFERS_COLOR.LIGHT;
    localStorage.setItem('theme', next);
    setThemeMode(next);
  };

  return [theme, toggleTheme];
}

export {
  useRefSync,
  useRefForward,
  useListProvider,
  useInit,
  useIsomorphicLayoutEffect,
  useMount,
  useUnMount,
  useWatch,
  useMouseInfo,
  useTheme
};
