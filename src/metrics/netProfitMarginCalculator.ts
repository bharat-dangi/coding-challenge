import { AccountData } from "../types/accountData.types";
import { IMetricCalculator } from "./iMetricCalculator";

/**
 * Calculator for Net Profit Margin.
 * Calculates ((Revenue - Expenses) / Revenue) * 100 as percentage.
 */
export class NetProfitMarginCalculator implements IMetricCalculator {
  calculate(
    data: AccountData[],
    additionalData: {
      revenue: number | null | undefined;
      expenses: number | null | undefined;
    },
  ): number | null | undefined {
    // Default revenue and expenses to 0 if null or undefined
    const validRevenue = additionalData?.revenue ?? 0;
    const validExpenses = additionalData?.expenses ?? 0;

    // Calculate Net Profit Margin
    return !isNaN(validRevenue) && validRevenue !== 0
      ? ((validRevenue - validExpenses) / validRevenue) * 100
      : 0;
  }
}
