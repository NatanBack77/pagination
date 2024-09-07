import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
const url = 'https://viacep.com.br/ws/{cep}/json';
const url2 = 'https://api.brasilaberto.com/v1/zipcode/{cep}';
const url3 = 'https://opencep.com/v1/{cep}';
@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}
  async findGetByCep(cep: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(url.replace('{cep}', cep))
      .then((result) => {
        return {
          data: result.data,
          status: result.status,
          statusText: result.statusText, // Adicione essa propriedade
          headers: result.headers, // Adicione essa propriedade
          config: result.config, // Adicione essa propriedade
        };
      })
      .catch(() => {
        throw new BadRequestException('Cep Inválido');
      });
  }
  async findGetByCep2(cep2: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(url2.replace('{cep}', cep2))
      .then((result) => {
        return {
          data: result.data,
          status: result.status,
        };
      })
      .catch((err) => {
        return err;
      });
  }
  async findGetByCep3(cep3: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(url3.replace('{cep}', cep3))
      .then((result) => {
        return {
          data: result.data,
          status: result.status,
        };
      })
      .catch((err) => {
        return err;
      });
  }
}
