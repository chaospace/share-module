import { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';

const meta = {
  title: 'elements/RadioGroup',
  component: RadioGroup,
  args: {
    options: ['바나나', '귤', '사과', '배', '감']
  },
  argTypes: {
    variant: {
      value: 'default',
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      control: { type: 'select' }
    }
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const RadioGroupBasic: Story = {
  args: {
    defaultValue: '감'
  }
};

export { RadioGroupBasic };
