import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { parseInt } from 'lodash';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    
    if (isNaN(val)) {
      throw new BadRequestException({
        status: 'error',
        message: 'El ID debe ser un número entero.',
        error: 'Bad Request',
      });
    }

    return val;
  }
}
