export interface SyncRepository<TEntity> {
  upsert(entity: TEntity): Promise<TEntity>;
}
