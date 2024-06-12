import React, { PropsWithChildren } from 'react';
import { StyleVariantProps } from 'styled';
import {
  getAccentColorDark,
  getAccentColorLight,
  getAccentColorMain,
  getVariantColorMain,
  shouldForwardVariantProps,
  toReactElement
} from '@/styles/utils';
import Typography from '../elements/Typography';
import { polymorphicForwardRef } from '../types';
import { getPanelId, getTabId, useTabContext } from './TabContext';
import { TabWrapper } from './elements.style';
import styled from 'styled-components';

interface TabProps extends StyleVariantProps {
  label?: string;
  value: string;
}

const TabButton = styled.div
  .withConfig({
    shouldForwardProp: shouldForwardVariantProps()
  })
  .attrs<StyleVariantProps>(_ => ({
    variant: _.variant ?? 'default',
    accentVariant: _.accentVariant ?? 'primary'
  }))`
  
  padding:8px 16px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  min-width: 100px;
  border: 1px solid ${getVariantColorMain};
  border-top-width: 6px;
  ${Typography}{
    color:${getVariantColorMain};
    padding:2px 4px;
    border:1px solid transparent;
  }
  ${TabWrapper}:hover &,
  ${TabWrapper}:focus &,
  ${TabWrapper}:focus-within &,
  ${TabWrapper}[aria-selected='true'] &  {
    ${Typography}{
      color:${getAccentColorDark};
      border-color:${getAccentColorMain};
    }
  }

  
  ${TabWrapper}[aria-selected='true']  & {
    border-top-color:${getAccentColorMain};
    background-color: ${getAccentColorLight};
  }
`;

const Tab = polymorphicForwardRef<'button', PropsWithChildren<TabProps>>(
  (
    { label = undefined, value, variant = 'default', accentVariant = 'primary', children, ...rest },
    forwardedRef
  ) => {
    const context = useTabContext();

    const tabId = getTabId(context, value!);
    const panelId = getPanelId(context, value);

    return (
      <TabWrapper
        id={tabId}
        aria-controls={panelId}
        ref={forwardedRef}
        role='tab'
        variant={variant}
        accentVariant={accentVariant}
        value={value}
        {...rest}>
        {label ? (
          <TabButton variant={variant} accentVariant={accentVariant}>
            <Typography as='span'>{label}</Typography>
          </TabButton>
        ) : (
          React.Children.toArray(children).map(o => {
            return React.cloneElement(toReactElement(o), {
              variant,
              accentVariant
            });
          })
        )}
      </TabWrapper>
    );
  }
);

export type { TabProps };
export default Tab;
