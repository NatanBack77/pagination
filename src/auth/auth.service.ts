import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { sub: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: JwtConstants.secret,
    });
  }
}
