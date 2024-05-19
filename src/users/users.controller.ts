import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(Number(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
    return this.usersService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser(Number(id));
  }
}
