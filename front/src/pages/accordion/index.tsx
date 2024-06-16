import Accordion from '@/components/accordion';
import { AccordionPanel } from '@/components/accordion/elements.style';
import { HBox, VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
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
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ele = e.target as HTMLFormElement;

    console.log('유효성은!', ele.checkValidity());

    console.log(e);
  };

  return (
    <>
      <Accordion select='아코디언2' variant='info'>
        <AccordionPanel label='테스트'>
          <VBox p={20}>
            <form onSubmit={onSubmit}>
              <HBox alignItems='center'>
                <Label htmlFor='user-name' fontSize={14}>
                  이름
                </Label>
                <Input id='user-name' required type='text' />
              </HBox>

              <HBox alignItems='center'>
                <Label htmlFor='user-phonenumber' fontSize={14}>
                  전화번호
                </Label>
                <Input id='user-phonenumber' type='tel' pattern='[0-9]{3}[0-9]{3,4}[0-9]{4}' />
              </HBox>

              <Button type='submit'>등록</Button>
            </form>
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
