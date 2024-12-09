import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './DTOs/create-users.dto';
import { UpdateUsersDto } from './DTOs/update-user.dto';
import { first } from 'rxjs';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'Luka',
      lastName: 'Gobechia',
      email: 'lukagobechia@gmail.com',
      phoneNumber: '526893245',
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Nika',
      lastNmae: 'Gobechia',
      email: 'nikagobechia@gmail.com',
      phoneNumber: '526893245',
      gender: 'Male',
    },
  ];
  getAllUsers() {
    return this.users;
  }
  getUserById(id: number) {
    const user = this.users.find((el) => el.id === id);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user;
  }
  createUser(body: CreateUsersDto) {
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      gender: body.gender,
    };
    this.users.push(newUser);
    return ['new user has been added', newUser];
  }
  deleteUser(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const user = this.users.splice(index, 1);

    return ['user deleted', user];
  }
  updateUser(id: number, body: UpdateUsersDto) {
    const index = this.users.findIndex((el) => el.id === id);
    this.users[index] = {
      id: this.users[index].id,
      firstName: body.firstName || this.users[index].firstName,
      lastName: body.lastName || this.users[index].lastName,
      email: body.email || this.users[index].email,
      phoneNumber: body.phoneNumber || this.users[index].phoneNumber,
      gender: body.gender || this.users[index].gender
    };
    return ["user updated", this.users[index]]
  }
}
