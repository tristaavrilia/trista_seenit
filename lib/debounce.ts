export const debounce = (cb: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => cb(...args), wait);
    };
};
