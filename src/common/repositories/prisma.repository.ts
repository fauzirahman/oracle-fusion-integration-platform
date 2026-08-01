import { PrismaService } from '../../database';

export abstract class PrismaRepository {
  constructor(protected readonly prisma: PrismaService) {}
}