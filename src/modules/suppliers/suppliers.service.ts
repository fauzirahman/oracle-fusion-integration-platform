import { Injectable, NotFoundException } from '@nestjs/common';

import { SupplierMapper } from './mappers/supplier.mapper';
import { SupplierRepository } from './repositories/supplier.repository';

@Injectable()
export class SuppliersService {
  constructor(private readonly repository: SupplierRepository) {}

  async findAll() {
    const suppliers = await this.repository.findAll();

    return SupplierMapper.toResponseList(suppliers);
  }

  async findById(id: string) {
    const supplier = await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(`Supplier with id '${id}' not found.`);
    }

    return SupplierMapper.toResponse(supplier);
  }
}
