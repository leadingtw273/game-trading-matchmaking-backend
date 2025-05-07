import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posters } from './entities/poster.entity';
import { PosterContacts } from './entities/posterContact.entity';
import { PosterView } from './entities/poster-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posters, PosterContacts, PosterView])],
  controllers: [PosterController],
  providers: [PosterService],
})
export class PosterModule {}
