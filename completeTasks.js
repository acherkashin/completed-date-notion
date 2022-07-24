const { Client } = require('@notionhq/client');

async function completeTasks(databaseId, date) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const [todayDate] = date.toISOString().split('T');

  console.log(`ℹ️ Requesting tasks changed on ${date.toISOString()}`);

  const modifiedToday = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Modified At',
          date: {
            equals: todayDate,
          },
        },
        {
          property: 'Completed At',
          date: {
            is_empty: true,
          },
        },
      ],
    },
  });

  const requests = modifiedToday.results.map((page) => {
    return notion.pages.properties
      .retrieve({
        page_id: page.id,
        property_id: page.properties['List'].id,
      })
      .then((property) => {
        return { page, property };
      });
  });

  const pagesWithProperties = await Promise.all(requests);

  console.log(`ℹ️ Tasks changed on ${date.toISOString()}`);
  console.log(JSON.stringify(pagesWithProperties, null, 2));

  // status may be null if default value is used for status
  const completedToday = pagesWithProperties.filter(({ property }) => property.status?.name.includes('Done'));
  console.log(`🕙 Tasks completed today:`);
  console.log(JSON.stringify(completedToday, null, 2));

  const updateRequests = completedToday.map(({ page }) => {
    return notion.pages
      .update({
        page_id: page.id,
        properties: {
          'Completed At': {
            date: {
              start: todayDate,
            },
          },
        },
      })
      .then(
        () => console.log(`✅ Page ${page.id} is updated`),
        () => console.log(`❌ Failed to update page ${page.id}`)
      );
  });

  await Promise.all(updateRequests);

  console.log(`✅ Done`);
}

module.exports = {
  completeTasks,
};
