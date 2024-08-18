require('dotenv').config();
const express = require('express');
const api = require('@actual-app/api');

const app = express();
const PORT = process.env.PORT || 5007;

(async () => {
  const config = {
    dataDir: process.env.DATA_DIR,
    serverURL: process.env.SERVER_URL,
    password: process.env.PASSWORD,
    budgetId: process.env.BUDGET_ID
  };

  await api.init(config);

  app.get('/api/budget', async (req, res) => {
    try {
      await api.downloadBudget(config.budgetId);

      const now = new Date();
      const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      let budget = await api.getBudgetMonth(currentYearMonth);

      budget.totalBudgeted = budget.totalBudgeted / 100;
      budget.totalIncome = budget.totalIncome / 100;
      budget.totalSpent = Math.abs(budget.totalSpent / 100);
      budget.totalBalance = budget.totalBalance / 100;

      res.json(budget);
    } catch (error) {
      res.status(500).send('Error retrieving budget data');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();