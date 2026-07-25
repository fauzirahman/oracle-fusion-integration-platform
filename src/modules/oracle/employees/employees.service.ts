import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  async findAll() {
    return [
      {
        personNumber: '1001',
        displayName: 'John Smith',
        email: 'john.smith@example.com',
        department: 'IT',
      },
      {
        personNumber: '1002',
        displayName: 'Jane Doe',
        email: 'jane.doe@example.com',
        department: 'Finance',
      },
    ];
  }
}
