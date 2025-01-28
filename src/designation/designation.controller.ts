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
    Query,
  } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { CreateDesignationDto, UpdateDesignationDto } from './designation.dto';
import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
  
@Controller('designation')
export class DesignationController {
    constructor(private readonly designationService: DesignationService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    createDesignation(@Body() body: CreateDesignationDto, @Req() req: AuthenticatedRequest) {
      return this.designationService.createDesignation(body, req);
    }
  
    @Get()
    @UseGuards(AuthGuard)
    fetchDesignations(@Req() req: AuthenticatedRequest, @Query('page') page:number = 1, @Query('limit') limit:number = 12) {
      return this.designationService.fetchDesignations(req, page, limit);
    }
  
    @Get(':id')
    @UseGuards(AuthGuard)
    fetchDesignationById(@Param('id') id: string) {
      return this.designationService.fetchDesignationById(id);
    }
  
    @Put(':id')
    @UseGuards(AuthGuard)
    updateDesignation(
      @Param('id') id: string,
      @Body() updateDesignationDto: UpdateDesignationDto,
    ) {
      return this.designationService.updateDesignation(id, updateDesignationDto);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteDesignation(@Param('id') id: string) {
      return this.designationService.deleteDesignation(id);
    }
}
  