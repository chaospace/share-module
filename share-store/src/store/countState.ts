import { useStore } from 'zustand';
import type { PropsSelector, State, StateCreatorEnhancer, StateHookCreator } from './types';
import { getNextState } from './common';

interface CountProps {
  count: number;
}

const ACTION = {
  SET_COUNT: 'SET_COUNT'
};

type CountState = State<CountProps>;
type CountSelector = PropsSelector<CountState>;

const createCountState: StateCreatorEnhancer<CountState> = (set, get) => ({
  count: 0,
  setCount: nextState =>
    set({ count: getNextState(nextState, get().count) }, undefined, { type: ACTION.SET_COUNT })
});

const countSelector: CountSelector = {
  countSelector: state => state.count,
  setCountSelector: state => state.setCount
};

const createCountHooks: StateHookCreator<CountState> = store => {
  return {
    useCount: () => useStore(store, countSelector.countSelector),
    useSetCount: () => useStore(store, countSelector.setCountSelector)
  };
};

export type { ACTION, CountState };

export { createCountState, createCountHooks };
