/**
 * Format a number as currency (e.g., $1,000)
 * If the value is null or undefined, treat as 0.
 */
export function formatCurrency(value: number | null | undefined): string {
  // Default to 0 if value is null or undefined
  const validValue = value ?? 0;
  const roundedValue = Math.floor(validValue); // Remove decimals
  return `$${roundedValue.toLocaleString()}`; // Format with $ and comma
}

/**
 * Format a number as a percentage (e.g., 25.5%)
 * If the value is null or undefined, treat as 0.
 */
export function formatPercentage(value: number | null | undefined): string {
  // Default to 0 if value is null or undefined
  const validValue = value ?? 0;
  return `${(validValue * 100).toFixed(1)}%`; // Multiply by 100 and format with 1 decimal place
}
