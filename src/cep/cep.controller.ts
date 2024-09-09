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
    const inicio = Date.now();
    const validator = await this.cepService.findGetByCep(cep);
    const tempoTotal = Date.now() - inicio;
    console.log(tempoTotal);
    if (validator.status === 400 || tempoTotal > 256) {
      console.log(tempoTotal);
      const inicio2 = Date.now();
      const validator2 = await this.cepService.findGetByCep2(cep);
      const tempoTotal2 = Date.now() - inicio2;
      if (validator2.status === 400 || tempoTotal2 >= 1000) {
        const inicio3 = Date.now();
        const validator3 = await this.cepService.findGetByCep3(cep);
        const tempoTotal3 = Date.now() - inicio3;
        if (validator3.status === 400 || tempoTotal3 >= 1000) {
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
}
