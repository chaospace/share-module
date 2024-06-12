import styled from 'styled-components';

const TabPanelContainer = styled.div`
  position: relative;
  border: 1px solid #ababab;
  border-radius: 0 0 4px 4px;
  margin-top: -1px;
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

export { TabPanelContainer, CustomTabButton };
