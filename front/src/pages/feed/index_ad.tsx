import React, { Suspense, useEffect, useRef } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import { getFeedList } from '@/service';
import Typography from '@/components/elements/Typography';
const ListItem = styled.div<{ $pending?: boolean }>`
  position: relative;
  display: inline-flex;
  inline-size: 100%;
  padding: 20px 16px;
  &:active {
    background-color: lightblue;
  }
`;

const ContentBody = styled.div<{ $pending?: boolean }>`
  position: relative;
  display: block;

  overscroll-behavior: contain;
  scroll-snap-align: start;
  min-height: 100vh;
  opacity: ${({ $pending }) => ($pending ? 0.5 : 1)};
  scroll-behavior: smooth;
  * + ${ListItem} {
    border-top: 1px solid #ababab;
  }

  [aria-label='page-prev'] {
    background-color: red;
  }
`;

const FetchButton = styled.div`
  display: grid;
  block-size: 100px;
  inline-size: 100%;
  place-items: center;
  background-color: antiquewhite;
`;

const Container = styled.div`
  position: relative;
  display: block;
  scroll-snap-align: none;
  height: calc(100vh - 48px);
  overflow: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

const contentInfo = {
  total: 10,
  groupItem: 10
};

/**
 * infinitescroll을 위한 구조개선 컴포넌트
 * pull-refresh방식으로 이전 다음 페이지를 가져온다.
 * @returns
 */
function InfiniteApp_Advance() {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    data: feedList,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
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

  const apiRef = useRef({
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage
  });

  apiRef.current.hasPreviousPage = hasPreviousPage;
  apiRef.current.hasNextPage = hasNextPage;

  /**
   * scrollend이벤트 등록
   */
  useEffect(() => {
    const onScrollEnd = (_: Event) => {
      if (contentRef.current) {
        const maxScrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        const scrollTop = contentRef.current.scrollTop;
        const buttonHeight = 100;
        if (scrollTop <= buttonHeight && apiRef.current.hasPreviousPage) {
          console.log('prev-page');
          apiRef.current.fetchPreviousPage();
        } else if (scrollTop >= maxScrollTop - buttonHeight && apiRef.current.hasNextPage) {
          console.log('next-page');
          apiRef.current.fetchNextPage();
        }
      }
    };
    contentRef.current?.addEventListener('scrollend', onScrollEnd);
    return () => {
      contentRef.current?.removeEventListener('scrollend', onScrollEnd);
    };
  }, []);

  const { pages } = feedList;

  return (
    <Suspense fallback={<Typography>로딩!</Typography>}>
      <Container ref={contentRef}>
        <FetchButton role='button' aria-hidden='true' aria-label='page-prev'>
          이전
        </FetchButton>
        <ContentBody $pending={isFetching}>
          {pages.map(idx => {
            return (
              <ListItem key={idx} aria-posinset={idx} aria-setsize={100}>
                더미목록 데이터-{idx}
              </ListItem>
            );
          })}
        </ContentBody>
        <FetchButton role='button' aria-hidden='true' aria-label='page-next'>
          다음
        </FetchButton>
      </Container>
    </Suspense>
  );
}

export default InfiniteApp_Advance;
