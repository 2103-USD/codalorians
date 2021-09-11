const client = require("./client.js");

async function createReview({ review, rating, productid, userid }) {
  try {
    const {
      rows: [newReview],
    } = await client.query(
      `
      INSERT INTO reviews(review, rating, productid, userid)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
            `,
      [review, rating, productid, userid]
    );
    return newReview;
  } catch (error) {
    throw(error);
  }
}

module.exports = { createReview };