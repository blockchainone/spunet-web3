module.exports = (sequelize, DataType) => {
    const Documents = sequelize.define('Documents', {
        id: {
            type: DataType.STRING,
            primaryKey: true,
        },
        idOrg: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Organizations',
                key: 'id',
            },
        },
        idContract: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Contracts',
                key: 'id',
            },
        },
        idModel: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Models',
                key: 'id',
            },
        },
        values: {
            type: DataType.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('values').split(';');
            },
            set(val) {
                this.setDataValue('values', val.join(';'));
            },
        },
        cid: {
            type: DataType.STRING,
            allowNull: true,
        },
        blockchain: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Blockchains',
                key: 'id',
            },
        }
    });

    return Documents;
};
