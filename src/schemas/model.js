const services = require('../services');
// eslint-disable-next-line consistent-return

const modelSchema = services.libs.yup.object().shape({
    description: services.libs.yup.string().strict().min(1).required(),
    attributes: services.libs.yup.array().strict()
        .of(services.libs.yup.lazy(value => (typeof value === 'string' ?
            services.libs.yup.string()
            : services.libs.yup.string().required()
        )))
        .required(),
    modelName: services.libs.yup.string().strict().min(1).required(),
    attrNotNull: services.libs.yup.string().strict().min(1),
});

const modelDeleteSchema = services.libs.yup.object().shape({
    idModel: services.libs.yup.string().strict().min(1).required(),
});

module.exports = {
    modelSchema,
    modelDeleteSchema,
};
