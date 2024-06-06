import { VBox } from '@/components/elements/Box';
import InputRange from '@/components/range';
import React from 'react';

function RangeApp() {
  return (
    <VBox gap={6}>
      <InputRange />
      <InputRange variant='primary' />
      <InputRange variant='success' />
    </VBox>
  );
}

export default RangeApp;
