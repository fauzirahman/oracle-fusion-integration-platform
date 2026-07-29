import { EmployeeQueryDto } from '../dto/employee-query.dto';
import { OracleQueryBuilder } from '../../oracle/builders/oracle-query.builder';

export class EmployeeQueryMapper {
  static build(query: EmployeeQueryDto = {}): OracleQueryBuilder {
    const builder = new OracleQueryBuilder();

    builder.onlyData();

    if (query.limit !== undefined) {
      builder.limit(query.limit);
    }

    if (query.offset !== undefined) {
      builder.offset(query.offset);
    }

    if (query.fields?.length) {
      builder.fields(...query.fields);
    }

    if (query.expand?.length) {
      builder.expand(...query.expand);
    }

    if (query.personNumber) {
      builder.where('PersonNumber', query.personNumber);
    }

    if (query.email) {
      builder.where('WorkEmail', query.email);
    }

    if (query.search) {
      builder.where('DisplayName', query.search);
    }

    return builder;
  }
}
