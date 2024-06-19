import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { polymorphicForwardRef } from '@/components/types';
import { CSSComposerObject } from 'styled-composer';
import IconButton from '@/components/elements/IconButton';
import { createPortal } from 'react-dom';
import MenuBarProvider, {
  useMenubarSelectContext,
  useMenubarValueContext,
  useMenubarVariantContext
} from './MenubarContext';
import type { MenuItemImperative, MenuVO } from './MenubarContext';
import {
  Container,
  PopOverContainer,
  Menu,
  MenuItem,
  MenuItemGuard,
  ArrowIcon
} from './elements.style';
import { VariantCategory } from 'styled';
import { useRefSync, useWatch } from '../hooks';

const KeyAction = {
  NEXT: 'NEXT',
  PREV: 'PREV',
  SWAP_NEXT: 'SWAP_NEXT',
  SWAP_PREV: 'SWAP_PREV'
} as const;

type KEY_ACTION = keyof typeof KeyAction;

const getKeyAction = (key: string, isHorizontal = false) => {
  let action: KEY_ACTION | undefined;
  switch (key) {
    case 'ArrowLeft':
      action = isHorizontal ? KeyAction.PREV : KeyAction.SWAP_PREV;
      break;
    case 'ArrowRight':
      action = isHorizontal ? KeyAction.NEXT : KeyAction.SWAP_NEXT;
      break;
    case 'ArrowUp':
      action = isHorizontal ? KeyAction.SWAP_PREV : KeyAction.PREV;
      break;
    case 'ArrowDown':
      action = isHorizontal ? KeyAction.SWAP_NEXT : KeyAction.NEXT;
      break;
  }
  return action ?? '';
};

/**
 * 돔구성을 통해 현재 메뉴트리를 구성해 리턴.
 *
 * @param {HTMLElement} node - 시작노드
 */
const getMenuHierarchy = (node: HTMLElement) => {
  let next: HTMLElement = node;
  let role = node.role!;
  const locations = [node.id];
  while (next && role !== 'presentation' && role !== 'menubar') {
    next = next.parentElement!;
    role = next?.role!;
    if (role === 'menu' || role === 'menubar' || role === 'menuitem') {
      const menuId = next?.getAttribute('aria-labelledby') ?? next?.id;
      if (!!menuId) locations.unshift(menuId);
    }
  }
  return locations;
};

const getLoopMenuIDWithDir = (provider: string[], index: number, dir = 'next') => {
  let current = index;
  if (dir === 'next') {
    current += 1;
    if (current >= provider.length) current = 0;
  } else {
    current -= 1;
    if (current < 0) current = provider.length - 1;
  }
  return provider[current];
};

const findParentMenuKeyByMenuItem = (menuId: string) => {
  let next: HTMLElement | null = document.querySelector(`#${menuId}`)!;
  let role: string | null = next?.role;
  while (next && role !== 'menubar' && role !== 'menu') {
    next = next.parentElement;
    role = next?.role ?? '';
  }
  return next?.getAttribute('aria-labelledby') ?? role!;
};

type MenuItemProp = {
  id?: string;
  selected?: boolean;
  ariaHasPopup?: boolean;
  ariaExpanded?: boolean;
  onClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onFocus?: FocusEventHandler;
  data: MenuVO;
};

