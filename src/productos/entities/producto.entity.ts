import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID único del producto',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop',
  })
  name: string;

  @Column('float')
  @ApiProperty({
    description: 'Precio del producto en USD',
    example: 999.99,
  })
  price: number;
}


