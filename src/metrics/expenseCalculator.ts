import { AccountCategory } from "../constants/accountCategory.constants";
import { AccountData } from "../types/accountData.types";
import { IMetricCalculator } from "./iMetricCalculator";

/**
 * Calculator for Expenses.
 * Sums the total_value for all items where account_category is "expense".
 */
export class ExpenseCalculator implements IMetricCalculator {
  calculate(data: AccountData[]): number | null | undefined {
    // Sum all total_values where account_category is "expense"
    const expenses = data
      ?.filter((item) => item.account_category === AccountCategory.EXPENSE)
      .reduce((sum, item) => sum + Number(item.total_value ?? 0), 0);
    return !isNaN(expenses) ? expenses : 0; // Ensure 0 if no expenses are found
  }
}
