import React, { HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';
import { HBox } from '../elements/Box';
import { getTabId, useTabContext } from './TabContext';
import { getValidChildren } from '@/styles/utils';

interface TabListProps {
  id?: string;
  'aria-label'?: string;
  className?: string;
}

const moveFocusItem = (nodes: HTMLElement[], index: number) => {
  nodes.forEach((node, idx) => {
    if (index === idx) {
      node.tabIndex = Number(undefined);
      node.focus();
    } else {
      node.tabIndex = -1;
    }
  });
};

function TabList({
  id = undefined,
  className = undefined,
  'aria-label': ariaLabel = undefined,
  children: childList
}: PropsWithChildren<TabListProps>) {
  const children = getValidChildren(childList);
  const tabListRef = useRef<(HTMLElement | null)[]>([]);
  const context = useTabContext();
  const { value, values, setValue } = context;
  const focusIndexRef = useRef(values.indexOf(value));

  const onChangeSelect = (select: string) => {
    setValue(select);
  };

  /**
   * value가 변경되면 ref도 초기화
   */
  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        focusIndexRef.current =
          focusIndexRef.current - 1 < 0 ? focusIndexRef.current : focusIndexRef.current - 1;
        break;
      case 'ArrowRight':
        focusIndexRef.current =
          focusIndexRef.current + 1 >= values.length
            ? focusIndexRef.current
            : focusIndexRef.current + 1;
        break;
      case 'Enter':
        onChangeSelect(values[focusIndexRef.current]);
        break;
    }
    moveFocusItem(tabListRef.current as HTMLElement[], focusIndexRef.current);
  };

  /**
   * 키보드 이동 시 싱크처리
   * 여기서 set을 여러번 하면 그만큼 render가 발생됨.
   */
  useEffect(() => {
    const aIndex = values.indexOf(value);
    tabListRef.current.forEach((node, idx) => {
      if (idx === aIndex) node?.focus();
      else node?.blur();
    });
  }, [value, values]);

  return (
    <HBox id={id} gap={0} className={className} role='tablist' aria-label={ariaLabel}>
      {children.map((o: any, idx) => {
        const oValue = o.props.value;
        const selected = value === oValue;

        const id = getTabId(context, oValue);
        return React.cloneElement(
          o as React.ReactElement<
            React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
          >,
          {
            key: id,
            'aria-selected': selected,
            tabIndex: selected ? undefined : -1,
            onClick: () => onChangeSelect(oValue),
            onKeyDown: onKeyDownHandler,
            ref: (node: HTMLElement) => {
              tabListRef.current[idx] = node;
            }
          }
        );
      })}
    </HBox>
  );
}

export default TabList;
