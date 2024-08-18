require('dotenv').config();
const express = require('express');
const api = require('@actual-app/api');

const app = express();
const PORT = process.env.PORT || 5007;

(async () => {
  const config = {
    // dataDir: process.env.DATA_DIR,
    serverURL: process.env.SERVER_URL,
    password: process.env.PASSWORD,
    budgetId: process.env.BUDGET_ID
  };
  
  await api.init(config);
  await api.downloadBudget(config.budgetId); 
  
  app.get('/api/budget', async (req, res) => {
    try {
      let budget = await api.getBudgetMonth('2024-08');
      res.json(budget);
    } catch (error) {
      res.status(500).send('Error retrieving budget data');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();