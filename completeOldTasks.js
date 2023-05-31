const { completeTasks } = require('./completeTasks');
require('dotenv').config();

(async () => {
  const startDate = new Date('2023-02-01T04:51:27.000Z');
  const endDate = new Date('2023-05-26T04:51:27.000Z');
  const currentDate = new Date(startDate.toISOString());

  while (currentDate < endDate) {
    await retryAsync(async () => {
      await completeTasks(process.env.DATABASE_ID, currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      console.log('\n');
    }, 5);
  }
})();

async function retryAsync(callback, retries) {
  try {
    await callback();
  } catch (error) {
    console.log('Error:', error.message);
    if (retries > 0) {
      console.log(`❌ Retrying (${retries} retries left)...`);
      await retryAsync(callback, retries - 1);
    } else {
      console.log('❌ Request failed after retries');
    }
  }
}
