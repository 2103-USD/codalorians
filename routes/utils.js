function requireUserOrAdmin(req, res, next) {
  if (!req.user || !req.isadmin) {
    return next({
      name: "MissingCredsError",
      message: "You do not have the proper credentials to perform this action",
    });
  }
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.isadmin) {
    return next({
      name: "MissingAdminError",
      message: "You must be an admin to perform this action",
    });
  }
  return next();
}

module.exports = {
  requireUserOrAdmin,
<<<<<<< HEAD
  requireAdmin
=======
  requireAdmin,
>>>>>>> 58536fec43b6050fe4d6022caba5a76c199a4a63
};
