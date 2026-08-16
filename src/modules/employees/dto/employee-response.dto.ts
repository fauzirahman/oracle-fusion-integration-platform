import { ApiProperty } from '@nestjs/swagger';

export class EmployeeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Employee identifier.',
  })
  id: number;

  @ApiProperty({
    example: '10001',
    description: 'Employee number.',
  })
  employeeNumber: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Employee full name.',
  })
  fullName: string;

  @ApiProperty({
    example: 'John',
    description: 'Employee first name.',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Employee last name.',
  })
  lastName: string;

  @ApiProperty({
    example: 'IT Department',
    description: 'Employee department.',
  })
  department: string;

  @ApiProperty({
    example: 'Corporate',
    description: 'Employee business unit.',
  })
  businessUnit: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'Employee job title.',
  })
  job: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Employee email address.',
  })
  email: string;
}
