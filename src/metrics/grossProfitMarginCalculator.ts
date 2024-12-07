import { AccountType } from "../constants/accountType.constants";
import { ValueType } from "../constants/valueType.constant";
import { AccountData } from "../types/accountData.types";
import { IMetricCalculator } from "./iMetricCalculator";

/**
 * Calculator for Gross Profit Margin.
 * Calculates (Sales Debit Total / Revenue) * 100 as percentage.
 */
export class GrossProfitMarginCalculator implements IMetricCalculator {
  calculate(
    data: AccountData[],
    revenue: number | null | undefined,
  ): number | null | undefined {
    // Default revenue to 0 if null or undefined
    const validRevenue = revenue ?? 0;

    // Sum all total_values where account_type is "sales" and value_type is "debit"
    const salesDebitTotal = data
      ?.filter(
        (item) =>
          item.account_type === AccountType.Sales &&
          item.value_type === ValueType.Debit,
      )
      .reduce((sum, item) => sum + Number(item.total_value ?? 0), 0);

    // Calculate Gross Profit Margin
    return validRevenue > 0 ? (salesDebitTotal / validRevenue) * 100 : 0; // Return 0 if revenue is 0
  }
}
