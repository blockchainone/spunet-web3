/* eslint-disable radix */
/* eslint-disable no-plusplus */
const jwt = require('jwt-simple');
const fetch = require('node-fetch');
const dao = require('../dao');

const validar_CPF = (strCPF) => {
    let soma = 0;
    let resto;
    if (strCPF.length !== 11) return false;
    if (strCPF === '00000000000') return false;

    for (let i = 1; i <= 9; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
};

const auth_token = (jwtToken) => {
    const token = jwtToken;
    const decoded = jwt.decode(token[1], process.env.SECRET);
    const { idOrg } = decoded;

    return idOrg;
};

const new_org = (req, org) => {
    const { body } = req;
    const key = Object.keys(body);
    const values = Object.keys(org.dataValues);
    const object = org.dataValues;
    key.forEach(attribute => {
        values.forEach(value => {
            if (attribute === value) {
                object[attribute] = body[attribute];
            }
        });
    });
    return object;
};

const verify_org = (req) => {
    const body = Object.keys(req.body);
    const values = ['nameOrg', 'emailOrg', 'nameResponsible', 'cpfResponsible', 'cnpjOrg'];
    let counter = 0;
    body.forEach(attribute => {
        if (values.includes(attribute)) {
            counter++;
        }
    });
    if (counter === Object.values(body).length) {
        return true;
    }
    return false;
};

const new_object = (aux, attributes, value, response) => {
    const object = response;
    let count = 0;
    let bool = 'false';
    attributes.forEach((attr, countAttributes) => {
        if (attr.toUpperCase().includes('IDINTERNAL')) {
            bool = true;
        }
        aux.forEach((auxAttr, countAux) => {
            if (auxAttr === attr) {
                object[countAux] = value[countAttributes];
                count++;
            }
        });
    });
    return { object, count, bool };
};

const fetch_get = async (url) => {
    let response = await fetch(url);
    response = await response.json();
    return response;
};

const fetch_post = async (url, body, token) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: token,
        },
        body,
    };
    let response = await fetch(url, options);
    const responseText = await response.text();
    console.info('teste2', responseText);
    response = await response.json();
    console.info(response);
    return response;
};

const get_block_name = async (network) => {
    const blockchainbd = await dao.blockchainDAO
        .find_blockchain_by_id(network);
    if (blockchainbd == null) {
        return `not found`;
    }
    const name = blockchainbd.dataValues.name;
    return name;
};

const get_block_explorer = async (network, address) => {
    const blockchainbd = await dao.blockchainDAO
        .find_blockchain_by_id(network);
    if (blockchainbd == null) {
        return 'not found';
    }
    const linkExplorer = blockchainbd.dataValues.linkExplorer;
    return `${linkExplorer}/tx/${address}`;
};

const get_block_unit = async (network) => {
    const blockchainbd = await dao.blockchainDAO
        .find_blockchain_by_id(network);
    if (blockchainbd == null) {
        return 'not found';
    }
    const unit = blockchainbd.dataValues.unit;
    return unit;
};

function transform_to_standard(keys , values) {
    const attributes = [];
    for (let i = 0; i < keys.length; i++) {
        const object = {
            trait_type: keys[i],
            value: values[i],
        };
        attributes.push(object);
    }

    return attributes;
}

module.exports = {
    validar_CPF,
    auth_token,
    new_object,
    new_org,
    verify_org,
    fetch_get,
    fetch_post,
    get_block_name,
    get_block_explorer,
    get_block_unit,
    transform_to_standard
};
