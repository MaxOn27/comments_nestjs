import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply, Comment]),
    BullModule.registerQueue({
      name: 'comment-queue',
    }),
  ],
  controllers: [RepliesController],
  providers: [RepliesService, CommentsService],
})
export class RepliesModule {}
