import { PropsWithHTMLAttributes } from '@/components/types';
import styled, { ExecutionContext } from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { VariantCategory, VariantColorType } from 'styled';
import { variant } from '@/colors';

type ButtonProps = PropsWithHTMLAttributes<
  'button',
  { variant?: VariantCategory } & CSSComposerObject
>;

const buttonVariant = {
  ...variant
};

const vriantHoverComposer = (props: ExecutionContext & ButtonProps) => {
  const variantColor: VariantColorType = buttonVariant[props.variant!];
  return {
    color: variantColor.light,
    backgroundColor: variantColor.main,
    borderColor: variantColor.dark,
    '&:hover': {
      backgroundColor: variantColor.dark
    }
  };
};
// variant를 이용한 컬러 제어
const Button = styled.button.withConfig({ shouldForwardProp: shouldForwardAllProps })<ButtonProps>`
  ${composer};
  ${vriantHoverComposer};
`;
Button.defaultProps = {
  variant: 'default'
};
export default Button;
