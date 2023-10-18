import { Body, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
// import { UpdateReplyDto } from './dto/update-reply.dto';
import { Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { CommentsService } from '../comments/comments.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    private readonly commentService: CommentsService,
  ) {}

  async create(commentId: number, @Body() createReplyDto: CreateReplyDto) {
    if (!commentId) {
      return;
    }
    const comment = await this.commentService.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const reply = this.replyRepository.create({
      ...createReplyDto,
      comment,
    });

    await this.replyRepository.save(reply);

    return reply;
  }

  findAll() {
    return `This action returns all replies`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} reply`;
  // }

  // update(id: number, updateReplyDto: UpdateReplyDto) {
  //   return `This action updates a #${id} reply`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} reply`;
  // }
}
