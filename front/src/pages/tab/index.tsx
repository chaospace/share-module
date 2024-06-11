import React from 'react';
import SimpleTab from '@/components/tab';
import styled from 'styled-components';
import { TempTypography } from '@/stories/elements';

const options = ['경제', '연애', '코믹/웹툰'];

const TabPanel = styled.div`
  position: relative;
  padding: 20px 16px;
  border: 1px solid #ababab;
  border-radius: 0 0 4px 4px;
  margin-top: -1px;
`;

function TabApp() {
  return (
    <SimpleTab options={options}>
      <TabPanel tabIndex={0}>
        <TempTypography />
      </TabPanel>
      <TabPanel hidden>탭내용2</TabPanel>
      <TabPanel hidden>탭내용3</TabPanel>
    </SimpleTab>
  );
}

export default TabApp;
