const dotenv = require('dotenv'),
  { Pool } = require('pg');

dotenv.config();

let pool = new Pool();

// Database configurations for different enviroments
if (process.env.NODE_ENV === 'production') {
  const connection = `${process.env.DATABASE_URL}?ssl=true`;
  pool = new Pool(connection);
} else if (process.env.NODE_ENV === 'testing') {
  pool = new Pool({
    user: process.env.PGUSER_TEST,
    host: process.env.PGHOST_TEST,
    database: process.env.PGDATABASE_TEST,
    password: process.env.PGPASSWORD_TEST,
    port: process.env.PGPORT_TEST
  });
}

pool.on('connect', () => {
  console.log('Successfully connected to the database');
});

pool.on('error', err => {
  console.error(`Unexpected error on idle client ${err}`);
  process.exit(-1);
});

module.exports = pool;
