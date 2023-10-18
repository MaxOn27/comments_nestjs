import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { BullModule } from '@nestjs/bull';
import { EventsService } from '../events/events.service';
import { EventsListener } from '../events/events.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    BullModule.registerQueue({
      name: 'comment-queue',
    }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, EventsService, EventsListener],
  exports: [CommentsService],
})
export class CommentsModule {}
