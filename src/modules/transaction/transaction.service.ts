import { Injectable } from '@nestjs/common';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
  ) {}

  // create(createTransactionDto: CreateTransactionDto) {
  //   return 'This action adds a new transaction';
  // }

  findAll() {
    // return `This action returns all transaction`;
    return this.transactionRepository.find({
      relations: [
        'commodity.characterCommodities',
        // 'commodity.characterCommodities.characterArenaScores',
        // 'commodity.characterCommodities.characterGearScores',
        // 'commodity.characterCommodities.characterSkinCounts',
        'commodity.coinCommodities',
        'commodity.appearanceCommodities',
        'poster.posterContacts',
      ],
    });
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
