const { createTable, dropTable } = require('../migrations/schema');

module.exports = {
  /**
   * @swagger
   * definitions:
   *  User:
   *    type: object
   *    properties:
   *      userId:
   *        type: uuid
   *        description: A unique identifier of the user. Automatically assigned by the API when the user is created.
   *      firstName:
   *        type: varchar(25)
   *        description: The user's first name.
   *      lastName:
   *        type: varchar(25)
   *        description: The user's last name.
   *      email:
   *        type: varchar(75)
   *        description: The user's unique email.
   *      password:
   *        type: varchar
   *        description: The user's account password.
   *      passwordToken:
   *        type: varchar
   *        description: The account webtoken.
   *      gender:
   *        type: varchar(6)
   *        description: The user's gender.
   *      jobRole:
   *        type: varchar(25)
   *        description: The user's company job role.
   *      department:
   *        type: varchar(25)
   *        description: The company department the user is under.
   *      address:
   *        type: varchar
   *        description: The user's address.
   *      avatar:
   *        type: varchar
   *        description: The user's profile picture.
   *      roleType:
   *        type: text
   *        description: The user's access roles. Default value assigned is 'author'.
   *      createdOn:
   *        type: timestamp
   *        description: The timestamp of account creation. Automatically assigned by the API when the user is created.
   *      lastSeen:
   *        type: timestamp
   *        description: The timestamp of last account activity. Automatically assigned by the API when the user is signed out.
   */
  /**
   * @returns {function} createTable function
   */
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
