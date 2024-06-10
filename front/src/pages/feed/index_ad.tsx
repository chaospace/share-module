import React, { Suspense } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import { getFeedList } from '@/service';
import Typography from '@/components/elements/Typography';

import InfiniteList from '@/components/list/InfiniteList';

const ListItem = styled.div`
  position: relative;
  display: inline-flex;
  inline-size: 100%;
  padding: 40px 16px;
  &:active {
    background-color: lightblue;
  }
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

/**
 * infinitescroll을 위한 구조개선 컴포넌트
 * pull-refresh방식으로 이전 다음 페이지를 가져온다.
 * @returns
 */
function InfiniteApp_Advance() {
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

  const { pages } = feedList;

  return (
    <Suspense fallback={<Typography>로딩!</Typography>}>
      <InfiniteList
        options={pages}
        ItemRenderer={SimpleItemRenderer}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
      />
    </Suspense>
  );
}

export default InfiniteApp_Advance;
