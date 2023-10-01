import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceModule } from './resources/resource.module';
import { ApiConfigModule } from './config/config.module';
import { ApiConfigService } from './config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => ({
        uri: config.database.uri,
        dbName: config.database.name,
        auth: {
          username: config.database.username,
          password: config.database.password,
        }
      })
    }),
    ResourceModule,
    ApiConfigModule,
  ]
})
export class AppModule {}
