import { PropsWithHTMLAttributes } from '@/components/types';
import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { StyleVariantContext, VariantCategory } from 'styled';

type ButtonProps = PropsWithHTMLAttributes<
  'button',
  { variant?: VariantCategory } & CSSComposerObject
>;

const vriantHoverComposer = ({ theme, variant }: any & StyleVariantContext) => {
  const variantColor = theme.variant[variant];
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
