import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PosterView } from './entities/poster-view.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  PaginationService,
} from '@/common/services/pagination.service';

export interface IFindAllOptions extends IPaginationOptions {
  nickname?: string;
  gameId?: string;
}

@Injectable()
export class PosterService {
  constructor(
    @InjectRepository(PosterView)
    private posterViewRepository: Repository<PosterView>,
    private paginationService: PaginationService,
  ) {}

  findAll(options: IFindAllOptions) {
    return this.paginationService.paginate(
      this.posterViewRepository,
      options,
      (qb) => {
        if (options.nickname) {
          qb.andWhere('nickname like :nickname', {
            nickname: `%${options.nickname}%`,
          });
        }

        if (options.gameId) {
          qb.andWhere('game_id = :gameId', {
            gameId: options.gameId,
          });
        }
        return qb;
      },
    );
  }
}
