const { describe, it } = require('mocha'),
  chai = require('chai'),
  chaiHttp = require('chai-http');

const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('It should connect the server', () => {
  it('should return the server port 5000', () => {
    expect(server.address().port).to.equal(5000);
  });
});
