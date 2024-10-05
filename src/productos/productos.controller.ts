import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { CustomParseIntPipe } from './pipes/custom-parse-int.pipe';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  /* @Post() */
  @MessagePattern({ cmd: 'crear_producto' })
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'El producto ha sido creado.', type: Producto })
  @ApiResponse({ status: 400, description: 'Datos incorrectos.' })
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  /* @Get() */
  @MessagePattern({ cmd: 'obtener_productos' })
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Producto] })
  findAll() {
    return this.productosService.findAll();
  }

  /* @Get(':id') */
  @MessagePattern({ cmd: 'obtener_producto' })
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', description: 'ID único del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Payload("id", CustomParseIntPipe) id: string) {
    return this.productosService.findOne(+id);
  }

  /* @Patch(':id') */
  @MessagePattern({ cmd: 'actualizar_productos' })
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', description: 'ID único del producto a actualizar' })
  @ApiResponse({ status: 200, description: 'El producto ha sido actualizado.', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(@Payload() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(updateProductoDto.id, updateProductoDto);
  }

  /* @Delete(':id') */
  @MessagePattern({ cmd: 'eliminar_productos' })
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', description: 'ID único del producto a eliminar' })
  @ApiResponse({ status: 200, description: 'El producto ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Payload("id", CustomParseIntPipe) id: string) {
    return this.productosService.remove(+id);
  }
}
