import { createStyleComposer } from '@/core';
import border from '@/properties/border';

it('composer - border동작 테스트', () => {
  const composer = createStyleComposer(border);

  const style = composer({
    btRadius: 'l'
  });

  console.log('style', style);
});
