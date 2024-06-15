import React, { useCallback, useRef, useState } from 'react';
import AutoComplete from '@/components/autocomplete';
import { HBox, VBox } from '@/components/elements/Box';
import Button from '@/components/elements/Button';
import CheckBox from '@/components/elements/CheckBox';
import Input from '@/components/elements/Input';
import SearchInput from '@/components/elements/SearchInput';
import Select from '@/components/elements/Select';
import Typography from '@/components/elements/Typography';
import { countHooks } from 'federation_provider/Store';
import InputRange from '@/components/range';
import { HLine, VLine } from '@/components/elements/Line';
import { useQuery } from '@tanstack/react-query';
import { getMovieList } from '@/service';

const options = Array.from({ length: 20 }).map((_, i) => `옵션-${i}`);
const options2 = [
  {
    label: '옵션2'
  },
  {
    label: '옵션1'
  },
  {
    label: '옵션3'
  }
];

function UISample() {
  const count = countHooks.useCount();
  const setCount = countHooks.useSetCount();

  const pRef = useRef<HTMLSpanElement>(null);

  const { data: movies } = useQuery({
    queryKey: ['getMovieList'],
    queryFn: getMovieList,
    initialData: [],
    select: data => {
      return data;
    }
  });

  const rederCount = useRef(0);
  const [num, setNum] = useState(0);
  const [str, setStr] = useState('');

  const [boxPadding, setBoxPadding] = useState(5);
  const onChangeBoxPadding = () => {
    setBoxPadding(~~(Math.random() * 10));
  };

  const onChangeSelect = (o: string) => {
    console.log('change-select', o);
  };
  const onChangeSelect2 = (o: (typeof options2)[0]) => {
    console.log('select2-o', o.label);
  };

  const [rangeValue, setRangeValue] = useState(0);
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    setRangeValue(+(e.target as HTMLInputElement).value);
  };

  const onClickMultipleSet = useCallback(() => {
    setTimeout(() => {
      setNum(p => p + 1);
      setNum(p => p + 1);
      setNum(p => p + 1);
      setNum(p => p + 1);
      setStr(p => p + 'a');
      setStr(p => p + 'a');
      setStr(p => p + 'a');
    }, 0);
  }, []);

  return (
    <VBox as='main' p={boxPadding}>
      <HLine borderWidth='2px' />
      <label htmlFor=''>
        랜더링 카운트
        <span>
          {rederCount.current++} {num} {str}
        </span>
      </label>

      <Button onClick={() => onClickMultipleSet()}>여러setState호출</Button>
      <InputRange value={rangeValue} onInput={onInput} />
      <Typography as='span' ref={pRef as any}>
        {count}
      </Typography>
      <HBox>
        <Button variant='success' onClick={() => setCount(prev => prev + 1)}>
          카운트 증가
        </Button>
        <Button onClick={() => setCount(prev => prev - 1)}>카운트 감소</Button>
        <Button variant='primary' onClick={() => setCount(0)}>
          카운트 리셋
        </Button>
      </HBox>
      <Typography>
        Next, we wrap our definition using the utility types that React provides to complete the
        props for a specified element. Typically, we statically write the tag, for example
        React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E
        type.
      </Typography>
      <VBox>
        <Typography variant='title'>검색 가능한 셀렉트</Typography>
        <AutoComplete options={movies} getLabel={o => o.title} getValue={o => o.title} />
      </VBox>
      <HBox>
        <Button variant='success' onClick={onChangeBoxPadding}>
          success
        </Button>
        <Button>default</Button>
        <Button variant='warning'>warning</Button>
        <Button variant='info'>info</Button>
        <Button variant='danger'>danger</Button>
        <Button variant='primary'>primary</Button>
      </HBox>
      <Button>
        이건 어떻게 보이나요
        <br />
        줄바꿈 텍스트
      </Button>
      <VBox>
        <Typography variant='title'>Title</Typography>
        <Typography>
          As a CSS utility component, the Typography component supports all system properties. You
          can use them as prop directly on the component. For example, here's how you'd add a
          margin-top
        </Typography>
        <Typography>
          아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™ 『버니
          가든』의 정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다
        </Typography>
      </VBox>
      <Typography variant='title'>Form element</Typography>
      <VBox>
        <Input type='text' />
        <Input type='text' className='invalid' />

        <Input type='number' />
        <Select defaultValue='참외' options={options} onChange={onChangeSelect} />
        <Select options={options} onChange={onChangeSelect2} />
      </VBox>
      <SearchInput />

      <CheckBox variant='primary'>체크박스 스타일</CheckBox>
      <VLine borderWidth='10px' borderColor='black' size='300px' />
    </VBox>
  );
}

export default UISample;
