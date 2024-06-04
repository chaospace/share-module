import React, { useState } from 'react';
import { Box, VBox } from '../elements/Box';
import Button from '../elements/Button';
import styled from 'styled-components';
import Typography from '../elements/Typography';
import Input from '../elements/Input';

const IConDownArrow = styled.i`
  position: absolute;
  display: inline-block;
  border-width: 0 2px 2px 0;
  border-style: solid;
  border-color: currentColor;
  height: 8px;
  width: 8px;
`;

const AccordionContentBody = styled.div`
  padding: 20px;
  transform: translateY(-100%);
`;

const AccordionContent = styled(Box).attrs({
  p: 16,
  overflow: 'hidden'
})`
  pointer-events: none;
`;

const AccordionButton = styled(Button).attrs({
  gap: 2,
  px: 24,
  py: 16,
  width: '100%',
  display: 'block',
  borderRadius: 0,
  border: 'none',
  variant: 'info'
})`
  ${Typography} {
    position: relative;
    pointer-events: none;
    display: block;
    width: 100%;
    border: 2px solid transparent;
    border-radius: 4px;
    text-align: left;
    padding: 4px;
    ${IConDownArrow} {
      right: 0;
      top: 58%;
      transform-origin: center;
      pointer-events: none;
      transform: translate(-100%, -100%) rotate(45deg);
    }
  }
  &[aria-expanded='true'] {
    ${IConDownArrow} {
      transform: translate(-100%, -50%) rotate(224deg);
    }
  }

  &:focus,
  &:focus-within {
    outline: none;
    ${Typography} {
      border-color: hsl(216deg 94% 43%);
      border-radius: 4px;
    }
  }
`;

const Container = styled(VBox).attrs({
  gap: 0
})`
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid #d1c4e9;
  // 두번째 요소부터 상단보더 적용
  * + * {
    border-top: 1px solid;
    border-color: currentColor;
  }

  ${AccordionButton}[aria-expanded='true'] + ${AccordionContent} ${AccordionContentBody} {
    transform: translateY(0);
    transition: all 300ms 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

function Accordion() {
  const [selected, setSelected] = useState('');

  const onClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    console.log(e);
    setSelected(prev => (prev === e.target?.id ? '' : e.target?.id));
  };

  return (
    <React.Fragment>
      <Container>
        <AccordionButton
          id='acc-1'
          aria-controls='acc-region-1'
          aria-expanded={selected === 'acc-1'}
          onClick={onClickItem}>
          <Typography as='span'>
            아코디언
            <IConDownArrow />
          </Typography>
        </AccordionButton>
        <AccordionContent
          role='region'
          id='acc-region-1'
          aria-labelledby='acc-1'
          hidden={selected !== 'acc-1'}>
          <AccordionContentBody>
            <Input type='text' />
            <br />
            <Input type='tel' />
            <br />
            <Input type='url' />
            <br />
            <Input type='search' />
          </AccordionContentBody>
        </AccordionContent>
        <AccordionButton
          id='acc-2'
          aria-controls='acc-region-2'
          aria-expanded={selected === 'acc-2'}
          onClick={onClickItem}>
          <Typography as='span'>
            아코디언2
            <IConDownArrow />
          </Typography>
        </AccordionButton>
        <AccordionContent
          role='region'
          id='acc-region-2'
          aria-labelledby='acc-2'
          hidden={selected !== 'acc-2'}>
          <AccordionContentBody>
            <Input type='text' />
            <br />
            <Input type='tel' />
            <br />
            <Input type='url' />
            <br />
            <Input type='search' />
          </AccordionContentBody>
        </AccordionContent>
        <AccordionButton
          id='acc-3'
          aria-controls='acc-region-3'
          aria-expanded={selected === 'acc-3'}
          onClick={onClickItem}>
          <Typography as='span'>
            아코디언3
            <IConDownArrow />
          </Typography>
        </AccordionButton>
        <AccordionContent
          role='region'
          id='acc-region-3'
          aria-labelledby='acc-3'
          hidden={selected !== 'acc-3'}>
          <AccordionContentBody>
            <Input type='text' />
            <br />
            <Input type='tel' />
            <br />
            <Input type='url' />
            <br />
            <Input type='search' />
          </AccordionContentBody>
        </AccordionContent>
      </Container>
    </React.Fragment>
  );
}

export default Accordion;
