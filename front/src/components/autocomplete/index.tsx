import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { VBox } from '@/components/elements/Box';
import { labelGetter, valueGetter } from '@/components/util';
import { variant, grey } from '@/colors';
import SearchInput from '@/components/elements/SearchInput';

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

  &[aria-selected='true'] {
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

const isElementInView = (element: HTMLElement, area: HTMLElement) => {
  const optionBound = element.getBoundingClientRect();
  const areaBound = area.getBoundingClientRect();
  // 화면에 걸치는 경우는 이 두가지
  if (areaBound.top > optionBound.top || areaBound.bottom < optionBound.bottom) {
    return false;
  }
  return true;
};

/* const isScrollAble = (element: HTMLElement) => {
  return element && element.clientHeight < element.scrollHeight;
}; */

const getAriaSelected = (node: HTMLElement[]) => {
  return node.findIndex(o => o?.ariaSelected === 'true');
};

const swapElementAriaSelected = (a: HTMLElement, b?: HTMLElement) => {
  if (a) {
    a.ariaSelected = 'true';
    a.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (b) {
    b.ariaSelected = 'false';
  }
};

const getSelectOptionLabel = (select: HTMLElement) => select.textContent;
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
  const provider = useMemo(() => {
    return options.map(o => ({ label: getLabel(o), value: getValue(o) }));
  }, [options, getLabel, getValue]);

  const [query, setQuery] = useState('');
  const [select, setSelect] = useState(getValue(defaultValue || value));

  const [openList, setOpenList] = useState(false);

  //ref참조 초기화
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionItemRef = useRef<(null | HTMLLIElement)[]>([]);

  const filteredOptions = useMemo(() => {
    return select === query ? provider : provider.filter(o => o.label.includes(query));
  }, [select, query, provider]);

  // aria적용을 위한 돔 id초기화
  const uniqueId = useId();
  const listID = `list${uniqueId}`;
  const selectOptionID = `selected-option${uniqueId}`;

  const scrollToActiveIndex = useCallback((nIndex: number) => {
    if (listRef.current) {
      const ele = optionItemRef.current[nIndex];
      if (ele && !isElementInView(ele, listRef.current)) {
        ele.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }
  }, []);

  const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  };

  const findSelectIndex = (select: string) => {
    return filteredOptions.findIndex(o => o.label === select);
  };

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
    //현재 select에서 active값을 가져온다?
    //이렇게 되면 항상 ref가 항상 고정된다.

    let nextIndex = getAriaSelected(optionItemRef.current! as HTMLElement[]);
    const prevIndex = nextIndex;
    const current = nextIndex > -1 ? optionItemRef.current![nextIndex]! : undefined;

    switch (key) {
      case 'Escape':
        setOpenList(false);
        return;
      case 'ArrowDown':
        nextIndex = nextIndex + 1 >= options.length ? nextIndex : nextIndex + 1;
        if (nextIndex !== prevIndex)
          swapElementAriaSelected(optionItemRef.current[nextIndex]!, current);
        break;
      case 'ArrowUp':
        nextIndex = nextIndex - 1 == -1 ? nextIndex : nextIndex - 1;
        if (nextIndex !== prevIndex)
          swapElementAriaSelected(optionItemRef.current[nextIndex]!, current);
        break;
      case 'Enter':
        if (nextIndex >= 0) onClickOption(nextIndex);
        return;
      default:
        if (!openList) {
          setOpenList(true);
        }
        return;
    }
  };

  const onClickOption = (idx: number) => {
    const selectLabel = getSelectOptionLabel(optionItemRef.current[idx]!);
    if (selectLabel) {
      setSelect(selectLabel);
      setQuery(selectLabel);
    }
    setOpenList(false);
  };

  //open시 리스트에 시작위치를 결정
  useEffect(() => {
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

  // 목록이 열린상태에서 선택값이 있으면 목록포커싱 처리
  useEffect(() => {
    if (openList) {
      if (select) {
        const nIndex = findSelectIndex(select);
        const ele = optionItemRef.current[nIndex]!;
        ele.ariaSelected = 'true';
        if (ele && !isElementInView(ele, listRef.current!)) {
          scrollToActiveIndex(nIndex);
        }
      } else {
        // listRef.current!.scrollTop = 0;
        optionItemRef.current[0]?.scrollIntoView();
      }
    } else {
      //옵션요소 selected속성 초기화
      optionItemRef.current.forEach(o => {
        if (o && o.textContent !== select && o.ariaSelected === 'true') {
          o.ariaSelected = 'false';
        }
      });
    }
  }, [openList, select, scrollToActiveIndex]);

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
        onChange={onChangeInput}
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
