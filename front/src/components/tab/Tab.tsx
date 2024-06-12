import React from 'react';
import styled from 'styled-components';
import { StyleVariantProps } from 'styled';
import {
  getAccentColorDark,
  getAccentColorLight,
  getAccentColorMain,
  getVariantColorMain,
  shouldForwardVariantProps
} from '@/styles/utils';
import Typography from '../elements/Typography';
import { polymorphicForwardRef } from '../types';

interface TabProps extends StyleVariantProps {
  label?: string;
  value?: string;
}

const TabButton = styled.button
  .withConfig({
    shouldForwardProp: shouldForwardVariantProps()
  })
  .attrs<StyleVariantProps>(_ => ({
    variant: _.variant ?? 'default',
    accentVariant: _.accentVariant ?? 'primary'
  }))`
  border-radius: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid ${getVariantColorMain};
  border-top-width: 4px;
  ${Typography}{
    color:${getVariantColorMain};
    padding:2px 4px;
    border:1px solid transparent;
  }
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-selected='true']{
    outline:none;
    border-top-color:${getAccentColorMain};
    ${Typography}{
      color:${getAccentColorDark};
      border-color:${getAccentColorMain};
    }
  }

  
  &:focus {
    background-color: ${getAccentColorLight};
  }
  & + * {
    border-left:none;
  }
`;

const Tab = polymorphicForwardRef<'button', TabProps>(
  ({ label, value, variant = 'default', accentVariant = 'primary', ...rest }, forwardedRef) => {
    return (
      <TabButton
        ref={forwardedRef}
        variant={variant}
        accentVariant={accentVariant}
        value={value}
        {...rest}>
        <Typography as='span'>{label}</Typography>
      </TabButton>
    );
  }
);

export type { TabProps };
export default Tab;
