it('배열 slice테스트', () => {
  let arr = [1, 2, 3, 4];
  const b = arr.slice(0, arr.length - 1);
  console.log('b', b);
});

it('sorting테스트', () => {
  let arr = [2, 4, 6, 8];
  // -1이 당기고 1이 뒤로 민다.
  arr.sort((a, b) => (a > b ? -1 : 1));
  console.log('arr', arr);
});

it('grid소팅', () => {
  let arr = [
    {
      x: 1,
      y: 1
    },
    {
      x: 41,
      y: 41
    },
    {
      x: 81,
      y: 1
    },
    {
      x: 1,
      y: 41
    },
    {
      x: 41,
      y: 1
    },
    {
      x: 81,
      y: 41
    }
  ];
  arr.sort((a, b) => {
    if (a.y < b.y) {
      return -1;
    } else if (a.y === b.y) {
      return a.x > b.x ? 1 : -1;
    } else if (a.x === b.x) {
      return a.y > b.y ? 1 : -1;
    }
    return 1;
  });
  console.log(arr);
});
