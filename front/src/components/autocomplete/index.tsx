import React, { useCallback, useDeferredValue, useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { VBox } from '@/components/elements/Box';
import { labelGetter, valueGetter } from '@/components/util';
import { variant, grey } from '@/colors';
import SearchInput from '@/components/elements/SearchInput';
import { useListProvider, useWatch } from '../hooks';

// activeIndex를 ref를 대체할 때 유의점.
// 필터 결과에 따라 index가 달라지기 때문에 ref에 index를 기억하는 건 의미가 없다.
// focus시 현재 select에서 참조를 항상 가져올 수 있어야 한다.

//https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none

const OptionContainer = styled.ul<{ open?: boolean }>(props => {
  return {
    position: 'absolute',
    zIndex: '100',
    top: `100%`,
    width: `100%`,
    display: props.open ? 'block' : 'none',
    borderRadius: `0.5rem`,
    border: `1px solid ${grey[500]}`,
    padding: `2px`,
    overflow: `hidden`,
    overflowY: `auto`,
    maxHeight: `160px`,
    backgroundColor: 'white'
  };
});
const OptionItem = styled.li<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  cursor: cursor;
  border-radius: 0.25rem;
  &:first-child,
  &:last-child {
    margin: 1px 0;
  }
  &:hover {
    background-color: ${variant.default.light};
  }

  &.selected {
    background-color: ${variant.primary.light};
  }

  &[aria-selected='true'],
  &:focus-visible {
    outline: 2px solid ${variant.primary.main};
  }
`;

const Container = styled(VBox)({});

interface AutoCompleteProps {
  options?: any[];
  getLabel?(o: any): string;
  getValue?(o: any): string;
  onChange?(o: any): void;
  defaultValue?: any;
  value?: any;
}

const allowKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

const getAriaSelectedIndex = (node: HTMLElement[]) => {
  return node.findIndex(o => o?.ariaSelected === 'true');
};

const moveSelected = (node: HTMLElement[], state: 'prev' | 'next' = 'next') => {
  let nextIndex = getAriaSelectedIndex(node);
  const prevIndex = nextIndex;
  const current = nextIndex > -1 ? node[nextIndex]! : undefined;
  if (state === 'next') {
    nextIndex = nextIndex + 1 >= node.length ? nextIndex : nextIndex + 1;
  } else {
    nextIndex = nextIndex - 1 < 0 ? nextIndex : nextIndex - 1;
  }
  if (prevIndex !== nextIndex && node[nextIndex]) {
    node[nextIndex].ariaSelected = 'true';
    node[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (current) {
      current.ariaSelected = 'false';
    }
  }
};

/**
 * Autocomplete
 * 키보드 액션 정리
 *  - keydown으로 쿼리 초기화는 안함.
 *  - backspace를 누를 경우만 초기화 처리.
 * @returns
 */
function AutoComplete({
  options = [],
  value = '',
  defaultValue = '',
  getLabel = labelGetter,
  getValue = valueGetter
}: AutoCompleteProps) {
  //
  const [openList, setOpenList] = useState(false);
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState(getValue(defaultValue || value));
  const deferredQuery = useDeferredValue(query);
  //
  const provider = useListProvider(options, getLabel, getValue);

  // query값이 적용된 옵션목록
  const filteredOptions = useMemo(() => {
    const q = deferredQuery.toLowerCase();
    return select === deferredQuery
      ? provider
      : provider.filter(o => o.label.toLowerCase().includes(q));
  }, [select, deferredQuery, provider]);

  //ref참조 초기화
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionItemRef = useRef<(null | HTMLLIElement)[]>([]);

  // aria적용을 위한 돔 id초기화
  const uniqueId = useId();
  const listID = `list${uniqueId}`;
  const selectOptionID = `selected-option${uniqueId}`;

  const onFocusInput = () => {
    setOpenList(true);
  };

  const setFocusInput = () => {
    inputRef.current && inputRef.current.focus();
  };

  const resetState = useCallback(() => {
    setQuery('');
    setSelect('');
    setFocusInput();
  }, []);

  // 결국 open값이 변경되면 sync되야 한다.
  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    // 옵션 클릭시 리턴처리
    const { relatedTarget } = e;
    if (listRef.current?.contains(relatedTarget)) {
      e.preventDefault();
      setFocusInput();
      return;
    } else if (select) {
      // 이전상태 rollback 처리
      setQuery(select);
    }
    setOpenList(false);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    e.preventDefault();
    if (key === 'Backspace') {
      if (e.target === inputRef.current && inputRef.current.value === '') {
        resetState();
      }
    }
  };
  // openList가 아니어도 문자를 변경하면 검색된 list를 보여준다.
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (!openList && allowKeys.includes(key)) {
      e.preventDefault();
      setOpenList(true);
      return;
    }

    if (key === 'Tab' && openList) {
      setOpenList(false);
      return;
    }

    switch (key) {
      case 'Escape':
        setOpenList(false);
        return;
      case 'ArrowDown':
        console.log('optionItem', optionItemRef.current);
        moveSelected(optionItemRef.current as HTMLElement[], 'next');
        break;
      case 'ArrowUp':
        moveSelected(optionItemRef.current as HTMLElement[], 'prev');
        break;
      case 'Enter':
        onClickOption(getAriaSelectedIndex(optionItemRef.current as HTMLElement[]));
        return;
      default:
        if (!openList) {
          setOpenList(true);
        }
        return;
    }
  };

  const onClickOption = (idx: number) => {
    const selectLabel = filteredOptions[idx].label;
    setSelect(selectLabel);
    setQuery(selectLabel);
    setOpenList(false);
  };

  //open시 리스트에 시작위치 결정
  useWatch(() => {
    if (openList && listRef.current) {
      //참조를 하기 전에는 항상 초기값으로 복원
      listRef.current.style.transform = 'translate(0,0)';
      listRef.current.style.top = '100%';
      const rect = listRef.current.getBoundingClientRect();
      //active-option참조
      if (rect.top + rect.height > document.documentElement.clientHeight) {
        listRef.current.style.top = '0';
        listRef.current.style.transform = 'translate(0,-100%)';
      }
    }
  }, [openList]);
  // 선택옵션 스타일적용
  useWatch(() => {
    const selectOption = optionItemRef.current.find(o => o?.textContent === select);
    //옵션요소 selected속성 초기화
    optionItemRef.current.forEach(o => {
      if (o && selectOption !== o) {
        o.ariaSelected = 'false';
        o.classList.remove('selected');
      }
    });
    if (openList) {
      if (selectOption) {
        selectOption.ariaSelected = 'true';
        selectOption.classList.add('selected');
        selectOption.scrollIntoView({ behavior: 'auto', block: 'center' });
      } else {
        listRef.current && listRef.current.scrollTo(0, 0);
      }
    }
  }, [openList, select]);

  const renderList = filteredOptions.length ? (
    filteredOptions.map((o, idx) => {
      const selected = select === o.label;
      return (
        <OptionItem
          key={o.label}
          role='option'
          id={selected ? selectOptionID : undefined}
          aria-selected={selected}
          ref={ele => {
            optionItemRef.current[idx] = ele;
          }}
          onClick={() => onClickOption(idx)}>
          {o.label}
        </OptionItem>
      );
    })
  ) : (
    <OptionItem>검색결과 없음</OptionItem>
  );

  return (
    <Container gap={1}>
      <SearchInput
        data-testid='combobox'
        role='combobox'
        aria-activedescendant={selectOptionID}
        aria-controls={listID}
        aria-expanded={openList}
        ref={inputRef}
        value={query}
        aria-autocomplete='list'
        placeholder='검색어를 넣어주세요...'
        onChange={({ target }) => setQuery(target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={onFocusInput}
        onClickReset={resetState}
      />
      <OptionContainer
        id={listID}
        className='myClass'
        data-testid='listbox'
        role='listbox'
        tabIndex={-1}
        ref={listRef}
        open={openList}
        onBlur={onBlur}>
        {renderList}
      </OptionContainer>
    </Container>
  );
}

export default AutoComplete;
