import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  @ApiProperty({
    required: false,
  })
  meta?: any;

  constructor(success: boolean, message: string, data: T, meta?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
