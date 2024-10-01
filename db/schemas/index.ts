import { Schema, Table } from "@powersync/react-native";

import { BOOK_TABLE, bookSchema } from "./book";
import { MEAL_TABLE, mealSchema } from "./meal";
import { MEALPLAN_TABLE, mealplanSchema } from "./mealplan";

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
