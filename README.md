# RewardPay Coding Challenge

## Overview

This repo contains the instructions and the data you need to complete the _RewardPay coding challenge_.  This challenge is not intended to be complex, but it is an opportunity for you to showcase your understanding and applying of good development practices.

You are encouraged to treat this as a real-life project.  This typically means:

- Use version control effectively
- Include some basic documentation
- Include some unit tests
- Adhere to a naming convention

Please use JavaScript of TypeScript to complete this challenge.

## The Challenge

You are tasked with developing an application that performs the following tasks in sequence:

- Read and parse an external data file `data.json` (located in this repo)
- Using this data, calculate and print the values of 5 common accounting metrics:
  1. Revenue
  2. Expenses
  3. Gross Profit Margin
  4. Net Profit Margin
  5. Working Capital Ratio
- Commit your changes, and upload all your work to a feature branch of your choice.

## Instructions

- Begin by _forking_ the current repository to your own `github.com` account
- Clone the repo locally
- Write your code, _commit often_
- Once you are satisfied with the output, push your changes to your `github.com` account
- Share the link

## Calculations

Use the formulas below to calculate your values:

### Revenue

This should be calculated by adding up all the values under `total_value` where the `account_category` field is set to `revenue`

### Expenses

This should be calculated by adding up all the values under `total_value` where the `account_category` field is set to `expense`

### Gross Profit Margin

This is calculated in two steps: first by adding all the `total_value` fields where the `account_type` is set to `sales` and the `value_type` is set to `debit`; then dividing that by the `revenue` value calculated earlier to generate a percentage value.

### Net Profit Margin

This metric is calculated by subtracting the `expenses` value from the `revenue` value and dividing the remainder by `revenue` to calculate a percentage.

### Working Capital Ratio

This is calculated dividing the `assets` by the `liabilities` creating a percentage value where `assets` are calculated by:

- adding the `total_value` from all records where the `account_category` is set to `assets`, the `value_type` is set to `debit`, and the `account_type` is one of `current`, `bank`, or `current_accounts_receivable`
- subtracting the `total_value` from all records where the `account_category` is set to `assets`, the `value_type` is set to `credit`, and the `account_type` is one of `current`, `bank`, or `current_accounts_receivable`

and liabilities are calculated by:

- adding the `total_value` from all records where the `account_category` is set to `liability`, the `value_type` is set to `credit`, and the `account_type` is one of `current` or `current_accounts_payable`
- subtracting the `total_value` from all records where the `account_category` is set to `liability`, the `value_type` is set to `debit`, and the `account_type` is one `current` or `current_accounts_payable`

## Formatting

All currency figures must be formatted as follows:
- The value is prefixed with a `$` sign
- A comma is used to separate every 3 digits in the thousands, millions, billions, and trillions
- Cents are removed

All percentage values must be formatted to one decimal digit and be prefixed with a `%` sign.  Don't forget to multiply by 100 each time you're tasked with calculating a percentage value.

## Example

Below is what a typical output should look like.  Please note this is *not* the output of the challenge but a mere example.

```
$ ./myChallenge
Revenue: $519,169
Expenses: $411,664
Gross Profit Margin: 22%
Net Profit Margin: 21%
Working Capital Ratio: 95%
```

# Dependencies

If your program requires a special way to compile or a specific version of a toolset, please be sure to include that in your running instructions.

__Thank you and good luck!__





# Developer's Comments:

## Instructions to run the application on local machine:
1. First clone the project using command: `git clone git@github.com:bharat-dangi/coding-challenge.git`.
2. Then switch your node version to `20`.
3. After that, install the packages using command `npm install`.
4. Then you can run the application on local using command `npm run dev`.
5. You can run the unit tests using command `npm test`.


## About Solution (High Level Description)
My approach is center around building a modular, maintainable, and extensible system for calculating financial metrics, particularly for working capital ratio and other metrics such as revenue, expenses, and profit margins. I had designed this system in a way that allows easy addition of new metrics, while keeping the calculation logic isolated from data handling and presentation. The main design focuses on separation of concerns, encapsulation, and reusability.

### About Design Patterns Used and Principles
#### 1. Factory Design Pattern:
I have used factory pattern (MetricCalculatorFactory) to create instances of different calculators based on the metric type. This helps in decoupling the metric calculation logic from the consumer code, making it easy to add or change metric calculations without affecting other parts of the system. It also centralizes the logic for creating calculators in one place, improving maintainability.

#### 2. Strategy Design Pattern:
The strategy pattern is implicitly used by having different classes for each metric calculator (e.g., WorkingCapitalRatioCalculator, RevenueCalculator). Each class encapsulates the logic for calculating a specific financial metric, allowing for flexible switching and extension of calculation methods. This avoids a large, monolithic method and keeps each metric calculation independent and easily replaceable.

#### 3. Encapsulation:
Each metric calculation logic is encapsulated within its own class, adhering to the single responsibility principle. This makes the code easier to understand, test, and maintain.

#### 4. Separation of Concerns:
I had separated the concerns of data manipulation, calculation, and presentation. Data is handled independently from the calculation logic (e.g., WorkingCapitalRatioCalculator), and there is separate formatting functions to handle the presentation of results (e.g., formatting currencies and percentages). This separation ensures that each part of the system can evolve independently without tightly coupling one part with another.

#### 5. Reusable Utility Functions:
I had made use of utility functions for formatting (like formatCurrency) and for testing purposes (e.g., helpers for calculating expected values in unit tests). These reusable utilities help reduce duplication of code and improve the system's overall efficiency.


### Scalability and Extensibility
#### Scalability: 
The design is highly scalable. New metrics can be added by creating new calculator classes that implement the `IMetricCalculator` interface. This ensures that the application remains flexible and can evolve as more financial metrics need to be calculated in the future.

#### Extensibility: 
Our approach allows us to extend the functionality by adding new account categories, account types, or even new financial ratios. Since the calculator logic is abstracted into separate classes, adding new business logic or modifying existing logic becomes simple and does not impact other parts of the system.