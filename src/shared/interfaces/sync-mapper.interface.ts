export interface SyncMapper<TSource, TTarget> {
  map(source: TSource): TTarget;
}