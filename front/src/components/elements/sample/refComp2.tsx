import React from 'react';

type Merge<A = object, B = object> = Omit<A, keyof B> & B;
type MergeProps<E, P = object> = P &
  Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, P>;

//forwardRef에 리턴타입인 ForwardRefExoticComponent를 확장해 orride처리
interface ForwardRefComponent<IntrinsicElementString, OwnProps = object>
  extends React.ForwardRefExoticComponent<
    MergeProps<IntrinsicElementString, OwnProps & { as?: IntrinsicElementString }>
  > {
  <As extends keyof JSX.IntrinsicElements>(
    props: MergeProps<As, OwnProps & { as?: As }>
  ): React.ReactNode | null;
  <
    As extends React.ElementType<unknown>,
    _AsWithProps = As extends React.ElementType<infer P> ? React.ElementType<P> : never
  >(
    props: MergeProps<_AsWithProps, OwnProps & { as?: _AsWithProps }>
  ): React.ReactNode | null;
}

// 리맵핑을 통한 처리. 타입지정을 as를 통한 단언으로 적용

const Box2 = React.forwardRef(({ as: Element = 'div', ...props }, forwaredRef) => {
  return <Element ref={forwaredRef} {...props} />;
}) as ForwardRefComponent<'div'>;

export default Box2;
