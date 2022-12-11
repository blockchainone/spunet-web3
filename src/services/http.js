exports.httpStatus = Object.freeze({
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
});

exports.httpMessage = function httpFactory(code, message) {
    switch (code) {
    case 'BLOCKCHAIN_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'BLOCKCHAIN_INEXISTENTE',
            message:
                    message || 'Uma blockchain com esse código não foi encontrada.',
        };
    case 'BLOCKCHAIN_UTILIZADA':
        return {
            returnCode: 'failure',
            code: 'BLOCKCHAIN_UTILIZADA',
            message:
                    message || 'Uma blockchain com esse código já foi cadastrada.',
        };
    case 'CONTRATO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'CONTRATO_INEXISTENTE',
            message:
                    message || 'Contrato com esta chave não foi encontrado.',
        };
    case 'DOCUMENTO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'DOCUMENTO_INEXISTENTE',
            message:
                    message || 'Documento com esta chave não foi encontrado.',
        };
    case 'CONTRATO_AINDA_UTILIZADO':
        return {
            returnCode: 'failure',
            code: 'CONTRATO_AINDA_UTILIZADO',
            message:
                    message || 'Contrato não pode ser excluído pois existem documentos associados à ele',
        };
    case 'MODELO_AINDA_UTILIZADO':
        return {
            returnCode: 'failure',
            code: 'MODELO_AINDA_UTILIZADO',
            message:
                    message || 'Modelo não pode ser excluído pois existem contratos e/ou documentos associados à ele',
        };
    case 'ATRIBUTO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'ATRIBUTO_INEXISTENTE',
            message:
                    message || 'Atributo não encontrado.',
        };
    case 'CAMPO_VAZIO':
        return {
            returnCode: 'failure',
            code: 'CAMPO_VAZIO',
            message:
                    message
                    || 'Existem campos obrigatórios não preenchidos na requisição',
        };
    case 'CODIGO_INVÁLIDO':
        return {
            returnCode: 'failure',
            code: 'CODIGO_INVÁLIDO',
            message: message || 'Por favor digite um código válido!',
        };
    case 'ORGANIZAÇÃO_JÁ_EXISTENTE':
        return {
            returnCode: 'failure',
            code: 'ORGANIZAÇÃO_JÁ_EXISTENTE',
            message: message || 'Organização já foi cadastrada.',
        };
    case 'MODEL_NAME_JÁ_EXISTENTE':
        return {
            returnCode: 'failure',
            code: 'MODEL_NAME_JÁ_EXISTENTE',
            message: message || 'Um modelo com esse nome já foi cadastrado.',
        };
    case 'ATRIBUTOS_INVALIDOS':
        return {
            returnCode: 'failure',
            code: 'ATRIBUTOS_INVALIDOS',
            message:
                    message
                    || 'O vetor value possui uma quantidade inconsistente de atributos',
        };
    case 'MODELO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'MODELO_INEXISTENTE',
            message: message || 'O model requisitado é inexistente!',
        };
    case 'ROTA_INVALIDA':
        return {
            returnCode: 'failure',
            code: 'ROTA_INVALIDA',
            message:
                    message || 'Esta rota requer que um contrato inteligente seja associado a apenas um modelo específico. Utilize a rota /documents_models para usar um contrato inteligente para armazenar documentos com diferentes modelos.',
        };
    case 'CAMPOS_INCONSISTENTES':
        return {
            returnCode: 'failure',
            code: 'CAMPOS_INCONSISTENTES',
            message: message
                    || 'Os primeiros elementos do modelo devem ser \'idInternal;hashDoc\' respectivamente.',
        };
    case 'ATTRIBUTO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'ATTRIBUTO_INEXISTENTE',
            message:
                    'Existe um atributo em attrNotNull que não esta presente em attributes.',
        };
    case 'CAMPOS_DUPLICADOS_ATTR':
        return {
            returnCode: 'failure',
            code: 'CAMPOS_DUPLICADOS_ATTR',
            message:
                    'Existem campos duplicados em attributes.',
        };
    case 'CAMPOS_DUPLICADOS_ATTRNOTNULL':
        return {
            returnCode: 'failure',
            code: 'CAMPOS_DUPLICADOS_ATTRNOTNULL',
            message:
                    'Existem campos duplicados em attrNotNull.',
        };
    case 'TOKEN_INVALIDO':
        return {
            returnCode: 'failure',
            code: 'TOKEN_INVALIDO',
            message:
                    'Preencha o cabeçalho Authorization com um token válido!',
        };
    case 'CPF_INVÁLIDO':
        return {
            returnCode: 'failure',
            code: 'CPF_INVÁLIDO',
            message:
                    'Preencha a requisição informando um cpf válido!',
        };
    case 'CNPJ_INVÁLIDO':
        return {
            returnCode: 'failure',
            code: 'CNPJ_INVÁLIDO',
            message: 'Preencha a requisição informando um cnpj válido!',
        };
    case 'EMAIL_INVÁLIDO':
        return {
            returnCode: 'failure',
            code: 'EMAIL_INVÁLIDO',
            message: 'Preencha a requisição informando um email válido!',
        };
    case 'SINTAXE_INCONSISTENTE':
        return {
            returnCode: 'failure',
            code: 'SINTAXE_INCONSISTENTE',
            message: message || 'Sintaxe de requisição mal formada.',
        };
    case 'USUARIO_NAO_AUTORIZADO':
        return {
            returnCode: 'failure',
            code: 'USUARIO_NAO_AUTORIZADO',
            message: message
                    || 'Usuário não autorizado.',
        };
    case 'BLOCKCHAIN_INVALIDA':
        return {
            returnCode: 'failure',
            code: 'BLOCKCHAIN_INVALIDA',
            message: 'Selecione uma blockchain válida!',
        };
    case 'FALSO_PROPRIETARIO':
        return {
            returnCode: 'failure',
            code: 'FALSO_PROPRIETARIO',
            message: 'Apenas o proprietario do contrato pode executar essa função.',
        };
    case 'SEM_MODELOS':
        return {
            returnCode: 'success',
            code: 'SEM_MODELOS',
            message: 'Organização não possui modelos cadastrados!',
        };
    case 'FORMATO_INVALIDO':
        return {
            returnCode: 'success',
            code: 'FORMATO_INVALIDO',
            message: 'requisição enviado com formato inválido (JSON).',
        };
    default:
        return {
            returnCode: 'failure',
            code: 'ERRO_INTERNO_SERVIDOR',
            message:
                    'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
        };
    }
};
