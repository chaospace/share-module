import { useStore } from "zustand";
import type { PropsSelector, State, StateCreatorEnhancer, StateHookCreator } from "./types";






interface CountProps {
    count: number;
}

const ACTION = {
    SET_COUNT: "SET_COUNT"
}

type CountState = State<CountProps>;
type CountSelector = PropsSelector<CountState>;
// type CountHooks = StateHooks<CountState>;

const createCountState: StateCreatorEnhancer<CountState> = set => ({
    count: 0,
    setCount: (count) => set({ count })
});

const countSelector: CountSelector = {
    countSelector: (state) => state.count,
    setCountSelector: (state) => state.setCount
}

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