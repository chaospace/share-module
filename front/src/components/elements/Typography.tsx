import React from 'react';
import styled, { ExecutionContext } from 'styled-components';
import { CSSComposerObject, composer as defaultComposr, } from 'styled-composer';
import { PropsWithHTMLAttributes, polymorphicForwardRef } from '../types';
import { shouldForwardCSSProps } from '@/styles/utils';

const typoVariant = {
    title: {
        fontSize: '2rem',
        lineHeight: 2
    },
    subTitle: {
        fontSize: '1.4rem',
        lineHeight: 1.4,
    },
    caption: {
        fontSize: '.8rem',
        lineHeight: .8,
    },
    body: {
        fontSize: '1rem'
    }
}

type TypoVariant = keyof typeof typoVariant;

interface TypographyProps extends PropsWithHTMLAttributes<'p', CSSComposerObject> {
    variant?: TypoVariant;
};


const comopser = (props: ExecutionContext & TypographyProps) => {
    const variantStyle = typoVariant[props.variant!];
    return {
        ...variantStyle
    };
}

// 이 방식에 문제점. as속성이 없으면 기본속성을 추론 못함.
const Typo = styled('p').withConfig({
    shouldForwardProp: shouldForwardCSSProps(['variant'])
}) <TypographyProps>`
    ${defaultComposr}
    ${comopser}
`;

const getTypoTag = (variant: TypoVariant): React.ElementType => {
    switch (variant) {
        case "title":
            return "h1"
        case "subTitle":
            return "h2"
        case "body":
            return "p"
        default:
            return "caption"
    }
}

const Typography = polymorphicForwardRef<'p', TypographyProps>(({ children, variant = 'body', ...rest }, forwardedRef) => {
    const tag = getTypoTag(variant);
    return (
        <Typo ref={ forwardedRef } as={ tag }
            variant={ variant } { ...rest }>
            { children }
        </Typo>
    );
});



export default Typography;