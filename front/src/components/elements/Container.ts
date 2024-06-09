import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';

const Container = styled('div')
  .attrs<CSSComposerObject>(_ => ({
    position: _.position ?? 'relative',
    display: _.display ?? 'block'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

export { Container };
