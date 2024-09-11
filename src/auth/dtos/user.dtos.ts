import { IsNotEmpty, IsString, IsUUID, IsEmail } from 'class-validator';

export class UserAuth {
  @IsUUID()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
