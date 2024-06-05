# federation 학습 프로젝트

구성 당시 vite 모듈 문제로 webpack으로 진행

## 구성 주요내용

- pnpm이용
- 폴더구성
  - front : ui 프로젝트
  - share-store : 공통 데이터 관리를 위한 store
  - styled-composer : styled-component 스타일 파서
- webpack5, ts-node, eslint, jest, husky, storybook

## 느낀점

- storybook은 루트에서 하나로 관리가능하지만 프로젝트별로 사용하는게 설정도 명확하고 좋음.
- 공통 모듈을 루트에 설치하면 하위 프로젝트에서 참조 가능하다.(단 jest, eslint, babel 설정파일에 path설정은 필요)
- 공유 모듈 변경 시 빌드 후 확인가능 하기 때문에 변경이 많은 프로젝트 초반 보다는 어느정도 형태가 나온 후 적용하는게 개발편의성이 좋은것 같다.
- monorepo를 이용한 로컬모듈과 federation이 필요한 모듈을 구분해 적용할 필요가 있을거 같다.
