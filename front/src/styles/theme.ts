import { DefaultTheme } from 'styled-components';
import { variant } from '@/colors';
// 컬러 팔렛트 https://m2.material.io/inline-tools/color/

const appTheme: DefaultTheme = {
  mode: 'light',
  space: [0, 2, 4, 8, 16, 20, 24, 32],
  variant,
  zIndices: {
    modal: 1000
  },
  radius: {
    s: '.25rem',
    m: '.5rem',
    l: '1rem'
  },
  thickness: {
    s: '1px',
    m: '2px',
    l: '4px'
  },
  boxShadow: {
    s: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    m: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);11px 6px rgb(0 0 0 / 20%)',
    l: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  }
};

// const themes = {
//     light: appTheme,
//     dark: appTheme
// }

export default appTheme;
