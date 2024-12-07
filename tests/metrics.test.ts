import { RevenueCalculator } from "../src/metrics/revenueCalculator";
import { sampleData } from "./data/metrics.data";

// Initialize the calculators
const revenueCalculator = new RevenueCalculator();

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
