# Completed Date Notion

Notion doesn't have an option to setup date when task is completed. So aim of the repository is setting "Completed At" property to have visibility of how many tasks were completed and when.

## How it works

"Modified At" property is used to setup Completed Date. All the tasks that modified today, have "Completed" status and empty "Completed At" property will get assigned "Modified At" value to the "Completed At" property. 

## Completed Date for old tasks

In case, you have many old tasks, it is still possible to initialize "Completed At" field. To initialize it, you need to specify `startDate` and `endDate` in `completeOldTasks.js` and run it `node completeOldTasks.js` 