import React from 'react';
import BoundingRectListener from '@/components/listener/BoudingRectListener';

function ChildrenApp() {
  const onClick = (_: React.MouseEvent<HTMLParagraphElement>) => {
    console.log('click', _);
  };

  const onClickOutSideChildElement = (_: MouseEvent | TouchEvent) => {
    console.log('out-side-click');
  };

  return (
    <BoundingRectListener onClickOutSide={onClickOutSideChildElement}>
      <span style={{ width: 'min-content' }} onClick={onClick}>
        <div
          style={{
            position: 'relative',
            height: '40px',
            width: '100px',
            backgroundColor: 'aqua'
          }}>
          <p>카오스</p>
        </div>
      </span>
    </BoundingRectListener>
  );
}

export default ChildrenApp;
