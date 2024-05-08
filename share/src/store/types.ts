type PropsSelector<State> = {
    [Property in keyof State as `${Property & string}Selector`]: (state: State) => State[Property];
}

type Setter<State> = {
    [Property in keyof State as `set${Capitalize<Lowercase<Property & string>>}`]: (nValue: State[Property]) => void;
}

type SetterSelector<T, K extends keyof T = keyof T> = {
    [P in K as P extends `set${infer U}` ? `set${U}Selector` : never]: (state: T) => T[P]
}

type SetterKeys<State, Key extends keyof State = keyof State> = Key extends `set${infer U}`
    ? `set${U}`
    : never;


type State<T> = T & Setter<T>
type StateSetSelector<S> = SetterSelector<S>;

type StateHooks<S, K extends keyof S = keyof S> = {
    [P in K as `use${Capitalize<P & string>}`]: () => S[P]
}

type StateHookCreator<Store, State> = (store: Store) => StateHooks<State>;


export type {
    State,
    SetterKeys,
    PropsSelector,
    Setter,
    StateSetSelector,
    StateHooks,
    StateHookCreator
}