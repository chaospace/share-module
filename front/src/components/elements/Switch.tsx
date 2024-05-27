import React, { useId } from 'react';
import styled from 'styled-components';
import Input from '@/components/elements/Input';
import { CSSComposerObject } from 'styled-composer';
import { StyleVariantProps } from 'styled';
import { shouldForwardCSSProps } from '@/styles/utils';

const Track = styled.span`
  position: relative;
  display: inline-flex;
  height: inherit;
  width: inherit;
  border-radius: inherit;
  overflow: hidden;
  &:after {
    position: absolute;
    display: block;
    cursor: inherit;
    content: '';
    width: 100%;
    height: 100%;
    transition: all 0.15s cubic-bezier(0.42, 0, 0.58, 1);
    transform: translate(0, 0);
  }
`;

const CheckMark = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 60px;
  height: 12px;
  border-radius: 6px;
  &:before {
    position: absolute;
    content: '';
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 1;
    transition: all 0.15s cubic-bezier(0.42, 0, 0.58, 1);
    transform: translate(0, 0);
  }
  input[type='checkbox'] {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.label
  .attrs<StyleVariantProps & CSSComposerObject>(_ => ({
    variant: _.variant ?? 'default'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardCSSProps(['variant'])
  })`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  ${CheckMark}{
    &:before{
      ${({ theme, variant }) => {
        const c = theme.variant[variant!];
        return {
          backgroundColor: c.main
        };
      }}
    }
    &:has(input[type='checkbox']:checked):before{
      transform: translate(calc(60px - 100%), 0%);
    }
  }
  ${Track}{
    ${({ theme, variant }) => {
      const c = theme.variant[variant!];
      return {
        backgroundColor: theme.variant.default.light,
        border: `1px solid ${theme.variant.default.main}`,
        '&:after': {
          backgroundColor: c.light
        }
      };
    }}
  }
  input[type='checkbox']:checked + ${Track}{
    &:after {
      transform: translate(60px, 0%);
    }
  }
`;

//결국 JSX.IntrinsicElements과 동일한 방식
type SwitchProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  StyleVariantProps;

/**
 * label정보는 children으로 구성하며 모든 정보는 상위에서 컨트롤 한다는 가정.
 * @param param0
 * @returns
 */
function Switch({ variant, value, checked, onChange, children, ...rest }: SwitchProps) {
  const labelID = `switchLabel-${useId()}`;
  return (
    <Container id={labelID} variant={variant}>
      {children}
      <CheckMark>
        <Input
          aria-labelledby={labelID}
          type='checkbox'
          role='switch'
          value={value}
          checked={checked}
          onChange={onChange}
          {...rest}
        />
        <Track />
      </CheckMark>
    </Container>
  );
}

export default Switch;
