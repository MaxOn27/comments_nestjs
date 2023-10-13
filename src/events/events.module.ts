import { Module } from '@nestjs/common';
import { EventsListener } from './events.listener';
import { EventsService } from './events.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [EventsService, EventsListener],
  exports: [EventsService],
})
export class EventsModule {}
