const cron = require('node-schedule');
const dao = require('../dao');
const uniqid = require('uniqid');

function update_access() {
    cron.scheduleJob('0 0 */1 * * *', async () => {
        console.info('running a task every hour');
        try {
            const allAcesses = await dao.accessDAO.find_access();
            allAcesses.forEach(async element => {
                const temp = uniqid();
                const { id } = element.dataValues;
                await dao.accessDAO.update_access(temp, id);
            });
        } catch (error) {
            console.info(error);
        }
    });
}

module.exports = {
    update_access,
};
