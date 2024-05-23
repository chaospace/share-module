import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';
import { fireEvent, within, expect } from '@storybook/test';
import { sleep } from '../util';
import { useArgs } from '@storybook/preview-api';



const meta = {
    title: 'elements/CheckBox',
    component: CheckBox,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    args: {
        checked: false,
        value: '',
        children: null
    }
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;


export const CheckBoxBasic: Story = {
    args: {
        children: '자동 로그인',
        checked: false,
    }
}

export const CheckBoxChecked: Story = {
    args: {
        children: '자동 로그인',
        checked: true
    }
}


export const CheckBoxValue: Story = {
    args: {
        children: '과일배송',
        checked: false,
        value: '사과'
    },
    render: () => {
        // eslint-disable-next-line
        const [{ value, checked, children }, updateArgs] = useArgs();
        return (
            <CheckBox checked={ checked } value={ value } onChange={ () => updateArgs({ checked: !checked }) }>
                { children }
            </CheckBox>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const label = canvas.getByLabelText('과일배송');
        const checkbox = canvas.getByRole('checkbox');
        expect(label).toBeInTheDocument();
        await sleep(200);
        await fireEvent.click(label);
        await sleep(500);
        expect(checkbox).toBeChecked();
    }
}

