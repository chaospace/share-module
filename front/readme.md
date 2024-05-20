# front 주요 Todo
- [x] pnpm을 이용한 workspace구성 경험하기
  - [x] 공유 모듈은 루트에 추가하기.
  - [x] 루트에 하위 프로젝트 접근을 위한 scripts를 추가하기.
- [ ] styled-component를 이용한 스타일 노하우 경험하기
  - [ ] variant를 이용한 ui스타일 관리하기
  - [ ] theme를 이용한 스타일 관리하기
- [x] store는 공유모듈을 사용해 module-federation경험하기  
  - [x] 가능한 index파일을 만들어 관련 모듈 참조를 단순하게 하기.(exposes도 편함)
- [x] forwardRef를 polymorphicForwardRef로 변경하기
  - [x] as속성을 위한 편의 타입정의하기(PolymorphicProps)
  - [x] forwardRef함수를 필요에 맞게 리맵핑 타입정의하기(ForwardRefRenderFunction)


## tabindex 내용정리
  
<pre>tabIndex="1"</pre>
  문서 안에서 가장 먼저 초점을 받을 수 있다.  자연스러운 마크업 순서를 거스르기 때문에 주의해서 사용해야 함. 검색엔진 사이트에서 검색창에 사용하면 적합하지만(이 대신 autofocus 속성이 더 적절함) 

<pre>tabIndex="0"</pre>  
키보드 초점을 받을 수 없는 <mark>div, span</mark>과 같은 요소도 초점을 받을 수 있도록 만들어 줍. 초점을 받되 초점을 받는 순서는 자연스러운 마크업 순서를 따름.

<pre>tabIndex="-1"</pre>
키보드 초점을 받을 수 있는 요소도 초점을 받을 수 없도록 만들어 줍니다. 초점을 받을 수 없기 때문에 "-1" 이외의 다른 음의 정수 값은 사실상 의미가 없습니다.

[참고](https://naradesign.github.io/tabindex.html)