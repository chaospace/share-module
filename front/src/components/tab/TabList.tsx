import React, { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { HBox } from '../elements/Box';

import { getPanelId, getTabId, useTabContext } from './TabContext';
import { getValidChildren } from '@/styles/utils';

interface TabListProps {
  id?: string;
  'aria-label'?: string;
  className?: string;
  onChange?: (select: string) => void;
}

function TabList({
  id = undefined,
  className = undefined,
  'aria-label': ariaLabel = undefined,
  onChange = undefined,
  children: childList
}: PropsWithChildren<TabListProps>) {
  const children = getValidChildren(childList);
  const tabListRef = useRef<(HTMLElement | null)[]>([]);

  const context = useTabContext();
  const { value, values } = context;

  const [focusIndex, setFocusIndex] = useState(values.indexOf(value));

  const onClickTabItem = (select: string) => {
    onChange && onChange(select);
  };

  /**
   * value가 변경되면 ref도 초기화
   *
   */
  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        setFocusIndex(focusIndex - 1 < 0 ? focusIndex : focusIndex - 1);
        break;
      case 'ArrowRight':
        setFocusIndex(focusIndex + 1 >= values.length ? focusIndex : focusIndex + 1);
        break;
      case 'Enter':
        setFocusIndex(focusIndex);
        onClickTabItem(values[focusIndex]);
        break;
    }
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
    <HBox id={id} gap={0} className={className} aria-label={ariaLabel}>
      {children.map((o: any, idx) => {
        const oValue = o.props.value;
        const selected = focusIndex === idx;

        const id = getTabId(context, oValue);
        const panelId = getPanelId(context, oValue);
        return React.cloneElement(
          o as React.ReactElement<
            React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
          >,
          {
            key: id,
            id: id,
            role: 'tab',
            'aria-selected': selected,
            'aria-controls': panelId,
            tabIndex: selected ? undefined : -1,
            onClick: () => onClickTabItem(oValue),
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
