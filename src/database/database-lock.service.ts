import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Injectable()
export class DatabaseLockService {
  private readonly logger = new Logger(DatabaseLockService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Execute callback with PostgreSQL Advisory Lock.
   *
   * Only one process with the same lock name
   * can execute at a time.
   */
  async executeWithLock<T>(
    lockName: string,
    callback: () => Promise<T>,
  ): Promise<T> {
    const lockId = this.generateLockId(lockName);

    const acquired = await this.acquire(lockId);

    if (!acquired) {
      this.logger.warn(`Lock "${lockName}" is already acquired.`);

      throw new ConflictException({
        success: false,
        statusCode: 409,
        message: 'Synchronization is already running.',
        lockName,
      });
    }

    this.logger.log(`Lock acquired: ${lockName}`);

    try {
      return await callback();
    } finally {
      await this.release(lockId);
      this.logger.log(`Lock released: ${lockName}`);
    }
  }

  async acquire(lockId: bigint): Promise<boolean> {
    const result = await this.prisma.$queryRaw<
      Array<{ pg_try_advisory_lock: boolean }>
    >`
      SELECT pg_try_advisory_lock(${lockId})
    `;

    return result[0]?.pg_try_advisory_lock ?? false;
  }

  async release(lockId: bigint): Promise<void> {
    await this.prisma.$queryRaw`
      SELECT pg_advisory_unlock(${lockId})
    `;
  }

  /**
   * Convert lock name to bigint.
   *
   * PostgreSQL advisory lock accepts bigint.
   */
  generateLockId(name: string): bigint {
    let hash = BigInt(0);

    for (const ch of name) {
      hash =
        (hash * BigInt(31) + BigInt(ch.charCodeAt(0))) &
        BigInt('9223372036854775807');
    }

    return hash;
  }
}
