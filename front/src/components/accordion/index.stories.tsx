import React from 'react';
import { variantOption } from '@/stories/const';
import Accordion from '.';
import { Meta, StoryObj } from '@storybook/react';
import { AccordionPanel } from './elements.style';
import { VBox } from '../elements/Box';
import { TempTypography } from '@/stories/elements';
import Input from '../elements/Input';

const meta = {
  title: 'components/Accordion',
  component: Accordion,
  args: {
    select: '',
    variant: 'primary',
    contentMaxHeight: 300
  },
  argTypes: {
    variant: {
      description: '컬러 variant',
      options: variantOption,
      control: { type: 'select' }
    },
    select: {
      table: { readonly: true },
      options: ['테스트', '아코디언2', '샘플 타이틀'],
      control: { type: 'select' }
    }
  }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<Meta>;

const AccordionBasic: Story = {
  args: {
    select: '샘플 타이틀',
    variant: 'primary',
    contentMaxHeight: 300
  },
  render: ({ variant, select, contentMaxHeight }) => {
    return (
      <Accordion variant={variant} contentMaxHeight={contentMaxHeight} select={select}>
        <AccordionPanel label='테스트'>
          <VBox p={20}>
            <Input type='text' />
            <Input type='tel' />
            <Input type='url' />
            <Input type='search' />
            <Input type='text' />
            <Input type='tel' />
            <Input type='url' />
            <Input type='search' />
          </VBox>
        </AccordionPanel>
        <AccordionPanel label='아코디언2'>
          <VBox p={20}>
            <Input type='text' />

            <Input type='tel' />

            <Input type='url' />

            <Input type='search' />
            <Input type='text' />

            <Input type='tel' />

            <Input type='url' />

            <Input type='search' />
          </VBox>
        </AccordionPanel>
        <AccordionPanel label='샘플 타이틀'>
          <TempTypography p={20} />
        </AccordionPanel>
      </Accordion>
    );
  }
};

export { AccordionBasic };
