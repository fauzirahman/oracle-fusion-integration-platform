export interface SyncUpsertRepository<TEntity> {
  findByOracleId(oracleId: string): Promise<TEntity | null>;

  upsert(entity: TEntity): Promise<TEntity>;
}
