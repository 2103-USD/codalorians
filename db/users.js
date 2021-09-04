const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({
  firstname,
  lastname,
  email,
  imageurl,
  username,
  password,
  isadmin,
}) {
  const SALT_COUNT = 10;
  const hashedpassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(firstname, lastname, email, imageurl, username, password, isadmin)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username;
    `,
      [firstname, lastname, email, imageurl, username, hashedpassword, isadmin]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (comparePassword) {
      delete user.password;
      return user;
    } else {
      throw "Password not a match";
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * 
            FROM users 
            WHERE username = $1;
        `,
      [username]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUsers() {
  try {
    const {
      rows: [usersList],
    } = await client.query(`SELECT * FROM users`);
    usersList.forEach((user) => delete user.password);
    return usersList;
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
              SELECT * FROM users
              WHERE id = $1;
          `,
      [userId]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
}

//needs eyes on it before being pushed
async function updateUser({ id, firstname, lastname, email, isAdmin }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET firstname = $1, lastname = $2, email = $3, isAdmin = $4
      WHERE id = ${id}
      RETURNING *;
    `,
      [firstname, lastname, email, isAdmin]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
};