const MenuItemWrapper = React.forwardRef<MenuItemImperative, PropsWithChildren<MenuItemProp>>(
  (
    {
      ariaHasPopup = false,
      ariaExpanded = false,
      id,
      data,
      selected,
      children,
      onFocus,
      onClick,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const [_tabEnable, _setTabEnable] = useState(false);
    const eleRef = useRef<HTMLAnchorElement>(null);
    const variant = useMenubarVariantContext();
    useImperativeHandle(
      ref,
      () => {
        return {
          setTabEnable(b: boolean) {
            _setTabEnable(b);
          },
          setFocus() {
            eleRef.current?.focus();
          },
          getBoundingClientRect() {
            return eleRef.current!.getBoundingClientRect();
          },
          getData() {
            return data;
          }
        };
      },
      [data]
    );

    return (
      <MenuItem
        id={id}
        ref={eleRef}
        role='menuitem'
        variant={variant}
        className={(selected && 'selected') || ''}
        href={data.link}
        tabIndex={_tabEnable ? 1 : -1}
        aria-haspopup={ariaHasPopup}
        aria-expanded={ariaExpanded}
        {...rest}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onClick={onClick}>
        {children}
      </MenuItem>
    );
  }
);
MenuItemWrapper.displayName = 'MenuItemWrapper';

// 메뉴 컴포넌트
const MenuWrapper = ({
  role = 'menu',
  ariaOrientation = 'vertical',
  provider,
  ariaLabelledBy,
  style
}: {
  role?: string;
  provider: MenuVO[];
  ariaLabelledBy?: string;
  ariaOrientation?: 'vertical' | 'horizontal';
  style?: CSSComposerObject;
}) => {
  const [selected, setSelected] = useMenubarSelectContext();
  const { menus, getLabelListInMenuItem } = useMenubarValueContext();

  const menuItems = useRef<{ [key: string]: MenuItemImperative }>({});
  const registMenuItemRef = useCallback((key: string, node: MenuItemImperative) => {
    menuItems.current[key] = node;
  }, []);

  const onClickMenuItemHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // e.stopPropagation();
    // const ele = e.target as HTMLElement;
    //menuItems.current[ele.id].setTabEnable(false);
  };
  const onFocusHandler = (e: React.FocusEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const ele = e.target as HTMLElement;
    if (ele.tagName.toLowerCase() !== 'a') return;
    //현재 선택된 메뉴가 있는 트리정보 참조
    const menuLocations = getMenuHierarchy(ele);
    setSelected(menuLocations);
  };

  const swapMenuItem = (current: MenuItemImperative, next: MenuItemImperative) => {
    current.setTabEnable(false);
    next.setFocus();
    next.setTabEnable(true);
  };

  const moveFocusMenuItemInMenu = (menuID: string, dir = 'next') => {
    // menuItems
    const { labels, index } = getLabelListInMenuItem(menuID);
    swapMenuItem(
      menuItems.current[menuID],
      menuItems.current[getLoopMenuIDWithDir(labels, index, dir)]
    );
  };

  const moveFocusMenuItemToNextMenu = (node: HTMLElement) => {
    const menuID = node.id;
    const menuRef = menuItems.current[menuID];
    const vo = menuRef.getData();
    const locations = getMenuHierarchy(node);
    if (vo.children) {
      swapMenuItem(menuRef, menus[menuID].current[vo.children[0].label]);
    } else if (locations.length > 1) {
      const { labels, index } = getLabelListInMenuItem(locations[0]);
      swapMenuItem(menuRef, menus['menubar'].current[getLoopMenuIDWithDir(labels, index)]);
    }
  };

  const moveFocusMenuItemToPrevMenu = (node: HTMLElement) => {
    const menuID = node.id;
    const menuRef = menuItems.current[menuID];
    const locations = getMenuHierarchy(node);
    const hasParent = locations.length > 2;
    const parentID = hasParent ? locations[locations.indexOf(menuID) - 1] : locations[0];
    const { labels, index } = getLabelListInMenuItem(parentID);
    if (hasParent) {
      const menuKey = findParentMenuKeyByMenuItem(parentID);
      swapMenuItem(menuRef, menus[menuKey].current[labels[index]]);
    } else if (locations.length > 1) {
      swapMenuItem(menuRef, menus['menubar'].current[getLoopMenuIDWithDir(labels, index, 'prev')]);
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    const { key } = e;
    const isH = ariaOrientation === 'horizontal';
    const ele = e.target as HTMLElement;
    const action = getKeyAction(key, isH);
    const menuID = ele.id;
    //그룹에 index를 찾은 후 키를 찾아야 한다.
    switch (action) {
      case KeyAction.NEXT:
        moveFocusMenuItemInMenu(menuID);
        break;
      case KeyAction.PREV:
        moveFocusMenuItemInMenu(menuID, 'prev');
        break;
      case KeyAction.SWAP_NEXT:
        moveFocusMenuItemToNextMenu(ele);
        break;
      case KeyAction.SWAP_PREV:
        moveFocusMenuItemToPrevMenu(ele);
        break;
    }
  };

  const popOverable = role === 'menubar';

  //초기화
  useWatch(() => {
    //하위메뉴 참조 초기화
    menus[ariaLabelledBy || role] = menuItems;
  }, [ariaLabelledBy, role]);

  useWatch(() => {
    //시작메뉴 탭 인덱스 적용
    if (role === 'menubar' && !selected.length) {
      menuItems.current[provider[0].label].setTabEnable(true);
    }
  }, [selected, provider, role]);

  const renderChildMenu = useCallback((itemSelect: boolean, vo: MenuVO, popOverable: boolean) => {
    const subExpanded = vo.children && itemSelect;
    const popOverMenu = subExpanded && popOverable;
    const parentDomRect = subExpanded ? menuItems.current[vo.label].getBoundingClientRect() : null;
    const style = subExpanded
      ? {
          position: 'absolute',
          left: popOverMenu ? parentDomRect?.left : parentDomRect?.width,
          top: popOverMenu ? parentDomRect?.bottom : 0,
          width: parentDomRect?.width
        }
      : undefined;
    const SubMenu = (
      <MenuWrapper role='menu' ariaLabelledBy={vo.label} provider={vo.children!} style={style} />
    );
    return (
      subExpanded &&
      (popOverMenu ? createPortal(<Popover>{SubMenu}</Popover>, document.body) : SubMenu)
    );
  }, []);

  return (
    <Menu
      role={role}
      aria-orientation={ariaOrientation}
      aria-labelledby={ariaLabelledBy}
      {...style}>
      {provider.map(vo => {
        const itemSelect = selected.includes(vo.label);
        const subExpanded = itemSelect && !!vo.children;

        return (
          <MenuItemGuard key={vo.label} role='none'>
            <MenuItemWrapper
              id={vo.label}
              ariaHasPopup={vo?.children ? true : false}
              ariaExpanded={subExpanded}
              data={vo}
              selected={itemSelect}
              ref={node => {
                node && registMenuItemRef(vo.label, node);
              }}
              onFocus={onFocusHandler}
              onKeyDown={onKeyDownHandler}
              onClick={onClickMenuItemHandler}>
              {vo.label}
              {vo.children && (
                <IconButton tabIndex={-1}>
                  <ArrowIcon size={16} />
                </IconButton>
              )}
            </MenuItemWrapper>
            {renderChildMenu(itemSelect, vo, popOverable)}
          </MenuItemGuard>
        );
      })}
    </Menu>
  );
};

const Popover = ({ children }: { children: React.ReactNode }) => {
  return (
    <PopOverContainer id='menubarRoot' role='presentation'>
      <div tabIndex={0} />
      {children}
      <div tabIndex={0} />
    </PopOverContainer>
  );
};

type MenuBarProps = {
  provider: MenuVO[];
  variant?: VariantCategory;
};

/**
 *
 * menubar 컴포넌트
 * 키보드 방향키를 이용한 탭인덱스 적용
 * 메뉴, 메뉴아이템의 ref를 참조해 조작한다.
 */
const MenuBar = polymorphicForwardRef<'nav', MenuBarProps>(
  ({ provider, as = 'nav', variant = 'default' }, forwaredRef) => {
    const syncRef = useRefSync(forwaredRef);
    //provider는 메뉴 구조를 나타내는 배열정보..
    return (
      <React.Fragment>
        <MenuBarProvider containerRef={syncRef} variant={variant} provider={provider}>
          <Container as={as} role='navigation' ref={syncRef}>
            <MenuWrapper role='menubar' ariaOrientation='horizontal' provider={provider} />
          </Container>
        </MenuBarProvider>
      </React.Fragment>
    );
  }
);
MenuBar.displayName = 'MenuBar';
export default MenuBar;
