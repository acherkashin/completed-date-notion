require('dotenv').config();
const { completeTasks } = require('./completeTasks');

console.log(`Database id: ${process.env.DATABASE_ID.length}`);

(async () => {
  const date = new Date();
  completeTasks(process.env.DATABASE_ID, date);
})();
