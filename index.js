const { Client } = require('@notionhq/client');
require('dotenv').config()

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
    const databaseId = process.env.DATABASE_ID;
    // const now = new Date("2022-07-20T04:51:27.000Z");
    const now = new Date()
    const [withoutTime] = now.toISOString().split('T');
    
    console.log(`Requesting tasks changed on ${now.toISOString()}`);

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
            "and": [
              {
                "property": "Modified At",
                "date": {
                    "equals": withoutTime
                }
              },
              {
                "property": "Completed At",
                "date": {
                  "is_empty": true,
                }
              }
            ]
      },
    });

    const requests = response.results.map(page => {
        return notion.pages.properties.retrieve({
            page_id: page.id, 
            property_id: page.properties['List'].id
        }).then((property) => {
            return { page, property };
        })
    });

    const pagesWithProperties = await Promise.all(requests);

    console.log(`Tasks changed on ${now.toISOString()}`);
    console.log(JSON.stringify(pagesWithProperties, null, 2));

    // status may be null if default value is used for status
    const completedToday = pagesWithProperties.filter(item => item.property.status?.name.includes("Done"));
    console.log(`Tasks completed today`);
    console.log(JSON.stringify(completedToday, null, 2));
  })();