/**
 * x를 맞추기
 * 1. n1 = 3*x 의 값이 홀수, 혹은 짝수인지 말한다.
 * 2. n1이 짝수일 경우, n2 = n1/2, 홀수라면 n2 = (n1+1)/2를 계산.
 * 3. n3 = 3*n2
 * 4. n4 = n3/9를 계산한 값에 몫
 * 5. n1이 짝수일 경우, x = 2*n4, 홀수일 경우, x=2*n4+1
 *
 *
 * ex) x=37, n1=37*3=111,  n2 = (111+1)/2 = 56, n3 = 56*3=168, n4 = 168/9 = 18;
 * => 2*18+1 = 37;
 */

function solution(x: number) {
  const n1 = x * 3;
  const isEven = n1 % 2 === 0;
  const n2 = isEven ? n1 / 2 : (n1 + 1) / 2;
  const n3 = 3 * n2;
  const n4 = ~~(n3 / 9);
  //const answer = isEven ? 2 * n4 : 2 * n4 + 1;
  return `${isEven ? 'event' : 'odd'} ${n4}`;
}

[37, 38, 0].forEach(o => {
  console.log(solution(o));
});
