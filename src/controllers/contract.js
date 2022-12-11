/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const blockchain = require('../blockchains');

exports.deploy_contract = async (req, res) => {
    const { idBlockchain, idOrg, chainId } = req.body;
    const parameters = {
        idBlockchain,
        chainId,
        idOrg
    };
    result = await blockchain.deploy_contract(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.delete_contract = async (req, res) => {
    const { idContract, contract } = req.body;
    const parameters = {
        idContract,
        blockchain: contract.dataValues.blockchain,
        address: contract.dataValues.address,
        idOrg: contract.dataValues.idOrg
    };
    result = await blockchain.remove_contract(parameters);
    return res
        .status(result.status)
        .send(result.message);
};
