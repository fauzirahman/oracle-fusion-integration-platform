import { EmployeeRepository } from '../../src/modules/employees/repositories/employee.repository';
import { createPrismaMock } from '../mocks/prisma.mock';

describe('EmployeeRepository', () => {
  let repository: EmployeeRepository;
  const prisma = createPrismaMock();

  beforeEach(() => {
    repository = new EmployeeRepository(prisma as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return employees', async () => {
    prisma.employee.findMany.mockResolvedValue([]);

    await repository.findAll();

    expect(prisma.employee.findMany).toHaveBeenCalled();
  });
});
