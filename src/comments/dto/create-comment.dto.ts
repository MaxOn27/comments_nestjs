import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCommentDto {
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
