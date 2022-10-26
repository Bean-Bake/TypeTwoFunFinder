const { Pool } = require('pg');

// LOADS ENV VARIABLES AUTOMATICALLY
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};