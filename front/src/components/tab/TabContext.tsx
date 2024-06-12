import React, { useId, useMemo, useState } from 'react';
import createReactContext from '@/components/createReactContext';

interface TabContext {
  value: string;
  values: string[];
  uniqueId: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
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
  const [_value, setValue] = useState(() => {
    const valueIndex = values.indexOf(value);
    return values[valueIndex >= 0 ? valueIndex : 0];
  });
  const context = useMemo(() => {
    const valueIndex = values.indexOf(_value);

    return {
      value: values[valueIndex],
      values,
      uniqueId,
      setValue
    };
  }, [_value, uniqueId, values, setValue]);
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
