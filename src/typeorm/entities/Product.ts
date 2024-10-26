import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

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

    @Column()
    discount:number;
}