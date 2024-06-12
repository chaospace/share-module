import React, { useMemo } from 'react';
import { Container } from '../elements/Container';
import TabContextProvider from './TabContext';

const getValues = (children: any[]): string[] => {
  const values = children.map(o => o.props.value).filter(v => v);
  if (values.length) {
    return values;
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i].props.children) {
      return getValues(children[i].props.children);
    }
  }
  return [];
};

function Tabs({ value = '', children }: { value?: string; children: React.ReactNode }) {
  const values = useMemo(() => getValues(React.Children.toArray(children)), [children]);
  return (
    <Container>
      <TabContextProvider value={value} values={values}>
        {children}
      </TabContextProvider>
    </Container>
  );
}

export default Tabs;
