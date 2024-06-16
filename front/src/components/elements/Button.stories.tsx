import React from 'react';
import { variantArgTypes } from '@/stories/const';
import Button from './Button';
import { Meta, StoryObj } from '@storybook/react';
import { HBox, VBox } from './Box';

const meta: any = {
  title: 'elements/Button',
  component: Button,
  args: {
    variant: 'default',
    disableBackground: false
  },
  argTypes: {
    // @ts-ignore
    variant: variantArgTypes.variant
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<Meta>;

const ButtonBasic: Story = {
  args: {
    children: '버튼'
  }
};

const ButtonVariant: Story = {
  render: () => {
    return (
      <VBox>
        <HBox>
          <Button>Button</Button>
          <Button disableBackground>Button</Button>
          <Button variant='info'>Button</Button>
          <Button variant='info' disableBackground>
            Button
          </Button>

          <Button variant='primary'>Button</Button>
          <Button variant='primary' disableBackground>
            Button
          </Button>
        </HBox>
        <HBox>
          <Button variant='success'>Button</Button>
          <Button variant='success' disableBackground>
            Button
          </Button>
          <Button variant='warning'>Button</Button>
          <Button variant='warning' disableBackground>
            Button
          </Button>

          <Button variant='danger'>Button</Button>
          <Button variant='danger' disableBackground>
            Button
          </Button>
        </HBox>
      </VBox>
    );
  }
};

export { ButtonBasic, ButtonVariant };
