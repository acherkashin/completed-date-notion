const { Client } = require('@notionhq/client');
require('dotenv').config()

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
    const databaseId = process.env.DATABASE_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
            "and": [
              {
                "property": "Modified At",
                "date": {
                    "equals": "2022-07-18"
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
    
    console.log(pagesWithProperties.filter(item => item.property.status.name.includes("Done")));
    // const listId = response.results[0].properties['List'].id;
    // const listValue = await notion.pages.properties.retrieve({page_id: response.results[0].id, property_id: listId})
    // console.log(listValue);
  })();