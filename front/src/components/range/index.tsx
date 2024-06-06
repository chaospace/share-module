import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/elements/Input';
import { PropsWithHTMLAttributes } from '@/components/types';
import { mockHandler } from '../util';
import { StyleVariantProps, VariantCategory } from 'styled';

const Container = styled('div')
  .attrs<{ progress?: number; variant?: VariantCategory }>(_ => ({
    variant: _.variant ?? 'default',
    progress: _.progress ?? 0
  }))
  .withConfig({
    shouldForwardProp: (prop: string) => !['variant', 'progress'].includes(prop)
  })`
  position: relative;
  display: flex;
  align-items: center;

  ${Input}[type='range'] {
    appearance: none;
    height: 6px;  
    border-radius: 3px;
    width: 100%;
    border:1px solid #ababab;
    background:${({ theme, progress, variant }) => `linear-gradient(to right, ${theme.variant[variant!].main} ${progress}%, ${theme.variant[variant!].light} 0%)`};
    &:focus-within, &:focus{
      outline:none;
    }
  }
  ${Input}[type='range']::-webkit-slider-thumb {
    appearance: none;
    box-shadow: ${({ theme, variant }) => `0 0 0 2px inset ${theme.variant[variant!].main};`};
    width: 16px;
    height: 16px;
    background-color: ${({ theme, variant }) => theme.variant[variant!].light};
    border-radius: 50%;
  }
`;

/**
 * input[type='range'] 컴포넌트 커스텀 스타일적용을 위해 div로 한번 감싼형태.
 *
 */
function InputRange({
  step = 1,
  min = 0,
  max = 100,
  value = 0,
  onInput = mockHandler,
  onChange = mockHandler,
  variant = 'default'
}: PropsWithHTMLAttributes<'input', StyleVariantProps>) {
  const [_value, setValue] = useState(value);
  const onInputHanlder = (e: React.FormEvent<HTMLInputElement>) => {
    const ele = e.target as HTMLInputElement;
    const value = Number(ele.value);
    setValue(value);
    onInput(e);
  };

  const progress = useMemo(() => {
    // progress 구하기
    const v = Number(_value);
    const mn = Number(min);
    const mx = Number(max);
    const ratio = ((v || 0) - +mn) / (mx - mn);
    return ratio * 100;
  }, [_value, min, max]);

  return (
    <Container variant={variant} progress={progress}>
      <Input
        type='range'
        min={min}
        max={max}
        step={step}
        value={_value}
        onInput={onInputHanlder}
        onChange={onChange}
      />
    </Container>
  );
}
export default InputRange;
