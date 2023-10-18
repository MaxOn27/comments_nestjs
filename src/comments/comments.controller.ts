import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { EventsService } from '../events/events.service';

@Controller()
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly eventsService: EventsService,
  ) {}

  @Post('newComment')
  async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentsService.create(createCommentDto);
    await this.eventsService.emitCommentSavedEvent(newComment);
    return newComment;
  }

  @CacheKey('comments')
  @CacheTTL(30)
  @UseInterceptors(CacheInterceptor)
  @Get('comments')
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.update(+id, updateCommentDto);
  }

  @Delete('comment/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
