import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddProductDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;

    @IsEmpty()
    rating:number;

    @IsNotEmpty()
    @IsString()
    category:string;
}