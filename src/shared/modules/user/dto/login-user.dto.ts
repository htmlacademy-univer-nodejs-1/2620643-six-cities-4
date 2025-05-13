import { IsEmail, IsString } from 'class-validator';
import { CreateLoginUserMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: CreateLoginUserMessage.mail.invalidFormat })
  public mail!: string;

  @IsString({ message: CreateLoginUserMessage.password.invalidFormat })
  public password!: string;
}
