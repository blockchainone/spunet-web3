const path = require('path');
const fs = require('fs');
const solc = require('solc');

exports.compiler = (local, document) => {
    const contractPath = path.resolve(__dirname, local, document);
    const source = fs.readFileSync(contractPath, 'utf8');
    let complierInput = {
        language: 'Solidity',
        sources:
        {
            'RegisterDocument.sol':
            {
                content: source
            }
        },
        settings:
        {
            optimizer:
            {
                enabled: true
            },
            outputSelection:
            {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    var bytecode = null
    var interface = null

    var output = JSON.parse(solc.compile(JSON.stringify(complierInput)));
    interface = JSON.stringify(output.contracts["RegisterDocument.sol"]["RegisterDocument"].abi);
    bytecode = output.contracts["RegisterDocument.sol"]["RegisterDocument"].evm.bytecode.object;

    return {
        interface,
        bytecode
    };
};
