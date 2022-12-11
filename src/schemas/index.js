const organization = require('./organization');
const contract = require('./contract');
const model = require('./model');
const document = require('./document');
const other = require('./other');

module.exports = {
    ...organization,
    ...contract,
    ...model,
    ...document,
    ...other
};
