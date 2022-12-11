const { libs } = require('./src/services');
const middleware = require('./src/middlewares');
const router = require('./src/routers');

const server = libs.express();

// helmet
const cspDefaults = libs.helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults['upgrade-insecure-requests'];

server.use(libs.helmet({
    contentSecurityPolicy: { directives: cspDefaults },
}));

server.use(libs.cors());
server.use(libs.bodyParser.json());
server.use(libs.bodyParser.urlencoded({ extended: false }));
server.use(
    middleware.validToken,
    middleware.blockjson,
    middleware.formidable(),
    middleware.formToJson,
);
router(server);

const httpServer = libs.http.createServer(server);

httpServer.listen(process.env.PORT, () => {
    console.info(`BACKEND is running on port ${process.env.PORT}.`);
});

middleware.cronJob.update_access();
module.exports = server;
