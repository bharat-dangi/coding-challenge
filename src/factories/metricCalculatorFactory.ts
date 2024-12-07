import { MetricsType } from "../constants/metricsType.constant";
import { ExpenseCalculator } from "../metrics/expenseCalculator";
import { GrossProfitMarginCalculator } from "../metrics/grossProfitMarginCalculator";
import { IMetricCalculator } from "../metrics/iMetricCalculator";
import { NetProfitMarginCalculator } from "../metrics/netProfitMarginCalculator";
import { RevenueCalculator } from "../metrics/revenueCalculator";
import { WorkingCapitalRatioCalculator } from "../metrics/workingCapitalRatioCalculator";

// Factory for creating the correct metric calculator
export class MetricCalculatorFactory {
  static getCalculator(metric: string): IMetricCalculator {
    switch (metric) {
      case MetricsType.Revenue:
        return new RevenueCalculator();
      case MetricsType.Expense:
        return new ExpenseCalculator();
      case MetricsType.GrossProfitMargin:
        return new GrossProfitMarginCalculator();
      case MetricsType.NetProfitMargin:
        return new NetProfitMarginCalculator();
      case MetricsType.WorkingCapitalRatio:
        return new WorkingCapitalRatioCalculator();
      default:
        throw new Error(`Unknown metric: ${metric}`);
    }
  }
}
