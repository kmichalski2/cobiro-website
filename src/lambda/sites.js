const axios = require('axios');
require('dotenv').config();

exports.handler =  function sites(event, context, callback) {
    const endpoint = process.env.ENDPOINT;
    
    // console.log(context)
    const domain = event.queryStringParameters.url;
    console.log('Endpoint: ', `${endpoint}https://www.${domain}`)
    axios({
        method: 'get',
        url: `${endpoint}http://${domain}`,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ data: response.data, status: 200 }),
        }),
      )
      .catch((error) => {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            data: 'Error fetching data',
            status: 500
          }),
        });
    });   
  }
