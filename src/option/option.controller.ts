import {Controller, Get, Post, Body, Param, Delete, Inject, UseGuards, Put} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {AuthGuard} from "@nestjs/passport";
import {OptionItem} from "./entities/option-item.entity";
import {UpdateOptionRes} from "../types";


@Controller('option')
export class OptionController {
  constructor(
      @Inject(OptionService) private optionService: OptionService
  ) {}

  @Post("/")
  @UseGuards(AuthGuard('jwtAdmin'))
  create(
      @Body() req: CreateOptionDto
  ): Promise<OptionItem> {
    return this.optionService.createOption(req);
  }

  @Get("/")
  getAllOptions(): Promise<OptionItem[]> {
    return this.optionService.getAllOptions();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.optionService.getOneOption(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwtAdmin'))
  changeOptionPrice(
      @Param('id') id: string,
      @Body() body: UpdateOptionDto
  ): Promise<UpdateOptionRes> {
    return this.optionService.changeOptionPrice(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwtAdmin'))
  removeOption(
      @Param('id') id: string
  ) {
    return this.optionService.removeOption(id);
  }
}
