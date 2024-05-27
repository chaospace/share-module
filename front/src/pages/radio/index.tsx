import React from 'react';
import RadioGroup from '@/components/elements/RadioGroup';
import { HBox, VBox } from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import Switch from '@/components/elements/Switch';

const options = ['사과', '귤', '바나나'];

function RadioApp() {
  return (
    <VBox gap={7}>
      <VBox gap={1}>
        <Typography id='fruit-label' variant='subTitle2'>
          과일 종류
        </Typography>
        <HBox aria-labelledby='fruit-label'>
          <RadioGroup name='fruit' options={options} />
        </HBox>
      </VBox>

      <VBox gap={1}>
        <Typography id='job-label' variant='subTitle2'>
          개발 종류
        </Typography>
        <HBox aria-labelledby='job-label'>
          <RadioGroup
            name='job'
            aria-lab
            variant='success'
            options={['백엔드', '프론트', '서버', '인프라']}
          />
        </HBox>
      </VBox>

      <Switch variant='info'>자동저장</Switch>
      <Switch variant='success'>단위</Switch>
    </VBox>
  );
}

export default RadioApp;
