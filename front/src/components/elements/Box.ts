import type { PropsWithHTMLAttributes } from '@/components/types';
import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';



// default style
interface BoxProps extends CSSComposerObject { }

const Box = styled('div').withConfig({
    shouldForwardProp: shouldForwardAllProps
})<PropsWithHTMLAttributes<'div', BoxProps>>(composer);

Box.defaultProps = {
    position: 'relative',
    display: 'flex',
    gap: '0.5rem'
}

const VBox = styled(Box)``;
VBox.defaultProps = {
    flexDirection: 'column'
}

const HBox = styled(Box)``;

HBox.defaultProps = {
    flexDirection: 'row'
}

export {
    Box,
    VBox,
    HBox
}