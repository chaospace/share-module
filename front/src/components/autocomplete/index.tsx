import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from 'react';
import styled from 'styled-components';
import { VBox } from '@/components/elements/Box';
import {
  defaultLabel as labelGetter,
  defaultValue as valueGetter
} from '@/components/elements/Select';
import { variant, grey } from '@/colors';
import SearchInput from '@/components/elements/SearchInput';

//https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none

const OptionContainer = styled.ul<{ open?: boolean }>`
  position: absolute;
  z-index: 100;
  top: 100%;
  width: 100%;
  display: ${({ open }) => (open ? 'block' : 'none')};
  border-radius: 0.5rem;
  border: 1px solid ${grey[500]};
  padding: 2px;
  overflow: hidden;
  overflow-y: auto;
  max-height: 160px;
  background-color: white;
`;
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

const Container = styled(VBox)``;

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

const isScrollAble = (element: HTMLElement) => {
  return element && element.clientHeight < element.scrollHeight;
};

const getSelectOptionLabel = (select: HTMLElement) => select.textContent;
/**
 * Autocomplete
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
  const [activeIndex, setActiveIndex] = useState(provider.findIndex(o => o.label === select));
  const [openList, setOpenList] = useState(false);

  //ref참조 초기화
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionItemRef = useRef<(null | HTMLLIElement)[]>([]);
  const prevSelectIndex = useRef(-1);

  const filteredOptions = useMemo(() => {
    return select === query ? provider : provider.filter(o => o.label.includes(query));
  }, [select, query, provider]);

  // aria적용을 위한 돔 id초기화
  const uniqueId = useId();
  const listID = `list${uniqueId}`;
  const selectOptionID = `selected-option${uniqueId}`;

  const scrollToActiveIndex = useCallback((nIndex: number) => {
    if (listRef.current && isScrollAble(listRef.current)) {
      const ele = optionItemRef.current[nIndex];
      if (ele && !isElementInView(ele, listRef.current)) {
        ele.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }
  }, []);

  const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    if (target.value === '') {
      resetState(); // clear와 동일
    }
  };

  const findSelectIndex = (select: string) => {
    return filteredOptions.findIndex(o => o.label === select);
  };

  const onFocusInput = () => {
    setOpenList(true);
  };

  const resetState = useCallback(() => {
    setQuery('');
    setSelect('');
    setActiveIndex(-1);
    inputRef.current && inputRef.current.focus();
  }, []);

  // 결국 open값이 변경되면 sync되야 한다.
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    // 옵션 클릭시 리턴처리
    const { relatedTarget } = e;
    if (listRef.current?.contains(relatedTarget)) {
      e.preventDefault();
      inputRef.current && inputRef.current.focus();
      return;
    } else if (select) {
      // 이전상태 rollback 처리
      setQuery(select);
      setActiveIndex(prevSelectIndex.current);
    }
    setOpenList(false);
  };

  // openList가 아니어도 문자를 변경하면 검색된 list를 보여준다.
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        if (query === '') setOpenList(false);
        break;
      case 'ArrowDown':
        setActiveIndex(prev => {
          if (prev + 1 < options.length) {
            return prev + 1;
          }
          return prev;
        });
        break;
      case 'ArrowUp':
        setActiveIndex(prev => {
          if (prev - 1 > -1) {
            return prev - 1;
          }
          return prev;
        });
        break;
      case 'Enter':
        onClickOption(activeIndex);
        break;
      default:
        if (!openList) {
          setOpenList(true);
        }
        break;
    }
  };

  const onClickOption = (idx: number) => {
    setActiveIndex(idx);
    const selectLabel = getSelectOptionLabel(optionItemRef.current[idx]!);
    if (selectLabel) {
      setSelect(selectLabel);
      setQuery(selectLabel);
      prevSelectIndex.current = idx;
    }
    setOpenList(false);
  };

  //open시 리스트에 시작위치를 결정
  useEffect(() => {
    if (openList) {
      if (listRef.current) {
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
    }
  }, [openList]);

  // 목록이 열린상태에서 선택값이 있으면 목록포커싱 처리
  useEffect(() => {
    if (select && openList) {
      const nIndex = findSelectIndex(select);
      const ele = optionItemRef.current[nIndex]!;
      if (ele && !isElementInView(ele, listRef.current!)) {
        scrollToActiveIndex(nIndex);
      }
    }
  }, [openList, select]);

  //activeIndex를 sync처리하면 템포가 하나씩 밀리며 역으로 보일 경우 2개의 current가 보이는 문제 발생.
  useEffect(() => {
    scrollToActiveIndex(activeIndex);
  }, [activeIndex, scrollToActiveIndex]);

  const renderList = filteredOptions.length ? (
    filteredOptions.map((o, idx) => {
      const selected = select === o.label;
      return (
        <OptionItem
          key={o.label}
          role='option'
          id={selected ? selectOptionID : undefined}
          aria-selected={activeIndex === idx}
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
