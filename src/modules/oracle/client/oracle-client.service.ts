import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, Method } from 'axios';
import { firstValueFrom } from 'rxjs';
import { OracleAuthService } from '../auth/oracle-auth.service';
import workers from '../../../mocks/workers.json';
import { OracleHttpLogger } from '../logger/oracle-http.logger';
import { OracleErrorMapper } from '../errors/oracle-error.mapper';

@Injectable()
export class OracleClientService {
  private readonly logger = new Logger(OracleClientService.name);

  constructor(
    private readonly http: HttpService,
    private readonly auth: OracleAuthService,
    private readonly config: ConfigService,
    private readonly httpLogger: OracleHttpLogger,
    private readonly errorMapper: OracleErrorMapper,
  ) {}

  private isMock(): boolean {
    return this.config.get<string>('oracle.mode') === 'mock';
  }

  private getMockData(path: string): any {
    if (path.startsWith('/hcmRestApi/resources/latest/workers')) {
      return workers;
    }

    throw new HttpException(
      `Mock endpoint not found: ${path}`,
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
      this.httpLogger.success({
        method,
        url: path,
        duration: 0,
        statusCode: 200,
      });

      return this.getMockData(path);
    }

    const url = this.auth.buildUrl(path);
    const startTime = Date.now();

    try {
      const response = await firstValueFrom(
        this.http.request<T>({
          method,
          url,
          headers: this.auth.getHeaders(),
          data,
          timeout: 30000,
          ...config,
        }),
      );

      const duration = Date.now() - startTime;

      this.httpLogger.success({
        method,
        url,
        statusCode: response.status,
        duration,
        requestId: this.getRequestId(response.headers),
        payload: this.sanitizePayload(data),
      });

      return response.data;
    } catch (error: any) {
      const duration = Date.now() - startTime;

      this.httpLogger.error({
        method,
        url,
        statusCode: error.response?.status,
        duration,
        requestId: this.getRequestId(error.response?.headers),
        payload: this.sanitizePayload(data),
        error: error.response?.data ?? error.message,
      });

      throw this.errorMapper.map(error);
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

  private sanitizePayload(payload: unknown): unknown {
    if (!payload || typeof payload !== 'object') {
      return payload;
    }

    const clone = { ...(payload as Record<string, unknown>) };

    delete clone.password;
    delete clone.client_secret;
    delete clone.access_token;

    return clone;
  }

  private getRequestId(headers?: Record<string, unknown>): string | undefined {
    if (!headers) {
      return undefined;
    }

    return (
      (headers['x-oracle-dms-ecid'] as string | undefined) ??
      (headers['opc-request-id'] as string | undefined)
    );
  }

  private shouldRetry(error: any): boolean {
    const status = error.response?.status;

    return status === 429 || status === 502 || status === 503 || status === 504;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
