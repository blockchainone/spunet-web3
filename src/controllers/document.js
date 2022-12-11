/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const dao = require('../dao');
const blockchain = require('../blockchains');
const services = require('../services');

exports.write_document = async (req, res) => {
    const {
        contract, idModel, value, idOrg, chainId, cid
    } = req.body;
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const idDocument = services.libs.uniqid('dc');
    const parameters = {
        idBlockchain,
        idDocument,
        idModel,
        idOrg,
        chainId,
        contract,
        value,
        cid
    };

    result = await blockchain.write_document(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.read_document = async (req, res) => {
    const {
        idDocument, document, contract, idOrg,
    } = req.body;

    const model = await dao.modelDAO.find_model(document.dataValues.idModel, idOrg);
    const attributes = model.dataValues.attr.split(';');
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const date = document.updated_at;
    const address = contract.dataValues.address;
    const parameters = {
        idBlockchain,
        idDocument,
        idOrg,
        attributes,
        address,
        date
    };
    result = await blockchain.read_document(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.update_document = async (req, res) => {
    const {
        contract, chainId, idDocument, document, attributes, value, idOrg
    } = req.body;
    const model = await dao.modelDAO.find_model(document.dataValues.idModel, idOrg);
    const attr = model.dataValues.attr.split(';');
    for (let i = 0; i < attributes.length; i++) {
        if (!attr.includes(attributes[i])) {
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http
                    .httpMessage('ATRIBUTOS_INVALIDOS',
                        'Atributo inexistente no modelo requisitado.'));
        }
    }
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const parameters = {
        idBlockchain,
        idOrg,
        chainId,
        idDocument,
        value,
        attributes,
        contract,
        document,
        req
    };
    result = await blockchain.update_document(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.metadata_document = async (req, res) => {
    const {
        cid,
    } = req.body;
    result = await blockchain.metadata_document({ cid });
    return res
        .status(result.status)
        .send(result.message);
};

exports.documents_delete = async (req, res) => {
    const { idDocument, document, idOrg } = req.body;
    const org = await dao.orgDAO.find_organization(idOrg);
    const parameters = {
        document,
        idDocument,
        idOrg,
        org,
    };
    result = await blockchain.delete_doc(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.validate_document = async (req, res) => {
    const {
        idDocument,
        document,
        contract,
        idOrg,
        hashDoc,
    } = req.body;

    const model = await dao.modelDAO.find_model(document.dataValues.idModel, idOrg);
    const attributes = model.dataValues.attr.split(';');
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const date = document.updated_at;
    const address = contract.dataValues.address;

    const parameters = {
        idBlockchain,
        idDocument,
        idOrg,
        attributes,
        address,
        date
    };
    const response = await blockchain.read_document(parameters);
    if (response == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('BLOCKCHAIN_INVALIDA'));
    }

    if (response.message.document.hashDoc === hashDoc) {
        result = {
            returnCode: 'success',
            validate: true,
            blockExplorer:
                await services.utils.get_block_explorer(idBlockchain, address),
        };
    } else {
        result = {
            returnCode: 'failed',
            validate: false,
            message:
                'O hashDoc que foi passado não condiz com o que está gravado em blockchain.',
        };
    }
    return res
        .status(services.http.httpStatus.SUCCESS)
        .send({ result });
};

