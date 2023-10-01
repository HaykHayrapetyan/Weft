import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  DatabaseConfig,
  Environment,
} from './environment';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get isProduction(): boolean {
    return (
      this.configService.get<string>('environment') === Environment.PRODUCTION
    );
  }

  get isDevelopment(): boolean {
    return (
      this.configService.get<string>('environment') === Environment.DEVELOPMENT
    );
  }

  get isTesting(): boolean {
    return this.configService.get<string>('environment') === Environment.TEST;
  }

  get port(): number {
    return this.configService.get<number>('port');
  }

  get database(): DatabaseConfig {
    return this.configService.get<DatabaseConfig>('database');
  }

  public get<T = unknown>(path: string): T | undefined {
    return this.configService.get<T>(path);
  }
}
