import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, Method } from 'axios';
import { firstValueFrom } from 'rxjs';

import { OracleAuthService } from '../auth/oracle-auth.service';

// mock
import workers from '../../../mocks/workers.json';

@Injectable()
export class OracleClientService {
  private readonly logger = new Logger(OracleClientService.name);

  constructor(
    private readonly http: HttpService,
    private readonly auth: OracleAuthService,
    private readonly config: ConfigService,
  ) {}

  private isMock(): boolean {
    return this.config.get<string>('oracle.mode') === 'mock';
  }

  private getMockData(path: string): any {
    if (path.startsWith('/hcmRestApi/resources/latest/workers')) {
      return workers;
    }

    throw new HttpException(
      `Mock endpoint not found : ${path}`,
      HttpStatus.NOT_FOUND,
    );
  }

  private async request<T>(
    method: Method,
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    if (this.isMock()) {
      this.logger.log(`[MOCK] ${method} ${path}`);

      return this.getMockData(path);
    }

    const started = Date.now();

    try {
      const response = await firstValueFrom(
        this.http.request<T>({
          method,
          url: this.auth.buildUrl(path),
          headers: this.auth.getHeaders(),
          data,
          timeout: 30000,
          ...config,
        }),
      );

      this.logger.log(
        `${method} ${path} ${response.status} (${Date.now() - started} ms)`,
      );

      return response.data;
    } catch (error: any) {
      this.logger.error({
        method,
        path,
        status: error.response?.status,
        message: error.message,
      });

      throw new HttpException(
        error.response?.data ?? error.message,
        error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', path, undefined, config);
  }

  async post<T>(
    path: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', path, body, config);
  }

  async patch<T>(
    path: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', path, body, config);
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, undefined, config);
  }
}
