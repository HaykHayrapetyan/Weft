import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './config.service';
import environmentConfig, { environmentValidationSchema } from './environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentConfig],
      validationSchema: environmentValidationSchema,
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
