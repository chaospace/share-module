import React, {
  PropsWithChildren,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import Typography from '../elements/Typography';
import type { StyleVariantProps } from 'styled';
import { VariantCategory } from 'styled';
import { debounce } from '../util';
import { getValidChildren } from '@/styles/utils';
import {
  AccordionButton,
  AccordionContainer,
  AccordionContent,
  IConDownArrow
} from './elements.style';

const _Handler = (_: React.MouseEvent<HTMLButtonElement>) => {};

interface AccordionItemProps {
  label: string;
  selected?: boolean;
  contentMaxHeight?: number;
  variant?: VariantCategory;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function AccordionItem({
  label,
  selected = false,
  children,
  variant = 'default',
  contentMaxHeight = 300,
  onClick = _Handler
}: PropsWithChildren<AccordionItemProps>) {
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
        {children}
      </AccordionContent>
    </React.Fragment>
  );
}

interface AccordionProps extends StyleVariantProps {
  /** 아코디언 컨텐츠 maxHeight설정 기본값은 300px */
  contentMaxHeight?: number;
  /** 초기 확장 아코디언패널 설정변수 label값 */
  select?: string;
}

/**
 * 아코디언 컴포넌트<br/>
 * 세부 내용은 데이터 연동보다 직접구성 방식을 적용.
 *
 * @param  {AccordionProps} params
 */
function Accordion({
  select = '',
  variant = 'default',
  contentMaxHeight = 300,
  children
}: PropsWithChildren<AccordionProps>) {
  const [selected, setSelected] = useState(select);
  const onClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ele = e.target as HTMLElement;
    const text = ele.textContent!;
    setSelected(prev => (prev === text ? '' : text));
  };

  return (
    <React.Fragment>
      <AccordionContainer>
        {getValidChildren(children).map((o: any) => {
          return (
            <AccordionItem
              key={o.props.label}
              label={o.props.label}
              variant={variant}
              contentMaxHeight={contentMaxHeight}
              selected={o.props.label === selected}
              onClick={onClickItem}>
              {React.cloneElement(<React.Fragment></React.Fragment>, {}, o.props.children)}
            </AccordionItem>
          );
        })}
      </AccordionContainer>
    </React.Fragment>
  );
}

export default Accordion;
