const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let database = null;

const paramsdb = JSON.parse(
    `{"dialect": "mysql", "logging": false, "host": "${process.env.HOSTDB}","define": {"underscored": true}}`,
);

const load_models = sequelize => {
    const dir = path.join(__dirname, '../models');
    const models = [];
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        models[model.name] = model;
    });
    return models;
};

module.exports = () => {
    if (!database) {
        const sequelize = new Sequelize(
            process.env.SCHEMADB,
            process.env.USERNAMEDB,
            process.env.PASSWORDDB,
            paramsdb,
        );

        database = {
            sequelize,
            Sequelize,
            models: {},
        };

        database.models = load_models(sequelize);
        sequelize.sync().done(() => database);
    }
    return database;
};
