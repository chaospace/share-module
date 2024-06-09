/**
 * 리스트 컴포넌트
 */
//리스트에 데이터는 어떤 타입이 올지 모른다.
import React from 'react';
import { Container } from '@/components/elements/Container';
import { PropsWithOptionData } from '@/components/types';
import Typography from '@/components/elements/Typography';
import styled from 'styled-components';
import { grey } from '@/colors';
import { labelGetter } from '../util';

const DefaultRenderer = <T extends PropsWithOptionData>({ data }: T) => {
  return <Typography>{labelGetter(data)}</Typography>;
};

const ListWrapper = styled(Container)`
  overscroll-behavior: contain;
  scroll-snap-stop: always;
  * + * {
    border-top: 1px solid ${grey[100]};
  }
`;

interface ListRenderProps {
  options?: any[];
  ItemRenderer?: React.FunctionComponent<PropsWithOptionData>;
}

const ListRenderer = React.forwardRef<HTMLDivElement, ListRenderProps>(
  ({ options = [], ItemRenderer = DefaultRenderer }, fowardedRef) => {
    return (
      <React.Fragment>
        <ListWrapper ref={fowardedRef}>
          {options.map((o, idx) => {
            return <ItemRenderer key={`list-renderer-${idx}`} data={o} />;
          })}
        </ListWrapper>
      </React.Fragment>
    );
  }
);
export default ListRenderer;
