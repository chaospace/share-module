import { sleep } from '@/components/util';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  position: relative;
  display: inline-flex;
  min-width: 200px;
  padding: 10px 16px;
  /* border: 1px solid; */
  &:hover {
    background-color: #ababab;
  }
  [aria-role='button'] {
    border: none;
  }
`;

const ContentBody = styled.div`
  position: relative;
  display: block;
  width: 200px;
  height: 380px;
  border: 1px solid;
  overflow: hidden;
  overflow-y: auto;
  * + ${ListItem} {
    border-top: 1px solid #ababab;
  }
`;

const createPageData = (p: number, num: number = 10) => {
  const s = (p - 1) * num;
  return Array.from({ length: num }).map((_, i) => s + (i + 1));
};

/**
 * 가상스크롤이 방식이 아니라 컨텐츠에 마지막에서 다음 그룹을 불러와 현재 목록에 추가한다.
 * intersectionObserver이용
 * @returns
 */
function InfiniteApp() {
  const contentRef = useRef<HTMLDivElement>(null);
  // const [isPending, startTransition] = useTransition();

  const pageRef = useRef({
    page: 1,
    total: 10,
    groupItem: 10
  });
  const [provider, setProvider] = useState<number[]>(createPageData(1));
  // const deferredProvider = useDeferredValue(provider);
  useEffect(() => {
    //페이지그룹을 체크해서 마지막에 도달하면 페이징을 처리한다.
    const ob = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(async entry => {
          if (entry.isIntersecting) {
            await sleep(200);
            if (entry.target.ariaLabel === 'page-next') {
              pageRef.current.page += 1;
              const next = createPageData(pageRef.current.page);
              setProvider([...provider, ...next]);
            }
          }
        });
      },
      {
        root: contentRef.current,
        threshold: 0,
        rootMargin: '0px 0px 160px 0px'
      }
    );

    contentRef.current?.querySelectorAll('[role=button]').forEach(ele => {
      ob.observe(ele);
    });

    return () => {
      ob.disconnect();
    };
  });

  return (
    <div style={{ padding: '40px' }}>
      <ContentBody ref={contentRef}>
        {provider.map(idx => {
          return (
            <ListItem key={idx} aria-posinset={idx} aria-setsize={100}>
              더미목록 데이터-{idx}
            </ListItem>
          );
        })}
        {pageRef.current.page < pageRef.current.total && (
          <ListItem role='button' aria-hidden='true' aria-label='page-next' />
        )}
      </ContentBody>
    </div>
  );
}

export default InfiniteApp;
