import React, { useMemo } from 'react';
import { Container } from '../elements/Container';
import TabContextProvider from './TabContext';
import { getValidChildren } from '@/styles/utils';

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

/**
 * 탭 컴포넌트<br/>
 * Tab과 TabPanel을 이용해 구성하면 내부에서 Provider를 이용해 선택 패널을 보여주는 방식으로 구성<br/>
 *
 * @param {string} value 포커싱 탭 value값
 *
 */
function Tabs({ value = '', children }: { value?: string; children: React.ReactNode }) {
  const values = useMemo(() => getValues(getValidChildren(children)), [children]);
  return (
    <Container>
      <TabContextProvider value={value} values={values}>
        {children}
      </TabContextProvider>
    </Container>
  ) as React.ReactNode;
}

export default Tabs;
