module.exports = (sequelize, DataType) => {
    const Organizations = sequelize.define('Organizations', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        perfil: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        nameOrg: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        emailOrg: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        nameResponsible: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cpfResponsible: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cnpjOrg: {
            type: DataType.STRING,
            allowNull: true,
        },
        cert: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },{
        initialAutoIncrement: 1,
    });
    return Organizations;
};
