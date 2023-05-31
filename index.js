require('dotenv').config();
const { completeTasks, retryAsync } = require('./completeTasks');

(async () => {
  const date = new Date();
  retryAsync(() => completeTasks(process.env.DATABASE_ID, date), 5);
})();
