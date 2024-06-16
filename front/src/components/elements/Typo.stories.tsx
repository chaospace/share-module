import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Caption, H, P, Span } from './Typography';

const meta = {
  title: 'elements/Typo',
  component: P,
  parameters: {
    docs: {
      description: {
        component: '자주 사용하는 텍스트 요소를 별도 컴포넌트로 분리해 사용하도록 제공'
      },
      extractArgTypes: () => {
        return null;
      }
    }
  },

  args: {
    children: 'React Styled Components'
  },
  argTypes: {
    children: {
      table: { disable: true }
    }
  }
} satisfies Meta<typeof P>;

export default meta;

type Story = StoryObj<Meta>;

const PText: Story = {
  args: {
    children: 'React Styled Components'
  }
};
const SpanText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'span태그 컴포넌트 as는 span으로 고정'
      }
    }
  },
  render: ({ children }) => {
    return <Span>{children}</Span>;
  }
};

const CaptionText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'span태그 컴포넌트 variant를 caption고정'
      }
    }
  },
  render: ({ children }) => {
    return <Caption>{children}</Caption>;
  }
};

const HText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'H태그 컴포넌트 as는 h1~h6을 권장'
      }
    }
  },
  render: ({ children }) => {
    return <H>{children}</H>;
  }
};

const SHText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'H태그에 variant를 subTitle설정'
      }
    }
  },
  render: ({ children }) => {
    return (
      <H variant='subTitle1' as='h3'>
        {children}
      </H>
    );
  }
};

export { PText, SpanText, CaptionText, HText, SHText };
