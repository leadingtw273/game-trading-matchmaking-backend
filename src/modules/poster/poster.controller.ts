import {
  Controller,
  Get,
  Query,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { PosterService } from './poster.service';
import { ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@/common/dto/pagination.dto';
import { TransformResponse } from '@/common/decorators/transform-response.decorator';
import { PosterDto } from './dto/poster.dto';
import { QueryPosterDto } from './dto/query-poster.dto';
// import { CreatePosterDto } from './dto/create-poster.dto';
// import { UpdatePosterDto } from './dto/update-poster.dto';

@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  // @Post()
  // create(@Body() createPosterDto: CreatePosterDto) {
  //   return this.posterService.create(createPosterDto);
  // }

  @Get()
  @ApiOperation({ summary: '取得發佈用戶列表' })
  @TransformResponse(PageDto.create(PosterDto), {
    description: '成功取得發佈用戶列表',
  })
  findAll(@Query() optionsDto: QueryPosterDto) {
    return this.posterService.findAll(optionsDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.posterService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePosterDto: UpdatePosterDto) {
  //   return this.posterService.update(+id, updatePosterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.posterService.remove(+id);
  // }
}
