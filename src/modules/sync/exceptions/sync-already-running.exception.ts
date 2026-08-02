import { ConflictException } from '@nestjs/common';

export class SyncAlreadyRunningException extends ConflictException {
  constructor(syncName: string) {
    super({
      statusCode: 409,
      error: 'Synchronization Already Running',
      message: `"${syncName}" synchronization is already running.`,
    });
  }
}
