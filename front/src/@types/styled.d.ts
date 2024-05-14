import 'styled-components';

/**
 * 컬러 기본 구성
 * dark, main, light
 * 
 */

//styled-components 타입지정
// 타입을 통해 모두 같은 값을 넣고 싶다면?
// 여러 타입을 재귀로 해결하고 싶을 때는 그럼 튜블로 받아서 처리해야 할까/
type Hex = `#${string}`;
type ColorCategory = "main" | "dark" | "light";
type VariantCategory = "default" | "primary" | "success" | "info" | "warning" | "danger";
type ThemeMode = "light" | "dark";
type SetKeyValueType<Keys extends keyof any, Type> = {
    [K in Keys]: Type
}
type VariantColorType = SetKeyValueType<ColorCategory, Hex>;
// 모드 적용 시 적용타입
type VariantColorThemeType = SetKeyValueType<ThemeMode, VariantColorType>;
type VariantType = SetKeyValueType<VariantCategory, VariantColorType>;
/**
    default:{dark:{main:"", light:"", dark:""}, light:{}};
    일반 js로는 어떻게 구성할까?
    category, mode, color

 */


declare module 'styled-components' {
    export interface DefaultTheme {
        mode: ThemeMode;
        variant: VariantType;
    }
}

