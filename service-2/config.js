require('dotenv').config();

const HOST = process.env.HOST;
const QUEUE = process.env.QUEUE;

module.exports = {
  HOST,
  QUEUE,
};
