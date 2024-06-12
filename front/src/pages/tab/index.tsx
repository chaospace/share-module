import React, { useState } from 'react';
import SimpleTab from '@/components/tab';
import styled from 'styled-components';
import { TempTypography } from '@/stories/elements';
import TabPanel from '@/components/tab/TabPanel';
import { PropsWithHTMLAttributes } from '@/components/types';
import { TabProps } from '@/components/tab/Tab';
import { HBox, VBox } from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import Switch from '@/components/elements/Switch';

const options = ['경제', '연애', '코믹/웹툰'];

const TabPanelBox = styled.div`
  position: relative;
  border: 1px solid #ababab;
  border-radius: 0 0 4px 4px;
  margin-top: -1px;
`;

const CustomTabButton = styled.div.withConfig({
  shouldForwardProp: prop => !['value'].includes(prop)
})<{ value?: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: #ababab;
  &:hover,
  &[aria-selected='true'] {
    background-color: lightblue;
    span {
      border-bottom-color: #f50;
    }
  }
  span {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 1px solid;
  }
`;

const CustomTab = ({
  label,
  value,
  ...rest
}: React.PropsWithoutRef<PropsWithHTMLAttributes<'div', TabProps>>) => {
  return (
    <CustomTabButton role='button' value={value} {...rest}>
      <span>{label}</span>
    </CustomTabButton>
  );
};

function TabApp() {
  const [checked, setChecked] = useState(false);
  return (
    <VBox>
      <Typography variant='title'>탭 컴포넌트 샘플</Typography>
      <Typography>ItemRender속성을 통해 탭버튼 커스컴 제공</Typography>
      <HBox>
        <Switch
          variant='info'
          value='사용'
          checked={checked}
          onChange={e => {
            setChecked(e.target.checked);
          }}>
          랜더러변경
        </Switch>
      </HBox>
      <SimpleTab options={options} ItemRenderer={checked ? CustomTab : undefined}>
        <TabPanelBox>
          <TabPanel value='경제'>
            <TempTypography />
          </TabPanel>
          <TabPanel value='연애'>탭내용2</TabPanel>
          <TabPanel value='코믹/웹툰'>탭내용3</TabPanel>
        </TabPanelBox>
      </SimpleTab>
    </VBox>
  );
}

export default TabApp;
