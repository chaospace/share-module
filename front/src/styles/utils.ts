/**
 * 테마 유틸함수
 */
import { PropsWithCSSAttributes } from "@/components/types";
import { ColorCategory, VariantType } from "styled";
import { composer } from "styled-composer";

const getVariantColor = (key: string, subKey: ColorCategory, values: VariantType) => {
    return <T extends { [key: string]: any }>(props: T) => {
        const variantValue = values[(props[key]) as keyof VariantType];
        if (variantValue) {
            return variantValue[subKey] ?? undefined
        } else {
            return undefined;
        }
    }
}

const getVariant = (key: string, values: VariantType) => {
    return <T extends { [key: string]: any }>(props: T) => {
        const variantValue = values[(props[key]) as keyof VariantType];
        return variantValue ?? undefined;
    }
}

//css속성으로 넘기면 이거를 사용해 composer를 만들어 리턴한다.
const cssComposer = <T extends { theme: any }>({ css, theme }: PropsWithCSSAttributes<T>) => {

    return composer({ ...css, theme });
}

const shouldForwardCSSProps = (prop: string) => !['css'].includes(prop);


/**
 * 속성별 스타일 처리를 함수가 필요하다. 
 * 처리를 위해서는 속성키와 현재 설정 값 혹은 theme에 설정된 값에 접근할 수 있어야 한다.
 * 일단 키는 config를 구성하며 넘겨준다.
 * props는 styled-component안에서 호출된다.
 * 특정 키만 처리할지 모든 속성을 처리할지는 선택해야 된다.
 * 그룹및 단일속성 모두를 처리 할 수 있어야 한다.
 * 확실한 것 하나는 props를 통해 해당 컴포넌트에 theme, componentProps가 전달된다는 점.
 * mx:{
 *  properies : ["marginLeft", "marginRight"],
 *  themeKey  : "sizes",
 * }
 * position:{
 *     scale:
 *     default
 * }
 * React.DetailedHTMLProps<HTMLAttributes<T>>
 * themeui에 파서 구성요약
 * config에 파싱할 스타일속성을 객체에 나열.
 * config정보를 토대로 해당속성을 파싱하는 stylePropsParse함수 구성
 * 생성된 함수는 config[key] = 파싱함수 로 저장.
 * 
 * 스타일 해석을 위해 필요한 속성을 나열해 보자.
 * mx : 대상 키 정보  <- 요약 키
 * properties: []  <- 대칭 키 정보
 * property:       <- 단일 키 정보
 * 
 * 결국 curring이다. 파싱 전에 파싱에 필요한 클로저를 이용해 미리 기억시킨다.
 */

// style props 예외처리 함수
//const curriedShouldForwardProp = (forwardProps: string[]) => (prop: string) => !forwardProps.includes(prop);

export { getVariantColor, getVariant, cssComposer, shouldForwardCSSProps }