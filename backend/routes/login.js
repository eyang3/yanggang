const express = require('express');
const oauth2 = require('simple-oauth2');
const axios = require('axios');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');
const _ = require('lodash');
/* GET users listing. */

// TODO: need to refactor the hard coded URL's

function getToken(queryString, clientid, secret) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: 'https://www.reddit.com/api/v1/access_token',
      body: queryString,
      withCredentials: true,
      auth: {
        username: clientid,
        password: secret
      }
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
}

function getAPI(url, token) {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      //url: 'https://oauth.reddit.com/api/v1/me',
      //url: 'https://oauth.reddit.com/subreddits/mine/subscribed?show=all',
      url,
      headers: {
        Authorization: `bearer ${token}`,
        'User-Agent': 'Node.js'

      }
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });

}

router.get('/', async (req, res, next) => {
  const { code } = req.query;
  const clientid = process.env.VUE_APP_REDDIT;
  const secret = process.env.VUE_APP_SECRET;
  const payload = {
    redirect_uri: 'http://localhost:3000/getUser',
    code,
    grant_type: 'authorization_code'
  };
  const queryString = querystring.stringify(payload);
  const response = await getToken(queryString, clientid, secret);
  const p1 = getAPI('https://oauth.reddit.com/api/v1/me', response.access_token);
  const p2 = getAPI('https://oauth.reddit.com//subreddits/mine/subscriber?show=all', response.access_token);
  await Promise.all([p1, p2]).then((responses) => {
    const { name, icon_img } = responses[0];
    console.log(name, icon_img);
    console.log(responses[1].data.children);
    const yang = _.filter(responses[1].data.children, (i) => (i.data.url === '/r/YangForPresidentHQ/'));
    console.log(yang);
  });
  res.send('complete');
});

module.exports = router;
