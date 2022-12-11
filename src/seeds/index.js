const dotenv = require('dotenv');
dotenv.config();

const drop = require('./drop');
const blockchain = require('./blockchain');
const organization = require('./organization');
const access = require('./access');

const database = require('../models')();

const { models } = database;
const seed = process.argv[2];

switch (seed) {
    case 'drop':
        drop(database);
        break
    case 'blockchain':
        blockchain(models);
        break
    case 'organization':
        organization(models);
        access(models);
        break
    default:
        console.log('seed não encontrado');
        break;
}