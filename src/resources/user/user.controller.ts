import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { UserService } from './user.service';
import { PaginationInput } from './dto/input/pagination.input';
import { UpdateUsersStatusInput } from './dto/input/update-status.input';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserInput) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers(@Query() paginationDto: PaginationInput) {
    const { skip = 0, limit = 10 } = paginationDto;
    return this.userService.getAllUsers(skip, limit);
  }

  @Get('name/:name')
  async getUserByName(@Param('name') name: string) {
    return this.userService.getUserByParam({name});
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByParam({email});
  }

  @Patch('status')
  async updateUserStatus(@Body() statusDto: UpdateUsersStatusInput) {
    return this.userService.updateUserStatusBulk(statusDto);
  }
}