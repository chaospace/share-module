import { DefaultTheme } from "styled-components";
// 컬러 팔렛트 https://m2.material.io/inline-tools/color/
const appTheme: DefaultTheme = {
    mode: "light",
    variant: {
        default: {
            main: "#979797",
            light: "#f0f0f0",
            dark: "#3c3c3c"
        },
        primary: {
            main: "#3586d2",
            light: "#6db2e8",
            dark: "#1c478e"
        },
        success: {
            main: "#00bd78",
            light: "#3cdfab",
            dark: "#007644"
        },
        warning: {
            main: "#c6365a",
            light: "#be71d8",
            dark: "#6c29ae"
        },
        info: {
            main: "#ffb100",
            light: "#ffd44d",
            dark: "#ff6d00"
        },
        danger: {
            main: "#ff1507",
            light: "#ff795b",
            dark: "#da0000"
        }
    }
}


export default appTheme;