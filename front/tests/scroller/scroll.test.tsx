/**
    @jest-environment jsdom
*/

import styled from 'styled-components';
import 'jest-styled-components';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { fireEvent, render } from '@testing-library/react';

const ListContainer = styled.ul`
  position: relative;
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 0.25rem;
  background-color: white;
`;
const ListItem = styled.li`
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const _isScrollAble = (ele: HTMLElement) => {
  return ele && ele.clientHeight > ele.scrollHeight;
};

function OptionList({ options, defaultValue = '' }: any) {
  const [value, _] = useState<string>(defaultValue);
  const [currentIndex, setCurrentIndex] = useState<number>(
    options.findIndex((o: any) => o.label === defaultValue)
  );
  const eleRef = useRef<HTMLUListElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const { key } = e;
    console.log('key', key);
    switch (key) {
      case 'ArrowUp':
        setCurrentIndex(prev => {
          if (prev - 1 >= 0) {
            return prev - 1;
          }
          return prev;
        });
        break;
      case 'ArrowDown':
        setCurrentIndex(prev => {
          if (prev + 1 <= options.length - 1) {
            return prev + 1;
          }
          return prev;
        });
        break;
    }
  };

  useEffect(() => {
    console.log(eleRef.current?.clientHeight, 'scrollHeight', eleRef.current?.scrollHeight);
  }, [currentIndex]);

  return (
    <ListContainer role='listbox' ref={eleRef} onKeyDown={onKeyDown}>
      {options?.map((o: any, idx: number) => {
        return (
          <ListItem key={o.label} aria-selected={currentIndex === idx}>
            {o.label}
          </ListItem>
        );
      })}
    </ListContainer>
  );
}

const options = Array.from({ length: 20 }).map((_, idx) => ({ label: `옵션-${idx}` }));

it('element-scroll-position테스트', async () => {
  const result = render(<OptionList options={options} defaultValue='' />);
  const optionList = await result.getByRole('listbox');
  // console.log(optionList)
  fireEvent.keyDown(optionList, {
    keyCode: '40',
    charCode: '40',
    key: 'ArrowDown',
    code: 'ArrowDown'
  });
});
