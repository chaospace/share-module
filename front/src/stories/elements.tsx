//테스트용 더미 컴포넌트
import React from 'react';
import { VBox, HBox } from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import Button from '@/components/elements/Button';

const TempTypography = ({ p }: any) => {
  return (
    <VBox p={p}>
      <Typography variant='title'>Accordion Component Example</Typography>
      <Typography variant='subTitle1'>
        Next, we wrap our definition using the utility types that React provides to complete the
        props for a specified element. Typically, we statically write the tag, for example
        React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E
        type.
      </Typography>
      <Typography>
        Next, we wrap our definition using the utility types that React provides to complete the
        props for a specified element. Typically, we statically write the tag, for example
        React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E
        type.
      </Typography>
      <Typography variant='caption'>
        Next, we wrap our definition using the utility types that React provides to complete the
        props for a specified element. Typically, we statically write the tag, for example
        React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E
        type.
      </Typography>
      <HBox>
        <Button variant='success'>success</Button>
        <Button>default</Button>
        <Button variant='warning'>warning</Button>
        <Button variant='info'>info</Button>
        <Button variant='danger'>danger</Button>
        <Button variant='primary'>primary</Button>
      </HBox>
    </VBox>
  );
};

export { TempTypography };
