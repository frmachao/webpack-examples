import { User } from "../../models/User";
const QueryUser = {
}
const MutationUser = {
    login: (args: any, context: any) => {
        const { password, email } = args
        const { req } = context
        return new Promise((resolve, reject) => {
            User.findOne({ email: email.toLowerCase() }, (err: Error, user: any) => {
                if (err) {
                    return resolve({
                        status: "error",
                        msg: err.message,
                    })
                }
                if (!user) {
                    return resolve({
                        status: "error",
                        msg: "用户不存在",
                    })
                }
                user.comparePassword(password, (err: Error, isMatch: boolean) => {
                    if (err) { throw new Error('密码错误') }
                    if (isMatch) {
                        req.session.userId = user._id;
                        return resolve({ status: 'ok',data:user })
                    }
                });
            });
        })
    },
    test: () => ({ status: 'ok', data: [{ test: 'test' }] }),
    logout: (args: any, context: any) => {
        context.req.session.destroy()
        return { ok: '成功' }
    },
    signup: (args: any, context: any) => {
        const { email, password } = args
        const { req } = context
        const user = new User({
            email,
            password
        })
        return user.save()
            .then(doc => ({ status: "ok" }))
            .catch((err:Error)=>({status: "error", msg: err.message}))
    }
}
export { QueryUser, MutationUser }