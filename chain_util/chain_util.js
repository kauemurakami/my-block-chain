// metodos que vao criar hashs/chaves unicas /uuid
//todos os dados de criptografia
//utils
const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec

//uuid v1 possui o timestamp no método de criação, oprtanto iremos utiliza-la
// garantindo a unicidade do uuid
const uuidV1 = require('uuid')

// algoritmo de criptografia de curva eliptica
// modelo que o bitcoin utiliza
const ec = new EC('secp256k1') 

class ChainUtil {


    static id(){
        return uuidV1.v1()
    }

    static genKeyPair(){
        return ec.genKeyPair()
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString()
    }
    
    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature)
    }
    
}

module.exports = ChainUtil