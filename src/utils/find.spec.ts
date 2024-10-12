import { fromPartial } from "@total-typescript/shoehorn";

import { BookRecord } from "@/db/schemas/book";
import { MealRecord } from "@/db/schemas/meal";

import { findBookInArray, findMealInArray } from "./find";

describe("findBookInArray", () => {
  it("should return the book with the given ID", () => {
    const books: BookRecord[] = [
      fromPartial({ id: "1", name: "Book One" }),
      fromPartial({ id: "2", name: "Book Two" }),
    ];
    const result = findBookInArray("1", books);
    expect(result).toEqual({ id: "1", name: "Book One" });
  });

  it("should return undefined if the book is not found", () => {
    const books: BookRecord[] = [
      fromPartial({ id: "1", name: "Book One" }),
      fromPartial({ id: "2", name: "Book Two" }),
    ];
    const result = findBookInArray("3", books);
    expect(result).toBeUndefined();
  });
});

describe("findMealInArray", () => {
  it("should return the meal with the given ID", () => {
    const meals: MealRecord[] = [
      fromPartial({ id: "1", name: "Meal One" }),
      fromPartial({ id: "2", name: "Meal Two" }),
    ];
    const result = findMealInArray("1", meals);
    expect(result).toEqual({ id: "1", name: "Meal One" });
  });

  it("should return undefined if the meal is not found", () => {
    const meals: MealRecord[] = [
      fromPartial({ id: "1", name: "Meal One" }),
      fromPartial({ id: "2", name: "Meal Two" }),
    ];
    const result = findMealInArray("3", meals);
    expect(result).toBeUndefined();
  });
});
