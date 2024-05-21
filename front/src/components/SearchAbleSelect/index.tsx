import React, { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { VBox } from '@/components/elements/Box';
import Input from '@/components/elements/Input';
import { Close } from '@styled-icons/material-rounded';
import { composeOptionItem, defaultLabel as labelGetter, defaultValue as valueGetter } from '../elements/Select';
import { variant } from '@/colors';

//https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none

const ClearIcon = styled('button') <{ display: string }>`
    padding:0;
    background: none;
    top:50%;
    border:none;
    display: ${({ display }) => display};
    &:focus{
        border:1px solid;
    }
`;

const InputContainer = styled.div`
    position: relative;
    ${Input} {
        width: 100%;
    }
    ${ClearIcon} {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translate(0%, -50%);
    }
`;

const OptionContainer = styled.ul<{ open?: boolean }>`
    display: ${({ open }) => open ? 'block' : 'none'};
    border-radius: 0.5rem;
    box-shadow: 4px 4px 4px rgb(0 0 0 / 10%);
    overflow: hidden;
    padding: 2px;
`;
const OptionItem = styled.li<{ active?: boolean }>`
    padding: 0.5rem 1rem;
    cursor: cursor;
    border-radius:.25rem;
    &:hover, 
    &:focus, 
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
    const clearRef = useRef<HTMLButtonElement>(null);

    const hasQuery = document.activeElement === inputRef.current && query.length > 0;

    const uniqueId = useId();
    const listID = `list${uniqueId}`;
    const selectOptionID = `selected-option${uniqueId}`;

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
        inputRef.current?.focus();
    }, []);

    const onBlur = (e: FocusEvent<HTMLElement>) => {
        // 옵션 클릭시 리턴처리
        const { relatedTarget } = e;
        // console.log('blur-e', relatedTarget);
        if (listRef.current?.contains(relatedTarget)) {
            e.preventDefault();
            inputRef.current?.focus();
            return;
        } else if (clearRef.current?.contains(relatedTarget)) {
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
        <VBox>
            <InputContainer >
                <Input
                    type="search"
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
                />
                <ClearIcon ref={ clearRef }
                    display={ hasQuery ? 'block' : 'none' }
                    onClick={ onClickClear }
                >
                    <Close size={ 20 } />
                </ClearIcon>
            </InputContainer>
            <OptionContainer
                id={ listID }
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