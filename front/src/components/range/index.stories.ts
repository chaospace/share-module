import { Meta, StoryObj } from '@storybook/react';
import InputRange from '.';
import { variantArgTypes } from '@/stories/const';
import { fn } from '@storybook/test';

const meta = {
  title: 'components/InputRange',
  component: InputRange,
  args: {
    variant: 'default',
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    onInput: fn(),
    onChange: fn()
  },
  argTypes: {
    ...variantArgTypes
  }
} satisfies Meta<typeof InputRange>;
export default meta;

type Story = StoryObj<Meta>;

const InputRageBasic: Story = {
  args: {
    variant: 'primary',
    value: 0
  }
};

export { InputRageBasic };
