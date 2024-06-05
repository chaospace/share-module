import React, {
  PropsWithChildren,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { VBox } from '../elements/Box';
import Button from '../elements/Button';
import styled from 'styled-components';
import Typography from '../elements/Typography';
import Input from '../elements/Input';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import type { StyleVariantProps } from 'styled';
import { VariantCategory } from 'styled';
import { debounce } from '../util';
import { TempTypography } from '@/stories/elements';

const IConDownArrow = styled.i`
  position: absolute;
  display: inline-block;
  border-width: 0 2px 2px 0;
  border-style: solid;
  border-color: currentColor;
  height: 8px;
  width: 8px;
`;

const AccordionContentBody = styled.div`
  position: relative;
  display: block;
  padding: 20px;
`;

const AccordionContent = styled('div')
  .attrs<CSSComposerObject>({
    position: 'relative',
    overflow: 'hidden',
    overflowY: 'auto',
    display: 'block'
  })
  .withConfig({ shouldForwardProp: shouldForwardAllProps })`
  ${composer}
  transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const AccordionButton = styled(Button).attrs(_ => ({
  gap: 2,
  px: 24,
  py: 16,
  width: '100%',
  display: 'block',
  borderRadius: 0,
  border: 'none',
  variant: _.variant ?? 'info'
}))`
  ${Typography} {
    position: relative;
    pointer-events: none;
    display: block;
    width: 100%;
    border: 2px solid transparent;
    border-radius: 4px;
    text-align: left;
    padding: 4px;
    ${IConDownArrow} {
      right: 0;
      top: 58%;
      transform-origin: center;
      pointer-events: none;
      transform: translate(-100%, -100%) rotate(45deg);
    }
  }
  &[aria-expanded='true'] {
    ${IConDownArrow} {
      transform: translate(-100%, -50%) rotate(224deg);
    }
  }

  &:focus,
  &:focus-within {
    outline: none;
    ${Typography} {
      border-color: hsl(216deg 94% 43%);
      border-radius: 4px;
    }
  }
`;

const Container = styled(VBox).attrs({
  gap: 0
})`
  overflow: hidden;
  border-radius: 8px;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 50%),
    1px 2px 6px 2px rgb(0 0 0 / 20%);
  // 두번째 요소부터 상단보더 적용
  * + ${AccordionButton} {
    border-top: 1px solid;
    border-color: currentColor;
  }
`;

const _Handler = (_: React.MouseEvent<HTMLButtonElement>) => {};
// maxHeight={getMaxHeight(selected)}
function AccordionItem({
  label,
  selected = false,
  children,
  variant = 'default',
  contentMaxHeight,
  onClick = _Handler
}: PropsWithChildren<{
  label: string;
  selected?: boolean;
  contentMaxHeight: number;
  variant?: VariantCategory;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>) {
  const itemID = `acc-ins-${useId()}`;
  const contentID = `acc-content-${useId()}`;
  const nodeRef = useRef<HTMLDivElement>(null);
  const boundingRef = useRef<{ [key: string]: number }>({ normal: 0, expanded: 0, init: -1 });
  const getMaxHeight = (bSelect: boolean) => {
    return bSelect ? boundingRef.current.expanded : boundingRef.current.normal; //nodeRef.current?.firstElementChild?.clientHeight : 0;
  };
  useLayoutEffect(() => {
    //컨텐츠 크기 참조 후 hidden설정
    if (boundingRef.current.init < 0) {
      boundingRef.current.init = 0;
      const rect = nodeRef.current?.firstElementChild?.getBoundingClientRect();
      boundingRef.current.expanded = rect?.height ?? 0;
      nodeRef.current?.setAttribute('hidden', 'true');
    }
  }, []);

  // select값에 따른 view체인지
  useEffect(() => {
    let debounceID: any;
    if (selected) {
      //등장 전 hidden 제거
      nodeRef.current?.removeAttribute('hidden');
    }
    debounceID = debounce(() => {
      nodeRef.current!.style.height = `${getMaxHeight(selected)}px`;
    }, 0)();
    return () => clearTimeout(debounceID);
  }, [selected]);

  useEffect(() => {
    const transitionOutHandler = (e: TransitionEvent) => {
      const ele = e.target! as HTMLElement;
      if (ele.getBoundingClientRect().height <= 1) {
        ele.setAttribute('hidden', 'true');
      }
    };
    nodeRef.current?.addEventListener('transitionend', transitionOutHandler);
    return () => {
      nodeRef.current?.removeEventListener('transitionend', transitionOutHandler);
    };
  }, []);
  return (
    <React.Fragment>
      <AccordionButton
        id={itemID}
        variant={variant}
        aria-controls={contentID}
        aria-expanded={selected}
        onClick={onClick}>
        <Typography as='span'>
          {label}
          <IConDownArrow />
        </Typography>
      </AccordionButton>
      <AccordionContent
        id={contentID}
        ref={nodeRef}
        role='region'
        aria-labelledby={itemID}
        aria-hidden={!selected}
        maxHeight={contentMaxHeight}>
        <AccordionContentBody>{children}</AccordionContentBody>
      </AccordionContent>
    </React.Fragment>
  );
}

interface AccordionProps extends StyleVariantProps {
  /** 아코디언 컨텐츠 maxHeight설정 기본값은 300px */
  contentMaxHeight?: number;
}

/**
 * 아코디언 컴포넌트
 * 세부 내용은 데이터 연동보다 직접구성 방식을 적용.
 *
 * @param  {AccordionProps} {variant?:VariantCategory}
 */
function Accordion({ variant = 'default', contentMaxHeight = 300 }: AccordionProps) {
  const [selected, setSelected] = useState('');
  const onClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ele = e.target as HTMLElement;
    const text = ele.textContent!;
    setSelected(prev => (prev === text ? '' : text));
  };

  return (
    <React.Fragment>
      <Container>
        <AccordionItem
          variant={variant}
          contentMaxHeight={contentMaxHeight}
          label='아코디언 라벨'
          selected={selected === '아코디언 라벨'}
          onClick={onClickItem}>
          <Input type='text' />

          <Input type='tel' />

          <Input type='url' />

          <Input type='search' />
          <Input type='text' />

          <Input type='tel' />

          <Input type='url' />

          <Input type='search' />
        </AccordionItem>
        <AccordionItem
          variant={variant}
          contentMaxHeight={contentMaxHeight}
          label='아코디언 라벨2'
          selected={selected === '아코디언 라벨2'}
          onClick={onClickItem}>
          <TempTypography />
        </AccordionItem>
        <AccordionItem
          label='아코디언4'
          variant={variant}
          contentMaxHeight={contentMaxHeight}
          selected={selected === '아코디언4'}
          onClick={onClickItem}>
          <Input type='text' />
          <br />
          <Input type='tel' />
          <br />
          <Input type='url' />
          <br />
          <Input type='search' />
        </AccordionItem>
      </Container>
    </React.Fragment>
  );
}

export default Accordion;
