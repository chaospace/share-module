import styled, { css } from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline/ArrowIosDownwardOutline';
import IconButton from '@/components/elements/IconButton';
import { VariantCategory } from 'styled';
import { amber, grey, indigo, red, teal } from '@/colors';
import deepPurple from '@/colors/deepPurple';
import { appendVariantValue, variantProxy } from '@/styles/utils';

const menubarVariant = appendVariantValue<{ icon?: string }>({
  default: { icon: grey[50] },
  primary: { icon: indigo[50] },
  info: { icon: teal[50] },
  success: { icon: deepPurple[50] },
  warning: { icon: amber[50] },
  danger: { icon: red[50] }
});

const ArrowIcon = styled(ArrowIosDownwardOutline)``;

const Menu = styled.ul
  .attrs<CSSComposerObject>(_ => ({
    position: _.position ?? 'relative',
    alignSelf: 'start',
    display: _.display ?? 'flex'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

const MenuItemGuard = styled.li
  .attrs<CSSComposerObject>(_ => ({
    position: _.position ?? 'relative',
    display: _.display ?? 'inherit',
    alignItems: _.alignItems ?? 'start',
    bgColor: _.bgColor ?? 'azure'
  }))
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })(composer);

const variantComposer = variantProxy(menubarVariant, c => {
  return css`
    color: ${c.light}!important;
    background-color: ${c.main};
    &:hover,
    &.selected {
      background-color: ${c.dark};
    }
    ${IconButton} {
      color: ${c.icon};
      pointer-events: none;
      svg: {
        fill: currentColor;
      }
    }
  `;
});

const MenuItem = styled.a.attrs<{
  variant?: VariantCategory;
}>(_ => ({
  variant: _.variant ?? 'default'
}))`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  white-space: nowrap;
  gap: 8px;
  width: 100%;
  ${variantComposer}
`;

const Container = styled.nav`
  position: relative;
  display: flex;

  ${Menu}[aria-orientation='vertical'] {
    flex-direction: column;
  }

  ${MenuItem}:hover, ${MenuItem}.selected {
    ${IconButton} {
      transform: rotate(-180deg);
    }
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
  ${MenuItem}:hover, ${MenuItem}.selected {
    ${IconButton} {
      transform: rotate(-90deg);
    }
  }
`;

export { ArrowIcon, PopOverContainer, Container, Menu, MenuItem, MenuItemGuard };
