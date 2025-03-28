import React from 'react';
import Button from '@/components/elements/Button';
import { H } from '@/components/elements/Typography';
import { VBox } from '@/components/elements/Box';

const Foo = () => {
  return (
    <VBox>
      <H color='#f50' variant='subTitle2'>
        헤더 컴포넌트
      </H>
      <Button variant='primary'>버튼!</Button>
    </VBox>
  );
};

export default Foo;
