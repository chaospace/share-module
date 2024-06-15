import { VBox } from '../elements/Box';
import Button from '../elements/Button';
import styled, { css } from 'styled-components';
import Typography from '../elements/Typography';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';

const IConDownArrow = styled.i`
  position: absolute;
  display: inline-block;
  border-width: 0 2px 2px 0;
  border-style: solid;
  border-color: currentColor;
  height: 8px;
  width: 8px;
`;

const AccordionContentBody = styled.div`
  position: relative;
  display: block;
  padding: 20px;
`;

const AccordionContent = styled('div')
  .attrs<CSSComposerObject>({
    position: 'relative',
    overflow: 'hidden',
    overflowY: 'auto',
    display: 'block'
  })
  .withConfig({ shouldForwardProp: shouldForwardAllProps })(
  composer,
  () => css`
    transition: all 300ms ease-out;
  `
);

const AccordionButton = styled(Button).attrs(_ => ({
  gap: 2,
  px: 24,
  py: 16,
  width: '100%',
  display: 'block',
  borderRadius: 0,
  border: 'none',
  variant: _.variant ?? 'info'
}))`
  ${Typography} {
    position: relative;
    pointer-events: none;
    display: block;
    width: 100%;
    border: 2px solid transparent;
    border-radius: 4px;
    text-align: left;
    padding: 4px;
    ${IConDownArrow} {
      right: 0;
      top: 58%;
      transform-origin: center;
      pointer-events: none;
      transform: translate(-100%, -100%) rotate(45deg);
    }
  }
  &[aria-expanded='true'] {
    ${IConDownArrow} {
      transform: translate(-100%, -50%) rotate(224deg);
    }
  }

  &:focus,
  &:focus-within {
    outline: none;
    ${Typography} {
      border-color: hsl(216deg 94% 43%);
      border-radius: 4px;
    }
  }
`;

const AccordionContainer = styled(VBox).attrs({
  gap: 0
})`
  overflow: hidden;
  border-radius: 8px;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 50%),
    1px 2px 6px 2px rgb(0 0 0 / 20%);
  // 두번째 요소부터 상단보더 적용
  * + ${AccordionButton} {
    border-top: 1px solid;
    border-color: currentColor;
  }
`;

const AccordionPanel = styled.div<{ label: string }>``;

export {
  AccordionContainer,
  AccordionButton,
  AccordionContent,
  AccordionContentBody,
  IConDownArrow,
  AccordionPanel
};
