import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import createReactContext from '../createReactContext';

type MenuVO = {
  label: string;
  link?: string;
  children?: MenuVO[];
};

interface MenuItemImperative {
  setTabEnable: (b: boolean) => void;
  setFocus: () => void;
  getBoundingClientRect: () => DOMRect;
  getData: () => MenuVO;
}

type NestedMenuItemImperativeMap = {
  [key: string]: React.MutableRefObject<Record<string, MenuItemImperative>>;
};

const [useMenubarValueContext, MenubarValueProvider] = createReactContext<{
  menus: NestedMenuItemImperativeMap;
  rootMenu: { [key: string]: string[] };
}>();

const [useMenubarSelectContext, MenubarSelectProvider] =
  createReactContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>();

const flatMenuLabel = (provider: MenuVO[], refs: Record<string, string[]>) => {
  const labels = provider.map(o => o.label);
  refs[labels.join('|')] = labels;
  provider.forEach(o => o.children && flatMenuLabel(o.children, refs));
};

function MenuBarProvider({
  provider,
  containerRef,
  children
}: PropsWithChildren<{ provider: MenuVO[]; containerRef: React.RefObject<HTMLElement> }>) {
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
      // e.preventDefault();
      const ele = e.target as HTMLElement;
      if (!containerRef.current!.contains(ele) && popOverRoot && !popOverRoot.contains(ele)) {
        if (selected.length) {
          //메뉴 영역을 벗어난 곳을 클릭 시 메뉴초기화
          setSelected([]);
        }
      }
    };
    document.addEventListener('mousedown', onMouseUpDocument);
    return () => {
      document.removeEventListener('mousedown', onMouseUpDocument);
    };
    // eslint-disable-next-line
  }, [selected, containerRef.current]);

  return (
    <MenubarSelectProvider value={[selected, setSelected]}>
      <MenubarValueProvider value={value}>{children}</MenubarValueProvider>
    </MenubarSelectProvider>
  );
}

export type { MenuVO, MenuItemImperative, NestedMenuItemImperativeMap };
export { useMenubarValueContext, useMenubarSelectContext };
export default MenuBarProvider;
