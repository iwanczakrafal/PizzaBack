import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {DeleteAccountRes, RegisterUserRes, UserInfoForAdminRes} from "../types";

@Controller('user')
export class UserController {
  constructor(
      @Inject(UserService) private userService: UserService
  ) {
  }

  @Get("/")
  getAllUsers(
  ): Promise<UserInfoForAdminRes[]> {
    return this.userService.getAllUsers();
  }

  @Get("/find/:id")
  getOneUser(
      @Param("id") id:string
  ): Promise<UserInfoForAdminRes> {
    return this.userService.getOneUser(id);
  }

  @Post("/register")
  createAccount(
      @Body() newUser: CreateUserDto
  ): Promise<RegisterUserRes> {
    return this.userService.createAccount(newUser);
  }

}
