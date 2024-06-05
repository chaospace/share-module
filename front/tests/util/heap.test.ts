//tree
const heap = {
  _arr: new Array<number>(),
  parentIndex(n: number) {
    //짝수일 경우
    return Math.ceil(n / 2) - 1;
  },
  length(): number {
    return heap._arr.length;
  },
  isEmpty() {
    return heap._arr.length === 0;
  },
  toString() {
    return heap._arr.toString();
  },
  swap(from: number, to: number) {
    const temp = heap._arr[to];
    heap._arr[to] = heap._arr[from];
    heap._arr[from] = temp;
    return heap;
  },
  //추가처리
  add(o: number) {
    // 일단 추가
    heap._arr.push(o);
    // 마지막을 기준으로 부모노드 인덱스 추출.
    let pIndex = heap.parentIndex(heap.length());
    let idx = heap.length() - 1; //현재의 마지막
    while (pIndex >= 0 && heap._arr[pIndex] > heap._arr[idx]) {
      //swap
      heap.swap(idx, pIndex);
      idx = pIndex;
      pIndex = heap.parentIndex(idx); //부모를 한단계씩 이동.
    }
    return heap;
  },
  pop() {
    const len = heap.length();
    if (len === 0) {
      return null;
    } else if (len === 1) {
      return heap._arr.pop();
    }
    // 리턴값으로 현재 가장 작은 값을 참조
    let value = heap._arr[0];
    // 제일 작은 값에 마지막 요소를 설정
    heap._arr[0] = heap._arr.pop()!;
    //루트부터 마지막 까지 정렬처리
    let idx = 0;
    const max = heap.length() - 1;
    while (true) {
      const l = idx * 2 + 1;
      const r = idx * 2 + 2;
      if (l >= max) break; //비교 최소값이 max와 같으면 종료
      let next = idx;
      if (heap._arr[l] < heap._arr[next]) {
        next = l;
      }
      if (heap._arr[r] < heap._arr[next]) {
        next = r;
      }
      if (next === idx) break; // 변경이 없으면 종료
      heap.swap(idx, next);
      idx = next;
    }
    return value;
  },
  peek() {
    if (heap.isEmpty()) {
      return null;
    }
    return heap._arr[0];
  },
  find(v: number) {
    const findItems = [];
    heap._arr.forEach(o => {
      if (v === o) {
        findItems.push(v);
      }
    });
    return v;
  }
};
/**
 * minheap정의
 * 부모 노드가 자식노드보다 작은 자료구조.
 *
 */

// const floorPIndex = (n: number) => Math.floor((n - 1) / 2);
// const ceilPIndex = (n: number) => Math.ceil(n / 2) - 1;
it('heap add 테스트', async () => {
  // parentIndex 접근방법테스트
  //console.log(Math.ceil(0/2))
  heap.add(10);
  heap.add(3);
  heap.add(8);
  // heap.add(2);
  //heap은 배열이 아니라는 것이 포인트..
  expect(heap._arr).toEqual([3, 8, 10]);
  heap.add(4);
  expect(heap._arr).toEqual([3, 4, 10, 8]);
  // console.log(floorPIndex(0), floorPIndex(1), floorPIndex(2), floorPIndex(3), floorPIndex(4));
  // console.log(ceilPIndex(0), ceilPIndex(1), ceilPIndex(2), ceilPIndex(3), ceilPIndex(4));
});

it('heap pop 테스트', () => {
  heap.add(20);
  heap.add(1);
  heap.add(4);
  heap.add(10);
  heap.add(8);
  heap.add(1);
  heap.add(5);
  heap.add(4);
  // tree형식이라 가장 작은 값이 0으로 될뿐 sorting은 안되는 관계로
  // remove가 필요하다면 루프를 돌며 동일값을 계속 찾아가야 한다.
  const minValue = heap.pop();
  console.log('minValue', minValue);
  console.log('toString', heap.toString());
});
