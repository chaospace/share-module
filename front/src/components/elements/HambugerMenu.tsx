import { useState } from 'react';
import styled from 'styled-components';
import { useWatch } from '../hooks';

const Icon = styled.span`
  display: inline-block;
  border-radius: 1px;
  height: 2px;
  width: 100%;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 1;
  background-color: #666;
  transform-origin: center;
`;

const MenuContainer = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
  padding: 0px 12px;
  gap: 8px;
  border-radius: 4px;
  justify-content: center;
  box-shadow:
    0 2px 4px 1px rgb(0 0 0 /10%),
    0px 0px 1px -1px rgb(0 0 0 /30%);

  &.selected {
    ${Icon} {
      background-color: #333;
    }
    ${Icon}:first-child {
      transform: translateY(10px) rotate(135deg);
    }
    ${Icon}:last-child {
      transform: translateY(-10px) rotate(-135deg);
    }
    ${Icon}:nth-child(2) {
      transform: rotate(-135deg);
      opacity: 0;
    }
  }
`;

function HambugerMenu({ onChange }: { onChange?: (selected: boolean) => void }) {
  const [selected, setSelected] = useState(false);

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelected(!selected);
  };
  useWatch(() => {
    onChange && onChange(selected);
  }, [selected, onChange]);
  return (
    <MenuContainer href='#' className={selected ? 'selected' : ''} onClick={onClickHandler}>
      <Icon />
      <Icon />
      <Icon />
    </MenuContainer>
  );
}

export default HambugerMenu;
