const auth = require('./auth');
const blockjson = require('./blockjson');
const formToJson = require('./formToJson');
const isAdmin = require('./isAdmin');
const validToken = require('./validToken');
const blockchain = require('./blockchain');
const cronJob = require('./cronJob');

const { libs } = require('../services');

const { formidable } = libs;

module.exports = {
    auth,
    blockjson,
    formToJson,
    isAdmin,
    validToken,
    formidable,
    blockchain,
    cronJob,
};
