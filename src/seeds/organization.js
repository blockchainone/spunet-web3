const crypt = require('../services/crypt');

module.exports = async (models) => {
    models.Organizations.create({
        perfil: '1',
        nameOrg: crypt.encrypt(process.env.NAMEORG),
        emailOrg: crypt.encrypt(process.env.EMAILORG),
        nameResponsible: crypt.encrypt(process.env.RESPORG),
        cpfResponsible: crypt.encrypt(process.env.CPFORG),
        cnpjOrg: crypt.encrypt(process.env.CNPJORG),
        cert: '644d79466b73697664574252305a5573:916b8f54ff5c748d0721df979ee7948b0d839a37d91c0de9e12bce81e1554a13',
    });
};
