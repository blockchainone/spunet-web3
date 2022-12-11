module.exports = (sequelize, DataType) => {
    const Accesses = sequelize.define('Accesses', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        temp: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
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
    },{
        initialAutoIncrement: 1,
    });
    return Accesses;
};
