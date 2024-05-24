import React from 'react';
import styled, { ExecutionContext } from 'styled-components';
import { CSSComposerObject, composer } from 'styled-composer';
import { PropsWithHTMLAttributes, polymorphicForwardRef } from '../types';
import { shouldForwardCSSProps } from '@/styles/utils';

const typoVariant = {
  title: {
    fontSize: '2rem',
    lineHeight: 2
  },
  subTitle1: {
    fontSize: '1.6rem',
    lineHeight: 1.6
  },
  subTitle2: {
    fontSize: '1.4rem',
    lineHeight: 1.4
  },
  body: {
    fontSize: '1rem'
  },
  caption: {
    fontSize: '.8rem',
    lineHeight: 0.8
  }
};

type TypoVariant = keyof typeof typoVariant;

interface TypographyProps extends PropsWithHTMLAttributes<'p', CSSComposerObject> {
  variant?: TypoVariant;
}

const variantComopser = (props: ExecutionContext & TypographyProps) => {
  return { ...typoVariant[props.variant!] };
};

// 이 방식에 문제점. as속성이 없으면 기본속성을 추론 못함.
const Typo = styled('p').withConfig({
  shouldForwardProp: shouldForwardCSSProps(['variant'])
})<TypographyProps>`
  ${variantComopser}
  ${composer}
`;

const getPolymorphicTag = (variant: TypoVariant): React.ElementType => {
  switch (variant) {
    case 'title':
      return 'h1';
    case 'subTitle1':
      return 'h2';
    case 'subTitle2':
      return 'h3';
    case 'body':
      return 'p';
    case 'caption':
      return 'span';
  }
};

const Typography = polymorphicForwardRef<'p', TypographyProps>(
  ({ children, variant = 'body', as, ...rest }, forwardedRef) => {
    const tag = as || getPolymorphicTag(variant);
    return (
      <Typo ref={forwardedRef} as={tag} variant={variant} {...rest}>
        {children}
      </Typo>
    );
  }
);

export default Typography;
