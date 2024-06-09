import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { CSSComposerObject, composer, shouldForwardAllProps } from 'styled-composer';
import { PropsWithHTMLAttributes } from '../types';
import { valueGetter, labelGetter, composeOptionItem } from '@/components/util';

interface SelectBaseProps extends PropsWithHTMLAttributes<'select', CSSComposerObject> {}
interface SelectProps extends SelectBaseProps {
  options: any[];
  getLabel?(o: any): string;
  getValue?(o: any): string;
  onChange?(o: any): void;
}

const Base = styled('select').withConfig({
  shouldForwardProp: shouldForwardAllProps
})<SelectBaseProps>(composer);

const Select = ({
  options = [],
  getLabel = labelGetter,
  getValue = valueGetter,
  onChange,
  ...rest
}: SelectProps) => {
  const renderRef = React.useRef(0);

  const onChangeHandler = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const select = options[target.selectedIndex];
    onChange && onChange(select);
  };

  return (
    <>
      {renderRef.current++}
      <Base {...rest} onChange={onChangeHandler}>
        {options?.map((o, idx) => {
          const vo = composeOptionItem(o, getLabel, getValue);
          return (
            <option value={vo.value} key={idx}>
              {vo.label}
            </option>
          );
        })}
      </Base>
    </>
  );
};

export default Select;
