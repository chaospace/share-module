import Accordion from '@/components/accordion';
import React from 'react';

function AccordionApp() {
  return (
    <>
      <Accordion variant='default' />
      <Accordion variant='info' />
      <Accordion variant='success' />
    </>
  );
}

export default AccordionApp;
