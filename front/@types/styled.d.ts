import 'styled-components';
import { DefaultTheme } from 'styled-components';

/**
 * 컬러 기본 구성
 * dark, main, light
 *
 */

//styled-components 타입지정
// 타입을 통해 모두 같은 값을 넣고 싶다면?
// 여러 타입을 재귀로 해결하고 싶을 때는 그럼 튜블로 받아서 처리해야 할까/

declare type ThemeMode = 'light' | 'dark';
declare type Hex = `#${string}`;
declare type ColorCategory = 'main' | 'dark' | 'light';
declare type VariantCategory = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

declare type SetKeyValueType<Keys extends keyof any, Type> = {
  [K in Keys]: Type;
};
declare type VariantColorType = SetKeyValueType<ColorCategory, string>;
// 모드 적용 시 적용타입
declare type VariantColorThemeType = SetKeyValueType<ThemeMode, VariantColorType>;
declare type VariantType = SetKeyValueType<VariantCategory, VariantColorType>;
declare type StyleVariantContext = {
  theme: DefaultTheme;
  variant: VariantCategory;
};

declare type StyleVariantProps = {
  variant?: VariantCategory;
};

declare type ScaleType = SetKeyValueType<'s' | 'm' | 'l', string>;

/**
    default:{dark:{main:"", light:"", dark:""}, light:{}};
    일반 js로는 어떻게 구성할까?
    category, mode, color

 */

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeMode;
    variant: VariantType;
    zIndices: {
      modal: number;
    };
    radius: ScaleType;
    thickness: ScaleType;
  }
}

// export type {
//     VariantCategory,
//     VariantType,
//     VariantColorType,
//     VariantColorThemeType,
//     ColorCategory,
//     Hex
// }
