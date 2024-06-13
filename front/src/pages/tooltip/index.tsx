import { grey } from '@/colors';
import { HBox, VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import Typography from '@/components/elements/Typography';
import { useRefForward } from '@/components/hooks';
import { getValidChildren, getVariantColorDark, toReactElement } from '@/styles/utils';
import React, { PropsWithChildren, useEffect, useId, useMemo, useState } from 'react';
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
  .attrs<CSSComposerObject & StyleVariantProps>({
    position: 'absolute',
    pointerEvents: 'none',
    borderRadius: 's',
    px: 4,
    py: 2,
    color: grey[50]
  })(
  composer,
  css`
    font-size: 0.8rem;
    background-color: ${getVariantColorDark};
    visibility: hidden;
    &.prepare {
      opacity: 0;
      visibility: unset;
      will-change: opacity, transform;
    }
    &[data-placement='top'],
    &[data-placement='top-start'],
    &[data-placement='top-end'] {
      transform: translate(0, -20px);
    }
    &[data-placement='left'],
    &[data-placement='left-start'],
    &[data-placement='left-end'] {
      transform: translate(-20px, 0);
    }
    &[data-placement='right'],
    &[data-placement='right-start'],
    &[data-placement='right-end'] {
      transform: translate(20px, 0);
    }
    &[data-placement='bottom'],
    &[data-placement='bottom-start'],
    &[data-placement='bottom-end'] {
      transform: translate(0, 20px);
    }
    &.show {
      opacity: 1;
      transform: translate(0, 0);
      transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `
);

interface TooltipProps extends StyleVariantProps {
  title: React.ReactNode;
  placement?: PLACE_MENT;
  disableHover?: boolean;
}

interface TooltipPopoverProps
  extends Omit<TooltipProps, 'title' | 'disableHover' | 'disableFocus'> {
  id: string;
  area: DOMRect;
}

const TooltipPopover = React.forwardRef<HTMLDivElement, PropsWithChildren<TooltipPopoverProps>>(
  ({ id, placement = 'top', area, children, ...rest }, ref) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const syncRef = useRefForward([ref, nodeRef]);

    useEffect(() => {
      if (nodeRef.current && area) {
        const boundingRect = nodeRef.current.getBoundingClientRect();
        const { px, py } = getPosition(area, boundingRect, placement);
        nodeRef.current.style.left = `${px}px`;
        nodeRef.current.style.top = `${py}px`;
        //get direction from placement
        nodeRef.current.classList.add('prepare');
        setTimeout(() => {
          nodeRef.current!.classList.add('show');
        }, 0);
      }
    }, [area]);
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
 * 이벤트에 따른 노출은 여기서 결정하고
 * 디스플레이 부분은 TooltipPopover에서 처리
 * @param param0
 * @returns
 */
const Tooltip = ({
  children: childrenProps,
  title,
  placement = 'top',
  disableHover = false,
  variant = 'default'
}: PropsWithChildren<TooltipProps>) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null);

  const nodeRef = React.useRef<HTMLElement>(null);

  //children에 ref와 내부 가로채기용 ref를 싱크처리.
  //@ts-ignore
  const syncRefs = useRefForward<HTMLElement>([childrenProps.ref, nodeRef]);

  const children = getValidChildren(childrenProps);

  const trigger = useMemo(() => {
    return disableHover ? 'click' : 'hover';
  }, [disableHover]);

  // click이벤트 처리
  useEffect(() => {
    const handler = {
      in: 'pointerover',
      out: 'pointerout'
    };
    const clickTrigger = trigger === 'click';
    if (clickTrigger) {
      handler.in = 'click';
      handler.out = 'click';
    }

    const onInHandler = (_: Event) => {
      if (nodeRef.current) {
        const elementBoudingRect = nodeRef.current.getBoundingClientRect();
        setBoundingRect(elementBoudingRect);
      }
    };
    const onOutHandler = (e: Event) => {
      if (clickTrigger) {
        if ('composedPath' in e && !e.composedPath().includes(nodeRef.current!)) {
          setBoundingRect(null);
        }
      } else {
        setBoundingRect(null);
      }
    };

    nodeRef.current?.addEventListener(handler.in, onInHandler);
    if (clickTrigger) {
      nodeRef.current?.ownerDocument.addEventListener(handler.out, onOutHandler);
    } else {
      nodeRef.current?.addEventListener(handler.out, onOutHandler);
    }

    return () => {
      nodeRef.current?.removeEventListener(handler.in, onInHandler);
      if (clickTrigger) {
        nodeRef.current?.ownerDocument.removeEventListener(handler.out, onOutHandler);
      } else {
        nodeRef.current?.removeEventListener(handler.out, onOutHandler);
      }
    };
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
            variant={variant}>
            {title}
          </TooltipPopover>,
          document.body
        )}
    </React.Fragment>
  );
};

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
      </VBox>
    </React.Fragment>
  );
}

export default TooltipApp;
