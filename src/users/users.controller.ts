import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUsersDto} from './DTOs/create-users.dto'
import { UpdateUsersDto } from './DTOs/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  GetUserById(@Param() params) {
    const id = Number(params.id);
    return this.usersService.getUserById(id);
  }
  @Post()
  createUser(@Body() body: CreateUsersDto) {
    return this.usersService.createUser(body);
  }
  @Delete(':id')
  deleteUser(@Param() params) {
    const id = Number(params.id);
    return this.usersService.deleteUser(id);
  }
  @Put(':id')
  updateUser(@Param() params, @Body() body: UpdateUsersDto) {
    const id = Number(params.id);
    return this.usersService.updateUser(id, body);
  }
}
