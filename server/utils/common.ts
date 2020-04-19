/**
 * 处理 async 函数中的异常
 * @param promise 
 */
export  function awaitWrap<T, U = Error>(promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}