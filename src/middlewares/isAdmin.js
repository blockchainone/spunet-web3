const dao = require('../dao');
const services = require('../services');

module.exports = async (req, res, next) => {
    const { idOrg } = req.body;
    const organization = await dao.orgDAO.find_organization(idOrg);
    // usuário comum
    if (organization.dataValues.perfil === 0) {
        return res
            .status(services.http.httpStatus.UNAUTHORIZED)
            .send(services.http.httpMessage('USUARIO_NAO_AUTORIZADO'));
    }
    next();
};
