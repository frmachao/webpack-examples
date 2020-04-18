import { makeExecutableSchema } from 'graphql-tools'

/** resolver */
import { QueryUser, MutationUser } from '../user/resolvers'

/** schema */
import TypeUser from '../user/schema'

const rootType = `
# 注释
type Reuslt{
    status:String
    msg:String
}
# 分页信息
type PageInfo{
    total:Int
    current:Int
    pageSize:Int
}
type Query {
    dummy: Boolean
}
type Mutation {
    dummy: Boolean
}
`
// 对graphql分组
const resolvers = {
    Query: {
        user: () => QueryUser,
    },
    Mutation: {
        user: () => MutationUser,
    }
};
const schema = makeExecutableSchema({
    typeDefs: [rootType, TypeUser],
    resolvers,
})
export default schema