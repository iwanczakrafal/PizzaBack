import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {BasketService} from 'src/basket/basket.service';
import {CreateProductDto} from './dto/create-product.dto';
import {MulterDiskUploadedFiles, ProductItemInterface} from "../types";
import {ProductItem} from "./entities/product-item.entity";
import * as path from "path";
import {storageDir} from "../utils/storage";
import { promises as fs } from 'fs';
import {DataSource} from "typeorm";
import * as striptags from "striptags";
import {User} from "../user/entities/user.entity";


@Injectable()
export class ProductService {
    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @Inject(DataSource) private dataSource: DataSource
    ) {
    }

    filter(product: ProductItem): ProductItemInterface {
        const {id, name, description, price} = product;
        return {id, name, description, price}
    }

    async createProduct(req: CreateProductDto, files: MulterDiskUploadedFiles): Promise<ProductItemInterface> {
        const photo = files?.photo?.[0] ?? null;

        try {
            const newProduct = new ProductItem();
            newProduct.name = striptags(req.name);
            newProduct.description = striptags(req.description);
            newProduct.price = req.price;


            if (photo) {
                newProduct.photo = photo.filename;
            }

            await newProduct.save();

            return this.filter(newProduct);

        } catch (error) {
            try {
                if (photo) {
                    await fs.unlink(photo.path);
                }
            } catch (err) {
                throw new Error(`Failed to delete file ${photo.filename}`);
            }

            throw error;
        }
    }

    async getAllProductsWithoutSpecial(): Promise<ProductItemInterface[]> {
       return (await ProductItem.find({where: {isSpecial:false}})).map(product => this.filter(product));

    }
    async getAllProducts(): Promise<ProductItemInterface[]> {
        return (await ProductItem.find()).map(product => this.filter(product));


    }

    async getPhoto(id: string, res: any) {
            const product = await this.getOneProduct(id);
        try {

            if (!product) {
                throw new Error("No object found!");
            }
            if (!product.photo) {
                throw new Error("No photo in this product entity!");
            }
            res.sendFile(
                product.photo,
                {
                    root: path.join(storageDir(),'products-photos')
                }
            );
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    }

    async getOneProduct(id: string): Promise<ProductItem> {
        return await this.dataSource
            .createQueryBuilder()
            .select('productItem')
            .from(ProductItem,'productItem')
            .where('id = :id', {id})
            .getOne();
    }

    async getProductWithoutSpecial(id: string): Promise<ProductItem> {
        return await this.dataSource
            .createQueryBuilder()
            .select('productItem')
            .from(ProductItem,'productItem')
            .where('id = :id', {id})
            .andWhere('isSpecial = false')
            .getOne();

    }

    async removeProduct(id: string) {
        const { photo } = await this.getOneProduct(id);

        try {
            if (photo) {
                await fs.unlink(path.join(storageDir(),'products-photos', photo));
            }
            const baskets = await this.basketService.getAllBasketsForAdmin();
            const productsToDeleteFromRelation =
                baskets
                    .filter(basket => basket.productItem.id === id)
                    .map(order => ({ orderId: order.id, userId: order.user.id }));

            for (const productToDeleteFromRelation of productsToDeleteFromRelation) {
                const user = await User.findOne({where:{ id: productToDeleteFromRelation.userId }})
                await this.basketService.removeProductFromBasket(productToDeleteFromRelation.orderId, user);
            }
            await ProductItem.delete(id);
        } catch (error) {
            throw error;
        }
    }


}
