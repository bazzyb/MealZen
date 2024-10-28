import { BOOK_TABLE } from "../book/schema";
import { MEAL_TABLE } from "../meal/schema";
import { AbstractPowerSyncDatabase } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";

import { MEALPLAN_TABLE, Mealplan, MealplanRecord } from "./schema";

export type MealplanArray = {
  mealId: string;
  date: Date;
}[];

// Overwrites the local-only owner_id value with the logged-in user's id.
export const mealplanTableLocalToSyncStatement = `
  INSERT INTO ${MEALPLAN_TABLE} (id, user_id, meal_id, name, date, notes)
  SELECT id, ?, meal_id, name, date, notes
  FROM inactive_local_${MEALPLAN_TABLE}
`;

export async function createMealplan(meals: MealplanArray, db: AbstractPowerSyncDatabase, userId?: string) {
  await db.execute(`DELETE FROM ${MEALPLAN_TABLE} WHERE user_id = ?`, [userId || LOCAL_USER_ID]);
  await db.executeBatch(
    `INSERT INTO ${MEALPLAN_TABLE} 
    (id, user_id, meal_id, date)
    VALUES (uuid(), ?, ?, ?)
    RETURNING *`,
    meals.map(meal => [userId || LOCAL_USER_ID, meal.mealId, meal.date.toISOString()]),
  );
}

export const MealplanQuery = `
  SELECT
    ${MEALPLAN_TABLE}.*,
    ${MEAL_TABLE}.name AS meal,
    ${MEAL_TABLE}.is_simple AS "isSimple",
    ${MEAL_TABLE}.is_overnight AS "isOvernight",
    ${MEAL_TABLE}.is_long_prep AS "isLongPrep",
    ${MEAL_TABLE}.is_long_cook AS "isLongCook",
    ${MEAL_TABLE}.recipe_url AS "recipeUrl",
    ${MEAL_TABLE}.page,
    ${BOOK_TABLE}.name AS book,
    ${BOOK_TABLE}.author AS author
  FROM ${MEALPLAN_TABLE}
  LEFT JOIN ${MEAL_TABLE} ON ${MEAL_TABLE}.id = ${MEALPLAN_TABLE}.meal_id
  LEFT JOIN ${BOOK_TABLE} ON ${BOOK_TABLE}.id = ${MEAL_TABLE}.book_id
  ORDER BY date ASC
`;

export async function reorderMealplan(meals: Array<Mealplan>, db: AbstractPowerSyncDatabase) {
  const cases = meals
    .map(
      meal => `
      WHEN id = '${meal.id}' THEN '${meal.date}'
    `,
    )
    .join(" ");

  const ids = meals.map(meal => `'${meal.id}'`).join(", ");

  const query = `
    UPDATE mealplan
    SET date = CASE ${cases} END
    WHERE id IN (${ids});
  `;

  await db.execute(query);
}

export async function updateMealplanEntry(
  mealplanEntry: Omit<MealplanRecord, "user_id">,
  db: AbstractPowerSyncDatabase,
  userId?: string,
) {
  const updateQuery = `
    UPDATE ${MEALPLAN_TABLE}
    SET 
      meal_id = ?,
      name = ?,
      notes = ?
    WHERE id = ? AND user_id = ?
    RETURNING *
  `;

  const res = await db.execute(updateQuery, [
    mealplanEntry.meal_id || null,
    mealplanEntry.name || null,
    mealplanEntry.notes || null,
    mealplanEntry.id,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update mealplan entry");
  }
  return resultRecord;
}

export async function convertMealsToCustomMeals(
  mealIds: Array<string>,
  db: AbstractPowerSyncDatabase,
  userId?: string,
) {
  await db.executeBatch(
    `UPDATE ${MEALPLAN_TABLE}
    SET name = (
        SELECT ${MEAL_TABLE}.name
        FROM ${MEAL_TABLE}
        WHERE ${MEAL_TABLE}.id = ${MEALPLAN_TABLE}.meal_id
    ),
    meal_id = NULL
    WHERE meal_id = ? AND user_id = ?`,
    mealIds.map(mealId => [mealId, userId || LOCAL_USER_ID]),
  );
}