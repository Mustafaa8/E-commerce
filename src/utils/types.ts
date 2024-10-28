import { ObjectId } from "typeorm"

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

export type ProductDataParams ={
    name:string,
    price:number,
    rating:number,
    category:string,
    discount:number
}

export type JwtPayload = {
    userId:string,
    isAdmin:boolean
}