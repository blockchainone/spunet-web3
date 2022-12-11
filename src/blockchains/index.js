const modules = require('./modules');
const services = require('../services');
const dao = require('../dao');

const deploy_contract = async (parameters) => modules.web3.deploy_contract(
    parameters,
);

const remove_contract = async (parameters) => {
    const org = await dao.orgDAO.find_organization(parameters.idOrg);
    result = {
        status: services.http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            Contracts: {
                idContract: parameters.idContract,
                blockchain: parameters.blockchain,
                address: parameters.address,
            },
        },
    };
    dao.contractDAO
        .delete_contract_by_id_contract(parameters.idContract, parameters.idOrg);

    return result;
};

const write_document = async (parameters) => modules.web3.write_document(
    parameters,
);

const read_document = async (parameters) => modules.web3.read_document(
    parameters,
);

const update_document = async (parameters) => modules.web3.update_document(
    parameters,
);

const delete_contract = async (parameters) => {
    result = {
        status: services.http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            Contracts: {
                idContract: parameters.idContract,
                blockchain: parameters.blockchain,
                address: parameters.address,
            },
        },
    };
    dao.contractDAO
        .delete_contract_by_id_contract(parameters.idContract,
            parameters.idOrg);
    return result;
};

const metadata_document = async (parameters) => {
    const {
        cid,
    } = parameters;
    metadados = await services.pinata.query_metadata_ipfs(cid);
    return result = {
        status: services.http.httpStatus.BAD_REQUEST,
        message: metadados,
    };
};

module.exports = {
    deploy_contract,
    remove_contract,
    write_document,
    read_document,
    update_document,
    delete_contract,
    metadata_document,
};
