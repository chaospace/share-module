import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import { useId } from 'react';
import { PropsWithHTMLAttributes } from '../types';
import { CSSComposerObject } from 'styled-composer';
import Typography from './Typography';
import { CheckmarkOutline } from '@styled-icons/evaicons-outline';
import { VariantCategory } from 'styled';
import { parseVariantColor } from '@/styles/utils';

interface CheckBoxProps extends PropsWithHTMLAttributes<'input', CSSComposerObject> {
  variant?: VariantCategory;
}
const getBackGroundColor = parseVariantColor(c => {
  return c.main;
});
const getCheckIConColor = parseVariantColor(c => {
  return c.light;
});

const CheckIcon = styled(CheckmarkOutline)``;

const CheckMark = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  background-color: white;
  border: 1px solid;
  border-radius: 0.25em;
  padding: 8px 0;
  input[type='checkbox'] {
    position: absolute;
    cursor: inherit;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;
const Container = styled('label')
  .attrs<{ variant?: VariantCategory }>(_ => ({
    variant: _.variant ?? 'default'
  }))
  .withConfig({ shouldForwardProp: (prop: string) => !['variant'].includes(prop) })`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  white-space: nowrap;
  width: min-content;
  height: min-content;
  cursor: pointer;
  user-select: none;
  padding: 8px 4px;
  gap: 0.25rem;
  //체크마크 다음 인풋이 check상태일 경우 스타일 지정.
  ${CheckMark}:has(input[type='checkbox']:checked) {
    background-color: ${getBackGroundColor};
    ${CheckIcon} {
      opacity: 1;
      fill: ${getCheckIConColor};
    }
  }
`;

function CheckBox({
  children,
  ref: _ref,
  variant = 'default',
  value,
  checked,
  onChange,
  ...rest
}: CheckBoxProps) {
  // const {} = rest;
  const labelId = `ck-label-${useId()}`;
  return (
    <Container id={labelId} variant={variant}>
      <CheckMark>
        <CheckIcon opacity={0} size={18} />
        <Input
          type='checkbox'
          aria-labelledby={labelId}
          checked={checked}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </CheckMark>
      <Typography as='span' mt={1}>
        {children}
      </Typography>
    </Container>
  );
}

export type { CheckBoxProps };
export default CheckBox;
