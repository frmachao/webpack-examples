import { Request, Response, NextFunction } from 'express'
const reqLog = (req: Request, res: Response, next: NextFunction) => {
    // 打印每次请求中的信息
    console.log('session==', req.session)
    console.log('sessionID==', req.sessionID)
    console.log('body==', req.body)
    console.log('path==', req.path)
    next()
}
export {reqLog}