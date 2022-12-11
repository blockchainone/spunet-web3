/* eslint-disable consistent-return */
const services = require('../services');

module.exports = async (req, res, next) => {
    if (Object.keys(req.body).length > 1) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('FORMATO_INVALIDO'));
    }
    next();
};
