import React from 'react';
import { HBox, VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Typography from '@/components/elements/Typography';
import Tooltip from '@/components/tooltip';
import { Container } from '@/components/elements/Container';

function TooltipApp() {
  return (
    <React.Fragment>
      <VBox mx={100}>
        <Typography variant='title'>툴팁 동작샘플</Typography>
        <HBox>
          <Tooltip
            placement='top-start'
            title={
              <React.Fragment>
                <Typography as='span'>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button gridArea='top-start'>top-start</Button>
          </Tooltip>
          <Tooltip
            placement='top'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button gridArea='top'>top</Button>
          </Tooltip>
          <Tooltip
            placement='top-end'
            title={
              <React.Fragment>
                <Typography variant='subTitle1'>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button gridArea='top-end'>top-end</Button>
          </Tooltip>
        </HBox>
        <HBox>
          <Tooltip
            placement='left'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>left</Button>
          </Tooltip>

          <Tooltip
            placement='left-start'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>left-start</Button>
          </Tooltip>

          <Tooltip
            placement='left-end'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>left-end</Button>
          </Tooltip>
        </HBox>
        <HBox>
          <Tooltip
            placement='right'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>right</Button>
          </Tooltip>

          <Tooltip
            placement='right-start'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>right-start</Button>
          </Tooltip>

          <Tooltip
            placement='right-end'
            offset='2'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>right-end</Button>
          </Tooltip>
        </HBox>
        <HBox>
          <Tooltip
            placement='bottom'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>bottom</Button>
          </Tooltip>

          <Tooltip
            placement='bottom-start'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>bottom-start</Button>
          </Tooltip>

          <Tooltip
            placement='bottom-end'
            offset='10'
            title={
              <React.Fragment>
                <Typography>툴팁 컨텐츠</Typography>
              </React.Fragment>
            }>
            <Button>bottom-end</Button>
          </Tooltip>
        </HBox>

        <Typography variant='title'>툴팁 trigger동작</Typography>
        <Tooltip title='클릭해야 보여요.' placement='bottom' variant='info' disableHover>
          <Button>클릭으로 열고 도큐먼트 클릭시 제거</Button>
        </Tooltip>

        <Tooltip title='클릭해야 다른클릭.' placement='bottom-end' variant='success' disableHover>
          <Button>클릭으로 열고 도큐먼트 클릭시 제거</Button>
        </Tooltip>

        <Tooltip
          disableHover
          title={
            <React.Fragment>
              <Container maxWidth={300} wordWrap='break-word'>
                <div
                  css={`
                    padding: 4px;
                    border: 1px solid red;
                  `}>
                  true || false && false; // true true && (false || false); // false (2 === 3) || (4
                  &gl 0) && (1 === 1); // false
                </div>
              </Container>
            </React.Fragment>
          }>
          <Button>최대넓이 지정</Button>
        </Tooltip>
      </VBox>
    </React.Fragment>
  );
}

export default TooltipApp;
