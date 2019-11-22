const bcrypt = require('bcrypt');

const {
    isValidEmail,
    isValidPassword,
    createToken
  } = require('../helpers/index.helper'),
  pool = require('../db/connection');

module.exports = {
  create: async (req, res) => {
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
        error:
          'Password must be an alphanumeric string 8-20 characters long with atleast one capital letter'
      });
    }

    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync()
    );

    const query = `INSERT INTO users(
    firstname,
    lastname,
    email,
    password,
    gender,
    jobrole,
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
      const webtoken = createToken(rows[0].userid, rows[0].roletype);
      const {
        userid,
        firstname,
        lastname,
        email,
        jobrole,
        department,
        roletype,
        avatar
      } = rows[0];

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token: webtoken,
          userid,
          firstname,
          lastname,
          email,
          jobrole,
          department,
          roletype,
          avatar
        }
      });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res
          .status(409)
          .json({ status: 'error', error: 'Email already in use' });
      }

      return res.status(400).json({ status: 'error', error: err });
    }
  },
  signin: async (req, res) => {
    if (!req.body.email || !req.body.password) {
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
        error:
          'Password must be an alphanumeric string 8-20 characters long with atleast one capital letter'
      });
    }

    const query = `SELECT * FROM users WHERE email = $1`;

    try {
      const { rows } = await pool.query(query, [req.body.email]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Please make sure your email & password are correct'
        });
      }

      await bcrypt.compare(req.body.password, rows[0].password, (e, same) => {
        if (same === true) {
          const webtoken = createToken(rows[0].userid, rows[0].roletype);
          const {
            userid,
            firstname,
            lastname,
            email,
            jobrole,
            department,
            roletype,
            avatar
          } = rows[0];

          return res.status(200).json({
            status: 'success',
            data: {
              token: webtoken,
              userid,
              firstname,
              lastname,
              email,
              jobrole,
              department,
              roletype,
              avatar
            }
          });
        }

        return res.status(401).json({
          status: 'error',
          error: 'Authentication error: Wrong email or password'
        });
      });
    } catch (err) {
      return res.status(400).json({ status: 'error', error: err });
    }
  }
};
