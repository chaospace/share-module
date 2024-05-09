
//타입 단언
const isFunc = (value: unknown): value is Function => typeof value === "function";


const curriedSetter = (key: string, next: unknown, prev: unknown) => {
    const answer = { [key]: isFunc(next) ? next(prev) : next };
    console.log('answer', answer);
    return answer
}


export { curriedSetter }