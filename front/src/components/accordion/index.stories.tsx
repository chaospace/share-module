import { variantOption } from '@/stories/const';
import Accordion from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Accordion',
  component: Accordion,
  args: {
    variant: 'primary',
    contentMaxHeight: 300
  },
  argTypes: {
    variant: {
      description: '컬러 variant',
      options: variantOption,
      control: { type: 'select' }
    }
  }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<Meta>;

const AccordionBasic: Story = {
  args: {
    variant: 'primary',
    contentMaxHeight: 300
  }
};

export { AccordionBasic };
