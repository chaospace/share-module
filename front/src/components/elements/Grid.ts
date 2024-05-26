import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';

const Grid = styled.div
  .attrs<CSSComposerObject>(_ => ({
    position: _.position ?? 'relative',
    display: 'grid'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

export default Grid;
