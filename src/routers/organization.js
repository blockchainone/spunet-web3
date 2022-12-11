module.exports = async (server, controller, middleware, schemas) => {
    server
        .route('/organizations')
        .all(
            middleware.auth().authenticate(),
            middleware.isAdmin,
        )
        .post(
            schemas.org_validation(),
            controller.internal.create_organization,
        )
        .get(
            controller.internal.get_organizations,
        );
};
