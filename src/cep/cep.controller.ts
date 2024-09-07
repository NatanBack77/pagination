import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CepService } from './cep.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cep')
export class CepController {
  constructor(private cepService: CepService) {}
  @UseGuards(AuthGuard)
  @Get(':cep')
  async getAll(@Req() req, @Param('cep') cep: string) {
    try {
      const validator = await this.cepService.findGetByCep(cep);
      if (validator.status === 404) {
        const validator2 = await this.cepService.findGetByCep2(cep);
        if (validator2.status === 404) {
          const validator3 = await this.cepService.findGetByCep3(cep);
          if (validator3.status === 404) {
            throw new BadRequestException('Cep Inválido');
          }
          return validator3;
        }
        return validator2;
      }
    } catch (err) {
      throw new BadRequestException('Cep inválido');
    }
  }
}
