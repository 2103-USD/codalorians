const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require("./utils");

const {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} = require("../db");

usersRouter.post("/register", async (req, res, next) => {
  const { firstname, lastname, email, username, password, isadmin } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(401);
      return next({
        name: "PreExistingUser",
        message: "A user with that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      return next({
        name: "PasswordLengthError",
        message: "Password needs to be at least 8 characters.",
      });
    }
    const user = await createUser({
      firstname,
      lastname,
      email,
      username,
      password,
      isadmin,
    });
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.send({
      user,
      message: "Thank you for registering!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      name: "MissingCredentialsError",
      message: "Both a username and password are required",
    });
  }
  try {
    const user = await getUser({ username, password });
    if (!user) {
      return next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1 week" }
      );
      user.token = token;
      res.send({user, message: "You're logged in!"});
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const user = await getUserById(id);
      res.send(user);
    } else {
      res.status(401);
      next({
        name: "NotLoggedIn",
        message: "You must log in first",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter ;
