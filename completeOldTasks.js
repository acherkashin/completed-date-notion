const { completeTasks } = require('./completeTasks');
require('dotenv').config();

(async () => {
  const startDate = new Date('2022-04-19T04:51:27.000Z');
  const endDate = new Date('2022-07-24T04:51:27.000Z');
  const currentDate = new Date(startDate.toISOString());

  while (currentDate < endDate) {
    await completeTasks(process.env.DATABASE_ID, currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
})();
