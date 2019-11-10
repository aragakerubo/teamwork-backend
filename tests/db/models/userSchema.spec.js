const { describe, it } = require('mocha'),
  { expect } = require('chai');

const pool = require('../../../db/connection');

const { dropUserTable } = require('../../../db/models/userSchema');

describe('User Relation', () => {
  const mssg = `SELECT COLUMN_NAME, DATA_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME = 'users';`;

  it('should have a table with 14 columns', done => {
    (async () => {
      const client = await pool.connect();
      try {
        const res = await pool.query(mssg);
        console.log(res);
        expect(res.rows.length).to.equal(14);
      } finally {
        client.release();
      }
    })().catch(e => console.error(e.stack));

    done();
  });

  it('should not exist once it has been dropped', done => {
    (async () => {
      const client = await pool.connect();
      try {
        await dropUserTable();
        const res = await pool.query(`SELECT EXISTS 
        (
          SELECT 1
          FROM information_schema.tables 
          WHERE table_name = 'users'
        );`);
        console.log(res);
        expect(res.rows[0]).to.equal(['f']);
      } finally {
        client.release();
      }
    })().catch(e => console.error(e.stack));

    done();
  });
});
