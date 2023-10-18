import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsString()
  // @IsNotEmpty()
  // comment: string;
}
