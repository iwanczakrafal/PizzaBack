import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';


@Controller('option')
export class OptionController {
  constructor(
      @Inject(OptionService) private optionService: OptionService
  ) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.getOneOption(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}
