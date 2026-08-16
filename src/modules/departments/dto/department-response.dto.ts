import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DepartmentResponseDto {
  @ApiProperty({
    example: '46ef17b0-eda7-49aa-8be7-bb13ea777f4f',
    description: 'Department identifier.',
  })
  id: string;

  @ApiProperty({
    example: 'DEPT-001',
    description: 'Oracle Fusion department identifier.',
  })
  oracleId: string;

  @ApiProperty({
    example: 'Information Technology',
    description: 'Department name.',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'IT',
    nullable: true,
    description: 'Department code.',
  })
  code?: string | null;

  @ApiPropertyOptional({
    example: '46ef17b0-eda7-49aa-8be7-bb13ea777f4f',
    nullable: true,
    description: 'Identifier of the department manager.',
  })
  managerId?: string | null;
}
