import MenuBar from '@/components/menubar';
import { menuTree } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { variantOption } from '@/stories/const';

const meta = {
  title: 'components/menubar',
  component: MenuBar,
  args: {
    variant: 'default',
    provider: menuTree
  },
  argTypes: {
    variant: {
      options: variantOption,
      control: { type: 'select' }
    }
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
