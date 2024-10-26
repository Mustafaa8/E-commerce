export type CreateUserParams = {
    username:string,
    email:string,
    password:string,
    isAdmin:boolean
}

export type UpdateUserParams = {
    username:string,
    email:string,
    isAdmin:boolean
}

export type LoginParams = {
    email:string,
    password:string
}