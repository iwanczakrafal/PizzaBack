import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductInBasket} from "../../basket/entities/product-in-basket.entity";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 20
    })
    name: string;

    @Column({
        length: 55
    })
    lastName: string;

    @Column({
        length: 255
    })
    email: string;

    @Column()
    passwordHash: string;

    @Column({
        default: null,
        nullable: true
    })
    tokenId: string | null;

    @Column({
        default: false
    })
    isAdmin: boolean;

    @Column({
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @OneToMany(type => ProductInBasket, entity => entity.user)
    productsInBasket: ProductInBasket[];

}