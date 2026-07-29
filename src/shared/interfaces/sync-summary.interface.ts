export interface SyncSummary {
  entity: string;

  processed: number;

  created: number;

  updated: number;

  failed: number;

  startedAt: Date;

  finishedAt: Date;

  duration: number;
}