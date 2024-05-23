import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { useArgs } from '@storybook/preview-api';
import { fn } from '@storybook/test';

const meta = {
  title: 'elements/Box',
  component: Box,
  args: {
    gap: '0.5rem',
    position: 'relative',
    display: 'flex',
    onClick: fn()
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

const HBoxBasic: Story = {
  args: {
    flexDirection: 'row',
    onClick: fn()
  },
  render: () => {
    // eslint-disable-next-line
    const [{ flexDirection, onClick }, _] = useArgs();
    return (
      <Box flexDirection={flexDirection} onClick={onClick}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Box>
    );
  }
};

const VBoxBasic: Story = {
  args: {
    flexDirection: 'column'
  },
  render: () => {
    // eslint-disable-next-line
    const [{ flexDirection }, _] = useArgs();
    return (
      <Box flexDirection={flexDirection}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Box>
    );
  }
};

export { HBoxBasic, VBoxBasic };
