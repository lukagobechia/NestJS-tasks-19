import { PartialType } from '@nestjs/mapped-types';
import { CreateExpensesDto } from './create-expenses.dto';
export class UpdateExpenseDto extends PartialType(CreateExpensesDto) {}
