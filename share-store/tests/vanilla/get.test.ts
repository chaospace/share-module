const getList = async (page: number) => {
  const response = await fetch(`http://api.example.com/infinite/${page}`);
  const answer = await response.json();
  return answer;
};

it('infinite 요청은 page값을 기준으로 id정보를 10개씩 리턴한다.', async () => {
  const answer = await getList(1);
  expect(answer[0]).toEqual(1);
  expect(answer[answer.length - 1]).toEqual(10);
});

it('infinite 요청 page=2는 11부터 시작해 20까지 리턴한다.', async () => {
  const answer = await getList(2);
  expect(answer[0]).toEqual(11);
  expect(answer[answer.length - 1]).toEqual(20);
});
