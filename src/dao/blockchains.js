const db = require('../models')();
const crypt = require('../services/crypt');

const insert_blockchain = async (
    id,
    name,
    chainId,
    module,
    endpoint,
    privateKey,
    linkExplorer,
    unit
) => {

    const { Blockchains } = db.models;
    return Blockchains.create({
        id,
        name,
        chainId,
        amount: '-',
        module,
        endpoint,
        privateKey,
        linkExplorer,
        unit,
        enableWrite: 1,
        enableRead: 1,
    });
};

const find_blockchain_by_id = async (id) => {
    const { Blockchains } = db.models;
    let blockchain = await Blockchains.findOne({
        where: {
            id,
        },
    });

    if (blockchain != null) {
        blockchain.dataValues.endpoint
            = crypt.decrypt(blockchain.dataValues.endpoint);
        blockchain.dataValues.privateKey
            = crypt.decrypt(blockchain.dataValues.privateKey);
    }

    return blockchain;
};

const find_all_blockchain = async () => {
    const { Blockchains } = db.models;
    const allBlockchains = await Blockchains.findAll();
    return allBlockchains;
};

module.exports = {
    insert_blockchain,
    find_blockchain_by_id,
    find_all_blockchain
};
