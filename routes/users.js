const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireAdmin, requireUserOrAdmin } = require("./utils");

const {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
} = require("../db");

usersRouter.post("/users/register", async (req, res, next) => {
  const { username, password } = req.body;

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
        message: "Password needs to be at least 8 character.",
      });
    }
    const user = await createUser({
      username,
      password,
    });
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: "1 week",
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

usersRouter.post("/users/login", async (req, res, next) => {
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
      res.send({ user, message: "You're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/users/me", async (req, res, next) => {
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

//requires an admin
usersRouter.get("/users", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/users/:userId", requireAdmin, async (req, res, next) => {
  const { userId: id } = req.params;
  const { firstname, lastname, email, isAdmin } = req.body;

  try {
    const userToUpdate = await getUserById(userId);
    if (userToUpdate === undefined) {
      next({
        name: "UserNotFound",
        message: `There is no user with id #${id}`,
      });
    } else {
      const updatedUser = await updateUser({
        id,
        firstname,
        lastname,
        email,
        isAdmin,
      });
      if (updatedUser !== undefined) {
        res.send(updatedUser);
      } else {
        next({
          name: "FailedUserUpdate",
          message: "User was not updated",
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
