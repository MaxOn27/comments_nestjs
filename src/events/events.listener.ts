import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Comment } from '../comments/entities/comment.entity';

@Injectable()
export class EventsListener {
  @OnEvent('comment.saved')
  handleCommentSaved(comment: Comment) {
    console.log(`Received a new comment: ${comment.comment}`);
  }
}
