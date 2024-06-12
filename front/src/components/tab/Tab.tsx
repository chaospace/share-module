import styled from 'styled-components';
import { StyleVariantProps } from 'styled';
import {
  getAccentColorDark,
  getAccentColorMain,
  getVariantColorMain,
  shouldForwardVariantProps
} from '@/styles/utils';
import Typography from '../elements/Typography';
import { PropsWithHTMLAttributes } from '../types';
import { PropsWithoutRef } from 'react';

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
  & + * {
    border-left:none;
  }
`;

function Tab({
  label,
  value,
  variant = 'default',
  accentVariant = 'primary',
  ...rest
}: PropsWithoutRef<PropsWithHTMLAttributes<'button', TabProps>>) {
  return (
    <TabButton variant={variant} accentVariant={accentVariant} value={value} {...rest}>
      <Typography as='span'>{label}</Typography>
    </TabButton>
  );
}
export type { TabProps };
export default Tab;
