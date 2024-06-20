import React, { PropsWithChildren, useState } from 'react';
import styled, { css } from 'styled-components';
import { CSSComposerObject } from 'styled-composer';
import { StyleVariantProps, VariantCategory } from 'styled';
import { shouldForwardCSSProps } from '@/styles/utils';
import Typography from './Typography';
import Input from './Input';
import { Box } from './Box';

type RadioProps = CSSComposerObject & StyleVariantProps;

const CheckMark = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 1px solid #666;
  input[type='radio'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

const radioStyle = css<RadioProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  color: ${({ color }) => color};
  gap: 4px;
  ${CheckMark}:has(input[type= 'radio']:checked) {
    background-color: ${({ theme, variant }) => {
      const c = theme.variant[variant!];
      return c.light;
    }};
    &:after {
      content: '';
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      background-color: ${({ theme, variant }) => {
        const c = theme.variant[variant!];
        return c.main;
      }};
    }
  }
  ${Typography} {
    color: inherit;
  }
`;

const Radio = styled.label
  .attrs<CSSComposerObject & StyleVariantProps>(_ => ({
    variant: _.variant ?? 'default'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardCSSProps(['variant'])
  })`${radioStyle}`;

interface RadioGroupProps {
  options?: string[];
  name?: string;
  variant?: VariantCategory;
  defaultValue?: string;
  direction?: 'column' | 'row';
  labelId?: string;
}

const MemoedRadio = React.memo(
  ({
    name = undefined,
    value,
    checked,
    variant,
    onChange,
    children
  }: {
    variant: VariantCategory;
    name?: string;
    value: string;
    checked: boolean;
    children: React.ReactNode;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }) => {
    return (
      <Radio variant={variant}>
        <CheckMark>
          <Input name={name} type='radio' value={value} checked={checked} onChange={onChange} />
        </CheckMark>
        <Typography as='span' mt={1}>
          {children}
        </Typography>
      </Radio>
    );
  },
  (prev, next) => prev.checked === next.checked
);

function RadioGroup({
  options,
  name,
  defaultValue = '',
  variant = 'default',
  direction = 'row',
  labelId = ''
}: PropsWithChildren<RadioGroupProps>) {
  const [value, setValue] = useState(defaultValue);

  return (
    <React.Fragment>
      <Box aria-labelledby={labelId} flexDirection={direction}>
        {options?.map(o => {
          return (
            <MemoedRadio
              key={o}
              name={name}
              variant={variant}
              value={o}
              checked={o === value}
              onChange={e => setValue(e.target.value)}>
              {o}
            </MemoedRadio>
          );
        })}
      </Box>
    </React.Fragment>
  );
}

export default RadioGroup;
