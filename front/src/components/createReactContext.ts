import React from 'react';
const createReactContext = <T>() => {
  const context = React.createContext<T>(null as T);
  function useReactContext() {
    const c = React.useContext(context);
    if (!c) throw new Error('컨텍스트 사용은 provider안에 있어야 합니다.');
    return c;
  }
  return [useReactContext, context.Provider] as const;
};

export default createReactContext;
