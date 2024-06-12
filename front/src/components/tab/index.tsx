import React, { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import { Container } from '@/components/elements/Container';
import { labelGetter, valueGetter } from '@/components/util';
import TabContextProvider from './TabContext';
import TabList from './TabList';
import Tab from './Tab';
import { StyleVariantProps } from 'styled';

interface SimpleTabProps extends StyleVariantProps {
  value?: string;
  options?: (string | { label: string; value: string })[];
  ItemRenderer?: FunctionComponent<PropsWithChildren<StyleVariantProps>>;
}

/**
 * 탭컴포넌트 options정보를 통해 탭버튼을 구성하고 동일한 value로 TabPanel을 설정하면 동작<br/>
 * TabPanel은 children속성을 통해 설정된 컴포넌트구조를 내부에서 다시 구성해 필요한 속성을 추가<br/>
 * @param {SimpleTabProps} params
 *
 */
function SimpleTab({
  options = [],
  ItemRenderer = undefined,
  value = '',
  variant = 'default',
  accentVariant = 'primary',
  children
}: PropsWithChildren<SimpleTabProps>) {
  const { provider, values } = useMemo(() => {
    const provider = options.map(o => ({ label: labelGetter(o), value: valueGetter(o) }));
    return {
      provider,
      values: provider.map(o => o.value)
    };
  }, [options]);

  return (
    <Container>
      <TabContextProvider value={value} values={values}>
        <TabList>
          {provider.map((o, idx) => {
            return ItemRenderer ? (
              <Tab variant={variant} accentVariant={accentVariant} key={idx} value={o.value}>
                <ItemRenderer variant={variant} accentVariant={accentVariant}>
                  {o.label}
                </ItemRenderer>
              </Tab>
            ) : (
              <Tab variant={variant} accentVariant={accentVariant} key={idx} {...o} />
            );
          })}
        </TabList>
        {children}
      </TabContextProvider>
    </Container>
  );
}
export type { SimpleTabProps };
export default SimpleTab;
