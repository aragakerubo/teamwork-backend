const usersRoute = require('./users.route');

module.exports = router => {
  usersRoute(router);
  return router;
};
