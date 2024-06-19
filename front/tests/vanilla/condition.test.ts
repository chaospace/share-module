//조건테스트

const getTrigger = (disableHover = false, disableFocus = false) => {
  //우선순위 hover, focus, click순으로 발생한다.

  return disableHover ? (disableFocus ? 'click' : 'focus') : 'hover';
};

it('disableHover와 disableFocus모두 false일 경우 hover이벤트를 우선한다', () => {
  //우선순위 hover, focus, click순으로 발생한다.
  const trigger = getTrigger();
  expect(trigger).toEqual('hover');
});

it('disableHover = true disableFocus모두 false일 경우 focus를 우선한다', () => {
  //우선순위 hover, focus, click순으로 발생한다.
  const trigger = getTrigger(true);
  expect(trigger).toEqual('focus');
});

it('disableHover = true disableFocus = true 일 경우 click을 우선한다', () => {
  //우선순위 hover, focus, click순으로 발생한다.
  const trigger = getTrigger(true, true);
  expect(trigger).toEqual('click');
});
