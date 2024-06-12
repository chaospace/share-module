import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Container } from '@/components/elements/Container';
import { getPanelId, getTabId, useTabContext } from './TabContext';

const PanelWrapper = styled(Container)``;

function TabPanel({ value = '', children }: PropsWithChildren<{ value?: string }>) {
  const context = useTabContext();
  const panelId = getPanelId(context, value);
  const tabId = getTabId(context, value);
  if (context.values.indexOf(value) < 0) {
    throw new Error('유효하지 않은 탭 value값 입니다');
  }
  const selected = value === context.value;

  return (
    <PanelWrapper
      id={panelId}
      p={4}
      aria-labelledby={tabId}
      role='tabpanel'
      tabIndex={selected ? 0 : undefined}
      hidden={!selected}>
      {children}
    </PanelWrapper>
  );
}

export default TabPanel;
