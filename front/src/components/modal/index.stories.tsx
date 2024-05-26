import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SimpleModal from '.';
import Typography from '@/components/elements/Typography';

const Content = () => {
  return (
    <React.Fragment>
      <Typography>
        As a CSS utility component, the Typography component supports all system properties. You can
        use them as prop directly on the component. For example, here's how you'd add a margin-top
      </Typography>
      <Typography>
        아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™ 『버니 가든』의
        정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다
      </Typography>
      <Typography>
        As a CSS utility component, the Typography component supports all system properties. You can
        use them as prop directly on the component. For example, here's how you'd add a margin-top
      </Typography>
      <Typography>
        아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™ 『버니 가든』의
        정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다
      </Typography>
    </React.Fragment>
  );
};

const meta = {
  title: 'components/SimpleModal',
  component: SimpleModal,
  parameters: {
    docs: {
      story: {
        iframeHeight: 550,
        inline: false
      }
    }
  },
  args: {
    children: 'default'
  },
  argTypes: {
    children: {
      description: '모달 컨텐츠',
      type: 'React.ReactNode|null',
      options: ['default'],
      control: { type: 'select' },
      table: { readonly: true },
      mapping: {
        default: <Content />
      }
    }
  }
} satisfies Meta<typeof SimpleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalBasic: Story = {
  args: {
    title: '모달타이틀',
    children: 'default'
  }
};

export { ModalBasic };
