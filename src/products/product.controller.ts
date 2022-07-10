import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    UseInterceptors,
    UploadedFiles,
    Res,
    Put
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import * as path from "path";
import {multerStorage, storageDir} from "../utils/storage";
import {MulterDiskUploadedFiles, ProductItemInterface} from "../types";
import { ProductItem } from './entities/product-item.entity';


@Controller('product')
export class ProductController {
    constructor(
        @Inject(ProductService) private productService: ProductService
    ) {
    }

    @Post("/")
    @UseInterceptors(
        FileFieldsInterceptor([
                {
                    name: 'photo', maxCount: 1
                },
            ], {storage: multerStorage(path.join(storageDir(), 'products-photos'))}
        ),
    )
    addProduct(
        @Body() req: CreateProductDto,
        @UploadedFiles() files: MulterDiskUploadedFiles,
    ):Promise<ProductItemInterface> {
        return this.productService.addProduct(req, files);
    }

    @Get("/")
    getAllProducts(): Promise<ProductItemInterface[]> {
        return this.productService.getAllProducts();
    }

    @Get("/find/:id")
    getOneProduct(
        @Param('id') id: string,
    ): Promise<ProductItem> {
        return this.productService.getProduct(id);
    }

    @Get('/photo/:id')
    async getPhoto(
        @Param('id') id: string,
        @Res() res: any,
    ): Promise<any> {
        return this.productService.getPhoto(id, res);
    }

    @Delete("/:id")
    removeProduct(
        @Param("id") id: string
    ) {
        return this.productService.removeProduct(id);
    }

}
