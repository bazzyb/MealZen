import { Schema, Table } from "@powersync/react-native";

import { BOOK_TABLE, bookSchema } from "./book";
import { MEAL_TABLE, mealSchema } from "./meal";
import { MEALPLAN_TABLE, mealplanSchema } from "./mealplan";

const book = new Table(bookSchema, { indexes: {}, viewName: BOOK_TABLE });
const meal = new Table(mealSchema, { indexes: {}, viewName: MEAL_TABLE });
const mealplan = new Table(mealplanSchema, { indexes: {}, viewName: MEALPLAN_TABLE });

export const schema = new Schema({
  book,
  meal,
  mealplan,
});
