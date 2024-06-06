import { sleep } from '@/components/util';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  position: relative;
  display: inline-flex;
  min-width: 200px;
  padding: 10px 16px;
  border: 1px solid;
  &:hover {
    background-color: #ababab;
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
  const pageRef = useRef({
    page: 1,
    total: 10,
    groupItem: 10
  });
  const [provider, setProvider] = useState<number[]>(createPageData(1));
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
        threshold: 0
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
          // const o = (pageRef.current.page - 1) * pageRef.current.groupItem + idx;
          return <ListItem key={idx}>더미목록 데이터-{idx}</ListItem>;
        })}
        {pageRef.current.page < pageRef.current.total && (
          <ListItem role='button' aria-label='page-next'>
            다음
          </ListItem>
        )}
      </ContentBody>
    </div>
  );
}

export default InfiniteApp;
