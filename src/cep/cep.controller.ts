import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CepService } from './cep.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cep')
export class CepController {
  constructor(private cepService: CepService) {}
  // @UseGuards(AuthGuard)
  @Get(':cep')
  async getAll(@Param('cep') cep: string) {
    const validator = await this.cepService.findGetByCep(cep);

    if (validator.status === 400) {
      const validator2 = await this.cepService.findGetByCep2(cep);

      if (validator2.status === 400) {
        const validator3 = await this.cepService.findGetByCep3(cep);

        if (validator3.status === 400) {
          throw new BadRequestException('Cep Inválido');
        }

        return validator3.data;
      }

      return validator2.data;
    }

    return validator.data;
  }
}
