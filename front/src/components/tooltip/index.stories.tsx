import React from 'react';
import { variantArgTypes } from '@/stories/const';
import Tooltip, { TooltipProps } from '.';
import { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/elements/Button';
import Typography from '@/components/elements/Typography';
import { HBox, VBox } from '@/components/elements/Box';
import { Container } from '@/components/elements/Container';

const meta = {
  title: 'components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered'
  },
  args: {
    offset: '5',
    placement: 'top',
    title: '메시지',
    variant: 'default'
  },
  argTypes: {
    // @ts-ignore
    variant: {
      ...variantArgTypes.variant
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end'
      ]
    }
  }
} satisfies Meta<TooltipProps>;

export default meta;

type Story = StoryObj<Meta>;

const TooltipBasic: Story = {
  args: {
    title: '메시지 툴팁!',
    variant: 'info'
  },
  render({ title, placement, offset, variant, disableHover }) {
    return (
      <Tooltip
        title={title}
        placement={placement}
        offset={offset}
        variant={variant}
        disableHover={disableHover}>
        <Button>툴팁버튼</Button>
      </Tooltip>
    );
  }
};

const TooltipPlacement: Story = {
  argTypes: {
    title: {
      value: 'default',
      options: ['default', 'custom'],
      mapping: {
        default: '메시지',
        custom: (
          <React.Fragment>
            <Container maxWidth={300} wordWrap='word-break'>
              <Typography variant='subTitle1'>툴팁 메시지</Typography>
              <Typography>
                The grid-column-end CSS property specifies a grid item's end position within the
                grid column by contributing a line, a span, or nothing (automatic) to its grid
                placement, thereby specifying the block-end edge of its grid area.
              </Typography>
            </Container>
          </React.Fragment>
        )
      }
    }
  },
  render({ placement, title, ...rest }) {
    return (
      <VBox>
        <Typography variant='subTitle1'>툴팁 placement</Typography>
        <HBox justifyContent='space-between'>
          <Tooltip title={title} {...rest} placement='top-start'>
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip title={title} {...rest} placement='top'>
            <Button>top</Button>
          </Tooltip>
          <Tooltip title={title} {...rest} placement='top-end'>
            <Button>top-end</Button>
          </Tooltip>
        </HBox>
        <HBox justifyContent='space-between'>
          <VBox>
            <Tooltip title={title} {...rest} placement='left-start'>
              <Button>left-start</Button>
            </Tooltip>
            <Tooltip title={title} {...rest} placement='left'>
              <Button>left</Button>
            </Tooltip>
            <Tooltip title={title} {...rest} placement='left-end'>
              <Button>left-end</Button>
            </Tooltip>
          </VBox>
          <VBox alignItems='end'>
            <Tooltip title='right-start' {...rest} placement='right-start'>
              <Button>right-start</Button>
            </Tooltip>
            <Tooltip title='right' {...rest} placement='right'>
              <Button>right</Button>
            </Tooltip>
            <Tooltip title='right-end' {...rest} placement='right-end'>
              <Button>right-end</Button>
            </Tooltip>
          </VBox>
        </HBox>
        <HBox>
          <Tooltip title='bottom-start' {...rest} placement='bottom-start'>
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip title='bottom' {...rest} placement='bottom'>
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip title='bottom-end' {...rest} placement='bottom-end'>
            <Button>bottom-end</Button>
          </Tooltip>
        </HBox>
      </VBox>
    );
  }
};

export { TooltipBasic, TooltipPlacement };
