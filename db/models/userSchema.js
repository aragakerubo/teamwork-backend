const { createTable, dropTable } = require('../migrations/schema');

module.exports = {
  createUserTable: () => {
    return createTable(
      'users',
      () => `
    CREATE TABLE IF NOT EXISTS 
    users (
    userId UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(25) NOT NULL,
    email VARCHAR(75) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    passwordToken VARCHAR,
    gender VARCHAR(6),
    jobRole VARCHAR(25),
    department VARCHAR(25) NOT NULL,
    address VARCHAR NOT NULL,
    avatar VARCHAR,
    roleType TEXT[] DEFAULT '{author}',
    createdOn TIMESTAMP DEFAULT NOW(),
    lastSeen TIMESTAMP);`
    );
  },
  dropUserTable: () => dropTable('users')
};

require('make-runnable');
