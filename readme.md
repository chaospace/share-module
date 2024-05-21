# federation적용 주의사항
 - 영역별로 코드 분리가 명확하게 될때 적용하는게 좋음.
 - 전역으로 사용되는 코드를 분리하는 건 크게 도움이 안됨.
 - 초기 구축단계에서는 하나의 플젝에서 폴더링을 잘 구분하는게 더 좋을 듯.

# workspace 모듈 공유
  workspace공통 모듈은 루트에 설치하면 관련 모듈에서 사용이 가능하다.  
  react를 root에 공통 모듈로 추가하면 하위 프로젝트에서는 설치없이 모듈 import가 가능.  
  명확한 표현이 좋다면 peerDependency로 해두면 좋을듯.

## workspace 공유 모듈 설치 주요내용.
 - workspace에 설치한 모듈은 내부 프로젝트서 임포트 가능.
 - workspace 루트에 babel설정을 두고 사용할 경 포맷은<mark>babel.config.json</mark>을 사용 후 tsconfig처럼 extends후 사용가능.
 - babel-jest를 공유할 경우는 <mark>jest.setup</mark> 파일에 <mark>transform</mark>에 path를 지정해 준다.

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
  
  ## eslint v9 내용정리
   - 설정 파일 방식이 flat방식으로 변경되어 기존 plugins, extends 키워드를 더이상 사용하지 않음.
   - 커맨드라인에서 --ext 옵션도 더이상 사용하지 않음. 
  <pre>eslint --c 설정파일 위치(eslint.config.(m?js))</pre>
   - float한 형식으로 개별 설정을 배열로 넘기는 방식.
   - 장점 - plugin마다 설정을 다르게 할 수 있어 선택적인 옵션을 적용할 수 있다.
   - 단점 - 아직 초기단계라 이전 설정처럼 적용하려면 삽질을 꽤 해야된다. 
  ```javascript
    // eslint.config.js
    
    // 각 설정은 크게 {files, plugins, rules, languageOptions} 으로 구성된다.
    const tseslint = require("typescript-eslint"); // @typescript-eslint/eslint-plugin, @typescript-eslint/parser을 포함
    const reactRecommended = require("eslint-plugin-react"); 
    const {fixupPluginRules} = require("@eslint/compat"); // 이전 사용하던 모듈 flat형식 변경에 사용되는 플러그인
    const defaultConfig = tseslint.config({
      files:["**/src/*.{ts,tsx}"] // src폴더에 모든 ts,tsx파일을 대상으로 함.
      plugins:{                   // 기존 배열방식에서 객체방식으로 변경
        "@typescript-eslint":tseslint.plugin // namespace alias설정  
      },
      languageOptions:{
        parser:tseslint.parser,
        parserOptions:{
          project:[]  // 프로젝트 tsconfig파일 위치 workspace형식이라면 여러개 지정.
          tsConfigRootDir: __dirname 
        }
      },
      rules:{       // rule정보는 기존과 동일하게 설정
        "@typescript-eslint/quotes":[],
        "@typescript-eslint/no-unused-vars":[]
      }
    });

    const reactEsList = {
      plugins:{
        react:fixupPluginRules(reactRecommended)
      },
      languageOptoins:{
        ...reactRecommended.configs.recommeded.languageOptions 
      },
      rules:{
        ...reactRecommended.configs.recommeded.rules 
      }
    }

    // 배열로 전달하면 내부에서 merge를 하는 듯 
    // files설정을 앞에서 하면 뒤에는 필요없음.
    const config = [
      defaultConfig[0], // typescript-eslint   설정
      reactEsLint,      // eslint-plugin-react 설정
      {}  //설정
    ];
    module.exports = config;
  ```
   - <mark>eslint/compat</mark>을 쓰는 이유 : 일부 plugin이 eslint에서 요구하는 스펙을 제공하지 않아 발생하는 에러를 해결해주기 때문.