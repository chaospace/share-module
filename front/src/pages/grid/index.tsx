import { HBox, VBox } from '@/components/elements/Box';
import Grid from '@/components/elements/Grid';
import React from 'react';

function GridApp() {
  return (
    <React.Fragment>
      <Grid gap={40} height='100vh' placeContent='center'>
        <HBox>
          <span>아이템</span>
          <span>아이템2</span>
          <span>아이템3</span>
        </HBox>
        <VBox>
          <span>아이템</span>
          <span>아이템2</span>
          <span>아이템3</span>
        </VBox>
      </Grid>
    </React.Fragment>
  );
}

export default GridApp;
