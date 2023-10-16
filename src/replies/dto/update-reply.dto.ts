import { PartialType } from '@nestjs/mapped-types';
import { CreateReplyDto } from './create-reply.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
