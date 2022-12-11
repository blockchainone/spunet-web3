const services = require('../services');
// eslint-disable-next-line consistent-return

const writeSchema = services.libs.yup.object().shape({
    idContract: services.libs.yup.string().strict().min(1).required(),
    idModel: services.libs.yup.string().strict().min(1).required(),
    value: services.libs.yup.array().strict()
        .of(services.libs.yup.lazy(value => (typeof value === 'string' ?
            services.libs.yup.string()
            : services.libs.yup.string().required()
        )))
        .required(),
});

const readSchema = services.libs.yup.object().shape({
    idDocument: services.libs.yup.string().strict().min(1).required(),
});

const updateSchema = services.libs.yup.object().shape({
    idDocument: services.libs.yup.string().strict().min(1).required(),
    attributes: services.libs.yup.array().strict()
        .of(services.libs.yup.lazy(value => (typeof value === 'string' ?
            services.libs.yup.string()
            : services.libs.yup.string().required()
        )))
        .required(),
    value: services.libs.yup.array().strict()
        .of(services.libs.yup.lazy(value => (typeof value === 'string' ?
            services.libs.yup.string()
            : services.libs.yup.string().required()
        )))
        .required(),
});

const metadataSchema = services.libs.yup.object().shape({
    cid: services.libs.yup.string().strict().min(1).required(),
});

const deleteSchema = services.libs.yup.object().shape({
    idDocument: services.libs.yup.string().strict().min(1).required(),
});

module.exports = {
    writeSchema,
    readSchema,
    updateSchema,
    metadataSchema,
    deleteSchema,
};
