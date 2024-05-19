import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from '../../prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    // Invalidar el caché cuando se crea un nuevo producto
    await this.cacheManager.del('allProducts');
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    const cachedProducts =
      await this.cacheManager.get<Product[]>('allProducts');
    if (cachedProducts) {
      return cachedProducts;
    }
    const products = await this.prisma.product.findMany();
    await this.cacheManager.set('allProducts', products, 300);
    return products;
  }

  async findOne(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(
    id: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    // Invalidar el caché cuando se actualiza un producto
    await this.cacheManager.del('allProducts');
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number): Promise<Product> {
    // Invalidar el caché cuando se elimina un producto
    await this.cacheManager.del('allProducts');
    return this.prisma.product.delete({ where: { id } });
  }
}
