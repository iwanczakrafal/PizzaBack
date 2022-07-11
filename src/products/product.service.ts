import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {BasketService} from 'src/basket/basket.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {MulterDiskUploadedFiles, ProductItemInterface} from "../types";
import {ProductItem} from "./entities/product-item.entity";
import * as path from "path";
import {storageDir} from "../utils/storage";
import { promises as fs } from 'fs';
import {DataSource} from "typeorm";


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

    async addProduct(req: CreateProductDto, files: MulterDiskUploadedFiles): Promise<ProductItemInterface> {
        const photo = files?.photo?.[0] ?? null;
        console.log(photo)
        try {
            const newProduct = new ProductItem();
            newProduct.name = req.name;
            newProduct.description = req.description;
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
        const { photo } = await this.getProductWithoutSpecial(id);

        try {
            if (photo) {
                await fs.unlink(path.join(storageDir(),'products-photos', photo));
            }
            await ProductItem.delete(id);
        } catch (error) {
            throw error;
        }
    }


}
