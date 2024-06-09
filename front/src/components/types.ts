import React from 'react';

/**
 * as를 이용한 polymorphic컴포넌트 타입 내용정리
 * 타입체크를 위해서는 순수 Props타입과 as를 통한 ElementType을 구분해야 함.
 *
 * 추론이 아닌 forwardRef를 리턴타입에 타입을 지정해 체킹하는 방식.
 *
 * ref는 상속처럼 타입을 구분하는 듯.
 *  - span < p < div
 *
 * https://www.tsteele.dev/posts/react-polymorphic-forwardref
 */

type Merge<A, B> = Omit<A, keyof B> & B;
type DistributiveOmit<A, K extends keyof any> = A extends any ? Omit<A, K> : never;
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B;

type PolymorphicProps<
  E extends React.ElementType,
  OverrideProps extends object,
  ComponentProps extends object
> = DistributiveMerge<ComponentProps, OverrideProps & { as?: E }>;

type PolymorphicWithRef<
  E extends OnlyAs,
  Props extends object,
  OnlyAs extends React.ElementType = React.ElementType
> = <T extends OnlyAs = E>(
  props: PolymorphicProps<T, Props, React.ComponentPropsWithRef<T>>
) => React.ReactNode | null;

/**
 * E : React.ElementType
 * Props : object
 * OnlyAs : React.ElementType = as타입 제한 설정을 위한 타입
 */
type ForwardRefRenderFunction = <
  E extends OnlyAs,
  Props extends object = {},
  OnlyAs extends React.ElementType = React.ElementType
>(
  //as 타입에 따라 변경되야 하니 ref타입 지정 위치는 any로 설정
  renderFunc: React.ForwardRefRenderFunction<any, Props & { as?: OnlyAs }>
) => Merge<
  React.ForwardRefExoticComponent<Merge<React.ComponentPropsWithoutRef<E>, Props & { as?: E }>>,
  PolymorphicWithRef<E, Props, OnlyAs>
>;

const polymorphicForwardRef = React.forwardRef as ForwardRefRenderFunction;

// ui element기본 속성에 추가 속성지정
type PropsWithHTMLAttributes<
  T extends keyof JSX.IntrinsicElements,
  Props extends {}
> = React.PropsWithChildren<JSX.IntrinsicElements[T] & Props>;

type PickLabelValueType<T extends object, K extends keyof T, V extends keyof T> = {
  label: T[K];
  value: T[V];
};

type ObjType<T extends object = Record<string, any>> = {
  [P in keyof T]: T[P];
};

type PropsWithOptionData<T = any> = { data: T };

export type {
  PolymorphicProps,
  PropsWithHTMLAttributes,
  PickLabelValueType,
  Merge,
  DistributiveMerge,
  ObjType,
  PropsWithOptionData
};
export { polymorphicForwardRef };
