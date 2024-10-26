import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn, Repository } from "typeorm";
import { Cart } from "./Cart";
import { Exclude } from "class-transformer";
import { InjectRepository } from "@nestjs/typeorm";

@Entity({name:"users"})
export class User {
    constructor(@InjectRepository(Cart) private cartRepo:Repository<Cart>){}
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

    @BeforeInsert()
    createCart(){
        const cart = this.cartRepo.create({})
        this.cart=cart
    }
}