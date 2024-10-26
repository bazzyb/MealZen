import { BOOK_TABLE } from "../schemas/book";
import { MEAL_TABLE } from "../schemas/meal";

type Options = {
  mealId?: string;
  bookId?: string;
  // orderBy?: "meal";
};

function buildWhereClause(options: Options) {
  if (!options.mealId && !options.bookId) {
    return "";
  }

  let whereClause = "WHERE ";
  const conditions = [];

  if (options.mealId) {
    conditions.push(`${MEAL_TABLE}.id = '${options.mealId}'`);
  }

  if (options.bookId) {
    conditions.push(`${BOOK_TABLE}.id = '${options.bookId}'`);
  }

  return whereClause + conditions.join(" AND ");
}

export function buildMealQuery(options: Options) {
  let getMealQuery = `
    SELECT
    ${MEAL_TABLE}.*,
    book.name AS book,
    book.author AS author
    FROM ${MEAL_TABLE}
    JOIN ${BOOK_TABLE} ON ${BOOK_TABLE}.id = ${MEAL_TABLE}.book_id
    ${buildWhereClause(options)}
    ORDER BY name ASC
  `;
  // ORDER BY ${options.orderBy || "meal"} ASC

  return getMealQuery;
}
