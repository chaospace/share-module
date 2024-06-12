import React, { FunctionComponent, PropsWithChildren, useMemo, useState } from 'react';
import { Container } from '@/components/elements/Container';
import { labelGetter, valueGetter } from '@/components/util';
import TabContextProvider from './TabContext';
import TabList from './TabList';
import Tab from './Tab';

interface SimpleTabProps {
  value?: string;
  options?: (string | { label: string; value: string })[];
  ItemRenderer?: FunctionComponent<{ label: string; value: string }>;
}

function SimpleTab({
  options = [],
  ItemRenderer = undefined,
  value = '',
  children
}: PropsWithChildren<SimpleTabProps>) {
  const { provider, values } = useMemo(() => {
    const provider = options.map(o => ({ label: labelGetter(o), value: valueGetter(o) }));
    return {
      provider,
      values: provider.map(o => o.value)
    };
  }, [options]);

  const [selectedValue, setSelected] = useState(value);

  const TabComponent = ItemRenderer || Tab;

  return (
    <TabContextProvider value={selectedValue} values={values}>
      <Container>
        <TabList onChange={v => setSelected(v)}>
          {provider.map((o, idx) => {
            return <TabComponent key={idx} {...o} />;
          })}
        </TabList>
        {children}
      </Container>
    </TabContextProvider>
  );
}

export default SimpleTab;
