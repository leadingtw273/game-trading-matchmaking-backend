import { PageOptionsDto } from '@/common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class QueryPosterDto extends PageOptionsDto {
  @ApiProperty({
    description: '發布者名稱（模糊搜尋）',
    required: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    description: '遊戲ID',
    required: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  gameId?: string;
}
