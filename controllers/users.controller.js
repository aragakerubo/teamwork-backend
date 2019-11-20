const bcrypt = require('bcrypt');

const {
    isValidEmail,
    isValidPassword,
    createToken
  } = require('../helpers/index.helper'),
  pool = require('../db/connection');

module.exports = {
  create: (async (req, res) => {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.password ||
      !req.body.department ||
      !req.body.address
    ) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Fill all required fields' });
    }

    if (!isValidEmail(req.body.email)) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Invalid email format' });
    }

    if (!isValidPassword(req.body.password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Password must be an alphanumeric string 8-20 characters long'
      });
    }

    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync()
    );

    const query = `INSERT INTO users(
    firstName,
    lastName,
    email,
    password,
    gender,
    jobRole,
    department,
    address)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword,
      req.body.gender,
      req.body.jobRole,
      req.body.department,
      req.body.address
    ];

    try {
      const { rows } = await pool.query(query, values);
      const webtoken = createToken(rows[0].userId, rows[0].roleType);
      const { password, ...userDetails } = rows[0].toObject();

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: webtoken,
          userDetails
        }
      });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res
          .status(400)
          .json({ status: 'error', error: 'Email already in use' });
      }

      return res.status(400).json({ status: 'error', error: err });
    }
  })().catch(e => console.error(e))
};
