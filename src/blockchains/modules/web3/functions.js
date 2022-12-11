const { libs, utils, http, pinata } = require('../../../services');
const dao = require('../../../dao');
const web3Block = require('./config');
const compilation = require('./compile');
const { interface, bytecode } = compilation.compiler(
    'contracts',
    'RegisterDocument.sol',
);


const deploy_contract = async (parameters) => {
    const {
        idBlockchain, chainId, idOrg
    } = parameters;

    //Deploy do contrato.
    var deployedInstance = ''
    var address = ''
    try {
        var web3 = await web3Block.blockchainWeb(idBlockchain);
        var numberTransactions = await web3.eth.getTransactionCount(web3._provider.addresses[0]);
        var gas = await web3.eth.estimateGas({
            from: web3._provider.addresses[0],
            nonce: numberTransactions,
            data: bytecode
        });
        console.log(gas);
        gas += 0, 2 * gas
        gasPrice = await web3.eth.getGasPrice()
        const amount = await web3.eth.getBalance(web3._provider.addresses[0]);
        if (20 * gas * gasPrice > amount) {
            console.log('low gas')
            return result = {
                status: http.httpStatus.INTERNAL_SERVER_ERROR,
                message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
            }
        }
        console.log('meio');
        deployedInstance = await web3.eth.sendTransaction({
            from: web3._provider.addresses[0],
            gas: 20000000,
            chainId,
            data: bytecode
        });
        getBlockHash = deployedInstance.blockHash;
        transaction = deployedInstance.transactionHash;
        address = deployedInstance.contractAddress;
        console.log('fim');
    } catch (e) {
        console.log(e)
        return result = {
            status: http.httpStatus.INTERNAL_SERVER_ERROR,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }

    //Inserção do contrato no BD.
    const key = libs.uniqid('ct');
    await dao.contractDAO.create_contract(
        key,
        idOrg,
        idBlockchain,
        address);

    return result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            contractDeployed: {
                idContract: key,
                address: address,
                ABI: JSON.parse(interface),
                bytecode: bytecode,
            },
        }
    }

};

const write_document = async (parameters) => {
    const {
        idBlockchain, chainId, idDocument, value, contract, idModel, cid
    } = parameters;

    //Instanciando o contrato a ser utilizado.
    address = contract.dataValues.address;
    var web3 = await web3Block.blockchainWeb(idBlockchain);
    const instance = new web3.eth.Contract(
        JSON.parse(interface),
        address,
    );
    const from = web3._provider.addresses[0];
    //Garante que somente o detentor do contrato chame a função.
    const proprietario = await instance.methods.proprietario().call();
    if (proprietario.toUpperCase() != from.toUpperCase()) {
        console.log('Apenas o proprietário do contrato pode executar essa função');
        return result = {
            status: http.httpStatus.UNAUTHORIZED,
            message: http.httpMessage('FALSO_PROPRIETARIO')
        }
    }

    //Realiza a escrita no contrato.
    let response = "";
    try {
        var numberTransactions = await web3.eth.getTransactionCount(from);
        var gas = await web3.eth.estimateGas({
            from,
            nonce: numberTransactions,
            data: bytecode
        })
        gas += 0, 2 * gas
        const amount = (await web3Block.blockchainWeb(idBlockchain)).eth.getBalance(from);
        gasPrice = await web3.eth.getGasPrice()
        if (20 * gas * gasPrice > amount) {
            console.log('low gas')
            return result = {
                status: http.httpStatus.INTERNAL_SERVER_ERROR,
                message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
            }
        }

        response = await instance.methods
            .insertDocument(idDocument, value, cid)
            .send({
                from,
                chainId,
                gas: 2000000,
            });

    } catch (e) {
        console.log(e.message)
        return result = {
            status: http.httpStatus.INTERNAL_SERVER_ERROR,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }

    //Inserção do documento no BD.
    await dao.documentDAO.create_document(
        idDocument,
        contract.dataValues.idOrg,
        contract.dataValues.id,
        idModel,
        value,
        cid,
        idBlockchain,
        null
    );
    var blockExplorer = await utils.get_block_explorer(idBlockchain, response.transactionHash);
    var ipfs = (cid != '')
        ? `https://ipfs.io/ipfs/${cid}`
        : 'no files added'
    var result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            blockchain: `${idBlockchain}`,
            idDocument: idDocument,
            cid: cid,
            blockNumber: response.blockNumber,
            txId: response.transactionHash,
            blockExplorer,
            ipfs
        }
    }

    return result;
};

