import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { useArgs } from '@storybook/preview-api';
import { fn } from '@storybook/test';

const meta = {
  title: 'elements/Box',
  component: Box,
  args: {
    position: 'relative',
    display: 'flex',
    gap: '0.5rem'
  },
  argTypes: {
    position: {
      table: { disable: true }
    },
    display: {
      description: 'display방식 flex고정',
      table: { disable: true }
    },
    flexDirection: {
      description: '자식요소 정렬 방향 설정',
      table: { disable: true }
    },
    gap: {
      description: '자식요소 사이 간격설정',
      options: ['2px', '4px', '8px', '12px', '20px'],
      control: {
        type: 'select'
      }
    }
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

const HBoxBasic: Story = {
  parameters: {
    docs: {
      description: {
        story: '수평 정렬 컨테이너'
      }
    }
  },
  args: {
    flexDirection: 'row',
    gap: '8px',
    onClick: fn()
  },
  argTypes: {
    onClick: {
      table: { disable: true }
    }
  },
  render: () => {
    // eslint-disable-next-line
    const [{ flexDirection, onClick, gap }, _] = useArgs();
    return (
      <Box flexDirection={flexDirection} gap={gap} onClick={onClick}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Box>
    );
  }
};

const VBoxBasic: Story = {
  args: {
    flexDirection: 'column',
    gap: '8px'
  },
  parameters: {
    docs: {
      description: {
        story: '수직 정렬 컨테이너'
      }
    }
  },
  render: () => {
    // eslint-disable-next-line
    const [{ flexDirection, gap }, _] = useArgs();
    return (
      <Box flexDirection={flexDirection} gap={gap}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Box>
    );
  }
};

export { HBoxBasic, VBoxBasic };
