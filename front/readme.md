# 컴포넌트 구성 시 주의사항

- 리액트 상태변경이 아니라면 돔은 랜더링이 발생하지 않는다.
- msw를 storybook에 적용 시 설정 public패스 설정
  > staticDirs:['../public']

# front 주요 Todo

- [x] pnpm을 이용한 workspace구성 경험하기
  - [x] 공유 모듈은 루트에 추가하기.
  - [x] 루트에 하위 프로젝트 접근을 위한 scripts를 추가하기.
- [x] styled-component를 이용한 스타일 노하우 경험하기
  - [x] variant를 이용한 ui스타일 관리하기
  - [x] theme를 이용한 스타일 관리하기
- [x] store는 공유모듈을 사용해 module-federation경험하기
  - [x] 가능한 index파일을 만들어 관련 모듈 참조를 단순하게 하기.(exposes도 편함)
- [x] forwardRef를 polymorphicForwardRef로 변경하기
  - [x] as속성을 위한 편의 타입정의하기(PolymorphicProps)
  - [x] forwardRef함수를 필요에 맞게 리맵핑 타입정의하기(ForwardRefRenderFunction)
- [x] autocomplete 컴포넌트 만들기
  - [x] 키보드를 이용한 목록 이동 및 선택
  - [x] 검색어에 따른 목록 필터
  - [x] 올바른 aria 속성적용
- [x] menubar 컴포넌트 만들기
  - [x] 키보드를 이용한 조작 기능제공
  - [x] 적절한 aria속성 적용
  - [x] menuitem tabIndex제어
- [x] BoundingRectListener 컴포넌트 만들기
  - [x] children 이외의 영역에서 마우스 이벤트 발생 시 이벤트 핸들러 실행
  - [x] ref동기화 처리
- [x] InfiniteList 컴포넌트 만들기
  - [x] scroll에 따른 이전, 다음 목록 가져오기
  - [x] 목록 요청 시 에니메이션 적용
- [x] 탭컴포넌트 만들기
  - [x] 키보드를 이용한 포커스 이동적용
  - [x] children을 이용해 aria속성 자동적용
  - [x] 키보드 이동 시 ref를 이용한 화면갱신 최적화 적용

## tabindex 내용정리

<pre>tabIndex="1"</pre>

문서 안에서 가장 먼저 초점을 받을 수 있다. 자연스러운 마크업 순서를 거스르기 때문에 주의해서 사용해야 함. 검색엔진 사이트에서 검색창에 사용하면 적합하지만(이 대신 autofocus 속성이 더 적절함)

<pre>tabIndex="0"</pre>

키보드 초점을 받을 수 없는 <mark>div, span</mark>과 같은 요소도 초점을 받을 수 있도록 만들어 줍. 초점을 받되 초점을 받는 순서는 자연스러운 마크업 순서를 따름.

<pre>tabIndex="-1"</pre>

키보드 초점을 받을 수 있는 요소도 초점을 받을 수 없도록 만들어 줍니다. 초점을 받을 수 없기 때문에 "-1" 이외의 다른 음의 정수 값은 사실상 의미가 없습니다.

[참고](https://naradesign.github.io/tabindex.html)

## scrollIntoView

호출된 요소가 사용자에게 표시되도록 상위 컨테이너를 스크롤합니다.

<pre>
  element.scrollIntoView();
  element.scrollIntoView(alignTop); //boolean parameter
  element.scrollIntoView(options); // object parameter
</pre>

### 매개변수

- alignToTop : boolean
  - <mark>ture</mark>일 경우, 요소 상단을 스크롤 가능한 조상 요소의 보이는 영역 상단에 정렬. ({block:"start", inline:"nearest"}) 와 동일
  - <mark>false</mark>일 경우, 요소 하단을 스크롤 가능한 조상 요소의 보이는 영역 하단에 정렬. ({block:"end", inline:"nearest"})와 동일
- scrollIntoViewOptions : object
  - <mark>behavior</mark> 애니메이션 적용여부를 결정
    - smooth : 부드럽게 적용
    - instant : 즉시 적용
    - auto : css <mark>scroll-behavior</mark>값에 의해 결정
  - <mark>block</mark> 수직 정렬을 정의
    - start, center, end, nearest중에 하나, 기본값은 start
  - <mark>inline</mark> 수평 정렬을 정의
    - start, center, end, nearest중에 하나, 기본값은 nearest
