import Accordion from '@/components/accordion';
import { AccordionPanel } from '@/components/accordion/elements.style';
import { VBox } from '@/components/elements/Box';
import Input from '@/components/elements/Input';
import { TempTypography } from '@/stories/elements';
import React from 'react';
/**
 * 아코디언 컴포넌트
 * AccordionPanel을 이용해 내용을 구성하면<br/>
 * 내부에서 헤더를 구성.
 */

const Foo = ({ children }: any) => {
  console.log('children', children);
  return <React.Fragment>{children}</React.Fragment>;
};

function AccordionApp() {
  return (
    <>
      <Accordion select='아코디언2' variant='info'>
        <AccordionPanel label='테스트'>
          <VBox p={20}>
            <Input type='text' />

            <Input type='tel' />

            <Input type='url' />

            <Input type='search' />
            <Input type='text' />

            <Input type='tel' />

            <Input type='url' />

            <Input type='search' />
          </VBox>
        </AccordionPanel>
        <AccordionPanel label='아코디언2'>
          <VBox p={20}>
            <Input type='text' />

            <Input type='tel' />

            <Input type='url' />

            <Input type='search' />
            <Input type='text' />

            <Input type='tel' />

            <Input type='url' />

            <Input type='search' />
          </VBox>
        </AccordionPanel>
        <AccordionPanel label='샘플 타이틀'>
          <TempTypography p={20} />
        </AccordionPanel>
      </Accordion>

      <Foo>
        <span aria-label='test-label'>우니나라</span>
      </Foo>
    </>
  );
}

export default AccordionApp;
