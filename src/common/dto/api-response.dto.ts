import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    example: true,
    description: 'Indicates whether the request was successful.',
  })
  success: boolean;

  @ApiProperty({
    example: 'Request completed successfully.',
    description: 'Human-readable response message.',
  })
  message: string;

  @ApiProperty({
    description: 'Response payload.',
  })
  data: T;

  @ApiProperty({
    required: false,
    description: 'Optional response metadata.',
  })
  meta?: unknown;

  constructor(
    success: boolean,
    message: string,
    data: T,
    meta?: unknown,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
