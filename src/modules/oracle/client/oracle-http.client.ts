import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OracleHttpClient {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  getBaseUrl(): string {
    return this.config.get<string>('oracle.baseUrl') ?? '';
  }

  getTimeout(): number {
    return this.config.get<number>('oracle.timeout') ?? 30000;
  }
}