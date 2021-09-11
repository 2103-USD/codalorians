const client = require("./client.js");

async function createReview({ review, rating, productid, userid }) {
  try {
    const {
      rows: [newReview],
    } = await client.query(
      `
      INSERT INTO reviews(userid, productid, rating, review)
      VALUES($1, $2, $3, $4)
      RETURNING *;`,
      [userid, productid, rating, review ]
    );
    console.log(newReview)
    return newReview;
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createReview };