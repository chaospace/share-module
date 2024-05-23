import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { useId } from 'react';
import { PropsWithHTMLAttributes } from '../types';
import { CSSComposerObject } from 'styled-composer';
import Typography from './Typography';
import { CheckmarkOutline } from '@styled-icons/evaicons-outline';



interface CheckBoxProps extends PropsWithHTMLAttributes<'input', CSSComposerObject> { }

const CheckIcon = styled(CheckmarkOutline)``;

const CheckMark = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.2em;
    height:1.2em;
    background-color: white;
    border:1px solid;
    border-radius: 0.25em;
    padding:8px 0;
    input[type='checkbox']{
        position:absolute;
        cursor: inherit;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0;
        padding:0;
        margin:0;
    }
`;
const Container = styled.label`
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    white-space: nowrap;
    width: min-content;
    height: min-content;
    cursor: pointer;
    user-select: none;
    padding:8px 4px;
    gap:0.25rem;
    //체크마크 다음 인풋이 check상태일 경우 스타일 지정.
    ${CheckMark}:has(input[type='checkbox']:checked) {
        background-color: aquamarine;
        ${CheckIcon}{
            opacity: 1;
        }
    }
`;


function CheckBox({ children, ref: _ref, value, checked, onChange, ...rest }: CheckBoxProps) {
    // const {} = rest;
    const labelId = `ck-label-${useId()}`;
    return (
        <Container>
            <CheckMark>
                <CheckIcon opacity={ 0 } size={ 18 } />
                <Input type='checkbox' aria-labelledby={ labelId } checked={ checked } value={ value } onChange={ onChange } { ...rest } />
            </CheckMark>
            <Typography id={ labelId } as='span' mt={ 1 } >{ children }</Typography>
        </Container>
    )
}


export default CheckBox;