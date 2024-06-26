import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../hooks';
import { Font, load } from 'opentype.js';

interface WarpTextProps {
  text: string;
  width?: number | string;
  height?: number;
  animate?: boolean;
  transform?: (
    segment: number[],
    extra: { t: number; scale: (sx: number, sy?: number) => number[]; w: number; h: number }
  ) => number[];
}

interface WarpConfig {
  fontUrl: string;
  frameRate?: number; //프레임레이트
}
const useWarpText = ({ fontUrl, frameRate = 1 / 50 }: WarpConfig) => {
  const [ready, setReady] = useState(false);
  const svgRef = React.useRef<SVGSVGElement>();
  const fontRef = React.useRef<Font>();

  const setRefHandler = useCallback(
    (node: SVGSVGElement | null) => {
      svgRef.current = node ?? undefined;
      if (node) {
        if (fontRef.current) {
          setReady(true);
        }
      }
    },
    [setReady]
  );

  const initialize = useCallback(
    (font: Font) => {
      fontRef.current = font;
      if (svgRef.current) {
        setReady(true);
      }
    },
    [setReady]
  );
  useIsomorphicLayoutEffect(() => {
    load(fontUrl)
      .then(initialize)
      .catch(e => console.log(e));
  }, [fontUrl, initialize]);

  return useMemo(() => {
    const getPath = (text: string, x: number, y: number, fontSize = 60) => {
      return fontRef.current!.getPath(text, x, y, fontSize);
    };
    const play = (warp: any, transformer: any) => {
      let animateID: ReturnType<typeof setTimeout>;
      const animate = () => {
        warp.transform(transformer);
        animateID = setTimeout(animate, frameRate);
      };
      animate();
      return () => {
        clearTimeout(animateID);
      };
    };

    return {
      ready,
      node: svgRef.current,
      font: fontRef.current,
      getPath,
      play,
      setRefHandler
    };
  }, [ready, setRefHandler, frameRate]);
};

const curriedScale = (boundingArea: DOMRect) => (sx: number, sy?: number) => {
  return sy
    ? [boundingArea.width * sx, boundingArea.height * sy]
    : [boundingArea.width * sx, boundingArea.height * sx];
};
/**
 * A = 진폭 = amplitude;
 * B = 주기 = 2파이/B;
 * C = 가로 shift (양수좌측, 음수 우측)
 * D = 세로 shift
 * 파동공식 = A * Math.sin(B(x+C))+D
 */
function WarpText({
  text,
  width = 200,
  height = 200,
  animate = false,
  transform = undefined
}: WarpTextProps) {
  // svg를 이용해야 한다.
  // svg를 조작하고 화면에는 캔버스로 그리는게 좋지 않을까?
  const effectComposer = useWarpText({
    fontUrl: './assets/fonts/ChusaLove.ttf'
  });

  useEffect(() => {
    if (effectComposer.ready) {
      const { font, node, play } = effectComposer;
      const path = font!.getPath(text, 0, 80, 60);
      const pathNode = node?.querySelector('path')!;
      // path.draw();
      pathNode.setAttribute('d', path.toPathData(2));
      const warp = new Warp(node);

      const amplitude = 5;
      const frequency = 120;
      const PI = Math.PI * 2;
      let t = 0;
      const boundingRect = pathNode.getBoundingClientRect()!;

      warp.transform(([x, y]: number[]) => [x, y, x, y]);
      const clear = play(warp, ([x, _, ox, oy]: number[]) => {
        t += 1 / 50;
        const vo = {
          t,
          scale: curriedScale(boundingRect),
          w: boundingRect.width,
          h: boundingRect.height
        };
        return transform
          ? transform([ox, oy], vo)
          : [x, oy + amplitude * Math.sin((PI / frequency) * (x + t * 0.001))];
      });
      if (animate) {
        return clear;
      } else {
        clear();
      }
    }
    // eslint-disable-next-line
  }, [effectComposer.ready, text, animate, transform]);

  return (
    <React.Fragment>
      <svg
        ref={effectComposer.setRefHandler}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}>
        <path />
      </svg>
    </React.Fragment>
  );
}

export default WarpText;
