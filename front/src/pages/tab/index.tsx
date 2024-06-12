import React, { PropsWithChildren, useState } from 'react';
import SimpleTab from '@/components/tab';
import styled from 'styled-components';
import { TempTypography } from '@/stories/elements';
import TabPanel from '@/components/tab/TabPanel';
import Tab from '@/components/tab/Tab';
import { HBox, VBox } from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import Switch from '@/components/elements/Switch';
import { TabPanelContainer, TabWrapper } from '@/components/tab/elements.style';
import Tabs from '@/components/tab/Tabs';
import TabList from '@/components/tab/TabList';
import { StyleVariantProps } from 'styled';

const options = ['경제', '연애', '코믹/웹툰'];

const CustomTabButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: #ababab;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;

  ${TabWrapper}:hover &,
  ${TabWrapper}[aria-selected='true'] & {
    background-color: lightblue;
  }

  ${TabWrapper}:focus &,
  ${TabWrapper}:focus-within & {
    border: 1px solid darkblue;
    border-bottom-color: #f50;
  }
`;

const CustomTab = ({
  children,
  ...rest
}: React.PropsWithoutRef<PropsWithChildren<StyleVariantProps>>) => {
  return <CustomTabButton {...rest}>{children}</CustomTabButton>;
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
        <TabPanelContainer>
          <TabPanel value='경제'>
            <TempTypography />
          </TabPanel>
          <TabPanel value='연애'>탭내용2</TabPanel>
          <TabPanel value='코믹/웹툰'>탭내용3</TabPanel>
        </TabPanelContainer>
      </SimpleTab>
      <Tabs>
        <TabList>
          <Tab value='1' label='탭이름' />
          <Tab value='2' label='탭이름2' />
        </TabList>
        <TabPanelContainer>
          <TabPanel value='1'>탭내용</TabPanel>
          <TabPanel value='2'>탭내용2</TabPanel>
        </TabPanelContainer>
      </Tabs>
    </VBox>
  );
}

export default TabApp;
