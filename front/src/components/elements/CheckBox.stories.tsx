import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';
import type { CheckBoxProps } from './CheckBox';
import { fireEvent, within, expect } from '@storybook/test';
import { sleep } from '../util';
import { useArgs } from '@storybook/preview-api';
import { variant } from '@/colors';
import { VariantCategory } from 'styled';

const variantKey = Object.keys(variant);

const meta = {
  title: 'elements/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    checked: false,
    value: '',
    children: null,
    variant: 'default'
  },
  argTypes: {
    variant: {
      options: variantKey
    }
  }
} satisfies Meta<CheckBoxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckBoxBasic: Story = {
  args: {
    children: '자동 로그인',
    checked: false,
    variant: 'default'
  }
};

export const CheckBoxChecked: Story = {
  args: {
    children: '자동 로그인',
    checked: true,
    variant: 'default'
  }
};

export const CheckBoxVariant: Story = {
  args: {
    children: '자동 로그인',
    checked: true
  },
  render: ({ checked }) => {
    const variantKey = Object.keys(variant);
    // const [{ checked }, updateArgs] = useArgs();
    return (
      <>
        {variantKey.map((o, idx) => {
          return (
            <CheckBox key={idx} checked={checked} variant={o as VariantCategory}>
              {o}
            </CheckBox>
          );
        })}
      </>
    );
  }
};

export const CheckBoxValue: Story = {
  args: {
    children: '과일배송',
    checked: false,
    value: '사과',
    variant: 'default'
  },
  render: () => {
    // eslint-disable-next-line
    const [{ value, checked, children }, updateArgs] = useArgs();
    return (
      <CheckBox checked={checked} value={value} onChange={() => updateArgs({ checked: !checked })}>
        {children}
      </CheckBox>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByLabelText('과일배송');
    const checkbox = canvas.getByRole('checkbox') as HTMLInputElement;
    await step('체크박스 클릭 시 checked상태가 토글한다.', async () => {
      expect(label).toBeInTheDocument();
      await sleep(200);
      const storeChecked = checkbox.checked;
      await fireEvent.click(label);
      await sleep(500);
      expect(storeChecked).toEqual(!checkbox.checked);
    });

    await step('value값은 사과이다.', async () => {
      expect(checkbox.value).toEqual('사과');
    });
  }
};
