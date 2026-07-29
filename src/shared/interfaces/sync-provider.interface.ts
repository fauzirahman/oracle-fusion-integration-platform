export interface SyncProvider<TSource> {
  findAll(): Promise<TSource[]>;
}