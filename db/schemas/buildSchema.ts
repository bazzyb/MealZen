import { Schema, Table } from "@powersync/react-native";

import { BOOK_TABLE, bookSchema } from "./book";
import { MEAL_TABLE, mealSchema } from "./meal";
import { MEALPLAN_TABLE, mealplanSchema } from "./mealplan";

export function buildSchema(isSynced: boolean) {
  const getSyncedTableName = (table: string): string => {
    if (isSynced) {
      return table;
    } else {
      return `inactive_synced_${table}`;
    }
  };

  const getLocalTableName = (table: string): string => {
    if (isSynced) {
      return `inactive_local_${table}`;
    } else {
      return table;
    }
  };

  const book = new Table(bookSchema, { indexes: {}, viewName: getSyncedTableName(BOOK_TABLE) });
  const local_book = new Table(bookSchema, {
    indexes: {},
    localOnly: true,
    viewName: getLocalTableName(BOOK_TABLE),
  });

  const meal = new Table(mealSchema, { indexes: {}, viewName: getSyncedTableName(MEAL_TABLE) });
  const local_meal = new Table(mealSchema, {
    indexes: {},
    localOnly: true,
    viewName: getLocalTableName(MEAL_TABLE),
  });

  const mealplan = new Table(mealplanSchema, { indexes: {}, viewName: getSyncedTableName(MEALPLAN_TABLE) });
  const local_mealplan = new Table(mealplanSchema, {
    indexes: {},
    localOnly: true,
    viewName: getLocalTableName(MEALPLAN_TABLE),
  });

  return new Schema({
    book,
    local_book,
    meal,
    local_meal,
    mealplan,
    local_mealplan,
  });
}
