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

    @Column((type)=>Item)
    items:Item[]

    @AfterUpdate()
    update(){
        let sum = 0;
        let discountedSum = 0;
        if(this.items.length === 0){
            sum = 0
            discountedSum = 0
            
        } else {
        for (const item of this.items){
            if(item.product.discount){
                discountedSum += item.product.price * (1 - item.product.discount)
            } else {
                discountedSum += item.product.price
            }
            sum += item.product.price
        }}
        this.totalPrice = sum
        this.afterDiscount = discountedSum
    }
}
class Item {
    @Column(type => Product)
    product:Product

    @Column()
    quantity:number = 1
}