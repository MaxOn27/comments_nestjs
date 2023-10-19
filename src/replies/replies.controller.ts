import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
// import { UpdateReplyDto } from './dto/update-reply.dto';

@Controller('comments/:commentId')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post('newReply')
  create(
    @Param('commentId') commentId: number,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    return this.repliesService.create(commentId, createReplyDto);
  }

  @Get('replies')
  async findAll() {
    return await this.repliesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.repliesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
  //   return this.repliesService.update(+id, updateReplyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.repliesService.remove(+id);
  // }
}
