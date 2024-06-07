import ErrorBoundary from '@/components/ErrorBoundary';
import { useFeedObserver } from '@/components/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Suspense, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { getFeedList } from '@/service';
const ListItem = styled.div<{ $pending?: boolean }>`
  position: relative;
  display: inline-flex;
  min-width: 200px;
  padding: 10px 16px;
  &:hover {
    background-color: #ababab;
  }
  [aria-role='button'] {
    border: none;
  }
  opacity: ${({ $pending }) => ($pending ? 0.5 : 1)};
`;

const ContentBody = styled.div<{ $pending?: boolean }>`
  position: relative;
  display: block;
  width: 200px;
  height: 300px;
  border: 1px solid;
  overflow: hidden;
  overflow-y: auto;
  opacity: ${({ $pending }) => ($pending ? 0.5 : 1)};
  * + ${ListItem} {
    border-top: 1px solid #ababab;
  }
`;
/* 
const createPageData = (p: number, num: number = 10) => {
  const s = (p - 1) * num;
  return Array.from({ length: num }).map((_, i) => s + (i + 1));
};

const requestNext = (param: number) => {
  return Promise.resolve(createPageData(param));
};

const withSuspense = <T extends unknown = unknown>(promise: Promise<T>) => {
  let status = 'pending';
  let result: T;
  const suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );

  const read = () => {
    if (status === 'pending') {
      throw suspender;
    } else if (status === 'success') {
      return result;
    } else if (status === 'error') {
      return result;
    }
  };

  return { read };
};

const fetchPendingData = () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve('chaospce!');
    }, 1000);
  });
  return withSuspense(promise);
};


const useFeedList = (page: number, transitionFunc: React.TransitionStartFunction) => {
  const [provider, setProvider] = useState<number[]>([]);
  useEffect(() => {
    if (page <= 0) return;
    transitionFunc(() => {
      requestNext(page).then(v => {
        setProvider(prev => {
          if (prev.includes(v[0])) {
            return prev;
          }
          return [...prev, ...v];
        });
      });
    });
  }, [page]);

  return provider;
};

 const api = fetchPendingData();
 */

const contentInfo = {
  total: 10,
  groupItem: 10
};

/**
 * intersectionObserver이용한 feed컴포넌트
 * @returns
 */
function InfiniteApp() {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    data: feedList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['getFeedList'],
    queryFn: getFeedList,
    initialPageParam: 1,
    maxPages: 10,
    select: data => {
      // 현재페이지는 항상
      console.log('pages', data.pageParams);
      //data.pageParams,
      //data.pages
      return data;
    },
    getNextPageParam: lastPage => {
      return lastPage.nextCursor > contentInfo.total ? undefined : lastPage.nextCursor;
    },
    getPreviousPageParam: firstPage => {
      return firstPage.previousCursor <= 1 ? undefined : firstPage.previousCursor - 1;
    }
  });
  // const {pages, pageParams} = feedList;
  const feedIntersectionCallback = useCallback(
    (o: IntersectionObserverEntry) => {
      if (o.isIntersecting) {
        if (o.target.ariaLabel === 'page-next') {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage]
  );

  useFeedObserver({
    getListener: () => {
      return Array.from(contentRef.current!.querySelectorAll('[role=button]') ?? []).filter(
        v => v
      ) as Element[];
    },
    getOption: () => {
      return {
        root: contentRef.current,
        threshold: 0,
        rootMargin: '0px -100px 100px 0px'
      };
    },
    callback: feedIntersectionCallback,
    deps: [hasNextPage]
  });

  return (
    <div style={{ padding: '40px' }}>
      <ErrorBoundary
        fallback={e => {
          console.log(e);
          return null;
        }}>
        <Suspense fallback={<h1>로딩!</h1>}>
          <ContentBody $pending={isFetching || isFetchingNextPage} ref={contentRef}>
            {feedList &&
              feedList.pages.map((group, _) => (
                <React.Fragment key={_}>
                  {group.data.map(idx => {
                    return (
                      <ListItem key={idx} aria-posinset={idx} aria-setsize={100}>
                        더미목록 데이터-{idx}
                      </ListItem>
                    );
                  })}
                </React.Fragment>
              ))}
            {(feedList ? hasNextPage : true) && (
              <ListItem role='button' aria-hidden='true' aria-label='page-next'>
                ...data fatcing...
              </ListItem>
            )}
          </ContentBody>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default InfiniteApp;
