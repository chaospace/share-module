/**
 * 테마 유틸함수
 */
import { PropsWithCSSAttributes } from "@/components/types";
import { ColorCategory, VariantType } from "styled";
import { composer, shouldForwardAllProps } from "styled-composer";

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

const shouldForwardCSSProps = (props: string[] = []) => (prop: string) => !props.includes(prop) && shouldForwardAllProps(prop);


export { getVariantColor, getVariant, cssComposer, shouldForwardCSSProps }