import { Body, Inject, Injectable } from "@nestjs/common";
import { CreateReplyDto } from './dto/create-reply.dto';
import { Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(@Body() createReplyDto: CreateReplyDto) {
    await this.cacheManager.del('comments');
    await this.cacheManager.del('replies');
    await this.replyRepository.save(createReplyDto);
  }

  async findAll(): Promise<Reply[]> {
    return await this.replyRepository.find();
  }

  async remove(id: number) {
    await this.cacheManager.del('comments');
    await this.cacheManager.del('replies');
    return await this.replyRepository.delete(id);
  }
}
