module.exports = async (server, controller, middleware, schemas) => {
    server
        .route('/contracts')
        .all(middleware.auth().authenticate())
        .post(
            schemas
                .general_validation(schemas.contractDeploySchema),
            middleware.blockchain.check_blockchain(),
            controller.contract.deploy_contract,
        )
        .delete(
            schemas
                .general_validation(schemas.contractDeleteSchema),
            middleware.blockchain.check_contract(),
            middleware.blockchain.check_usage_contract(),
            controller.contract.delete_contract,
        );
};
