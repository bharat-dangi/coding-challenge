import { AccountCategory } from "../constants/accountCategory.constants";
import { AccountData } from "../types/accountData.types";
import { IMetricCalculator } from "./iMetricCalculator";

/**
 * Calculator for Revenue.
 * Sums the total_value for all items where account_category is "revenue".
 */
export class RevenueCalculator implements IMetricCalculator {
  calculate(data: AccountData[]): number | null | undefined {
    // Sum all total_values where account_category is "revenue"
    const revenue = data
      ?.filter((item) => item.account_category === AccountCategory.REVENUE)
      .reduce((sum, item) => sum + Number(item.total_value ?? 0), 0);
    return revenue > 0 ? revenue : 0; // Ensure 0 if no revenue is found
  }
}
