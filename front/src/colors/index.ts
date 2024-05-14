import green from "./green";
import blue from "./blue";
import lightBlue from "./lightBlue";
import lightGreen from "./lightGreen";
import amber from "./amber";
import indigo from "./indigo";
import red from "./red";
import teal from "./teal";
import grey from "./grey";
import deepPurple from "./deepPurple";
import { VariantType } from "../../@types/styled";

const common = {
    black: '#000',
    white: '#fff',
}

const variant: VariantType = {
    default: {
        main: grey[500],
        light: grey[200],
        dark: grey[800]
    },
    primary: {
        main: indigo[500],
        light: indigo[200],
        dark: indigo[800]
    },
    success: {
        main: teal[500],
        light: teal[200],
        dark: teal[800]
    },
    warning: {
        main: amber[500],
        light: amber[200],
        dark: amber[800]
    },
    info: {
        main: deepPurple[500],
        light: deepPurple[200],
        dark: deepPurple[800]
    },
    danger: {
        main: red[500],
        light: red[200],
        dark: red[800]
    }
}

export {
    common,
    amber,
    blue,
    indigo,
    green,
    grey,
    lightBlue,
    lightGreen,
    red,
    teal,
    variant
}