import React, { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { VBox } from '@/components/elements/Box';
import { composeOptionItem, defaultLabel as labelGetter, defaultValue as valueGetter } from '@/components/elements/Select';
import { variant, grey } from '@/colors';
import SearchInput from '@/components/elements/SearchInput';

//https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none


const OptionContainer = styled.ul<{ open?: boolean }>`
    position: absolute;
    z-index: 100;
    top:100%;
    width:100%;
    display: ${({ open }) => open ? 'block' : 'none'};
    border-radius: 0.5rem;
    /* box-shadow: 0px 4px 4px rgb(0 0 0 / 10%); */
    border:1px solid ${grey[500]};
    padding: 2px;
    overflow: hidden;
    overflow-y:auto;
    max-height: 120px;
    background-color: white;
`;
const OptionItem = styled.li<{ active?: boolean }>`
    padding: 0.5rem 1rem;
    cursor: cursor;
    border-radius:.25rem;
    &:hover, 
    &[aria-selected="true"], 
    &[data-current="true"]{
        background-color: ${variant.default.light};
    }
    &[aria-selected="true"] {
        background-color: aliceblue;
    }
`;

interface SearchAbleSelectProps {
    options?: any[],
    getLabel?(o: any): string;
    getValue?(o: any): string;
    onChange?(o: any): void;
    defaultValue?: any;
    value?: any;
}

const allowKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

const _isElementInView = (element: HTMLElement) => {
    const bounding = element.getBoundingClientRect();
    console.log('bounding', bounding);
}

const isScrollAble = (element: HTMLElement) => {
    console.log('clientHeight', element.clientHeight, 'scrollHeight', element.scrollHeight);
    return element && element.clientHeight < element.scrollHeight
}

/**
 * Select에서 검색기능만 추가하면 된다.
 * @returns 
 */

function SearchAbleSelect({
    options = [],
    value = '',
    defaultValue = '',
    getLabel = labelGetter,
    getValue = valueGetter }: SearchAbleSelectProps) {

    const [query, setQuery] = useState('');
    const [select, setSelect] = useState(getValue(defaultValue || value));
    const [activeIndex, setActiveIndex] = useState(options.findIndex(o => o.label === select));
    const [openList, setOpenList] = useState(false);

    const filteredOptions = useMemo(() => {
        return select === query ? options : options.filter(o => o.label.includes(query));
    }, [select, query, options]);

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);


    const uniqueId = useId();
    const listID = `list${uniqueId}`;
    const selectOptionID = `selected-option${uniqueId}`;


    useEffect(() => {
        // console.log("리스트 시작위치", listRef.current?.getBoundingClientRect());
        console.log('scroll-able', isScrollAble(listRef.current as HTMLElement));
    }, [activeIndex]);

    const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setQuery(target.value);
        if (target.value === '') {
            setSelect('');
        }
    }

    const onFocusInput = () => {
        setOpenList(true);
    }

    const onClickClear = useCallback(() => {
        setQuery('');
        setSelect('');
        setActiveIndex(-1);
        inputRef.current && inputRef.current.focus();
    }, []);

    const onBlur = (e: FocusEvent<HTMLElement>) => {
        // 옵션 클릭시 리턴처리
        const { relatedTarget } = e;
        if (listRef.current?.contains(relatedTarget)) {
            e.preventDefault();
            inputRef.current && inputRef.current.focus();
            return;
        } else if (select) {
            setQuery(select);
        }
        setOpenList(false);
    }

    // openList가 아니어도 문자를 변경하면 검색된 list를 보여준다.
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;

        if (!openList && allowKeys.includes(key)) {
            e.preventDefault();
            setOpenList(true);
            return;
        }

        switch (key) {
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
                setSelect(options[activeIndex].label);
                setQuery(options[activeIndex].label);
                setOpenList(false);
                break;
            default:
                setOpenList(true);
                break;
        }

    }

    const onClickOption = (o: any, idx: number) => {
        setSelect(o.label);
        setQuery(o.label);
        setActiveIndex(idx);
        setOpenList(false);
    }
    return (
        <VBox gap='1'>
            <SearchInput
                data-testid='combobox'
                role='combobox'
                aria-activedescendant={ selectOptionID }
                aria-controls={ listID }
                ref={ inputRef }
                value={ query }
                placeholder='검색어를 넣어주세요...'
                onChange={ onChangeInput }
                onBlur={ onBlur }
                onKeyDown={ onKeyDown }
                onFocus={ onFocusInput }
                onClickReset={ onClickClear }
            />
            <OptionContainer
                id={ listID }
                data-testid='listbox'
                role='listbox'
                tabIndex={ -1 }
                ref={ listRef }
                open={ openList }
                aria-expanded={ openList }
                onBlur={ onBlur } >
                { filteredOptions.length ? filteredOptions.map((o, idx) => {
                    const vo = composeOptionItem(o, getLabel, getValue);
                    const selected = select === vo.label;
                    return (<OptionItem key={ vo.label }
                        id={ selected ? selectOptionID : undefined }
                        aria-selected={ selected }
                        data-current={ activeIndex === idx }
                        role='option'
                        onClick={ () => onClickOption(vo, idx) }>
                        { vo.label }
                    </OptionItem>)
                }) : <OptionItem>검색결과 없음</OptionItem> }
            </OptionContainer>
        </VBox >
    )
}



export default SearchAbleSelect;