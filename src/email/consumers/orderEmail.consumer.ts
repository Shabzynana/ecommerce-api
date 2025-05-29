import { Processor, WorkerHost} from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import { CONSTANT } from 'src/common/constants';
import { ORDER_MAIL } from 'src/common/constants';

const { OrderQ} = CONSTANT;
const { orderPlaced, orderShipped, orderDelivered, orderCancelled } = ORDER_MAIL

@Processor(OrderQ)
export class OrderConsumer extends WorkerHost {
  constructor(private readonly mailer: MailerService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    await this.handleEmail(job, OrderQ);
  }

  private async handleEmail(job: Job, queueName: string) {

    const validJobs = [orderPlaced, orderShipped, orderDelivered, orderCancelled];
    if (validJobs.includes(job.name)) {
      await this.sendMail(job);
    } else {
      console.warn(`⚠️ [${queueName}] Unhandled job: ${job.name}`);
    }
  }

  private async sendMail(job: Job) {
    try {
      await this.mailer.sendMail({
        from: job.data.from,
        to: job.data.to,
        subject: job.data.subject,
        html: job.data.html
      });
      console.log({
        'Job ID:': job.id, 
        '✅ Mail sent to:': job.data.to, 
        'Job Name:': job.name
      });
    } catch (err) {
      console.error('❌ Failed to send mail:', err);
    }
  }
  
}
