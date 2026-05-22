import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Product as ProductModel, Prisma } from '@prisma/client';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.dcorator';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ) {
    const productCreateInput: Prisma.ProductCreateInput = {
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description || '',
      imageUrl: createProductDto.imageUrl,
    };
    return this.productsService.createProduct(productCreateInput);
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.deleteProduct(Number(id));
  }
}
