const db = require('../models')();

const create_model = (
    id,
    description,
    attr,
    modelName,
    attrNotNull,
    idOrg,
) => {
    const { Models } = db.models;
    return Models.create({
        id,
        description,
        attr,
        modelName,
        attrNotNull,
        idOrg,
    });
};

const find_model = (idModel, idOrg) => {
    const { Models } = db.models;
    return Models.findOne({
        where: {
            id: idModel,
            idOrg,
        },
    });
};

const find_model_by_modelName = (modelName, idOrg) => {
    const { Models } = db.models;
    return Models.findOne({
        where: {
            modelName,
            idOrg,
        },
    });
};

const find_all_Model = () => {
    const { Models } = db.models;
    return Models.findAll({});
};

const delete_model = (id, idOrg) => {
    const { Models } = db.models;
    Models.destroy({
        where: {
            id,
            idOrg,
        },
    });
};

module.exports = {
    create_model,
    find_model,
    find_model_by_modelName,
    find_all_Model,
    delete_model,
};
