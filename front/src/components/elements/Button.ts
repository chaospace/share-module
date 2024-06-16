import styled from 'styled-components';
import { CSSComposerObject, composer } from 'styled-composer';
import { VariantCategory } from 'styled';
import { parseStyleProps, shouldForwardCSSProps } from '@/styles/utils';

interface ButtonProps extends CSSComposerObject {
  variant?: VariantCategory;
  /** 배경컬러를 transparent 설정여부 */
  disableBackground?: boolean;
}

const vriantHoverComposer = parseStyleProps(
  ({ theme, variant = 'default', disableBackground = false }) => {
    const c = theme.variant[variant];

    return disableBackground
      ? {
          color: c.main,
          backgroundColor: 'transparent',
          borderColor: c.main,
          '&:hover': {
            borderColor: c.dark,
            color: c.dark
          }
        }
      : {
          color: c.light,
          backgroundColor: c.main,
          borderColor: c.dark,
          '&:hover': {
            backgroundColor: c.dark
          }
        };
  }
);
// variant를 이용한 컬러 제어
const Button = styled('button').withConfig({
  shouldForwardProp: shouldForwardCSSProps(['disableBackground'])
})<ButtonProps>`
  ${vriantHoverComposer}
  ${composer}
`;
// Button.defaultProps = {
//   variant: 'default'
// };
export default Button;