const read_document = async (parameters) => {

    const {
        idBlockchain, idDocument, address, attributes, date
    } = parameters;

    //Instanciando o contrato a ser utilizado.
    var web3 = await web3Block.blockchainWeb(idBlockchain)
    const instance = await new web3.eth.Contract(
        JSON.parse(interface),
        address,
    );
    //Realizando a leitura das informações do contrato.
    const response = await instance.methods.readDocument(idDocument).call();
    result_values = response[0];
    result_cid = response[1];

    if (result_values[0] == '' && result_values[0] == null) {
        console.log('Falha na requisição de readDocument!');
        return result = {
            status: http.httpStatus.BAD_REQUEST,
            message: http.httpMessage('DOCUMENTO_INEXISTENTE')
        }
    }

    //Se o documento conter informações, prosseguir com a leitura.
    console.log('Requisição readDocument concluída com sucesso!');

    const object = {};
    attributes.forEach(function (k, i) {
        object[k] = result_values[i];
    });

    var ipfs = (result_cid != '')
        ? `https://ipfs.io/ipfs/${result_cid}`
        : 'no files added'
    return result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            blockchain: `${idBlockchain}`,
            document: object,
            ipfs,
            timestamp: date,
        }
    }

};

const update_document = async (parameters) => {
    const {
        idBlockchain, chainId, idDocument, value, attributes, contract, document, idOrg, req
    } = parameters;

    //Instanciando o contrato a ser utilizado.
    var address = contract.dataValues.address;
    var web3 = await web3Block.blockchainWeb(idBlockchain);
    const instance = new web3.eth.Contract(
        JSON.parse(interface),
        address,
    );
    const from = web3._provider.addresses[0];

    //Realizando a leitura das informações do contrato.
    let resp = await instance.methods.readDocument(idDocument).call();
    resp = Object.values(resp[0])

    //Busca no contrato as palavras
    const model = await dao.modelDAO.find_model(document.dataValues.idModel, idOrg);
    let aux = Object.values(model.dataValues.attr.split(';'));
    let object = utils.new_object(aux, attributes, value, resp);
    let count = object.count;
    let bool = object.bool;
    object = object.object;
    if (bool === true) {
        return result = {
            status: http.httpStatus.BAD_REQUEST,
            message: http.httpMessage(
                'CAMPOS_INCONSISTENTES',
                'Não é permitido modificar o idInternal.')
        }
    }
    if (count !== attributes.length) {
        return result = {
            status: http.httpStatus.BAD_REQUEST,
            message: http.httpMessage('ATRIBUTO_INEXISTENTE')
        }
    }

    aux = Object.values(object)
    //Garante que somente o detentor do contrato chame a função.
    const proprietario = await instance.methods.proprietario().call();
    if (!(proprietario.toUpperCase() == from.toUpperCase())) {
        return result = {
            status: http.httpStatus.BAD_REQUEST,
            message: http.httpMessage('FALSO_PROPRIETARIO')
        }
    }

    //Realiza a escrita no contrato.
    try {
        var numberTransactions = await web3.eth.getTransactionCount(from);
        var gas = await web3.eth.estimateGas({
            from: from,
            nonce: numberTransactions,
            data: bytecode
        })
        gas += 0, 2 * gas
        const amount = await web3.eth.getBalance(from);
        gasPrice = await web3.eth.getGasPrice()
        console.log(gas, gas * gasPrice)
        if (20 * gas * gasPrice > amount) {
            console.log('low gas')
            return result = {
                status: http.httpStatus.INTERNAL_SERVER_ERROR,
                message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
            }
        }

        var cid = '';
        if (req.files['document']) {
            fileCid = await pinata.file_ipfs(
                req.files['document'].path
            );
            cid = await pinata.metadata_ipfs(
                fileCid,
                model,
                value
            );
        }


        var response = await instance.methods.insertDocument(idDocument, aux, cid).send({
            from,
            chainId,
            gas: parseInt(gas),
        });

        await dao.documentDAO.update_document(
            idDocument,
            contract.dataValues.idOrg,
            contract.dataValues.id,
            document.dataValues.idModel,
            aux,
            idBlockchain,
            cid
        );

        console.log('Requisição updateDocument concluída com sucesso!');
        //Atualização do documento no BD.
        return result = {
            status: http.httpStatus.SUCCESS,
            message: {
                returnCode: 'success',
                blockchain: `${idBlockchain}`,
                idDocument: idDocument,
                blockNumber: response.blockNumber,
                txId: response.transactionHash,
            }
        }

    } catch (e) {
        console.log(e.message)
        return result = {
            status: http.httpStatus.INTERNAL_SERVER_ERROR,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }
}

module.exports = {
    deploy_contract,
    read_document,
    write_document,
    update_document
};








