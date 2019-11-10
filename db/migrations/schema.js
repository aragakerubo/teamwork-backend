const pool = require('../connection');

/**
 *
 * @param {string} table Relation name
 * @param {function} tableSchema Function that returns query string
 * @returns {object} object
 */
const createTable = (table, tableSchema) =>
  (async () => {
    const res = await pool.query(tableSchema());
    console.log('Query successful');
    console.log(`${table} relation created`);
    // await pool.end();
    return res;
  })().catch(e =>
    setImmediate(() => {
      console.log(`Unable to create ${table}`);
      throw e;
    })
  );

/**
 *
 * @param {string} table Table name
 * @returns {object} object
 */
const dropTable = table =>
  (async () => {
    const res = await pool.query(`DROP TABLE IF EXISTS ${table}`);
    console.log('Query successful');
    console.log(`${table} relation deleted`);
    // await pool.end();
    return res;
  })().catch(e =>
    setImmediate(() => {
      console.log(`Unable to delete ${table}`);
      throw e;
    })
  );

module.exports = {
  createTable,
  dropTable
};
