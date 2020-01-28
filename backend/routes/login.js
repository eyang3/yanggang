const express = require('express');
const oauth2 = require('simple-oauth2');
const axios = require('axios');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');
const _ = require('lodash');
const guid = require('short-uuid');

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
  const p2 = getAPI('https://oauth.reddit.com/subreddits/mine/subscriber?show=all', response.access_token);
  const p3 = getAPI('https://oauth.reddit.com/api/v1/me/karma', response.access_token);
  await Promise.all([p1, p2, p3]).then((responses) => {
    const { name, icon_img } = responses[0];
    const yang = _.filter(responses[1].data.children, (i) => (i.data.url === '/r/YangForPresidentHQ/'));
    const redirectPayload = guid.generate();
    const user = {
      guid: redirectPayload,
      name,
      icon: icon_img,
      isYang: yang.length > 1,
      karma: responses[0].link_karma + responses[0].comment_karma,
    };
    res.redirect(`http://localhost:8080/?id=${redirectPayload}`);
  }).catch((err) => {
    const redirectPayload = querystring.stringify({
      error: 'not in reddit'
    });
    res.redirect(`http://localhost:8080/?${redirectPayload}`);
  });
});

module.exports = router;
