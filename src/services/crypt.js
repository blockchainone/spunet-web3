const {crypto} = require('./libs');

const key = process.env.KEY;
const buffer = process.env.BUFFER;

const encrypt = value => {
    const iv = Buffer.from(buffer);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = value => {
    const [iv, encrypted] = value.split(':');
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), ivBuffer);
    let content = decipher.update(Buffer.from(encrypted, 'hex'));
    content = Buffer.concat([content, decipher.final()]);
    return content.toString();
};

module.exports = {
    encrypt,
    decrypt,
};