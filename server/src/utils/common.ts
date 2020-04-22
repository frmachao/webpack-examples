import path from 'path';
import fs from 'fs';
/**
 * 处理 async 函数中的异常
 * @param promise 
 */
export  function awaitWrap<T, U = Error>(promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}
export const getFePath = (dir: string) => {
    return path.join(__dirname, '../../../dist', dir);
  };
export const getStatic = ({ prefix='', staticPath, title }): any => {
    const tmp=JSON.parse(fs.readFileSync(getFePath(staticPath),'utf-8'))
    return {
      title,
      runtime: tmp['runtime.js'],
      venderJs: tmp['vendors.js'],
      venderCSS: tmp['vendors.css'],
      indexJS: tmp[`${prefix}index.js`],
      indexCSS: tmp[`${prefix}index.css`],
    };
  };