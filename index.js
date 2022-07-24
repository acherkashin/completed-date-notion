require('dotenv').config();
const { completeTasks } = require('./completeTasks');

(async () => {
  const date = new Date();
  completeTasks(process.env.DATABASE_ID, date);
})();
