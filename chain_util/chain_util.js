// metodos que vao criar hashs/chaves unicas /uuid
//todos os dados de criptografia
//utils

const EC = require('elliptic').ec

//uuid v1 possui o timestamp no método de criação, oprtanto iremos utiliza-la
// garantindo a unicidade do uuid
const uuidV1 = require('uuid/v1')

// algoritmo de criptografia de curva eliptica
// modelo que o bitcoin utiliza
const ec = new EC('secp256k1') 

class ChainUtil {


    static id(){
        return uuidV1()
    }

    static genKeyPair(){
        return ec.genKeyPair()
    }

}

module.exports = ChainUtil