const client = require('./client');
const { rebuildDB } = require('./seedData');

rebuildDB()
  .catch((error) => console.error(error))
  .finally(() => client.end());