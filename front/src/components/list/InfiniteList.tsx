import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { FetchNextPageOptions, FetchPreviousPageOptions } from '@tanstack/react-query';

import styled from 'styled-components';
import Typography from '@/components/elements/Typography';
import { ArrowCircleDownOutline } from '@styled-icons/evaicons-outline/ArrowCircleDownOutline';
import { ArrowCircleUpOutline } from '@styled-icons/evaicons-outline/ArrowCircleUpOutline';
import ListRenderer, { ListRenderProps } from '@/components/list/ListRenderer';
import { debounce } from '@/components/util';

const FetchButton = styled('div')`
  position: relative;
  display: grid;
  block-size: 120px;
  inline-size: 100%;
  place-items: center;

  & span {
    text-align: center;
    transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 0;
  }

  &.next > span {
    transform: translate(0, -100%) scale3d(0, 0, 0);
  }

  &.prev > span {
    transform: translate(0, 100%) scale3d(0, 0, 0);
  }

  &.next.show > span {
    transform: translate(0, 0) scale3d(1, 1, 1);
    opacity: 1;
  }

  &.prev.show > span {
    transform: translate(0, 0) scale3d(1, 1, 1);
    opacity: 1;
  }
`;

const ListContainer = styled.div<{ $pending?: boolean; $height?: number | string }>`
  position: relative;
  display: block;
  scroll-behavior: smooth;
  height: ${({ $height }) => `${$height}px` ?? undefined};
  min-height: 300px;
  overflow: hidden;
  overflow-y: ${({ $pending }) => ($pending ? 'hidden' : 'auto')};
  pointer-events: ${({ $pending }) => ($pending ? 'none' : 'auto')};
  opacity: ${({ $pending }) => ($pending ? 0.5 : 1)};
`;

const FETCH_HEIGHT = 120;

interface InfiniteListProp extends ListRenderProps {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  isFetching?: boolean;
  height?: number | string;
  fetchPreviousPage: (option?: FetchPreviousPageOptions) => Promise<any>;
  fetchNextPage: (option?: FetchNextPageOptions) => Promise<any>;
}

function InfiniteList({
  options = [],
  ItemRenderer = undefined,
  hasPreviousPage = false,
  hasNextPage = false,
  isFetching = false,
  height = 400,
  fetchPreviousPage,
  fetchNextPage
}: PropsWithChildren<InfiniteListProp>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchButtonRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const apiRef = useRef({
    isFetching: false,
    lastFetchingValue: '',
    hasPreviousPage,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage
  });

  apiRef.current.hasPreviousPage = hasPreviousPage;
  apiRef.current.hasNextPage = hasNextPage;
  apiRef.current.fetchNextPage = fetchNextPage;
  apiRef.current.fetchPreviousPage = fetchPreviousPage;

  /**
   * scrollend이벤트 처리
   * 컨테이너의 scrollTop값을 체크해 이전 다음 페이지를 불러온다.
   */
  useEffect(() => {
    const fetchingAfterTransition = debounce(() => {
      if (contentRef.current) {
        fetchButtonRef.current.forEach(o => {
          o?.classList.remove('show');
        });
        const target =
          apiRef.current.lastFetchingValue === 'prev'
            ? contentRef.current.children[10]
            : contentRef.current.children[contentRef.current.children.length - 11];

        target.scrollIntoView(apiRef.current.lastFetchingValue === 'prev');
        containerRef.current?.addEventListener(
          'scrollend',
          () => {
            //패칭 종료 처리
            apiRef.current.isFetching = false;
          },
          { once: true }
        );
      }
    }, 20);

    const onScroll = debounce((_: Event) => {
      if (containerRef.current) {
        if (!apiRef.current.isFetching) {
          const maxScrollTop =
            containerRef.current.scrollHeight - containerRef.current.clientHeight;
          const scrollTop = containerRef.current.scrollTop;
          if (scrollTop <= FETCH_HEIGHT && apiRef.current.hasPreviousPage) {
            if (!fetchButtonRef.current[0]?.classList.contains('show')) {
              apiRef.current.isFetching = true;
              fetchButtonRef.current[0]?.classList.add('show');
              apiRef.current.lastFetchingValue = 'prev';
              containerRef.current.firstElementChild?.scrollIntoView();
              apiRef.current.fetchPreviousPage().then(fetchingAfterTransition);
            }
          } else if (scrollTop >= maxScrollTop - FETCH_HEIGHT && apiRef.current.hasNextPage) {
            if (!fetchButtonRef.current[1]?.classList.contains('show')) {
              apiRef.current.isFetching = true;
              fetchButtonRef.current[1]?.classList.add('show');
              apiRef.current.lastFetchingValue = 'next';
              containerRef.current.lastElementChild?.scrollIntoView(false);
              apiRef.current.fetchNextPage().then(fetchingAfterTransition);
            }
          }
        }
      }
    }, 100);

    containerRef.current?.addEventListener('scroll', onScroll);
    return () => {
      containerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ListContainer ref={containerRef} $pending={isFetching} $height={height}>
      {hasPreviousPage && (
        <FetchButton
          className='prev'
          role='button'
          aria-hidden='true'
          aria-label='page-prev'
          ref={node => {
            fetchButtonRef.current[0] = node;
          }}>
          <span>
            <ArrowCircleUpOutline size={48} fill='black' />
            <Typography variant='body'>prev page</Typography>
          </span>
        </FetchButton>
      )}
      <ListRenderer ref={contentRef} options={options} ItemRenderer={ItemRenderer} />
      {hasNextPage && (
        <FetchButton
          className='next'
          role='button'
          aria-hidden='true'
          aria-label='page-next'
          ref={node => {
            fetchButtonRef.current[1] = node;
          }}>
          <span>
            <Typography variant='body'>next page</Typography>
            <ArrowCircleDownOutline size={48} fill='black' />
          </span>
        </FetchButton>
      )}
    </ListContainer>
  );
}

export default InfiniteList;
