import { StateCreator, StoreApi } from "zustand";


type StateUpdater<S> = ((prev: S) => S);

type PropsSelector<State> = {
    [Property in keyof State as `${Property & string}Selector`]: (state: State) => State[Property];
}

type Setter<State> = {
    [Property in keyof State as `set${Capitalize<Lowercase<Property & string>>}`]: (nextState: State[Property] | StateUpdater<State[Property]>) => void;
}

// type SetterSelector<T, K extends keyof T = keyof T> = {
//     [P in K as P extends `set${infer U}` ? `set${U}Selector` : never]: (state: T) => T[P]
// }

type SetterKeys<State, Key extends keyof State = keyof State> = Key extends `set${infer U}`
    ? `set${U}`
    : never;


type State<T> = T & Setter<T>
//type StateSetSelector<S> = SetterSelector<S>;

type StateHooks<S, K extends keyof S = keyof S> = {
    [P in K as `use${Capitalize<P & string>}`]: () => S[P]
}

type StateHookCreator<State, Store extends StoreApi<State> = StoreApi<State>> = (store: Store) => StateHooks<State>;

type StateCreatorEnhancer<State> = StateCreator<State, [["zustand/immer", never], ["zustand/devtools", never]], [], State>;

export type {
    State,
    SetterKeys,
    PropsSelector,
    Setter,
    // StateSetSelector,
    StateHooks,
    StateHookCreator,
    StateCreatorEnhancer
}