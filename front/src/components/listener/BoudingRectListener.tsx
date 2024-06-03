import React, { useLayoutEffect, useMemo } from 'react';

type EventName<T extends string[]> = T[number] extends `on${infer R}`
  ? T[number] | Lowercase<R>
  : T[number];

type MouseEventName = EventName<['onClick', 'onMouseDown', 'onMouseUp']>;
type TouchEventName = EventName<['onTouchMove', 'onTouchStart', 'onTouchEnd']>;

interface BoundingRectListener {
  touchEvent?: TouchEventName | false;
  mouseEvent?: MouseEventName | false;
  children: React.ReactElement;
  onClickOutSide: (e: MouseEvent | TouchEvent) => void;
}

const setRef = <T extends Element = Element>(o: React.ForwardedRef<T>, instance: T) => {
  if (o === null) return;
  if (typeof o === 'function') {
    o(instance);
  } else {
    o.current = instance;
  }
  return o;
};

const useSyncRefGroup = <T extends Element = Element>(refs: React.ForwardedRef<T>[]) => {
  return useMemo(() => {
    if (refs?.every(o => o === null)) {
      return null;
    }

    return (instance: T) => {
      refs?.forEach(o => {
        setRef(o, instance);
      });
    };
  }, [refs]);
};

const converToEventName = (name: string) => {
  return name.replace('on', '').toLocaleLowerCase() as any;
};

const ownerDocument = (node: Node) => node.ownerDocument;

const clickedRootScrollbar = (e: MouseEvent, doc: Document) => {
  return (
    e.clientX > doc.documentElement.clientWidth || e.clientY > doc.documentElement.clientHeight
  );
};
/**
 * chlidren 영역을 벗어난 마우스 이벤트 감지 리스터 컴포넌트
 */
function BoundingRectListener({
  children,
  touchEvent = 'onTouchEnd',
  mouseEvent = 'onClick',
  onClickOutSide
}: BoundingRectListener) {
  const nodeRef = React.useRef<Element>(null);
  const movedRef = React.useRef(false);

  const syncRefs = useSyncRefGroup([
    //@ts-ignore
    children.ref, // 전달할 ref
    nodeRef // 마우스이벤트 인터셉트용 ref
  ]);

  const clickOutSideHandle = (e: MouseEvent | TouchEvent) => {
    if (!nodeRef.current) return;

    const node = e.target as Node;
    const doc = ownerDocument(nodeRef.current)!;
    //스크롤바 영역 클릭시 예외적용
    if ('clientX' in e && clickedRootScrollbar(e, doc)) {
      return;
    } else if (movedRef.current) {
      //드래그 이동을 한 후면 예외처리.
      movedRef.current = false;
      return;
    }

    let inSideDom = false;
    if (e.composedPath) {
      inSideDom = e.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      const isInDoc = doc.documentElement.contains(node);
      const isInChild = nodeRef.current.contains(node);
      inSideDom = !isInDoc || isInChild;
    }
    console.log('inside', inSideDom);
    if (!inSideDom) {
      onClickOutSide(e);
    }
  };

  //싱크된 ref를 전달
  const childrenProps = {
    ref: syncRefs
  };

  useLayoutEffect(() => {
    if (touchEvent !== false && nodeRef.current) {
      const event = converToEventName(touchEvent);
      const doc = ownerDocument(nodeRef.current)!;
      const touchMoveHandler = () => {
        movedRef.current = true;
      };

      doc.addEventListener(event, clickOutSideHandle);
      doc.addEventListener('touchmove', touchMoveHandler);

      return () => {
        doc.removeEventListener(event, clickOutSideHandle);
        doc.removeEventListener('touchmove', touchMoveHandler);
      };
    }
  }, [touchEvent, clickOutSideHandle]);

  useLayoutEffect(() => {
    if (mouseEvent !== false && nodeRef.current) {
      const event = converToEventName(mouseEvent);
      const doc = ownerDocument(nodeRef.current)!;
      doc.addEventListener(event, clickOutSideHandle);
      return () => {
        doc.removeEventListener(event, clickOutSideHandle);
      };
    }
  }, [mouseEvent, clickOutSideHandle]);

  return <React.Fragment>{React.cloneElement(children, childrenProps)}</React.Fragment>;
}

export default BoundingRectListener;
