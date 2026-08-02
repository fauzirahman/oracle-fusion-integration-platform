import { SyncUpsertRepository } from './sync-upsert.repository';

export interface SyncProcessorOptions<TOracle, TEntity> {
  /**
   * Data dari Oracle yang akan diproses.
   */
  items: TOracle[];

  /**
   * Repository tujuan (Prisma).
   */
  repository: SyncUpsertRepository<TEntity>;

  /**
   * Mapping Oracle DTO menjadi entity/input Prisma.
   */
  mapper(item: TOracle): TEntity;

  /**
   * Mengambil Oracle ID untuk proses upsert.
   */
  getOracleId(item: TOracle): string;
}
