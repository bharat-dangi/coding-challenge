import { MetricsType } from "../src/constants/metricsType.constant";
import { MetricCalculatorFactory } from "../src/factories/metricCalculatorFactory";
import { sampleData } from "./data/metrics.data";

// Initialize the calculators
const revenueCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.Revenue,
);
const expenseCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.Expense,
);

// Test cases for RevenueCalculator
describe("RevenueCalculator", () => {
  it("should calculate the correct total revenue", () => {
    const revenue = revenueCalculator.calculate(sampleData);
    expect(revenue).toBe(53931.0); // 32431 + 21500
  });

  it("should return 0 if there is no revenue data", () => {
    const noRevenueData = sampleData.filter(
      (item) => item.account_category !== "revenue",
    );
    const revenue = revenueCalculator.calculate(noRevenueData);
    expect(revenue).toBe(0);
  });

  it("should handle null values correctly", () => {
    const revenue = revenueCalculator.calculate(null as any);
    expect(revenue).toBe(0);
  });

  it("should handle empty data array correctly", () => {
    const revenue = revenueCalculator.calculate([]);
    expect(revenue).toBe(0);
  });
});

// Test cases for ExpenseCalculator
describe("ExpenseCalculator", () => {
  it("should calculate the correct total expenses", () => {
    const expense = expenseCalculator.calculate(sampleData);
    expect(expense).toBe(1830.18); // Only one expense item in the sample data
  });

  it("should return 0 if there are no expense data", () => {
    const noExpenseData = sampleData.filter(
      (item) => item.account_category !== "expense",
    );
    const expense = expenseCalculator.calculate(noExpenseData);
    expect(expense).toBe(0);
  });

  it("should handle null values correctly", () => {
    const expense = expenseCalculator.calculate(null as any);
    expect(expense).toBe(0);
  });

  it("should handle empty data array correctly", () => {
    const expense = expenseCalculator.calculate([]);
    expect(expense).toBe(0);
  });

  it("should handle case where total value is negative (expense)", () => {
    const negativeExpenseData = [
      { ...sampleData[0], account_category: "expense", total_value: -500 },
    ];
    const expense = expenseCalculator.calculate(negativeExpenseData);
    expect(expense).toBe(-500);
  });
});
