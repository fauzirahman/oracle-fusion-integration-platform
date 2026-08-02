import { Injectable, Logger } from '@nestjs/common';
import { OracleRequestLog } from '../interfaces/oracle-request-log.interface';

@Injectable()
export class OracleHttpLogger {
  private readonly logger = new Logger('OracleHTTP');

  success(log: OracleRequestLog) {
    this.logger.log({
      method: log.method,
      url: log.url,
      status: log.statusCode,
      duration: `${log.duration} ms`,
      requestId: log.requestId,
    });
  }

  error(log: OracleRequestLog) {
    this.logger.error({
      method: log.method,
      url: log.url,
      status: log.statusCode,
      duration: `${log.duration} ms`,
      requestId: log.requestId,
      payload: log.payload,
      error: log.error,
    });
  }
}
