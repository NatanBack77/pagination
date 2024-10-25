import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsStrongerPassword } from 'src/common/validators/stronger-password.validator';

export class User {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongerPassword()
  @IsString()
  password: string;
}
export class GetIdUser {
  @ApiProperty()
  @IsUUID()
  id: string;
}

//common/validators/stronger-password.validator.ts
