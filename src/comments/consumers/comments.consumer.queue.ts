import { Processor, OnQueueActive, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('comment-queue')
export class CommentsConsumerQueue {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
