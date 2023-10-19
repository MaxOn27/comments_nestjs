import { Controller, Get, Post, Body } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('reply')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post('create')
  create(@Body() createReplyDto: CreateReplyDto) {
    return this.repliesService.create(createReplyDto);
  }

  @Get('all')
  async findAll() {
    return await this.repliesService.findAll();
  }
}
