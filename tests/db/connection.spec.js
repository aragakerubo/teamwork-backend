const { describe, it } = require('mocha'),
  { expect } = require('chai'),
  sinon = require('sinon');

const pool = require('../../db/connection');

describe('Database', () => {
  const checkConsole = sinon.spy(console, 'log');

  afterEach(() => {
    checkConsole.restore();
  });

  it('should log "Successfully connected to the database" on connection', done => {
    const msg = 'Successfully connected to the database';

    (async () => {
      await pool.connect();
      expect(checkConsole.calledWith(msg)).to.be.true;

      await pool.end();
    })().catch(() => {});

    done();
  });
});
