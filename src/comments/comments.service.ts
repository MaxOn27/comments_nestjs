import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('comment-queue') private queue: Queue,
  ) {
  }

  async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentsRepository.save(createCommentDto);
    const comments = await this.commentsRepository.find();
    this.cacheManager.del('comments');
    this.cacheManager.set('comments', comments);
    this.queue.add('comment', newComment);
    return newComment;
  }

  async findAll() {
    const cachedData = await this.cacheManager.get('comments');
    if (cachedData) {
      return cachedData;
    }
    const comments = await this.commentsRepository.find();
    await this.cacheManager.set('comments', comments);
    return comments;
  }

  findOne(id: number) {
    return this.commentsRepository.findOneBy({ id });
  }

  async update(id: number, @Body() updateCommentDto: UpdateCommentDto) {
    await this.cacheManager.del('comments');
    return this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    await this.cacheManager.del('comments');
    return await this.commentsRepository.delete(id);
  }
}
