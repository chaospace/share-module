import { createCountState, type CountState } from "@/store/countState"
import { StoreApi, createStore } from "zustand"




let store: StoreApi<CountState>
beforeEach(() => {
    store = createStore<CountState>(createCountState);
})

it("초기 count값은 0 이다", () => {
    expect(store.getState().count).toEqual(0);
})

it("setCount를 통해 count값을 증가 시킬 수 있다", () => {
    let reqCount = 1;
    store.getState().setCount(reqCount);
    expect(store.getState().count).toEqual(reqCount);
});