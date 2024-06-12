import React, { useId, useMemo } from 'react';
import createReactContext from '../createReactContext';

interface TabContext {
  value: string;
  values: string[];
  uniqueId: string;
}
const [useTabContext, Provider] = createReactContext<TabContext>();

function TabContextProvider({
  value,
  values,
  children
}: {
  value: string;
  values: string[];
  children: React.ReactNode;
}) {
  const uniqueId = useId();

  const context = useMemo(() => {
    const valueIndex = values.indexOf(value);
    const activeIndex = valueIndex >= 0 ? valueIndex : 0;
    return {
      value: values[activeIndex],
      values,
      uniqueId
    };
  }, [value, uniqueId, values]);
  return (
    <React.Fragment>
      <Provider value={context}>{children}</Provider>
    </React.Fragment>
  );
}

const getPanelId = (context: TabContext, value: string) => {
  const { uniqueId } = context;
  return `panel-${uniqueId}-${value}`;
};

const getTabId = (context: TabContext, value: string) => {
  const { uniqueId } = context;
  return `tab-${uniqueId}-${value}`;
};

/** tabContext 선택된 value값을 하위 컴포넌트에서 이용할 때 이용 */
export { useTabContext, getTabId, getPanelId };
export default TabContextProvider;
