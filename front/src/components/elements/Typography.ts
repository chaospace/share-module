import styled from 'styled-components';
import { CSSComposerObject, composer } from 'styled-composer';
import { shouldForwardCSSProps } from '@/styles/utils';
import { KnownTarget } from 'styled-components/dist/types';

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

interface TypographyProps extends CSSComposerObject {
  variant?: TypoVariant;
}

const getPolymorphicTag = (variant: TypoVariant) => {
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
// 이 방식에 문제점. as속성이 없으면 기본속성을 추론 못함.
const Typography = styled('p')
  .attrs<TypographyProps & { as?: KnownTarget }>(({ variant, as, ...rest }) => ({
    ...typoVariant[variant!],
    ...rest,
    as: as ?? getPolymorphicTag(variant!)
  }))
  .withConfig({
    shouldForwardProp: shouldForwardCSSProps(['variant'])
  })(composer);

const initVariantProps = (variant: TypoVariant) => typoVariant[variant];

const P = styled.p.withConfig({
  shouldForwardProp: shouldForwardCSSProps(['variant'])
})<TypographyProps>({ ...typoVariant.body, wordBreak: 'break-word' }, composer);

const Span = styled(P).attrs({ as: 'span' })``;
const Caption = styled('span')(typoVariant.caption, composer);
const H = styled('h1').attrs((_: any) => ({ as: _.as ?? 'h1' }))<TypographyProps>(
  _ => initVariantProps(_.variant ?? 'title'),
  composer
);

export { Caption, Span, P, H };
export type { TypographyProps };
export default Typography;
