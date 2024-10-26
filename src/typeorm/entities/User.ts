import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Cart } from "./Cart";
import { Exclude } from "class-transformer";

@Entity({name:"users"})
export class User {
    @ObjectIdColumn()
    _id:ObjectId;

    @Column()
    username:string;

    @Column({unique:true})
    email:string;

    @Column({select:false})
    password:string;

    @Column({default:false})
    isAdmin:boolean = false
    
    @Column((type)=>Cart)
    cart:Cart
}