/* eslint-disable max-len */
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const dao = require('../../../dao');

const blockchainWeb = async(network) => {
    const blockchain = await dao.blockchainDAO.find_blockchain_by_id(network);
    privateKey = blockchain.dataValues.privateKey
    endpoint = blockchain.dataValues.endpoint

    const provider = new HDWalletProvider(privateKey, endpoint);
    const web3 = new Web3(provider);
    return web3
};

module.exports = {
    blockchainWeb,
};
