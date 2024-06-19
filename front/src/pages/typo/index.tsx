import { VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import { P, Span, H, Caption } from '@/components/elements/Typography';
import { useEffect, useState } from 'react';

function TypoApp() {
  const [count, setCount] = useState(0);

  //use-state
  useEffect(() => {
    setCount(count + 1);
  }, []);

  return (
    <VBox gap={5}>
      <P>텍스트 내용</P>
      <Span>span텍스트</Span>
      <H>타이틀 텍스트</H>

      <H as='h3' variant='subTitle2'>
        서브 타이틀 텍스트
      </H>
      <Caption>캡션텍스트!</Caption>
      <Button onClick={() => setCount(count + 1)}>다음</Button>
    </VBox>
  );
}

export default TypoApp;
