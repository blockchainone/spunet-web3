module.exports = async (server, controller, middleware, schemas) => {
    server
        .route('/models')
        .all(middleware.auth().authenticate())
        .post(
            schemas.general_validation(schemas.modelSchema),
            controller.model.create_model,
        )
        .get(
            controller.model.get_models,
        )
        .delete(
            schemas
                .general_validation(schemas.modelDeleteSchema),
            controller.model.delete_model,
        );     
};
