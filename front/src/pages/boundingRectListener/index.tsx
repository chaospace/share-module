import React from 'react';
import BoundingRectListener from '@/components/listener/BoundingRectListener';
import { VBox } from '@/components/elements/Box';
import { H } from '@/components/elements/Typography';
import { useMount, useUnMount } from '@/components/hooks';

function BoundingRectListenerApp() {
  const onClick = (_: React.MouseEvent<HTMLParagraphElement>) => {
    console.log('click', _);
  };

  const onClickOutSideChildElement = (_: MouseEvent | TouchEvent) => {
    alert('out-side-click');
  };

  useMount(() => {
    console.log('페이지 로드!!');
  });

  useUnMount(() => {
    console.log('페이지 언로드!');
  });

  return (
    <VBox>
      <H>요소 이외의 영역을 클릭 시 이벤트 발생!</H>
      <BoundingRectListener onClickOutSide={onClickOutSideChildElement}>
        <span style={{ width: 'min-content' }} onClick={onClick}>
          <div
            style={{
              position: 'relative',
              height: '80px',
              width: '140px',
              wordBreak: 'break-word',
              backgroundColor: 'aqua'
            }}>
            <p>여기를 클릭하면 이벤트 발생 안함</p>
          </div>
        </span>
      </BoundingRectListener>
    </VBox>
  );
}

export default BoundingRectListenerApp;
