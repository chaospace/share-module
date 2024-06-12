import React, { HTMLAttributes, PropsWithChildren } from 'react';
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

  const context = useTabContext();
  const { value } = context;

  const onClickTabItem = (select: string) => {
    console.log('select', select);
    onChange && onChange(select);
  };

  return (
    <HBox id={id} gap={0} className={className} aria-label={ariaLabel}>
      {children.map((o: any) => {
        const oValue = o.props.value;
        const selected = oValue === value;
        console.log(o, o.props);
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
            tabIndex: selected === false ? -1 : undefined,
            onClick: () => onClickTabItem(oValue)
          }
        );
      })}
    </HBox>
  );
}

export default TabList;
