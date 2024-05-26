import React from 'react';
import CheckBoxGroup from './CheckBoxGroup';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import Button from '@/components/elements/Button';

const defaultOptions = Array.from({ length: 4 }).map((_, idx) => {
  return {
    label: `옵션-${idx}`,
    value: `선택-${idx}`
  };
});

/**
 * 그룹체크박스 스토리
 */
const meta = {
  title: 'elements/CheckBoxGroup',
  component: CheckBoxGroup,
  args: {
    options: [],
    onChange: fn()
  },
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CheckBoxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const CheckBoxGroupBasic: Story = {
  args: {
    options: defaultOptions
  }
};

const tempSelected = defaultOptions.map(o => ({ ...o }));
Object(tempSelected[1]).selected = true;
Object(tempSelected[5]).selected = true;
const CheckBoxWithSelected: Story = {
  args: {
    options: tempSelected
  }
};

/**
 * 초기 selected상태 전달
 */

const CheckBoxWithChangeOptions: Story = {
  args: {
    options: defaultOptions
  },
  render: () => {
    // eslint-disable-next-line
    const [{ options }, updateArgs] = useArgs();
    const generateOpt = () => {
      const next = Array.from({ length: ~~(Math.random() * 7) }).map((_, idx) => ({
        label: `옵션-${idx}`,
        value: `선택-${idx}`,
        selected: Math.random() > 0.5
      }));
      updateArgs({ options: next });
    };

    return (
      <>
        <CheckBoxGroup options={options} onChange={fn()} />
        <Button onClick={generateOpt}>옵션 변경</Button>
      </>
    );
  }
};

export { CheckBoxGroupBasic, CheckBoxWithSelected, CheckBoxWithChangeOptions };
