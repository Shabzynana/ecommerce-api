import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue('authEmail') private readonly sendauthMail: Queue,
    @InjectQueue('orderEmail') private readonly sendorderMail: Queue
  ) {}

  private async addMailToQueue(queue: Queue, type: string, payload: any) {
    try {
      const job = await queue.add(type, payload, {
        attempts: 3,
        backoff: 5000,
      });

      this.logger.log(`📩 Email job queued [${type}] - Job ID: ${job.id}`);
      return job.id;
    } catch (error) {
      this.logger.error('Failed to add email job to queue', error.stack);
      throw error;
    }
  }

  async addAuthMailToQueue(type: string, payload: any) {
    return this.addMailToQueue(this.sendauthMail, type, payload);
  }

  async addOrderMailToQueue(type: string, payload: any) {
    return this.addMailToQueue(this.sendorderMail, type, payload);
  }

}


