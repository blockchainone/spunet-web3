const services = require('../services');
// eslint-disable-next-line consistent-return

const general_validation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        console.info(error.errors);
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('SINTAXE_INCONSISTENTE'));
    }
};

module.exports = {
    general_validation,
};
