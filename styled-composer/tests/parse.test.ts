import { createStyleComposer, getOrReplaceValue } from '@/core';

type ListKey = 'a' | 'b' | 'c' | 'd';

type StyleComposerState = Record<ListKey[number], { name?: string; age?: number } | boolean>;

type ArrayType<T extends any[]> = T[number] extends infer R ? R : T[number];

const arr = [
  1,
  'a',
  'd',
  {
    name: 'cha',
    age: 320
  }
];

type e = ArrayType<typeof arr>;

describe('동작테스트', () => {
  const composer = createStyleComposer({
    mx: {
      property: ['marginLeft', 'marginRight'],
      alias: 'space',
      interpreter: (key: any, provider: any, replaceValue: any) => {
        //
        const keys = typeof key === 'string' ? key.split(',') : [key];
        for (let i = 0; i < keys.length; i++) {
          const base = keys[i] * 1;
          const isNegative = !isNaN(base) && base < 0;
          if (provider !== undefined && provider[keys[i]]) {
            provider = provider[keys[i]];
          } else {
            provider = undefined;
          }
        }
      }
    }
  });
  it('composer구성', () => {
    // const composer = createStyleComposer(styleProperties);
    expect(composer).toHaveProperty('processors');
    expect(composer).toHaveProperty('propNames');
  });
  it('composer를 이용한 스타일 구성', () => {
    const style = composer({
      theme: {
        space: [0, 2, 4, 6, 8, 12, 16, 18, 20],
        color: {
          blue: ['aa', 'bb', 'ccc']
        }
      },
      position: 'relative',
      mx: 20,
      width: 100,
      maxWidth: 500,
      p: 3,
      borderColor: 'blue.2'
    });
    console.log('style', style);
  });
});

it.only('넘버 확인 테스트', () => {
  const isNumber = (v: any) => typeof +v === 'number' && !isNaN(+v);
  const get = (v: any, provider: any) => {
    if (!isNumber(v)) {
      return getOrReplaceValue(v, provider, v);
    }
    const abs = Math.abs(v);
    const n = getOrReplaceValue(abs, provider, abs);
    return abs !== +v ? n * -1 : n;
  };
  let a = 'cha';
  console.log(get(-1, [0, 2, 3, 8, 12]));
  console.log(get(-3, [0, 2, 3, 8, 12]));
  console.log(get('1px', [0, 2, 3, 8, 12]));
});
