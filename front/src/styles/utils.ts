/**
 * 테마 유틸함수
 */
import { shouldForwardAllProps } from 'styled-composer';

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
const shouldForwardCSSProps =
  (props: string[] = []) =>
  (prop: string) =>
    !props.includes(prop) && shouldForwardAllProps(prop);

export { getValue, getVariant, curriedValue, shouldForwardCSSProps };
