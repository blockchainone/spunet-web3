const services = require('../services');

module.exports = async (req, res, next) => {
    if (req.headers.authorization == '') {
        return res
            .status(services.http.httpStatus.UNAUTHORIZED)
            .send(services.http.httpMessage('TOKEN_INVALIDO'));
    }

    if (req.headers.authorization != null) {
        const idOrg = await services.utils.
            auth_token(req.headers.authorization.split(' '));
        req.body.idOrg = idOrg;
    }
    next();
};
