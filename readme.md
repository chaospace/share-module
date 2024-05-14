# workspace 모듈 공유
  workspace공통 모듈은 루트에 설치하면 관련 모듈에서 사용이 가능하다.  
  react를 root에 공통 모듈로 추가하면 하위 프로젝트에서는 설치없이 모듈 import가 가능.  
  명확한 표현이 좋다면 peerDependency로 해두면 좋을듯.

## 주요 모듈 설치 정리 
- 테스트 환경구축 
  ```javascript
    // jest모듈
    pnpm add -D jest @types/jest
    // react 테스팅 라이브러리
    pnpm add -D @testing-library/react @testing-library/dom
    // mocking-service-worker
    pnpm add -D msw
  ```

 - jest.config 설정
    ```javascript
     {
      verbose: true, //단일 테스트 파일 개별 에러보고 여부
      rootDir: ".",
      roots: ["<rootDir>/src/", "<rootDir>/tests/"],
      // testEnvironment: "node",
      transformIgnorePatterns: ["/node_modules/", "/dist/", "\\.pnp\\.[^\\/]+$"],
      coveragePathIgnorePatterns: ["/node_modules/"],
      setupFilesAfterEnv: ["./tests/setup.ts"],
      testMatch: [
        "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
        "<rootDir>/tests/**/*.(test|spec).(ts|tsx)",
      ],
      transform: {
        "^.+\\.tsx?$": "babel-jest",
      },
      moduleNameMapper: {
        "^@/(.+)$": "<rootDir>/src/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/tests/__mocks__/fileMock.ts",
        "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
      },
    }
    ```
- webpack환경 모듈 구성
    ```javascript
    // webpack 관련 모듈 구성
    pnpm add -D webpack webpack-dev-server webpack-cli  
    // babel 관련 모듈 
    pnpm add -D @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react
    // typescript 
    pnpm add -D typescript 
    // typescript node
    pnpm add -D ts-node @types/node
    // webpack loader
    pnpm add -D css-loader style-loader babel-loader
    // webpack plugin
    pnpm add -D webpack-merge html-webpack-plugin
    ```
- babel 설정
  ```json
    "presets":[
      ["@babel/preset-env", {
        "targets":{
          "browsers":"> 0.2% and not dead", //브라우저 타깃
          "node":"current" //노드 타깃 테스트 시 사용
        }
      }],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  ```

- federation 구성
  - @module-federation/enhanced 추가
  - 공유 프로젝트에 모듈 구성
  ```javascript
    //공유 webpack 설정
    new ModuleFederationPlugin({
      name:"share",
      filename:"shareEntry.js",
      exposes:{ //내보낼 모듈 맵핑
        "./Store":"./src/store"
      },
      shared:{ // 공유 모듈 설정
        react:{singleton:true},
        "react-dom":{singleton:true},
      }
    })

    // 호스트 프로젝트 설정
    new ModuleFederationPlugin({
      name:"Host",
      remotes:{ 
        //사용할 공유 프로젝트 적용 (name@url/filename.js )
        share:"share@{location}/shareEntry.js" 
      },
      shared:{
        react:{singleton:true},
        "react-dom":{singleton:true},
      }
    })
  ```
  - 호스트 프로젝트는 tsconfig.json에 생성되는 types폴더 경로 추가
  ```javascript
    // types폴더는 module-federation/enhancer에서 자동생성
    {
      "paths":{
        "*":["./@mf-types/*"],
      }
    }
  ```
  - 호스트 프로젝트는 import("경로")를 통해 비동기로 모듈 참조
  - 동기식으로 가져오려면 eager옵션 적용
  