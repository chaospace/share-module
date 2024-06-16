import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';
import { HBox, VBox } from './Box';

//
const meta = {
  title: 'elements/Typography',
  component: Typography,
  argTypes: {
    variant: {
      value: 'title',
      options: ['title', 'subTitle1', 'subTitle2', 'body', 'caption'],
      control: { type: 'select' }
    },
    children: {
      value: '퓨리오사 사가'
    },
    color: {
      control: { type: 'color' }
    },
    fontSize: {
      options: [8, 12, 16, 20, 24, 28, 32, 40],
      control: { type: 'select' },
      value: 7
    }
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<Meta>;

const TypoTitle: Story = {
  args: {
    variant: 'title',
    children: '퓨리오사 사가',
    color: 'black'
  }
};

const TypoVariant: Story = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    return (
      <VBox>
        <HBox alignItems='center'>
          <label>title</label>
          <Typography variant='title'>퓨리오사 사가</Typography>
        </HBox>
        <HBox alignItems='center'>
          <label>subTitle1</label>
          <Typography variant='subTitle1'>매드맥스 스리즈의 스핀오프</Typography>
        </HBox>
        <HBox alignItems='center'>
          <label>subTitle2</label>
          <Typography variant='subTitle2'>매드맥스: 분노의 도로 후속</Typography>
        </HBox>
        <HBox alignItems='center'>
          <label>body</label>
          <Typography>
            퓨리오사가 기름을 빼먹다가 납치당한다. 이를 본 디멘투스 일당이 화가 나 디멘투스에게
            보내려고 한다. 결국 디멘투스에게 붙잡히게 된 퓨리오사. 퓨리오사와 디멘투스가 차를 타며
            세기의 대결하게 된다.
          </Typography>
        </HBox>
        <HBox alignItems='center'>
          <label>caption</label>
          <Typography variant='caption'>
            인간과 기계의 ‘몸’을 이해하는 최고수의 액션, 그러나 특별함을 잃은 영화
          </Typography>
        </HBox>
      </VBox>
    );
  }
};

export { TypoTitle, TypoVariant };
