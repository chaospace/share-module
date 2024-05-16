/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import styled, { ExecutionContext, StyleFunction, StyledObject } from "styled-components";
import "jest-styled-components";
import appTheme from "@/styles/theme";

//스타일 값을 리터하는 함수
type StyleKeyType = string | number;
type StyleProviderType = Record<StyleKeyType, any>;
/**
 * provider에 올수 있는 값은 결국 스타일에 설정할 수 있는 형식 단수: number or string , 복수 (number|string)[]
 * 이것이 object일 수도 있고 단일키에 바로 값이 올 수도 잇다.
 */
type KeyValueType<T extends unknown = unknown> = T extends object ? {
    [P in keyof T]: T[P] extends object ? KeyValueType<T[P]> : T[P]
} : T extends infer P ? P : T;



type GenerateRecordType<T extends object> = {
    [P in keyof T]: T[P] extends Function
    ? T[P]
    : T[P] extends {} ? GenerateRecordType<T[P]>
    : T[P];
}

const props = {
    name: "cha",
    profile: [1, 2, 3],
    user: {
        id: 10,
        url: "http://aaa.com"
    },
    callback() {
        return '';
    }
}

type AA = GenerateRecordType<typeof props>
const aa: AA = {
    name: "de",
    profile: [],
    user: {
        id: 3,
        url: ""
    },
    callback() { return 'ca' }
}
/**
 * get함수에 역할은 provider에서 key를 찾아 리턴하는 역할.
 * @param key 
 * @param provider 
 * @param replaceValue 
 * @returns 
 */
const get = <T extends StyleKeyType>(key: T, provider?: StyleProviderType, replaceValue?: T) => {
    const keys = typeof key === "string" ? key.split(".") : [key];
    for (let i = 0; i < keys.length; i++) {
        if (provider !== undefined && provider[keys[i]]) {
            provider = provider[keys[i]];
        } else {
            provider = undefined;
            break;
        }
    }
    return provider === undefined ? replaceValue : provider;
}

/**
 * style을 속성 별로 처리하기 위해 사용하는 함수 선언.  
 * mx, m 과 space를 연결하기 위해 필요한게 parse처리. 
 */
interface StyleFunctionProps {
    property: (string | number) | (string | number)[];
    alias: string;
    interpreter?: Function;
    defaultAlias?: string;
}

interface StyleParseFunction {
    (key: StyleKeyType, provider: StyleProviderType, prelaceValue?: StyleKeyType): any;
    alias: string;
    defaultAlias?: string;
}

interface CPStyleFunction {
    (props: StyleFunctionProps): StyleParseFunction;
}

const getValue = (key: StyleKeyType, provider: StyleProviderType) => get(key, provider, key);

/**
 * 스타일 파싱을 위한 정보를 curring으로 기억하고 호출 시 해당 속성 값을 찾아서 리턴한다.
 * @param param0 : StyledObject타입을 리턴 -> css포맷 키를 가진 객체가 리턴된다.
 * @returns 
 */
const styleFunction: CPStyleFunction = ({ property, alias, interpreter = getValue, defaultAlias }: StyleFunctionProps) => {

    const nProperties = Array.isArray(property) ? property : [property];

    const sx = (key: any, provider: any, replaceValue: any) => {
        // style값을 설정 후 리턴한다.
        const style: StyledObject = {};
        const n = interpreter(key, provider, replaceValue);
        if (n === null) return;
        for (let i = 0; i < nProperties.length; i++) {
            style[nProperties[i]] = n;
        }
        return style;
    }

    sx.alias = alias;
    sx.defaultAlias = defaultAlias;

    return sx;
}

type StyleConfig = Record<string, StyleFunctionProps | boolean>;
type StyleParseConfig = Record<string, StyleParseFunction>;
type StyleInterpreter = StyleFunction<any & {
    propName: string[],
    config: StyleParseConfig
}>;

const isStyleFunctionProps = (target: StyleFunctionProps | boolean): target is StyleFunctionProps => typeof target !== "boolean";
// styleFunction을 설정으로 만드는 함수.
const composeStyleFunctions = (config: StyleConfig) => {
    const interpreter: any = {};
    for (let key in config) {
        const styleConfig = config[key];
        const styleFn = isStyleFunctionProps(styleConfig) ? styleFunction(styleConfig) : styleFunction({ property: key, alias: key });
        interpreter[key] = styleFn;
    }
    return interpreter;
}

const composeInterpreter = (config: StyleParseConfig): StyleInterpreter => {
    const interpreter = (props: ExecutionContext & any) => {
        let style: StyledObject = {};
        for (let key in props) {
            //파싱 정보가 없는 키 제외
            if (!config[key]) continue;
            //해당 키에 파싱 함수 참조
            const styleFn = config[key];
            //현재 넘어온 컴포넌트에 값 참조
            const rawValue = props[key];
            //테마에 설정한 provider값 참조
            const provider = get(styleFn.alias, props.theme, styleFn.defaultAlias);

            if (rawValue !== null) {
                style = Object.assign(style, styleFn(rawValue, provider as any, props));
            }
        }
        return style;
    };
    interpreter.config = config;
    interpreter.propNames = Object.keys(config);
    return interpreter
}

