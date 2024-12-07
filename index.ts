import { AccountData } from "./src/types/accountData.types";
import fs from "fs";
import { formatCurrency, formatPercentage } from "./src/utils";
import { MetricCalculatorFactory } from "./src/factories/metricCalculatorFactory";
import { MetricsType } from "./src/constants/metricsType.constant";

// Read data from JSON file
const rawData = fs.readFileSync("data.json", "utf-8");
const parsedData = JSON.parse(rawData).data as AccountData[];

const revenueCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.Revenue,
);
const expenseCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.Expense,
);
const grossProfitMarginCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.GrossProfitMargin,
);
const netProfitMarginCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.NetProfitMargin,
);

// Calculate metrics
const revenue = revenueCalculator.calculate(parsedData);
const expenses = expenseCalculator.calculate(parsedData);
const grossProfitMargin = grossProfitMarginCalculator.calculate(
  parsedData,
  revenue,
);
const netProfitMargin = netProfitMarginCalculator.calculate(parsedData, {
  revenue,
  expenses,
});

// Output results with proper formatting
console.log("Revenue:", formatCurrency(revenue));
console.log("Expenses:", formatCurrency(expenses));
console.log("Gross Profit Margin:", formatPercentage(grossProfitMargin));
console.log("Net Profit Margin:", formatPercentage(netProfitMargin));
