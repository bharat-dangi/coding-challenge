import { AccountData } from "../types/accountData.types";

// Interface for all metric calculators. Each metric must implement this interface.
export interface IMetricCalculator {
  calculate(
    data: AccountData[],
    additionalData?: any,
  ): number | null | undefined; // Calculation method returns a number or null if invalid
}
