import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Seller } from "./Seller";


@Entity({name:"Products"})
export class Product {
    @ObjectIdColumn()
    _id:ObjectId;

    @Column()
    name:string;

    @Column()
    price:number;

    @Column()
    rating:number;

    @Column()
    category:string;

    @Column((type)=>Seller)
    seller:Seller;
}