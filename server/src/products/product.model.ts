import { ApiProperty } from '@nestjs/swagger';

export class Product {
  constructor(id: string, title: string, description: string, price: number) {
    this.id = id;
    this.tittle = title;
    this.description = description;
    this.price = price;
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  tittle: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
}
