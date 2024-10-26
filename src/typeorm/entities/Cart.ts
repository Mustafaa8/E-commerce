import { AfterUpdate, Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { Product } from "./Product";


@Entity({name:"user_cart"})
export class Cart {
    @ObjectIdColumn({select:true})
    _id:ObjectId

    @Column({default:0})
    totalPrice:number = 0;

    @Column({default:0})
    afterDiscount:number = 0

    @Column((type)=>Product)
    products:Product[] = []

    @AfterUpdate()
    update(){
        let sum = 0;
        let discountedSum = 0;
        if(this.products.length === 0){
            sum = 0
            discountedSum = 0
            
        } else {
        for (const product of this.products){
            if(product.discount){
                discountedSum += product.price * (1 - product.discount)
            } else {
                discountedSum += product.price
            }
            sum += product.price
        }}
        this.totalPrice = sum
        this.afterDiscount = discountedSum
    }
}