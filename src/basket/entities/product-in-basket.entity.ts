import { OptionItem } from "../../option/entities/option-item.entity";
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductItem} from "../../products/entities/product-item.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class ProductInBasket extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        default: 1
    })
    count: number;

    @ManyToOne(type => ProductItem, entity => entity.productsInBasket)
    @JoinColumn()
    productItem: ProductItem;

    @ManyToOne(type => OptionItem, entity => entity.productsInBasket)
    @JoinColumn()
    option: OptionItem;

    @ManyToOne(type => User, entity => entity.productsInBasket)
    @JoinColumn()
    user: User ;
}
