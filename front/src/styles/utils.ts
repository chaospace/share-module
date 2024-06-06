/**
 * 테마 유틸함수
 */
import { shouldForwardAllProps } from 'styled-composer';
import { StyleVariantProps, VariantCategory, VariantType } from 'styled';
import { variant } from '@/colors';
import { ObjType } from '@/components/types';
import { StyledObject, css } from 'styled-components';

type MergeValueType<A, B> = {
  [Property in keyof A]: A[Property] & B;
};

const appendVariantValue = <
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

const variantProxy =
  <T extends VariantType = VariantType>(
    source: T,
    callback: (c: T['default'], ...args: any) => ReturnType<typeof css> | StyledObject | string
  ) =>
  ({ variant, ...rest }: StyleVariantProps & Record<string, any>) => {
    return callback.apply(null, [source[variant!], rest]); //callback(source[variant!], ...rest);
  };
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
 * @param source :object
 * @param key    :object속성 키
 * @returns
 */
const getValue = <T extends object, K extends keyof T>(source: T, key: K) => source[key];
const getVariant = curriedValue('variant');
const getSpace = curriedValue('space');

const shouldForwardCSSProps =
  (props: string[] = [], base = true) =>
  (prop: string) =>
    !props.includes(prop) && base && shouldForwardAllProps(prop);

export {
  getValue,
  getSpace,
  getVariant,
  curriedValue,
  shouldForwardCSSProps,
  appendVariantValue,
  variantProxy
};
