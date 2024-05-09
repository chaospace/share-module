import { useStore } from "zustand";
import type { PropsSelector, State, StateCreatorEnhancer, StateHookCreator } from "./types";
import { curriedSetter } from "./common";


//타입 단언
// const isFunc = (value: unknown): value is Function => typeof value === "function";


interface CountProps {
    count: number;
}

const ACTION = {
    SET_COUNT: "SET_COUNT"
}

type CountState = State<CountProps>;
type CountSelector = PropsSelector<CountState>;
// type CountHooks = StateHooks<CountState>;

const createCountState: StateCreatorEnhancer<CountState> = (set, get) => ({
    count: 0,
    setCount: (next) => set(curriedSetter("count", next, get().count), undefined, { type: ACTION.SET_COUNT })
});

const countSelector: CountSelector = {
    countSelector: (state) => state.count,
    setCountSelector: (state) => state.setCount
}

//이전값을 이용한 함수가 호출되는 원리는?


const createCountHooks: StateHookCreator<CountState> = (store) => {
    return {
        useCount: () => useStore(store, countSelector.countSelector),
        useSetCount: () => useStore(store, countSelector.setCountSelector)
    }
}




export type {
    ACTION,
    CountState
}

export {
    createCountState,
    createCountHooks
}