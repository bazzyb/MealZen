import { BOOK_TABLE } from "../schemas/book";
import { MEAL_TABLE } from "../schemas/meal";

export type MealTableFilters = {
  mealId?: string;
  bookId?: string;
  find?: string;
  // orderBy?: "meal";
};

function buildWhereClause(options: MealTableFilters) {
  if (Object.values(options).every(value => !value)) {
    return "";
  }

  let whereClause = "WHERE ";
  const conditions = [];

  if (options.find) {
    conditions.push(`LOWER(${MEAL_TABLE}.name) LIKE '%' || ? || '%'`);
  }

  if (options.mealId) {
    conditions.push(`${MEAL_TABLE}.id = '${options.mealId}'`);
  }

  if (options.bookId) {
    conditions.push(`${BOOK_TABLE}.id = '${options.bookId}'`);
  }

  return whereClause + conditions.join(" AND ");
}

export function buildMealQuery(options: MealTableFilters) {
  let getMealQuery = `
    SELECT
    ${MEAL_TABLE}.*,
    book.name AS book,
    book.author AS author
    FROM ${MEAL_TABLE}
    LEFT JOIN ${BOOK_TABLE} ON ${BOOK_TABLE}.id = ${MEAL_TABLE}.book_id
    ${buildWhereClause(options)}
    ORDER BY name ASC
  `;
  // ORDER BY ${options.orderBy || "meal"} ASC

  return getMealQuery;
}
