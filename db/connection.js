const dotenv = require('dotenv'),
  { Pool } = require('pg');

dotenv.config();

let pool = new Pool();

// Database configurations for different enviroments
if (process.env.NODE_ENV === 'production') {
  const connection = `${process.env.DATABASE_URL}?ssl=true`;
  pool = new Pool(connection);
} else if (process.env.NODE_ENV === 'testing') {
  const connection = process.env.PGURL_TEST;
  pool = new Pool(connection);
}

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
