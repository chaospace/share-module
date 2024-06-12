import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { variantArgTypes } from '@/stories/const';
import SimpleTab from '.';
import TabPanel from './TabPanel';
import { TempTypography } from '@/stories/elements';
import Typography from '../elements/Typography';
import { CustomTabButton, TabPanelContainer } from './elements.style';

const CustomTabRenderer = ({ label, value, ...rest }: any) => {
  return (
    <CustomTabButton role='button' value={value} {...rest}>
      <span>{label}</span>
    </CustomTabButton>
  );
};

const meta = {
  title: 'components/SimpleTab',
  component: SimpleTab,
  args: {
    value: '',
    options: ['인사말', '연혁', '웹툰', '영화'],
    variant: 'default',
    accentVariant: 'primary'
  },
  // @ts-ignore
  argTypes: {
    ...variantArgTypes,
    ItemRenderer: {
      value: 'default',
      control: { type: 'select' },
      options: ['default', 'custom'],
      mapping: {
        default: () => undefined,
        custom: CustomTabRenderer
      }
    }
  }
} satisfies Meta<typeof SimpleTab>;

export default meta;

type Story = StoryObj<typeof meta>;

const SimpleTabBasic: Story = {
  render: args => {
    return (
      <SimpleTab {...args}>
        <TabPanelContainer>
          {args.options?.map((o, idx) => {
            const v = o as string;
            return (
              <TabPanel key={idx} value={v}>
                <Typography variant='title'>{v}</Typography>
                <TempTypography />
              </TabPanel>
            );
          })}
        </TabPanelContainer>
      </SimpleTab>
    );
  }
};

export { SimpleTabBasic };
