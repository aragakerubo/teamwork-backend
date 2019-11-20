const usersCtrl = require('../controllers/users.controller'),
  { authorize } = require('../helpers/index.helper'),
  roleType = require('../helpers/roles.helper');

module.exports = router => {
  /**
   *
   *
   */
  router.post(
    '/auth/create-user',
    authorize(roleType.Admin),
    (req, res, next) => {
      usersCtrl.create(req, res);
      next();
    }
  );
};
