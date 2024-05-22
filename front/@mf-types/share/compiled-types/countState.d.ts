import type { State, StateCreatorEnhancer, StateHookCreator } from './types';
interface CountProps {
    count: number;
}
declare const ACTION: {
    SET_COUNT: string;
};
type CountState = State<CountProps>;
declare const createCountState: StateCreatorEnhancer<CountState>;
declare const createCountHooks: StateHookCreator<CountState>;
export type { ACTION, CountState };
export { createCountState, createCountHooks };
