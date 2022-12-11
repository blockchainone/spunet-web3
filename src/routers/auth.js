module.exports = async (server, controller, middleware, schemas) => {
    server
        .route('/token')
        .post(
            schemas
                .general_validation(schemas.tokenSchema),
            controller.auth.create_token,
        );

    server.route('/error').get(controller.auth.error);
};
