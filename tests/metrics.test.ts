import { MetricsType } from "../src/constants/metricsType.constant";
import { MetricCalculatorFactory } from "../src/factories/metricCalculatorFactory";
import {
  sampleData,
  sampleDataForWorkingCapitalRatio,
} from "./data/metrics.data";

// Initialize the calculators
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

// Test cases for GrossProfitMarginCalculator
describe("GrossProfitMarginCalculator", () => {
  it("should calculate the correct gross profit margin", () => {
    const margin = grossProfitMarginCalculator.calculate(sampleData, 53931.0); // Pass revenue as 53931.0
    expect(margin).toBe(0); // No sales data in sample
  });

  it("should return 0% if no revenue data is passed", () => {
    const margin = grossProfitMarginCalculator.calculate(sampleData, 0);
    expect(margin).toBe(0);
  });

  it("should handle null values correctly", () => {
    const margin = grossProfitMarginCalculator.calculate(null as any, null);
    expect(margin).toBe(0);
  });

  it("should return 0% if no sales data is available", () => {
    const noSalesData = sampleData.filter(
      (item) => item.account_type !== "sales",
    );
    const margin = grossProfitMarginCalculator.calculate(noSalesData, 53931.0);
    expect(margin).toBe(0);
  });
});

// Test cases for NetProfitMarginCalculator
describe("NetProfitMarginCalculator", () => {
  it("should calculate the correct net profit margin", () => {
    const netMargin = netProfitMarginCalculator.calculate(sampleData, {
      revenue: 53931.0,
      expenses: 1830.18,
    });
    expect(netMargin).toBe(96.60644156422094); // (53931.0 - 1830.18) / 53931.0 = ~0.9667
  });

  it("should return 0% if there are no revenue or expenses", () => {
    const margin = netProfitMarginCalculator.calculate([], {
      revenue: 0,
      expenses: 0,
    });
    expect(margin).toBe(0);
  });

  it("should handle null values correctly", () => {
    const margin = netProfitMarginCalculator.calculate(null as any, {
      revenue: 53931.0,
      expenses: 1830.18,
    });
    expect(margin).toBe(96.60644156422094);
  });

  it("should return negative value when expenses exceed revenue", () => {
    const margin = netProfitMarginCalculator.calculate(
      sampleData,

      { revenue: 1830.18, expenses: 53931.0 },
    );
    expect(margin).toBe(-2846.7593351473624); // Expenses > Revenue, so negative margin
  });
});
