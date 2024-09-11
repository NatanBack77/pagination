import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserAuth {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
