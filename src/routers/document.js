module.exports = async (server, controller, middleware, schemas) => {
    server
        .route('/documents')
        .all(middleware.auth().authenticate())
        .post(
            schemas
                .general_validation(schemas.writeSchema),
            middleware.blockchain.check_contract(),
            middleware.blockchain.check_model(),
            middleware.blockchain.check_attributes(),
            middleware.blockchain.send_pinata(),
            controller.document.write_document,
        )
        .patch(
            schemas
                .general_validation(schemas.updateSchema),
            middleware.blockchain.check_hashdoc(),
            middleware.blockchain.check_document(),
            middleware.blockchain.check_sintaxe(),
            middleware.blockchain.check_duplicate_fields(),
            controller.document.update_document,
        )
        .delete(
            schemas
                .general_validation(schemas.deleteSchema),
            middleware.blockchain.check_contract(),
            middleware.blockchain.check_document(),
            controller.document.documents_delete,
        );
    server
        .route('/documents_read')
        .post(
            middleware.auth().authenticate(),
            schemas
                .general_validation(schemas.readSchema),
            middleware.blockchain.check_document(),
            controller.document.read_document,
        );
    server
        .route('/metadata_document')
        .post(
            middleware.auth().authenticate(),
            schemas
                .general_validation(schemas.metadataSchema),
            controller.document.metadata_document,
        );
    server
        .route('/validate_document')
        .post(
            middleware.auth().authenticate(),
            schemas
                .general_validation(schemas.validateSchema),
            middleware.blockchain.check_document(),
            controller.document.validate_document,
        );
};
