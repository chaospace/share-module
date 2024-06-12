import { shouldForwardVariantProps } from '@/styles/utils';
import styled from 'styled-components';
import { StyleVariantProps } from '../../../@types/styled';

const TabPanelContainer = styled.div`
  position: relative;
  border: 1px solid #ababab;
  border-radius: 0 0 4px 4px;
  margin-top: -1px;
  &:focus-within {
    z-index: 1;
  }
`;

const TabWrapper = styled.button.withConfig({
  shouldForwardProp: shouldForwardVariantProps()
})<StyleVariantProps>`
  position: relative;
  border-radius: 0;
  padding: 0;
  margin: 0;
  border: none;
  &:focus,
  &:focus-visible,
  &:hover,
  &[aria-selected='true'] {
    outline: none;
    z-index: 1;
  }
  &:not(&:first-child) {
    margin-left: -1px;
  }
`;

const CustomTabButton = styled.div.withConfig({
  shouldForwardProp: prop => !['value'].includes(prop)
})<{ value?: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: #ababab;
  &:hover,
  &[aria-selected='true'] {
    background-color: lightblue;
    span {
      border-bottom-color: #f50;
    }
  }
  span {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 1px solid;
  }
`;

export { TabPanelContainer, TabWrapper, CustomTabButton };
