


const debounce = (callback: Function, delay: number = 100) => {

    let debounceID: ReturnType<typeof setTimeout>;
    const _callback = (...args: any) => {
        clearTimeout(debounceID);
        debounceID = setTimeout(() => {
            callback(args);
        }, delay);
    }

    return _callback;
}

export { debounce }