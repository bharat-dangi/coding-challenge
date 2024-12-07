import { AccountCategory } from "../constants/accountCategory.constant";
import { AccountType } from "../constants/accountType.constants";
import { ValueType } from "../constants/valueType.constant";
import { AccountData } from "../types/accountData.types";
import { IMetricCalculator } from "./iMetricCalculator";

/**
 * Calculates Working Capital Ratio: (Assets / Liabilities) * 100
 */
export class WorkingCapitalRatioCalculator implements IMetricCalculator {
  calculate(data: AccountData[]): number | null | undefined {
    // Calculate assets: debits - credits
    const assets = data
      .filter(
        (item) =>
          item.account_category === AccountCategory.ASSETS &&
          [
            AccountType.Current,
            AccountType.Bank,
            AccountType.CurrentAccountReceivable,
          ].includes(item.account_type),
      )
      .reduce((sum, item) => {
        if (item.value_type === ValueType.Debit)
          return sum + (item.total_value ?? 0);
        if (item.value_type === ValueType.Credit)
          return sum - (item.total_value ?? 0);
        return sum;
      }, 0);

    // Calculate liabilities: credits - debits
    const liabilities = data
      .filter(
        (item) =>
          item.account_category === AccountCategory.LIABILITY &&
          [AccountType.Current, AccountType.CurrentAccountPayable].includes(
            item.account_type,
          ),
      )
      .reduce((sum, item) => {
        if (item.value_type === ValueType.Debit)
          return sum - (item.total_value ?? 0);
        if (item.value_type === ValueType.Credit)
          return sum + (item.total_value ?? 0);
        return sum;
      }, 0);

    // Return ratio or 0 if no liabilities
    return liabilities !== 0 ? (assets / liabilities) * 100 : 0;
  }
}
