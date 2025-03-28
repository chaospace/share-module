import React, { PropsWithChildren, useId, useMemo, useState } from 'react';
import { grey } from '@/colors';
import { useRefForward, useWatch } from '@/components/hooks';
import { getValidChildren, getVariantColorDark, toReactElement } from '@/styles/utils';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { StyleVariantProps } from 'styled';

type PLACE_POS = 'start' | 'end';
type PLACE_DIR = 'top' | 'left' | 'right' | 'bottom';
type PLACE_MENT = `${PLACE_DIR}-${PLACE_POS}` | `${PLACE_DIR}`;

const TooltipWrapper = styled.div
  .withConfig({
    shouldForwardProp: shouldForwardAllProps
  })
  .attrs<CSSComposerObject & StyleVariantProps & { offset?: number }>({
    position: 'absolute',
    pointerEvents: 'none',
    borderRadius: 's',
    px: 4,
    py: 3,
    color: grey[50],
    boxShadow: 's',
    zIndex: '1000'
  })(
  composer,
  css`
    --offset: 5;
    font-size: 0.85rem;
    background-color: ${getVariantColorDark};
    visibility: hidden;

    //등장준비
    &.prepare {
      opacity: 0;
      visibility: unset;
      will-change: opacity, transform;
    }
    //등장효과 공통
    &.show {
      opacity: 1;
      transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &[data-placement='top'],
    &[data-placement='top-start'],
    &[data-placement='top-end'] {
      transform: translate(0, -20px);
      &.show {
        transform: translate(0, calc(var(--offset) * -1px));
      }
    }

    &[data-placement='left'],
    &[data-placement='left-start'],
    &[data-placement='left-end'] {
      transform: translate(-20px, 0);
      &.show {
        transform: translate(calc(var(--offset) * -1px), 0);
      }
    }
    &[data-placement='right'],
    &[data-placement='right-start'],
    &[data-placement='right-end'] {
      transform: translate(20px, 0);
      &.show {
        transform: translate(calc(var(--offset) * 1px), 0);
      }
    }
    &[data-placement='bottom'],
    &[data-placement='bottom-start'],
    &[data-placement='bottom-end'] {
      transform: translate(0, 20px);
      &.show {
        transform: translate(0, calc(var(--offset) * 1px));
      }
    }
  `
);

interface TooltipProps extends StyleVariantProps {
  /** 툴팁 메시지 내용 */
  title: React.ReactNode;
  /** 툴팁 메시지 위치 */
  placement?: PLACE_MENT;
  /** 툴팁 동작 trigger */
  disableHover?: boolean;
  /** 대상으로 부터의 offset 기본은 5 */
  offset?: string;
}

interface TooltipPopoverProps extends Omit<TooltipProps, 'title' | 'disableHover' | 'offset'> {
  id: string;
  area: DOMRect;
  style?: React.CSSProperties;
}

const TooltipPopover = React.forwardRef<HTMLDivElement, PropsWithChildren<TooltipPopoverProps>>(
  ({ id, placement = 'top', area, children, ...rest }, ref) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const syncRef = useRefForward([ref, nodeRef].filter(v => v));

    useWatch(() => {
      let timerID: ReturnType<typeof setTimeout>;
      const node = nodeRef.current;
      if (node && area) {
        const boundingRect = node.getBoundingClientRect();
        const { px, py } = getPosition(area, boundingRect, placement);
        node.style.left = `${~~px}px`;
        node.style.top = `${~~py}px`;
        //get direction from placement
        node.classList.add('prepare');
        timerID = setTimeout(() => {
          node.classList.add('show');
        }, 0);
      }
      return () => {
        timerID && clearTimeout(timerID);
      };
    }, [area, placement]);
    return (
      <TooltipWrapper role='tooltip' id={id} data-placement={placement} ref={syncRef} {...rest}>
        {children}
      </TooltipWrapper>
    );
  }
);

