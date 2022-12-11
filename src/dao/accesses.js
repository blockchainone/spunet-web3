const db = require('../models')();

const create_access = (
    key,
    addres,
    blockchain,
    idModel,
    idOrg,
) => {
    const { Contracts } = db.models;
    return Contracts.create({
        key,
        addres,
        blockchain,
        idModel,
        idOrg,
    });
};

const update_access = (temp, id) => {
    const { Accesses } = db.models;
    return Accesses.update(
        { temp },
        { where: { id } },
    );
};

const find_access = () => {
    const { Accesses } = db.models;
    return Accesses.findAll();
};

const find_access_by_idOrg = (idOrg) => {
    const { Accesses } = db.models;
    return Accesses.findOne({
        idOrg,
    });
};

const find_access_by_orgkey = (orgKey) => {
    const { Accesses } = db.models;
    return Accesses.findOne({
        where: {
            value: orgKey,
        },
    });
};

module.exports = {
    create_access,
    update_access,
    find_access,
    find_access_by_idOrg,
    find_access_by_orgkey
};
