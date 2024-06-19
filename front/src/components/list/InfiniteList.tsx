import React, { PropsWithChildren, useRef } from 'react';
import { FetchNextPageOptions, FetchPreviousPageOptions } from '@tanstack/react-query';

import styled from 'styled-components';
import Typography from '@/components/elements/Typography';
import { ArrowCircleDownOutline } from '@styled-icons/evaicons-outline/ArrowCircleDownOutline';
import { ArrowCircleUpOutline } from '@styled-icons/evaicons-outline/ArrowCircleUpOutline';
import ListRenderer, { ListRenderProps } from '@/components/list/ListRenderer';
import { debounce } from '@/components/util';
import { useMount } from '../hooks';

const FetchButton = styled('div')`
  position: relative;
  display: grid;
  block-size: 100px;
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
  height: ${({ $height }) => `${$height ?? 300}px`};
  min-height: 300px;
  overflow: hidden;
  overflow-y: ${({ $pending }) => ($pending ? 'hidden' : 'auto')};
  pointer-events: ${({ $pending }) => ($pending ? 'none' : 'auto')};
  opacity: ${({ $pending }) => ($pending ? 0.5 : 1)};
`;

const FETCH_HEIGHT = 100;

const FETCHING_DIR = {
  NEXT: 'next',
  PREV: 'prev'
};

interface InfiniteListProp extends ListRenderProps {
  /** 이전페이지 접근가능 여부 */
  hasPreviousPage?: boolean;
  /** 다음페이지 접근가능 여부 */
  hasNextPage?: boolean;
  /** 데이터 패칭 여부 */
  isFetching?: boolean;
  /** 리스트 height값 기본 300px */
  height?: number | string;
  /** 이전페이지 요청 */
  fetchPreviousPage: (option?: FetchPreviousPageOptions) => Promise<any>;
  /** 다음페이지 요청 */
  fetchNextPage: (option?: FetchNextPageOptions) => Promise<any>;
}

/**
 *
 * react-query에 useInfiniteQuery를 이용한 infiniteList컴포넌트.<br/>
 * 컴포넌트는 스크롤에 따른 목록요청과 ItemRenderer를 통한 목록표현에 집중하고<br/>
 * 데이터 구성은 상위에서 제공한다.
 *
 * @returns
 */
function InfiniteList({
  options = [],
  ItemRenderer = undefined,
  hasPreviousPage = false,
  hasNextPage = false,
  isFetching = false,
  height = undefined,
  fetchPreviousPage,
  fetchNextPage
}: PropsWithChildren<InfiniteListProp>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchButtonRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const apiRef = useRef({
    lastFetchingValue: '',
    hasPreviousPage,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage
  });
  //참조 속성 갱신
  apiRef.current.hasPreviousPage = hasPreviousPage;
  apiRef.current.hasNextPage = hasNextPage;
  apiRef.current.fetchNextPage = fetchNextPage;
  apiRef.current.fetchPreviousPage = fetchPreviousPage;

  /**
   * scrollend이벤트 처리
   * 컨테이너의 scrollTop값을 체크해 이전 다음 페이지를 불러온다.
   */
  useMount(() => {
    const container = containerRef.current;
    const listContainer = contentRef.current;
    const fetchingAfterTransition = debounce(() => {
      if (container && listContainer) {
        fetchButtonRef.current.forEach(o => {
          o?.classList.remove('show');
        });
        //추가 목록에서 방향에 따른 스크롤 대상 찾기
        const target =
          apiRef.current.lastFetchingValue === FETCHING_DIR.PREV
            ? listContainer.children[10]
            : listContainer.children[listContainer.children.length - 11];

        target.scrollIntoView(apiRef.current.lastFetchingValue === FETCHING_DIR.PREV);
        //scrollIntoView 완료 수신 리스너 등록
        containerRef.current?.addEventListener(
          'scrollend',
          () => {
            apiRef.current.lastFetchingValue = ''; //패칭완료처리
          },
          { once: true }
        );
      }
    }, 20);

    const onScroll = debounce((_: Event) => {
      if (container && !apiRef.current.lastFetchingValue) {
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        const scrollTop = container.scrollTop;
        if (scrollTop <= FETCH_HEIGHT && apiRef.current.hasPreviousPage) {
          fetchButtonRef.current[0]?.classList.add('show');
          apiRef.current.lastFetchingValue = FETCHING_DIR.PREV;
          container.firstElementChild?.scrollIntoView();
          apiRef.current.fetchPreviousPage().then(fetchingAfterTransition);
        } else if (scrollTop >= maxScrollTop - FETCH_HEIGHT && apiRef.current.hasNextPage) {
          fetchButtonRef.current[1]?.classList.add('show');
          apiRef.current.lastFetchingValue = FETCHING_DIR.NEXT;
          container.lastElementChild?.scrollIntoView(false);
          apiRef.current.fetchNextPage().then(fetchingAfterTransition);
        }
      }
    }, 100);
    container?.addEventListener('scroll', onScroll);
    return () => {
      container?.removeEventListener('scroll', onScroll);
    };
  });

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
export type { InfiniteListProp };
export default InfiniteList;
