import type { StoryObj, Meta } from '@storybook/react';
import Input, { InputProps } from './Input';
import { within, expect, userEvent } from '@storybook/test';


const meta = {
    title: 'elements/Input',
    component: Input,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['stable']
} satisfies Meta<InputProps>;


export default meta;

type Story = StoryObj<typeof meta>;

export const InputBasic: Story = {
    args: {
        placeholder: 'test-input',
        type: 'text'
    },
    play: async ({ canvasElement }) => {
        const ue = userEvent.setup();
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('test-input');
        expect(input).toBeInTheDocument();
        // focus는 엘리먼트에 직접 적용
        input.focus();
        expect(input).toHaveFocus();
        await ue.type(input, 'chaospace');
    }
}