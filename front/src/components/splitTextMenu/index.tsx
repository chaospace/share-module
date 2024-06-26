import React, { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { useMouseInfo } from '../hooks';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { mockHandler } from '../util';
//scale로 접근해 보자.
const Container = styled('a')`
  position: relative;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 3px 4px;

  font-family: 'Nanum Gothic Coding', monospace;
  font-kerning: none;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  width: fit-content;
  height: min-content;
  --dx: 100%;
  --dy: 0%;
  &.selected {
    font-weight: bold;
  }
  &::before {
    position: absolute;
    user-select: none;
    pointer-events: none;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: max-content;
    background-color: aquamarine;
    mix-blend-mode: difference;
    transform: translate(var(--dx), var(--dy));
  }
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: calc(100% - 1px);
    height: 100%;
    background-color: rgb(0 0 0 /10%);
  }
`;

interface SplitTextMenuProps {
  link: string;
  selected?: boolean;
  onClick?: (link: string) => void;
}

const getTransformValue = (v: number) => {
  return v === 0 ? '0' : v > 0 ? '100%' : '-100%';
};

const SplitTextMenu = React.memo(
  ({
    children,
    link,
    selected = false,
    onClick = mockHandler
  }: PropsWithChildren<SplitTextMenuProps>) => {
    const eleRef = React.useRef<HTMLAnchorElement>(null);
    const { mouse, getPointDirection } = useMouseInfo();

    useEffect(() => {
      console.log('render-menu');
    });

    useGSAP(
      (_, contextSafe) => {
        const menu = eleRef.current;

        if (menu && contextSafe) {
          const splitText = SplitType.create(menu, { types: 'chars,words', tagName: 'span' });
          const chars = splitText.chars!;
          const originChars = chars.map(o => o.innerHTML);
          const letters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*';

          const reset = () => {
            chars.forEach((o, idx) => {
              gsap.killTweensOf(o);
              o.innerHTML = originChars[idx];
            });
            gsap.killTweensOf(menu);
          };

          const onOver = contextSafe((e: MouseEvent) => {
            reset();
            const dir = getPointDirection({ x: e.clientX, y: e.clientY }, mouse);
            chars.forEach((o, idx) => {
              gsap.fromTo(
                o,
                {
                  opacity: 0
                },
                {
                  duration: 0.04,
                  opacity: 1,
                  repeat: 2,
                  repeatRefresh: true,
                  repeatDelay: 0.05,
                  delay: 0.05 * (idx + 1),
                  onComplete: () => {
                    gsap.set(o, { innerHTML: originChars[idx], delay: 0.1 });
                  },
                  innerHTML: () => letters[~~(Math.random() * letters.length)]
                }
              );
            });

            gsap.fromTo(
              menu,
              {
                '--dx': getTransformValue(dir.x),
                '--dy': getTransformValue(dir.y)
              },
              {
                duration: 0.4,
                '--dx': '0%',
                '--dy': '0%'
              }
            );
          });
          const onOut = (e: MouseEvent) => {
            const dir = getPointDirection({ x: e.clientX, y: e.clientY }, mouse);
            gsap.to(menu, {
              duration: 0.4,
              '--dx': getTransformValue(dir.x * -1),
              '--dy': getTransformValue(dir.y * -1)
            });
          };
          menu.addEventListener('mouseenter', onOver);
          menu.addEventListener('mouseleave', onOut);
          return () => {
            SplitType.clearData();
            menu.removeEventListener('mouseleave', onOut);
            menu.removeEventListener('mouseenter', onOver);
          };
        }
      },
      { scope: eleRef }
    );

    return (
      <React.Fragment>
        <Container
          ref={eleRef}
          className={selected ? 'selected' : ''}
          onClick={e => {
            e.preventDefault();
            onClick(link);
          }}>
          {children}
        </Container>
      </React.Fragment>
    );
  },
  (prev, next) => {
    const isSame = prev.link === next.link && prev.selected === next.selected;
    console.log('same', isSame);
    return isSame;
  }
);

export default SplitTextMenu;
