import { plainToInstance } from 'class-transformer';

import { Type } from '@nestjs/common';

export abstract class MapperManager {
  public static mapToClass<T, U = unknown>(object: U, toType: Type<T>): T {
    return plainToInstance(toType, object, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}