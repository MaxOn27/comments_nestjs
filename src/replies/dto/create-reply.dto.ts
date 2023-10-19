import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  reply: string;

  @IsNumber()
  commentId: number;
}
