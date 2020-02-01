/* eslint-disable no-param-reassign */
const pg = require('pg-promise')({});

const db = pg({ host: 'localhost', database: 'yanggang' });
const DAO = {
  insertUser: async (payload) => {
    /**

  const user = {
      guid: redirectPayload,
      name,
      username: payload.username,
      longitude: payload.longitude,
      latitude: payload.latitude,
      icon: icon_img,
      isYang: yang.length > 1,
      karma: responses[0].link_karma + responses[0].comment_karma,
    };

     */
    const validated = payload.isYang && (payload.karma > 100);
    if (payload.name === null) {
      payload.name = payload.username;
    }
    query = `INSERT INTO user_info (guid, validated, username, geom, show_username)
             values ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6) ON CONFLICT (username)
             DO
             UPDATE
             SET show_username = $6
             geom = ST_SetSRID(ST_MakePoint($4, $5), 4326), $6)
             `;
    const response =
      await db.any(query, [payload.guid, validated, payload.name, payload.longitude, payload.latitude, payload.username]);
    console.log(response);
  }
};

module.exports = DAO;
