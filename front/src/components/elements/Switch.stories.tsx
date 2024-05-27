import { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';
import { fn } from '@storybook/test';

const meta = {
  title: 'elements/Switch',
  component: Switch,
  argTypes: {
    variant: {
      description: '스위치 테마 컬러',
      options: ['default', 'info', 'success', 'warning', 'success', 'danger'],
      control: { type: 'select' },
      value: 'default'
    },
    children: {
      description: '라벨 텍스트'
    },
    value: {
      description: '스위치 온 시 value값'
    },
    onChange: {
      description: '스위치 상태 변경 핸들러 함수',
      value: fn()
    }
  }
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const SwitchBasic: Story = {
  args: {
    children: '라벨',
    value: '포켓몬',
    onChange: fn()
  }
};

export { SwitchBasic };
