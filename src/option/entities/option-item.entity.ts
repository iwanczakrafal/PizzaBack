import { ProductInBasket } from "src/basket/entities/product-in-basket.entity";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OptionItem extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @OneToMany(type => ProductInBasket, entity => entity.option)
    productsInBasket: ProductInBasket[];
}
