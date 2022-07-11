import {Controller, Get, Post, Body, Param, Delete, Inject, UseGuards, Put} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./entities/user.entity";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPwdDto } from './dto/update-user-pwd.dto';
import {DeleteAccountRes, RegisterUserRes, UpdateUserPwdRes, UserInfoForAdminRes} from "../types";
import { AuthGuard } from '@nestjs/passport';
import {UserObj} from "../decorators/user-obj.decorator";

@Controller('user')
export class UserController {
  constructor(
      @Inject(UserService) private userService: UserService
  ) {
  }

  @Post("/register")
  createAccount(
      @Body() newUser: CreateUserDto
  ): Promise<RegisterUserRes> {
    return this.userService.createAccount(newUser);
  }

  @Get("/")
  @UseGuards(AuthGuard("jwtAdmin"))
  getAllUsers(
  ): Promise<UserInfoForAdminRes[]> {
    return this.userService.getAllUsers();
  }

  @Get("/find/:id")
  @UseGuards(AuthGuard("jwtAdmin"))
  getOneUser(
      @Param("id") id:string
  ): Promise<UserInfoForAdminRes> {
    return this.userService.getOneUser(id);
  }


  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  updateUserPwd(
      @UserObj() user: User,
      @Body() body : UpdateUserPwdDto
  ): Promise<UpdateUserPwdRes>{
    return this.userService.updateAccountPwd(user, body);
  }

  @Delete("/")
  @UseGuards(AuthGuard('jwt'))
  deleteAccount(
      @UserObj() user: User,
  ): Promise<DeleteAccountRes>{
    return this.userService.deleteAccount(user);
  }
}
