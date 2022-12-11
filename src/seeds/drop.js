module.exports = async (database) => {
    if (process.env.SERVER === 'prod') {
        console.log('não é possivel apagar o banco no modo produção');
        return true
    }

    try {
        database.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(function () {
            return database.sequelize.sync({ force: true });
        })
        .then(function () {
            return database.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
        })
        .then(function () {
            database.sequelize.log('Database synchronised.');
        }, function (err) {
            database.sequelize.log(err);
        });
    } catch (error) {
        console.log(error);
    }

}

