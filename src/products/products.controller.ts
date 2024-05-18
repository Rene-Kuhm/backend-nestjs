import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(
    @Body() productData: ProductModel,
  ): Promise<ProductModel> {
    return this.productsService.createProduct(productData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ProductModel[]> {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: ProductModel,
  ): Promise<ProductModel> {
    return this.productsService.updateProduct(Number(id), productData);
  }
}
