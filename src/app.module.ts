import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${process.env.DB_NAME}`,
      entities: [Producto],
      synchronize: true, // Solo para desarrollo (sincroniza automáticamente los cambios en las entidades)
    }),
    ConfigModule.forRoot(),
    ProductosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
