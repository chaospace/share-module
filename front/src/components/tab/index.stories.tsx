import React from 'react';
import { Meta } from '@storybook/react';
import TabPanel from './TabPanel';
import { TempTypography } from '@/stories/elements';
import Typography from '../elements/Typography';
import { TabPanelContainer } from './elements.style';
import Tabs from './Tabs';
import TabList from './TabList';
import Tab from './Tab';

const meta = {
  title: 'components/Tabs',
  component: Tabs,
  subcomponents: {
    // @ts-ignore
    Tab,
    // @ts-ignore
    TabPanel
  },
  args: {
    value: ''
  }
} satisfies Meta<typeof Tabs>;

export default meta;

const TabsBasic = {
  render: () => {
    return (
      <Tabs value='1'>
        <TabList>
          <Tab label='컴포넌트' value='1' />
          <Tab label='리액트' value='2' />
          <Tab label='웹툰/경제' value='3' />
        </TabList>
        <TabPanelContainer>
          <TabPanel value='1'>
            <Typography variant='title'>컴포넌트 타이틀</Typography>
            <TempTypography />
          </TabPanel>
          <TabPanel value='2'>
            <Typography variant='title'>리액트 타이틀</Typography>
            <Typography>
              화면의 일부 요소는 사용자의 입력에 따라 업데이트됩니다. 예를 들어 이미지 갤러리에서
              특정 이미지를 클릭하면 해당 이미지가 활성 상태가 됩니다. React에서는 시간에 따라
              변화하는 데이터를 state라고 합니다. state는 어떠한 컴포넌트에든 추가할 수 있으며
              필요에 따라 업데이트할 수도 있습니다. 이번 장에서는 상호작용을 다루는 컴포넌트를
              작성하고 state를 업데이트하며, 시간에 따라 화면을 갱신하는 방법에 대해서
              알아보겠습니다.
            </Typography>
          </TabPanel>
          <TabPanel value='3'>
            <Typography variant='title'>웹툰/경제 타이틀</Typography>
            <Typography>
              서양의 웹코믹은 한국 웹툰과 달리 생산자와 소비자 사이에 중간 도매업자(웹툰 플랫폼)이
              2010년대가 되어서야 등장했기 때문에 2010년대 초반까지는 아마추어적인 색체가 강했다.
              한국에서는 2000년대와 2010년대 초반 당시에는 네이버와 다음이 검색점유율 1, 2위를
              차지하는 등 야후가 대세를 점했다가 구글이 1위 포털자리를 차지해서 독주하고 있는
              미국과는 인터넷 사용환경이 많이 달랐고, 한국 포털사이트들이 웹툰의 시장성을 재빨리
              주목하여서 웹툰 연재시스템이 일찍부터 체계화 된반면에, 서양에서는 그런 역할을 할만한
              사이트가 없었다. 물론 러시아의 얀덱스, 일본의 야후 재팬, 2000년대 체코의 세즈남[16] 등
              몇몇 나라들은 구글이 압도적인 점유율을 가져가지는 못한곳도 몇곳있지만 이들나라에서도
              검색엔진들이 만화책을 판매하는 수준에 머물렀지, 별도의 만화서비스를 제공하려는 시도는
              없었다
            </Typography>
          </TabPanel>
        </TabPanelContainer>
      </Tabs>
    );
  }
};

/**
 * Tab에 variant를 이용한 스타일 적용
 */
const TabsTabVariant = {
  parameters: {
    docs: {
      description: {
        story: 'Tab에 variant를 이용한 스타일 적용'
      }
    }
  },
  render: () => (
    <Tabs value='1'>
      <TabList>
        <Tab label='컴포넌트' value='1' variant='info' />
        <Tab label='리액트' value='2' accentVariant='warning' />
        <Tab label='웹툰/경제' value='3' variant='success' />
      </TabList>
      <TabPanelContainer>
        <TabPanel value='1'>
          <Typography variant='title'>컴포넌트 타이틀</Typography>
          <TempTypography />
        </TabPanel>
        <TabPanel value='2'>
          <Typography variant='title'>리액트 타이틀</Typography>
          <Typography>
            화면의 일부 요소는 사용자의 입력에 따라 업데이트됩니다. 예를 들어 이미지 갤러리에서 특정
            이미지를 클릭하면 해당 이미지가 활성 상태가 됩니다. React에서는 시간에 따라 변화하는
            데이터를 state라고 합니다. state는 어떠한 컴포넌트에든 추가할 수 있으며 필요에 따라
            업데이트할 수도 있습니다. 이번 장에서는 상호작용을 다루는 컴포넌트를 작성하고 state를
            업데이트하며, 시간에 따라 화면을 갱신하는 방법에 대해서 알아보겠습니다.
          </Typography>
        </TabPanel>
        <TabPanel value='3'>
          <Typography variant='title'>웹툰/경제 타이틀</Typography>
          <Typography>
            서양의 웹코믹은 한국 웹툰과 달리 생산자와 소비자 사이에 중간 도매업자(웹툰 플랫폼)이
            2010년대가 되어서야 등장했기 때문에 2010년대 초반까지는 아마추어적인 색체가 강했다.
            한국에서는 2000년대와 2010년대 초반 당시에는 네이버와 다음이 검색점유율 1, 2위를
            차지하는 등 야후가 대세를 점했다가 구글이 1위 포털자리를 차지해서 독주하고 있는 미국과는
            인터넷 사용환경이 많이 달랐고, 한국 포털사이트들이 웹툰의 시장성을 재빨리 주목하여서
            웹툰 연재시스템이 일찍부터 체계화 된반면에, 서양에서는 그런 역할을 할만한 사이트가
            없었다. 물론 러시아의 얀덱스, 일본의 야후 재팬, 2000년대 체코의 세즈남[16] 등 몇몇
            나라들은 구글이 압도적인 점유율을 가져가지는 못한곳도 몇곳있지만 이들나라에서도
            검색엔진들이 만화책을 판매하는 수준에 머물렀지, 별도의 만화서비스를 제공하려는 시도는
            없었다
          </Typography>
        </TabPanel>
      </TabPanelContainer>
    </Tabs>
  )
};

export { TabsBasic, TabsTabVariant };
