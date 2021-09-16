async function requireUser(req, res, next) {
  try {
    if (!req.user) {
      res.status(401).next({
        name: "UnauthorizedAccess",
        message: "You must be logged in to perform this action",
      });
    }
    next();
  } catch ({ name, message }) {
    next({ name, message });
  }
}

async function requireAdmin(req, res, next) {
  const { isadmin } = req.body
  try {
    if (!isadmin) {
      res.status(401).next({
        name: "UnauthorizedAccess",
        message: "You do not have the proper access privileges",
      });
    }
    next();
  } catch ({ name, message }) {
    next({ name, message });
  }
}

module.exports = {
  requireUser,
  requireAdmin,
};
