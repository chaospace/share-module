import { PropsWithHTMLAttributes } from '@/components/types';
import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { VariantCategory } from 'styled';
import { variantProxy } from '@/styles/utils';
import appTheme from '@/styles/theme';

type ButtonProps = PropsWithHTMLAttributes<
  'button',
  { variant?: VariantCategory } & CSSComposerObject
>;

const vriantHoverComposer = variantProxy(appTheme.variant, c => {
  return {
    color: c.light,
    backgroundColor: c.main,
    borderColor: c.dark,
    '&:hover': {
      backgroundColor: c.dark
    }
  };
});
// variant를 이용한 컬러 제어
const Button = styled.button.withConfig({ shouldForwardProp: shouldForwardAllProps })<ButtonProps>`
  ${vriantHoverComposer}
  ${composer}
`;
Button.defaultProps = {
  variant: 'default'
};
export default Button;
