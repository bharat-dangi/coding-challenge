import { AccountData } from "./src/types/accountData.types";
import fs from "fs";
import { formatCurrency } from "./src/utils";
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

// Calculate metrics
const revenue = revenueCalculator.calculate(parsedData);
const expenses = expenseCalculator.calculate(parsedData);

// Output results with proper formatting
console.log("Revenue:", formatCurrency(revenue));
console.log("Expenses:", formatCurrency(expenses));
