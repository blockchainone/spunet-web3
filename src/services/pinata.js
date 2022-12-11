const axios = require('axios');
const { Readable } = require('stream');
const FormData = require('form-data');
const fs = require('fs');
const utils = require('./utils');

const JWT = `Bearer ${process.env.PINATAJWT}`;

const file_ipfs = async (path) => {
    const formData = new FormData();
    const file = fs.createReadStream(path);
    const options = JSON.stringify({
        cidVersion: 0,
    });

    formData.append('file', file);
    formData.append('pinataOptions', options);
    try {
        const res = await axios.post(`${process.env.PINATAURL}/pinning/pinFileToIPFS`, formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type':
                    `multipart/form-data; 
                    boundary=${formData._boundary}`,
                Authorization: JWT,
            },
        });
        let fileCid = res.data.IpfsHash;
        return fileCid;
    } catch (error) {
        console.log(error);
        return error.message
    }
};

const metadata_ipfs = async (fileCid, model, values) => {
    const formData = new FormData();
    const keys = model.dataValues.attr.split(';');
    const attributes = utils.transform_to_standard(keys, values)
    const metadata = {
        name: values[0],
        description: 'document uploaded',
        external_url: `https://ipfs.io/ipfs/${fileCid}`,
        image: '',
        attributes,
    };
    const options = JSON.stringify({
        cidVersion: 0,
    });

    buffer = Buffer.from(JSON.stringify(metadata));
    const stream = Readable.from(buffer);
    formData.append('file', stream, {
        filepath: 'metadata.json'
    })
    formData.append('pinataOptions', options);
    try {
        const res = await axios.post(`${process.env.PINATAURL}/pinning/pinFileToIPFS`, formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type':
                    `multipart/form-data; 
                    boundary=${formData._boundary}`,
                Authorization: JWT,
            },
        });
        let ipfsHash = res.data.IpfsHash;
        return ipfsHash;
    } catch (error) {
        console.log(error);
        return error.message
    }

};

const query_metadata_ipfs = async (hashContains) => {
    const config = {
        method: 'get',
        url:
            `https://ipfs.io/ipfs/${hashContains}`,
    };

    try {
        const res = await axios(config);
        return res.data;
    } catch (error) {
        return {
            result: 'cid not found',
        };
    }

};

module.exports = {
    file_ipfs,
    metadata_ipfs,
    query_metadata_ipfs,
};