module.exports = (sequelize, DataType) => {
    const Blockchains = sequelize.define('Blockchains', {
        id: {
            type: DataType.STRING,
            primaryKey: true,
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        chainId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        amount: {
            type: DataType.STRING,
            allowNull: true,
        },
        unit: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        module: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        endpoint: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        privateKey: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        linkExplorer: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
        enableWrite: {
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        enableRead: {
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    return Blockchains;
};
