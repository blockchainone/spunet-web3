const dao = require('../dao');
const services = require('../services');

const check_blockchain = () => async (req, res, next) => {
    const { idBlockchain } = req.body;
    const blockchain = await dao.blockchainDAO
        .find_blockchain_by_id(idBlockchain);
    if (blockchain == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('BLOCKCHAIN_INEXISTENTE'));
    }
    next();
};

const check_used_blockchain = () => async (req, res, next) => {
    const { idBlockchain } = req.body;
    const blockchain = await dao.blockchainDAO
        .find_blockchain_by_id(idBlockchain);
    if (blockchain != null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('BLOCKCHAIN_UTILIZADA'));
    }
    next();
};

const check_contract = () => async (req, res, next) => {
    const { idContract, idOrg } = req.body;
    const contract = await dao.contractDAO
        .find_contract_by_key(idContract, idOrg);
    if (contract == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('CONTRATO_INEXISTENTE'));
    }
    req.body.contract = contract;
    next();
};

const check_number_contract = () => async (req, res, next) => {
    const {
        idContract,
    } = req.body;

    if (idContract.length === 1) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('ROTA_INVALIDA',
                'Essa rota funciona para duas ou mais blockchains.'));
    }
    next();
};

const check_usage_contract = () => async (req, res, next) => {
    const { idContract, idOrg } = req.body;
    const document = await dao.documentDAO
        .find_all_document_by_idContract(idContract, idOrg);

    if (document[0] != undefined) {
        return res.status(services.http.httpStatus.BAD_REQUEST).send(
            services.http.httpMessage('CONTRATO_AINDA_UTILIZADO'),
        );
    }
    next();
};

const check_model = () => async (req, res, next) => {
    const { idModel, idOrg } = req.body;
    const model = await dao.modelDAO
        .find_model(idModel, idOrg);
    if (model == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('MODELO_INEXISTENTE'));
    }
    req.body.model = model;
    next();
};

const check_document = () => async (req, res, next) => {
    const { idDocument, contract, idOrg } = req.body;
    let contractDB = '';
    const document = await dao.documentDAO
        .find_document(idDocument, idOrg);
    if (document == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('DOCUMENTO_INEXISTENTE'));
    }
    if (contract == undefined) {
        contractDB = await dao.contractDAO
            .find_contract_by_key(document.dataValues.idContract, idOrg);
        req.body.contract = contractDB;
    }

    req.body.document = document;
    next();
};

const check_attributes = () => async (req, res, next) => {
    const { model, value } = req.body;
    const attr = model.dataValues.attr.split(';');
    let { attrNotNull } = model.dataValues;
    if (attrNotNull == null) {
        attrNotNull = '';
    } else {
        attrNotNull = model.dataValues.attrNotNull.split(';');
    }

    const indexRequired = [];
    attr.forEach(element => {
        indexRequired.push(!attrNotNull.includes(element));
    });
    indexRequired[0] = true;
    indexRequired[1] = true;
    if (attr.length !== value.length) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('ATRIBUTOS_INVALIDOS'));
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i] == '' && indexRequired[i] == true) {
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('ATRIBUTOS_INVALIDOS'));
        }
    }
    next();
};

const check_hashdoc = () => async (req, res, next) => {
    const {
        attributes,
    } = req.body;
    if (attributes[0] !== 'hashDoc') {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('CAMPOS_INCONSISTENTES',
                'O primeiro campo precisa ser hashDoc.'));
    }
    next();
};

const check_sintaxe = () => async (req, res, next) => {
    const {
        attributes, value,
    } = req.body;
    if (value.length !== attributes.length) {
        return res.status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('SINTAXE_INCONSISTENTE', 'Os vetores value e attributes possuem números diferentes de objetos.'));
    }
    next();
};

const check_duplicate_fields = () => async (req, res, next) => {
    const {
        attributes,
    } = req.body;
    let aux = 0;
    for (let i = 0; i < attributes.length - 1; i++) {
        if (attributes.indexOf(attributes[i], i + 1) !== -1) {
            aux = 1;
            break;
        }
    }

    if (aux === 1) {
        return res.status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('CAMPOS_DUPLICADOS_ATTR', 'Campos duplicados no campo attributes'));
    }
    next();
};

const send_pinata = () => async (req, res, next) => {
    const {
        model, value,
    } = req.body;

    let cid = '';
    if (req.files.document) {
        fileCid = await services.pinata.file_ipfs(
            req.files.document.path,
        );
        cid = await services.pinata.metadata_ipfs(
            fileCid,
            model,
            value,
        );
    }
    req.body.cid = cid;
    next();
};

module.exports = {
    check_blockchain,
    check_used_blockchain,
    check_contract,
    check_number_contract,
    check_usage_contract,
    check_model,
    check_document,
    check_attributes,
    check_hashdoc,
    check_sintaxe,
    check_duplicate_fields,
    send_pinata,
};
