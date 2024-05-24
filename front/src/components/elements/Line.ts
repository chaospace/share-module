//라인 컴포넌트 구분자 역할

import { shouldForwardCSSProps } from '@/styles/utils';
import styled, { ExecutionContext, css } from 'styled-components';
import { CSSComposerObject, composer } from 'styled-composer';

const baseStyle = css`
  margin: 0;
  border: none;
`;

type LineProps = Pick<
  CSSComposerObject,
  'borderWidth' | 'borderStyle' | 'borderColor' | 'my' | 'mx'
>;
const propsKeys = ['borderWidth', 'borderColor', 'borderStyle', 'my', 'mx'];

const vBorderComposer = ({
  borderWidth,
  borderStyle,
  borderColor,
  mx,
  my,
  theme
}: ExecutionContext & LineProps) => ({
  borderLeft: `${borderWidth} ${borderStyle}`,
  ...composer({ borderColor, mx, my, theme })
});

const initProps = (props: LineProps) => ({
  borderWidth: props.borderWidth ?? '1px',
  borderColor: props.borderColor ?? 'black',
  borderStyle: props.borderStyle ?? 'solid',
  role: 'separator'
});

const hBorderComposer = ({
  borderWidth,
  borderStyle,
  borderColor,
  mx,
  my,
  theme
}: ExecutionContext & LineProps) => ({
  borderTop: `${borderWidth} ${borderStyle}`,
  ...composer({ borderColor, mx, my, theme })
});

const HLine = styled.hr.attrs<LineProps>(initProps).withConfig({
  shouldForwardProp: shouldForwardCSSProps(propsKeys, false)
})`
  ${baseStyle}
  ${hBorderComposer}
`;

const VLine = styled.span.attrs<LineProps>(initProps).withConfig({
  shouldForwardProp: shouldForwardCSSProps(propsKeys, false)
})`
  ${baseStyle}
  ${vBorderComposer}
`;

export { HLine, VLine };
