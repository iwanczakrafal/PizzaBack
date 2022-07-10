import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductInBasket} from "../../basket/entities/product-in-basket.entity";


@Entity()
export class ProductItem  extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length:60
    })
    name: string;

    @Column({
        length:200
    })
    description: string;

    @Column({
        default: null,
        nullable: true,
    })
    photo: string;

    @Column()
    price: number;

    @Column({
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @OneToMany(type => ProductInBasket, entity => entity.productItem)
    productsInBasket: ProductInBasket[];
}