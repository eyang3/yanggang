var express = require('express');
var router = express.Router();
const oauth2 = require('simple-oauth2');
/* GET users listing. */
router.get('/', async function(req, res, next) {
 const code = req.query.code;
  const options = {
    code,
    state: 'same-random-unique-string',
    redirect_uri: 'http://localhost:3000/login'
  };
  console.log('test');
  try {
    // The resulting token.
    const result = await oauth2.authorizationCode.getToken(options);

    // Exchange for the access token.
    const token = oauth2.accessToken.create(result);

    return res.status(200).json(token);
  } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
  }
});

module.exports = router;
