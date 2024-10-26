import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Product } from "./Product";


@Entity({name:"user_cart"})
export class Cart {
    @ObjectIdColumn()
    _id:ObjectId

    @Column({default:0})
    totalPrice:number;

    @Column({default:0})
    afterDiscount:number

    @Column((type)=>Product)
    products:Product[]
}