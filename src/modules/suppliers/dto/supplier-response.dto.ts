import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SupplierResponseDto {
  @ApiProperty({
    example: 'e4e7fcb8-9b92-4d6b-8b89-7c8a63b3bdb7',
  })
  id: string;

  @ApiPropertyOptional({
    example: 'SUP-0001',
  })
  supplierNumber?: string;

  @ApiProperty({
    example: 'PT ABC Indonesia',
  })
  supplierName: string;

  @ApiPropertyOptional({
    example: '01.234.567.8-999.000',
  })
  taxNumber?: string;

  @ApiPropertyOptional({
    example: 'supplier@abc.com',
  })
  email?: string;

  @ApiPropertyOptional({
    example: '+62 21 5558888',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: 'ACTIVE',
  })
  status?: string;
}
