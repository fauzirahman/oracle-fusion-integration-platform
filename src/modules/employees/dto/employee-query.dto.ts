import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class EmployeeQueryDto {
  @ApiPropertyOptional({
    example: '100001',
    description: 'Employee person number',
  })
  @IsOptional()
  @IsString()
  personNumber?: string;

  @ApiPropertyOptional({
    example: 'john.doe@company.com',
    description: 'Employee work email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'john',
    description: 'Search employee by display name',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 25,
    default: 25,
    minimum: 1,
    maximum: 500,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  limit?: number = 25;

  @ApiPropertyOptional({
    example: 0,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({
    example: ['PersonNumber', 'DisplayName', 'WorkEmail'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields?: string[];
}
