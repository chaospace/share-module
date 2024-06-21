import React from 'react';
import { grey } from '@/colors';
import styled from 'styled-components';
import { useIsomorphicLayoutEffect } from '../hooks';
import { lerp } from '@/helper/math';
import { createPortal } from 'react-dom';

interface CursorProps {
  stroke?: string;
  strokeWidth?: number;
}

const Circle = styled.circle.attrs(_ => ({
  cx: _.cx ?? 15,
  cy: _.cy ?? 15,
  r: _.r ?? 7.5,
  strokeWidth: _.strokeWidth ?? 2,
  stroke: _.stroke ?? grey[500]
}))``;

const CursorContainer = styled.svg.attrs({
  width: 30,
  height: 30,
  viewBox: '0 0 30 30',
  fill: 'none'
})`
  position: absolute;
  pointer-events: none;
  transform-origin: center;
  user-select: none;
`;

/**
 * svg를 이용한 커서위치 표현 컴포넌트.
 *
 * @param {CursorProps} props
 *
 */
function Cursor({ stroke = undefined, strokeWidth = 1 }: CursorProps) {
  const ref = React.useRef<SVGSVGElement>(null);
  const tweenPropsRef = React.useRef({
    props: {
      x: 0,
      y: 0,
      scale: 1
    },
    target: {
      x: 0,
      y: 0,
      scale: 1
    }
  });

  useIsomorphicLayoutEffect(() => {
    let reqID: number;
    const cursor = ref.current;
    let owner = cursor?.ownerDocument;
    const target = tweenPropsRef.current.target;
    const props = tweenPropsRef.current.props;

    const render = () => {
      let key: keyof typeof target;
      for (key in target) {
        props[key] = lerp(target[key], props[key]);
      }

      if (cursor) {
        cursor.style.top = `${~~(props.y - 15)}px`;
        cursor.style.left = `${~~(props.x - 15)}px`;
        cursor.style.transform = `scale(${props.scale})`;
      }
      reqID = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      target.x = clientX;
      target.y = clientY;
    };
    const onMouseOver = (e: PointerEvent) => {
      const ele = e.target as HTMLElement;

      const tagName = ele?.tagName.toLocaleLowerCase();
      switch (tagName) {
        case 'button':
        case 'a':
          target.scale = 2;
          break;
      }
    };
    const onMouseOut = (e: PointerEvent) => {
      const ele = e.target as HTMLElement;
      const tagName = ele?.tagName.toLocaleLowerCase();
      switch (tagName) {
        case 'button':
        case 'a':
          target.scale = 1;
          break;
      }
    };
    if (owner) {
      owner.addEventListener('mousemove', onMouseMove);
      owner.addEventListener('pointerover', onMouseOver);
      owner.addEventListener('pointerout', onMouseOut);
    }

    render();
    return () => {
      cancelAnimationFrame(reqID);
      if (owner) {
        owner.removeEventListener('mousemove', onMouseMove);
        owner.removeEventListener('pointerover', onMouseOver);
        owner.removeEventListener('pointerout', onMouseOut);
      }
    };
  }, []);

  return createPortal(
    <CursorContainer ref={ref}>
      <Circle stroke={stroke} strokeWidth={strokeWidth} />
    </CursorContainer>,
    document.body
  );
}

export default Cursor;
