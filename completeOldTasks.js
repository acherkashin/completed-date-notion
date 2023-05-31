const { completeTasks, retryAsync } = require('./completeTasks');
require('dotenv').config();

(async () => {
  const startDate = new Date(process.env.START_DATE);
  const endDate = new Date(process.env.END_DATE);
  const currentDate = new Date(startDate.toISOString());

  while (currentDate < endDate) {
    await retryAsync(async () => {
      await completeTasks(process.env.DATABASE_ID, currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      console.log('\n');
    }, 5);
  }
})();
