const pool = require('../db/connection');

/**
 *
 * @param {string} table Relation name
 * @param {function} tableSchema Function that returns query string
 * @returns {object} object
 */
const createTable = (table, tableSchema) => {
  return new Promise((resolve, reject) => {
    pool
      .query(tableSchema())
      .then(res => {
        resolve(res);
        console.log(`${table} relation created`);
        pool.end();
      })
      .catch(err => {
        reject(err);
        console.error(`Unable to create ${table} ------ ${err}`);
        pool.end();
      });
  });
};

/**
 *
 * @param {string} table Table name
 * @returns {object} object
 */
const dropTable = table => {
  return new Promise((resolve, reject) => {
    pool
      .query(`DROP TABLE IF EXISTS ${table}`)
      .then(res => {
        resolve(res);
        console.log(`${table} relation deleted`);
        pool.end();
      })
      .catch(err => {
        reject(err);
        console.error(`Unable to delete ${table} ------ ${err}`);
        pool.end();
      });
  });
};

module.exports = {
  createTable,
  dropTable
};
