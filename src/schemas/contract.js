const services = require('../services');
// eslint-disable-next-line consistent-return

const contractDeploySchema = services.libs.yup.object().shape({
    idBlockchain: services.libs.yup.string().strict().min(1).required(),
});

const contractDeleteSchema = services.libs.yup.object().shape({
    idContract: services.libs.yup.string().strict().min(1).required(),
});

module.exports = {
    contractDeploySchema,
    contractDeleteSchema,
};
