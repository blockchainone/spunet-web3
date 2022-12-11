/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const dao = require('../dao');
const services = require('../services');

exports.create_model = async (req, res) => {
    const { description, modelName, idOrg } = req.body;
    const { attributes } = req.body;
    let aux = 0;

    const model = await dao.modelDAO.find_model_by_modelName(modelName, idOrg);
    if (model !== null) {
        return res.status(services.http.httpStatus.BAD_REQUEST).send(
            services.http.httpMessage('MODEL_NAME_JÁ_EXISTENTE'),
        );
    }

    attributes.forEach(attribute => {
        if (attribute === '') {
            aux = 1;
        }
    });
    if (aux === 1) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('SINTAXE_INCONSISTENTE'));
    }
    const attrUpperCaseAux = attributes.map(p => p.toUpperCase());
    let { attrNotNull } = req.body;
    if (attrNotNull == undefined || attrNotNull == '') {
        attrNotNull = null;
    }
    let attrNotNullAux;
    let attrNotNullUpperCaseAux;
    // 0 = nenhum erro, 3 = atributo inexistente,
    // 1 = camposduplicados em attr, 2 campos duplicados em attrNotNull.
    aux = 0;
    // verifica se idInternal e hashDoc não foram inseridos nas posições corretas.
    if (
        attributes.indexOf('idInternal') !== 0
        || attributes.indexOf('hashDoc') !== 1
    ) {
        return res.status(services.http.httpStatus.BAD_REQUEST).send(
            services.http.httpMessage('CAMPOS_INCONSISTENTES'),
        );
    }
    // verifica se existem campos duplicados em attributes.
    for (let i = 0; i < attrUpperCaseAux.length - 1; i++) {
        if (attrUpperCaseAux.indexOf(attrUpperCaseAux[i], i + 1) !== -1) {
            aux = 1;
            break;
        }
    }
    if (attrNotNull != null) {
        attrNotNullAux = attrNotNull.split(';');
        attrNotNullUpperCaseAux = attrNotNullAux.map(p => p.toUpperCase());
        // verifica se existem campos duplicados em attrNotNull
        for (let i = 0; i < attrNotNullUpperCaseAux.length - 1; i++) {
            if (
                attrNotNullUpperCaseAux.indexOf(
                    attrNotNullUpperCaseAux[i],
                    i + 1,
                ) !== -1
            ) {
                aux = 2;
                break;
            }
        }

        // verifica se existem atributos em attrNotNull que não estão presentes em attributes.
        for (let i = 0; i < attrNotNullAux.length; i++) {
            if (attributes.indexOf(attrNotNullAux[i]) === -1) {
                aux = 3;
                break;
            }
        }
    }
    if (aux === 1) {
        return res.status(services.http.httpStatus.BAD_REQUEST).send(
            services.http.httpMessage('ATTRIBUTO_INEXISTENTE'),
        );
    } if (aux === 2) {
        return res.status(services.http.httpStatus.BAD_REQUEST).send(
            services.http.httpMessage('CAMPOS_DUPLICADOS_ATTR'),
        );
    } if (aux === 3) {
        return res.status(services.http.httpStatus.BAD_REQUEST).send(
            services.http.httpMessage('CAMPOS_DUPLICADOS_ATTRNOTNULL'),
        );
    }
    const id = services.libs.uniqid('md');
    const attr = attributes.toString().split(',').join(';');
    await dao.modelDAO.create_model(
        id,
        description,
        attr,
        modelName,
        attrNotNull,
        idOrg);
    const result = {
        returnCode: 'success',
        idModel: id,
        message: 'Modelo criado com sucesso!',
    };

    res.status(services.http.httpStatus.SUCCESS).send({
        result,
    });
};

exports.delete_model = async (req, res) => {
    const { idModel, idOrg } = req.body;
    let result = '';
    const model = await dao.modelDAO.find_model(idModel, idOrg);
    if (model == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('MODELO_INEXISTENTE'));
    }

    const document = await dao.documentDAO
        .find_document_by_model(idModel, idOrg);
    if (document != null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('MODELO_AINDA_UTILIZADO'));
    }

    result = {
        returnCode: 'success',
        Models: {
            idModel: model.dataValues.id,
            description: model.dataValues.description,
            attributes: model.dataValues.attr,
            attrNotNull: model.dataValues.attrNotNull,
        },
    };

    dao.modelDAO.delete_model(idModel, idOrg);
    return res
        .status(services.http.httpStatus.SUCCESS)
        .send(result);
};

exports.get_models = async (req, res) => {
    const { idOrg } = req.body;
    const organization = await dao.orgDAO.find_organization(idOrg);

    if (organization.dataValues.perfil === 0) {
        await dao.modelDAO.find_all_model_by_idOrg(idOrg).then(model => {
            const vector = [];
            model.forEach(element => {
                vector.push({
                    modelCode: element.id,
                    description: element.description,
                    attributes: element.attr,
                    modelName: element.modelName,
                    idOrg: element.idOrg,
                    timestamp: element.created_at,
                });
            });

            if (vector.length == 0) {
                res.status(services.http.httpStatus.BAD_REQUEST).send(
                    services.http.httpMessage('SEM_MODELOS'),
                );
            } else {
                const result = {
                    returnCode: 'success',
                    models: vector,
                };

                return res.send({
                    ...result,
                });
            }
        });
    } else if (organization.dataValues.perfil === 1) {
        await dao.modelDAO.find_all_Model()
            .then(contract => {
                const vector = [];
                contract.forEach(element => {
                    vector.push({
                        modelCode: element.id,
                        description: element.description,
                        attributes: element.attr,
                        modelName: element.modelName,
                        idOrg: element.idOrg,
                        timestamp: element.created_at,
                    });
                });

                if (vector.length == 0) {
                    res.status(services.http.httpStatus.BAD_REQUEST).send(
                        services.http.httpMessage('SEM_MODELOS'),
                    );
                } else {
                    const result = {
                        returnCode: 'success',
                        models: vector,
                    };

                    return res.send({
                        ...result,
                    });
                }
            });
    }
};
