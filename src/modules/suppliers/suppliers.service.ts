import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SupplierMapper } from './mappers/supplier.mapper';
import { SupplierRepository } from './repositories/supplier.repository';
import { SupplierResponseDto } from './dto/supplier-response.dto';

interface SupplierFindAllOptions {
  limit: number;
  offset: number;
}

@Injectable()
export class SuppliersService {
  constructor(
    private readonly repository: SupplierRepository,
  ) {}

  async findAll(
    options: SupplierFindAllOptions = {
      limit: 10,
      offset: 0,
    },
  ) {
    const {
      limit = 10,
      offset = 0,
    } = options;

    const [suppliers, total] =
      await Promise.all([
        this.repository.findAll({
          limit,
          offset,
        }),
        this.repository.count(),
      ]);

    const data =
      SupplierMapper.toResponseList(suppliers);

    return {
      success: true,
      message:
        'Suppliers retrieved successfully.',
      data,
      meta: {
        total,
        limit,
        offset,
        page:
          Math.floor(offset / limit) + 1,
        hasMore:
          offset + data.length < total,
      },
    };
  }

  async findById(
    id: string,
  ): Promise<SupplierResponseDto> {
    const supplier =
      await this.repository.findById(id);

    if (!supplier) {
      throw new NotFoundException(
        `Supplier with id '${id}' not found.`,
      );
    }

    return SupplierMapper.toResponse(supplier);
  }
}
