const pg = require('pg-promise')({});

const db = pg({ host: 'localhost', database: 'yanggang' });
const DAO = {
  insertUser: async () => {
    query = 'select * from user_info';
    const response = await db.any(query);
    console.log(response);
  }
};

module.exports = DAO;
