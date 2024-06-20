import { VBox } from '@/components/elements/Box';
import { Container } from '@/components/elements/Container';
import Grid from '@/components/elements/Grid';
import { H } from '@/components/elements/Typography';
import React from 'react';

function GridApp() {
  return (
    <React.Fragment>
      <Grid
        width={600}
        height={600}
        gridTemplateAreas={`
            'header header header'
            'sidebar content content'
            'sidebar content content'
          `}>
        <Container gridArea='header' bgColor='#eee' p={4}>
          헤더
          <H variant='subTitle1'>그리드 area를 이용한 레이아웃</H>
        </Container>
        <VBox gridArea='sidebar' bgColor='#bbb'>
          사이드바
        </VBox>
        <VBox gridArea='content' bgColor='#aaa'>
          컨텐츠
        </VBox>
      </Grid>
    </React.Fragment>
  );
}

export default GridApp;
