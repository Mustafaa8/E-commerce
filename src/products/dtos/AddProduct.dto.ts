import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Max, max, Min } from "class-validator";

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

    @IsOptional()
    @IsNumber()
    @Max(1)
    @Min(0)
    discount:number;
}