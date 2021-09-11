function requireUserOrAdmin(req, res, next) {
  try {
    if (!req.user || !req.isadmin) {
      next({
         name: "MissingCredsError",
         message: "You do not have the proper credentials to perform this action",
       });
    }}
    catch ({name, message}) {
      next({name, message})
  }
}

function requireAdmin(req, res, next) {
  try {
    if (!req.user.isadmin) {
      next({
        name: "MissingAdminError",
        message: "You must be an admin to perform this action",
      });
    }
   }
  catch({name, message}) {
    next({name, message});
  }
}


module.exports = {
  requireUserOrAdmin,
  requireAdmin
};

