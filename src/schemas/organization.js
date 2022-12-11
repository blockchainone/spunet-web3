const services = require('../services');
// eslint-disable-next-line consistent-return

const orgCpfSchema = services.libs.yup.object().shape({
    nameOrg: services.libs.yup.string().strict().required(),
    emailOrg: services.libs.yup.string().strict().required(),
    nameResponsible: services.libs.yup.string().strict().required(),
    cpfResponsible: services.libs.yup.string().strict().required(),
});

const orgCnpjSchema = services.libs.yup.object().shape({
    nameOrg: services.libs.yup.string().strict().required(),
    emailOrg: services.libs.yup.string().strict().required(),
    nameResponsible: services.libs.yup.string().strict().required(),
    cpfResponsible: services.libs.yup.string().strict().required(),
    cnpjOrg: services.libs.yup.string().strict().required(),
});

const tokenSchema = services.libs.yup.object().shape({
    orgKey: services.libs.yup.string().strict().required(),
});

const getBalanceSchema = services.libs.yup.object().shape({
    blockchain: services.libs.yup.string().strict().required(),
});

const validateSchema = services.libs.yup.object().shape({
    idDocument: services.libs.yup.string().strict().required(),
    hashDoc: services.libs.yup.string().strict().required(),
});

const org_validation = () => async (req, res, next) => {
    const aux = Object.values(req.body);
    for (let i = 0; i < aux.length; i += 1) {
        if (aux[i] === '' || aux[i] === 'null') {
            return res.status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('CAMPO_VAZIO'));
        }
    }
    if (aux[4] !== undefined) {
        try {
            await orgCnpjSchema.validate(req.body);
            return next();
        } catch (error) {
            console.info(error.errors);
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('SINTAXE_INCONSISTENTE'));
        }
    } else {
        try {
            await orgCpfSchema.validate(req.body);
            return next();
        } catch (error) {
            console.info(error.errors);
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('SINTAXE_INCONSISTENTE'));
        }
    }
};

module.exports = {
    org_validation,
    tokenSchema,
    getBalanceSchema,
    validateSchema,
};
