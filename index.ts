import { RevenueCalculator } from "./src/metrics/revenueCalculator";
import { AccountData } from "./src/types/accountData.types";
import fs from "fs";
import { formatCurrency } from "./src/utils";

// Read data from JSON file
const rawData = fs.readFileSync("data.json", "utf-8");
const parsedData = JSON.parse(rawData).data as AccountData[];

const revenueCalculator = new RevenueCalculator();

// Calculate metrics
const revenue = revenueCalculator.calculate(parsedData);

// Output results with proper formatting
console.log("Revenue:", formatCurrency(revenue));