const composeInterpreterSystem = (sytemConfig: StyleConfig) => {
    const interpreterConfig = composeStyleFunctions(sytemConfig);
    return composeInterpreter(interpreterConfig);
}


describe.skip("styled-component스타일 파싱 테스트", () => {
    //template literal방식이 아닌 함수 방식을 이용하면 결국 render후 kebab-case로 변경한다.
    const space = () => ({
        borderRadius: '10px',
        fontSize: "19px"
    });
    const Box = styled.div(space);
    Box.displayName = "Box";
    it("render후 스타일은 저절로 케밥케이스로 변경된다.", () => {
        const result = renderer.create(<Box />).toJSON();
        expect(result).toHaveStyleRule("border-radius", "10px");
    });
});


describe.skip("style-get함수 테스트", () => {
    const userProvider = {
        age: 30,
        name: "chaospace",
        profile: {
            id: 20,
            url: "http://test.com/profile.jpg"
        }
    }
    it("key에 해당하는 값을 provider에서 찾아서 리턴한다", () => {

        const value = get("name", userProvider);
        expect(value).toEqual(userProvider.name);

    });

    it("중첩된 속성은 key에 .으로 구분해 지정하면 provider에서 찾아서 리턴한다.", () => {
        const value = get("profile.url", userProvider);
        expect(value).toEqual(userProvider.profile.url);
    });

    it("key에 없는 속성은 undefined를 반환", () => {
        const value = get("profile.job", userProvider);
        expect(value).toEqual(undefined);
    })

    it("replaceValue속성을 이용하면 key를 찾지 못한 경우 replaceValue값을 리턴한다.", () => {
        const replaceValue = "ddd";
        const value = get("description", userProvider, replaceValue);
        expect(value).toEqual(replaceValue);
    })

    it("provider는 배열형식도 찾아서 리턴한다.", () => {
        const value = get(1, [29, "chaospace", 230]);
        expect(value).toEqual("chaospace");
    });

    it("provider 배열일 경우 key가 length를 넘어서면 undefiend를 리턴", () => {
        const value = get(7, [29, "chaospace", 230]);
        expect(value).toEqual(undefined);
    });
});


describe.skip("styleFunction 테스트", () => {
    let mxStyleFn: StyleParseFunction;
    const spaces = [1, 2, 4, 8, 12, 16, 20];
    beforeAll(() => {
        mxStyleFn = styleFunction({
            property: ["marginLeft", "marginRight"],
            alias: "space"
        });
    })
    it("props를 이용한 styleFunction생성", () => {
        expect(mxStyleFn).toHaveProperty("alias");
        expect(mxStyleFn).toHaveProperty("defaultAlias");
        expect(mxStyleFn.defaultAlias).toEqual(undefined);
        expect(mxStyleFn.alias).toEqual("space");
    })

    it("mxStyleFn를 호출하면 해당값을 찾아서 반환한다.", () => {
        const style = mxStyleFn(1, spaces);
        expect(style).toEqual({
            marginLeft: 2,
            marginRight: 2
        })
    });

    it("mxStyleFn 호출 시 key값을 찾기 못하면 replaceValue로 key를 리턴한다.", () => {
        const style = mxStyleFn(10, spaces);
        expect(style).toEqual({
            marginLeft: 10,
            marginRight: 10
        })
    });
});

describe("composeStyleFunctions 테스트", () => {
    const propConfig = {
        mx: {
            property: ["marginLeft", "marginRight"],
            alias: "space"
        },
        my: {
            property: ["marginTop", "marginBottom"],
            alias: "space"
        },
        m: {
            property: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
            alias: "space"
        },
        px: {
            property: ["paddingLeft", "paddingRight"],
            alias: "space"
        },
        py: {
            property: ["paddingTop", "paddingBottom"],
            alias: "space"
        },
        width: true,
        height: true
    }
    it.skip("config정보를 넘기면 styleFunction을 만들어 리턴한다.", () => {
        const interpreters = composeStyleFunctions(propConfig);
        // console.log(interpreters, "mx.alias", interpreters.mx.alias)
        expect(interpreters.mx.alias).toEqual("space");
        const keys = Object.keys(interpreters);
        expect(keys).toEqual(["mx", "my", "px", "width", "height"]);
    });

    it("composeInterpreterSystem테스트", () => {
        const interpreter = composeInterpreterSystem(propConfig);
        const style = interpreter({
            theme: appTheme,
            width: 20,
            mx: 2,
            px: 30
        });
        expect(style).toEqual({
            width: 20,
            marginLeft: 4,
            marginRight: 4,
            paddingLeft: 30,
            paddingRight: 30
        })
    });
});



type ProspWithHTMLAttributes<T extends keyof JSX.IntrinsicElements, Props extends {}> = React.PropsWithChildren<JSX.IntrinsicElements[T] & Props>;
type buttonProps = ProspWithHTMLAttributes<"button", { variant?: string }>;
const AA = (props: buttonProps) => {
    const { variant, children, ...rest } = props;
    return (
        <button { ...rest }>{ children }</button>
    )
}