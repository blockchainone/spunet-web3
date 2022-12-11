module.exports = async (models) => {
    models.Accesses.create({
        value: `${process.env.ORGKEY}`,
        temp: 'urc2v8e8l6z4g5ii',
        idOrg: '1',
    });
};
