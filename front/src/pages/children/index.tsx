import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';

const setRef = <T extends Element>(o: React.ForwardedRef<T>, instance: T) => {
  if (!o) return null;
  if (typeof o === 'function') {
    o(instance);
  } else {
    o.current = instance;
  }
  return o;
};

const useForkRef = <T extends Element = Element>(refs: React.RefObject<T>[]) => {
  return useMemo(() => {
    if (refs.every(o => o === null)) {
      return null;
    }
    return (instance: T) => {
      refs.forEach(o => {
        setRef(o, instance);
      });
    };
  }, [refs]);
};

const ownerDocument = (o: Element) => o.ownerDocument;

const clickedRootScrollbar = (e: MouseEvent, doc: Document) => {
  return (
    e.clientX > doc.documentElement.clientWidth || e.clientY > doc.documentElement.clientHeight
  );
};

function FromChildren({
  children,
  mouseEvent = 'onClick',
  onClickAway
}: {
  mouseEvent?: 'onClick' | false;
  children: React.ReactElement;
  onClickAway: (e: MouseEvent) => void;
}) {
  const nodeRef = useRef<Element>(null);
  // const syntheticEventRef = useRef(false);
  const refHandler = useForkRef([
    // @ts-ignore
    children.ref,
    nodeRef
  ]);

  const clickAwayHandler = useCallback(
    (e: MouseEvent) => {
      const node = e.target as Node;
      const doc = ownerDocument(nodeRef.current!);
      if (e.target) {
        if (!nodeRef.current || ('clientX' in e && clickedRootScrollbar(e, doc))) {
          return;
        }

        let insideDom = false;
        if (e?.composedPath()) {
          // composedPath 현재노드부터 body까지 이어지는 bubble논드 목록
          insideDom = e.composedPath().indexOf(nodeRef.current) > -1;
        } else {
          const isInDoc = doc.documentElement.contains(node);
          const isInComp = nodeRef.current.contains(node);
          insideDom = !isInDoc || isInComp;
        }

        if (!insideDom) {
          onClickAway(e);
        }
      }
    },
    [onClickAway]
  );

  //다른 속성은 children에 있는 것을 그대로 사용하고
  //ref만 override하여 이벤트를 가로챈다.
  const chlidrenProps: Record<string, any> = { ref: refHandler };
  // 원본 이벤트 핸들러 호출.
  /*   const createHandleSynthetic = (handlerName: string) => (e: React.SyntheticEvent) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      console.log('original-click-call');
      childrenPropsHandler(e);
    }
  };
  
  if (mouseEvent) {
    chlidrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
 */
  useLayoutEffect(() => {
    //이벤트 핸들러 가져오기.
    if (mouseEvent !== false) {
      const mappedMouseEvent: 'click' = mouseEvent.substring(2).toLocaleLowerCase() as 'click';
      const doc = nodeRef.current?.ownerDocument;

      doc?.addEventListener(mappedMouseEvent, clickAwayHandler);

      return () => {
        doc?.removeEventListener(mappedMouseEvent, clickAwayHandler);
      };
      // console.log('nodeRef', nodeRef, mappedMouseEvent);
    }
  }, [clickAwayHandler, mouseEvent]);

  return <>{React.cloneElement(children, chlidrenProps)}</>;
}

function ChildrenApp() {
  // const spanRef = React.useRef<HTMLSpanElement>(null);
  const onClick = (_: React.MouseEvent<HTMLParagraphElement>) => {
    console.log('click', _);
  };

  const onClickOutSideChildElement = (_: MouseEvent) => {
    console.log('out-side-click');
  };

  return (
    <FromChildren onClickAway={onClickOutSideChildElement}>
      <span style={{ width: 'min-content' }} onClick={onClick}>
        <div
          style={{
            position: 'relative',
            height: '40px',
            width: '100px',
            backgroundColor: 'aqua'
          }}>
          <p>카오스</p>
        </div>
      </span>
    </FromChildren>
  );
}

export default ChildrenApp;
