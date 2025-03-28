it.skip('배열 slice테스트', () => {
  let arr = [1, 2, 3, 4];
  const b = arr.slice(0, arr.length - 1);
  console.log('b', b);
});

it.skip('sorting테스트', () => {
  let arr = [2, 4, 6, 8];
  // -1이 당기고 1이 뒤로 민다.
  arr.sort((a, b) => (a > b ? -1 : 1));
  console.log('arr', arr);
});

it.skip('grid소팅', () => {
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

it('quick소팅', () => {
  /**
   * 퀵 정렬 개념정리
   *  - 배열에 한 곳을 (좌측 = 0 or 우측 = length-1 )기준(pivot)으로 설정
   *  - 주어진 구간(left, right)을 순회하며 pivot보다 작은 값은 좌측, 큰 값은 우측으로 정렬한다.
   *  - 이때, 정렬을 위해 left , right에 값을 서로 swap처리.
   *  - 기준이 된 pivot과 high에 인덱스를 swap한다.
   *  - left<right가 클때까지 위에 내용을 반복.
   */
  const partition = (left: number, right: number, source: number[]) => {
    let low = left;
    let high = right + 1;
    let pivot = source[left]; //좌측값을 기준값으로 설정.

    do {
      //low와 high가 교차할 때 까지 반복
      do {
        low++;
      } while (low <= right && source[low] < pivot);
      //low가 right보다 작거나 같고 기준값보다 작으면 스킵

      do {
        high--;
      } while (high >= left && source[high] > pivot);
      //high가 left보다 크거나 같고 기준값보다 크면 스킵

      //좌측에 pivot보다 큰 값과 우측에 pivot보다 작은 값을 swap
      if (low < high) {
        [source[low], source[high]] = [source[high], source[low]];
      }
    } while (low < high);

    console.log(left, right, 'source', source);
    //whie을 나왔으면 pivot으로 사용한 left 와 high를 교환
    [source[left], source[high]] = [source[high], source[left]];

    return high;
  };

  //포인터를 이용한 구간 정렬
  /**
   * 시작 인덱스 left를 q, i로 참조하고
   * 항상 right에 값과 현재 index i값과 비교하며 i값이 축보다 크면 q+=1를 증가시켜
   * @param left
   * @param right
   * @param source
   * @returns
   */
  const partitionLoop = (left: number, right: number, source: number[]) => {
    let q = left;
    for (let i = left; i < right; i++) {
      if (source[i] < source[right]) {
        //기준값이 현재 값보다 크면 q를 증가시켜 축보다 큰 값이 시작하는 위치를 구분.
        [source[i], source[q]] = [source[q], source[i]];
        q++; //pivot보다 큰값이 있는 위치 포인터 증가.
      }
    }

    [source[q], source[right]] = [source[right], source[q]];

    return q;
  };

  const quickSort = (left: number, right: number, source: number[]) => {
    if (left < right) {
      // 리스트를 피벗을 기준으로 비균등 분할.
      const q = partition(left, right, source);
      // 피벗을 제외한 구간 정렬 반복요청
      quickSort(left, q - 1, source);
      quickSort(q + 1, right, source);
    }
  };

  const arr = [1, 20, 3, 16, 9, 10, 2];
  quickSort(0, arr.length - 1, arr);
  console.log('arr', arr);
});
