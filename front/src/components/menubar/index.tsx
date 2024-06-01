import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { polymorphicForwardRef } from '@/components/types';
import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { ArrowIosDownwardOutline } from '@styled-icons/evaicons-outline/ArrowIosDownwardOutline';
import IconButton from '@/components/elements/IconButton';
import { createPortal } from 'react-dom';
import createReactContext from '@/components/createReactContext';

type MenuVO = {
  label: string;
  link?: string;
  children?: MenuVO[];
  expanded?: false;
};

type MenuBarProps = {
  provider: MenuVO[];
};

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

  /* &:focus-visible {
    outline: 2px solid darkblue;
  } */
`;

const Container = styled.nav`
  position: relative;
  display: flex;

  ${Menu}[aria-orientation='vertical'] {
    flex-direction: column;
  }
`;

function useRefSync<T extends any>(ref: React.ForwardedRef<T>) {
  const innerRef = React.useRef<T>(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
}

const KeyAction = {
  NEXT: 'NEXT',
  PREV: 'PREV',
  SWAP_NEXT: 'SWAP_NEXT',
  SWAP_PREV: 'SWAP_PREV'
} as const;

type KEY_ACTION = keyof typeof KeyAction;

const getKeyAction = (key: string, isHorizontal = false) => {
  let action: KEY_ACTION = KeyAction.NEXT;
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
  return action;
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

const predicateByElementID = (menuID: string) => (o: MenuVO) => o.label === menuID;
const findIndex = (list: MenuVO[], predicate: (o: MenuVO) => unknown) => list.findIndex(predicate);

const getLoopMenuIDWithDir = (provider: MenuVO[], menuID: string, dir = 'next') => {
  let current = findIndex(provider, predicateByElementID(menuID));
  if (dir === 'next') {
    current += 1;
    if (current >= provider.length) current = 0;
  } else {
    current -= 1;
    if (current < 0) current = provider.length - 1;
  }
  return provider[current].label;
};

const getLoopMenuIDWithDir2 = (provider: string[], index: number, dir = 'next') => {
  let current = index; //findIndex(provider, predicateByElementID(menuID));
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

const [useMenubarContext, MenubarProvider] = createReactContext<{
  menus: {
    [key: string]: React.MutableRefObject<{
      [key: string]: MenuItemRefHandler;
    }>;
  };
  rootMenu: { [key: string]: string[] };
}>();
const [useMenubarSelectContext, MenubarSelectProvider] =
  createReactContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>();

interface MenuItemRefHandler {
  setTabEnable: (b: boolean) => void;
  setExpanded: (b: boolean) => void;
  setFocus: () => void;
  getElement: () => HTMLAnchorElement;
  getData: () => MenuVO;
}

const MenuItemWrapper = React.forwardRef<
  MenuItemRefHandler,
  PropsWithChildren<{
    id?: string;
    selected?: boolean;
    ariaHasPopup?: boolean;
    ariaExpanded?: boolean;
    onClick?: MouseEventHandler;
    onKeyDown?: KeyboardEventHandler;
    onFocus?: FocusEventHandler;
    data: MenuVO;
  }>
>(
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
    const [_expanded, _setExpanded] = useState(false);
    const eleRef = useRef<HTMLAnchorElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          setTabEnable(b: boolean) {
            _setTabEnable(b);
          },
          setExpanded(b: boolean) {
            _setExpanded(b);
          },
          setFocus() {
            eleRef.current?.focus();
          },
          getElement() {
            return eleRef.current!;
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
  const { menus, rootMenu } = useMenubarContext();
  // const menuRef = useRef<HTMLUListElement>(null);
  const menuItems = useRef<{ [key: string]: MenuItemRefHandler }>({});
  const registMenuItemRef = useCallback((key: string, node: MenuItemRefHandler) => {
    menuItems.current[key] = node;
  }, []);

  const onClickMenuItemHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const ele = e.target as HTMLElement;
    menuItems.current[ele.id].setTabEnable(false);
  };
  const onFocusHandler = (e: React.FocusEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const ele = e.target as HTMLElement;
    if (ele.tagName.toLowerCase() !== 'a') return;
    if (menuItems.current[ele.id]) {
      menuItems.current[ele.id].setTabEnable(true);
    }
    //현재 선택된 메뉴가 있는 트리정보 참조
    const menuLocations = getMenuHierarchy(ele);
    //popover에 있는 메뉴 id를 가져오면 된다.
    //clearMenus
    setSelected(menuLocations);
  };

  const swapMenuItem = (current: MenuItemRefHandler, next: MenuItemRefHandler) => {
    current.setTabEnable(false);
    next.setFocus();
    next.setTabEnable(true);
  };

  const findGroupKeyByLabel = (menuLabel: string) => {
    const result: any = {};
    for (let key in rootMenu) {
      if (key.includes(menuLabel)) {
        result.menuLabelList = rootMenu[key];
        result.index = rootMenu[key].indexOf(menuLabel);
      }
    }
    return result;
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    const { key } = e;
    const isH = ariaOrientation === 'horizontal';
    const ele = e.target as HTMLElement;
    const vo = menuItems.current[ele.id].getData();
    const action = getKeyAction(key, isH);
    const locations = getMenuHierarchy(ele);

    //그룹에 index를 찾은 후 키를 찾아야 한다.
    switch (action) {
      case KeyAction.NEXT:
        swapMenuItem(
          menuItems.current[ele.id],
          menuItems.current[getLoopMenuIDWithDir(provider, ele.id)]
        );
        break;
      case KeyAction.PREV:
        swapMenuItem(
          menuItems.current[ele.id],
          menuItems.current[getLoopMenuIDWithDir(provider, ele.id, 'prev')]
        );
        break;
      case KeyAction.SWAP_NEXT:
        if (vo.children) {
          swapMenuItem(menuItems.current[ele.id], menus[ele.id].current[vo.children[0].label]);
        } else if (!isH) {
          const { menuLabelList, index } = findGroupKeyByLabel(locations[0]);
          swapMenuItem(
            menuItems.current[ele.id],
            menus['menubar'].current[getLoopMenuIDWithDir2(menuLabelList, index)]
          );
        }
        break;
      case KeyAction.SWAP_PREV:
        const parentID =
          locations.length > 2 ? locations[locations.indexOf(ele.id) - 1] : locations[0];
        const { menuLabelList, index } = findGroupKeyByLabel(parentID);
        if (locations.length > 2) {
          const menuKey = findParentMenuKeyByMenuItem(parentID);
          swapMenuItem(menuItems.current[ele.id], menus[menuKey].current[menuLabelList[index]]);
        } else if (!isH) {
          swapMenuItem(
            menuItems.current[ele.id],
            menus['menubar'].current[getLoopMenuIDWithDir2(menuLabelList, index, 'prev')]
          );
        }
        break;
    }
  };

  const popOverable = role === 'menubar';

  //초기화

  useLayoutEffect(() => {
    //시작메뉴 탭 인덱스 적용
    if (popOverable && provider) {
      menuItems.current[provider[0].label].setTabEnable(true);
    }
    //하위메뉴 참조 초기화
    menus[ariaLabelledBy || role] = menuItems;
    // eslint-disable-next-line
  }, [ariaLabelledBy, role, provider]);

  return (
    <Menu
      role={role}
      aria-orientation={ariaOrientation}
      aria-labelledby={ariaLabelledBy}
      {...style}>
      {provider?.map(vo => {
        const itemSelect = selected.includes(vo.label);
        const subExpanded = itemSelect && !!vo.children;
        const rect =
          popOverable && subExpanded
            ? menuItems.current[vo.label].getElement().getBoundingClientRect()
            : null;
        return (
          <MenuItemGuard key={vo.label} role='none'>
            <MenuItemWrapper
              id={vo.label}
              ariaHasPopup={vo?.children ? true : false}
              ariaExpanded={subExpanded}
              data={vo}
              selected={itemSelect}
              ref={node => {
                if (node) {
                  registMenuItemRef(vo.label, node);
                }
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
            {subExpanded &&
              (popOverable ? (
                createPortal(
                  <Popover>
                    <MenuWrapper
                      role='menu'
                      ariaLabelledBy={vo.label}
                      provider={vo.children!}
                      style={{
                        position: 'absolute',
                        left: rect?.left,
                        top: rect?.bottom
                      }}
                    />
                  </Popover>,
                  document.body
                )
              ) : (
                <MenuWrapper role='menu' ariaLabelledBy={vo.label} provider={vo.children!} />
              ))}
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

const flatMenuLabel = (provider: MenuVO[], refs: Record<string, string[]>) => {
  const labels = provider.map(o => o.label);
  refs[labels.join('|')] = labels;
  provider.forEach(o => o.children && flatMenuLabel(o.children, refs));
};

/**
 *
 * menubar 컴포넌트
 * 키보드 방향키를 이용한 탭인덱스 적용
 * 데이터조작은
 * - reducer이용?
 * - context이용?
 * - 결국 context에 의의는 뭔가
 *   변경상태를 공유.
 *   전역설정을 공유.
 *   컴포넌트
 * - menu를 참조할 수 있는 ref만 관리되면 훅 하나로 모든 것이 관리가능 할 듯.
 */
const MenuBar = polymorphicForwardRef<'nav', MenuBarProps>(
  ({ provider, as = 'nav' }, forwaredRef) => {
    const synRef = useRefSync(forwaredRef);
    const value = useMemo(() => {
      const refs = {};
      flatMenuLabel(provider, refs);
      return {
        menus: {},
        rootMenu: refs
      };
    }, [provider]);

    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
      const popOverRoot = document.querySelector('#menubarRoot');
      const onMouseUpDocument = (e: MouseEvent) => {
        e.preventDefault();
        const ele = e.target as HTMLElement;
        if (!synRef.current.contains(ele) && popOverRoot && !popOverRoot.contains(ele)) {
          if (selected.length) {
            //메뉴 영역을 벗어난 곳을 클릭 시 메뉴초기화
            setSelected([]);
          }
        }
      };
      document.addEventListener('click', onMouseUpDocument, true);
      return () => {
        document.removeEventListener('click', onMouseUpDocument, true);
      };
      // eslint-disable-next-line
    }, [selected, synRef.current]);

    //provider는 메뉴 구조를 나타내는 배열정보..
    return (
      <React.Fragment>
        <MenubarProvider value={value}>
          <MenubarSelectProvider value={[selected, setSelected]}>
            <Container as={as} role='navigation' ref={synRef}>
              <MenuWrapper role='menubar' ariaOrientation='horizontal' provider={provider} />
            </Container>
          </MenubarSelectProvider>
        </MenubarProvider>
      </React.Fragment>
    );
  }
);
MenuBar.displayName = 'MenuBar';
export type { MenuVO };
export default MenuBar;
