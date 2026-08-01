import { PrismaService } from '../../database/prisma.service';

export abstract class BaseRepository<
  TEntity,
  TCreate,
  TUpdate,
  TDelegate extends {
    findMany(args?: any): Promise<TEntity[]>;
    findUnique(args: any): Promise<TEntity | null>;
    create(args: any): Promise<TEntity>;
    update(args: any): Promise<TEntity>;
    delete(args: any): Promise<TEntity>;
  },
> {
  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly delegate: TDelegate,
  ) {}

  async findAll(orderBy?: Record<string, unknown>): Promise<TEntity[]> {
    return this.delegate.findMany({
      orderBy,
    });
  }

  async findById(id: string): Promise<TEntity | null> {
    return this.delegate.findUnique({
      where: { id },
    });
  }

  async create(data: TCreate): Promise<TEntity> {
    return this.delegate.create({
      data,
    });
  }

  async update(id: string, data: TUpdate): Promise<TEntity> {
    return this.delegate.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<TEntity> {
    return this.delegate.delete({
      where: { id },
    });
  }
}
