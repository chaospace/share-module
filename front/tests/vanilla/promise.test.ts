it('promise동작테스트', () => {
  const getFoo = () => {
    return new Promise((resolve, reject) => {
      resolve(10);
    });
  };

  const result = getFoo()
    .then(r => r)
    .catch(e => e);
  console.log('result', result);
});
