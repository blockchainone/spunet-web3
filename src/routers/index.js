
const middleware = require('../middlewares');
const schema = require('../schemas');
const controller = require('../controllers');
middleware.auth().initialize();

const organizationRouter = require('./organization');
const authRouter = require('./auth');
const contractRouter = require('./contract');
const modelRouter = require('./model');
const documentRouter = require('./document');

module.exports = async (server) => {

    // rotas internas
    organizationRouter(server, controller, middleware, schema);

    // rotas públicas
    authRouter(server, controller, middleware, schema);

    // rotas 'privadas' (auth)
    contractRouter(server, controller, middleware, schema);
    modelRouter(server, controller, middleware, schema);
    documentRouter(server, controller, middleware, schema);

};
