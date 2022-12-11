const dotenv = require('dotenv');

if (process.env.SERVER !== 'prod') {
    dotenv.config();
}

const libs = require('./libs');
const crypt = require('./crypt');
const http = require('./http');
const utils = require('./utils');
const pinata = require('./pinata');

module.exports = {
    libs,
    crypt,
    http,
    utils,
    pinata,
};
