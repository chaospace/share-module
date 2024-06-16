import styled from 'styled-components';
import { CSSComposerObject, composer } from 'styled-composer';

const Label = styled.label<CSSComposerObject>(
  {
    fontSize: 14,
    fontWeight: 'bold'
  },
  composer
);

export default Label;
