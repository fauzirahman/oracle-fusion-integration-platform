import { Injectable } from '@nestjs/common';
import { OracleClientService } from '../oracle/client/oracle-client.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly oracleClient: OracleClientService) {}

  async findAll() {
    return this.oracleClient.get('/hcmRestApi/resources/latest/workers');
  }

  async findById(id: string) {
    return this.oracleClient.get(`/hcmRestApi/resources/latest/workers/${id}`);
  }
}
