require('dotenv').config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const QUEUE = process.env.QUEUE;

module.exports = {
  PORT,
  HOST,
  QUEUE,
};
