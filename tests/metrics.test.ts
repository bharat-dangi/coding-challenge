import { AccountCategory } from "../src/constants/accountCategory.constant";
import { AccountType } from "../src/constants/accountType.constants";
import { MetricsType } from "../src/constants/metricsType.constant";
import { ValueType } from "../src/constants/valueType.constant";
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
const workingCapitalRatioCalculator = MetricCalculatorFactory.getCalculator(
  MetricsType.WorkingCapitalRatio,
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

// Test case for Working Capital Ratio
describe("WorkingCapitalRatioCalculator", () => {
  // Test case 1: Normal working capital ratio calculation
  it("should calculate working capital ratio correctly", () => {
    const assets = 10000 + 5000; // Cash + Accounts Receivable (debit entries)
    const liabilities = 7000 - 3000; // Accounts Payable (credit - debit)
    const expectedRatio = (assets / liabilities) * 100; // (15000 / 4000) * 100 = 375%
    const result = workingCapitalRatioCalculator.calculate(
      sampleDataForWorkingCapitalRatio,
    );
    expect(result).toBeCloseTo(expectedRatio, 1); // Close to the expected value with 1 decimal precision
  });

  // Test case 2: If there are no liabilities, the ratio should be 0
  it("should return 0 when there are no liabilities", () => {
    const sampleDataNoLiabilities = sampleDataForWorkingCapitalRatio.filter(
      (data) => data.account_category !== AccountCategory.LIABILITY,
    );

    const result = workingCapitalRatioCalculator.calculate(
      sampleDataNoLiabilities,
    );
    expect(result).toBe(0); // No liabilities means an infinite ratio
  });

  // Test case 3: If there are no assets, the ratio should be 0
  it("should return 0 when there are no assets", () => {
    const sampleDataNoAssets = sampleDataForWorkingCapitalRatio.filter(
      (data) => data.account_category !== AccountCategory.ASSETS,
    );
    const expectedRatio = 0;
    const result = workingCapitalRatioCalculator.calculate(sampleDataNoAssets);
    expect(result).toBe(expectedRatio);
  });

  // Test case 4: If there are no assets and liabilities, the ratio should be 0
  it("should return 0 when there are no assets and liabilities", () => {
    const sampleDataNoAssetsAndLiabilities =
      sampleDataForWorkingCapitalRatio.filter(
        (data) =>
          data.account_category !== AccountCategory.ASSETS &&
          data.account_category !== AccountCategory.LIABILITY,
      );
    const expectedRatio = 0;
    const result = workingCapitalRatioCalculator.calculate(
      sampleDataNoAssetsAndLiabilities,
    );
    expect(result).toBe(expectedRatio);
  });

  // Test case 5: If assets exceed liabilities, the ratio should be greater than 100%
  it("should return a ratio greater than 100% when assets exceed liabilities", () => {
    const sampleDataExcessAssets = [
      ...sampleDataForWorkingCapitalRatio,
      {
        account_category: AccountCategory.ASSETS,
        account_code: "102",
        account_currency: "AUD",
        account_identifier: "asset-3",
        value_type: ValueType.Debit,
        account_name: "Short-Term Investments",
        account_type: AccountType.Current,
        total_value: 15000, // Adding more assets
      },
    ];
    const assets = 10000 + 5000 + 15000; // New asset value
    const liabilities = 7000 - 3000; // Original liability value
    const expectedRatio = (assets / liabilities) * 100; // (30000 / 4000) * 100 = 750%
    const result = workingCapitalRatioCalculator.calculate(
      sampleDataExcessAssets,
    );
    expect(result).toBeCloseTo(expectedRatio, 1);
  });

  // Test case 6: If liabilities exceed assets, the ratio should be less than 100%
  it("should return a ratio less than 100% when liabilities exceed assets", () => {
    const sampleDataExcessLiabilities = [
      ...sampleDataForWorkingCapitalRatio,
      {
        account_category: AccountCategory.LIABILITY,
        account_code: "202",
        account_currency: "AUD",
        account_identifier: "liability-3",
        value_type: ValueType.Credit,
        account_name: "Long-Term Debt",
        account_type: AccountType.CurrentAccountPayable,
        total_value: 20000, // Adding more liabilities
      },
    ];
    const assets = 10000 + 5000; // Original asset value
    const liabilities = 7000 - 3000 + 20000; // New liability value
    const expectedRatio = (assets / liabilities) * 100; // (15000 / 24000) * 100 = 62.5%
    const result = workingCapitalRatioCalculator.calculate(
      sampleDataExcessLiabilities,
    );
    expect(result).toBeCloseTo(expectedRatio, 1);
  });
});
