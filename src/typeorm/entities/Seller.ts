import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Product } from "./Product";

@Entity({name:"sellers"})
export class Seller {
    @ObjectIdColumn()
    _id:ObjectId

    @Column()
    sellerName:string

    @Column()
    rating:number
}