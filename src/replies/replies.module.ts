import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Comment])],
  controllers: [RepliesController],
  providers: [RepliesService, CommentsService],
})
export class RepliesModule {}
