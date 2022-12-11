const crypt = require('../services/crypt');

module.exports = async (models) => {
    models.Blockchains.create({
        id: '0',
        name: 'Alfajores',
        chainId: 44787,
        enableWrite: true,
        enableRead: true,
        amount: '-',
        unit: 'CELO',
        module: 'web3',
        endpoint: crypt.encrypt(process.env.CELOEP),
        privateKey: crypt.encrypt(process.env.CELOPK),
        linkExplorer: 'https://alfajores.celoscan.io',
    });
};
