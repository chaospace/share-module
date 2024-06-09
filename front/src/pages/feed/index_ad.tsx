import React, { Suspense, useEffect, useRef } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import { getFeedList } from '@/service';
import Typography from '@/components/elements/Typography';
import { ArrowCircleDownOutline } from '@styled-icons/evaicons-outline/ArrowCircleDownOutline';
import { ArrowCircleUpOutline } from '@styled-icons/evaicons-outline/ArrowCircleUpOutline';
import ListRenderer from '@/components/list/ListRenderer';

const ListItem = styled.div`
  position: relative;
  display: inline-flex;
  inline-size: 100%;
  padding: 20px 16px;
  &:active {
    background-color: lightblue;
  }
`;

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

const Container = styled.div<{ $pending?: boolean }>`
  position: relative;
  display: block;
  scroll-behavior: smooth;
  height: 380px;
  overflow: hidden;
  overflow-y: auto;
  pointer-events: ${({ $pending }) => ($pending ? 'none' : 'auto')};
  opacity: ${({ $pending }) => ($pending ? 0.5 : 1)};
`;

const contentInfo = {
  total: 10,
  groupItem: 10
};

const SimpleItemRenderer = ({ data }: { data: any }) => {
  return (
    <ListItem aria-posinset={Number(data)} aria-setsize={-1}>
      더미데이터-{data}
    </ListItem>
  );
};

const FETCH_HEIGHT = 150 as const;
/**
 * infinitescroll을 위한 구조개선 컴포넌트
 * pull-refresh방식으로 이전 다음 페이지를 가져온다.
 * @returns
 */
function InfiniteApp_Advance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fetchButtonRef = useRef<(HTMLDivElement | null)[]>([]);
  const {
    data: feedList,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isFetching
  } = useSuspenseInfiniteQuery({
    queryKey: ['getFeedList'],
    queryFn: getFeedList,
    initialPageParam: 1,
    maxPages: 3, // 기억할 페이지 수
    select: data => {
      return {
        pageParams: data.pageParams,
        pages: data.pages.flatMap(o => o.data)
      };
    },
    getNextPageParam: lastPage => {
      return lastPage.nextCursor > contentInfo.total ? undefined : lastPage.nextCursor;
    },
    getPreviousPageParam: (_firstPage, _, firstPageParam) => {
      return firstPageParam <= 1 ? undefined : firstPageParam - 1;
    }
  });

  const { pages } = feedList;

  const apiRef = useRef({
    hasNextPage,
    hasPreviousPage,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    prevFetchingValue: '',
    isRollBack: false
  });

  useEffect(() => {
    if (isFetchingNextPage) {
      apiRef.current.prevFetchingValue = 'next';
      fetchButtonRef.current[1]?.scrollIntoView(false);
    } else if (isFetchingPreviousPage) {
      fetchButtonRef.current[0]?.scrollIntoView();
      apiRef.current.prevFetchingValue = 'prev';
    } else {
      if (contentRef.current && contentRef.current.childNodes.length > 10) {
        fetchButtonRef.current.forEach(o => {
          o?.classList.remove('show');
        });
        const target =
          apiRef.current.prevFetchingValue === 'prev'
            ? contentRef.current.children[10]
            : contentRef.current.children[contentRef.current.children.length - 11];

        target.scrollIntoView(apiRef.current.prevFetchingValue === 'prev');
      }
    }
  }, [isFetchingNextPage, isFetchingPreviousPage]);

  /**
   * scrollend이벤트 등록
   */
  useEffect(() => {
    const onScrollEnd = (_: Event) => {
      if (containerRef.current) {
        const maxScrollTop = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const scrollTop = containerRef.current.scrollTop;
        if (maxScrollTop - FETCH_HEIGHT > 1) {
          if (
            scrollTop <= FETCH_HEIGHT &&
            apiRef.current.hasPreviousPage &&
            !apiRef.current.isRollBack
          ) {
            //버튼 애니메이션 적용.
            apiRef.current.isRollBack = true;
            apiRef.current.fetchPreviousPage();
          } else if (
            scrollTop >= maxScrollTop - FETCH_HEIGHT &&
            apiRef.current.hasNextPage &&
            !apiRef.current.isRollBack
          ) {
            apiRef.current.isRollBack = true;
            apiRef.current.fetchNextPage();
          } else if (apiRef.current.isRollBack) {
            apiRef.current.isRollBack = false;
          }
        }
      }
    };

    const onScroll = (_: Event) => {
      if (apiRef.current.isRollBack) return;
      if (containerRef.current) {
        const maxScrollTop = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const scrollTop = containerRef.current.scrollTop;
        if (scrollTop <= FETCH_HEIGHT * 1.2 && apiRef.current.hasPreviousPage) {
          if (!fetchButtonRef.current[0]?.classList.contains('show')) {
            fetchButtonRef.current[0]?.classList.add('show');
          }
        } else if (scrollTop >= maxScrollTop - FETCH_HEIGHT * 1.2 && apiRef.current.hasNextPage) {
          if (!fetchButtonRef.current[1]?.classList.contains('show')) {
            fetchButtonRef.current[1]?.classList.add('show');
          }
        }
      }
    };

    containerRef.current?.addEventListener('scrollend', onScrollEnd);
    containerRef.current?.addEventListener('scroll', onScroll);

    return () => {
      containerRef.current?.removeEventListener('scrollend', onScrollEnd);
      containerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  apiRef.current.hasPreviousPage = hasPreviousPage;
  apiRef.current.hasNextPage = hasNextPage;
  apiRef.current.isFetching = isFetching;

  return (
    <Suspense fallback={<Typography>로딩!</Typography>}>
      <Container ref={containerRef} $pending={isFetching}>
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
        <ListRenderer ref={contentRef} options={pages} ItemRenderer={SimpleItemRenderer} />
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
      </Container>
    </Suspense>
  );
}

export default InfiniteApp_Advance;
