import styled, { ExecutionContext } from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline/ArrowIosDownwardOutline';
import IconButton from '@/components/elements/IconButton';
import { VariantCategory, StyleVariantProps } from 'styled';

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

const variantComposer = ({ theme, variant }: ExecutionContext & StyleVariantProps) => {
  const c = theme.variant[variant!];
  return {
    color: `${c.light}!important`,
    backgroundColor: c.main,
    '&:hover': {
      backgroundColor: c.dark
    },
    '&.selected': {
      backgroundColor: c.dark
    }
  };
};

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
  ${IconButton} {
    pointer-events: none;
    color: inherit;
    svg: {
      fill: currentColor;
    }
  }
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
