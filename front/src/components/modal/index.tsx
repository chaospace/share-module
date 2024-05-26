import React, { useEffect, useId, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Box, HBox, VBox } from '@/components/elements/Box';
import Typography from '../elements/Typography';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import { grey } from '@/colors';
import IconButton from '@/components/elements/IconButton';
import Button from '@/components/elements/Button';
import Grid from '@/components/elements/Grid';

const layerBaseStyle = css`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.modal};
  align-items: center;
  justify-content: center;
`;

const DimLayer = styled('div')`
  ${layerBaseStyle};
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  pointer-events: none;
`;

const Modal = styled(Grid).attrs(props => ({
  gridTemplateRows: 'min-content 1fr min-content',
  minWidth: props.minWidth ?? 400,
  width: props.width ?? 500,
  maxWidth: props.maxWidth ?? 900,
  bgColor: props.bgColor ?? grey[200],
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: grey[300],
  borderRadius: props.borderRadius ?? '0.5rem',
  maxHeight: props.maxHeight ?? '70%',
  minHeight: props.minHeight ?? 320
}))`
  box-shadow:
    0px 2px 4px rgb(0 0 0 / 10%),
    0px 1px 2px rgb(0 0 0 / 20%);
`;

const Header = styled(HBox).attrs(props => ({
  p: props.p ?? 4,
  alignItems: props.alignItems ?? 'center',
  minHeight: 38
}))`
  z-index: 1;
  box-shadow:
    0px 2px 4px rgb(0 0 0 / 10%),
    0px 1px 1px rgb(0 0 0 / 10%);
  ${Typography} {
    text-align: center;
    margin-top: 2px;
    flex-grow: 1;
    line-height: unset;
  }
  ${IconButton} {
    position: absolute;
    right: 16px;
  }
`;

const Body = styled(Box).attrs(props => ({
  p: props.p ?? 4,
  overflow: props.overflow ?? 'hidden',
  overflowY: props.overflowY ?? 'auto',
  bgColor: props.bgColor ?? 'white'
}))``;

const Content = styled(VBox).attrs(props => ({
  height: props.height ?? 'max-content',
  minHeight: props.minHeight ?? 150
}))``;

const Footer = styled(HBox).attrs(props => ({
  justifyContent: props.justifyContent ?? 'center',
  p: props.p ?? 4,
  minHeight: 38
}))`
  box-shadow:
    0px -2px 4px rgb(0 0 0 / 10%),
    0px -1px 1px rgb(0 0 0 / 10%);
`;

type ModalProps<T extends object> = {
  onClose?: (info?: T) => void;
  contentMaxHeight?: number;
  onRenderBody?: () => React.ReactNode | null;
  data?: T;
};

// type AA<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];

const focusAbleNode = (ele: HTMLElement) => {
  //안되는 경우를 먼저 제거
  if (ele.tabIndex < 0 || (ele as any).disabled) {
    return false;
  }

  switch (ele.tagName) {
    case 'A':
      return (ele as HTMLAnchorElement).href && (ele as HTMLAnchorElement).rel !== 'ignore';
    case 'INPUT':
      return (ele as HTMLInputElement).type !== 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

const findFocusableChildNode = (ele: HTMLElement, result: Element[]): any => {
  // ele.childNodes
  for (let i = 0; i < ele.children.length; i++) {
    const child = ele.children[i] as HTMLElement;
    if (focusAbleNode(child)) {
      result.push(child);
    }
    findFocusableChildNode(child, result);
  }
  return result;
};

const getFirstFocusElement = (candidate: HTMLElement[]) =>
  candidate.find(o => o.ariaLabel !== 'close');

/**
 * 모달컴포넌트
 * 헤더는 고정 혹은 스크롤 가능.
 * 조건은 body는 스크롤가능
 * 풋더는 하단 혹은 콘텐츠하단 가능.
 * 모달에 기본은 하단에 컨텐츠를 제거할 막이 있어야 한다.?
 */
function SimpleModal<T extends object>({ data, onClose }: ModalProps<T>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dialogLabelId = `dl-${useId()}`;

  const onCloseHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    onClose && onClose();
  };

  const onSubmit = () => {
    onClose && onClose(data!);
  };

  // eslint react-hooks/exhaustive-deps: 0
  useEffect(() => {
    const onClickDocument = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCloseHandler();
      }
    };
    //click을 이용하면 up순간 이벤트가 발생해 등장과 함께 사라지게 된다.
    document.documentElement.addEventListener('mousedown', onClickDocument);
    return () => {
      document.documentElement.removeEventListener('mousedown', onClickDocument);
    };
  }, []);
  // eslint react-hooks/exhaustive-deps: 2

  useEffect(() => {
    const ele = getFirstFocusElement(findFocusableChildNode(modalRef.current!, []));
    ele?.focus();
    // console.log('active', document.activeElement === ele);
  }, []);

  return (
    <ModalContainer>
      <DimLayer tabIndex={0} />
      <Modal role='dialog' aria-modal='true' aria-labelledby={dialogLabelId} ref={modalRef}>
        <Header>
          <Typography id={dialogLabelId} variant='subTitle1'>
            타이틀
          </Typography>
          <IconButton aria-label='close' onClick={onCloseHandler}>
            <CloseOutline size={24} />
          </IconButton>
        </Header>

        <Body>
          <Content>
            <Typography>
              Next, we wrap our definition using the utility types that React provides to complete
              the props for a specified element. Typically, we statically write the tag, for example
              React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass
              the E type.
            </Typography>
            <Typography>
              Next, we wrap our definition using the utility types that React provides to complete
              the props for a specified element. Typically, we statically write the tag, for example
              React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass
              the E type.
            </Typography>
            <Typography>
              Next, we wrap our definition using the utility types that React provides to complete
              the props for a specified element. Typically, we statically write the tag, for example
              React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass
              the E type.
            </Typography>

            <Typography>
              Next, we wrap our definition using the utility types that React provides to complete
              the props for a specified element. Typically, we statically write the tag, for example
              React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass
              the E type.
            </Typography>
            <Typography>
              Next, we wrap our definition using the utility types that React provides to complete
              the props for a specified element. Typically, we statically write the tag, for example
              React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass
              the E type.
            </Typography>
            <Typography>
              Next, we wrap our definition using the utility types that React provides to complete
              the props for a specified element. Typically, we statically write the tag, for example
              React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass
              the E type.
            </Typography>
          </Content>
        </Body>

        <Footer gap={4}>
          <Button onClick={onCloseHandler}>취소</Button>
          <Button variant='primary' onClick={onSubmit}>
            저장
          </Button>
        </Footer>
      </Modal>
    </ModalContainer>
  );
}

export default SimpleModal;
