import { formatCurrency, formatPercentage } from "../src/utils";

describe("Utility Functions - formatCurrency", () => {
  // Test case 1: Format a positive number with no decimals
  it("should format a positive number with comma and $ sign", () => {
    expect(formatCurrency(32431.0)).toBe("$32,431");
  });

  // Test case 2: Format a large number with thousands separator
  it("should format a large number with commas correctly", () => {
    expect(formatCurrency(1234567.89)).toBe("$1,234,567");
  });

  // Test case 3: Format zero value as currency
  it("should format zero as $0", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  // Test case 4: Handle negative numbers correctly
  it("should format negative numbers with $ and negative sign", () => {
    expect(formatCurrency(-2345.67)).toBe("$-2,346");
  });

  // Test case 5: Handle null values as 0 (e.g., for missing data)
  it("should treat null as $0", () => {
    expect(formatCurrency(null)).toBe("$0");
  });

  // Test case 6: Handle undefined values as 0
  it("should treat undefined as $0", () => {
    expect(formatCurrency(undefined)).toBe("$0");
  });

  // Test case 7: Handle values with no cents (rounded to nearest integer)
  it("should format values without cents", () => {
    expect(formatCurrency(54321.567)).toBe("$54,321");
  });

  // Test case 8: Format a billion number with separators
  it("should format a large number with commas correctly", () => {
    expect(formatCurrency(1234567121.89)).toBe("$1,234,567,121");
  });

  // Test case 9: Format a trillion number with separators
  it("should format a large number with commas correctly", () => {
    expect(formatCurrency(1234567121432.89)).toBe("$1,234,567,121,432");
  });
});

describe("Utility Functions - formatPercentage", () => {
  // Test case 1: Format a positive percentage correctly
  it("should format a positive percentage to one decimal place with %", () => {
    expect(formatPercentage(0.2234)).toBe("22.3%"); // 22.3% as it's multiplied by 100
  });

  // Test case 2: Format a percentage of 0 correctly
  it("should format 0 as 0.0%", () => {
    expect(formatPercentage(0)).toBe("0.0%");
  });

  // Test case 3: Handle null values (should return 0.0%)
  it("should treat null as 0.0%", () => {
    expect(formatPercentage(null)).toBe("0.0%");
  });

  // Test case 4: Handle undefined values (should return 0.0%)
  it("should treat undefined as 0.0%", () => {
    expect(formatPercentage(undefined)).toBe("0.0%");
  });

  // Test case 5: Format a percentage with a value greater than 1 correctly
  it("should format percentages greater than 1 (e.g., 1.25) as 125.0%", () => {
    expect(formatPercentage(1.25)).toBe("125.0%");
  });

  // Test case 6: Format a negative percentage correctly
  it("should format a negative percentage correctly", () => {
    expect(formatPercentage(-0.2345)).toBe("-23.4%"); // negative percentage
  });

  // Test case 7: Format percentage of 100% correctly
  it("should format 1 as 100.0%", () => {
    expect(formatPercentage(1)).toBe("100.0%");
  });
});
