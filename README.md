# SPUNet na WEB3 (Blockchain One)
## Hackaton Web3

Implementação de uma Application Programming Interface para integração do sistema SPUNet com a Web 3.0, por meio de serviços de registros de dados gerais de caracterização e incorporação de imóveis na blockchain da Celo, utilizando métodos de armazenamento descentralizados e padronização de dados e modelos para gestão integrada de documentos.

### Arquitetura SPUNet na WEB3
![](https://gateway.pinata.cloud/ipfs/QmP5rHEtyUB8mAQptapZNyZDiksHAXS6CGPbtQ4tqSi6pY)

1. Camada de Serviço:
Possibilida o uso de modelos gerais de documentos, implantação de contratos inteligentes, leitura e escrita de documentos, além da validação de integridade.

*Funcionalidades*
* Cadastrar cliente
* Implantar Contrato
* Listar Contrato
* Criar Modelo
* Listar Modelos
* Remover Modelo
* Registrar Documento
* Buscar Documento
* Buscar Metadados do Documento no Formato ERC-721
* Atualizar Documento
* Validar Documento
* Remover Documento

2. Camada Blockchain:
Consiste na comunicação com as blockchains integradas à solução. Para este projeto específico a solução conecta-se à Celo, mas pode ser integrada de forma genérica à outras blockchains baseadas em Ethereum Virtual Machine (EVM).

### Fluxo da Solução
![](https://gateway.pinata.cloud/ipfs/QmYQ885vr4UYb83677xwEZ9WE2ASfWeYyuvUd3ptZJa14z)

## Configurações Técnicas para Execução da API

### Instalação
1. Clone o repositório e instale suas dependências.

```
git clone https://github.com/blockchainone/sei-web3.git
cd sei-web3
```

```
npm install
```

2. Adicione as seguintes variáveis de ambiente com suas credenciais:

```
CELOEP=<CELO_ENDPOINT>
CELOPK=<CHAVE_PRIVADA_CELO>

PINATAURL=<PINATAURL>
PINATAJWT=<PINATAURL>
PINATAGATEWAY=<PINATAGATEWAY>

ORGKEY=<ORGKEY>
NAMEORG=<NAMEORG>
EMAILORG=<EMAILORG>
RESPORG=<RESPORG>
CPFORG=<CPFORG>
CNPJORG=<CNPJORG>

URL=<URL>
USERNAMEDB=<USERNAMEDB>
PASSWORDDB=<PASSWORDDB>
SCHEMADB=<SCHEMADB>
HOSTDB=<HOSTDB>

SERVER=<SERVER>
PORT=<PORT>
SECRET=<SECRET>
KEY=<KEY>
BUFFER=<BUFFER>
```

3. Inicie o servidor express:
```
npm run dev
```
## Saídas de algumas funcionalidades relacionadas ao documento

1. Registro de um documento
```JSON
{
    "returnCode": "success",
    "blockchain": "0",
    "idDocument": "dcfnoano4p2lbjjtve3",
    "cid": "QmZWBJS3YLhwcTuNbeHoPgaaxmpBo5AaCGtwCRvGEGRvUW",
    "blockNumber": 15081925,
    "txId": "0x79b777047aaabcb0c08e6a6669521d0d1a8612c8b8deac620adbe297c0e8d72c",
    "blockExplorer": "https://alfajores.celoscan.io/tx/0x79b777047aaabcb0c08e6a6669521d0d1a8612c8b8deac620adbe297c0e8d72c",
    "ipfs": "https://ipfs.io/ipfs/QmZWBJS3YLhwcTuNbeHoPgaaxmpBo5AaCGtwCRvGEGRvUW"
}
```

* blockchain: indica em qual blockchain foi o documento foi registrado. Neste caso, foi adicionado na Celo, mas pode haver a opção de adicionar em outras blockchains baseadas em EVM.
* cid: identificador do conteúdo do documento gerado pelo IPFS.
* blockNumber e txTd: bloco e transação do registro do documento.
* blockExplorer: link da transação no Explorer 
* ipfs: link para o metadado e documento inserido

2. Busca de um documento
```JSON
{
    "returnCode": "success",
    "blockchain": "0",
    "document": {
        "idInternal": "data1",
        "hashDoc": "data2",
        "campo1": "data3",
        "campo2": "data1",
        "campo3": "data2",
        "campo4": "data3",
        "campo5": "data1"
    },
    "ipfs": "https://ipfs.io/ipfs/QmZWBJS3YLhwcTuNbeHoPgaaxmpBo5AaCGtwCRvGEGRvUW",
    "timestamp": "2022-12-11T15:57:03.000Z"
}
```

* document: contém as keys (atributos) e values (conteúdo) do documento inserido. As keys dentro de "document" podem variar de acordo com o modelo de documento que foi utilizado.

3. Busca do metadado do documento
```JSON
{
    "name": "data1",
    "description": "document uploaded",
    "external_url": "https://ipfs.io/ipfs/QmVmrHkkitatqVtesXLcgFpF69DkQ2hx8tz8FUoUvXnDhT",
    "image": "",
    "attributes": [
        {
            "trait_type": "idInternal",
            "value": "data1"
        },
        {
            "trait_type": "hashDoc",
            "value": "data2"
        },
        {
            "trait_type": "campo1",
            "value": "data3"
        },
        {
            "trait_type": "campo2",
            "value": "data1"
        },
        {
            "trait_type": "campo3",
            "value": "data2"
        },
        {
            "trait_type": "campo4",
            "value": "data3"
        },
        {
            "trait_type": "campo5",
            "value": "data1"
        }
    ]
}
```

* Além do padrão tradicional do sistema, a solução também transforma os dados inseridos em metadados baseados em ERC-721. Tal funcionalidade permite que exista uma versão de metadados para possível tokenização no formato de ERC-721. Esse formato, inclusive, é totalmente compatível com marketplaces de NFTs, como o OpenSea.

* A key "image" aponta para o documento ou imagem submetida.

4. Validação de Documento
```JSON
{
    "result": {
        "returnCode": "success",
        "validate": true,
        "blockExplorer": "https://alfajores.celoscan.io/tx/0x9E64daA61B3e2fA4f176c3a5aC528F3ada2b9979"
    }
}
```

* Esta funcionalidade permite verificar a integridade dos documentos. Um documento, ao ser submetido ao sistema, pode ser comparado ao seu seu hash imutável já registrado previamente em blockchain. Caso os valores sejam iguais, trata-se do mesmo documento e a validação retorna "true" e o link da transação no Explorer. Caso os valores sejam diferentes, o sistema retorna "false". Ou seja, não é o mesmo documento inserido inicialmente em blockchain.

--
* Uma coleção do Postman para chamada às rotas está sendo disponibilizada na pasta [collection_postman](https://github.com/blockchainone/spunet-web3/tree/main/collection_postman)

* Um arquivo env de exemplo também pode ser utilizado
