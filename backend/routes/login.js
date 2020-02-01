const express = require('express');
const oauth2 = require('simple-oauth2');
const axios = require('axios');
const request = require('request');
const querystring = require('querystring');
const _ = require('lodash');
const guid = require('short-uuid');
const env = require('dotenv').config();

const db = require('../dao/database.js');


const router = express.Router();

/* GET users listing. */

// TODO: need to refactor the hard coded URL's

function getToken(queryString, clientid, secret) {
  return new Promise((resolve, reject) => {
    console.log(clientid, secret);
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
  const { state, code } = req.query;
  const userPayload = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
  console.log(userPayload);
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
  console.log(db);

  await Promise.all([p1, p2, p3]).then((responses) => {
    // disabled because I have no control over the response
    // eslint-disable-next-line camelcase
    const { name, icon_img } = responses[0];
    const yang = _.filter(responses[1].data.children, (i) => (i.data.url === '/r/YangForPresidentHQ/'));
    const redirectPayload = guid.generate();
    let user = {
      guid: redirectPayload,
      name,
      username: payload.username,
      longitude: payload.longitude,
      latitude: payload.latitude,
      icon: icon_img,
      isYang: yang.length > 1,
      karma: responses[0].link_karma + responses[0].comment_karma,
    };

    if ((name == null) && (payload.username == null)) {
      throw new Error('need a username');
    }
    if (payload.longitude === 0) {
      throw new Error('need a location');
    }
    if (payload.username == null) {
      user.username = user.name;
    }
    if (user.name == null) {
      user.name = user.username;
    }

    res.redirect(`http://localhost:8080/?id=${redirectPayload}`);
  }).catch((err) => {
    console.log(err);
    const redirectPayload = querystring.stringify({
      error: err
    });
    res.redirect(`http://localhost:8080/?${redirectPayload}`);
  });
});

module.exports = router;
