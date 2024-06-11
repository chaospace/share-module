import React, { PropsWithChildren, useState } from 'react';
import { Container } from '@/components/elements/Container';
import { ListRenderProps } from '@/components/list/ListRenderer';
import styled from 'styled-components';
import { labelGetter } from '@/components/util';
import { HBox } from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import { parseVariant, parseVariantColor, shouldForwardVariantProps } from '@/styles/utils';
import { StyleVariantProps } from 'styled';

const borderVariant = parseVariantColor(c => c.main);

const borderAccentVariant = parseVariant(({ themeVariant, accentVariant }) => {
  return themeVariant[accentVariant!].main;
});

const TabButton = styled('button')
  .withConfig({
    shouldForwardProp: shouldForwardVariantProps()
  })
  .attrs<StyleVariantProps>(_ => ({
    variant: _.variant ?? 'default',
    accentVariant: _.accentVariant ?? 'primary'
  }))`
  border: 0;
  border-radius: 4px 4px 0 0;
  border: 1px solid ${borderVariant};
  border-top-width: 4px;
  border-top-color: ${borderVariant};
  & + * {
    border-left:none;
  }
  ${Typography}{
    border:1px solid transparent;
    padding:0 2px;
    border-radius:2px;
  }
  &:hover,
  &:focus-visible,
  &:focus {
    outline:none;
    border-top-color: ${borderAccentVariant};
    ${Typography}{
      border-color:${borderAccentVariant};
    }
  }
`;

interface TabProps extends ListRenderProps {
  selectedIndex?: number;
}

const PREFIX = {
  button: 'tab-button-',
  panel: 'tabpanel-'
} as const;

function SimpleTab({
  options = [],
  // @ts-ignore
  ItemRenderer: _ = undefined,
  selectedIndex = 0,
  children
}: PropsWithChildren<TabProps>) {
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const tabButtons = options.map((o, idx) => {
    const tabID = `${PREFIX.button}${idx}`;
    const label = labelGetter(o);
    const selectTab = activeIndex === idx;
    return (
      <TabButton
        key={idx}
        id={tabID}
        role='tab'
        aria-controls={`${PREFIX.panel}${idx}`}
        aria-selected={selectTab}
        tabIndex={selectTab ? undefined : -1}
        onClick={() => setActiveIndex(idx)}>
        <Typography variant='body'>{label}</Typography>
      </TabButton>
    );
  });

  //children을 이용해 새롭게 구성 후 추가한다.
  const renderedPanel = React.Children.toArray(children).map((o, idx) => {
    return React.cloneElement(
      o as React.ReactElement<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      >,
      {
        id: `${PREFIX.panel}${idx}`,
        ['aria-labelledby']: `${PREFIX.button}${idx}`,
        role: 'tabpanel',
        hidden: idx !== activeIndex,
        tabIndex: idx === activeIndex ? 0 : undefined
      }
    );
  });

  return (
    <Container>
      <HBox gap={0} role='tablist'>
        {tabButtons}
      </HBox>
      {renderedPanel}
    </Container>
  );
}

export default SimpleTab;
