import type { CSSProp } from 'styled-components';

//
declare module 'react' {
  export interface Attributes {
    css?: CSSProp;
  }
  // export interface DOMAttributes<T> {
  //   css?: CSSProp;
  // }
  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    css?: CSSProp;
  }
}
