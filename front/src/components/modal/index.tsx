import React, { FunctionComponent, PropsWithChildren, useEffect, useId, useRef } from 'react';
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
  p: props.p ?? 5,
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

type ModalFooterProps = {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: () => void;
};

type ModalProps = {
  /** 모달 타이틀 */
  title?: string;
  /** close 핸들러 함수 isSubmit정보는 확인으로 호출될 경우 전달 */
  onClose?: (isSubmit?: boolean) => void;
  /** content최소 높이 값 기본은 150 */
  contentMineight?: number;
  /** 취소버튼 라벨*/
  cancelLabel?: string;
  /** 확인버튼 라벨*/
  okLabel?: string;
  /**헤더 랜더러 */
  HeaderContent?: FunctionComponent;
  /** 풋더 버튼 정렬 */
  footerAlign?: string;
  /** 풋더 커스텀 컴포넌트 속성에 onClose onSubmit 핸들러를 전달 */
  FooterContent?: FunctionComponent<ModalFooterProps>;
};

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

/* const SimpleFooterContent = ({ onClick, onSubmit }: ModalFooterProps) => {
  return (
    <React.Fragment>
      <Button onClick={onClick}>{cancelLabel}</Button>
      <Button variant='primary' onClick={onSubmit}>
        {okLabel}
      </Button>
    </React.Fragment>
  );
}; */

/**
 * 모달컴포넌트
 * 헤더와 풋더는 고정
 * body는 유동이며 minContentHeight로 최소높이만 제어.
 */
function SimpleModal({
  title = '알림',
  contentMineight = 150,
  children = null,
  onClose,
  cancelLabel = '취소',
  okLabel = '확인',
  footerAlign = 'center',
  FooterContent
}: PropsWithChildren<ModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusableNodes = useRef<HTMLElement[]>([]);
  const dialogLabelId = `dl-${useId()}`;

  const onCloseHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    onClose && onClose();
  };

  const onSubmit = () => {
    onClose && onClose(true);
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

  //초기 포커스적용.
  useEffect(() => {
    focusableNodes.current = findFocusableChildNode(modalRef.current!, []);
    const ele = getFirstFocusElement(focusableNodes.current);
    ele?.focus();
  }, []);

  // 포커스 이동 처리
  useEffect(() => {
    let lastFocus: Element | null;
    const onFocusDocument = (_: FocusEvent) => {
      const eles = focusableNodes.current;
      //포커스가 모달 밖으로 이동하면 다시 모달로 지정한다.
      if (!modalRef.current?.contains(document.activeElement)) {
        if (lastFocus === eles[0]) {
          eles[eles.length - 1].focus();
        } else {
          eles[0].focus();
        }
      }
      lastFocus = document.activeElement;
    };
    //click을 이용하면 up순간 이벤트가 발생해 등장과 함께 사라지게 된다.
    window.addEventListener('focus', onFocusDocument, true);
    return () => {
      window.removeEventListener('focus', onFocusDocument, true);
    };
  }, []);

  return (
    <ModalContainer>
      <DimLayer />
      <Modal role='dialog' aria-modal='true' aria-labelledby={dialogLabelId} ref={modalRef}>
        <Header>
          <Typography id={dialogLabelId} variant='subTitle1'>
            {title}
          </Typography>
          <IconButton aria-label='close' onClick={onCloseHandler}>
            <CloseOutline size={24} />
          </IconButton>
        </Header>
        <Body>
          <Content minHeight={contentMineight}>{children}</Content>
        </Body>
        <Footer justifyContent={footerAlign} gap={4}>
          {FooterContent ? (
            <FooterContent onClick={onCloseHandler} onSubmit={onSubmit} />
          ) : (
            <React.Fragment>
              <Button onClick={onCloseHandler}>{cancelLabel}</Button>
              <Button variant='primary' onClick={onSubmit}>
                {okLabel}
              </Button>
            </React.Fragment>
          )}
        </Footer>
      </Modal>
    </ModalContainer>
  );
}

export type { ModalFooterProps };
export default SimpleModal;
