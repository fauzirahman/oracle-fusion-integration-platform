import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, Method } from 'axios';
import { firstValueFrom } from 'rxjs';

import workers from '../../../mocks/workers.json';

import { OracleAuthService } from '../auth/oracle-auth.service';
import { OracleErrorMapper } from '../errors/oracle-error.mapper';
import { OracleHttpLogger } from '../logger/oracle-http.logger';

import { RetryPolicyService } from '../../../common/retry/retry-policy.service';
import { CircuitBreakerService } from '../../../common/resilience/circuit-breaker.service';

@Injectable()
export class OracleClientService {
  private readonly logger = new Logger(OracleClientService.name);

  constructor(
    private readonly http: HttpService,
    private readonly auth: OracleAuthService,
    private readonly config: ConfigService,
    private readonly httpLogger: OracleHttpLogger,
    private readonly errorMapper: OracleErrorMapper,
    private readonly retryPolicy: RetryPolicyService,
    private readonly circuitBreaker: CircuitBreakerService,
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
        statusCode: 200,
        duration: 0,
      });

      return this.getMockData(path);
    }

    return this.circuitBreaker.execute(() =>
      this.retryPolicy.execute(
        async () => {
          const url = this.auth.buildUrl(path);
          const startedAt = Date.now();

          try {
            const response = await firstValueFrom(
              this.http.request<T>({
                method,
                url,
                headers: this.auth.getHeaders(),
                timeout: 30000,
                data,
                ...config,
              }),
            );

            const duration = Date.now() - startedAt;

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
            const duration = Date.now() - startedAt;

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
        },
        {
          shouldRetry: (error) => this.shouldRetry(error),
        },
      ),
    );
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

  async put<T>(
    path: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', path, body, config);
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, undefined, config);
  }

  private sanitizePayload(payload: unknown): unknown {
    if (!payload || typeof payload !== 'object') {
      return payload;
    }

    const clone = {
      ...(payload as Record<string, unknown>),
    };

    delete clone.password;
    delete clone.client_secret;
    delete clone.access_token;
    delete clone.refresh_token;

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
    const status = error?.response?.status;

    return (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    );
  }
}
