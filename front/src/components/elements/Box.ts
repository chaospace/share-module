import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';

// default style
interface BoxProps extends CSSComposerObject {
  position?: string;
  display?: string;
  gap?: string | number;
}

/**
 * 추상 컨테이너.
 * 실 사용에는 상속한 VBox, HBox를 사용한다.
 */
const Box = styled('div')
  .attrs<BoxProps>(props => ({
    position: props.position ?? 'relative',
    display: props.display ?? 'flex',
    gap: props.gap ?? 3
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

const VBox = styled(Box).attrs(() => ({
  flexDirection: 'column'
}))``;

const HBox = styled(Box).attrs(() => ({
  flexDirection: 'row'
}))``;

export type { BoxProps };
export { Box, VBox, HBox };
