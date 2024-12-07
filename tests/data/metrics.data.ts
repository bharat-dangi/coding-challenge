import { AccountCategory } from "../../src/constants/accountCategory.constant";
import { AccountType } from "../../src/constants/accountType.constants";
import { ValueType } from "../../src/constants/valueType.constant";
import { AccountData } from "../../src/types/accountData.types";

export const sampleData: AccountData[] = [
  {
    account_category: "revenue",
    account_code: "200",
    account_currency: "AUD",
    account_identifier: "e2bacdc6-2006-43c2-a5da-3c0e5f43b452",
    value_type: "credit",
    account_name: "Sales",
    account_type: "sales",
    total_value: 32431.0,
  },
  {
    account_category: "revenue",
    account_code: "201",
    account_currency: "AUD",
    account_identifier: "a3c5fe47-d29b-4a5d-85e1-9e0e06df905b",
    value_type: "credit",
    account_name: "Services",
    account_type: "services",
    total_value: 21500.0,
  },
  {
    account_category: "expense",
    account_code: "400",
    account_currency: "AUD",
    account_identifier: "d392fe47-c99d-499e-a200-46709dd6b6e7",
    account_name: "Advertising",
    value_type: "debit",
    total_value: 1830.18,
    account_type: "overheads",
  },
];

export const sampleDataForWorkingCapitalRatio: AccountData[] = [
  // Assets
  {
    account_category: AccountCategory.ASSETS,
    account_code: "100",
    account_currency: "AUD",
    account_identifier: "asset-1",
    value_type: ValueType.Debit,
    account_name: "Cash",
    account_type: AccountType.Current,
    total_value: 10000,
  },
  {
    account_category: AccountCategory.ASSETS,
    account_code: "101",
    account_currency: "AUD",
    account_identifier: "asset-2",
    value_type: ValueType.Debit,
    account_name: "Accounts Receivable",
    account_type: AccountType.CurrentAccountReceivable,
    total_value: 5000,
  },

  // Liabilities
  {
    account_category: AccountCategory.LIABILITY,
    account_code: "200",
    account_currency: "AUD",
    account_identifier: "liability-1",
    value_type: ValueType.Credit,
    account_name: "Accounts Payable",
    account_type: AccountType.CurrentAccountPayable,
    total_value: 7000,
  },
  {
    account_category: AccountCategory.LIABILITY,
    account_code: "201",
    account_currency: "AUD",
    account_identifier: "liability-2",
    value_type: ValueType.Debit,
    account_name: "Accounts Payable",
    account_type: AccountType.CurrentAccountPayable,
    total_value: 3000,
  },
];
