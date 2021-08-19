const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURN id, username;
    `,
      [username, hashedPassword]
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
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
