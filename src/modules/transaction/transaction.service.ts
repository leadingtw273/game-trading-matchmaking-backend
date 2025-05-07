import { Injectable } from '@nestjs/common';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from '@/common/dto/pagination.dto';
import { PaginationService } from '@/common/services/pagination.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
    private paginationService: PaginationService,
  ) {}

  // create(createTransactionDto: CreateTransactionDto) {
  //   return 'This action adds a new transaction';
  // }

  findAll(pageOptionsDto: PageOptionsDto) {
    // return `This action returns all transaction`;
    // return this.transactionRepository.find({
    //   relations: [
    //     'commodity.characterCommodities',
    //     // 'commodity.characterCommodities.characterArenaScores',
    //     // 'commodity.characterCommodities.characterGearScores',
    //     // 'commodity.characterCommodities.characterSkinCounts',
    //     'commodity.coinCommodities',
    //     'commodity.appearanceCommodities',
    //     'poster.posterContacts',
    //   ],
    // });
    return this.paginationService.paginate(
      this.transactionRepository,
      pageOptionsDto,
      // (qb) => {
      //   // 這裡可以添加自定義的查詢條件
      //   // 例如：關聯查詢、條件過濾等
      //   return qb.leftJoinAndSelect('entity.commodity', 'commodity');
      // },
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
