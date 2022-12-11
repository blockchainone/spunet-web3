const db = require('../models')();

const create_document = (
    id,
    idOrg,
    idContract,
    idModel,
    values,
    cid,
    blockchain,
) => {
    const { Documents } = db.models;
    return Documents.create({
        id,
        idOrg,
        idContract,
        idModel,
        values,
        cid,
        blockchain,
    });
};

const update_document = (id, idOrg, idContract, idModel, values, blockchain) => {
    const { Documents } = db.models;
    return Documents.update({
        idOrg, idContract, idModel, values, blockchain,
    }, { where: { id } });
};

const find_document = (idDocument, idOrg) => {
    const { Documents } = db.models;
    return Documents.findOne({
        where: {
            id: idDocument,
            idOrg,
        },
    });
};

const delete_document = (idDocument, idOrg) => {
    const { Documents } = db.models;
    Documents.destroy({
        where: {
            id: idDocument,
            idOrg,
        },
    });
};

const find_last_document = (idOrg) => {
    const { Documents } = db.models;
    return Documents.findOne({
        where: {
            idOrg,
        },
        order: [['updated_at', 'DESC']],
    });
};

const find_document_by_model = (idModel, idOrg) => {
    const { Documents } = db.models;
    return Documents.findOne({
        where: {
            idModel,
            idOrg,
        },
    });
};

const find_document_by_contract = (idDocument, idContract, idOrg) => {
    const { Documents } = db.models;
    return Documents.findOne({
        where: {
            id: idDocument,
            keyContract: idContract,
            idOrg,
        },
    });
};

const find_all_document = () => {
    const { Documents } = db.models;
    return Documents.findAll();
};

const find_all_document_by_idContract = (idContract, idOrg) => {
    const { Documents } = db.models;
    return Documents.findAll({
        where: {
            idContract,
            idOrg,
        },
    });
};

module.exports = {
    create_document,
    update_document,
    find_document,
    delete_document,
    find_last_document,
    find_document_by_model,
    find_document_by_contract,
    find_all_document,
    find_all_document_by_idContract,
};
