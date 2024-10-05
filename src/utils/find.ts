import { BookRecord } from "@/db/schemas/book";
import { MealRecord } from "@/db/schemas/meal";

export function findBookInArray(bookId: string, books: BookRecord[]) {
  return books.find(b => b.id === bookId);
}

export function findMealInArray(mealId: string, meals: MealRecord[]) {
  return meals.find(m => m.id === mealId);
}
