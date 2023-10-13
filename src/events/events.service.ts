import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitCommentSavedEvent(comment: CreateCommentDto) {
    this.eventEmitter.emit('comment.saved', comment);
  }
}