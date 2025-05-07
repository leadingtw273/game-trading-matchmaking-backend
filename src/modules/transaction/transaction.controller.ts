import {
  Controller,
  Get,
  Post,
  // Body,
  Patch,
  // Param,
  Delete,
  MethodNotAllowedException,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageDto, PageOptionsDto } from '@/common/dto/pagination.dto';

// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // @Post()
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionService.create(createTransactionDto);
  // }

  @Get()
  @ApiOperation({ summary: '取得角色商品列表' })
  @ApiResponse({
    status: 200,
    description: '成功取得角色商品列表',
    type: PageDto,
  })
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.transactionService.findAll(pageOptionsDto);
  }

  @Post()
  @Patch()
  @Delete()
  notAllow() {
    throw new MethodNotAllowedException();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionService.remove(+id);
  // }
}
