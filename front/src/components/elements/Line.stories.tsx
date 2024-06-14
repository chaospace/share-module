import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { HLine, VLine } from './Line';

const meta = {
  title: 'elements/Line',
  component: HLine,
  subcomponents: [VLine],
  parameters: {
    layout: 'centered'
  },
  args: {
    borderColor: '#ababab',
    borderStyle: 'solid',
    borderWidth: '2px'
  },
  argTypes: {
    borderStyle: {
      value: 'solid',
      options: ['dashed', 'solid', 'dotted'],
      control: { type: 'select' }
    }
  }
} satisfies Meta<typeof HLine>;

export default meta;

type Story = StoryObj<Meta>;

const HLineBasic: Story = {};

const VLineBasic: Story = {
  args: {
    height: '300px'
  },
  render(args) {
    return <VLine {...args} />;
  }
};

export { HLineBasic, VLineBasic };
