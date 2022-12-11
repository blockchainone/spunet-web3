/* eslint-disable no-param-reassign */
const db = require('../models')();
const crypt = require('../services/crypt');

const create_organization = (
    perfil,
    nameOrg,
    emailOrg,
    nameResponsible,
    cpfResponsible,
    cnpjOrg,
    cert,
) => {
    let org = {};
    if (cnpjOrg === null || cnpjOrg === undefined) {
        org = {
            perfil,
            nameOrg: crypt.encrypt(nameOrg),
            emailOrg: crypt.encrypt(emailOrg),
            nameResponsible: crypt.encrypt(nameResponsible),
            cpfResponsible: crypt.encrypt(cpfResponsible),
            cnpjOrg,
            cert: crypt.encrypt(cert),
        };
    } else {
        org = {
            perfil,
            nameOrg: crypt.encrypt(nameOrg),
            emailOrg: crypt.encrypt(emailOrg),
            nameResponsible: crypt.encrypt(nameResponsible),
            cpfResponsible: crypt.encrypt(cpfResponsible),
            cnpjOrg: crypt.encrypt(cnpjOrg),
            cert: crypt.encrypt(cert),
        };
    }

    const { Organizations } = db.models;
    return Organizations.create(org);
};

const find_organization = async (id) => {
    const { Organizations } = db.models;
    const organization = await Organizations.findOne({
        where: {
            id,
        },
    });
    organization.dataValues.nameOrg
    = crypt.decrypt(organization.dataValues.nameOrg);
    organization.dataValues.emailOrg
    = crypt.decrypt(organization.dataValues.emailOrg);
    organization.dataValues.nameResponsible
    = crypt.decrypt(organization.dataValues.nameResponsible);
    organization.dataValues.cpfResponsible
    = crypt.decrypt(organization.dataValues.cpfResponsible);
    if (organization.dataValues.cnpjOrg !== undefined && organization.dataValues.cnpjOrg !== null) {
        organization.dataValues.cnpjOrg
    = crypt.decrypt(organization.dataValues.cnpjOrg);
    }
    organization.dataValues.cert
    = crypt.decrypt(organization.dataValues.cert);
    return organization;
};

const find_organization_by_key = async (key) => {
    const { Organizations, Accesses } = db.models;
    let organization = await Accesses.findOne({
        include: [{
            model: Organizations,
            required: true,
        }],
        where: {
            value: key,
        },
    });
    organization = organization.Organization;
    organization.dataValues.nameOrg
    = crypt.decrypt(organization.dataValues.nameOrg);
    organization.dataValues.emailOrg
    = crypt.decrypt(organization.dataValues.emailOrg);
    organization.dataValues.nameResponsible
    = crypt.decrypt(organization.dataValues.nameResponsible);
    organization.dataValues.cpfResponsible
    = crypt.decrypt(organization.dataValues.cpfResponsible);
    organization.dataValues.cnpjOrg
    = crypt.decrypt(organization.dataValues.cnpjOrg);
    organization.dataValues.cert
    = crypt.decrypt(organization.dataValues.cert);
    return organization;
};

const find_all_organization = async () => {
    const { Organizations } = db.models;
    const organization = await Organizations.findAll({});

    organization.forEach(element => {
        element.dataValues.nameOrg = crypt.decrypt(element.dataValues.nameOrg);
        element.dataValues.emailOrg = crypt.decrypt(element.dataValues.emailOrg);
        element.dataValues.nameResponsible = crypt.decrypt(element.dataValues.nameResponsible);
        element.dataValues.cpfResponsible = crypt.decrypt(element.dataValues.cpfResponsible);
        if (element.dataValues.cnpjOrg !== undefined
            && element.dataValues.cnpjOrg !== null) {
            element.dataValues.cnpjOrg
        = crypt.decrypt(element.dataValues.cnpjOrg);
        }
        element.dataValues.cert = crypt.decrypt(element.dataValues.cert);
    });

    return organization;
};

module.exports = {
    create_organization,
    find_organization,
    find_all_organization,
    find_organization_by_key
};
