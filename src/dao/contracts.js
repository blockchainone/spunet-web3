const db = require('../models')();

const create_contract = (
    id,
    idOrg,
    blockchain,
    address,
) => {
    const { Contracts } = db.models;
    return Contracts.create({
        id,
        idOrg,
        blockchain,
        address,
    });
};

const find_contract_by_key = (idContract, idOrg) => {
    const { Contracts } = db.models;
    return Contracts.findOne({
        where: {
            id: idContract,
            idOrg,
        },
    });
};

const find_contract_by_block = (idOrg, blockchain) => {
    const { Contracts } = db.models;
    return Contracts.findOne({
        where: {
            id: idContract,
            idOrg,
            blockchain,
        },
    });
};

const find_all_Contract = () => {
    const { Contracts } = db.models;
    return Contracts.findAll();
};

const find_all_contract_by_idOrg = (idOrg) => {
    const { Contracts } = db.models;
    return Contracts.findAll({
        where: {
            idOrg,
        },
    });
};

const delete_contract_by_id_contract = (idContract, idOrg) => {
    const { Contracts } = db.models;
    Contracts.destroy({
        where: {
            id: idContract,
            idOrg,
        },
    });
};

const delete_all_contract_by_idOrg = (idOrg) => {
    const { Contracts } = db.models;
    Contracts.destroy({
        where: {
            idOrg,
        },
    });
};

module.exports = {
    create_contract,
    find_contract_by_key,
    find_contract_by_block,
    find_all_Contract,
    find_all_contract_by_idOrg,
    delete_contract_by_id_contract,
    delete_all_contract_by_idOrg,
};
