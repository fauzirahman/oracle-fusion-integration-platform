import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class OracleErrorMapper {
  map(error: any): HttpException {
    if (error.code === 'ECONNABORTED') {
      return new HttpException(
        {
          code: 'ORACLE_TIMEOUT',
          message: 'Oracle request timed out.',
        },
        HttpStatus.GATEWAY_TIMEOUT,
      );
    }

    if (!error.response) {
      return new HttpException(
        {
          code: 'ORACLE_CONNECTION_ERROR',
          message: error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }

    const data = error.response.data;

    return new HttpException(
      {
        code: data.errorCode ?? 'ORACLE_ERROR',
        title: data.title,
        message: data.message ?? data.detail ?? 'Oracle request failed.',
        details: data,
      },
      error.response.status,
    );
  }
}