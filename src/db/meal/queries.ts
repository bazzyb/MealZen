import { BOOK_TABLE } from "../book/schema";
import { convertMealsToCustomMeals } from "../mealplan/queries";
import { AbstractPowerSyncDatabase } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";

import { MEAL_TABLE, MealRecord } from "./schema";

export type MealTableFilters = {
  mealId?: string;
  bookId?: string;
  find?: string;
};

// Overwrites the local-only owner_id value with the logged-in user's id.
export const mealTableLocalToSyncStatement = `
  INSERT INTO ${MEAL_TABLE} (
    id, user_id, name, is_simple, is_overnight, is_long_prep, is_long_cook, recipe_url, book_id, page
  )
  SELECT id, ?, name, is_simple, is_overnight, is_long_prep, is_long_cook, recipe_url, book_id, page
  FROM inactive_local_${MEAL_TABLE}
`;

export type CreateMealValues = {
  name: string;
  bookId?: string;
  page?: number;
};

export async function createMeal(values: CreateMealValues, db: AbstractPowerSyncDatabase, userId?: string) {
  const { name, bookId, page } = values;

  const res = await db.execute(
    `INSERT INTO ${MEAL_TABLE} (
    id, name, user_id, book_id, page, is_simple, is_overnight, is_long_prep, is_long_cook)
    VALUES (uuid(), ?, ?, ?, ?, 0, 0, 0, 0)
    RETURNING *`,
    [name, userId || LOCAL_USER_ID, bookId || null, page || null],
  );

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not create meal");
  }
  return resultRecord;
}

export function getMealsWithoutJoin(db: AbstractPowerSyncDatabase, skipMealIds?: Array<string>) {
  let query = `SELECT * FROM ${MEAL_TABLE}`;
  if (skipMealIds?.length) {
    const idString = skipMealIds.map(id => `'${id}'`).join(", ");
    query += ` WHERE id NOT IN (${idString})`;
  }
  query += " ORDER BY name ASC";
  return db.getAll<MealRecord>(query, skipMealIds || []);
}

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

export function buildGetManyMealsQuery(options: MealTableFilters) {
  return `
    SELECT
    ${MEAL_TABLE}.*,
    book.name AS book,
    book.author AS author
    FROM ${MEAL_TABLE}
    LEFT JOIN ${BOOK_TABLE} ON ${BOOK_TABLE}.id = ${MEAL_TABLE}.book_id
    ${buildWhereClause(options)}
    ORDER BY LOWER(meal.name) ASC
  `;
}

export async function getMealIdsForBookId(bookId: string, db: AbstractPowerSyncDatabase, userId?: string) {
  const res = await db.getAll<{ id: string }>(
    `
    SELECT id FROM meal
    WHERE book_id = ? AND user_id = ?
  `,
    [bookId, userId || LOCAL_USER_ID],
  );

  return res.map(row => row.id);
}

export async function updateMeal(meal: Omit<MealRecord, "user_id">, db: AbstractPowerSyncDatabase, userId?: string) {
  const updateQuery = `
    UPDATE ${MEAL_TABLE}
    SET 
      name = ?,
      recipe_url = ?,
      book_id = ?,
      page = ?,
      is_simple = ?,
      is_overnight = ?,
      is_long_cook = ?,
      is_long_prep = ?
    WHERE id = ? AND user_id = ?
    RETURNING *
  `;

  const res = await db.execute(updateQuery, [
    meal.name,
    meal.recipe_url || null,
    meal.book_id || null,
    meal.page || null,
    meal.is_simple,
    meal.is_overnight,
    meal.is_long_cook,
    meal.is_long_prep,
    meal.id,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update meal");
  }
  return resultRecord;
}

export async function deleteManyMeals(mealIds: Array<string>, db: AbstractPowerSyncDatabase, userId?: string) {
  await convertMealsToCustomMeals(mealIds, db, userId);
  await db.executeBatch(
    `DELETE FROM ${MEAL_TABLE}
    WHERE id = ? AND user_id = ?`,
    mealIds.map(mealId => [mealId, userId || LOCAL_USER_ID]),
  );
}
