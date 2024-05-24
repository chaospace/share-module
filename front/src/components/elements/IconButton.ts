import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';

const IconButton = styled.button
  .attrs<CSSComposerObject>({
    p: 0,
    display: 'inline-block',
    bg: 'none',
    border: 'none'
  })
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

export default IconButton;
