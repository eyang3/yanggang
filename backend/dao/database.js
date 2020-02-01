/* eslint-disable no-param-reassign */
const pg = require('pg-promise')({});

const db = pg({ host: 'localhost', database: 'yanggang' });
const DAO = {
  insertUser: async (payload) => {
    console.log(payload);
    const validated = payload.isYang && (payload.karma > 100);
    if (payload.name === null) {
      payload.name = payload.username;
    }
    console.log(payload.username);
    query = `INSERT INTO user_info (guid, validated, username, geom, show_username, message)
             values ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7) ON CONFLICT (username)
             DO
             UPDATE
             SET (show_username, message, geom)= ($6, $7, ST_SetSRID(ST_MakePoint($4, $5), 4326))
             returning guid
             `;
    const response = await db.one(query, [payload.guid, validated, payload.name, payload.longitude,
    payload.latitude, payload.username, payload.message]);
    return (response.guid);
  },

  getUser: async (guid) => {
    query = 'SELECT * from user_info where guid = $1';
    const response = await db.one(query, [guid]);
    return (response);
  }

};

module.exports = DAO;
