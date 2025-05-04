import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue('mail') private readonly sendMail: Queue
  ) {}

  async addMailToQueue(type: string, payload: any) {
    try {
      const job = await this.sendMail.add(type, payload, {
        attempts: 1,
        backoff: 5000,
      });

      this.logger.log(`📩 Email job queued [${type}] - Job ID: ${job.id}`);
      return job.id;
    } catch (error) {
      this.logger.error('Failed to add email job to queue', error.stack);
      throw error;
    }
  }
}


