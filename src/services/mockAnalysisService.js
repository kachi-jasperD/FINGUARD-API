const generateMockAnalysis = (financialContext) => {
  const {
    monthlyIncome,
    recurringExpenses,
    totalMonthlyDebtPayments,
    totalDebtBalance,
    dti,
    buffer,
    accountBalance,
  } = financialContext;

  let riskLevel = "low";

  // Determine risk based on financial situation
  if (dti >= 0.4 || buffer < 0 || accountBalance < monthlyIncome * 0.1) {
    riskLevel = "high";
  } else if (
    dti >= 0.2 ||
    buffer < monthlyIncome * 0.1 ||
    accountBalance < monthlyIncome * 0.25
  ) {
    riskLevel = "medium";
  }

  const keyDrivers = [];

  // Debt-to-income driver
  if (dti >= 0.4) {
    keyDrivers.push({
      title: "High debt-to-income ratio",
      explanation: `Your monthly debt payments represent approximately ${(
        dti * 100
      ).toFixed(1)}% of your monthly income.`,
      severity: "high",
    });
  } else if (dti >= 0.2) {
    keyDrivers.push({
      title: "Moderate debt-to-income ratio",
      explanation: `Your monthly debt payments represent approximately ${(
        dti * 100
      ).toFixed(1)}% of your monthly income.`,
      severity: "medium",
    });
  } else {
    keyDrivers.push({
      title: "Manageable debt-to-income ratio",
      explanation: `Your monthly debt payments represent approximately ${(
        dti * 100
      ).toFixed(1)}% of your monthly income.`,
      severity: "low",
    });
  }

  // Monthly buffer
  if (buffer < 0) {
    keyDrivers.push({
      title: "Negative monthly buffer",
      explanation:
        "Your income is currently lower than your recurring expenses and debt repayments.",
      severity: "high",
    });
  } else if (buffer < monthlyIncome * 0.1) {
    keyDrivers.push({
      title: "Limited monthly buffer",
      explanation:
        "Only a small portion of your income remains after recurring expenses and debt payments.",
      severity: "medium",
    });
  } else {
    keyDrivers.push({
      title: "Positive monthly buffer",
      explanation:
        "You have money remaining after recurring expenses and debt repayments.",
      severity: "low",
    });
  }

  // Account balance
  if (accountBalance < monthlyIncome * 0.1) {
    keyDrivers.push({
      title: "Low account balance",
      explanation:
        "Your current account balance provides a limited financial cushion.",
      severity: "high",
    });
  } else {
    keyDrivers.push({
      title: "Available account balance",
      explanation:
        "Your current account balance provides some financial flexibility.",
      severity: "low",
    });
  }

  const recommendations = [];

  if (buffer < 0) {
    recommendations.push({
      title: "Reduce monthly expenses",
      reason:
        "Your current expenses and debt repayments exceed your monthly income.",
      priority: "high",
    });
  }

  if (dti >= 0.4) {
    recommendations.push({
      title: "Prioritize debt reduction",
      reason:
        "Reducing monthly debt obligations could significantly improve your financial position.",
      priority: "high",
    });
  } else if (dti >= 0.2) {
    recommendations.push({
      title: "Monitor debt repayments",
      reason:
        "Keeping debt repayments under control will help protect your monthly cash flow.",
      priority: "medium",
    });
  }

  if (accountBalance < monthlyIncome * 0.25) {
    recommendations.push({
      title: "Build an emergency buffer",
      reason:
        "Increasing your available savings would provide greater protection against unexpected expenses.",
      priority: "medium",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Continue monitoring your finances",
      reason:
        "Your current financial position appears relatively stable. Continue tracking income, expenses and debt.",
      priority: "low",
    });
  }

  let summary;

  if (riskLevel === "high") {
    summary =
      "Your current financial position shows significant financial pressure. Your debt obligations, expenses, or available cash buffer require attention.";
  } else if (riskLevel === "medium") {
    summary =
      "Your financial position is generally manageable but there are some areas that should be monitored, particularly your debt obligations and available financial buffer.";
  } else {
    summary =
      "Your financial position appears relatively stable, with manageable debt obligations and a reasonable financial buffer.";
  }

  return {
    riskLevel,
    summary,
    keyDrivers,
    recommendations,
  };
};

module.exports = {
  generateMockAnalysis,
};
