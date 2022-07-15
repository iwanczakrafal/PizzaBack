import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Inject,
    UseInterceptors,
    UploadedFiles,
    Res,
    UseGuards
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import * as path from "path";
import {multerStorage, storageDir} from "../utils/storage";
import {MulterDiskUploadedFiles, ProductItemInterface} from "../types";
import {ProductItem} from './entities/product-item.entity';
import {AuthGuard} from "@nestjs/passport";


@Controller('product')
export class ProductController {
    constructor(
        @Inject(ProductService) private productService: ProductService
    ) {
    }

    @Post("/")
    @UseGuards(AuthGuard('jwtAdmin'))
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
    ): Promise<ProductItemInterface> {
        return this.productService.createProduct(req, files);
    }

    @Get("/")
    getAllProductsForGuests(): Promise<ProductItemInterface[]> {
        return this.productService.getAllProductsWithoutSpecial();
    }

    @Get("/special")
    @UseGuards(AuthGuard('jwt'))
    getAllProductsForUsers(): Promise<ProductItemInterface[]> {
        return this.productService.getAllProducts();
    }

    @Get('/special/:id')
    @UseGuards(AuthGuard('jwt'))
    getOneProductForUsers(
        @Param('id') id: string
    ): Promise<ProductItem> {
        return this.productService.getOneProduct(id);
    }

    @Get("/:id")
    getOneProductForGuests(
        @Param('id') id: string,
    ): Promise<ProductItem> {
        return this.productService.getProductWithoutSpecial(id);
    }


    @Get('/photo/:id')
    async getPhoto(
        @Param('id') id: string,
        @Res() res: any,
    ): Promise<any> {
        return this.productService.getPhoto(id, res);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard('jwtAdmin'))
    removeProduct(
        @Param("id") id: string
    ) {
        return this.productService.removeProduct(id);
    }

}
