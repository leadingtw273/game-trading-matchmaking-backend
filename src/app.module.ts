import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { TransactionModule } from '@/modules/transaction/transaction.module';
import { CommodityModule } from '@/modules/commodity/commodity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosterModule } from './modules/poster/poster.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // 生產環境應設為 false
    }),
    CommonModule,
    CoreModule,
    TransactionModule,
    CommodityModule,
    PosterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
