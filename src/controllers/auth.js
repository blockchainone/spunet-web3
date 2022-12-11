const services = require('../services');
const dao = require('../dao');

exports.create_token = async (req, res) => {
    await dao.accessDAO.find_access_by_orgkey(req.body.orgKey)
        .then(access => {
            if (access != null) {
                const payload = {
                    id: access.dataValues.id,
                    temp: access.dataValues.temp,
                    idOrg: access.dataValues.idOrg,
                };
                const tokenAccess = services.libs.jwt.encode(payload, process.env.SECRET);
                return res.json({
                    returnCode: 'success',
                    tokenAccess: `JWT ${tokenAccess}`,
                });
            }
            return res.status(services.http.httpStatus.UNAUTHORIZED)
                .send(services.http.httpMessage('CODIGO_INVÁLIDO'));
        })
        .catch(err => {
            console.info(err);
        });
};

exports.error = (req, res) => res.status(services.http.httpStatus.UNAUTHORIZED)
    .send(services.http.httpMessage('TOKEN_INVALIDO'));
