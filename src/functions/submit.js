const axios = require('axios');
require('dotenv').config();

exports.handler =  function sites(event, context, callback) {
  const querystring = require('querystring');
    body = JSON.parse(event.body)
    const searchParams = querystring.stringify(body.data);

    const endpoint = process.env.FORMS_ENDPOINT;

    axios({
        method: 'get',
        url: `${endpoint}${body.endpoint}?${searchParams}`,
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
            data: `Error sending data: ${error}`,
            status: 500
          }),
        });
    });   
  }