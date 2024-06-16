import { VBox } from '@/components/elements/Box';
import { P, Span, H, Caption } from '@/components/elements/Typography';

function TypoApp() {
  return (
    <VBox gap={5}>
      <P>텍스트 내용</P>
      <Span>span텍스트</Span>
      <H>타이틀 텍스트</H>

      <H as='h3' variant='subTitle2'>
        서브 타이틀 텍스트
      </H>
      <Caption>캡션텍스트!</Caption>
    </VBox>
  );
}

export default TypoApp;
