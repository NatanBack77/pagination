import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class User {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class GetIdUser {
  @IsUUID()
  id: string;
}
