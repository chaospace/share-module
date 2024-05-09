
## jest환경구성  
- 필요 모듈 설치
```javascript
    //jest
    pnpm add -D jest @types/jest
    //@testing-library/react, @testing-library/dom
    pnpm add -D @testing-library/react @testing-library/dom
    //msw mocking-service-worker 설치 
    pnpm add -D msw
```
## TS zustand 내용정리
 - 상태별 코드 분리를 좋아해 상태를 정의한 타입에서 selector와 setter를 생성하는 타입을 만들었다.
    ```typescript
      //  상태 구성타입
      type State<T> = T & Setter<T>

      //setter구성 타입
      type Setter<State> = {
          [Property in keyof State as `set${Capitalize<Lowercase<Property & string>>}`]: (next: State[Property] | StateUpdater<State[Property]>) => void;
      }

      // selector구성 타입
      type PropsSelector<State> = {
          [Property in keyof State as `${Property & string}Selector`]: (state: State) => State[Property];
      }

      // 상태 속성정의
      interface UserProps {
          name:string;
          hobby:string;
          id:number;
      }
      // 상태정의
      type UserState = State<UserProps>;
      // 상태selector 정의
      type UserSelector = PropsSelector<UserState>
    ```

## TS zustand 사용 시 고려할 사항
 - 상태를 redux와 같이 그룹화 해서 코드를 작성하는게 쉽지 않다.(전역 스토어 사용 시)
   - state, action, reducer
 - setter에서 이전상태 <mark>prevState</mark> 사용이 쉽지 않다.
    ```typescript
        // 모든 상태에 setter에서 분기처리를 하고 싶지 않음...
        // 그렇다면 ? 항상 get을 같이 내려줘서 set하는 곳에서 비교 처리한다?
        const someState = (set, get) => ({
          value:1,
          setValue:(next) => set({value: typeof next === "function" ? next(get().value) : next}) 
        })
    ```
   