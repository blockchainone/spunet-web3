const dao = require('../dao');
const db = require('../models')();
const services = require('../services');

exports.create_organization = async (req, res) => {
    const {
        nameOrg,
        emailOrg,
        nameResponsible,
        cpfResponsible,
        cnpjOrg,
    } = req.body;
    const { Accesses } = db.models;
    const regNumber = /^\d+$/;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const perfil = 0;

    const Models = db.models.Organizations;
    const model = await Models.findOne({
        where: {
            emailOrg: services.crypt.encrypt(emailOrg),
        },
    });
    const model1 = await Models.findOne({
        where: {
            cpfResponsible: services.crypt.encrypt(cpfResponsible),
        },
    });
    let model2;
    if (cnpjOrg !== null && cnpjOrg !== undefined) {
        model2 = await Models.findOne({
            where: {
                cnpjOrg: services.crypt.encrypt(cnpjOrg),
            },
        });
    }
    const validationCPF = services.utils.validar_CPF(cpfResponsible);
    if (model != null || model1 != null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('ORGANIZAÇÃO_JÁ_EXISTENTE'));
    }
    if (model2 != null) {
        if (model2.dataValues.cnpjOrg == null) {
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('ORGANIZAÇÃO_JÁ_EXISTENTE'));
        }
    }
    if (!regNumber.test(cpfResponsible) || !validationCPF) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('CPF_INVÁLIDO'));
    }

    if (cnpjOrg !== null && cnpjOrg !== undefined) {
        if (cnpjOrg.length !== 0) {
            if (cnpjOrg.length !== 14 && !regEmail.test(cnpjOrg)) {
                return res
                    .status(services.http.httpStatus.BAD_REQUEST)
                    .send(services.http.httpMessage('CNPJ_INVÁLIDO'));
            }
        }
    }
    if (!regEmail.test(emailOrg)) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('EMAIL_INVÁLIDO'));
    }
    const certcode = services.libs.uniqid();
    if (process.env.SERVER === 'prod') {
        if (req.files.certificate) {
            const pathtemp = req.files.certificate.services.libs.path;
            const cert = services.libs.fs.readFileSync(pathtemp, 'utf8');
            const validSSLCert = await services.libs.isValidSSLCert(cert);
            if (!validSSLCert) {
                return res
                    .status(services.http.httpStatus.UNAUTHORIZED)
                    .send(services.http.httpMessage('CHAVE_CERT_INVALIDA'));
            }
            const pathcert = services.libs.path.resolve(`sslcert/orgs/${certcode}.cert`);
            services.libs.fs2.move(pathtemp, pathcert, (err) => {
                if (err) {
                    console.info(err);
                } else {
                    console.info('file uploaded!');
                }
            });
        } else {
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('CAMPO_CERT_VAZIO'));
        }
    }

    const org = await dao.orgDAO.create_organization(
        perfil,
        nameOrg,
        emailOrg,
        nameResponsible,
        cpfResponsible,
        cnpjOrg,
        certcode,
    );

    const value = services.libs.uniqid();
    const temp = services.libs.uniqid();
    await Accesses.create({ value, temp, idOrg: org.dataValues.id });

    const data = {
        key: value,
    };

    const result = {
        returnCode: 'success',
        orgKey: value,
        message: 'Organização criada com sucesso!',
    };
    return res.status(services.http.httpStatus.SUCCESS).send({ result });
};

exports.get_organizations = async (req, res) => {
    const { idOrg } = req.body;
    const organization = await dao.orgDAO.find_organization(idOrg);
    // usuário comum
    if (organization.dataValues.perfil === 0) {
        return res
            .status(services.http.httpStatus.UNAUTHORIZED)
            .send(services.http.httpMessage('USUARIO_NAO_AUTORIZADO'));
    }

    if (organization.dataValues.perfil === 1) {
        await dao.orgDAO.find_all_organization().then(org => {
            const vector = [];
            org.forEach(element => {
                vector.push({
                    idOrg: element.id,
                    perfil: element.perfil,
                    nameOrg: element.nameOrg,
                    emailOrg: element.emailOrg,
                    nameResponsible: element.nameResponsible,
                    cpfResponsible: element.cpfResponsible,
                    cnpjOrg: element.cnpjOrg,
                });
            });

            const result = {
                returnCode: 'success',
                results: vector,
            };

            return res.send({
                ...result,
            });
        });
    }

    return 1;
};
