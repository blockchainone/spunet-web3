pragma solidity ^0.8.17;

contract RegisterDocument {

    address public proprietario;

    struct Document {
        string[] docsAttributes;
        string cid;
    }

    mapping (string => Document) private Documents;

    constructor() {
        proprietario = msg.sender;
    }

    function insertDocument(string memory _idDocument, string[] memory _docsAttributes, string memory _cid) public returns (string memory) {
        if(msg.sender != proprietario){
            return "Error: apenas o proprietario do contrato pode executar essa funcao";
        }

        Documents[_idDocument] = Document(
            _docsAttributes, _cid);
        
        return "SUCESSO: Registro Incluido";
    }

    function readDocument(string memory _idDocument) public view returns ( Document memory) {
        return Documents[_idDocument];
    }
}
