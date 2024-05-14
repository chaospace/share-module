/**
 * 테마 유틸함수
 */

import { ColorCategory, VariantType } from "styled";

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

export { getVariantColor, getVariant }