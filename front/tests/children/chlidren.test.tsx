/**
 * @jest-environment jsdom
 */

import { sleep } from '@/components/util';
import ChildrenApp from '@/pages/children';
import { fireEvent, getByTestId, getByText, render } from '@testing-library/react';
import { useCallback, useRef, useState } from 'react';

it.only('children속성 테스트', () => {
  const result = render(<ChildrenApp />);
  console.log(result.container);
});

it('callback호출방법 테스트', async () => {
  const useEventCallback = (fn: any, deps: any[]) => {
    const refs = useRef(fn);
    const refDeps = useRef(deps);
    console.log('useEventCallback호출');
    //effect나 메모를 이용하면 시점이 늦어진다.
    ((fn, deps) => {
      console.log('참조비교!!');
      if (refs.current !== fn || JSON.stringify(deps) !== JSON.stringify(refDeps.current)) {
        refs.current = fn;
        console.log('참조 갱신!');
      }
    })(fn, deps);

    return useCallback((...args: any) => {
      return refs.current(...args);
    }, []);
  };

  const FooExample = () => {
    const [count, setCount] = useState(0);

    const callback = useEventCallback(
      (n: number) => {
        console.log('callback-count', count);
        return n + 1;
      },
      [count]
    );

    const r = callback(count);
    // console.log('count', count, 'r', r);
    return (
      <>
        <span data-testid='label'>{r}</span>
        <button onClick={() => setCount(count + 1)}>foo</button>
        <button onClick={() => console.log('next-call', callback(~~(Math.random() * 20)))}>
          next
        </button>
      </>
    );
  };

  //상태를 변경할 경우만 훅을 갱신하는 처리를 한다.
  //정의된 함수를 이용하는 경우는 변경이 없음.
  const { container } = render(<FooExample />);

  const countButton = getByText(container, 'foo');
  const label = getByTestId(container, 'label');
  const nextButton = getByText(container, 'next');
  expect(label.textContent).toEqual('1');
  fireEvent.click(countButton);
  expect(label.textContent).toEqual('2');

  fireEvent.click(nextButton);
  await sleep(300);
  fireEvent.click(nextButton);
});
