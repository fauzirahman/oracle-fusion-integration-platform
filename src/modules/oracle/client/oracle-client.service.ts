import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { OracleAuthService } from '../auth/oracle-auth.service';

@Injectable()
export class OracleClientService {
  constructor(
    private readonly http: HttpService,
    private readonly auth: OracleAuthService,
  ) {}

  async get<T>(path: string): Promise<T> {
    const response = await firstValueFrom(
      this.http.get<T>(
        this.auth.buildUrl(path),
        {
          headers: this.auth.getHeaders(),
        },
      ),
    );

    return response.data;
  }
}