import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SimpleModal, { ModalFooterProps } from '.';
import Typography from '@/components/elements/Typography';
import { fn } from '@storybook/test';
import Button from '../elements/Button';

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

const AFooter = ({ onSubmit, onClick }: ModalFooterProps) => {
  return (
    <>
      <Button variant='danger'>닫기</Button>
      <Button onClick={onClick}>이전</Button>
      <Button variant='info' onClick={onSubmit}>
        다음
      </Button>
    </>
  );
};

const FormFooter = ({ onSubmit, onClick }: ModalFooterProps) => {
  return (
    <>
      <Button variant='danger' onClick={onClick}>
        닫기
      </Button>
      <Button variant='info' type='reset'>
        리셋
      </Button>
      <Button variant='primary' onClick={onSubmit}>
        저장
      </Button>
    </>
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
    children: 'default',
    onClose: fn()
  },
  argTypes: {
    children: {
      description: '모달 컨텐츠',
      type: 'object',
      options: ['default'],
      control: { type: 'select' },
      table: { readonly: true },
      mapping: {
        default: <Content />
      }
    },
    FooterContent: {
      type: 'object',
      options: ['a', 'b'],
      control: { type: 'select' },
      mapping: {
        a: (props: ModalFooterProps) => <AFooter {...props} />,
        b: (props: ModalFooterProps) => <FormFooter {...props} />
      }
    },
    footerAlign: {
      type: 'string',
      options: ['start', 'center', 'end'],
      control: { type: 'select' }
    }
  }
} satisfies Meta<typeof SimpleModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalBasic: Story = {
  args: {
    title: '알림',
    children: 'default'
  }
};

export { ModalBasic };
