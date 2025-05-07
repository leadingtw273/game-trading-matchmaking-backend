import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';

export interface IPaginationOptions {
  page: number;
  size: number;
  skip: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
}

export interface IPaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Injectable()
export class PaginationService {
  async paginate<T>(
    repository: Repository<T>,
    options: IPaginationOptions,
    queryCallback?: (
      queryBuilder: SelectQueryBuilder<T>,
    ) => SelectQueryBuilder<T>,
  ): Promise<IPaginationResult<T>> {
    const queryBuilder = repository.createQueryBuilder('entity');

    const query = queryCallback ? queryCallback(queryBuilder) : queryBuilder;

    if (options.orderBy) {
      query.orderBy(`entity.${options.orderBy}`, options.order);
    }

    query.skip(options.skip).take(options.size);

    const [items, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / options.size);

    return {
      items,
      total,
      page: options.page,
      size: options.size,
      totalPages,
      hasNextPage: options.page < totalPages,
      hasPreviousPage: options.page > 1,
    };
  }
}
