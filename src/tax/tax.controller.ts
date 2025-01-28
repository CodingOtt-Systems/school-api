import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { TaxService } from './tax.service';
  import { CreateTaxDto, UpdateTaxDto } from './tax.dto';
  import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
  
  @Controller('tax')
  export class TaxController {
    constructor(private readonly taxService: TaxService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    createTax(@Body() createTaxDto: CreateTaxDto, @Req() req: AuthenticatedRequest) {
      return this.taxService.createTax(createTaxDto, req);
    }
  
    @Get()
    @UseGuards(AuthGuard)
    fetchTaxes(@Req() req: AuthenticatedRequest) {
      return this.taxService.fetchTaxes(req);
    }
  
    @Get(':id')
    @UseGuards(AuthGuard)
    fetchTaxById(@Param('id') id: string) {
      return this.taxService.fetchTaxById(id);
    }
  
    @Put(':id')
    @UseGuards(AuthGuard)
    updateTax(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
      return this.taxService.updateTax(id, updateTaxDto);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteTax(@Param('id') id: string) {
      return this.taxService.deleteTax(id);
    }
  }