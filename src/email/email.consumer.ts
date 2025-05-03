import { Processor, WorkerHost} from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('mail')
export class EmailConsumer extends WorkerHost {
  constructor(private readonly mailer: MailerService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any>  {

    switch (job.name) {
      case 'confirmEmail':
        await this.handleEmail(job);
        break;
      case 'welcomeEmail':
        await this.handleEmail(job);
        break;  
      default:
        console.warn(`Unhandled job: ${job.name}`);  
    }
    
  }

  private async handleEmail(job: Job) {
    try {
      await this.mailer.sendMail({   
        to: job.data.to,
        subject: job.data.subject,
        html: job.data.html
      });
      console.log({'Job ID:': job.id, '✅ Mail sent to:': job.data.to, 'Job Name:': job.name});
    } catch (err) {
      console.error('❌ Failed to send mail:', err);
    }
  }
  
}
