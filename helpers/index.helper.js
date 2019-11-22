const expressJwt = require('express-jwt'),
  dotenv = require('dotenv'),
  jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
  authorize: (roles = []) => {
    if (typeof roles === 'string') {
      roles = [roles];
    }

    return [
      expressJwt({ secret: process.env.JWT_SECRET }),

      (req, res, next) => {
        const arr = req.user.roletype;
        const intersection = arr.some(el => roles.includes(el));
        if (roles.length && !intersection) {
          return res
            .status(401)
            .json({ status: 'error', error: 'Unauthorized' });
        }

        next();
      }
    ];
  },
  isValidEmail: mail =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail),
  isValidPassword: password =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password),
  createToken: (id, role) => {
    const token = jwt.sign(
      {
        userid: id,
        roletype: role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return token;
  }
};
