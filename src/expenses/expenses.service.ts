import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpensesDto } from './DTOs/create-expenses.dto';
import { UpdateExpenseDto } from './DTOs/update-expenses.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'New Year',
      productName: 'Christmas tree',
      quantity: 15,
      price: 548,
      totalPrice: 0,
    },
    {
      id: 2,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      totalPrice: 0,
    },
  ];
  constructor() {
    this.expenses = this.expenses.map((expense) => ({
      ...expense,
      totalPrice: this.calculateTotalPrice(expense.price, expense.quantity),
    }));
  }
  calculateTotalPrice(price: number, quantity: number): number {
    return price * quantity;
  }

  getAllExpenses() {
    return this.expenses;
  }
  getExpenseById(id: number) {
    const expense = this.expenses.find((el) => el.id === id);
    if (!expense)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);

    return expense;
  }
  createExpense(body: CreateExpensesDto) {
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      category: body.category,
      productName: body.productName,
      quantity: body.quantity,
      price: body.price,
      totalPrice: body.price * body.quantity,
    };
    this.expenses.push(newExpense);

    return newExpense;
  }
  deleteExpense(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    const deletedExpense = this.expenses.splice(index, 1);
    return ['Deleted succesfully', deletedExpense];
  }
  updateExpense(id: number, body: UpdateExpenseDto) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    this.expenses[index] = {
      id: this.expenses[index].id,
      category: body.category || this.expenses[index].category,
      productName: body.productName || this.expenses[index].productName,
      quantity: body.quantity || this.expenses[index].quantity,
      price: body.price || this.expenses[index].price,
      totalPrice: body.price * body.quantity || this.expenses[index].totalPrice,
    };
    return ['Expense updated', this.expenses[index]];
  }
}
