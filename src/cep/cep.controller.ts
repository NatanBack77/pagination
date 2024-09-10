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
  @UseGuards(AuthGuard)
  @Get(':cep')
  async getAll(@Param('cep') cep: string) {
    const validatorExists = await this.cepService.findGetCepByDB(cep);
    if (!validatorExists) {
      const validator = await this.cepService.findGetByCep(cep);

      if (validator.status === 400) {
        const validator2 = await this.cepService.findGetByCep2(cep);
        if (validator2.status === 400) {
          const validator3 = await this.cepService.findGetByCep3(cep);
          if (validator3.status === 400) {
            throw new BadRequestException('Cep Inválido');
          }
          const response = validator3.data;
          const CepResponse = {
            cep: response.cep,
            logradouro: response.logradouro,
            complemento: response.complemento,
            bairro: response.bairro,
            localidade: response.localidade,
            uf: response.uf,
          };
          return CepResponse;
        }
        const response = validator2.data;
        const CepResponse = {
          cep: response.cep,
          logradouro: response.logradouro,
          complemento: response.cidade,
          bairro: response.bairro,
          localidade: response.localidade,
          uf: response.estado,
        };
        return CepResponse;
      }
      const response = validator.data;
      const CepResponse = {
        cep: response.cep,
        logradouro: response.logradouro,
        complemento: response.complemento,
        bairro: response.bairro,
        localidade: response.localidade,
        uf: response.uf,
      };
      return CepResponse;
    }
    return validatorExists
  }
}
