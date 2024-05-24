import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Box, HBox, VBox } from '@/components/elements/Box';
import Typography from '../elements/Typography';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import { blue } from '@/colors';
import IconButton from '@/components/elements/IconButton';
import Button from '@/components/elements/Button';
import { HLine, VLine } from '@/components/elements/Line';

const layerBaseStyle = css`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ContentLayer = styled('div')`
  ${layerBaseStyle};
  //내용 중앙정렬
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

type ModalProps<T extends object> = {
  onClose?: (info?: T) => void;
  data?: T;
};

/**
 * 모달컴포넌트
 * 헤더는 고정 혹은 스크롤 가능.
 * 조건은 body는 스크롤가능
 * 풋더는 하단 혹은 콘텐츠하단 가능.
 * 모달에 기본은 하단에 컨텐츠를 제거할 막이 있어야 한다.?
 */
function SimpleModal<T extends object>({ data, onClose }: ModalProps<T>) {
  const modalRef = useRef<HTMLDivElement>(null);

  const onCloseHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    onClose && onClose();
  };

  const onSubmit = () => {
    onClose && onClose(data!);
  };

  useEffect(() => {
    console.log('모달 생성!!');
    const onClickDocument = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        alert('사라져도 됨!');
        onCloseHandler();
      }
    };
    document.documentElement.addEventListener('mousedown', onClickDocument);
    return () => {
      document.documentElement.removeEventListener('mousedown', onClickDocument);
    };
  }, []);

  return (
    <ModalContainer>
      <DimLayer />
      <ContentLayer>
        <VBox
          ref={modalRef}
          minWidth='400px'
          width='400px'
          maxWidth='900px'
          bgColor={blue[200]}
          p={4}
          borderRadius='0.5rem'>
          <HBox alignItems='center'>
            <Typography
              variant='subTitle1'
              mt={1}
              textAlign='center'
              flexGrow={1}
              lineHeight='unset'>
              타이틀
            </Typography>
            <IconButton position='absolute' right={0} onClick={onCloseHandler}>
              <CloseOutline size={20} />
            </IconButton>
          </HBox>
          <HLine borderWidth='2px' mx='-16px' />
          <Box
            overflow='hidden'
            maxHeight='450px'
            overflowY='auto'
            py={4}
            mx='-14px'
            my='-8px'
            bgColor='white'>
            <VBox mx={4}>
              <Typography>
                Next, we wrap our definition using the utility types that React provides to complete
                the props for a specified element. Typically, we statically write the tag, for
                example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic
                tag, we pass the E type.
              </Typography>
              <Typography>
                Next, we wrap our definition using the utility types that React provides to complete
                the props for a specified element. Typically, we statically write the tag, for
                example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic
                tag, we pass the E type.
              </Typography>
              {/* <Typography>
                Next, we wrap our definition using the utility types that React provides to complete
                the props for a specified element. Typically, we statically write the tag, for
                example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic
                tag, we pass the E type.
              </Typography>

              <Typography>
                Next, we wrap our definition using the utility types that React provides to complete
                the props for a specified element. Typically, we statically write the tag, for
                example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic
                tag, we pass the E type.
              </Typography>
              <Typography>
                Next, we wrap our definition using the utility types that React provides to complete
                the props for a specified element. Typically, we statically write the tag, for
                example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic
                tag, we pass the E type.
              </Typography>
              <Typography>
                Next, we wrap our definition using the utility types that React provides to complete
                the props for a specified element. Typically, we statically write the tag, for
                example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic
                tag, we pass the E type.
              </Typography> */}
            </VBox>
          </Box>
          <HLine mx='-14px' />
          <HBox justifyContent='center' mt={3}>
            <Button onClick={onCloseHandler}>취소</Button>
            <VLine my='8px' mx='10px' />
            <Button variant='primary' onClick={onSubmit}>
              저장
            </Button>
          </HBox>
        </VBox>
      </ContentLayer>
    </ModalContainer>
  );
}

export default SimpleModal;
