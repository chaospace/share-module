import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline/ArrowIosDownwardOutline';
import IconButton from '@/components/elements/IconButton';

const ArrowIcon = styled(ArrowIosDownwardOutline)``;

const MenuItemGuard = styled.li
  .attrs<CSSComposerObject>(_ => ({
    position: _.position ?? 'relative',
    display: _.display ?? 'inherit',
    alignItems: _.alignItems ?? 'start',
    bgColor: _.bgColor ?? 'azure'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })`
    ${composer}
    &:has(a.selected), &:has(a:hover){
      background-color:lightblue;
    }
  `;

const Menu = styled.ul
  .attrs<CSSComposerObject>(_ => ({
    position: _.position ?? 'relative',
    alignSelf: 'start',
    display: _.display ?? 'flex'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

const MenuItem = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  white-space: nowrap;
  gap: 8px;
  ${IconButton} {
    pointer-events: none;
  }
`;

const Container = styled.nav`
  position: relative;
  display: flex;

  ${Menu}[aria-orientation='vertical'] {
    flex-direction: column;
  }
`;

const PopOverContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  ${Menu}[aria-orientation='vertical'] {
    flex-direction: column;
    pointer-events: auto;
  }
`;

export { ArrowIcon, PopOverContainer, Container, Menu, MenuItem, MenuItemGuard };
