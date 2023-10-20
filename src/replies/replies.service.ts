import { Body, Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  async create(@Body() createReplyDto: CreateReplyDto) {
    await this.replyRepository.save(createReplyDto);
  }

  async findAll(): Promise<Reply[]> {
    return await this.replyRepository.find();
  }

  async remove(id: number) {
    return await this.replyRepository.delete(id);
  }
}
