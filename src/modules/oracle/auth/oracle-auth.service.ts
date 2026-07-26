import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OracleAuthService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Oracle Fusion Base URL
   * Example:
   * https://abc.fa.us2.oraclecloud.com
   */
  getBaseUrl(): string {
    return this.configService.get<string>('oracle.baseUrl') ?? '';
  }

  /**
   * Oracle Fusion Username
   */
  getUsername(): string {
    return this.configService.get<string>('oracle.username') ?? '';
  }

  /**
   * Oracle Fusion Password
   */
  getPassword(): string {
    return this.configService.get<string>('oracle.password') ?? '';
  }

  /**
   * Generate Basic Authentication header
   */
  getBasicAuthHeader(): string {
    const credentials = `${this.getUsername()}:${this.getPassword()}`;

    return `Basic ${Buffer.from(credentials).toString('base64')}`;
  }

  /**
   * Common headers for Oracle REST API
   */
  getHeaders() {
    return {
      Authorization: this.getBasicAuthHeader(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Build full endpoint URL
   */
  buildUrl(path: string): string {
    const baseUrl = this.getBaseUrl().replace(/\/$/, '');
    const endpoint = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${endpoint}`;
  }
}