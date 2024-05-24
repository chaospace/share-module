import type { Meta, StoryObj } from '@storybook/react';
import AutoComplete from '.';
import { within, fireEvent, expect } from '@storybook/test';
import { sleep } from '../util';

const provider = Array.from({ length: 20 }).map((_, idx) => ({ label: `옵션-${idx}` }));

const meta = {
  title: 'front/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    options: provider,
    defaultValue: '옵션-4'
  }
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ComboBasic: Story = {
  args: {
    options: provider
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByTestId('combobox');
    const listbox = canvas.getByTestId('listbox');
    // component
    await step('기본 리스트 접근', async () => {
      await sleep(1000);
      combobox.focus();
      // await sleep(1000);
      expect(combobox).toHaveFocus();
      await sleep(1000);
      expect(listbox.ariaExpanded).toEqual('true');
    });

    await step('listbox는 스크롤 가능하다.', async () => {
      // listbox는 스크롤 가능하다.
      expect(listbox.scrollHeight).toBeGreaterThan(listbox.clientHeight);
    });

    await step('key이벤트로 목록이동이 가능하고 영역을 벗어날 경우 스크롤이 된다.', async () => {
      const listBounding = listbox.getBoundingClientRect();

      fireEvent.keyDown(combobox, {
        keyCode: 40,
        charCode: 40,
        key: 'ArrowDown',
        code: 'ArrowDown'
      });
      await sleep(200);
      let activeOption = listbox.querySelector('[data-current=true]');
      expect(activeOption).toBeInTheDocument();
      let bounding = activeOption?.getBoundingClientRect();
      expect(bounding?.top).not.toEqual(listBounding.top);
      expect(bounding?.bottom).not.toEqual(listBounding.bottom);
      fireEvent.keyDown(combobox, {
        keyCode: 40,
        charCode: 40,
        key: 'ArrowDown',
        code: 'ArrowDown'
      });
      await sleep(200);
      fireEvent.keyDown(combobox, {
        keyCode: 40,
        charCode: 40,
        key: 'ArrowDown',
        code: 'ArrowDown'
      });
      await sleep(200);
      fireEvent.keyDown(combobox, {
        keyCode: 40,
        charCode: 40,
        key: 'ArrowDown',
        code: 'ArrowDown'
      });
      await sleep(200);
      activeOption = listbox.querySelector('[data-current=true]');
      bounding = activeOption?.getBoundingClientRect();
      expect(bounding?.top).not.toEqual(listBounding.top);
      await sleep(200);
      // 선택요소가 리스트영역보다 밑에 있을 경우 스크롤위치 이동처리.
      if (bounding!.bottom > listBounding.bottom) {
        listbox.scrollTo(0, bounding!.bottom - listBounding.bottom);
      }
    });
  }
};
