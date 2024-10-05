import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {

  constructor ( 
    
  @InjectRepository(Producto)  private productoRepository: Repository<Producto>

  ){}

  async create(createProductoDto: CreateProductoDto) {
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  async findAll() {
    return await this.productoRepository.find();
  }

  async findOne( id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {

    const { id:_ , ...data } = updateProductoDto;

    const producto = await this.productoRepository.findOneBy({ id });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(data);
  }

  async remove(id: number) {
   
    const result = await this.productoRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return "Producto eliminado correctamente"

  }
}
