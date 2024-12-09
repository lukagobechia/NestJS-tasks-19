import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseDto } from './DTOs/update-expenses.dto';
import { CreateExpensesDto } from './DTOs/create-expenses.dto';
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
  @Get()
  getAllExpenses() {
    return this.expensesService.getAllExpenses();
  }
  @Get(':id')
  getExpenseById(@Param() params) {
    const id = Number(params.id);
    return this.expensesService.getExpenseById(id);
  }
  @Post()
  createExpense(@Body() body: CreateExpensesDto) {
    return this.expensesService.createExpense(body);
  }
  @Delete(':id')
  deleteExpense(@Param() params) {
    const id = Number(params.id);

    return this.expensesService.deleteExpense(id);
  }
  @Put(':id')
  updateExpense(@Param() params, @Body() body: UpdateExpenseDto) {
    const id = Number(params.id);
    return this.expensesService.updateExpense(id, body);
  }
}