const getPosition = (area: DOMRect, target: DOMRect, placement: PLACE_MENT = 'top') => {
  let px = 0;
  let py = 0;
  switch (placement) {
    case 'top':
      px = area.left + (area.width - target.width) / 2;
      py = area.top - target.height;
      break;
    case 'top-start':
      px = area.left - target.width / 2;
      py = area.top - target.height;
      break;
    case 'top-end':
      px = area.right - target.width / 2;
      py = area.top - target.height;
      break;
    case 'left':
      px = area.left - target.width;
      py = area.top + (area.height - target.height) / 2;
      break;
    case 'left-start':
      px = area.left - target.width;
      py = area.top - target.height / 2;
      break;
    case 'left-end':
      px = area.left - target.width;
      py = area.bottom - target.height / 2;
      break;
    case 'right':
      px = area.right;
      py = area.top + (area.height - target.height) / 2;
      break;
    case 'right-start':
      px = area.right;
      py = area.top - target.height / 2;
      break;
    case 'right-end':
      px = area.right;
      py = area.bottom - target.height / 2;
      break;
    case 'bottom':
      px = area.left + (area.width - target.width) / 2;
      py = area.bottom;
      break;
    case 'bottom-start':
      px = area.left - target.width / 2;
      py = area.bottom;
      break;
    case 'bottom-end':
      px = area.right - target.width / 2;
      py = area.bottom;
      break;
  }
  return { px, py };
};

/**
 * 툴팁 컴포넌트 기본 hover로 동작하며 disableHover를 설정하면 click으로 동작<br/>
 * @param {TooltipProps} param
 */
const Tooltip = ({
  children: childrenProps,
  title,
  placement = 'top',
  disableHover = false,
  variant = 'default',
  offset = '5'
}: PropsWithChildren<TooltipProps>) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);

  const nodeRef = React.useRef<HTMLElement>(null);

  //children에 ref와 내부 가로채기용 ref를 싱크처리.
  //@ts-ignore
  const syncRefs = useRefForward<HTMLElement>([childrenProps.ref, nodeRef].filter(v => v));

  const children = getValidChildren(childrenProps);

  const trigger = useMemo(() => {
    return disableHover ? 'click' : 'hover';
  }, [disableHover]);

  // click이벤트 처리
  useWatch(() => {
    const handler = {
      in: 'pointerover',
      out: 'pointerout'
    };
    const clickTrigger = trigger === 'click';
    if (clickTrigger) {
      handler.in = 'click';
      handler.out = 'click';
    }
    const node = nodeRef.current;
    if (node) {
      const onInHandler = (_: Event) => {
        if (node) {
          const elementBoudingRect = node.getBoundingClientRect();
          setBoundingRect(elementBoudingRect);
        }
      };
      const onOutHandler = (e: Event) => {
        if (clickTrigger) {
          if ('composedPath' in e && !e.composedPath().includes(node)) {
            setBoundingRect(null);
          }
        } else {
          setBoundingRect(null);
        }
      };

      node.addEventListener(handler.in, onInHandler);
      if (clickTrigger) {
        node.ownerDocument.addEventListener(handler.out, onOutHandler);
      } else {
        node.addEventListener(handler.out, onOutHandler);
      }

      return () => {
        node.removeEventListener(handler.in, onInHandler);
        if (clickTrigger) {
          node.ownerDocument.removeEventListener(handler.out, onOutHandler);
        } else {
          node.removeEventListener(handler.out, onOutHandler);
        }
      };
    }
  }, [trigger]);

  const popoverId = `tooltip-${useId()}`;
  return (
    <React.Fragment>
      {children.map(o => {
        return React.cloneElement(toReactElement(o), {
          ref: syncRefs,
          'aria-describedby': popoverId
        });
      })}
      {nodeRef.current &&
        boundingRect &&
        createPortal(
          <TooltipPopover
            id={popoverId}
            area={boundingRect}
            placement={placement}
            variant={variant}
            // @ts-ignore
            style={{ '--offset': offset }}>
            {title}
          </TooltipPopover>,
          document.body
        )}
    </React.Fragment>
  );
};

export type { TooltipProps, TooltipPopoverProps };
export default Tooltip;
