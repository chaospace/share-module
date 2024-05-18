## ts-node에서 module빌드 시 체크사항
 - 모듈 빌드 시 package.json에 <mark>type:"module"</mark>를 설정하면 .ts 확장자를 인식하지 못하는 버그 발생.
 - package.json에 type은 무시하고 <mark>webpack.config</mark>에 output옵션만 설정하면됨.
  
## composer함수 주요내용 정리
 - styled-component에 속성 제어 편의를 위해 구성
 - 커스텀컴포넌트를 상속 시에는 최상위 컴포넌트에만 composer를 적용하면 된다.
 - m, p, mx, my등에 2가지 이상 설정하는 키는 모두 동일값을 적용.
  ```typescript
    const CustomBox = styled("div")(composer);
    //여기에서 composer를 넣으면 스타일 셀렉터가 2번 들어감.
    const ExtendBox = styled(CustomBox)``;
  ```
 - pseudo셀렉터 지원을 어떻게 하는게 좋을지 고민필요.
   - 중첩object를 구성해야 되는데 composer 2개를 두는게 좋을지 판단이 필요.