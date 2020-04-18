const TypeUser = `
type User{
    name:String,
    id:ID
}
type UserResult{
    status:String
    msg:String
    data:User
}
type UserQuery{
   name:String
}
type UserResolver{
    login(email:String!,password:String!):UserResult
    logout:UserResult
    test:UserResult
    signup(email:String!,password:String!):UserResult
}
extend type Query{
    user:UserQuery
}
extend type Mutation{
    user:UserResolver
}
`
export default TypeUser