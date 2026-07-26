import { ApiProperty } from '@nestjs/swagger';

export class EmployeeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  employeeNumber: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  businessUnit: string;

  @ApiProperty()
  job: string;

  @ApiProperty()
  email: string;
}
