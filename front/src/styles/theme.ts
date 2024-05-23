import { DefaultTheme } from 'styled-components';
import { variant } from '@/colors';
// 컬러 팔렛트 https://m2.material.io/inline-tools/color/

const appTheme: DefaultTheme = {
  mode: 'light',
  space: [0, 2, 4, 8, 16, 20, 24, 32],
  variant
};

// const themes = {
//     light: appTheme,
//     dark: appTheme
// }

export default appTheme;
