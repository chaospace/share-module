import MenuBar from '@/components/menubar';
import { menuTree } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { variantArgTypes } from '@/stories/const';

const meta = {
  title: 'components/menubar',
  component: MenuBar,
  args: {
    variant: 'default',
    provider: menuTree
  },
  // @ts-ignore
  argTypes: {
    ...variantArgTypes
  }
} satisfies Meta<typeof MenuBar>;

export default meta;

type Story = StoryObj<Meta>;

const MenubarBasic: Story = {
  args: {
    variant: 'default'
  }
};

export { MenubarBasic };
