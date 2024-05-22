import React, { FocusEvent, MouseEvent } from 'react';
import { PropsWithHTMLAttributes, polymorphicForwardRef } from '../types';
import styled from 'styled-components';
import Input from './Input';
import { CSSComposerObject } from 'styled-composer';
import { Close } from '@styled-icons/material-rounded';

const ClearButton = styled.button<{ display?: string }>`
    padding:0;
    background: none;
    top:50%;
    border:none;
    display: ${({ display }) => display || 'inline-block'};
`;

const Container = styled.div`
    position: relative;
    ${Input}{
        width:100%;
    }
    ${ClearButton}{
        position: absolute;
        right:16px;
        transform: translate(0%, -50%);
        &:focus{
            border: 1px solid;
        }
    }
`

interface SearchInputProps extends CSSComposerObject {
    onClickReset?(e: MouseEvent<HTMLButtonElement>): void
}

const SearchInput = polymorphicForwardRef<'input', PropsWithHTMLAttributes<'input', SearchInputProps>>(({ value, onClickReset, onChange, onKeyDown, onBlur, ...rest }, forwardedRef) => {
    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        //버튼이 아닐경우만 blur를 발생시킴.
        if (e.relatedTarget?.tagName.toLocaleLowerCase() !== 'button') {
            onBlur && onBlur(e);
        }
    }
    const resetDisplay = value ? 'inline-block' : 'none';
    return (
        <Container>
            <Input type='search'
                ref={ forwardedRef }
                value={ value }
                onChange={ onChange }
                onBlur={ onBlurHandler }
                onKeyDown={ onKeyDown }
                { ...rest } />
            <ClearButton display={ resetDisplay } onClick={ onClickReset }>
                <Close size={ 20 } />
            </ClearButton>
        </Container>
    )
});

export type { SearchInputProps };
export default SearchInput;