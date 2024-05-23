/**
 * 여러 checkbox를 관리하고
 * 선택된 값을 전달.
 */

import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import styled from 'styled-components';

type CheckBoxOptionType = {
  /** 라벨정보 */
  label: string;
  /** value정보 */
  value: string;
  /** 체크여부 */
  selected?: boolean;
};

interface CheckBoxGroupProps {
  /**
   * 그룹생성 provider로 사용되는 배열정보
   */
  options: CheckBoxOptionType[];
  /** 체크박스 값 변경 시 호출되는 핸들러 함수 */
  onChange: (selected: CheckBoxOptionType[]) => void;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 0.5rem;
`;

const emptyArr: any = [];
const emptyHandler = () => {};
const initProvider = (opts: CheckBoxOptionType[]) =>
  opts.map(o => ({ ...o, selected: o.selected || false }));

/**
 * 체크박스 그룹 컴포넌트
 */
function CheckBoxGroup({ options = emptyArr, onChange = emptyHandler }: CheckBoxGroupProps) {
  const [provider, setProvider] = useState<CheckBoxOptionType[]>(initProvider(options));

  const onChangeHandler = (idx: number) => {
    const next = provider.map((o, i) => {
      return i === idx ? { ...o, selected: !o.selected } : o;
    });
    setProvider(next);
    onChange(next.filter(o => o.selected));
  };

  //입력옵션과 내부옵션은 달라야 한다.
  useEffect(() => {
    setProvider(initProvider(options));
  }, [options]);

  return (
    <Container>
      {provider
        ? provider.map((o: CheckBoxOptionType, idx: number) => {
            return (
              <CheckBox
                key={o.label}
                value={o.value}
                checked={o.selected}
                onChange={() => {
                  onChangeHandler(idx);
                }}>
                {o.label}
              </CheckBox>
            );
          })
        : null}
    </Container>
  );
}

export default CheckBoxGroup;
