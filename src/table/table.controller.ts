import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  GetIdTable,
  PageTableDTO,
  TableDTO,
} from './dtos/query-params-table.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async findAllTable(@Query() query: PageTableDTO) {
    const { orderByField, orderDirection } = query;

    if (Boolean(orderDirection)) {
      console.log('É true');
    } else {
      console.log('É false');
    }
    console.log('orderDirection', query);
    console.log('size', query.size);
    if (query.orderByField) {
      const campos = ['id', 'title', 'description'];
      if (!campos.includes(orderByField)) {
        throw new BadRequestException('campo não existe');
      }
    }
    const items = await this.tableService.findAllTable(query);
    const { response, totalItems } = items;

    const hasMore = response.length >= query.size;
    if (hasMore && response.length > 10) response.pop();

    const totalPages = Math.ceil(totalItems / query.size);
    return {
      data: response,
      page: query.page +1,
      size: response.length,
      hasMore,
      totalPages,
    };
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateTable(@Param() param: GetIdTable, @Body() data: TableDTO) {
    await this.tableService.updateItemOfTheTable(param.id, data);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTable(@Param() param: GetIdTable) {
    await this.tableService.deleteItemOfTheItem(param.id);
  }
}
