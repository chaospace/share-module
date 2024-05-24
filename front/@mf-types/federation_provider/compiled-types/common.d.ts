declare const curriedSetter: <U>(key: string, next: U, prev: U) => {
    [x: string]: any;
};
declare const getNextState: <T>(next: T, prev: T) => any;
export { curriedSetter, getNextState };
