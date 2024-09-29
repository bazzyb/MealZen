import { ColumnsType, Schema, Table, column } from "@powersync/react-native";

const bookSchema: ColumnsType = {
  // id column (text) is automatically included
  user_id: column.text,
  name: column.text,
};
export const BOOK_TABLE = "book";

const mealSchema: ColumnsType = {
  // id column (text) is automatically included
  user_id: column.text,
  name: column.text,
  is_simple: column.integer,
  is_overnight: column.integer,
  is_long_prep: column.integer,
  is_long_cook: column.integer,
  recipe_url: column.text,
  book_id: column.text,
  page: column.integer,
};
export const MEAL_TABLE = "meal";

const mealplanSchema: ColumnsType = {
  // id column (text) is automatically included
  user_id: column.text,
  meal_id: column.text,
  date: column.text,
  notes: column.text,
};
export const MEALPLAN_TABLE = "mealplan";

const book = new Table(bookSchema, { indexes: {}, viewName: BOOK_TABLE });
const meal = new Table(mealSchema, { indexes: {}, viewName: MEAL_TABLE });
const mealplan = new Table(mealplanSchema, { indexes: {}, viewName: MEALPLAN_TABLE });
// const localBook = new Table(bookSchema, { indexes: {}, localOnly: true, viewName: "book" });
// const localMeal = new Table(mealSchema, { indexes: {}, localOnly: true, viewName: "meal" });
// const localMealplan = new Table(mealplanSchema, { indexes: {}, localOnly: true, viewName: "mealplan" });

export const appSchema = new Schema({
  book,
  meal,
  mealplan,
  // localBook,
  // localMeal,
  // localMealplan,
});

export type Database = (typeof appSchema)["types"];
export type BookRecord = Database["book"];
export type MealRecord = Database["meal"];
export type MealPlanRecord = Database["mealplan"];

/**
 * add tables called testMeal and testMealPlan
 */
