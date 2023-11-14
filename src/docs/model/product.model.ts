import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductModel {
  @ApiProperty({ example: 'Unique ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Card Personalizado' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'card-personalizado' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Card personalizado sobre o dia dos pais' })
  @IsString()
  description: string;

  @ApiProperty({ example: 2.5 })
  @IsNumber()
  price: number;
}
