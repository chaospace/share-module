/**
 * 테마 유틸함수
 */
import { shouldForwardAllProps } from 'styled-composer';
import { StyleVariantProps, VariantCategory, VariantColorType, VariantType } from 'styled';
import { variant } from '@/colors';
import { ObjType, TFunc } from '@/components/types';
import { ExecutionContext, StyledObject, css } from 'styled-components';
import React from 'react';

type MergeValueType<A, B> = {
  [Property in keyof A]: A[Property] & B;
};

type StyleReturnType = ReturnType<typeof css> | StyledObject | string;

/**
 * variant컬러 정보에 데이터 추가 후 리턴 함수
 * @param extra
 * @param base
 * @returns
 */
const assignVariantCategory = <
  Extra extends ObjType,
  Props extends Record<VariantCategory, Extra> = Record<VariantCategory, Extra>
>(
  extra: Props,
  base = variant
) => {
  const answer = structuredClone(base) as MergeValueType<VariantType, Extra>;
  for (const [key, value] of Object.entries(extra)) {
    answer[key as VariantCategory] = Object.assign(answer[key as VariantCategory], value);
  }
  return answer;
};

/**
 * comoponent varient속성에 해당하는 컬러정보로 콜백 호출
 * @param source
 * @param callback
 * @returns
 */
const getCustomVariant =
  <T extends VariantType = VariantType>(
    source: T,
    callback: (c: T['default'], ...args: any) => StyleReturnType
  ) =>
  ({ variant, ...rest }: StyleVariantProps & Record<string, any>) => {
    return callback.apply(null, [source[variant!], rest]);
  };

const isArray = (value: unknown): value is any[] => Array.isArray(value) === true;
const isObject = (value: unknown): value is object => typeof value === 'object';
const toReactElement = <T extends object = {}>(o: any) =>
  o as React.ReactElement<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & StyleVariantProps & T, HTMLElement>
  >;
const toParams = (value: unknown) => {
  return isArray(value) ? value : [value];
};

/**
 * 함수 파이프처리
 * 커링을 통해 파이프를 구성하고 후에 args는 넘겨서 실행한다.
 */
const pipe = <T extends TFunc, U extends TFunc[], L extends TFunc>(...fns: [T, ...U, L]) => {
  return (...args: Parameters<T>): ReturnType<L> => {
    return fns.reduce((value, fn) => fn.apply(null, [...toParams(value)]), args as any);
  };
};
type ThemeVariantProps = {
  themeVariant: VariantType;
  variant: VariantCategory;
  accentVariant: VariantCategory;
};
const forwardStyleProps = (props: ExecutionContext & StyleVariantProps) => {
  return props;
};
const forwardThemeVariant = pipe(
  forwardStyleProps,
  ({ theme, variant, accentVariant }) =>
    ({
      themeVariant: theme.variant,
      variant,
      accentVariant
    }) as ThemeVariantProps
);
const forwardComponentVariant = pipe(
  forwardThemeVariant,
  ({ themeVariant, variant }) => themeVariant[variant]
);
const parseVariant = (callback: (props: ThemeVariantProps) => StyleReturnType) => {
  return pipe(forwardThemeVariant, callback);
};

const parseVariantColor = (callback: (color: VariantColorType) => StyleReturnType) =>
  pipe(forwardComponentVariant, callback);

/**
 * getValue에 키를 커링으로 기억해서 사용하는 함수.
 * @param key    :object속성 키
 * @returns
 */
const curriedValue =
  (key: string) =>
  <T extends object>(source: T) =>
    getValue(source, key as keyof T);

/**
 * key에 해당하는 source정보를 반환
 * @param source :any
 * @param key    :source속성 키
 * @returns
 */
const getValue = <T extends any, K extends keyof T>(source: T, key: K) => source[key];

const shouldForwardVariantProps =
  (props: string[] = []) =>
  (prop: string) =>
    !['variant', 'accentVariant', ...props].includes(prop);

const shouldForwardCSSProps =
  (props: string[] = [], base = true) =>
  (prop: string) =>
    !props.includes(prop) && base && shouldForwardAllProps(prop);

const getValidChildren = (children?: React.ReactNode) =>
  React.Children.toArray(children).filter(o => React.isValidElement(o));

const getVariantColorLight = parseVariantColor(c => c.light);
const getVariantColorMain = parseVariantColor(c => c.main);
const getVariantColorDark = parseVariantColor(c => c.dark);
const getAccentColorDark = parseVariant(
  ({ themeVariant, accentVariant }) => themeVariant[accentVariant].dark
);
const getAccentColorMain = parseVariant(
  ({ themeVariant, accentVariant }) => themeVariant[accentVariant].main
);

const getAccentColorLight = parseVariant(
  ({ themeVariant, accentVariant }) => themeVariant[accentVariant].light
);

export {
  getVariantColorDark,
  getVariantColorMain,
  getVariantColorLight,
  getAccentColorDark,
  getAccentColorMain,
  getAccentColorLight,
  getValidChildren,
  getValue,
  parseVariant,
  forwardComponentVariant,
  curriedValue,
  shouldForwardCSSProps,
  shouldForwardVariantProps,
  assignVariantCategory,
  getCustomVariant,
  parseVariantColor,
  toParams,
  isArray,
  isObject,
  toReactElement,
  pipe
};
