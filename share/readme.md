
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
   