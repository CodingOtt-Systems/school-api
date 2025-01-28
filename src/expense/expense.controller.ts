import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseGuards(AuthGuard)
  createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req: AuthenticatedRequest) {
    return this.expenseService.createExpense(createExpenseDto, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  fetchExpenses(@Req() req: AuthenticatedRequest, @Query() page: number = 1, @Query() limit: number = 12) {
    return this.expenseService.fetchExpenses(req, page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  fetchExpenseById(@Param('id') id: string) {
    return this.expenseService.fetchExpenseById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(id, updateExpenseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteExpense(@Param('id') id: string) {
    return this.expenseService.deleteExpense(id);
  }
}
