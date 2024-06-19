/**
 * @jest-environment jsdom
 */

import { act, render } from '@testing-library/react';
import React, { useMemo, useSyncExternalStore } from 'react';

// 전역에 있는 정보가 변경되면 훅을 통해 동일 컴포넌트가 갱신될거라 생각했는데
// 각 컴포넌트는 전역상태를 공유하는게 아니라 각 컴포넌트에 상태만 공유됨..
// 뭐지..?

const TodoStore = () => {
  let listeners: (() => void)[] = [];
  let todos: number[] = [];
  let zindex = 1000;

  const notify = () => {
    listeners.forEach(o => {
      o();
    });
  };

  return {
    create() {
      const n = ++zindex;
      todos = [...todos, n];
      notify();
      return n;
    },
    subscribe(fn: () => void) {
      listeners.push(fn);
      return () => {
        console.log('unsub-');
        listeners = listeners.filter(f => f !== fn);
      };
    },
    getState() {
      return todos;
    }
  };
};

let store: ReturnType<typeof TodoStore>;

const Foo = (props: any) => {
  const max = useSyncExternalStore(store.subscribe, store.getState);
  const v = useMemo(() => store.create(), []);

  const active = useMemo(() => v === max[max.length - 1], [v, max]);

  console.log('max', max, v, active);
  return (
    <>
      <label data-testid='label'>{max}</label>
      <input role='textbox' type='text' defaultValue={v} />
      <button onClick={() => store.create()}>create</button>
    </>
  );
};
beforeEach(() => {
  store = TodoStore();
});
it('useExternalStore테스트', async () => {
  const result = render(
    <React.Fragment>
      <Foo />
      <Foo />
      <Foo />
    </React.Fragment>
  );
  const button = result.getAllByRole('button');
  // await fireEvent.click(button[0]);
  // const input = result.getByRole('textbox') as HTMLInputElement;
  // console.log(input.defaultValue, 'label', label.textContent);
});
