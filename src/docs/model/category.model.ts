import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CategoryModel {
  @ApiProperty({ example: 'Unique ID' })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Convite de Casamento',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'convite-de-casamento' })
  @IsUrl()
  slug: string;
}
